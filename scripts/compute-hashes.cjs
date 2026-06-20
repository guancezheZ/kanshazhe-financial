/**
 * 计算关键数据模块的 SHA-256 哈希，用于运行时完整性校验。
 *
 * 匹配 integrity.js 的 checkIntegrity 行为：JSON.stringify(module.default || module)
 *
 * 用法：node scripts/compute-hashes.cjs
 * 输出结果请填入 src/utils/integrity.js 的 EXPECTED_HASHES 对象中。
 */
const crypto = require('crypto')
const path = require('path')
const { pathToFileURL } = require('url')

const ROOT = path.resolve(__dirname, '..')

const files = [
  { name: 'xp-system', path: 'src/data/xp-system.js', label: 'XP/等级/成就数据' },
  { name: 'scenarios', path: 'src/data/scenarios.js', label: '场景注册表' },
  { name: 'tutorials/year1', path: 'src/data/tutorials/year1.js', label: '制造业教学数据入口' },
  { name: 'tutorials/commercial/index', path: 'src/data/tutorials/commercial/index.js', label: '商业企业教学数据入口' },
  { name: 'tutorials/service/index', path: 'src/data/tutorials/service/index.js', label: '服务业教学数据入口' },
  { name: 'tutorials/construction/index', path: 'src/data/tutorials/construction/index.js', label: '建筑业教学数据入口' },
  { name: 'cases/index', path: 'src/data/cases/index.js', label: '案例库入口' },
]

function computeHash(obj) {
  const json = JSON.stringify(obj)
  return crypto.createHash('sha256').update(json, 'utf-8').digest('hex')
}

async function main() {
  console.log('=== 数据完整性哈希计算 ===\n')

  for (const file of files) {
    const fullPath = path.join(ROOT, file.path)
    try {
      const mod = await import(pathToFileURL(fullPath).href)
      // 优先用default导出的数据，其次MONTHS/SCENARIOS/CASES等有意义的命名导出
      const data = mod.default || mod.MONTHS || mod.SCENARIOS || mod.CASES || mod.LEVELS || mod
      const hash = computeHash(data)
      console.log(`"${file.name}": "${hash}",  // ${file.label}`)
    } catch (e) {
      console.log(`// ${file.path}: 导入失败 - ${e.message}`)
    }
  }
}

main()
