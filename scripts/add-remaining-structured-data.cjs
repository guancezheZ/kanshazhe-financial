/**
 * 为剩余的 plain-text 文档添加 headers/rows 结构化数据
 *
 * 用法：node scripts/add-remaining-structured-data.cjs
 * 完成后运行：npm run test
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')

const files = {
  '12.js': [
    {
      // 所得税计提表 - 在 content 后面插入 headers/rows
      // 这个文件有特殊格式：content 后面有空行，docTitle 缩进不一致
      target: "content: '测算说明：截至12月20日，全年利润暂估（12月尚未最终决算）\\n\\n一、利润测算\\n  前11个月累计净利润：3,538,948元\\n  12月预估净利润：约174,000元\\n  全年暂估利润：约3,713,000元\\n\\n二、所得税计算\\n  应纳税所得额（暂估）：3,538,948元\\n  税率：25%\\n  应纳所得税：884,737元\\n\\n三、依据\\n  按暂估利润计提，待年度汇算清缴时调整',",
      insertion: `        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
            '前11个月累计净利润',
            '3,538,948元'
          ],
          [
            '12月预估净利润',
            '约174,000元'
          ],
          [
            '全年暂估利润',
            '约3,713,000元'
          ],
          [
            '应纳税所得额（暂估）',
            '3,538,948元'
          ],
          [
            '税率',
            '25%'
          ],
          [
            '应纳所得税',
            '884,737元'
          ],
        ],
`
    }
  ],
  '11.js': [
    {
      // 年末盘点表
      target: "content: '钢材：账面结余50吨，实存53吨，盘盈3吨（原因：计量误差），价值12,600元\\n冲减工程成本\\n盘点人：刘保管  监盘人：李会计',",
      insertion: `        headers: [
          '项目',
          '账面结余',
          '实存',
          '盘盈/盘亏',
          '原因',
          '金额'
        ],
        rows: [
          [
            '钢材',
            '50吨',
            '53吨',
            '盘盈3吨',
            '计量误差',
            '12,600元'
          ],
        ],
`
    },
    {
      // 坏账计提表
      target: "content: '应收余额1,023,600×5%=51,000元'",
      insertion: `        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '应收账款余额',
            '1,023,600元'
          ],
          [
            '坏账计提比例',
            '5%'
          ],
          [
            '坏账计提金额',
            '51,000元'
          ],
        ],
`
    },
    {
      // 供应商对账确认表
      target: "content: '华强建材：应付余额128,000元 ✓\\n大地商砼：应付余额95,000元 ✓\\n鑫达钢材：应付余额45,000元 ✓',",
      insertion: `        headers: [
          '供应商',
          '应付余额',
          '状态'
        ],
        rows: [
          [
            '华强建材',
            '128,000元',
            '✓ 核对一致'
          ],
          [
            '大地商砼',
            '95,000元',
            '✓ 核对一致'
          ],
          [
            '鑫达钢材',
            '45,000元',
            '✓ 核对一致'
          ],
        ],
`
    },
    {
      // 坏账准备计提表
      target: "content: '应收账款余额：300,000元\\n计提比例：5%\\n计提金额：15,000元',",
      insertion: `        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '应收账款余额',
            '300,000元'
          ],
          [
            '计提比例',
            '5%'
          ],
          [
            '计提金额',
            '15,000元'
          ],
        ],
`
    }
  ]
}

let total = 0
for (const [fileName, edits] of Object.entries(files)) {
  const filePath = path.join(ROOT, 'src/data/tutorials/construction', fileName)
  let text = fs.readFileSync(filePath, 'utf8')
  let changed = false

  for (const edit of edits) {
    const idx = text.indexOf(edit.target)
    if (idx < 0) {
      console.log(`⚠ ${fileName}: 未找到目标内容，跳过`)
      continue
    }
    // 检查是否已有 headers
    const afterTarget = text.slice(idx + edit.target.length, idx + edit.target.length + 100)
    if (afterTarget.includes('headers:')) {
      console.log(`⏭ ${fileName}: 已存在 headers，跳过`)
      continue
    }
    const contentEnd = idx + edit.target.length
    text = text.slice(0, contentEnd) + '\n' + edit.insertion + text.slice(contentEnd)
    changed = true
    total++
    console.log(`✅ ${fileName}: 添加结构化数据 (${edit.target.slice(9, 25)}...)`)
  }

  if (changed) {
    fs.writeFileSync(filePath, text, 'utf8')
  }
}

console.log(`\n📊 合计：${total} 个文档已添加 headers/rows`)
