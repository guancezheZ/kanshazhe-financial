/**
 * 服务业03-12月补充explanation字段脚本（v2）
 *
 * 处理两种entry格式：
 *   单行: { subjectCode: '...', summary: '...', debit: ..., credit: ... },
 *   多行: { "subjectCode": "...",\n  "summary": "...",\n  ...\n},
 *
 * 用法：node scripts/fix-service-explanations.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── 科目名称映射 ───
const SUBJECT_NAMES = {
  '1001': '库存现金',
  '100201': '银行存款',
  '100202': '银行存款',
  '101204': '其他货币资金-微信账户',
  '101205': '其他货币资金-支付宝账户',
  '1121': '应收票据',
  '1123': '预付账款',
  '1221': '其他应收款',
  '1231': '坏账准备',
  '160103': '固定资产-办公设备',
  '160104': '固定资产-运输设备',
  '1602': '累计折旧',
  '1701': '无形资产',
  '1702': '累计摊销',
  '2001': '短期借款',
  '2205': '合同负债',
  '221101': '应付职工薪酬-工资',
  '221102': '应付职工薪酬-社保',
  '222101': '应交税费-应交增值税',
  '222102': '应交税费-应交所得税',
  '222103': '应交税费-应交城建税',
  '222104': '应交税费-应交教育费附加',
  '2232': '应付利息',
  '2241': '其他应付款',
  '4001': '实收资本',
  '4103': '本年利润',
  '410401': '利润分配-未分配利润',
  '410402': '利润分配-提取盈余公积',
  '520101': '劳务成本-人工成本',
  '520102': '劳务成本-差旅费',
  '520103': '劳务成本-外包服务费',
  '520104': '劳务成本-其他直接费用',
  '530102': '研发支出-资本化支出',
  '6001': '主营业务收入',
  '6051': '其他业务收入',
  '6401': '主营业务成本',
  '6403': '税金及附加',
  '660101': '销售费用-广告费',
  '6602': '管理费用',
  '660201': '管理费用-办公费',
  '660203': '管理费用-工资薪金',
  '6603': '财务费用',
  '6701': '资产减值损失',
  '6801': '所得税费用',
};

function getCat(code) {
  const d = code[0];
  if (d === '1') return 'asset';
  if (d === '2') return 'liability';
  if (d === '4') return 'equity';
  if (d === '5') return 'cost';
  if (d === '6') return (code.startsWith('60') || code.startsWith('63') || code.startsWith('61')) ? 'revenue' : 'expense';
  return 'unknown';
}

function dirWord(code, isDebit) {
  const cat = getCat(code);
  if (isDebit) {
    if (cat === 'asset' || cat === 'cost' || cat === 'expense') return '增加';
    if (cat === 'liability' || cat === 'equity' || cat === 'revenue') return '减少';
  } else {
    if (cat === 'asset' || cat === 'cost' || cat === 'expense') return '减少';
    if (cat === 'liability' || cat === 'equity' || cat === 'revenue') return '增加';
  }
  return '变动';
}

function bizCtx(code, isDebit, summary) {
  if (code === '1001' || code.startsWith('1002') || code.startsWith('1012')) {
    if (isDebit) {
      if (/(收到|收取|回|收回|收款|转入|定金|投资|借款|到账)/.test(summary)) return '资金流入企业，资产增加。';
      return '资金流入，资产增加。';
    }
    if (/(缴纳|纳税|税费|税款|支付|付款|购买|采购|发放|工资|薪酬|还款|偿还)/.test(summary)) return '资金流出，资产减少。';
    if (/(预借|借支|备用金)/.test(summary)) return '现金支付，资产减少。';
    return '资金流出，资产减少。';
  }
  if (getCat(code) === 'liability') {
    if (isDebit) {
      if (/(缴纳|支付)/.test(summary)) return '缴纳后负债减少。';
      if (/(冲销|结转|冲减|转入收入)/.test(summary)) return '冲销负债。';
      return '负债减少。';
    }
    if (/(计提|确认)/.test(summary)) return '计提应付负债。';
    if (/(增值税|销项|代扣|个税|产生)/.test(summary)) return '产生纳税义务，负债增加。';
    if (/(合同负债|预收)/.test(summary)) return '已收款尚未履约，负债增加。';
    if (/(借款)/.test(summary)) return '借款增加，负债增加。';
    return '负债增加。';
  }
  if (getCat(code) === 'cost') {
    if (isDebit) {
      if (/(工资|薪酬)/.test(summary)) return '项目直接人工计入项目成本。';
      if (/(差旅)/.test(summary)) return '项目差旅费用计入项目成本。';
      if (/(外包|外协|授权|工具|调研)/.test(summary)) return '外部服务费归集到项目成本。';
      if (/(折旧|摊销)/.test(summary)) return '项目用资产折旧计入项目成本。';
      return '直接计入项目成本。';
    }
    return '成本减少或结转。';
  }
  if (getCat(code) === 'revenue') {
    if (!isDebit) return '确认收入，所有者权益增加。';
    return '收入减少或结转。';
  }
  if (getCat(code) === 'expense') {
    if (isDebit) {
      if (code === '6401') return '确认主营业务成本，计入当期损益。';
      if (code === '6403') return '确认税金及附加，计入当期损益。';
      if (/(办公|租金|摊销|差旅|折旧|修理)/.test(summary)) return '计入管理费用，影响当期损益。';
      if (/(工资|薪酬)/.test(summary)) return '管理人员工资计入期间费用。';
      if (/(手续费|利息|财务)/.test(summary)) return '计入财务费用，影响当期损益。';
      if (/(广告|宣传|销售)/.test(summary)) return '计入销售费用，影响当期损益。';
      return '计入当期损益。';
    }
    return '费用减少或结转。';
  }
  if (getCat(code) === 'asset') {
    if (isDebit) {
      if (code === '1121') return '收到商业汇票，债权增加。';
      if (code === '1123') return '预付款项形成企业的债权。';
      if (code === '1221') return '形成企业对员工的债权。';
      if (code.startsWith('1601')) return '资产购置，固定资产增加。';
      if (code === '1701') return '取得无形资产，资产增加。';
      if (code === '1231') return '计提坏账准备，资产价值减少。';
      return '资产增加。';
    }
    if (code === '1602') return '计提折旧，资产价值减少。';
    if (code === '1702') return '计提摊销，资产价值减少。';
    if (code === '1123') return '摊销预付费用，债权减少。';
    if (code === '1221') return '冲销预借款，债权减少。';
    if (code === '1121') return '票据减少，债权减少。';
    return '资产减少。';
  }
  return '权益变动。';
}

function genExp(code, debit, credit, summary) {
  const name = SUBJECT_NAMES[code];
  if (!name) return null;
  const isDebit = Number(debit) > 0;
  const dir = dirWord(code, isDebit);
  const side = isDebit ? '借方' : '贷方';
  const ctx = bizCtx(code, isDebit, summary || '');
  return `${name}${dir}记${side}。${ctx}`;
}

// ─── 处理文件 ───
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const out = [];
  let total = 0;
  let fixed = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 检测entry开始：包含 subjectCode 的行（单引号或双引号）
    const isEntryStart = /subjectCode\s*[:=]\s*['"]\d+['"]/.test(trimmed);

    if (isEntryStart) {
      // 检查是否单行（同一行有闭合大括号）
      const entryText = trimmed;
      const hasCloseBrace = /\}[,;]?\s*$/.test(trimmed);
      const hasExp = trimmed.includes('explanation');

      if (hasCloseBrace && !hasExp) {
        // 单行entry
        total++;
        const sc = trimmed.match(/subjectCode\s*[:=]\s*['"](\d+)['"]/);
        const db = trimmed.match(/debit\s*[:=]\s*([\d.]+)/);
        const cr = trimmed.match(/credit\s*[:=]\s*([\d.]+)/);
        const sm = trimmed.match(/summary\s*[:=]\s*['"]([^'"]*)['"]/);
        if (sc) {
          const exp = genExp(sc[1], db ? db[1] : 0, cr ? cr[1] : 0, sm ? sm[1] : '');
          if (exp) {
            // 在 }, 或 } 前插入 , explanation: '...'
            const m = trimmed.match(/^(\s*)(.*?)(\},?\s*)$/);
            if (m) {
              out.push(`${m[1]}${m[2]}, explanation: '${exp}'${m[3]}`);
              fixed++;
              i++;
              continue;
            }
          }
        }
        out.push(line);
        i++;
      } else if (!hasCloseBrace && !hasExp) {
        // 多行entry：收集直到闭合大括号
        total++;
        const buf = [line];
        let braceCount = 0;
        for (const ch of line) { if (ch === '{') braceCount++; if (ch === '}') braceCount--; }
        let j = i + 1;
        while (j < lines.length && braceCount > 0) {
          const l = lines[j];
          buf.push(l);
          for (const ch of l) { if (ch === '{') braceCount++; if (ch === '}') braceCount--; }
          j++;
        }

        // 检查entry块中是否有explanation
        const blockText = buf.join('\n');
        if (!blockText.includes('explanation')) {
          // 找到最后一个 }, 确定插入位置
          const exp = (() => {
            const sc = blockText.match(/subjectCode\s*[:=]\s*['"](\d+)['"]/);
            const db = blockText.match(/debit\s*[:=]\s*([\d.]+)/);
            const cr = blockText.match(/credit\s*[:=]\s*([\d.]+)/);
            const sm = blockText.match(/summary\s*[:=]\s*['"]([^'"]*)['"]/);
            if (sc) return genExp(sc[1], db ? db[1] : 0, cr ? cr[1] : 0, sm ? sm[1] : '');
            return null;
          })();

          if (exp) {
            // 在最后一行（闭合行）的 } 前插入 explanation
            const lastIdx = buf.length - 1;
            const lastLine = buf[lastIdx];
            // 最后一行格式:     },   或     }
            const indent = lastLine.match(/^\s*/)[0];
            const comma = lastLine.trim().endsWith(',');
            // 寻找大括号的位置
            const bracePos = lastLine.lastIndexOf('}');
            if (bracePos >= 0) {
              const beforeBrace = lastLine.substring(0, bracePos);
              const afterBrace = lastLine.substring(bracePos);
              // 检查 before brace 上是否已有逗号结尾
              if (beforeBrace.trim().endsWith(',')) {
                buf[lastIdx] = beforeBrace + ` explanation: '${exp}'` + afterBrace;
              } else {
                // 看最后一个属性行是否有逗号
                let lastPropLine = '';
                for (let k = buf.length - 2; k >= 0; k--) {
                  const t = buf[k].trim();
                  if (t && t !== '{' && !t.startsWith('//')) {
                    lastPropLine = buf[k];
                    break;
                  }
                }
                if (lastPropLine.trim().endsWith(',')) {
                  buf[lastIdx] = beforeBrace + ` explanation: '${exp}'` + afterBrace;
                } else {
                  buf[lastIdx] = beforeBrace + (beforeBrace.trim().endsWith(',') ? '' : ',\n') + indent + `  explanation: '${exp}'` + afterBrace;
                }
              }
              fixed++;
              out.push(...buf);
              i = j;
              continue;
            }
          }
        }
        // 已经有explanation或无法处理
        out.push(...buf);
        i = j;
        continue;
      } else {
        out.push(line);
        i++;
      }
    } else {
      out.push(line);
      i++;
    }
  }

  if (fixed > 0) {
    fs.writeFileSync(filePath, out.join('\n'), 'utf-8');
  }
  return { total, fixed };
}

function main() {
  const dir = path.resolve(__dirname, '..', 'src/data/tutorials/service');
  const months = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let allTotal = 0, allFixed = 0;

  for (const month of months) {
    const filePath = path.join(dir, `${month}.js`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  ${month}.js 不存在，跳过`);
      continue;
    }
    const { total, fixed } = processFile(filePath);
    allTotal += total;
    allFixed += fixed;
    console.log(`${month}.js: ${fixed}/${total} 处修复`);
  }

  console.log(`\n📊 总计扫描 ${allTotal} 条entry，修复 ${allFixed} 处`);
}

main();
