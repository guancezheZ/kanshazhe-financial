/**
 * 扫描所有教学任务数据，找出使用了非末级科目（一级科目）的条目
 * 这些需要改为对应的明细科目
 *
 * 使用方式：node scripts/scan-nonleaf-subjects.cjs
 */
const fs = require('fs')
const path = require('path')

// ===== 从 store.js 提取非末级科目列表 =====
// 这些科目的 isLeaf = false（在 DEFAULT_SUBJECTS 中定义）
const NON_LEAF_CODES = new Set([
  '1002',  // 银行存款
  '1012',  // 其他货币资金
  '1101',  // 交易性金融资产
  '1121',  // 应收票据
  '1122',  // 应收账款
  '1601',  // 固定资产
  '2202',  // 应付账款
  '2211',  // 应付职工薪酬
  '2221',  // 应交税费
  '2241',  // 其他应付款
  '4101',  // 盈余公积
  '4104',  // 利润分配
  '5001',  // 生产成本
  '5301',  // 研发支出
  '6601',  // 销售费用
  '6602',  // 管理费用
])

// 服务业/建筑业新增的非末级科目
const EXTRA_NON_LEAF = new Set([
  '5401',  // 合同履约成本（建筑业）
  '5402',  // 合同结算（建筑业）
])

// 合并
const ALL_NON_LEAF = new Set([...NON_LEAF_CODES, ...EXTRA_NON_LEAF])

// 末级科目的合法子科目（供参考）
const LEAF_CHILDREN = {
  '6602': { // 管理费用
    '660201': '办公费',
    '660202': '差旅费',
    '660203': '工资薪金',
    '660204': '研发费用',
    '660205': '折旧费',
    '660206': '摊销费',
  },
  '6601': { // 销售费用
    '660101': '广告费',
    '660102': '运输费',
  },
  '1002': { // 银行存款
    '100201': '工商银行',
    '100202': '建设银行',
    '100203': '美元户',
  },
  '1012': { // 其他货币资金
    '101201': '银行汇票存款',
    '101202': '银行承兑汇票存款',
    '101203': '信用证保证金',
    '101204': '微信账户',
    '101205': '支付宝账户',
  },
  '1122': { // 应收账款
    '112201': '甲公司',
    '112202': '乙公司',
    '112203': '丁公司',
    '112204': '庚公司',
    '112205': '辛公司',
    '112206': '癸公司',
  },
  '2202': { // 应付账款
    '220201': '丙公司',
    '220202': '丁公司',
    '220203': '供应商',
  },
  '2221': { // 应交税费
    '222101': '应交增值税',
    '222102': '应交所得税',
    '222103': '应交城建税',
    '222104': '应交教育费附加',
    '222110': '未交增值税',
  },
  '1601': { // 固定资产
    '160101': '房屋建筑物',
    '160102': '机器设备',
    '160103': '办公设备',
    '160104': '运输设备',
    '160105': '研发设备',
  },
  '5001': { // 生产成本
    '500101': '直接材料',
    '500102': '直接人工',
    '500103': '制造费用',
  },
  '2211': { // 应付职工薪酬
    '221101': '工资',
    '221102': '社保',
    '221103': '公积金',
  },
}

// ===== 扫描函数 =====
const ROOT = path.resolve(__dirname, '..', 'src', 'data', 'tutorials')

function extractSubjectCodes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const results = []

  // 匹配 subjectCode: 'XXXX'
  const regex = /subjectCode:\s*'(\d+)'/g
  let match
  while ((match = regex.exec(content)) !== null) {
    const code = match[1]
    if (ALL_NON_LEAF.has(code)) {
      // 找到行上下文
      const lineStart = content.lastIndexOf('\n', match.index) + 1
      const lineEnd = content.indexOf('\n', match.index)
      const contextLine = content.substring(lineStart, lineEnd !== -1 ? lineEnd : content.length).trim()
      // 找标题（往前找title）
      const beforeMatch = content.substring(0, match.index)
      const titleMatch = beforeMatch.match(/title:\s*'([^']+)'(?!\s*:)/g)
      const lastTitle = titleMatch ? titleMatch[titleMatch.length - 1] : ''

      results.push({
        code,
        file: path.relative(ROOT, filePath),
        line: content.substring(0, match.index).split('\n').length,
        context: contextLine.substring(0, 120),
        title: lastTitle,
      })
    }
  }

  return results
}

// ===== 遍历所有任务文件 =====
function scanAll() {
  const allResults = []

  // 1. 扫描 months/ 目录（制造业2-12月）
  const monthsDir = path.join(ROOT, 'months')
  if (fs.existsSync(monthsDir)) {
    fs.readdirSync(monthsDir).forEach(f => {
      if (f.endsWith('.js')) {
        allResults.push(...extractSubjectCodes(path.join(monthsDir, f)))
      }
    })
  }

  // 2. 扫描 year1.js（制造业1月）
  const year1 = path.join(ROOT, '..', 'year1.js')
  if (fs.existsSync(year1)) {
    allResults.push(...extractSubjectCodes(year1))
  }

  // 3. 扫描 commercial/（商业企业1-12月）
  const commercialDir = path.join(ROOT, 'commercial')
  if (fs.existsSync(commercialDir)) {
    fs.readdirSync(commercialDir).forEach(f => {
      if (f.endsWith('.js')) {
        allResults.push(...extractSubjectCodes(path.join(commercialDir, f)))
      }
    })
  }

  // 4. 扫描 service/（服务业1-12月）
  const serviceDir = path.join(ROOT, 'service')
  if (fs.existsSync(serviceDir)) {
    fs.readdirSync(serviceDir).forEach(f => {
      if (f.endsWith('.js')) {
        allResults.push(...extractSubjectCodes(path.join(serviceDir, f)))
      }
    })
  }

  // 5. 扫描 construction/（建筑业1-12月）
  const constructionDir = path.join(ROOT, 'construction')
  if (fs.existsSync(constructionDir)) {
    fs.readdirSync(constructionDir).forEach(f => {
      if (f.endsWith('.js')) {
        allResults.push(...extractSubjectCodes(path.join(constructionDir, f)))
      }
    })
  }

  return allResults
}

const results = scanAll()

// ===== 输出报告 =====
console.log(`\n📊 非末级科目使用情况扫描报告`)
console.log(`   ${'='.repeat(50)}\n`)

// 按科目编码分组
const byCode = {}
results.forEach(r => {
  if (!byCode[r.code]) byCode[r.code] = []
  byCode[r.code].push(r)
})

Object.keys(byCode).sort().forEach(code => {
  const items = byCode[code]
  const name = LEAF_CHILDREN[code] ? '(有子科目)' : '(⚠️ 无子科目)'
  console.log(`\n  ${code} ${name} — 出现 ${items.length} 处`)

  // 按文件分组
  const byFile = {}
  items.forEach(i => {
    if (!byFile[i.file]) byFile[i.file] = []
    byFile[i.file].push(i)
  })

  Object.keys(byFile).forEach(f => {
    console.log(`    📁 ${f}:`)
    byFile[f].forEach(i => {
      console.log(`      L${i.line} │ ${i.context.substring(0, 100)}`)
    })
  })
})

console.log(`\n${'='.repeat(50)}`)
console.log(`📋 总计：${results.length} 处使用非末级科目`)
console.log(`涉及科目：${Object.keys(byCode).sort().join(', ')}`)
console.log(`涉及文件：${[...new Set(results.map(r => r.file))].sort().join('\n          ')}`)
