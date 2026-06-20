/**
 * 系统完整性校验工具
 *
 * 通过 Web Crypto API 计算关键数据模块的 SHA-256 哈希，
 * 与预存哈希比对，检测数据是否被篡改。
 *
 * 使用静态导入映射（而非动态 import 模板）以兼容 Vite 嵌套路径。
 * 预存哈希由 node scripts/compute-hashes.cjs 生成后填入。
 */

// ─── 数据模块映射（显式导入，不依赖 Vite 动态 import） ───
const MODULE_MAP = {
  'xp-system':        () => import('@/data/xp-system.js'),
  'scenarios':        () => import('@/data/scenarios.js'),
  'year1':            () => import('@/data/tutorials/year1.js'),
  'commercial':       () => import('@/data/tutorials/commercial/index.js'),
  'service':          () => import('@/data/tutorials/service/index.js'),
  'construction':     () => import('@/data/tutorials/construction/index.js'),
  'cases':            () => import('@/data/cases/index.js'),
}

// 预计算的关键数据哈希值（由 node scripts/compute-hashes.cjs 生成后填入）
const EXPECTED_HASHES = {
  "xp-system": "0435847d66102477badc0a8f017171396c76d6913baef41821ad72f931227a26",
  "scenarios": "6dd27583e14cd4a2704447aa605074e8989e4331c8cb77c53d678eff9f9a67f6",
  "year1": "25f637385a5878eff7f8a7d29bc1c642c866b3c722d1309026861c2eb763590e",
  "commercial": "21b33e972af98586f53b220b939df38618c33fd512e5115a27185c727001f805",
  "service": "3084cc6b6a90daacac962af2788a80fa3df2ab46ec02624faff6f3c3ce60bdb3",
  "construction": "2f2f8096f676774190f37ab9ca2237dec5c57b84f6b3387408eb05b48c7b009c",
  "cases": "30fcf4849c1f1f026e9c11976d74db393b16465821f0d85cd51487443d29bd7d",
}

// 各模块的数据提取函数：从模块命名空间对象中提取可序列化的数据
function extractData(mod) {
  return mod.default || mod.MONTHS || mod.SCENARIOS || mod.CASES || mod.LEVELS || mod
}

/**
 * 可读模块标签（用于展示）
 */
const MODULE_LABELS = {
  'xp-system': 'XP/等级/成就数据',
  'scenarios': '场景注册表',
  'year1': '制造业教学数据',
  'commercial': '商业企业教学数据',
  'service': '服务业教学数据',
  'construction': '建筑业教学数据',
  'cases': '案例库入口',
}

/**
 * 计算对象 JSON 序列化的 SHA-256 哈希
 * @param {object} obj
 * @returns {Promise<string>}
 */
async function computeHash(obj) {
  const json = JSON.stringify(obj)
  const encoder = new TextEncoder()
  const data = encoder.encode(json)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * 执行完整性校验
 * @returns {Promise<Array<{name: string, label: string, pass: boolean, hash?: string}>>}
 */
export async function checkIntegrity() {
  const results = []

  for (const [name, importer] of Object.entries(MODULE_MAP)) {
    const expected = EXPECTED_HASHES[name]
    const label = MODULE_LABELS[name] || name

    try {
      const mod = await importer()
      const data = extractData(mod)
      const hash = await computeHash(data)
      results.push({ name, label, hash, pass: expected ? hash === expected : true })
    } catch (e) {
      results.push({ name, label, pass: false, error: e.message })
    }
  }

  // 无预置哈希时（理论上不会发生）返回框架状态
  if (results.length === 0) {
    results.push({
      name: 'framework',
      label: '校验框架（未配置预存哈希）',
      hash: 'N/A',
      pass: true,
      note: '运行 node scripts/compute-hashes.cjs 生成哈希并填入 EXPECTED_HASHES'
    })
  }

  return results
}
