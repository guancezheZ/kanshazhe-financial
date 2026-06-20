/**
 * 批量现金流量标注脚本（全行业版）
 *
 * 教学数据文件中的所有分录都是单行格式：
 *   { subjectCode: '100201', summary: '...', debit: 0, credit: XXX, explanation: '...' },
 *
 * 本脚本：导入数据→按顺序生成标注→按行号找到未标注分录→追加标注
 *
 * 用法：
 *   node scripts/annotate-cashflow.mjs                          # 全部行业全部月份
 *   node scripts/annotate-cashflow.mjs manufacturing             # 制造业全部月份
 *   node scripts/annotate-cashflow.mjs commercial 03             # 商业企业3月
 *   node scripts/annotate-cashflow.mjs commercial,service        # 商业+服务业
 *   node scripts/annotate-cashflow.mjs all 01                    # 所有行业1月
 *
 * 行业名：manufacturing, commercial, service, construction
 * 月份：01-12，缺省=全部
 */

import { determineCashFlowForEntry } from '../src/utils/accounting.js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const CASH_PREFIXES = ['1001', '1002', '1012']
const CASH_FLOW_NAMES = {
  'cf-op':'销售商品、提供劳务收到的现金','cf-op2':'购买商品、接受劳务支付的现金',
  'cf-op3':'支付给职工以及为职工支付的现金','cf-op4':'支付的各项税费',
  'cf-op5':'收到其他与经营活动有关的现金','cf-op6':'支付其他与经营活动有关的现金',
  'cf-inv':'购建固定资产、无形资产支付的现金','cf-inv2':'收回投资收到的现金',
  'cf-inv3':'处置固定资产、无形资产收回的现金净额','cf-inv4':'取得投资收益收到的现金',
  'cf-fin':'借款收到的现金','cf-fin2':'偿还债务支付的现金',
  'cf-fin3':'吸收投资收到的现金','cf-fin4':'分配股利、利润或偿付利息支付的现金',
}

const SECTORS = {
  manufacturing: {
    name: '制造业', dir: 'months', subdir: 'tutorials',
    months: ['02','03','04','05','06','07','08','09','10','11','12'],
  },
  commercial: {
    name: '商业企业', dir: 'commercial', subdir: 'tutorials',
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
  },
  service: {
    name: '服务业', dir: 'service', subdir: 'tutorials',
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
  },
  construction: {
    name: '建筑业', dir: 'construction', subdir: 'tutorials',
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
  },
}

function hasCashCode(code) {
  return CASH_PREFIXES.some(p => (code || '').startsWith(p))
}

function genExplanation(flowId, pairedCodes) {
  const p = pairedCodes.length ? `（配对科目${pairedCodes[0]}）` : ''
  const m = {
    'cf-op':`销售商品/提供劳务收到的现金${p}，属于经营活动现金流入——主营业务产生的现金收入。`,
    'cf-op2':`采购存货/商品支出${p}，属于"购买商品、接受劳务支付的现金"——经营活动现金流出。`,
    'cf-op3':`支付职工薪酬相关支出${p}，属于"支付给职工以及为职工支付的现金"——经营活动现金流出。`,
    'cf-op4':`缴纳税费支出${p}，属于"支付的各项税费"——经营活动现金流出。`,
    'cf-op5':`其他经营活动现金流入${p}，属于"收到其他与经营活动有关的现金"。`,
    'cf-op6':`其他经营活动现金支出${p}，属于"支付其他与经营活动有关的现金"。`,
    'cf-inv':`购建固定资产/无形资产支出${p}，属于投资活动现金流出——资本性支出，区别于日常经营支出。`,
    'cf-inv2':`收回投资${p}，属于投资活动现金流入。`,'cf-inv3':`处置固定资产/无形资产${p}，属于投资活动现金流入。`,
    'cf-inv4':`取得投资收益${p}，属于投资活动现金流入。`,
    'cf-fin':`借款收到的现金${p}，属于筹资活动现金流入——企业通过负债融资获得资金。`,
    'cf-fin2':`偿还债务本金${p}，属于筹资活动现金流出。`,
    'cf-fin3':`吸收投资收到的现金${p}，属于筹资活动现金流入——企业通过权益融资获得资金。`,
    'cf-fin4':`分配股利/偿付利息${p}，属于筹资活动现金流出。`,
  }
  return m[flowId] || ''
}

// ───── 从导入数据构建标注映射 ─────
function buildAnnotationMap(data) {
  const map = {}
  let total = 0, skip = 0, annotated = 0
  for (const t of data) {
    if (!t || !Array.isArray(t.entries)) continue
    for (let i = 0; i < t.entries.length; i++) {
      const e = t.entries[i], code = e.subjectCode || ''
      if (!hasCashCode(code)) continue
      total++
      const others = t.entries.filter((_,j) => j !== i)
      if (others.some(x => hasCashCode(x.subjectCode || ''))) { skip++; continue }
      if (e.cashFlowItem) { annotated++; continue }
      try {
        const r = determineCashFlowForEntry(e, t.entries)
        if (r && r.id) {
          const paired = (Number(e.debit)>0 ? others.filter(x=>Number(x.credit)>0) : others.filter(x=>Number(x.debit)>0))
          const key = `${code}|${Number(e.debit)||0}|${Number(e.credit)||0}|${e.summary||''}`
          // 支持同 key 多条分录（如会计+出纳任务有相同的现金分录）
          if (map[key]) {
            map[key].count++
          } else {
            map[key] = { count: 1, flowId: r.id, explanation: genExplanation(r.id, paired.map(x=>x.subjectCode||'')) }
          }
        }
      } catch (err) { console.error(`   引擎错误: [${code} ${e.summary||''}]: ${err.message}`) }
    }
  }
  return { map, stats: { total, skip, annotated } }
}

// ───── 扫描文件文本并应用标注 ─────
function annotateFile(fp, annotationMap) {
  const lines = readFileSync(fp, 'utf-8').split('\n')
  const mods = []
  let total = 0, done = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // 用 matchAll 找本行所有 subjectCode
    const allMatches = [...line.matchAll(/subjectCode:\s*'(\d+)'/g)]
    if (!allMatches.length) continue

    for (let mi = 0; mi < allMatches.length; mi++) {
      const m = allMatches[mi]
      const code = m[1]
      if (!hasCashCode(code)) continue

      total++
      if (line.includes('cashFlowItem')) { done++; continue }

      // 提取 key：找此行中第 mi+1 个 debit/credit/summary
      const allDebits = [...line.matchAll(/debit:\s*([\d.]+)/g)]
      const allCredits = [...line.matchAll(/credit:\s*([\d.]+)/g)]
      const allSummaries = [...line.matchAll(/summary:\s*'([^']*)'/g)]
      const d = allDebits[mi] ? allDebits[mi][1] : '0'
      const c = allCredits[mi] ? allCredits[mi][1] : '0'
      const s = allSummaries[mi] ? allSummaries[mi][1] : ''
      const key = `${code}|${Number(d)||0}|${Number(c)||0}|${s}`

      const allBraces = [...line.matchAll(/\}/g)]

      if (annotationMap[key]) {
        let endLine = i
        let bracePos = -1
        if (allBraces.length > mi) {
          bracePos = allBraces[mi].index
        } else {
          for (let j = i + 1; j < lines.length; j++) {
            const bp = lines[j].indexOf('}')
            if (bp >= 0) { endLine = j; bracePos = bp; break }
          }
        }
        if (bracePos >= 0) {
          mods.push({ lineIdx: endLine, bracePos, flowId: annotationMap[key].flowId, explanation: annotationMap[key].explanation })
          // 支持同 key 多条分录：递减计数，归零时删除
          annotationMap[key].count--
          if (annotationMap[key].count <= 0) delete annotationMap[key]
        } else {
          mods.push({ lineIdx: i, bracePos: 0, flowId: annotationMap[key].flowId, explanation: annotationMap[key].explanation })
        }
      }
    }
  }

  if (!mods.length) { console.log(`   扫描: ${total}条现金分录，已标注${done}条，无需新增`); return }

  // 按 lineIdx 从大到小、同行内 bracePos 从大到小排序（从后往前插避免偏移）
  mods.sort((a,b) => b.lineIdx - a.lineIdx || b.bracePos - a.bracePos)
  let applied = 0
  for (const m of mods) {
    const line = lines[m.lineIdx]
    const ins = `, cashFlowItem: '${m.flowId}', cashFlowExplanation: '${m.explanation}'`
    lines[m.lineIdx] = line.slice(0, m.bracePos) + ins + line.slice(m.bracePos)
    applied++
  }

  writeFileSync(fp, lines.join('\n'), 'utf-8')
  console.log(`   扫描: ${total}条现金分录，已标注${done}条，新增${applied}条`)
}

// ───── 解析 CLI 参数 ─────
function parseArgs() {
  const args = process.argv.slice(2)
  let sectors = []
  let monthFilter = 'all'

  if (args.length === 0) {
    // 无参数 → 全部行业全部月份
    sectors = Object.keys(SECTORS)
  } else {
    // 第一个参数可能是：行业名（或逗号分隔多个）、月份号、'all'
    const first = args[0].toLowerCase()

    // 看是否匹配行业名
    const sectorKeys = Object.keys(SECTORS)
    const matchedSectors = first.split(',').filter(s => sectorKeys.includes(s.trim()))

    if (matchedSectors.length > 0) {
      sectors = matchedSectors.map(s => s.trim())
      monthFilter = args[1] || 'all'
    } else if (first === 'all') {
      sectors = sectorKeys
      monthFilter = args[1] || 'all'
    } else {
      // 向后兼容：单个月份号 → 制造业
      sectors = ['manufacturing']
      monthFilter = args[0]
    }
  }

  return { sectors, monthFilter }
}

// ───── 主流程 ─────
async function main() {
  const { sectors, monthFilter } = parseArgs()

  for (const sk of sectors) {
    const sector = SECTORS[sk]
    if (!sector) { console.error(`未知行业: ${sk}`); continue }

    const months = sector.months.filter(m => monthFilter === 'all' || monthFilter === m)
    if (!months.length) { console.log(`\n${sk}: 无匹配月份`); continue }

    for (const m of months) {
      const name = `${sector.name}${m}月`
      const fp = resolve(ROOT, `src/data/${sector.subdir}/${sector.dir}/${m}.js`)
      console.log(`\n${'='.repeat(56)}\n📁 ${name}`)
      try {
        const moduleUrl = `${pathToFileURL(fp)}?t=${Date.now()}`
        const data = (await import(moduleUrl)).default
        if (!Array.isArray(data)) { console.log('   跳过: 非数组'); continue }
        const { map, stats } = buildAnnotationMap(data)
        console.log(`   📊 引擎: ${Object.keys(map).length}条需标注（共${stats.total}条,内部转账跳过${stats.skip}条,已有${stats.annotated}条）`)
        annotateFile(fp, map)
      } catch (e) { console.error(`   ❌ ${e.message}`) }
    }
  }

  console.log(`\n${'='.repeat(56)}\n✅ 全部完成！`)
}

main().catch(console.error)
