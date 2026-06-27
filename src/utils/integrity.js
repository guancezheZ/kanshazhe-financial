/**
 * 系统完整性校验工具
 *
 * 通过 Web Crypto API 计算关键数据模块的 SHA-256 哈希，
 * 与预存哈希比对，检测数据是否被篡改。
 *
 * 附加数据健康扫描：检测 NaN/Infinity/undefined 非法值、
 * 借贷不平衡、缺失必填字段等数据异常。
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
  "year1": "b051b6264d357f71c3e42e00243a6c70baf1f4ef0bc8d47af71399427bdd8686",
  "commercial": "263aba8ee749c2bb01e3c17488d8e7b57d93d04e420291ef203a7962b922665f",
  "service": "1d4dceab847da0d0d2719f759bfacb579b0978da852420609ddf13228b30323c",
  "construction": "3e9292aae76c34ce3109693e844fbac3b358f104fb509782cd03246bcf4691ef",
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

// ═══════════════════════════════════════════════════════════
//  数据健康扫描 — 检测非法值、空数据、借贷不平衡等
// ═══════════════════════════════════════════════════════════

/** 健康问题类型枚举 */
const IssueType = {
  NAN: 'nan',
  INFINITY: 'infinity',
  UNDEFINED: 'undefined',
  BIGINT: 'bigint',
  EMPTY_MODULE: 'empty_module',
  BALANCE: 'balance',
  MISSING_FIELD: 'missing_field',
}

/**
 * 深层递归扫描对象中的非法值
 * @param {*} obj - 扫描目标
 * @param {string} path - 当前路径（用于定位）
 * @param {Array} issues - 收集到的问题数组
 * @param {WeakSet} seen - 循环引用检测
 * @param {number} depth - 递归深度限制
 */
function scanIllegalValues(obj, path, issues, seen = new WeakSet(), depth = 0) {
  // 深度限制 — 防止栈溢出（正常数据深度不超过50层）
  if (depth > 200) return

  // 基本类型检查
  if (obj === null || obj === undefined) return

  // 检测 BigInt — JSON.stringify 会抛出 TypeError
  if (typeof obj === 'bigint') {
    issues.push({
      type: IssueType.BIGINT,
      severity: 'error',
      path,
      message: `路径 ${path} 包含 BigInt 值（${obj.toString()}），JSON 序列化会失败`,
    })
    return
  }

  // 检测 NaN — typeof NaN 是 'number'，但 isNaN 为 true
  if (typeof obj === 'number') {
    if (isNaN(obj)) {
      issues.push({
        type: IssueType.NAN,
        severity: 'error',
        path,
        message: `路径 ${path} 包含 NaN 值，JSON 序列化时会转为 null`,
      })
    } else if (obj === Infinity || obj === -Infinity) {
      issues.push({
        type: IssueType.INFINITY,
        severity: 'error',
        path,
        message: `路径 ${path} 包含 ${obj === Infinity ? 'Infinity' : '-Infinity'}，JSON 序列化时会转为 null`,
      })
    }
    return
  }

  // 非对象类型结束递归
  if (typeof obj !== 'object') return

  // 循环引用检测
  if (seen.has(obj)) {
    issues.push({
      type: IssueType.UNDEFINED,
      severity: 'warning',
      path,
      message: `路径 ${path} 存在循环引用，JSON 序列化会失败`,
    })
    return
  }
  seen.add(obj)

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const val = obj[i]
      if (val === undefined) {
        issues.push({
          type: IssueType.UNDEFINED,
          severity: 'error',
          path: `${path}[${i}]`,
          message: `数组 ${path}[${i}] 包含 undefined 元素，JSON 序列化时会转为 null`,
        })
      } else {
        scanIllegalValues(val, `${path}[${i}]`, issues, seen, depth + 1)
      }
    }
  } else {
    for (const key of Object.keys(obj)) {
      const val = obj[key]
      if (val === undefined) {
        // JSON.stringify 会直接删除值为 undefined 的属性
        issues.push({
          type: IssueType.UNDEFINED,
          severity: 'warning',
          path: `${path}.${key}`,
          message: `属性 ${path}.${key} 的值为 undefined，JSON 序列化时会丢失此属性`,
        })
      } else {
        scanIllegalValues(val, `${path}.${key}`, issues, seen, depth + 1)
      }
    }
  }
}

/**
 * 检查教学任务中的分录借贷平衡
 * @param {Array} entries - 分录数组
 * @param {string} taskPath - 任务路径（用于定位）
 * @returns {Array} 问题列表
 */
function checkEntryBalance(entries, taskPath) {
  const issues = []
  if (!Array.isArray(entries)) return issues

  // 检查每一条分录的字段完整性
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const entryPath = `${taskPath}.entries[${i}]`

    if (entry.subjectCode === undefined || entry.subjectCode === null) {
      issues.push({
        type: IssueType.MISSING_FIELD,
        severity: 'error',
        path: entryPath,
        message: `${entryPath} 缺少 subjectCode 字段`,
      })
    }
    if (entry.debit === undefined && entry.credit === undefined) {
      issues.push({
        type: IssueType.MISSING_FIELD,
        severity: 'error',
        path: entryPath,
        message: `${entryPath} 同时缺少 debit 和 credit 字段`,
      })
    }
  }

  // 计算借贷合计并比较
  const totalDebit = entries.reduce((s, e) => s + (typeof e.debit === 'number' ? e.debit : 0), 0)
  const totalCredit = entries.reduce((s, e) => s + (typeof e.credit === 'number' ? e.credit : 0), 0)

  if (Math.abs(totalDebit - totalCredit) > 0.02) {
    issues.push({
      type: IssueType.BALANCE,
      severity: 'error',
      path: taskPath,
      message: `${taskPath} 分录借贷不平衡：借方合计 ${round(totalDebit)} ≠ 贷方合计 ${round(totalCredit)}（差额 ${round(Math.abs(totalDebit - totalCredit))}）`,
      details: { totalDebit: round(totalDebit), totalCredit: round(totalCredit) },
    })
  }

  return issues
}

/** 保留两位小数的四舍五入 */
function round(n) { return Math.round(n * 100) / 100 }

/**
 * 检查模块是否为空
 */
function checkEmptyModule(data, name) {
  const issues = []
  if (data === null || data === undefined) {
    issues.push({
      type: IssueType.EMPTY_MODULE,
      severity: 'error',
      path: '$',
      message: `模块 "${name}" 导出为空（null/undefined）`,
    })
  } else if (typeof data === 'object' && Object.keys(data).length === 0) {
    issues.push({
      type: IssueType.EMPTY_MODULE,
      severity: 'warning',
      path: '$',
      message: `模块 "${name}" 导出为空对象`,
    })
  } else if (Array.isArray(data) && data.length === 0) {
    issues.push({
      type: IssueType.EMPTY_MODULE,
      severity: 'warning',
      path: '$',
      message: `模块 "${name}" 导出为空数组`,
    })
  }
  return issues
}

/**
 * 从教学数据中提取所有条目（entries）数组
 *
 * 支持的数据结构：
 * - tutorials: { '01': [{entries}, ...], '02': [...] }
 * - cases: [{data: {EVENTS: [{entries}, ...]}}, ...]
 */
function collectEntries(data) {
  const entriesList = []

  // 情况1：教程数据结构 — { monthKey: [task1, task2, ...], ... }
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const key of Object.keys(data)) {
      const tasks = data[key]
      if (Array.isArray(tasks)) {
        for (let ti = 0; ti < tasks.length; ti++) {
          const task = tasks[ti]
          if (task && Array.isArray(task.entries) && task.entries.length > 0) {
            entriesList.push({
              entries: task.entries,
              path: `$.${key}[${ti}]`,
              title: task.title || '(无标题)',
              date: task.date || '',
              role: task.role || '',
            })
          }
        }
      }
    }
  }

  // 情况2：案例数据结构 — CASES 数组
  if (Array.isArray(data)) {
    for (let ci = 0; ci < data.length; ci++) {
      const caseItem = data[ci]
      if (!caseItem || !caseItem.data) continue
      const events = caseItem.data.EVENTS || caseItem.data.events || []
      if (Array.isArray(events)) {
        for (let ei = 0; ei < events.length; ei++) {
          const event = events[ei]
          if (event && Array.isArray(event.entries) && event.entries.length > 0) {
            entriesList.push({
              entries: event.entries,
              path: `$.CASES[${ci}].data.EVENTS[${ei}]`,
              title: caseItem.title || event.title || '(无标题)',
              date: event.date || '',
              role: event.role || 'accountant',
            })
          }
        }
      }
    }
  }

  return entriesList
}

/**
 * 执行完整的数据健康扫描
 * @param {*} data - 模块数据
 * @param {string} name - 模块名称
 * @returns {Array<{type, severity, path, message}>} 问题列表
 */
function scanDataHealth(data, name) {
  const issues = []

  // 1. 空模块检测
  issues.push(...checkEmptyModule(data, name))

  if (!data) return issues

  // 2. 扫描非法值（NaN/Infinity/undefined/BigInt）
  scanIllegalValues(data, '$', issues)

  // 3. 收集 entries 并检查借贷平衡 & 字段完整性
  //    跳过不含 entries 的模块（scenarios, xp-system）
  const hasEntries = name === 'year1' || name === 'commercial' ||
                     name === 'service' || name === 'construction' || name === 'cases'

  if (hasEntries) {
    const entryGroups = collectEntries(data)
    for (const group of entryGroups) {
      issues.push(...checkEntryBalance(group.entries, group.path))
    }
  }

  return issues
}

/**
 * 检查业务模块数据与科目余额的一致性
 * @param {object} store - Vue store 实例（需有 state.vouchers / state.subjects）
 * @returns {Array<{type, severity, message, suggestion?}>}
 */
export function checkModuleConsistency(store) {
  if (!store || !store.state) return []
  const issues = []
  const vouchers = store.state.vouchers
  const subjects = store.state.subjects
  if (!vouchers || !subjects) return issues

  // 1. 存货模块 ↔ 1405 库存商品
  const inventoryBalance = vouchers
    .filter(v => v.status === 'posted')
    .reduce((sum, v) => {
      for (const e of v.entries) {
        if (e.subjectCode === '1405') sum += (e.debit || 0) - (e.credit || 0)
      }
      return sum
    }, 0)
  // 用 subjectBalance 查更准，但这里用全量过账凭证简化算法
  if (Math.abs(inventoryBalance) < 0.01) {
    issues.push({ type: 'module-sync', severity: 'info', message: '暂无库存商品（1405）余额', suggestion: '-' })
  }

  // 2. 累计折旧模块 ↔ 1602 累计折旧
  const deprBalance = vouchers
    .filter(v => v.status === 'posted')
    .reduce((sum, v) => {
      for (const e of v.entries) {
        if (e.subjectCode === '1602') sum += (e.credit || 0) - (e.debit || 0)
      }
      return sum
    }, 0)
  issues.push({ type: 'module-sync', severity: 'info', message: `累计折旧（1602）余额：${Math.round(deprBalance * 100) / 100}`, suggestion: '请与固定资产模块累计折旧核对' })

  // 3. 固定资产原值 ↔ 1601 固定资产
  const faBalance = vouchers
    .filter(v => v.status === 'posted')
    .reduce((sum, v) => {
      for (const e of v.entries) {
        if (e.subjectCode === '1601') sum += (e.debit || 0) - (e.credit || 0)
      }
      return sum
    }, 0)
  issues.push({ type: 'module-sync', severity: 'info', message: `固定资产原值（1601）余额：${Math.round(faBalance * 100) / 100}`, suggestion: '请与固定资产管理模块核对' })

  // 4. 工资模块 ↔ 221101 应付职工薪酬-工资
  const payrollCredit = vouchers
    .filter(v => v.status === 'posted')
    .reduce((sum, v) => {
      for (const e of v.entries) {
        if (e.subjectCode === '221101') sum += (e.credit || 0)
      }
      return sum
    }, 0)
  issues.push({ type: 'module-sync', severity: 'info', message: `应付职工薪酬-工资（221101）贷方累计：${Math.round(payrollCredit * 100) / 100}`, suggestion: '请与工资管理模块应发工资合计核对' })

  return issues
}

// ═══════════════════════════════════════════════════════════
//  导出健康扫描工具（用于测试）
// ═══════════════════════════════════════════════════════════

export {
  scanDataHealth,
  checkEntryBalance,
  collectEntries,
  IssueType,
}

// ═══════════════════════════════════════════════════════════
//  主校验入口
// ═══════════════════════════════════════════════════════════

/**
 * 执行完整性校验
 * @param {object} [options]
 * @param {boolean} [options.skipHealthScan] - 跳过健康扫描（仅做哈希校验）
 * @param {string[]} [options.modules] - 只校验指定的模块名列表
 * @returns {Promise<Array<{name, label, pass, hash?, error?, healthIssues?}>>}
 */
export async function checkIntegrity(options = {}) {
  const { skipHealthScan = false, modules } = options
  const results = []

  const entries = modules
    ? Object.entries(MODULE_MAP).filter(([name]) => modules.includes(name))
    : Object.entries(MODULE_MAP)

  for (const [name, importer] of entries) {
    const expected = EXPECTED_HASHES[name]
    const label = MODULE_LABELS[name] || name

    try {
      const mod = await importer()
      const data = extractData(mod)
      const hash = await computeHash(data)

      const hashPass = expected ? hash === expected : true
      let healthPass = true
      let healthIssues = undefined

      if (!skipHealthScan) {
        healthIssues = scanDataHealth(data, name)
        healthPass = healthIssues.length === 0
        if (healthPass) healthIssues = undefined // 无问题时不输出
      }

      results.push({
        name,
        label,
        hash,
        pass: hashPass && healthPass,
        hashPass,
        healthPass,
        healthIssues,
      })
    } catch (e) {
      results.push({
        name,
        label,
        pass: false,
        error: e.message,
        hashPass: false,
        healthPass: false,
      })
    }
  }

  // 无预置哈希时（理论上不会发生）返回框架状态
  if (results.length === 0) {
    results.push({
      name: 'framework',
      label: '校验框架（未配置预存哈希）',
      hash: 'N/A',
      pass: true,
      hashPass: true,
      healthPass: true,
      note: '运行 node scripts/compute-hashes.cjs 生成哈希并填入 EXPECTED_HASHES',
    })
  }

  return results
}

/**
 * 仅执行数据健康扫描（跳过哈希校验）
 * @param {string[]} [modules] - 指定模块，缺省则扫描全部
 * @returns {Promise<Array<{name, label, healthPass, healthIssues}>>}
 */
export async function healthCheckOnly(modules) {
  const results = []

  const entries = modules
    ? Object.entries(MODULE_MAP).filter(([name]) => modules.includes(name))
    : Object.entries(MODULE_MAP)

  for (const [name, importer] of entries) {
    const label = MODULE_LABELS[name] || name

    try {
      const mod = await importer()
      const data = extractData(mod)
      const healthIssues = scanDataHealth(data, name)
      const healthPass = healthIssues.length === 0

      results.push({
        name,
        label,
        healthPass,
        healthIssues: healthIssues.length > 0 ? healthIssues : undefined,
      })
    } catch (e) {
      results.push({
        name,
        label,
        healthPass: false,
        healthIssues: [{ type: 'error', severity: 'error', path: '$', message: `导入失败: ${e.message}` }],
      })
    }
  }

  return results
}
