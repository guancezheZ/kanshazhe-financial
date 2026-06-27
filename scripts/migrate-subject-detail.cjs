/**
 * 科目明细化迁移脚本
 *
 * 功能：
 * 1. 添加缺失的子科目（在 store.js 的 DEFAULT_SUBJECTS 中补充）
 * 2. 替换教学数据中的非末级科目为对应子科目
 *
 * 使用方式：node scripts/migrate-subject-detail.cjs
 *
 * 规则说明：
 * 6602(管理费用) → 根据摘要关键词匹配到对应子科目
 * 6601(销售费用) → 根据摘要关键词匹配到对应子科目
 * 2241(其他应付款) → 根据摘要关键词匹配到对应子科目
 * 4101(盈余公积) → 拆分为法定/任意
 * 4104(利润分配) → 拆分为对应子科目
 * 1122(应收账款) → 保持一级科目（客户名不固定）
 * 2202(应付账款) → 保持一级科目（供应商名不固定）
 * 1601(固定资产) → 保持一级科目（建筑业情形不适用现有子科目）
 */
const fs = require('fs')
const path = require('path')

// ═══════════════════════════════════════════════
//  匹配规则定义
// ═══════════════════════════════════════════════

// 优先级：规则按顺序匹配，匹配到第一条即停
const RULES_6602 = [
  // 折旧 → 660205 折旧费（已存在）
  { pattern: /折旧/i, target: '660205' },
  // 摊销 → 660206 摊销费（已存在）
  { pattern: /摊销/i, target: '660206' },
  // 工资/薪金 → 660203 工资薪金（已存在）
  { pattern: /(?:工资|薪金|奖金)/i, target: '660203' },
  // 办公费 → 660201 办公费（已存在）
  { pattern: /(?:办公|文具|打印)/i, target: '660201' },
  // 差旅费 → 660202 差旅费（已存在）
  { pattern: /(?:差旅|出差|考察)/i, target: '660202' },
  // 房租/租金/租赁 → 660207 租赁费（新增）
  { pattern: /(?:房租|租金|租赁|商铺|场地|经营场所)/i, target: '660207' },
  // 水电费 → 660208 水电费（新增）
  { pattern: /(?:水电|水费|电费)/i, target: '660208' },
  // 招聘/猎头/培训 → 660209 招聘培训费（新增）
  { pattern: /(?:招聘|猎头|培训|岗前)/i, target: '660209' },
  // 审计/咨询/法律顾问 → 660210 中介服务费（新增）
  { pattern: /(?:审计|咨询|法律顾问|律师)/i, target: '660210' },
  // 网络/通讯 → 660211 通讯费（新增）
  { pattern: /(?:网络|通讯|通信|宽带|电话)/i, target: '660211' },
  // 体检/保险/补充医保 → 660212 保险费（新增）
  { pattern: /(?:体检|保险|补充医保|社保|公积金)/i, target: '660212' },
  // 物业/维修/检修 → 660213 物业维修费（新增）
  { pattern: /(?:物业|维修|检修|保养)/i, target: '660213' },
  // 生鲜损耗/盘亏/盘点 → 660214 存货损耗（新增）
  { pattern: /(?:损耗|盘亏|盘点)/i, target: '660214' },
  // POS/微信服务费 → 660215 金融服务费（新增）
  { pattern: /(?:POS|服务费|商户)/i, target: '660215' },
  // 评估费/装修/装饰 → 660216 其他（新增）
  { pattern: /(?:评估|装修|装饰|专柜)/i, target: '660216' },
  // 结转/转出 → 保持6602（结转是整体转出，不需要细分）
  { pattern: /(?:结转|转出|转入|费用转入)/i, target: null },
  // 研发费用化结转 → 660204 研发费用（已存在）
  { pattern: /(?:研发费用化|研发费)/i, target: '660204' },
  // 缺省：其他管理费用→660217 其他（新增）
  { pattern: /.*/, target: '660217' },
]

const RULES_6601 = [
  // 广告/推广/展会 → 660101 广告费（已存在）
  { pattern: /(?:广告|推广|展会|参展|宣传|产品发布)/i, target: '660101' },
  // 运输/物流/配送 → 660102 运输费（已存在）
  { pattern: /(?:运输|物流|配送|快递)/i, target: '660102' },
  // 工资/薪金/加班 → 660103 工资薪金（新增）
  { pattern: /(?:工资|薪金|加班|临时|人员.*工资|年终奖)/i, target: '660103' },
  // 促销/佣金/扣点 → 660104 促销佣金（新增）
  { pattern: /(?:促销|佣金|扣点|联营)/i, target: '660104' },
  // 赠品/活动物资 → 660105 业务费（新增）
  { pattern: /(?:赠品|活动物资|物资费)/i, target: '660105' },
  // 结转 → 保持6601
  { pattern: /(?:结转|转出)/i, target: null },
  // 缺省 → 660106 其他（新增）
  { pattern: /.*/, target: '660106' },
]

const RULES_2241 = [
  // 代收货款 → 224101 代收货款（新增）
  { pattern: /(?:代收货款|受托代销)/i, target: '224101' },
  // 利息 → 224102 应付利息（新增）
  { pattern: /(?:利息|借款利息)/i, target: '224102' },
  // 递延收益/进场费 → 224103 递延收益（新增）
  { pattern: /(?:递延收益|进场费|未摊销)/i, target: '224103' },
  // 保证金 → 224104 保证金（新增）
  { pattern: /(?:保证金|押金)/i, target: '224104' },
  // 缺省 → 224199 其他（新增）
  { pattern: /.*/, target: '224199' },
]

const RULES_4104 = [
  // 提取法定盈余公积 → 410402 提取盈余公积
  { pattern: /法定.*盈余/i, target: '410402' },
  // 提取任意盈余公积 → 410402 提取盈余公积
  { pattern: /任意.*盈余/i, target: '410402' },
  // 计提应付股利 → 410403 应付普通股股利
  { pattern: /应付股利/i, target: '410403' },
  // 缺省→ 保持4104
  { pattern: /.*/, target: null },
]

const RULES_4101 = [
  // 法定盈余公积 → 410101 法定盈余公积
  { pattern: /法定/i, target: '410101' },
  // 任意盈余公积 → 410102 任意盈余公积（新增）
  { pattern: /任意/i, target: '410102' },
  // 缺省 → 保持4101
  { pattern: /.*/, target: null },
]

// ═══════════════════════════════════════════════
//  新增子科目定义（待写入 store.js）
// ═══════════════════════════════════════════════

const NEW_SUBJECTS = [
  // 6602 管理费用 - 新增子科目
  { id: 's-660207', code: '07', name: '租赁费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660208', code: '08', name: '水电费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660209', code: '09', name: '招聘培训费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660210', code: '10', name: '中介服务费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660211', code: '11', name: '通讯费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660212', code: '12', name: '保险费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660213', code: '13', name: '物业维修费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660214', code: '14', name: '存货损耗', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660215', code: '15', name: '金融服务费', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660216', code: '16', name: '装修摊销', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660217', code: '17', name: '其他', type: 5, parentId: 's-6602', isLeaf: true, opened: true },
  // 6601 销售费用 - 新增子科目
  { id: 's-660103', code: '03', name: '工资薪金', type: 5, parentId: 's-6601', isLeaf: true, opened: true },
  { id: 's-660104', code: '04', name: '促销佣金', type: 5, parentId: 's-6601', isLeaf: true, opened: true },
  { id: 's-660105', code: '05', name: '业务费', type: 5, parentId: 's-6601', isLeaf: true, opened: true },
  { id: 's-660106', code: '06', name: '其他', type: 5, parentId: 's-6601', isLeaf: true, opened: true },
  // 2241 其他应付款 - 新增子科目
  { id: 's-224101', code: '01', name: '代收货款', type: 2, parentId: 's-2241', isLeaf: true, opened: true },
  { id: 's-224102', code: '02', name: '应付利息', type: 2, parentId: 's-2241', isLeaf: true, opened: true },
  { id: 's-224103', code: '03', name: '递延收益', type: 2, parentId: 's-2241', isLeaf: true, opened: true },
  { id: 's-224104', code: '04', name: '保证金', type: 2, parentId: 's-2241', isLeaf: true, opened: true },
  { id: 's-224199', code: '99', name: '其他', type: 2, parentId: 's-2241', isLeaf: true, opened: true },
  // 4101 盈余公积 - 新增子科目
  { id: 's-410102', code: '02', name: '任意盈余公积', type: 3, parentId: 's-4101', isLeaf: true, opened: true },
]

// 需要修改为非末级→末级的科目（不在此列的保持原样：1122/2202/1601）
const SUBJECTS_TO_CONVERT = ['6602', '6601', '2241', '4101', '4104']

const RULES_MAP = {
  '6602': RULES_6602,
  '6601': RULES_6601,
  '2241': RULES_2241,
  '4104': RULES_4104,
  '4101': RULES_4101,
}

// 反向映射：子科目 → 父科目（用于校验）
const PARENT_MAP = {
  '660205': '6602', '660206': '6602', '660203': '6602',
  '660201': '6602', '660202': '6602',
  '660207': '6602', '660208': '6602', '660209': '6602',
  '660210': '6602', '660211': '6602', '660212': '6602',
  '660213': '6602', '660214': '6602', '660215': '6602',
  '660216': '6602', '660217': '6602',
  '660101': '6601', '660102': '6601',
  '660103': '6601', '660104': '6601', '660105': '6601', '660106': '6601',
  '224101': '2241', '224102': '2241', '224103': '2241', '224104': '2241', '224199': '2241',
  '410101': '4101', '410102': '4101',
  '410402': '4104', '410403': '4104',
}

// ═══════════════════════════════════════════════
//  核心替换逻辑
// ═══════════════════════════════════════════════

/**
 * 从一行entry的上下文中提取摘要和说明文本
 */
function extractContext(content, matchIndex) {
  // 往前找 summary: 和 explanation:
  const before = content.substring(0, matchIndex)
  const summaryMatch = before.match(/summary:\s*'([^']*)'[^)]*$/)
  const explMatch = before.match(/explanation:\s*'([^']*)'[^)]*$/)

  // 也往后找
  const after = content.substring(matchIndex)
  const afterSummary = after.match(/summary:\s*'([^']*)'/)
  const afterExpl = after.match(/explanation:\s*'([^']*)'/)

  const contextText = [
    summaryMatch ? summaryMatch[1] : '',
    explMatch ? explMatch[1] : '',
    afterSummary ? afterSummary[1] : '',
    afterExpl ? afterExpl[1] : '',
  ].filter(Boolean).join(' ')

  return contextText
}

/**
 * 对一行代码应用替换
 * 返回 { newLine, target, matched } 或 null（保持原样）
 */
function applyRules(code, subjectCode, summary, explanation) {
  const rules = RULES_MAP[subjectCode]
  if (!rules) return null  // 不在转换列表中的保持原样

  const combinedContext = [summary, explanation].filter(Boolean).join(' ')

  for (const rule of rules) {
    if (rule.pattern.test(combinedContext)) {
      if (rule.target === null) {
        return { action: 'keep' }  // 保持原样（如结转）
      }
      return { action: 'replace', target: rule.target }
    }
  }

  return { action: 'keep' }
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  let result = content
  let replacements = []

  // 匹配 subjectCode: 'XXXX' 其中XXXX是需要替换的非末级科目
  for (const code of SUBJECTS_TO_CONVERT) {
    const regex = new RegExp(`subjectCode:\\s*'${code}'`, 'g')
    let match
    while ((match = regex.exec(result)) !== null) {
      // 获取上下文
      const contextText = extractContext(result, match.index)
      const summaryMatch = contextText.match(/(.+?)(?:\s|$)/)

      // 找到匹配规则
      const rules = RULES_MAP[code]
      let matchedRule = null
      for (const rule of rules) {
        if (rule.pattern.test(contextText)) {
          matchedRule = rule
          break
        }
      }

      if (matchedRule && matchedRule.target !== null) {
        const lineStart = result.lastIndexOf('\n', match.index) + 1
        const lineEnd = result.indexOf('\n', match.index)
        const line = result.substring(lineStart, lineEnd !== -1 ? lineEnd : result.length)

        const replacement = `subjectCode: '${matchedRule.target}'`
        result = result.substring(0, match.index) + replacement + result.substring(match.index + match[0].length)

        replacements.push({
          code,
          target: matchedRule.target,
          context: contextText.substring(0, 80)
        })

        // 重置regex索引（因为字符串变了）
        regex.lastIndex = match.index + replacement.length
      }
    }
  }

  if (replacements.length > 0) {
    fs.writeFileSync(filePath, result, 'utf8')
  }

  return replacements
}

// ═══════════════════════════════════════════════
//  主流程
// ═══════════════════════════════════════════════

const ROOT = path.resolve(__dirname, '..', 'src', 'data', 'tutorials')

function getAllDataFiles() {
  const files = []

  // year1.js（制造业1月内联）
  const year1 = path.join(ROOT, '..', 'year1.js')
  if (fs.existsSync(year1)) files.push(year1)

  // months/（制造业2-12月）
  const monthsDir = path.join(ROOT, 'months')
  if (fs.existsSync(monthsDir)) {
    fs.readdirSync(monthsDir).filter(f => f.endsWith('.js')).forEach(f => {
      files.push(path.join(monthsDir, f))
    })
  }

  // commercial/（商业企业）
  const commercialDir = path.join(ROOT, 'commercial')
  if (fs.existsSync(commercialDir)) {
    fs.readdirSync(commercialDir).filter(f => f.endsWith('.js')).forEach(f => {
      files.push(path.join(commercialDir, f))
    })
  }

  // service/（服务业）
  const serviceDir = path.join(ROOT, 'service')
  if (fs.existsSync(serviceDir)) {
    fs.readdirSync(serviceDir).filter(f => f.endsWith('.js')).forEach(f => {
      files.push(path.join(serviceDir, f))
    })
  }

  // construction/（建筑业）
  const constructionDir = path.join(ROOT, 'construction')
  if (fs.existsSync(constructionDir)) {
    fs.readdirSync(constructionDir).filter(f => f.endsWith('.js')).forEach(f => {
      files.push(path.join(constructionDir, f))
    })
  }

  return files.sort()
}

function main() {
  console.log('🔍 开始扫描并替换非末级科目...\n')

  const files = getAllDataFiles()
  console.log(`📁 待处理文件：${files.length} 个\n`)

  let totalReplacements = 0
  const bySubject = {}
  const errors = []

  for (const file of files) {
    const relativePath = path.relative(path.resolve(__dirname, '..', 'src', 'data'), file)
    console.log(`  处理 ${relativePath}...`)

    try {
      const replacements = processFile(file)

      if (replacements.length > 0) {
        totalReplacements += replacements.length
        console.log(`    ✅ 替换 ${replacements.length} 处`)

        for (const r of replacements) {
          if (!bySubject[r.code]) bySubject[r.code] = []
          bySubject[r.code].push(r)
        }
      } else {
        console.log(`    — 无需修改`)
      }
    } catch (err) {
      errors.push({ file: relativePath, error: err.message })
      console.log(`    ❌ 错误：${err.message}`)
    }
  }

  // 输出汇总
  console.log('\n' + '='.repeat(60))
  console.log('📊 替换汇总')
  console.log('='.repeat(60))
  console.log(`\n总计替换：${totalReplacements} 处`)

  for (const [code, reps] of Object.entries(bySubject)) {
    console.log(`\n  ${code}: ${reps.length} 处`)
    // 统计目标分布
    const byTarget = {}
    reps.forEach(r => {
      if (!byTarget[r.target]) byTarget[r.target] = 0
      byTarget[r.target]++
    })
    for (const [target, count] of Object.entries(byTarget).sort()) {
      console.log(`    → ${target}: ${count} 处`)
    }
  }

  if (errors.length > 0) {
    console.log('\n❌ 错误：')
    errors.forEach(e => console.log(`  ${e.file}: ${e.error}`))
  }

  console.log('\n✅ 完成！')
  console.log('\n⚠️  注意事项：')
  console.log('  1. 1122(应收账款)、2202(应付账款)、1601(固定资产) 未做替换（客户/供应商名不固定）')
  console.log('  2. 需要手动修改 SubjectSelect.vue 允许在教学中选一级科目')
  console.log('  3. 请运行 node scripts/compute-hashes.cjs 更新哈希')
  console.log('  4. 请运行 npm run test 验证')
}

main()
