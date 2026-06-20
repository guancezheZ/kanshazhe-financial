/** Fix remaining entries - corrected version */
const fs = require('fs');
const path = require('path');
const MAP = JSON.parse(fs.readFileSync('src/data/tutorials/service/summary-map.json', 'utf-8'));

function findMatch(s) {
  if (!s) return null;
  if (MAP[s]) return MAP[s];
  for (const [k, v] of Object.entries(MAP)) {
    if (k.length > 1 && (s.includes(k) || k.includes(s))) return v;
  }
  return null;
}

const SPECIAL = {
  "结转财务费用(红字)": { sc: "6603", expl: "财务费用减少记借方。红字冲销财务费用。" },
  "利息收入": { sc: "6603", expl: "财务费用减少记贷方。利息收入冲减财务费用。" },
  "结转其他业务收入": { sc: "6051", expl: "其他业务收入减少记借方。期末结转至本年利润。" },
  "资产减值损失": { sc: "6701", expl: "资产减值损失减少记贷方。期末结转至本年利润。" },
  "成本": { sc: "6401", expl: "主营业务成本减少记贷方。期末结转至本年利润。" },
  "结转成本": { sc: "6401", expl: "主营业务成本减少记贷方。期末结转至本年利润。" },
  "尾款": { sc: "100201", expl: "银行存款增加记借方。收到尾款入账。" },
  "预收": { sc: "100201", expl: "银行存款增加记借方。预收客户款项。" },
  "计提税费": { sc: "6403", expl: "税金及附加增加记贷方。期末结转至本年利润。" },
};

const months = ['04','05','06','07','08','09','10','11','12'];
const dir = path.join(__dirname, '..', 'src/data/tutorials/service');
let total = 0;

for (const m of months) {
  const fp = path.join(dir, m + '.js');
  let content = fs.readFileSync(fp, 'utf-8');
  const lines = content.split('\n');
  const out = [];
  let fixed = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Detect multi-line entry: { on its own line
    if (line.trim() === '{' && !line.includes('subjectCode')) {
      // Check if next lines contain "summary"
      const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
      if (nextLine.startsWith('"summary"')) {
        // Collect the full entry block
        let blockLines = [line];
        let depth = 1;
        i++;
        while (i < lines.length && depth > 0) {
          blockLines.push(lines[i]);
          depth += (lines[i].match(/{/g) || []).length;
          depth -= (lines[i].match(/}/g) || []).length;
          i++;
        }

        const joined = blockLines.join(' ');
        const sM = joined.match(/"summary": "([^"]+)"/);
        const dM = joined.match(/"debit": ([\d.]+)/);
        const cM = joined.match(/"credit": ([\d.]+)/);
        const summary = sM ? sM[1] : '';
        const debit = dM ? parseFloat(dM[1]) : 0;
        const credit = cM ? parseFloat(cM[1]) : 0;

        if ((debit > 0 || credit > 0) && summary) {
          // Find mapping
          let sc = null;
          let expl = null;

          if (SPECIAL[summary]) {
            sc = SPECIAL[summary].sc;
            expl = SPECIAL[summary].expl;
          } else {
            const isDebit = Number(debit) > 0;
            // For credit entries of tax items
            if (!isDebit && (summary.includes('城建税') || summary.includes('教育费附加'))) {
              if (summary === '城建税') { sc = '222103'; expl = '应交城建税增加记贷方。按增值税计提城建税。'; }
              else if (summary === '教育费附加') { sc = '222104'; expl = '应交教育费附加增加记贷方。按增值税计提教育费附加。'; }
            } else if (!isDebit && summary === '缴税') { sc = '100201'; expl = '银行存款减少记贷方。缴纳税款支付。'; }
            else if (!isDebit && summary === '缴社保') { sc = '100201'; expl = '银行存款减少记贷方。缴纳社保费支付。'; }
            else if (!isDebit && summary === '缴所得税') { sc = '100201'; expl = '银行存款减少记贷方。缴纳所得税款支付。'; }
            else if (!isDebit && summary === '购车') { sc = '100201'; expl = '银行存款减少记贷方。支付购车款项。'; }
            else if (!isDebit && summary === '冲借款') { sc = '1221'; expl = '其他应收款减少记贷方。报销冲抵借款。'; }
            else if (!isDebit && summary === '借支') { sc = '1001'; expl = '库存现金减少记贷方。员工借支现金。'; }
            else if (!isDebit && summary === '冲销') { sc = '1221'; expl = '其他应收款减少记贷方。冲销借款。'; }
            else if (!isDebit && summary === '退现') { sc = '1001'; expl = '库存现金减少记贷方。退还现金。'; }
            else if (!isDebit && summary === '支付水电费') { sc = '100201'; expl = '银行存款减少记贷方。支付水电费。'; }
            else if (!isDebit && summary === '差旅费') { sc = '100201'; expl = '银行存款减少记贷方。支付差旅费。'; }
            else if (isDebit && summary === '退回') { sc = '1001'; expl = '库存现金增加记借方。退回现金。'; }
            else if (isDebit && summary === '应发') { sc = '221101'; expl = '应付职工薪酬增加记贷方。计提应发工资。'; }
            else {
              const m2 = findMatch(summary);
              if (m2) {
                sc = m2.sc;
                expl = isDebit ? m2.dr : m2.cr;
              }
            }
          }

          if (sc && expl) {
            const indent = '        ';
            out.push(indent + "{ subjectCode: '" + sc + "', summary: '" + summary + "', debit: " + debit + ", credit: " + credit + ", explanation: '" + expl + "' },");
            fixed++;
            total++;
            continue;
          }
        }
        // If we couldn't fix, push original lines
        out.push(...blockLines);
        continue;
      }
    }
    out.push(line);
    i++;
  }

  if (fixed > 0) {
    fs.writeFileSync(fp, out.join('\n'), 'utf-8');
    console.log(m + '月: ' + fixed + '条');
  }
}

console.log('\n总计: ' + total + ' 条');
