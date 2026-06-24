/**
 * 解析商业企业对列文本为多列 headers/rows
 * 处理 content 中对齐列格式的表格数据，插入文档闭合 } 之前
 *
 * Usage: node scripts/parse-multicolumn-tables.cjs [--dry-run]
 */

const fs = require('fs')
const path = require('path')
const DRY_RUN = process.argv.includes('--dry-run')

const FILES = Array.from({length: 12}, (_, i) =>
  `src/data/tutorials/commercial/${String(i+1).padStart(2,'0')}.js`)

function escJS(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") }

// ─── 解析器 ───

function parseSalary(lines) {
  const r = { step: 'idle', headers: null, rows: [], total: null }
  for (const raw of lines) {
    const l = raw.trim(); if (!l) continue
    if (/^[─━=]+$/.test(l)) continue
    if (r.step === 'idle' && /岗位|部门/.test(l)) {
      const c = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean)
      if (c.length >= 3) { r.headers = c; r.step = 'data'; continue }
    }
    if (r.step === 'data') {
      if (/合计|小计/.test(l)) { r.total = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean); break }
      const c = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean)
      if (c.length === r.headers.length) r.rows.push(c)
    }
  }
  if (r.headers && r.rows.length >= 2) return r
  return null
}

function parseInventory(lines) {
  const r = { step: 'idle', headers: null, rows: [], total: null }
  for (const raw of lines) {
    const l = raw.trim(); if (!l) continue
    if (/^[─━=]+$/.test(l)) continue
    if (r.step === 'idle' && /品类/.test(l)) {
      const c = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean)
      if (c.length >= 3) { r.headers = c; r.step = 'data'; continue }
    }
    if (r.step === 'data') {
      if (/合计/.test(l)) { r.total = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean); break }
      const c = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean)
      if (c.length >= 3) r.rows.push(c)
    }
  }
  if (r.headers && r.rows.length >= 2) return r
  return null
}

function parseSocialIns(lines) {
  const rows = []; let u = '', p = ''
  for (const raw of lines) {
    const l = raw.trim(); if (!l) continue
    const m = l.match(/^(.+?)\s+单位([\d.]+%)?(?:\+个人([\d.]+%))?$/)
    if (m) { rows.push([m[1].trim(), m[2] ? '单位'+m[2] : '-', m[3] ? '个人'+m[3] : '-']); continue }
    const m2 = l.match(/^(.+?)\s+单位([\d.]+%)$/)
    if (m2) { rows.push([m2[1].trim(), '单位'+m2[2], '-']); continue }
    if (/单位部分合计/.test(l)) u = l.replace(/.*?：/,'')
    if (/个人代扣合计/.test(l)) p = l.replace(/.*?：/,'')
  }
  if (rows.length >= 3) {
    const r = { headers: ['险种', '单位比例', '个人比例'], rows }
    if (u||p) r.total = ['', '单位合计：'+u, '个人合计：'+p]
    return r
  }
  return null
}

function parsePrepaid(lines) {
  const r = { step: 'idle', headers: null, rows: [] }
  for (const raw of lines) {
    const l = raw.trim(); if (!l) continue
    if (r.step === 'idle' && /购卡单位/.test(l)) {
      const c = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean)
      if (c.length >= 2) { r.headers = c; r.step = 'data'; continue }
    }
    if (r.step === 'data') {
      if (/温馨提示/.test(l)) break
      const c = l.split(/[ ]{2,}/).map(x=>x.trim()).filter(Boolean)
      if (c.length >= 2) r.rows.push(c)
    }
  }
  if (r.headers && r.rows.length >= 1) return r
  return null
}

function parseDepreciation(lines) {
  const rows = []; let total = ''
  for (const raw of lines) {
    const l = raw.trim(); if (!l) continue
    if (/^[─━=]+$/.test(l)) continue
    const m = l.match(/^(.+?)[：:]\s*(.+?)(?:（.*?）)?$/)
    if (m) { rows.push([m[1].trim(), m[2].trim()]); continue }
    const m2 = l.match(/^(.+?)\s+([\d,]+)/)
    if (m2) { rows.push([m2[1].trim(), l.replace(m2[1],'').trim()]); continue }
    if (/合计/.test(l)) total = l.replace(/.*?[：:]/,'').trim()
  }
  if (rows.length >= 2) return { headers: ['资产名称', '计算过程'], rows, total: total ? ['合计', total] : null }
  return null
}

const PARSERS = {
  '工资计算表': parseSalary, '盘点报告': parseInventory,
  '社保缴费明细': parseSocialIns, '预付卡余额表': parsePrepaid,
  '折旧计算表': parseDepreciation,
}

// ─── 读取 content ───

function readContent(lines, i) {
  // 单引号
  const sq = lines[i].match(/content:\s*'((?:[^'\\]|\\.)*)'/)
  if (sq) return { text: sq[1].split('\\n'), endLine: i }
  // 反引号：找闭合反引号
  if (lines[i].includes('content: `') || lines[i].includes('content:`')) {
    let buf = '', endLine = -1
    for (let k = i; k < Math.min(i + 30, lines.length); k++) {
      const cl = lines[k]
      if (k === i) {
        const si = cl.indexOf('`')
        const r = cl.substring(si + 1)
        const ei = r.indexOf('`')
        if (ei >= 0) return { text: r.substring(0, ei).split('\n'), endLine: k }
        buf = r + '\n'
      } else {
        const ei = cl.indexOf('`')
        if (ei >= 0) { buf += cl.substring(0, ei); endLine = k; break }
        buf += cl + '\n'
      }
    }
    if (endLine >= 0) return { text: buf.split('\n'), endLine }
  }
  return null
}

/** 找文档闭合的 } 所在行和位置 */
function findDocClose(lines, contentEndLine, baseIndent) {
  const cl = lines[contentEndLine]
  // 在 contentEndLine 上找最后一个 `} ` 或 `}` 作为 doc close
  // 模式: `},` 或 `}]},` 或 ` }`
  // 找最后一个 `}`（非紧随 ] 的）
  let lastBrace = -1
  for (let i = cl.length - 1; i >= 0; i--) {
    if (cl[i] === '}') { lastBrace = i; break }
  }
  if (lastBrace < 0) return null

  const afterBrace = cl.substring(lastBrace + 1)
  // 如果 } 后面是 ]}, 或 }, 说明这确实是 doc close
  if (/^\s*]?\s*,?\s*$/.test(afterBrace)) {
    return { line: contentEndLine, pos: lastBrace }
  }

  // 如果 contentEndLine 上没找到，扫描后面几行找 }],}
  for (let k = contentEndLine + 1; k < Math.min(contentEndLine + 20, lines.length); k++) {
    for (let i = lines[k].length - 1; i >= 0; i--) {
      if (lines[k][i] === '}') {
        // 确认后面是 ]}, 等
        const rest = lines[k].substring(i + 1)
        if (/^\s*]?\s*,?\s*$/.test(rest)) return { line: k, pos: i }
      }
    }
  }
  return null
}

/** 幂等 */
function hasHeaders(lines, fromLine) {
  for (let i = fromLine + 1; i < Math.min(fromLine + 40, lines.length); i++) {
    if (/headers\s*:\s*\[/.test(lines[i])) {
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if ((lines[j].match(/'[^']+'/g) || []).length >= 3) return true
        if ((lines[j].match(/'[^']+'/g) || []).length >= 2 && /岗位|人数|品类|账面|实盘|折旧/.test(lines[j])) return true
      }
    }
  }
  return false
}

function buildCode(headers, rows, total, indent) {
  let code = ',\n'
  code += indent + "headers: [\n"
  code += indent + "  " + headers.map(h => "'"+escJS(h)+"'").join(', ') + '\n'
  code += indent + "],\n"
  code += indent + "rows: [\n"
  for (let i = 0; i < rows.length; i++) {
    const comma = (i < rows.length - 1 || total) ? ',' : ''
    code += indent + "  [" + rows[i].map(c => "'"+escJS(c)+"'").join(', ') + "]" + comma + '\n'
  }
  if (total) code += indent + "  [" + total.map(c => "'"+escJS(c)+"'").join(', ') + "]\n"
  code += indent + "]\n"
  return code
}

// ─── 文件处理 ───

function processFile(relPath) {
  const fullPath = path.resolve(__dirname, '..', relPath)
  let text = fs.readFileSync(fullPath, 'utf8')
  const original = text
  const useCRLF = text.includes('\r\n')
  if (useCRLF) text = text.replace(/\r\n/g, '\n')
  const lines = text.split('\n')
  const stats = { found: 0, converted: 0, already: 0, noParser: 0, noTable: 0, noClose: 0 }

  for (let i = lines.length - 1; i >= 0; i--) {
    if (!lines[i].includes("type: 'text'")) continue
    let label = ''
    for (let k = i; k < Math.min(i + 10, lines.length); k++) {
      const lm = lines[k].match(/label:\s*'([^']+)'/); if (lm) { label = lm[1]; break }
    }
    if (!label) { stats.noParser++; continue }
    const parser = PARSERS[Object.keys(PARSERS).find(k => label.startsWith(k))]
    if (!parser) { stats.noParser++; continue }

    stats.found++
    if (hasHeaders(lines, i)) { stats.already++; continue }

    // 找 content
    let contentStart = -1
    for (let k = i; k < Math.min(i + 5, lines.length); k++) {
      if (lines[k].includes('content:')) { contentStart = k; break }
    }
    if (contentStart < 0) continue

    const content = readContent(lines, contentStart)
    if (!content) continue

    const table = parser(content.text)
    if (!table) { stats.noTable++; continue }

    const baseIndent = lines[i].match(/^\s*/)[0]

    // 找到 } 插入点
    const close = findDocClose(lines, content.endLine, baseIndent)
    if (!close) { stats.noClose++; continue }

    const code = buildCode(table.headers, table.rows, table.total, baseIndent + '  ')
    // 在 } 前插入 headers/rows
    const closeLine = lines[close.line]
    const beforeClose = closeLine.substring(0, close.pos)
    const afterClose = closeLine.substring(close.pos)     // }... 及之后
    lines[close.line] = beforeClose + code + '\n' + baseIndent + afterClose

    stats.converted++
    console.log(`  ✅ ${path.basename(relPath)}:${i+1} → ${label} (${table.headers.length}列×${table.rows.length}行)`)
  }

  const result = lines.join('\n')
  const output = useCRLF ? result.replace(/\n/g, '\r\n') : result
  if (output !== original && !DRY_RUN) fs.writeFileSync(fullPath, output, 'utf8')
  const flag = output !== original ? '✅' : ' -'
  if (stats.found > 0) console.log(`  ${flag} ${path.basename(relPath)}: found=${stats.found} conv=${stats.converted} already=${stats.already}`)
  return stats
}

// ─── 主流程 ───

console.log('📊 解析商业企业对列表格（在 } 前插入）\n' + (DRY_RUN ? '⚠️  乾运行\n' : ''))
const t = { found: 0, converted: 0, already: 0, noParser: 0, noTable: 0, noClose: 0 }
for (const f of FILES) {
  if (!fs.existsSync(path.resolve(__dirname, '..', f))) continue
  const s = processFile(f)
  t.found += s.found; t.converted += s.converted; t.already += s.already
  t.noParser += s.noParser; t.noTable += s.noTable; t.noClose += s.noClose
}
console.log(`\n📊 总计: ${t.found} 目标 | ${t.converted} 转换 | ${t.already} 已有 | ${t.noParser} 无解析器 | ${t.noTable} 无表格 | ${t.noClose} 未闭合`)
