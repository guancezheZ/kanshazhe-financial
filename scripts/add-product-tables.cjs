/**
 * 为商业企业入库验收单/生鲜验收单/团购出库单的商品明细
 * 添加多列结构化表格（headers/rows）
 *
 * 解析 content 中 `N. 商品名 数量单位 ✓ [备注]` 模式，
 * 生成新 type: 'text' 文档插入到当前文档条目之后。
 *
 * Usage: node scripts/add-product-tables.cjs [--dry-run]
 *
 * 从后往前扫描，用 brace-count 找到当前 text doc 的闭合 `}]},`
 * 在闭合前插入新的商品明细表文档。
 */

const fs = require('fs')
const path = require('path')

const DRY_RUN = process.argv.includes('--dry-run')

const FILES = Array.from({length: 12}, (_, i) =>
  `src/data/tutorials/commercial/${String(i+1).padStart(2,'0')}.js`)

// ─── 解析商品行 ───

function extractLines(content) {
  const lines = content.split('\\n')
  const products = []
  let inSection = false

  for (const line of lines) {
    if (/商品明细|验收情况|商品清单/.test(line)) { inSection = true; continue }
    if (!inSection) continue
    if (/^\s*$/.test(line) || /^[─━=]+$/.test(line)) break

    const m = line.match(/^\d+\.\s+(.+?)\s+(\d[\d,]*)\s*(\S+)\s+(✓|×)(?:\s+(.+))?$/)
    if (m) {
      products.push({
        name: m[1].trim(),
        qty: m[2].replace(/,/g, ''),
        unit: m[3],
        status: m[4],
        note: m[5] ? m[5].trim() : ''
      })
    } else {
      // "全部合格" 行不退出（可能是行内说明）
      if (!line.includes('全部合格') && !line.includes('验收结论')) break
    }
  }
  return products.length >= 2 ? products : null
}

/** 幂等检查 */
function hasProductTable(lines, startLine) {
  for (let i = startLine + 1; i < Math.min(startLine + 40, lines.length); i++) {
    if (lines[i].includes("label: '入库商品明细'") ||
        lines[i].includes("label: '生鲜验收明细'") ||
        lines[i].includes("label: '出库商品明细'")) {
      return true
    }
  }
  return false
}

// ─── 生成新文档代码 ───

function escJS(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") }

function genTableDoc(products, label, docTitle, baseIndent, propIndent, headers, rows) {
  const rowsCode = rows.map(r =>
    propIndent + '  ' + "[" + r.map(c => "'" + escJS(c) + "'").join(', ') + "]"
  ).join(',\n')

  let code = baseIndent + '{\n'
  code += propIndent + "type: 'text',\n"
  code += propIndent + "label: '" + escJS(label) + "',\n"
  code += propIndent + "docTitle: '" + escJS(docTitle) + "',\n"
  code += propIndent + "headers: [\n"
  code += propIndent + "  " + headers.map(h => "'" + escJS(h) + "'").join(', ') + '\n'
  code += propIndent + "],\n"
  code += propIndent + "rows: [\n"
  code += rowsCode + '\n'
  code += propIndent + ']\n'
  code += baseIndent + '}'
  return code
}

function guessHeaders(products) {
  const hasNote = products.some(p => p.note)
  return hasNote
    ? ['商品名称', '品质', '数量', '单位', '验收结果']
    : ['商品名称', '数量', '单位', '验收结果']
}

function genRows(products, headers) {
  return products.map(p => {
    if (headers.length === 5) return [p.name, p.note || '-', p.qty, p.unit, p.status]
    return [p.name, p.qty, p.unit, p.status]
  })
}

function getDocType(content, label) {
  if (/验收情况|生鲜/.test(content) || /生鲜/.test(label))
    return { type: 'fresh', label: '生鲜验收明细', title: '生鲜商品验收明细' }
  if (/出库/.test(label))
    return { type: 'outbound', label: '出库商品明细', title: '出库商品明细清单' }
  return { type: 'inbound', label: '入库商品明细', title: '入库商品明细清单' }
}

// ─── 文件处理 ───

function processFile(relPath) {
  const fullPath = path.resolve(__dirname, '..', relPath)
  let text = fs.readFileSync(fullPath, 'utf8')
  const original = text

  const useCRLF = text.includes('\r\n')
  if (useCRLF) text = text.replace(/\r\n/g, '\n')

  const lines = text.split('\n')
  const stats = { found: 0, converted: 0, already: 0, fewItems: 0, noClose: 0 }

  // 从后往前扫描
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    if (!line.includes("type: 'text'")) continue
    if (!line.includes('content:')) continue

    // 提取 content 字符串
    const cm = line.match(/content:\s*'((?:[^'\\]|\\.)*)'/)
    if (!cm) continue
    const contentRaw = cm[1]

    // 检查商品明细
    const products = extractLines(contentRaw)
    if (!products) {
      const cnt = contentRaw.split('\\n').filter(l => /^\d+\./.test(l)).length
      if (cnt === 1) stats.fewItems++
      continue
    }

    stats.found++
    if (hasProductTable(lines, i)) { stats.already++; continue }

    // ─── 找到当前 text doc 的闭合位置 ───
    // 从第 i 行开始 brace-counting，找到 }]}, 或 }]}
    let braceDepth = 0
    let closingIdx = -1
    let firstBrace = false

    for (let k = i; k < Math.min(i + 50, lines.length); k++) {
      const cl = lines[k]
      for (const ch of cl) {
        if (ch === '{') { braceDepth++; firstBrace = true }
        if (ch === '}') braceDepth--
        // 在字符循环内部判断：深度归零即可能闭合（避免同一行第二个 } 拉成 -1）
        if (firstBrace && braceDepth === 0) {
          const endTrim = cl.trim()
          if (/\]\s*},?\s*$/.test(endTrim) || /\]\s*}\s*$/.test(endTrim)) {
            closingIdx = k
            break
          }
        }
      }
      if (closingIdx >= 0) break
    }

    if (closingIdx < 0) { stats.noClose++; continue }

    // ─── 插入新文档 ───
    const baseIndent = line.match(/^\s*/)[0]
    const propIndent = baseIndent + '  '
    const docType = getDocType(contentRaw, line)

    const headers = guessHeaders(products)
    const rows = genRows(products, headers)
    const newDoc = genTableDoc(products, docType.label, docType.title,
      baseIndent, propIndent, headers, rows)

    // 在 closingIdx 行插入：把 }], 拆成 },\n{newDoc},\n]}
    // 但更安全：在 closingIdx 行前插入 {newDoc},
    // closingIdx 行保持不变
    const insertLines = [newDoc + ',']
    lines.splice(closingIdx, 0, ...insertLines)
    // 注意：splice 后 lines 变长，但我们是倒序遍历，不受影响

    stats.converted++
    console.log(`  ✅ ${path.basename(relPath)}:${i+1} → ${docType.label} (${products.length}行, 闭括${closingIdx+1})`)
  }

  const result = lines.join('\n')
  const output = useCRLF ? result.replace(/\n/g, '\r\n') : result
  if (output !== original && !DRY_RUN) fs.writeFileSync(fullPath, output, 'utf8')

  const flag = output !== original ? '✅' : ' -'
  if (stats.found > 0 || stats.fewItems > 0) {
    console.log(`  ${flag} ${path.basename(relPath)}: found=${stats.found} conv=${stats.converted} already=${stats.already} single=${stats.fewItems} noClose=${stats.noClose}`)
  }
  return stats
}

// ─── 主流程 ───

console.log('📦 商业企业入库单商品明细多列表格\n' +
  (DRY_RUN ? '⚠️  乾运行 — 不修改文件\n' : ''))

const totals = { found: 0, converted: 0, already: 0, fewItems: 0, noClose: 0 }

for (const f of FILES) {
  const full = path.resolve(__dirname, '..', f)
  if (!fs.existsSync(full)) { console.log(`  ❌ ${f}: not found`); continue }
  const s = processFile(f)
  totals.found += s.found; totals.converted += s.converted
  totals.already += s.already; totals.fewItems += s.fewItems; totals.noClose += s.noClose
}

console.log(`\n📊 总计: ${totals.found} 明细文档 | ${totals.converted} 转换 | ${totals.already} 已有 | ${totals.fewItems} 单件 | ${totals.noClose} 未闭合`)
