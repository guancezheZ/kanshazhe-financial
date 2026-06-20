/**
 * 修复服务业各月份缺 subjectCode 的教学数据
 * 使用 01-03 月已存在的数据模式推断 04-12 月的缺失字段
 */

const fs = require('fs')
const path = require('path')

const SERVICE_DIR = path.join(__dirname, '..', 'src', 'data', 'tutorials', 'service')

/**
 * 根据 summary 和借贷方向推断 subjectCode
 */
function inferSubjectCode(entry, taskContext) {
  const s = (entry.summary || '').trim()
  const isDebit = (Number(entry.debit) || 0) > 0
  const isCredit = (Number(entry.credit) || 0) > 0

  // ---- 借方推断 ----
  if (isDebit) {
    // 社保缴纳
    if (s.includes('社保') && (s.includes('缴') || s === '社保' || s === '缴纳社保')) return '221102'
    // 增值税
    if (s.includes('增值税') && s.includes('缴')) return '222101'
    if (s === '缴纳增值税' || s === '缴增值税') return '222101'
    // 城建税
    if (s.includes('城建税') && s.includes('缴')) return '222103'
    if (s === '缴纳城建税' || s === '缴城建税') return '222103'
    // 教育费附加
    if (s.includes('教育费附加') && s.includes('缴')) return '222104'
    if (s === '缴纳教育费附加' || s === '缴教育费附加') return '222104'
    if (s === '缴纳教育附加费' || s === '缴教育附加费') return '222104'
    // 所得税
    if ((s.includes('所得税') && s.includes('缴')) || s === '缴纳所得税' || s === '缴所得税') return '222102'
    // 工资发放
    if (s.includes('发放') && (s.includes('工资') || s.includes('薪酬'))) return '221101'
    if (s === '发工资' || s === '应发' || s === '应发额' || s === '发放工资') return '221101'
    if (s.includes('代发工资')) return '221101'
    // 计提工资
    if ((s.includes('计提') && s.includes('工资')) || s === '上半月' || s === '下半月') {
      if (s.includes('管理') || s === '管理上半月工资' || s === '管理下半月工资') return '660203'
      if (s.includes('项目') || s === '项目上半月工资' || s === '项目下半月工资') return '520101'
      // 默认看上下文
      if (taskContext && taskContext.includes('管理')) return '660203'
      if (taskContext && taskContext.includes('项目')) return '520101'
      return '660203' // 默认管理费用
    }
    if (s === '管理工资' || s === '管理人员上半月工资' || s === '管理人员下半月工资') return '660203'
    if (s === '项目上半月工资' || s === '项目下半月工资' || s === '计提项目工资') return '520101'
    // 计提社保
    if (s === '项目社保' || s === '项目组社保' || s === '项目社保费') return '520101'
    if (s === '管理社保' || s === '管理社保费' || s === '管理人员社保') return '660203'
    if (s === '社保费用' || s === '单位社保') return '221102'
    // 折旧
    if (s.includes('折旧') || s === '计提折旧') return '660201'
    // 摊销
    if (s.includes('摊销') && (s.includes('房租') || s.includes('租金'))) return '660206'
    if (s === '无形资产摊销' || s === '摊销' || s.includes('软件摊销')) return '660206'
    if (s === '摊销房租' || s === '摊销本月办公室租金' || s === '摊销租金') return '660206'
    // 水电费
    if (s.includes('水电')) {
      if (isDebit) return '660201'
    }
    // 利息
    if (s === '利息' || s === '借款利息' || s.includes('计提利息') || (s.includes('利息') && isDebit)) return '6603'
    if (s === '银行活期利息' || s === '利息收入') return '100201'
    // 银行手续费
    if (s.includes('手续费') || s.includes('账户管理费') || s === '财务费用') return '6603'
    // 还本
    if (s === '偿还借款本金' || s === '还本' || s.includes('还本')) return '2001'
    if (s === '支付应付利息' || s === '付息' || s.includes('付息')) return '2232'
    // 购车/固定资产
    if (s === '购买商务车' || s === '购车' || s === '购买商务用车') return '160104'
    if (s.includes('购买') && (s.includes('电脑') || s.includes('办公设备'))) return '160103'
    // 外包
    if (s.includes('外包') || s === '外包开发费' || s === '外包服务费') return '520103'
    // 差旅费
    if (s.includes('差旅') && s.includes('项目')) return '520102'
    if (s.includes('差旅')) return '660202'
    // 合同负债转收入
    if (s.includes('合同负债转收入') || s === '合同负债转收入') return '2205'
    // 收取款项
    if (s.includes('尾款') || s.includes('定金') || s === '收取尾款' || s === '收取定金') return '100201'
    if (s === '合同负债' || s === '定金增值税' || s === '尾款增值税') {
      if (isDebit) return '2205'
    }
    // 结转成本
    if (s.includes('结转') && (s.includes('成本') || s.includes('App项目成本') || s === '结转主营业务成本')) return '6401'
    if (s === '结转收入' || s === '结转主营业务收入') return '6001'
    if (s === '成本费用转入' || s === '成本费用转入本年利润' || s === '费用转入') return '4103'
    if (s === '结转管理费用') return '6602'
    if (s === '结转财务费用(红字)') return '6603'
    // 现金增加
    if (s === '现金增加' || s === '提取备用金') return '1001'
    if (s === '银行存款增加' || s === '利息收入' || s === '转入建行') return '100201'
    // 损益类期末结转
    if (s === '收入' || s === '收入转利润' || s === '结转收入' || (s.includes('收入') && isDebit && taskContext && taskContext.includes('期末结转'))) return '6001'
    // 税金及附加
    if (s === '城建税' || s === '教育费附加' || s === '计算城建税' || s === '计算教育附加') return '6403'
    // 提取盈余公积
    if (s === '提取盈余公积' || s === '提取法定盈余公积') return '410402'
    // 所得税费用
    if (s === '计提所得税' || s === '计算所得税费用') return '6801'
    // 其他常见
    if (s === '广告宣传费' || s === '业务招待费' || s === '管理费用' || s === '办公费') return '660201'
    if (s === '退回' || s === '退现') return '1001'
    if (s === '采购工具' || s === '采购软件工具') return '660201'
    if (s === '承兑汇票到账') return '100201'
    if (s === '汇票托收到账') return '100201'
    if (s.includes('快递费')) return '660201'
    if (s.includes('宣传费')) return '660101'
    if (s.includes('业务招待')) return '660201'
    if (s.includes('午餐') || s.includes('餐补')) return '660203'
    if (s.includes('保险费') || s === '购车保险费') return '660201'
    if (s.includes('季度结息') || s === '银行活期利息' || s === '结息') return '100201'
    if (s === '结转成本') return '6401'
    if (s === '结转税金') return '6403'
    // 净利润结转
    if (s === '净利润转入' || s === '本年亏损') return '4103'
    // 提取坏账准备
    if (s === '提取坏账准备' || s === '信用减值损失' || s === '资产减值损失') return '6701'
  }

  // ---- 贷方推断 ----
  if (isCredit) {
    // 缴纳税款(贷方=银行存款)
    if (s === '缴纳税款' || s === '缴税' || s === '税') return '100201'
    // 社保缴纳(贷方)
    if (s.includes('社保') && (s.includes('缴') || s === '社保')) return '100201'
    // 所得税(贷方)
    if (s.includes('所得税') && s.includes('缴')) return '100201'
    // 工资实发(贷方)
    if (s === '实发工资' || s === '实发' || s.includes('代发') || s === '发工资') return '100201'
    if (s === '工资' || s === '银行代发' || s === '转账') return '100201'
    // 个税(贷方)
    if (s.includes('个税') || s === '代扣个税' || s === '代扣个人所得税') return '222102'
    // 合同负债
    if (s === '合同负债' || s === '预收合同款') return '2205'
    // 增值税(贷方)
    if (s === '定金增值税' || s === '尾款增值税' || s === '增值税' || s === '计提税费' || s === '计提增值税') return '222101'
    // 城建税/教育费附加(贷方)
    if (s === '城建税' || s === '计提城建税') return '222103'
    if (s === '教育费附加' || s === '计提教育费附加' || s === '计提教育附加费') return '222104'
    // 累计折旧
    if (s.includes('累计折旧') || s === '累计折旧') return '1602'
    // 累计摊销
    if (s.includes('累计摊销') || s === '累计摊销') return '1702'
    // 摊销房租(贷方)
    if (s === '房租摊销' || s === '预付摊销' || s === '摊销租金') return '1123'
    // 应付职工薪酬
    if (s === '应付职工薪酬' || s.includes('薪酬') || s === '薪酬' || s.includes('应付薪酬')) return '221101'
    if (s === '社保费用' || s === '计提社保费用' || s === '社保' || s.includes('社保')) return '221102'
    // 银行存款减少
    if (s === '银行存款减少' || s === '工行转出' || s.includes('减少')) return '100201'
    if (s === '还本付息' || s === '还本付息操作') return '100201'
    // 现金减少
    if (s === '现金减少' || s === '现金付款' || s === '借支') return '1001'
    // 购车付款
    if (s === '购车付款' || s === '购车') return '100201'
    // 支付外包费
    if (s === '支付外包费' || s === '外包费') return '100201'
    // 支付水电费
    if (s === '支付水电费' || s === '水电费') return '100201'
    // 利息收入(贷方)
    if (s === '利息收入' || s === '银行活期利息' || s === '结息') {
      // 银行利息收入冲减财务费用
      return '6603'
    }
    // 确认收入
    if ((s.includes('确认') || s === '确认收入') && !s.includes('增值税') && !s.includes('税金')) return '6001'
    if (s === '主营业务收入' || s === '收入确认' || s === '咨询收入' || s === '确认咨询收入') return '6001'
    // 结转收入
    if (s === '收入转入本年利润' || s === '收入转利润' || (s.includes('转本年利润') && s.includes('收入'))) return '4103'
    // 结转成本
    if (s === '结转主营业务成本' || s === '结转成本') return '6401'
    if (s === '结转税金及附加' || s === '结转税金') return '6403'
    if (s === '结转管理费用') return '6602'
    if (s === '结转财务费用') return '6603'
    if (s === '结转所得税费用') return '6801'
    // 成本费用转入
    if (s === '成本费用转入本年利润' || s === '成本' || s === '成本费用') return '4103'
    // 结转人工/差旅/外包
    if (s === '结转人工成本' || s.includes('结转人工')) return '520101'
    if (s.includes('结转差旅')) return '520102'
    if (s.includes('结转外包')) return '520103'
    if (s.includes('结转其他费用') || s.includes('结转场地')) return '520104'
    // 冲借款
    if (s === '冲借款' || s === '冲销' || s === '冲销差旅费预借款' || s === '冲销借款') return '1221'
    // 盈余公积
    if (s === '盈余公积' || s.includes('盈余公积')) return '4101'
    // 应付利息
    if (s === '应付利息' || s.includes('利息')) return '2232'
    // 坏账准备
    if (s === '坏账准备' || s === '计提坏账准备') return '1231'
    // 支付宝/微信付款
    if (s.includes('支付宝') || s === '支付宝付款') return '101205'
    if (s.includes('微信')) return '101204'
    // 合同负债
    if (s === '合同负债' || s.includes('合同负债')) return '2205'
    // 应收票据减少
    if (s === '应收票据减少' || s.includes('应收票据')) return '1121'
    // 其他常见贷方
    if (s === '收入确认' || s === '确认收入' || s === '确认App开发收入') return '6001'
    if (s === '研发支出转无形资产') return '530102'
    if (s === '收入' || (s.includes('收入') && taskContext && (taskContext.includes('确认') || taskContext.includes('收入')))) return '6001'
  }

  return null
}

/**
 * 添加 explanation 字段
 */
function inferExplanation(entry, subjectCode, taskContext) {
  if (!subjectCode) return ''

  const s = (entry.summary || '').trim()
  const isDebit = (Number(entry.debit) || 0) > 0

  const explanations = {
    '1001': isDebit ? '库存现金增加记借方。' : '库存现金减少记贷方。',
    '100201': isDebit ? '银行存款增加记借方。' : '银行存款减少记贷方。',
    '100202': isDebit ? '银行存款增加记借方。' : '银行存款减少记贷方。',
    '101204': isDebit ? '其他货币资金-微信增加记借方。微信收款入账。' : '其他货币资金-微信减少记贷方。微信支付款项。',
    '101205': isDebit ? '其他货币资金-支付宝增加记借方。' : '其他货币资金-支付宝减少记贷方。支付宝支付款项。',
    '1121': isDebit ? '应收票据增加记借方。' : '应收票据减少记贷方。',
    '1123': isDebit ? '预付账款增加记借方。' : '预付账款减少记贷方。预付费用逐月摊销。',
    '1221': isDebit ? '其他应收款增加记借方。员工预借差旅费。' : '其他应收款减少记贷方。冲销预借款。',
    '1231': '坏账准备增加记贷方。计提坏账准备。',
    '1601': isDebit ? '固定资产增加记借方。购入固定资产。' : '固定资产减少记贷方。',
    '160103': isDebit ? '固定资产-办公设备增加记借方。购入办公设备。' : '固定资产-办公设备减少记贷方。',
    '160104': isDebit ? '固定资产-运输设备增加记借方。购入运输设备。' : '固定资产-运输设备减少记贷方。',
    '1602': '累计折旧增加记贷方。计提固定资产折旧。',
    '1701': isDebit ? '无形资产增加记借方。购入无形资产。' : '无形资产减少记贷方。',
    '1702': '累计摊销增加记贷方。摊销无形资产。',
    '2001': isDebit ? '短期借款减少记借方。偿还短期借款本金。' : '短期借款增加记贷方。',
    '2205': isDebit ? '合同负债减少记借方。冲销此前收取的预收款。' : '合同负债增加记贷方。收到预收款尚未履约。',
    '221101': isDebit ? '应付职工薪酬-工资减少记借方。冲销此前计提的应付工资。' : '应付职工薪酬-工资增加记贷方。计提工资。',
    '221102': isDebit ? '应付职工薪酬-社保减少记借方。缴纳后社保负债清空。' : '应付职工薪酬-社保增加记贷方。计提单位社保费用。',
    '222101': isDebit ? '应交增值税减少记借方。缴纳增值税冲销负债。' : '应交增值税-销项税额增加记贷方。',
    '222102': isDebit ? '应交所得税减少记借方。缴纳所得税。' : '应交所得税（个税）增加记贷方。企业代扣的员工个人所得税负债。',
    '222103': isDebit ? '应交城建税减少记借方。缴纳城建税冲销负债。' : '应交城建税增加记贷方。',
    '222104': isDebit ? '应交教育费附加减少记借方。缴纳教育费附加冲销负债。' : '应交教育费附加增加记贷方。',
    '2232': isDebit ? '应付利息减少记借方。支付借款利息。' : '应付利息增加记贷方。计提借款利息。',
    '4001': isDebit ? '实收资本减少记借方。' : '实收资本增加记贷方。收到投资款。',
    '4101': '盈余公积增加记贷方。计提法定盈余公积。',
    '4103': isDebit ? '本年利润减少记借方。结转支出。' : '本年利润增加记贷方。结转收入增加本年利润。',
    '410402': isDebit ? '利润分配-提取盈余公积增加记借方。' : '利润分配-提取盈余公积减少记贷方。',
    '5201': isDebit ? '劳务成本增加记借方。项目成本支出。' : '劳务成本减少记贷方。结转已完工项目成本。',
    '520101': isDebit ? '劳务成本-人工成本增加记借方。项目人员工资计入成本。' : '劳务成本-人工成本减少记贷方。结转项目人工成本。',
    '520102': isDebit ? '劳务成本-差旅费增加记借方。项目直接差旅费。' : '劳务成本-差旅费减少记贷方。结转项目差旅费。',
    '520103': isDebit ? '劳务成本-外包服务费增加记借方。项目外包支出。' : '劳务成本-外包服务费减少记贷方。结转外包服务费。',
    '520104': isDebit ? '劳务成本-其他直接费用增加记借方。' : '劳务成本-其他直接费用减少记贷方。',
    '530102': '研发支出-资本化支出增加记借方。',
    '6001': isDebit ? '主营业务收入减少记借方。期末结转至本年利润。' : '主营业务收入增加记贷方。确认收入。',
    '6401': isDebit ? '主营业务成本增加记借方。结转已完工项目成本。' : '主营业务成本减少记贷方。期末结转至本年利润。',
    '6403': isDebit ? '税金及附加增加记借方。计提附加税。' : '税金及附加减少记贷方。期末结转至本年利润。',
    '6601': isDebit ? '销售费用增加记借方。' : '销售费用减少记贷方。期末结转至本年利润。',
    '660101': isDebit ? '销售费用-广告费增加记借方。' : '销售费用-广告费减少记贷方。',
    '6602': isDebit ? '管理费用增加记借方。' : '管理费用减少记贷方。期末结转至本年利润。',
    '660201': isDebit ? '管理费用-办公费增加记借方。日常费用计入管理费用。' : '管理费用-办公费减少记贷方。期末结转至本年利润。',
    '660202': isDebit ? '管理费用-差旅费增加记借方。出差交通住宿计入管理费用。' : '管理费用-差旅费减少记贷方。期末结转至本年利润。',
    '660203': isDebit ? '管理费用-工资薪金增加记借方。计提管理人员工资。' : '管理费用-工资薪金减少记贷方。期末结转至本年利润。',
    '660206': isDebit ? '管理费用-摊销费增加记借方。摊销费用计入管理费用。' : '管理费用-摊销费减少记贷方。期末结转至本年利润。',
    '6603': isDebit ? '财务费用增加记借方。' : '财务费用减少记贷方（红字冲回/利息收入冲减）。',
    '6701': isDebit ? '资产减值损失增加记借方。计提资产减值准备。' : '资产减值损失减少记贷方。期末结转至本年利润。',
    '6801': isDebit ? '所得税费用增加记借方。计提所得税。' : '所得税费用减少记贷方。期末结转至本年利润。',
    '6711': isDebit ? '营业外支出增加记借方。' : '营业外支出减少记贷方。',
  }

  return explanations[subjectCode] || (isDebit ? '科目增加记借方。' : '科目增加记贷方。')
}

/**
 * 判断context是否包含关键字
 */
function getTaskContext(task) {
  return (task.title || '') + ' ' + (task.description || '') + ' ' + (task.tags || []).join(' ')
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')

  // Find all task objects
  const taskPattern = /\{\s*\n\s*"date":\s*"([^"]+)",\s*\n\s*"title":\s*"([^"]+)"/g
  let match
  let tasks = []
  while ((match = taskPattern.exec(content)) !== null) {
    tasks.push({ date: match[1], title: match[2], startIndex: match.index })
  }

  // Find entries within tasks
  const entryStartPattern = /\{\s*"summary":\s*"([^"]+)"/g
  let fixes = 0

  // We need to parse each entry to fix subjectCode
  // Use a regex that finds entries without subjectCode
  const entryNoSCPattern = /\{\s*\n\s*(?:"summary":\s*"([^"]+)",\s*\n\s*)?"debit":\s*([^,]+),\s*\n\s*"credit":\s*([^}]+)\s*\}(?!\s*\n\s*\{(?:[^}]*?subjectCode))/g

  // Simpler approach: find entries that don't have subjectCode
  const lines = content.split('\n')
  const newLines = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Check if this line starts an entry without subjectCode: { "summary": "..." or "debit": ...
    const trimmed = line.trim()
    if (trimmed.startsWith('{') && !trimmed.includes('subjectCode')) {
      // Check if this is an entry (has debit or credit)
      if (trimmed.includes('"debit"') || trimmed.includes('"credit"')) {
        // Found an entry without subjectCode
        // Read the full entry to get summary, debit, credit
        let j = i
        let entryText = ''
        while (j < lines.length && !trimmed.startsWith('}') && j < i + 20) {
          entryText += lines[j] + '\n'
          if (lines[j].trim() === '},' || lines[j].trim() === '}' || lines[j].trim() === '],') {
            break
          }
          j++
          if (j < lines.length) trimmed = lines[j].trim()
        }
        if (j < lines.length && (lines[j].trim() === '},' || lines[j].trim() === '}')) {
          entryText += lines[j] + '\n'
        } else {
          // Complex entry, read more lines
          while (j < lines.length) {
            entryText += lines[j] + '\n'
            if (lines[j].trim() === '},' || lines[j].trim() === '}') break
            j++
          }
        }

        // Now parse the entry to get fields
        // Merge multiple lines to parse
        const flatEntry = entryText.replace(/\n\s*/g, ' ').replace(/\s+/g, ' ').trim()

        // Extract fields
        const summaryMatch = flatEntry.match(/"summary":\s*"([^"]+)"/)
        const debitMatch = flatEntry.match(/"debit":\s*([^,}]+)/)
        const creditMatch = flatEntry.match(/"credit":\s*([^,}]+)/)

        if (summaryMatch || (debitMatch && creditMatch)) {
          const summary = summaryMatch ? summaryMatch[1] : ''
          const debit = debitMatch ? debitMatch[1].trim() : '0'
          const credit = creditMatch ? creditMatch[1].trim() : '0'

          const entry = { summary, debit, credit }

          // Find the task this entry belongs to
          let taskTitle = ''
          for (const t of tasks) {
            if (t.startIndex <= i) {
              taskTitle = t.title
            }
          }

          const subjectCode = inferSubjectCode(entry, taskTitle)

          if (subjectCode) {
            // Find the right place to insert subjectCode
            // Insert after the opening { or after summary
            let insertPos = i + 1
            if (lines[i].trim().startsWith('{') && lines[i].includes('"summary"')) {
              // subjectCode before summary
              const indent = lines[i].match(/^(\s*)/)[1]
              const replacement = indent + '{ subjectCode: \'' + subjectCode + '\', summary: ' + lines[i].trim().substring(1)
              newLines.push(replacement)
              // Skip remaining entry lines that we've already consumed
              while (i < j) {
                i++
              }
              continue
            } else if (lines[i].trim() === '{' && i + 1 < lines.length && lines[i + 1].trim().startsWith('"summary"')) {
              // subjectCode on the same line as {, before summary
              newLines.push(lines[i])
              i++
              const indent = lines[i].match(/^(\s*)/)[1]
              newLines.push(indent + 'subjectCode: \'' + subjectCode + '\', ' + lines[i].trim())
              i++
            } else if (lines[i].trim().startsWith('{') && !lines[i].includes('"summary"') && (lines[i].includes('"debit"') || lines[i].includes('"credit"'))) {
              // No summary, just debit/credit (like the inline format)
              // Add subjectCode after {
              if (lines[i].trim().endsWith(',') || lines[i].trim().endsWith('{')) {
                // Multi-line format
                newLines.push(lines[i])
                i++
                const explanation = inferExplanation(entry, subjectCode, taskTitle)
                while (i <= j) {
                  const currLine = lines[i]
                  // Insert subjectCode before credit
                  if (currLine.trim().startsWith('"credit"') || currLine.trim().startsWith('"debit"')) {
                    const indent = currLine.match(/^(\s*)/)[1]
                    newLines.push(indent + 'subjectCode: \'' + subjectCode + '\',')
                  }
                  newLines.push(currLine)
                  i++
                }
                continue
              }
            } else {
              // Multi-line: { on its own line
              newLines.push(lines[i])
              i++
              while (i <= j) {
                const currLine = lines[i]
                if (currLine.trim().startsWith('"summary"')) {
                  const indent = currLine.match(/^(\s*)/)[1]
                  const summary = currLine.match(/"summary":\s*"([^"]+)"/)
                  if (summary) {
                    newLines.push(indent + 'subjectCode: \'' + subjectCode + '\', ' + currLine.trim())
                  } else {
                    newLines.push(indent + 'subjectCode: \'' + subjectCode + '\',')
                    newLines.push(currLine)
                  }
                } else {
                  newLines.push(currLine)
                }
                i++
              }
            }
            fixes++
          } else {
            // Could not infer subjectCode, keep original
            while (i <= j && i < lines.length) {
              newLines.push(lines[i])
              i++
            }
          }
        } else {
          newLines.push(lines[i])
          i++
        }
      } else {
        newLines.push(lines[i])
        i++
      }
    } else {
      newLines.push(lines[i])
      i++
    }
  }

  if (fixes > 0) {
    const newContent = newLines.join('\n')
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(fixes + ' fixes applied to ' + path.basename(filePath))
  } else {
    console.log('No fixes needed for ' + path.basename(filePath))
  }

  return fixes
}

// Process months 04-12
const months = ['04','05','06','07','08','09','10','11','12']
let totalFixes = 0
for (const m of months) {
  const filePath = path.join(SERVICE_DIR, m + '.js')
  totalFixes += processFile(filePath)
}
console.log('\nTotal: ' + totalFixes + ' fixes applied')
