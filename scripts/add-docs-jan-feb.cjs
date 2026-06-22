/**
 * 为1-2月添加原始凭证
 * 用法：node scripts/add-docs-jan-feb.cjs
 * 安全：只修改 tasks 的 documents 字段，不碰其他内容
 */
const fs = require('fs')
const path = require('path')

const DOCS = {
  '2026-01-10': [{"type":"bank","label":"缴费回单","date":"2026-01-10","totalAmount":1200,"payer":"本公司","payeeName":"中国电信XX分公司","content":"1月电话费及网络费","refNo":"HD202601100020"}],
  '2026-01-13': [{"type":"text","label":"工资计算表","docTitle":"直接人工费用分配表","date":"2026-01-13","stampText":"人力资源部\n工资专用章","content":"生产车间直接人工：35,000元"}],
  '2026-01-14': [{"type":"receipt","label":"电费单","docTitle":"电费缴费凭证","date":"2026-01-14","totalAmount":2500,"payer":"本公司","stampText":"国家电网\n电费收讫章","items":[{"name":"电费 2,500kWh","qty":2500,"price":1,"amount":2500}]},{"type":"receipt","label":"水费单","docTitle":"水费缴费凭证","date":"2026-01-14","totalAmount":800,"payer":"本公司","stampText":"自来水公司\n水费收讫章","items":[{"name":"水费 200吨","qty":200,"price":4,"amount":800}]}],
  '2026-01-15': [{"type":"text","label":"制造费用计算表","docTitle":"制造费用归集计算表","date":"2026-01-15","stampText":"财务专用章","content":"折旧2,000+水电3,500=5,500元"}],
  '2026-01-16': [{"type":"text","label":"制造费用分配表","docTitle":"制造费用分配表","date":"2026-01-16","stampText":"财务专用章","content":"分配11,500元至生产成本"}],
  '2026-01-17': [{"type":"text","label":"入库单","docTitle":"产品入库单","date":"2026-01-17","stampText":"仓库\n验收专用章","content":"A产品100台 116,500元 单位成本1,165元"}],
  '2026-01-20': [{"type":"bank","label":"利息入账回单","date":"2026-01-20","totalAmount":8500,"payer":"中国工商银行","payeeName":"本公司","content":"1月存款利息","refNo":"HD202601200050"}],
  '2026-01-21': [{"type":"text","label":"成本计算表","docTitle":"销售成本计算表","date":"2026-01-21","stampText":"财务专用章","content":"80台×1,165=93,200元（先进先出）"}],
  '2026-01-22': [{"type":"bank","label":"网银转账回单","date":"2026-01-22","totalAmount":30000,"payer":"本公司（工行）","payeeName":"本公司（建行）","content":"资金调拨","refNo":"HD202601220045"}],
  '2026-01-25': [{"type":"text","label":"税费计算表","docTitle":"税费计提计算表","date":"2026-01-25","stampText":"财务专用章","content":"城建税1,456+教育附加624=2,080元"}],
  '2026-01-27': [{"type":"bank","label":"银行扣费回单","date":"2026-01-27","totalAmount":200,"payer":"本公司","payeeName":"中国工商银行","content":"账户管理费","refNo":"HD202601270080"}],
  '2026-01-29': [{"type":"bank","label":"社保扣款回单","date":"2026-01-29","totalAmount":18000,"payer":"本公司","payeeName":"XX市社保局","content":"1月社保单位部分","refNo":"HD202601290070"},{"type":"bank","label":"公积金扣款回单","date":"2026-01-29","totalAmount":9000,"payer":"本公司","payeeName":"XX市公积金中心","content":"1月公积金单位部分","refNo":"HD202601290071"}],
  '2026-01-30': [{"type":"text","label":"结转计算表","docTitle":"期间损益结转表（1月）","date":"2026-01-30","stampText":"已结转","content":"收入160,000-费用109,580+财务7,700=净利润50,420"}],
  '2026-02-02': [{"type":"bank","label":"代发工资回单","date":"2026-02-02","totalAmount":76500,"payer":"本公司","payeeName":"员工代发户","content":"1月工资代发","refNo":"HD202602020030"}],
  '2026-02-03': [{"type":"bank","label":"缴税回单","date":"2026-02-03","totalAmount":22880,"payer":"本公司","payeeName":"XX市税务局","content":"1月增值税及附加","refNo":"HD202602030040"}],
  '2026-02-04': [{"type":"bank","label":"转账回单","date":"2026-02-04","totalAmount":150000,"payer":"本公司","payeeName":"丙公司","content":"支付1月采购款","refNo":"HD202602040050"}],
  '2026-02-05': [{"type":"bank","label":"收款回单","date":"2026-02-05","totalAmount":67800,"payer":"丁公司","payeeName":"本公司","content":"1月赊销货款","refNo":"HD202602050060"}],
  '2026-02-06': [{"type":"receipt","label":"收据","docTitle":"房屋租赁专用收据","date":"2026-02-06","totalAmount":8000,"payer":"本公司","stampText":"XX物业\n财务专用章","items":[{"name":"2月租金","qty":1,"price":8000,"amount":8000}]}],
  '2026-02-07': [{"type":"bank","label":"转账回单","date":"2026-02-07","totalAmount":5000,"payer":"本公司","payeeName":"XX设备维修公司","content":"设备检修费","refNo":"HD202602070070"}],
  '2026-02-08': [{"type":"bank","label":"现金支票回单","date":"2026-02-08","totalAmount":3000,"payer":"本公司","payeeName":"本公司（现金）","content":"提取备用金","refNo":"HD202602080080"}],
  '2026-02-09': [{"type":"text","label":"领料单","docTitle":"领料单","date":"2026-02-09","stampText":"仓库\n发料专用章","content":"A型钢材6吨90,000元\n用途：生产A产品"}],
  '2026-02-10': [{"type":"text","label":"微信收款记录","docTitle":"微信商户收款记录","date":"2026-02-10","stampText":"微信商户平台","content":"微信收款8,000元 交易成功"}],
  '2026-02-11': [{"type":"bank","label":"收款回单","date":"2026-02-11","totalAmount":4000,"payer":"供应商","payeeName":"本公司","content":"退货退款","refNo":"HD202602110090"}],
  '2026-02-12': [{"type":"invoice","label":"增值税专用发票","region":"广东","invoiceType":"专用","invoiceNo":"4400215678","date":"2026年02月12日","buyer":"乙公司","seller":"本公司","stampText":"发票专用章","lineItems":[{"name":"A产品","unit":"台","qty":60,"price":2000,"amount":120000,"taxRate":"13%","tax":15600}],"totalAmount":135600},{"type":"bank","label":"收款回单","date":"2026-02-12","totalAmount":135600,"payer":"乙公司","payeeName":"本公司","content":"货款","refNo":"HD202602120100"}],
  '2026-02-13': [{"type":"receipt","label":"报销单","docTitle":"差旅费报销单","date":"2026-02-13","totalAmount":2500,"payer":"本公司","stampText":"财务\n审核专用章","items":[{"name":"交通住宿","qty":1,"price":2500,"amount":2500}]}],
  '2026-02-14': [{"type":"text","label":"领料单","docTitle":"领料单","date":"2026-02-14","stampText":"仓库\n发料专用章","content":"B型材料2批4,000元\n用途：机物料消耗"}],
  '2026-02-15': [{"type":"receipt","label":"电费单","docTitle":"电费凭证","date":"2026-02-15","totalAmount":2800,"payer":"本公司","stampText":"国家电网\n电费收讫章","items":[{"name":"电费","qty":2800,"price":1,"amount":2800}]},{"type":"receipt","label":"水费单","docTitle":"水费凭证","date":"2026-02-15","totalAmount":900,"payer":"本公司","stampText":"自来水公司\n水费收讫章","items":[{"name":"水费","qty":225,"price":4,"amount":900}]}],
  '2026-02-16': [{"type":"text","label":"工资计算表","docTitle":"直接人工费用表","date":"2026-02-16","stampText":"财务专用章","content":"生产工人工资35,000元"}],
  '2026-02-17': [{"type":"text","label":"费用归集表","docTitle":"制造费用归集表","date":"2026-02-17","stampText":"财务专用章","content":"折旧2,000+水电3,000+辅料4,000=9,000元"}],
  '2026-02-18': [{"type":"text","label":"分配表","docTitle":"制造费用分配表","date":"2026-02-18","stampText":"财务专用章","content":"分配9,000元至生产成本"}],
  '2026-02-19': [{"type":"text","label":"入库单","docTitle":"收料单","date":"2026-02-19","stampText":"仓库\n验收专用章","content":"A型钢材10吨150,000元\n供应商：丙公司"}],
  '2026-02-20': [{"type":"text","label":"暂估入库单","docTitle":"暂估入库单","date":"2026-02-20","stampText":"仓库\n验收专用章","content":"C型材料5吨暂估90,000元\n发票未到"}],
  '2026-02-21': [{"type":"bank","label":"收款回单","date":"2026-02-21","totalAmount":33300,"payer":"庚公司","payeeName":"本公司","content":"货款（折扣后）","refNo":"HD202602210110"},{"type":"text","label":"折扣计算","docTitle":"现金折扣计算","date":"2026-02-21","stampText":"财务专用章","content":"原33,900-折扣600=实收33,300"}],
  '2026-02-22': [{"type":"receipt","label":"服务发票","docTitle":"推广费发票","date":"2026-02-22","totalAmount":5000,"payer":"本公司","stampText":"百度\n发票专用章","items":[{"name":"搜索推广服务费","qty":1,"price":5000,"amount":5000}]}],
  '2026-02-23': [{"type":"text","label":"入库单","docTitle":"产品入库单","date":"2026-02-23","stampText":"仓库\n验收专用章","content":"A产品100台134,000元\n单位成本1,340元"}],
  '2026-02-24': [{"type":"text","label":"成本计算表","docTitle":"销售成本计算表","date":"2026-02-24","stampText":"财务专用章","content":"先进先出：20×1,165+40×1,340=76,900元"}],
  '2026-02-25': [{"type":"bank","label":"利息回单","date":"2026-02-25","totalAmount":7500,"payer":"工商银行","payeeName":"本公司","content":"2月利息","refNo":"HD20260225INT"}],
  '2026-02-26': [{"type":"bank","label":"扣费回单","date":"2026-02-26","totalAmount":300,"payer":"本公司","payeeName":"工商银行","content":"手续费","refNo":"HD20260226FEE"},{"type":"text","label":"利息计算","docTitle":"借款利息计算","date":"2026-02-26","stampText":"财务专用章","content":"150,000×4.35%÷12≈544元"}],
  '2026-02-28_0': [{"type":"text","label":"税费计算表","docTitle":"附加税计算表","date":"2026-02-28","stampText":"财务专用章","content":"城建税1,092+教育费附加468=1,560元"}],
  '2026-02-28_1': [{"type":"text","label":"结转表","docTitle":"期间损益结转表（2月）","date":"2026-02-28","stampText":"已结转","content":"收入120,000-费用124,460+财务6,656=净利润2,196元"}],
}

function main() {
  const files = [
    { path: 'src/data/tutorials/year1.js', month: '01' },
    { path: 'src/data/tutorials/months/02.js', month: '02' }
  ]

  for (const { path: relPath, month } of files) {
    const absPath = path.resolve(__dirname, '..', relPath)
    // Read the file and parse as module
    delete require.cache[absPath]
    // We can't use require() on ESM files. Need a different approach.
    // Instead, read the file as text and use regex+split
    const content = fs.readFileSync(absPath, 'utf-8')

    // Find each task by date, then add documents at task level
    // Strategy: for each date key in DOCS, find the task by date + title
    // and add documents: [...] before the closing },
    let result = content
    let count = 0

    for (const [key, docs] of Object.entries(DOCS)) {
      let date, taskIdx = 0
      if (key.includes('_')) {
        const parts = key.split('_')
        date = parts[0]
        taskIdx = parseInt(parts[1]) || 0
      } else {
        date = key
      }

      const docsStr = JSON.stringify(docs)

      // Find all occurrences of this date in the content
      const dateRegex = new RegExp("date:\\s*'" + date + "'", 'g')
      let match
      let foundIdx = -1
      let idx = 0
      while ((match = dateRegex.exec(result)) !== null) {
        if (idx === taskIdx) { foundIdx = match.index; break }
        idx++
      }
      if (foundIdx === -1) continue

      // From the date, find the task's closing },
      // Count braces to find the matching }
      let braceCount = 0
      let endPos = -1
      for (let i = foundIdx; i < result.length; i++) {
        if (result[i] === '{') braceCount++
        else if (result[i] === '}') {
          braceCount--
          if (braceCount <= 0) {
            endPos = i
            break
          }
        }
      }
      if (endPos === -1) continue

      // Check if task already has documents
      const taskEnd = result.slice(endPos - 80, endPos + 2)
      if (taskEnd.includes('documents:')) continue

      // Insert documents: [...] before the closing }
      result = result.slice(0, endPos) + ', documents: ' + docsStr + ' }'
      count++
    }

    fs.writeFileSync(absPath, result, 'utf-8')
    console.log(relPath + ': ' + count + ' tasks updated')
  }
  console.log('Done')
}

main()
