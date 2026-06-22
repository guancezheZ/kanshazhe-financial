/**
 * 企业财务管理系统 - 核心数据层
 *
 * 单例 reactive store + localStorage 持久化
 * 未来可替换为 SQLite/Tauri 后端（仅需替换本文件中的持久化层）
 */
import { reactive, ref } from 'vue'
import {
  genId, getCurrentPeriod, todayStr,
  SUBJECT_TYPE, VOUCHER_STATUS, BALANCE_DIRECTION, DEBIT, CREDIT,
  checkBalance, validateVoucher,
  buildSubjectTree, getLeafSubjectIds, isLeafSubject,
  generateChildCode, round, SUBJECT_CODE_PREFIX,
  generateVoucherNo,
  updateBalancesAfterPost, recalcClosingBalance, createPeriodBalance,
} from '@/utils/accounting.js'

// 安全存储（双轨加密持久化）
import { setItem as secureSetItem, removeItem as secureRemoveItem } from '@/utils/secure-storage.js'
import {
  getCaseConfig,
} from '@/data/cases/index.js'
import {
  LEVELS, MAX_LEVEL, XP_BASE, XP_FIRST_BONUS, ACHIEVEMENTS,
  calcLevel, addXPAndCheckLevel, checkAchievements,
  loadXPData, saveXPData, loadAchievements, saveAchievements,
  STORAGE_KEY_XP, STORAGE_KEY_ACHIEVEMENTS,
  ACHIEVEMENT_GROUPS,
} from '@/data/xp-system.js'
import {
  trialBalance as trialBalanceFn,
  calcBalanceSheet, calcIncomeStatement, calcCashFlow, calcFinancialRatios,
  SUBJECT_TYPE_CN,
} from '@/utils/accounting.js'

// ==================== 默认数据 ====================

/** 财政部《企业会计准则》标准科目表 */
const DEFAULT_SUBJECTS = [
  // 一、资产类 (1)
  { id: 's-1001', code: '1001', name: '库存现金', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: false, opened: true },
  { id: 's-100201', code: '01', name: '工商银行', type: SUBJECT_TYPE.ASSET, parentId: 's-1002', isLeaf: true, opened: true },
  { id: 's-100202', code: '02', name: '建设银行', type: SUBJECT_TYPE.ASSET, parentId: 's-1002', isLeaf: true, opened: true },
  { id: 's-100203', code: '03', name: '美元户', type: SUBJECT_TYPE.ASSET, parentId: 's-1002', isLeaf: true, opened: true },
  { id: 's-1012', code: '1012', name: '其他货币资金', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: false, opened: true },
  { id: 's-101201', code: '01', name: '银行汇票存款', type: SUBJECT_TYPE.ASSET, parentId: 's-1012', isLeaf: true, opened: true },
  { id: 's-101202', code: '02', name: '银行承兑汇票存款', type: SUBJECT_TYPE.ASSET, parentId: 's-1012', isLeaf: true, opened: true },
  { id: 's-101203', code: '03', name: '信用证保证金', type: SUBJECT_TYPE.ASSET, parentId: 's-1012', isLeaf: true, opened: true },
  { id: 's-101204', code: '04', name: '微信账户', type: SUBJECT_TYPE.ASSET, parentId: 's-1012', isLeaf: true, opened: true },
  { id: 's-101205', code: '05', name: '支付宝账户', type: SUBJECT_TYPE.ASSET, parentId: 's-1012', isLeaf: true, opened: true },
  { id: 's-1101', code: '1101', name: '交易性金融资产', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: false, opened: true },
  { id: 's-110101', code: '01', name: '国债投资', type: SUBJECT_TYPE.ASSET, parentId: 's-1101', isLeaf: true, opened: true },
  { id: 's-110102', code: '02', name: '应计利息', type: SUBJECT_TYPE.ASSET, parentId: 's-1101', isLeaf: true, opened: true },
  { id: 's-1121', code: '1121', name: '应收票据', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: false, opened: true },
  { id: 's-112101', code: '01', name: '银行承兑汇票', type: SUBJECT_TYPE.ASSET, parentId: 's-1121', isLeaf: true, opened: true },
  { id: 's-1122', code: '1122', name: '应收账款', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: false, opened: true },
  { id: 's-112201', code: '01', name: '甲公司', type: SUBJECT_TYPE.ASSET, parentId: 's-1122', isLeaf: true, opened: true },
  { id: 's-112202', code: '02', name: '乙公司', type: SUBJECT_TYPE.ASSET, parentId: 's-1122', isLeaf: true, opened: true },
  { id: 's-112203', code: '03', name: '丁公司', type: SUBJECT_TYPE.ASSET, parentId: 's-1122', isLeaf: true, opened: true },
  { id: 's-112204', code: '04', name: '庚公司', type: SUBJECT_TYPE.ASSET, parentId: 's-1122', isLeaf: true, opened: true },
  { id: 's-112205', code: '05', name: '辛公司', type: SUBJECT_TYPE.ASSET, parentId: 's-1122', isLeaf: true, opened: true },
  { id: 's-112206', code: '06', name: '癸公司', type: SUBJECT_TYPE.ASSET, parentId: 's-1122', isLeaf: true, opened: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1131', code: '1131', name: '应收股利', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1132', code: '1132', name: '应收利息', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1221', code: '1221', name: '其他应收款', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1231', code: '1231', name: '坏账准备', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1401', code: '1401', name: '材料采购', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1402', code: '1402', name: '在途物资', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1403', code: '1403', name: '原材料', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1405', code: '1405', name: '库存商品', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1406', code: '1406', name: '发出商品', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1407', code: '1407', name: '商品进销差价', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1408', code: '1408', name: '委托加工物资', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1411', code: '1411', name: '周转材料', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1461', code: '1461', name: '存货跌价准备', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1501', code: '1501', name: '长期股权投资', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1511', code: '1511', name: '长期股权投资减值准备', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1521', code: '1521', name: '投资性房地产', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1531', code: '1531', name: '长期应收款', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: false, opened: true },
  { id: 's-160101', code: '01', name: '房屋建筑物', type: SUBJECT_TYPE.ASSET, parentId: 's-1601', isLeaf: true, opened: true },
  { id: 's-160102', code: '02', name: '机器设备', type: SUBJECT_TYPE.ASSET, parentId: 's-1601', isLeaf: true, opened: true },
  { id: 's-160103', code: '03', name: '办公设备', type: SUBJECT_TYPE.ASSET, parentId: 's-1601', isLeaf: true, opened: true },
  { id: 's-160104', code: '04', name: '运输设备', type: SUBJECT_TYPE.ASSET, parentId: 's-1601', isLeaf: true, opened: true },
  { id: 's-160105', code: '05', name: '研发设备', type: SUBJECT_TYPE.ASSET, parentId: 's-1601', isLeaf: true, opened: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1603', code: '1603', name: '固定资产减值准备', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1604', code: '1604', name: '在建工程', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1605', code: '1605', name: '工程物资', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1606', code: '1606', name: '固定资产清理', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1701', code: '1701', name: '无形资产', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1702', code: '1702', name: '累计摊销', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1703', code: '1703', name: '无形资产减值准备', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1801', code: '1801', name: '长期待摊费用', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1811', code: '1811', name: '递延所得税资产', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  { id: 's-1901', code: '1901', name: '待处理财产损溢', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },

  // 二、负债类 (2)
  { id: 's-2001', code: '2001', name: '短期借款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2101', code: '2101', name: '交易性金融负债', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2201', code: '2201', name: '应付票据', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: false, opened: true },
  { id: 's-220201', code: '01', name: '丙公司', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2202', isLeaf: true, opened: true },
  { id: 's-220202', code: '02', name: '丁公司', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2202', isLeaf: true, opened: true },
  { id: 's-220203', code: '03', name: '供应商', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2202', isLeaf: true, opened: true },
  { id: 's-2203', code: '2203', name: '预收账款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2212', code: '2212', name: '预计负债', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: false, opened: true },
  { id: 's-221101', code: '01', name: '工资', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2211', isLeaf: true, opened: true },
  { id: 's-221102', code: '02', name: '社保', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2211', isLeaf: true, opened: true },
  { id: 's-221103', code: '03', name: '公积金', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2211', isLeaf: true, opened: true },
  { id: 's-2221', code: '2221', name: '应交税费', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: false, opened: true },
  { id: 's-222101', code: '01', name: '应交增值税', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2221', isLeaf: true, opened: true },
  { id: 's-222102', code: '02', name: '应交所得税', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2221', isLeaf: true, opened: true },
  { id: 's-222103', code: '03', name: '应交城建税', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2221', isLeaf: true, opened: true },
  { id: 's-222104', code: '04', name: '应交教育费附加', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2221', isLeaf: true, opened: true },
  { id: 's-222110', code: '10', name: '未交增值税', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2221', isLeaf: true, opened: true },
  { id: 's-2231', code: '2231', name: '应付股利', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2232', code: '2232', name: '应付利息', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2241', code: '2241', name: '其他应付款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: false, opened: true },
  { id: 's-224101', code: '01', name: '社保个人部分', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2241', isLeaf: true, opened: true },
  { id: 's-224102', code: '02', name: '公积金个人部分', type: SUBJECT_TYPE.LIABILITY, parentId: 's-2241', isLeaf: true, opened: true },
  { id: 's-2401', code: '2401', name: '递延收益', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2501', code: '2501', name: '长期借款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2502', code: '2502', name: '应付债券', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2701', code: '2701', name: '长期应付款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2711', code: '2711', name: '专项应付款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2801', code: '2801', name: '预计负债', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-2901', code: '2901', name: '递延所得税负债', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },

  // 三、所有者权益类 (3)
  { id: 's-4001', code: '4001', name: '实收资本', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-4002', code: '4002', name: '资本公积', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-4101', code: '4101', name: '盈余公积', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: false, opened: true },
  { id: 's-410101', code: '01', name: '法定盈余公积', type: SUBJECT_TYPE.EQUITY, parentId: 's-4101', isLeaf: true, opened: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: true, opened: true },
  { id: 's-4104', code: '4104', name: '利润分配', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: false, opened: true },
  { id: 's-410401', code: '01', name: '未分配利润', type: SUBJECT_TYPE.EQUITY, parentId: 's-4104', isLeaf: true, opened: true },
  { id: 's-410402', code: '02', name: '提取盈余公积', type: SUBJECT_TYPE.EQUITY, parentId: 's-4104', isLeaf: true, opened: true },
  { id: 's-410403', code: '03', name: '应付普通股股利', type: SUBJECT_TYPE.EQUITY, parentId: 's-4104', isLeaf: true, opened: true },

  // 四、成本类 (4)
  { id: 's-5001', code: '5001', name: '生产成本', type: SUBJECT_TYPE.COST, parentId: null, isLeaf: false, opened: true },
  { id: 's-500101', code: '01', name: '直接材料', type: SUBJECT_TYPE.COST, parentId: 's-5001', isLeaf: true, opened: true },
  { id: 's-500102', code: '02', name: '直接人工', type: SUBJECT_TYPE.COST, parentId: 's-5001', isLeaf: true, opened: true },
  { id: 's-500103', code: '03', name: '制造费用', type: SUBJECT_TYPE.COST, parentId: 's-5001', isLeaf: true, opened: true },
  { id: 's-5101', code: '5101', name: '制造费用', type: SUBJECT_TYPE.COST, parentId: null, isLeaf: true, opened: true },
  { id: 's-5201', code: '5201', name: '劳务成本', type: SUBJECT_TYPE.COST, parentId: null, isLeaf: true, opened: true },
  { id: 's-5301', code: '5301', name: '研发支出', type: SUBJECT_TYPE.COST, parentId: null, isLeaf: false, opened: true },
  { id: 's-530101', code: '01', name: '费用化支出', type: SUBJECT_TYPE.COST, parentId: 's-5301', isLeaf: true, opened: true },
  { id: 's-530102', code: '02', name: '资本化支出', type: SUBJECT_TYPE.COST, parentId: 's-5301', isLeaf: true, opened: true },

  // 五、损益类 (5)
  { id: 's-6001', code: '6001', name: '主营业务收入', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6051', code: '6051', name: '其他业务收入', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6101', code: '6101', name: '公允价值变动损益', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6111', code: '6111', name: '投资收益', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6301', code: '6301', name: '营业外收入', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6402', code: '6402', name: '其他业务成本', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: false, opened: true },
  { id: 's-660101', code: '01', name: '广告费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6601', isLeaf: true, opened: true },
  { id: 's-660102', code: '02', name: '运输费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6601', isLeaf: true, opened: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: false, opened: true },
  { id: 's-660201', code: '01', name: '办公费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660202', code: '02', name: '差旅费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660203', code: '03', name: '工资薪金', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660204', code: '04', name: '研发费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660205', code: '05', name: '折旧费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-660206', code: '06', name: '摊销费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true, opened: true },
  { id: 's-6603', code: '6603', name: '财务费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6701', code: '6701', name: '资产减值损失', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6711', code: '6711', name: '营业外支出', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6801', code: '6801', name: '所得税费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
  { id: 's-6901', code: '6901', name: '以前年度损益调整', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true, opened: true },
]

/**
 * 商业企业（商品流通企业）科目表
 * 基于 DEFAULT_SUBJECTS 去除生产核算相关科目，新增商业特有科目
 */
const COMMERCIAL_SUBJECTS = DEFAULT_SUBJECTS
  .filter(s => {
    const exclude = [
      's-1401', 's-1403', 's-1408',          // 无材料采购/原材料/委托加工
      's-5001', 's-500101', 's-500102', 's-500103', // 无生产成本
      's-5101',                                 // 无制造费用
      's-5201',                                 // 无劳务成本
      's-5301', 's-530101', 's-530102',         // 无研发支出
      's-160102',                               // 商业企业无机器设备
    ]
    return !exclude.includes(s.id)
  })
  .map(s => {
    // 将"材料采购(1401)"改为"商品采购(1401)"
    if (s.id === 's-1401') {
      return { ...s, name: '商品采购' }
    }
    return { ...s }
  })

// 注：在途物资(1402)、商品进销差价(1407) 已在 DEFAULT_SUBJECTS 中定义

/**
 * 服务业（管理咨询/软件开发）科目表
 * 基于 DEFAULT_SUBJECTS 去除存货/生产科目，新增服务业特有科目
 *
 * 依据：《企业会计准则第14号——收入》（财会[2017]22号）
 * 行业特点：无存货、无生产成本、人工成本为主、项目制核算
 */
const SERVICE_SUBJECTS = DEFAULT_SUBJECTS
  .filter(s => {
    const exclude = [
      's-1401', 's-1402', 's-1403', 's-1405', 's-1406', 's-1407', 's-1408', // 无存货科目
      's-1461',                                           // 无存货跌价准备
      's-5001', 's-500101', 's-500102', 's-500103',       // 无生产成本
      's-5101',                                           // 无制造费用
      's-160102',                                         // 无机器设备
      's-1605',                                           // 无工程物资
    ]
    return !exclude.includes(s.id)
  })
  .map(s => {
    // 将 劳务成本(5201) 改为父级科目（下含明细）
    if (s.id === 's-5201') {
      return { ...s, isLeaf: false }
    }
    return { ...s }
  })

// 添加服务业特有科目：合同资产、合同负债、劳务成本明细
SERVICE_SUBJECTS.push(
  // 合同资产（新收入准则：已履约未结算的工程/服务款）
  { id: 's-1208', code: '1208', name: '合同资产', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  // 合同负债（新收入准则：已收款未履约的义务）
  { id: 's-2205', code: '2205', name: '合同负债', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  // 劳务成本明细（服务业核心成本科目）
  { id: 's-520101', code: '01', name: '人工成本', type: SUBJECT_TYPE.COST, parentId: 's-5201', isLeaf: true, opened: true },
  { id: 's-520102', code: '02', name: '差旅费', type: SUBJECT_TYPE.COST, parentId: 's-5201', isLeaf: true, opened: true },
  { id: 's-520103', code: '03', name: '外包服务费', type: SUBJECT_TYPE.COST, parentId: 's-5201', isLeaf: true, opened: true },
  { id: 's-520104', code: '04', name: '其他直接费用', type: SUBJECT_TYPE.COST, parentId: 's-5201', isLeaf: true, opened: true },
)

/**
 * 建筑业（建筑工程企业）科目表
 * 基于 DEFAULT_SUBJECTS 去除存货/生产科目，新增建筑业特有科目
 *
 * 依据：《企业会计准则第14号——收入》（财会[2017]22号）
 * 行业特点：合同成本归集、完工百分比法、分包核算、施工机械使用
 */
const CONSTRUCTION_SUBJECTS = DEFAULT_SUBJECTS
  .filter(s => {
    const exclude = [
      's-1401', 's-1402', 's-1403', 's-1405', 's-1406', 's-1407', 's-1408', 's-1411', 's-1461', // 无存货（材料直接入合同履约成本）
      's-5001', 's-500101', 's-500102', 's-500103', // 无生产成本
      's-5101',                                       // 无制造费用（用合同履约成本-间接费用替代）
      's-5201',                                       // 无劳务成本（用合同履约成本替代）
      's-5301', 's-530101', 's-530102',               // 无研发支出
    ]
    return !exclude.includes(s.id)
  })

// 添加建筑业特有科目：合同履约成本、合同结算、合同资产、合同负债
CONSTRUCTION_SUBJECTS.push(
  // 合同资产（新收入准则：已履约未结算的工程款）
  { id: 's-1208', code: '1208', name: '合同资产', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true, opened: true },
  // 合同负债（新收入准则：预收工程款）
  { id: 's-2205', code: '2205', name: '合同负债', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true, opened: true },
  // 合同履约成本（建筑业核心成本科目，取代旧"工程施工"）
  { id: 's-5401', code: '5401', name: '合同履约成本', type: SUBJECT_TYPE.COST, parentId: null, isLeaf: false, opened: true },
  { id: 's-540101', code: '01', name: '人工成本', type: SUBJECT_TYPE.COST, parentId: 's-5401', isLeaf: true, opened: true },
  { id: 's-540102', code: '02', name: '材料成本', type: SUBJECT_TYPE.COST, parentId: 's-5401', isLeaf: true, opened: true },
  { id: 's-540103', code: '03', name: '分包成本', type: SUBJECT_TYPE.COST, parentId: 's-5401', isLeaf: true, opened: true },
  { id: 's-540104', code: '04', name: '机械使用费', type: SUBJECT_TYPE.COST, parentId: 's-5401', isLeaf: true, opened: true },
  { id: 's-540105', code: '05', name: '其他直接费用', type: SUBJECT_TYPE.COST, parentId: 's-5401', isLeaf: true, opened: true },
  { id: 's-540106', code: '06', name: '间接费用', type: SUBJECT_TYPE.COST, parentId: 's-5401', isLeaf: true, opened: true },
  // 合同结算（新收入准则：替代旧"工程结算"）
  { id: 's-5402', code: '5402', name: '合同结算', type: SUBJECT_TYPE.COST, parentId: null, isLeaf: false, opened: true },
  { id: 's-540201', code: '01', name: '价款结算', type: SUBJECT_TYPE.COST, parentId: 's-5402', isLeaf: true, opened: true },
  { id: 's-540202', code: '02', name: '合同毛利', type: SUBJECT_TYPE.COST, parentId: 's-5402', isLeaf: true, opened: true },
)


const DEFAULT_ACCOUNT = {
  id: 'acc-default',
  name: '默认账套',
  fiscalYear: new Date().getFullYear(),
  standard: '企业会计准则',
  currency: 'CNY',
}

// ==================== Store 实现 ====================

const STATE_KEY = 'jd_current_account_id'

/** 按场景+角色隔离存储键：不同行业+不同角色使用独立的 key */
function getScenarioStorageKey() {
  const sid = localStorage.getItem('jd_scenario') || 'manufacturing'
  // supervisor 共享 accountant 的数据（主管可查看全部）
  const role = localStorage.getItem('jd_role') || 'accountant'
  const effectiveRole = role === 'supervisor' ? 'accountant' : role
  return `jd_scenario_data_${sid}_${effectiveRole}`
}

function loadState() {
  try {
    // 迁移旧数据（首次升级时：jd_financial_data → jd_scenario_data_manufacturing）
    const oldKey = 'jd_financial_data'
    const newKey = getScenarioStorageKey()
    const raw = localStorage.getItem(newKey)
    if (raw) return JSON.parse(raw)
    // 从旧 key 迁移
    const old = localStorage.getItem(oldKey)
    if (old) {
      localStorage.setItem(newKey, old)
      localStorage.removeItem(oldKey)
      return JSON.parse(old)
    }
  } catch (e) { /* ignore */ }
  return null
}

function createInitialState() {
  return {
    subjects: DEFAULT_SUBJECTS.map(s => ({ ...s })),
    vouchers: [],
    periodBalances: [],
    accounts: [{ ...DEFAULT_ACCOUNT }],
    voucherSeq: {},
    auxiliaryDimensions: [
      { id: 'aux-dept', name: '部门', code: 'dept', enabled: true },
      { id: 'aux-employee', name: '员工', code: 'employee', enabled: true },
      { id: 'aux-customer', name: '客户', code: 'customer', enabled: true },
      { id: 'aux-supplier', name: '供应商', code: 'supplier', enabled: true },
      { id: 'aux-project', name: '项目', code: 'project', enabled: true },
    ],
    auxiliaryItems: [
      { id: 'ai-1', dimId: 'aux-dept', code: '01', name: '销售部', enabled: true },
      { id: 'ai-2', dimId: 'aux-dept', code: '02', name: '财务部', enabled: true },
      { id: 'ai-3', dimId: 'aux-dept', code: '03', name: '行政部', enabled: true },
      { id: 'ai-4', dimId: 'aux-dept', code: '04', name: '生产部', enabled: true },
      { id: 'ai-5', dimId: 'aux-employee', code: 'E001', name: '张三', enabled: true },
      { id: 'ai-6', dimId: 'aux-employee', code: 'E002', name: '李四', enabled: true },
    ],
    voucherTemplates: [],
    bankStatements: [],
    accountingPeriods: [],
    auditLogs: [],
    progressVersion: 0,  // 教进度版本号，完成任务时递增
    cashFlowItems: [
      // 经营活动
      { id: "cf-op", code: "01", name: "销售商品、提供劳务收到的现金", category: "operating" },
      { id: "cf-op2", code: "02", name: "购买商品、接受劳务支付的现金", category: "operating" },
      { id: "cf-op3", code: "03", name: "支付给职工以及为职工支付的现金", category: "operating" },
      { id: "cf-op4", code: "04", name: "支付的各项税费", category: "operating" },
      { id: "cf-op5", code: "05", name: "收到其他与经营活动有关的现金", category: "operating" },
      { id: "cf-op6", code: "06", name: "支付其他与经营活动有关的现金", category: "operating" },
      // 投资活动
      { id: "cf-inv", code: "07", name: "购建固定资产、无形资产支付的现金", category: "investing" },
      { id: "cf-inv2", code: "08", name: "收回投资收到的现金", category: "investing" },
      { id: "cf-inv3", code: "09", name: "处置固定资产、无形资产收回的现金净额", category: "investing" },
      { id: "cf-inv4", code: "10", name: "取得投资收益收到的现金", category: "investing" },
      // 筹资活动
      { id: "cf-fin", code: "11", name: "借款收到的现金", category: "financing" },
      { id: "cf-fin2", code: "12", name: "偿还债务支付的现金", category: "financing" },
      { id: "cf-fin3", code: "13", name: "吸收投资收到的现金", category: "financing" },
      { id: "cf-fin4", code: "14", name: "分配股利、利润或偿付利息支付的现金", category: "financing" },
    ],
  }
}

const saved = loadState()
const initial = saved || createInitialState()

const state = reactive({
  subjects: initial.subjects || [],
  vouchers: (initial.vouchers || []).map(v => ({
    ...v,
    entries: v.entries.map(e => ({ ...e })),
  })),
  periodBalances: initial.periodBalances || [],
  accounts: initial.accounts || [{ ...DEFAULT_ACCOUNT }],
  voucherSeq: initial.voucherSeq || {},
  auxiliaryDimensions: initial.auxiliaryDimensions || [],
  auxiliaryItems: initial.auxiliaryItems || [],
  voucherTemplates: initial.voucherTemplates || [],
  bankStatements: initial.bankStatements || [],
  accountingPeriods: initial.accountingPeriods || [],
  auditLogs: initial.auditLogs || [],
  cashFlowItems: initial.cashFlowItems || [],
  currentAccountId: localStorage.getItem(STATE_KEY) || (initial.accounts?.[0]?.id) || 'acc-default',
  currentRole: localStorage.getItem('jd_role') || 'accountant',
})

// 加密持久化防抖（避免连续修改触发大量加密操作）
let _encryptTimer = null
function _encryptPersist(key, data) {
  if (_encryptTimer) clearTimeout(_encryptTimer)
  _encryptTimer = setTimeout(() => {
    secureSetItem(key, data).catch(() => {})
    localStorage.setItem(STATE_KEY, state.currentAccountId)
    _encryptTimer = null
  }, 2000)
}

function persist() {
  try {
    const serialized = JSON.stringify({
      subjects: state.subjects,
      vouchers: state.vouchers,
      periodBalances: state.periodBalances,
      accounts: state.accounts,
      voucherSeq: state.voucherSeq,
      auxiliaryDimensions: state.auxiliaryDimensions,
      auxiliaryItems: state.auxiliaryItems,
      voucherTemplates: state.voucherTemplates,
      bankStatements: state.bankStatements,
      accountingPeriods: state.accountingPeriods,
      auditLogs: state.auditLogs,
      cashFlowItems: state.cashFlowItems,
    })
    // ⭐ 双轨持久化：同步明文（立即生效）+ 异步加密（后台保护）
    localStorage.setItem(getScenarioStorageKey(), serialized)
    _encryptPersist(getScenarioStorageKey(), serialized)
    localStorage.setItem(STATE_KEY, state.currentAccountId)
  } catch (e) { /* localStorage full — silently degrade */ }
}

// ==================== Store Hook ====================

let _store = null

export function useStore() {
  if (_store) return _store

  // ======================== 👤 账套 ========================

  function getCurrentAccount() {
    return state.accounts.find(a => a.id === state.currentAccountId) || state.accounts[0]
  }

  function switchAccount(accountId) {
    state.currentAccountId = accountId
    persist()
  }

  function addAccount(data) {
    const account = {
      id: genId(),
      name: data.name,
      fiscalYear: Number(data.fiscalYear) || new Date().getFullYear(),
      standard: data.standard || '企业会计准则',
      currency: data.currency || 'CNY',
    }
    state.accounts.push(account)
    persist()
    return account
  }

  function deleteAccount(id) {
    if (state.accounts.length <= 1) return { success: false, error: '至少保留一个账套' }
    if (id === state.currentAccountId) return { success: false, error: '不能删除当前账套' }
    const idx = state.accounts.findIndex(a => a.id === id)
    if (idx >= 0) {
      state.accounts.splice(idx, 1)
      persist()
      return { success: true }
    }
    return { success: false, error: '账套不存在' }
  }

  // ========================  科目 ========================

  function getSubjectTree() {
    return buildSubjectTree(state.subjects)
  }

  function addSubject(data) {
    // 生成编码
    let code = data.code
    if (!code && data.parentId) {
      const parent = state.subjects.find(s => s.id === data.parentId)
      if (parent) {
        code = generateChildCode(state.subjects, parent.code)
      }
    }
    if (!code && data.type) {
      // 自动生成一级科目编码：类型前缀 + 该类型最大序号+1
      const prefix = SUBJECT_CODE_PREFIX[data.type] || '9'
      const sameType = state.subjects.filter(s => s.type === data.type && !s.parentId)
      const maxSeq = sameType.reduce((m, s) => Math.max(m, parseInt(s.code.slice(-2)) || 0), 0)
      code = prefix + String(maxSeq + 1).padStart(2, '0')
    }

    const subject = {
      id: genId(),
      code,
      name: data.name,
      type: data.type,
      parentId: data.parentId || null,
      isLeaf: true,
      opened: data.opened !== false,
      created: todayStr(),
    }

    // 如果父科目原来标记为末级，取消末级标记
    if (subject.parentId) {
      const parent = state.subjects.find(s => s.id === subject.parentId)
      if (parent && parent.isLeaf) {
        parent.isLeaf = false
      }
    }

    state.subjects.push(subject)
    persist()
    return subject
  }

  function updateSubject(id, data) {
    const idx = state.subjects.findIndex(s => s.id === id)
    if (idx < 0) return null
    Object.assign(state.subjects[idx], data)
    persist()
    return state.subjects[idx]
  }

  function deleteSubject(id) {
    const subject = state.subjects.find(s => s.id === id)
    if (!subject) return { success: false, error: '科目不存在' }

    // 检查是否有子科目
    if (!isLeafSubject(state.subjects, id)) {
      return { success: false, error: '请先删除子科目' }
    }

    // 检查凭证是否引用了该科目
    const usedInVoucher = state.vouchers.some(v =>
      v.entries.some(e => e.subjectId === id)
    )
    if (usedInVoucher) {
      return { success: false, error: '科目已被凭证引用，不能删除' }
    }

    const idx = state.subjects.findIndex(s => s.id === id)
    if (idx >= 0) {
      state.subjects.splice(idx, 1)
      persist()
      return { success: true }
    }
    return { success: false, error: '删除失败' }
  }

  function getSubjectById(id) {
    return state.subjects.find(s => s.id === id)
  }

  function findSubjectsByCode(code) {
    return state.subjects.filter(s => s.code.startsWith(code) || s.code === code)
  }

  // ========================  䬟证 ========================

  function getNextVoucherNo(period) {
    const key = period || getCurrentPeriod()
    const seq = (state.voucherSeq[key] || 0) + 1
    state.voucherSeq[key] = seq
    persist()
    return { no: generateVoucherNo('记', seq, key), seq }
  }

  function addVoucher(data) {
    // 从日期推导期间，如果未显式指定
    const period = data.period || (data.date ? data.date.replace(/-/g, '').slice(0, 6) : getCurrentPeriod())
    const { no, seq } = getNextVoucherNo(period)

    const voucher = {
      id: genId(),
      voucherNo: no,
      seq,
      date: data.date || todayStr(),
      period,
      attachments: Number(data.attachments) || 0,
      entries: (data.entries || []).map(e => ({
        id: genId(),
        summary: e.summary || '',
        subjectId: e.subjectId,
        subjectCode: e.subjectCode || '',
        subjectName: e.subjectName || '',
        debit: round(Number(e.debit) || 0),
        credit: round(Number(e.credit) || 0),
        cashFlowItem: e.cashFlowItem || '',
      })),
      status: VOUCHER_STATUS.DRAFT,
      createdBy: '管理员',
      createdAt: new Date().toISOString(),
      approvedBy: null,
      approvedAt: null,
    }

    // 校验
    const validation = validateVoucher(voucher)
    if (!validation.valid) {
      return { success: false, errors: validation.errors }
    }

    state.vouchers.push(voucher)
    persist()
    return { success: true, voucher }
  }

  /**
   * 教学自动过账：创建凭证并直接设为已过账（跳过审核流程）
   * 用于教学模式中答对后自动过账
   * @param {{ date: string, entries: Array, attachments?: number }} data
   */
  function addTeachingVoucher(data) {
    const period = data.period || (data.date ? data.date.replace(/-/g, '').slice(0, 6) : getCurrentPeriod())
    const { no, seq } = getNextVoucherNo(period)

    const voucher = {
      id: genId(),
      voucherNo: no,
      seq,
      date: data.date || todayStr(),
      period,
      attachments: Number(data.attachments) || 0,
      entries: (data.entries || []).map(e => ({
        id: genId(),
        summary: e.summary || '',
        subjectId: e.subjectId,
        subjectCode: e.subjectCode || '',
        subjectName: e.subjectName || '',
        debit: round(Number(e.debit) || 0),
        credit: round(Number(e.credit) || 0),
        cashFlowItem: e.cashFlowItem || '',
      })),
      status: VOUCHER_STATUS.POSTED,
      createdBy: '管理员',
      createdAt: new Date().toISOString(),
      approvedBy: '系统(教学自动过账)',
      approvedAt: new Date().toISOString(),
    }

    // 校验
    const validation = validateVoucher(voucher)
    if (!validation.valid) {
      return { success: false, errors: validation.errors }
    }

    // 存入store
    state.vouchers.push(voucher)

    // 确保期间余额记录并更新余额
    ensurePeriodBalances(period, voucher.entries)
    state.periodBalances = updateBalancesAfterPost(state.periodBalances, voucher.entries, period, 'post')

    persist()
    addAuditLog('教学过账', voucher.voucherNo)

    return { success: true, voucher }
  }

  function updateVoucher(id, data) {
    const idx = state.vouchers.findIndex(v => v.id === id)
    if (idx < 0) return { success: false, errors: ['凭证不存在'] }

    const voucher = state.vouchers[idx]
    if (voucher.status !== VOUCHER_STATUS.DRAFT) {
      return { success: false, errors: ['只能修改草稿状态的凭证'] }
    }

    // 更新字段
    if (data.date) voucher.date = data.date
    if (data.attachments !== undefined) voucher.attachments = Number(data.attachments)
    if (data.entries) {
      voucher.entries = data.entries.map(e => ({
        id: e.id || genId(),
        summary: e.summary || '',
        subjectId: e.subjectId,
        subjectCode: e.subjectCode || '',
        subjectName: e.subjectName || '',
        debit: round(Number(e.debit) || 0),
        credit: round(Number(e.credit) || 0),
        cashFlowItem: e.cashFlowItem || '',
      }))
    }

    const validation = validateVoucher(voucher)
    if (!validation.valid) {
      return { success: false, errors: validation.errors }
    }

    persist()
    return { success: true, voucher }
  }

  function deleteVoucher(id) {
    const idx = state.vouchers.findIndex(v => v.id === id)
    if (idx < 0) return { success: false, error: '凭证不存在' }
    if (state.vouchers[idx].status !== VOUCHER_STATUS.DRAFT) {
      return { success: false, error: '只能删除草稿状态的凭证' }
    }
    state.vouchers.splice(idx, 1)
    persist()
    return { success: true }
  }

  function approveVoucher(id) {
    const voucher = state.vouchers.find(v => v.id === id)
    if (!voucher) return { success: false, error: '凭证不存在' }
    if (voucher.status !== VOUCHER_STATUS.DRAFT && voucher.status !== VOUCHER_STATUS.SIGNED) {
      return { success: false, error: `当前状态为"${voucher.status}"，不能审核` }
    }
    const validation = validateVoucher(voucher)
    if (!validation.valid) {
      return { success: false, errors: validation.errors }
    }
    voucher.status = VOUCHER_STATUS.APPROVED
    voucher.approvedBy = '管理员'
    voucher.approvedAt = new Date().toISOString()
    persist()
    return { success: true }
  }

  function unapproveVoucher(id) {
    const voucher = state.vouchers.find(v => v.id === id)
    if (!voucher) return { success: false, error: '凭证不存在' }
    if (voucher.status !== VOUCHER_STATUS.APPROVED) {
      return { success: false, error: '只能反审核已审核的凭证' }
    }
    voucher.status = VOUCHER_STATUS.SIGNED
    voucher.approvedBy = null
    voucher.approvedAt = null
    persist()
    return { success: true }
  }

  // ─── 出纳签字 ───
  function signVoucher(id) {
    const voucher = state.vouchers.find(v => v.id === id)
    if (!voucher) return { success: false, error: '凭证不存在' }
    if (voucher.status !== VOUCHER_STATUS.DRAFT) {
      return { success: false, error: `当前状态为"${voucher.status}"，不能签字` }
    }
    const validation = validateVoucher(voucher)
    if (!validation.valid) {
      return { success: false, errors: validation.errors }
    }
    voucher.status = VOUCHER_STATUS.SIGNED
    voucher.signedBy = '出纳'
    voucher.signedAt = new Date().toISOString()
    persist()
    return { success: true }
  }

  function unsignVoucher(id) {
    const voucher = state.vouchers.find(v => v.id === id)
    if (!voucher) return { success: false, error: '凭证不存在' }
    if (voucher.status !== VOUCHER_STATUS.SIGNED) {
      return { success: false, error: '只能取消签字已签字的凭证' }
    }
    voucher.status = VOUCHER_STATUS.DRAFT
    voucher.signedBy = null
    voucher.signedAt = null
    persist()
    return { success: true }
  }

  function postVoucher(id) {
    const voucher = state.vouchers.find(v => v.id === id)
    if (!voucher) return { success: false, error: '凭证不存在' }
    if (voucher.status !== VOUCHER_STATUS.APPROVED) {
      return { success: false, error: '只能过账已审核的凭证' }
    }
    if (voucher.entries.length === 0) {
      return { success: false, error: '凭证分录为空' }
    }

    // 过账前检查所有科目是否有效
    for (const entry of voucher.entries) {
      const subject = state.subjects.find(s => s.id === entry.subjectId)
      if (!subject) return { success: false, error: `科目"${entry.subjectName}"不存在` }
      if (!subject.isLeaf) {
        return { success: false, error: `科目"${entry.subjectName}"不是末级科目，不能使用` }
      }
    }

    // 确保该期间有期间余额记录
    ensurePeriodBalances(voucher.period, voucher.entries)

    // 更新期间余额
    state.periodBalances = updateBalancesAfterPost(
      state.periodBalances, voucher.entries, voucher.period, 'post'
    )

    voucher.status = VOUCHER_STATUS.POSTED
    persist()
    return { success: true }
  }

  function unpostVoucher(id) {
    const voucher = state.vouchers.find(v => v.id === id)
    if (!voucher) return { success: false, error: '凭证不存在' }
    if (voucher.status !== VOUCHER_STATUS.POSTED) {
      return { success: false, error: '只能反过账已过账的凭证' }
    }

    // 反更新期间余额
    state.periodBalances = updateBalancesAfterPost(
      state.periodBalances, voucher.entries, voucher.period, 'unpost'
    )

    // 恢复为已审核状态
    voucher.status = VOUCHER_STATUS.APPROVED
    persist()
    return { success: true }
  }

  function getVoucherList(filter = {}) {
    let list = [...state.vouchers]
    if (filter.period) list = list.filter(v => v.period === filter.period)
    if (filter.dateFrom) list = list.filter(v => v.date >= filter.dateFrom)
    if (filter.dateTo) list = list.filter(v => v.date <= filter.dateTo)
    if (filter.status) list = list.filter(v => v.status === filter.status)
    if (filter.keyword) {
      const kw = filter.keyword.toLowerCase()
      list = list.filter(v =>
        v.voucherNo.toLowerCase().includes(kw) ||
        v.entries.some(e => (e.summary || '').toLowerCase().includes(kw) ||
          (e.subjectName || '').toLowerCase().includes(kw))
      )
    }
    // 按日期降序，同日期按凭证号降序
    list.sort((a, b) => b.date.localeCompare(a.date) || b.voucherNo.localeCompare(a.voucherNo))
    return list
  }

  function getVoucherById(id) {
    return state.vouchers.find(v => v.id === id)
  }

  // ========================   间余额 ========================

  function ensurePeriodBalances(period, entries) {
    for (const entry of entries) {
      const existing = state.periodBalances.find(
        pb => pb.subjectId === entry.subjectId && pb.period === period
      )
      if (!existing) {
        const subject = state.subjects.find(s => s.id === entry.subjectId)
        if (subject) {
          const prevPeriod = getPrevPeriod(period)
          const prevBalances = prevPeriod
            ? state.periodBalances.filter(pb => pb.period === prevPeriod)
            : []
          const pb = createPeriodBalance(subject.id, subject.type, period, prevBalances)
          state.periodBalances.push(pb)
        }
      }
    }
  }

  function getPrevPeriod(period) {
    const year = parseInt(period.slice(0, 4))
    const month = parseInt(period.slice(4, 6))
    if (month === 1) return `${year - 1}12`
    return `${year}${String(month - 1).padStart(2, '0')}`
  }

  function getPeriodBalances(period) {
    // 确保所有有过账凭证的科目都有期间余额记录
    const postedVouchers = state.vouchers.filter(v => v.status === VOUCHER_STATUS.POSTED && v.period === period)
    for (const v of postedVouchers) {
      ensurePeriodBalances(period, v.entries)
    }

    return state.periodBalances.filter(pb => pb.period === period).map(pb => {
      // 重算期末余额（确保实时准确）
      const subject = state.subjects.find(s => s.id === pb.subjectId)
      if (subject) {
        return { ...pb, subjectType: subject.type, ...recalcClosingBalance(pb) }
      }
      return pb
    })
  }

  // ========================  㿂表 ========================

  function getTrialBalance(period) {
    // Include ALL leaf subjects, even ones with no activity
    const leafSubjects = state.subjects.filter(s => s.isLeaf && s.opened)
    const balances = getPeriodBalances(period)

    const items = leafSubjects.map(function(subject) {
      const pb = balances.find(function(b) { return b.subjectId === subject.id }) || {
        openingDebit: 0, openingCredit: 0, currentDebit: 0, currentCredit: 0,
        closingDebit: 0, closingCredit: 0,
      }
      const direction = BALANCE_DIRECTION[subject.type]
      // 损益类科目按编码判断方向：收入类(6/63)贷方余额，费用类(64/66/67/68)借方余额
      let directionLabel
      if (direction === DEBIT) {
        directionLabel = '借'
      } else if (direction === CREDIT) {
        directionLabel = '贷'
      } else if (subject.type === SUBJECT_TYPE.PROFIT_LOSS) {
        const code = subject.code || ''
        directionLabel = (code.startsWith('64') || code.startsWith('66') || code.startsWith('67') || code.startsWith('68')) ? '借' : '贷'
      } else {
        directionLabel = '—'
      }
      const netBalance = round(direction === DEBIT
        ? Number(pb.closingDebit) - Number(pb.closingCredit)
        : Number(pb.closingCredit) - Number(pb.closingDebit))
      return {
        subjectId: subject.id,
        code: subject.code,
        name: subject.name,
        openingDebit: pb.openingDebit,
        openingCredit: pb.openingCredit,
        currentDebit: pb.currentDebit,
        currentCredit: pb.currentCredit,
        closingDebit: pb.closingDebit,
        closingCredit: pb.closingCredit,
        direction: directionLabel,
        balance: netBalance,
      }
    })

    const result = trialBalanceFn(items.map(function(i) {
      return { subjectCode: i.code, subjectName: i.name, subjectType: state.subjects.find(function(s) { return s.id === i.subjectId })?.type, balance: i.balance }
    }).filter(Boolean))

    return { ...result, items: items }
  }

  function getBalanceSheet(period) {
    const balances = getPeriodBalances(period)
    return calcBalanceSheet(state.subjects, balances)
  }

  function getIncomeStatement(period) {
    const balances = getPeriodBalances(period)
    return calcIncomeStatement(state.subjects, balances)
  }

  function getCashFlow(period) {
    const balances = getPeriodBalances(period)
    return calcCashFlow(state.subjects, balances)
  }

  function getFinancialRatios(period) {
    const balances = getPeriodBalances(period)
    return calcFinancialRatios(state.subjects, balances)
  }

  // ========================  Dashboard ========================

  function getDashboardStats(period) {
    const p = period || getCurrentPeriod()
    const vouchers = state.vouchers.filter(v => v.period === p)
    const postedVouchers = vouchers.filter(v => v.status === VOUCHER_STATUS.POSTED)

    let debitTotal = 0
    let creditTotal = 0
    for (const v of vouchers) {
      for (const e of v.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
    }

    const postedBalances = state.periodBalances.filter(pb => pb.period === p)
    const tb = trialBalanceFn(postedBalances.map(pb => {
      const subject = state.subjects.find(s => s.id === pb.subjectId)
      if (!subject) return null
      return {
        subjectCode: subject.code,
        subjectName: subject.name,
        subjectType: subject.type,
        balance: round((BALANCE_DIRECTION[subject.type] === DEBIT)
          ? Number(pb.closingDebit) - Number(pb.closingCredit)
          : Number(pb.closingCredit) - Number(pb.closingDebit)),
      }
    }).filter(Boolean))

    // 关键科目余额（用于KPI）
    const subjectBalances = {}
    const tbItems = tb?.items || []
    for (const item of tbItems) {
      subjectBalances[item.subjectCode] = item.balance
    }

    // 待办统计
    const pendingSign = vouchers.filter(v => v.status === VOUCHER_STATUS.DRAFT).length
    const pendingApprove = vouchers.filter(v => v.status === VOUCHER_STATUS.SIGNED).length
    const pendingPost = vouchers.filter(v => v.status === VOUCHER_STATUS.APPROVED).length

    // 货币资金 = 库存现金(1001) + 银行存款(1002) + 其他货币资金(1012)
    const cashBalance = round(
      (subjectBalances['1001'] || 0) + (subjectBalances['1002'] || 0) + (subjectBalances['1012'] || 0)
    )
    // 应收账款(1122)
    const arBalance = round(subjectBalances['1122'] || 0)
    // 应付账款(2202)
    const apBalance = round(subjectBalances['2202'] || 0)

    return {
      voucherCount: vouchers.length,
      postedCount: postedVouchers.length,
      debitTotal: round(debitTotal),
      creditTotal: round(creditTotal),
      isBalanced: tb.balanced,
      cashBalance,
      arBalance,
      apBalance,
      pendingSign,
      pendingApprove,
      pendingPost,
    }
  }

  /**
   * 获取各月份的统计（用于图表）
   * @param {number} monthCount - 最近几个月，默认12
   */
  function getMonthlyStats(monthCount = 12) {
    const periods = [...new Set(state.periodBalances.map(pb => pb.period))].sort()
    const recentPeriods = periods.slice(-monthCount)

    return recentPeriods.map(p => {
      const incomeStmt = getIncomeStatement(p)
      // 期间内凭证数
      const vCount = state.vouchers.filter(v => v.period === p).length
      return {
        period: p,
        label: `${p.slice(0,4)}-${p.slice(4,6)}`,
        revenue: incomeStmt?.revenue || 0,
        cost: incomeStmt?.cost || 0,
        netProfit: incomeStmt?.netProfit || 0,
        expense: incomeStmt?.sellingExpense + incomeStmt?.adminExpense + incomeStmt?.financeExpense || 0,
        voucherCount: vCount,
      }
    })
  }

  // ========================  辅助核算 ========================

  function getAuxDimensions() {
    return state.auxiliaryDimensions
  }

  function addAuxDimension(data) {
    const dim = { id: genId(), name: data.name, code: data.code || '', enabled: data.enabled !== false }
    state.auxiliaryDimensions.push(dim)
    persist()
    return dim
  }

  function updateAuxDimension(id, data) {
    const idx = state.auxiliaryDimensions.findIndex(d => d.id === id)
    if (idx >= 0) { Object.assign(state.auxiliaryDimensions[idx], data); persist() }
  }

  function deleteAuxDimension(id) {
    if (state.auxiliaryItems.some(i => i.dimId === id)) return { success: false, error: '该维度下有核算项目，不能删除' }
    const idx = state.auxiliaryDimensions.findIndex(d => d.id === id)
    if (idx >= 0) { state.auxiliaryDimensions.splice(idx, 1); persist(); return { success: true } }
    return { success: false, error: '维度不存在' }
  }

  function getAuxItems(dimId) {
    return dimId ? state.auxiliaryItems.filter(i => i.dimId === dimId) : state.auxiliaryItems
  }

  function addAuxItem(data) {
    const item = { id: genId(), dimId: data.dimId, code: data.code || '', name: data.name, enabled: data.enabled !== false }
    state.auxiliaryItems.push(item)
    persist()
    return item
  }

  function updateAuxItem(id, data) {
    const idx = state.auxiliaryItems.findIndex(i => i.id === id)
    if (idx >= 0) { Object.assign(state.auxiliaryItems[idx], data); persist() }
  }

  function deleteAuxItem(id) {
    const idx = state.auxiliaryItems.findIndex(i => i.id === id)
    if (idx >= 0) { state.auxiliaryItems.splice(idx, 1); persist(); return { success: true } }
    return { success: false, error: '项目不存在' }
  }

  // ========================  凭证模板 ========================

  function getVoucherTemplates() {
    return state.voucherTemplates
  }

  function addVoucherTemplate(data) {
    const tmpl = {
      id: genId(),
      name: data.name,
      entries: (data.entries || []).map(e => ({
        id: genId(), summary: e.summary || '',
        subjectId: e.subjectId, subjectCode: e.subjectCode || '', subjectName: e.subjectName || '',
        debitFormula: e.debitFormula || '', creditFormula: e.creditFormula || '',
      })),
      createdAt: new Date().toISOString(),
    }
    state.voucherTemplates.push(tmpl)
    persist()
    return tmpl
  }

  function deleteVoucherTemplate(id) {
    const idx = state.voucherTemplates.findIndex(t => t.id === id)
    if (idx >= 0) { state.voucherTemplates.splice(idx, 1); persist(); return { success: true } }
    return { success: false }
  }

  // ========================  出纳 ========================

  function getBankStatements() { return state.bankStatements }

  function addBankStatement(data) {
    const s = { id: genId(), date: data.date, amount: Number(data.amount) || 0, description: data.description || '', isMatched: false, voucherId: null }
    state.bankStatements.push(s); persist(); return s
  }

  function deleteBankStatement(id) {
    const idx = state.bankStatements.findIndex(s => s.id === id)
    if (idx >= 0) { state.bankStatements.splice(idx, 1); persist(); return { success: true } }
    return { success: false }
  }

  function matchBankStatement(stmtId, voucherId) {
    const s = state.bankStatements.find(x => x.id === stmtId)
    if (s) { s.isMatched = true; s.voucherId = voucherId; persist() }
  }

  function unmatchBankStatement(stmtId) {
    const s = state.bankStatements.find(x => x.id === stmtId)
    if (s) { s.isMatched = false; s.voucherId = null; persist() }
  }

  // ========================  会计期间 ========================

  function ensurePeriods(year) {
    const y = year || new Date().getFullYear()
    for (let m = 1; m <= 12; m++) {
      const period = y + String(m).padStart(2, '0')
      if (!state.accountingPeriods.some(function(p) { return p.period === period })) {
        state.accountingPeriods.push({ id: genId(), period: period, isClosed: false })
      }
    }
    persist()
  }

  function getPeriods() { return state.accountingPeriods }
  function togglePeriod(period) {
    const p = state.accountingPeriods.find(function(x) { return x.period === period })
    if (p) { p.isClosed = !p.isClosed; persist() }
  }

  // ========================  审计轨迹 ========================

  function addAuditLog(action, detail) {
    state.auditLogs.push({
      id: genId(), time: new Date().toISOString(), user: '管理员', action: action, detail: detail,
    })
    persist()
  }

  function getAuditLogs() { return [...state.auditLogs].reverse() }

  // Hook into approveVoucher and postVoucher for audit logging
  const _origApprove = approveVoucher
  approveVoucher = function(id) {
    const result = _origApprove(id)
    if (result.success) {
      const v = state.vouchers.find(function(x) { return x.id === id })
      addAuditLog('审核凭证', v ? v.voucherNo : id)
    }
    return result
  }

  const _origPost = postVoucher
  postVoucher = function(id) {
    const result = _origPost(id)
    if (result.success) {
      const v = state.vouchers.find(function(x) { return x.id === id })
      addAuditLog('过账凭证', v ? v.voucherNo : id)
    }
    return result
  }

  const _origSign = signVoucher
  signVoucher = function(id) {
    const result = _origSign(id)
    if (result.success) {
      const v = state.vouchers.find(function(x) { return x.id === id })
      addAuditLog('出纳签字', v ? v.voucherNo : id)
    }
    return result
  }

  const _origUnsign = unsignVoucher
  unsignVoucher = function(id) {
    const result = _origUnsign(id)
    if (result.success) {
      const v = state.vouchers.find(function(x) { return x.id === id })
      addAuditLog('取消签字', v ? v.voucherNo : id)
    }
    return result
  }


  // ========================  角色权限 ========================

  const ROLES = [
    { id: 'cashier', name: '出纳', desc: '现金/银行日记账、银行对账' },
    { id: 'accountant', name: '会计', desc: '科目/凭证/账簿/报表' },
    { id: 'supervisor', name: '会计主管', desc: '全部权限 + 审核/过账/结账' },
  ]

  /** 自由模式开关 */
  const practiceMode = ref(localStorage.getItem('jd_practice_mode') === 'true')

  function togglePracticeMode() {
    practiceMode.value = !practiceMode.value
    localStorage.setItem('jd_practice_mode', practiceMode.value ? 'true' : 'false')
  }

  function isPracticeMode() { return practiceMode.value }

  function getCurrentRole() { return state.currentRole }

  function switchRole(roleId) {
    // 保存当前角色的数据
    persist()
    state.currentRole = roleId
    localStorage.setItem('jd_role', roleId)
    // 加载新角色的数据
    const saved = loadState()
    if (saved) {
      applySavedState(saved)
    }
  }

  /** 将保存的状态恢复到 reactive state */
  function applySavedState(saved) {
    state.subjects = (saved.subjects || []).map(s => ({ ...s }))
    state.vouchers = (saved.vouchers || []).map(v => ({ ...v, entries: v.entries.map(e => ({ ...e })) }))
    state.periodBalances = saved.periodBalances || []
    state.accounts = saved.accounts || [{ ...DEFAULT_ACCOUNT }]
    state.voucherSeq = saved.voucherSeq || {}
    state.auxiliaryDimensions = saved.auxiliaryDimensions || []
    state.auxiliaryItems = saved.auxiliaryItems || []
    state.voucherTemplates = saved.voucherTemplates || []
    state.bankStatements = saved.bankStatements || []
    state.accountingPeriods = saved.accountingPeriods || []
    state.auditLogs = saved.auditLogs || []
    state.cashFlowItems = saved.cashFlowItems || []
    state.progressVersion = saved.progressVersion || 0
  }

  function getRoleMenuFilter(roleId) {
    const role = roleId || getCurrentRole()
    if (role === 'supervisor') return null
    if (role === 'cashier') return (p) => {
      // 出纳只能看到出纳管理、凭证查询(只读)、往来管理、教学、案例库、激活管理
      if (p === '/dashboard') return true
      if (p.includes('/accounting/cashier')) return true
      if (p === '/accounting/voucher/query') return true
      if (p.includes('/accounting/arap')) return true
      if (p.includes('/tutorial')) return true
      if (p.includes('/cases')) return true
      if (p === '/system/activation') return true
      if (p.includes('/docs')) return true
      return false
    }
    if (role === 'accountant') return (p) => {
      // 会计看不到出纳管理（日记账/对账是出纳专属）
      if (p.includes('/accounting/cashier')) return false
      return true
    }
    return null
  }

  function canApproveVoucher() { return getCurrentRole() === 'supervisor' }
  function canPostVoucher() { return getCurrentRole() === 'supervisor' }

  // ========================  XP/等级/成就 ========================

  /**
   * 添加XP并检查等级变化
   * @param {number} amount - XP数量
   * @param {string} reason - 原因描述
   * @returns {{ didLevelUp: boolean, newLevel: number, levelInfo: object }}
   */
  function addXP(amount, reason) {
    const xpData = loadXPData()
    const result = addXPAndCheckLevel(amount, xpData)
    saveXPData(xpData)
    return result
  }

  /** 获取当前等级信息 */
  function getLevelInfo() {
    const xpData = loadXPData()
    return calcLevel(xpData.xp)
  }

  /** 获取XP原始数据 */
  function getXPData() {
    return loadXPData()
  }

  /** 保存XP数据 */
  function setXPData(data) {
    saveXPData(data)
  }

  /**
   * 标记任务完成并发放XP奖励
   * @param {object} task - 教学任务
   * @param {string} mode - guided/practice/exam
   * @param {boolean} isCorrect - 是否答对
   * @returns {{ xpEarned: number, didLevelUp: boolean, newLevel: number, levelInfo: object, newlyUnlocked: string[] }}
   */
  function completeTask(task, mode, isCorrect) {
    if (!isCorrect || !task) return { xpEarned: 0 }

    // 防止重复完成
    const taskKey = `${task.date}_${task.title}`
    const xpData = loadXPData()
    if (xpData.completedTasks.includes(taskKey)) return { xpEarned: 0 }

    // 触发进度刷新信号
    state.progressVersion++

    // 计算XP
    const base = XP_BASE[mode] || XP_BASE.practice
    // 引导模式不给首次奖励（自动填答案，仅给象征XP）
    const isFirst = mode !== 'guided' && !xpData.firstCompletes.includes(taskKey)
    const bonus = isFirst ? XP_FIRST_BONUS : 0
    const total = base + bonus

    // 更新XP数据
    xpData.xp += total
    xpData.completedTasks.push(taskKey)
    if (isFirst) xpData.firstCompletes.push(taskKey)

    // 连续答对
    xpData.streak = (xpData.streak || 0) + 1
    xpData.maxStreak = Math.max(xpData.maxStreak || 0, xpData.streak)

    // 角色计数
    const role = getCurrentRole()
    if (role === 'accountant' || role === 'cashier') {
      xpData.roleCounts = xpData.roleCounts || { accountant: 0, cashier: 0 }
      xpData.roleCounts[role] = (xpData.roleCounts[role] || 0) + 1
    }

    // 计算等级
    const oldLevel = calcLevel(xpData.xp - total)
    const levelInfo = calcLevel(xpData.xp)
    const didLevelUp = levelInfo.level > oldLevel.level

    // 检查成就
    const achData = loadAchievements()
    const { newlyUnlocked } = checkAchievements(xpData, achData, role)
    if (newlyUnlocked.length) {
      saveAchievements(achData)
    }

    saveXPData(xpData)

    return {
      xpEarned: total,
      didLevelUp,
      newLevel: levelInfo.level,
      levelInfo,
      newlyUnlocked: newlyUnlocked.map(n => n.achievement),
    }
  }

  /** 获取成就状态列表 */
  function getAchievementStatus() {
    const achData = loadAchievements()
    return ACHIEVEMENTS.map(a => ({
      ...a,
      unlocked: achData[a.id]?.unlocked || false,
      unlockedAt: achData[a.id]?.unlockedAt || null,
    }))
  }

  /** 标记考场满分 */
  function markExamPerfect() {
    const xpData = loadXPData()
    xpData.examPerfect = true
    saveXPData(xpData)
  }

  /** 标记月份完成 */
  function markMonthComplete(month) {
    const xpData = loadXPData()
    xpData.monthComplete = true
    // 季度检查
    const monthsDone = xpData.completedMonths || []
    if (!monthsDone.includes(month)) {
      monthsDone.push(month)
      xpData.completedMonths = monthsDone
      // 检查是否完成一个季度（3个月）
      const monthNum = parseInt(month)
      const quarter = Math.ceil(monthNum / 3)
      const quarterMonths = monthsDone.filter(m => Math.ceil(parseInt(m) / 3) === quarter)
      if (quarterMonths.length >= 3) {
        xpData.quarterComplete = true
      }
    }
    saveXPData(xpData)
  }

  /** 标记场景完成（制造业/商业/服务业/建筑业） */
  function markScenarioComplete(scenarioId) {
    const xpData = loadXPData()
    if (scenarioId === 'manufacturing') xpData.manufacturingComplete = true
    if (scenarioId === 'commercial') xpData.commercialComplete = true
    if (scenarioId === 'service') xpData.serviceComplete = true
    if (scenarioId === 'construction') xpData.constructionComplete = true
    saveXPData(xpData)
  }

  /** 记录第3次重试成功（永不放弃成就） */
  function markPersistentWin() {
    const xpData = loadXPData()
    xpData.persistentWin = true
    saveXPData(xpData)
  }

  /** 答错时重置连续答对 */
  function breakStreak() {
    const xpData = loadXPData()
    xpData.streak = 0
    saveXPData(xpData)
  }

  function resetToDefaults() {
    const fresh = createInitialState()
    state.subjects = fresh.subjects
    state.vouchers = fresh.vouchers
    state.periodBalances = fresh.periodBalances
    state.voucherSeq = fresh.voucherSeq
    state.accounts = fresh.accounts
    state.auxiliaryDimensions = fresh.auxiliaryDimensions
    state.auxiliaryItems = fresh.auxiliaryItems
    state.voucherTemplates = fresh.voucherTemplates
    state.bankStatements = fresh.bankStatements
    state.accountingPeriods = fresh.accountingPeriods
    state.auditLogs = fresh.auditLogs
    state.cashFlowItems = fresh.cashFlowItems
    // 注意：不重置 currentRole，保留用户当前角色（教学场景切换时避免角色被重置）
    state.currentAccountId = fresh.accounts[0].id
    localStorage.removeItem(getScenarioStorageKey())
    persist()
  }

  /**
   * 初始化教学账套 — 重置数据并预置期初余额
   * 用户进入教学模式时调用，自动带出上年末结转数据
   */
  function initTeachingAccount() {
    resetToDefaults()

    // 教学账套期初余额（上年末结转）
    // 对应 year1.js 第一个任务的科目余额表
    const period = '202601'
    const opening = [
      { subjectId: 's-100201', type: SUBJECT_TYPE.ASSET, debit: 500000 },   // 银行存款-工商银行
      { subjectId: 's-2001', type: SUBJECT_TYPE.LIABILITY, credit: 200000 },  // 短期借款
      { subjectId: 's-4001', type: SUBJECT_TYPE.OWNERS_EQUITY, credit: 300000 }, // 实收资本
    ]

    state.periodBalances = opening.map(o => {
      const isDebit = BALANCE_DIRECTION[o.type] === DEBIT
      const amt = round(o.debit || o.credit || 0)
      return {
        id: genId(),
        subjectId: o.subjectId,
        subjectType: o.type,
        period,
        openingDebit: round(isDebit ? amt : 0),
        openingCredit: round(isDebit ? 0 : amt),
        currentDebit: 0,
        currentCredit: 0,
        closingDebit: round(isDebit ? amt : 0),
        closingCredit: round(isDebit ? 0 : amt),
      }
    })

    // 标记教学模式已激活
    localStorage.setItem('teaching_active', 'true')
    persist()
    return { success: true }
  }

  /**
   * 初始化商业企业教学账套
   * 使用 COMMERCIAL_SUBJECTS 科目表，无生产核算科目
   */
  function initCommercialAccount() {
    resetToDefaults()

    // 用商业企业科目表替换默认科目
    state.subjects = COMMERCIAL_SUBJECTS.map(s => ({ ...s }))

    // 教学账套期初余额（商业企业起始）
    const period = '202601'
    const opening = [
      { subjectId: 's-100201', type: SUBJECT_TYPE.ASSET, debit: 800000 },   // 银行存款-工商银行
      { subjectId: 's-2001', type: SUBJECT_TYPE.LIABILITY, credit: 300000 }, // 短期借款
      { subjectId: 's-4001', type: SUBJECT_TYPE.OWNERS_EQUITY, credit: 500000 }, // 实收资本
    ]

    state.periodBalances = opening.map(o => {
      const isDebit = BALANCE_DIRECTION[o.type] === DEBIT
      const amt = round(o.debit || o.credit || 0)
      return {
        id: genId(),
        subjectId: o.subjectId,
        subjectType: o.type,
        period,
        openingDebit: round(isDebit ? amt : 0),
        openingCredit: round(isDebit ? 0 : amt),
        currentDebit: 0,
        currentCredit: 0,
        closingDebit: round(isDebit ? amt : 0),
        closingCredit: round(isDebit ? 0 : amt),
      }
    })

    // 标记教学模式已激活
    localStorage.setItem('teaching_active', 'true')
    persist()
    return { success: true }
  }

  /**
   * 初始化服务业教学账套
   * 使用 SERVICE_SUBJECTS 科目表，无存货/生产科目
   * 依据：《企业会计准则第14号——收入》（财会[2017]22号）
   */
  function initServiceAccount() {
    resetToDefaults()

    // 用服务业科目表替换默认科目
    state.subjects = SERVICE_SUBJECTS.map(s => ({ ...s }))

    // 教学账套期初余额（服务业起始：雲帆管理咨询有限公司）
    const period = '202601'
    const opening = [
      { subjectId: 's-100201', type: SUBJECT_TYPE.ASSET, debit: 600000 },   // 银行存款-工商银行
      { subjectId: 's-2001', type: SUBJECT_TYPE.LIABILITY, credit: 200000 }, // 短期借款
      { subjectId: 's-4001', type: SUBJECT_TYPE.OWNERS_EQUITY, credit: 400000 }, // 实收资本
    ]

    state.periodBalances = opening.map(o => {
      const isDebit = BALANCE_DIRECTION[o.type] === DEBIT
      const amt = round(o.debit || o.credit || 0)
      return {
        id: genId(),
        subjectId: o.subjectId,
        subjectType: o.type,
        period,
        openingDebit: round(isDebit ? amt : 0),
        openingCredit: round(isDebit ? 0 : amt),
        currentDebit: 0,
        currentCredit: 0,
        closingDebit: round(isDebit ? amt : 0),
        closingCredit: round(isDebit ? 0 : amt),
      }
    })

    // 标记教学模式已激活
    localStorage.setItem('teaching_active', 'true')
    persist()
    return { success: true }
  }
  /**
   * 初始化建筑业教学账套
   * 使用 CONSTRUCTION_SUBJECTS 科目表，合同成本核算科目
   * 依据：《企业会计准则第14号——收入》（财会[2017]22号）
   */
  function initConstructionAccount() {
    resetToDefaults()

    // 用建筑业科目表替换默认科目
    state.subjects = CONSTRUCTION_SUBJECTS.map(s => ({ ...s }))

    // 教学账套期初余额（建筑业起始：鼎立建筑工程有限公司）
    const period = '202601'
    const opening = [
      { subjectId: 's-100201', type: SUBJECT_TYPE.ASSET, debit: 1000000 },   // 银行存款-工商银行
      { subjectId: 's-2001', type: SUBJECT_TYPE.LIABILITY, credit: 400000 },  // 短期借款
      { subjectId: 's-4001', type: SUBJECT_TYPE.OWNERS_EQUITY, credit: 600000 }, // 实收资本
    ]

    state.periodBalances = opening.map(o => {
      const isDebit = BALANCE_DIRECTION[o.type] === DEBIT
      const amt = round(o.debit || o.credit || 0)
      return {
        id: genId(),
        subjectId: o.subjectId,
        subjectType: o.type,
        period,
        openingDebit: round(isDebit ? amt : 0),
        openingCredit: round(isDebit ? 0 : amt),
        currentDebit: 0,
        currentCredit: 0,
        closingDebit: round(isDebit ? amt : 0),
        closingCredit: round(isDebit ? 0 : amt),
      }
    })

    // 标记教学模式已激活
    localStorage.setItem('teaching_active', 'true')
    persist()
    return { success: true }
  }


  // ─── 场景数据隔离：切换时保存当前状态，加载目标场景状态 ───

  function switchScenarioState(scenarioId) {
    // 1. 保存当前场景数据
    persist()
    // 2. 更新场景ID
    localStorage.setItem('jd_scenario', scenarioId)
    // 3. 清除教学活跃标记（让 tutorialFloater 重新初始化）
    localStorage.removeItem('teaching_active')
    // 4. 加载目标场景数据
    const saved = loadState()
    if (saved) applySavedState(saved)
    // 无数据时保持空初始状态，tutorialFloater 会检测 teaching_active 不存在后自动初始化
    return { success: true }
  }

  // Auto-initialize periods for current year
  ensurePeriods(new Date().getFullYear())

  // ─── 案例数据隔离：进入/退出独立案例 ───

  function getCaseStorageKey(caseId) {
    return `jd_case_data_${caseId}`
  }

  function getActiveCaseId() {
    return localStorage.getItem('jd_active_case') || null
  }

  function isCaseMode() {
    return !!getActiveCaseId()
  }

  /**
   * 进入案例模式
   * 1. 保存当前场景状态
   * 2. 加载案例科目体系 + 期初余额
   */
  function switchToCase(caseId) {
    const caseConfig = getCaseConfig(caseId)
    if (!caseConfig) return { success: false, errors: ['案例不存在'] }

    // 1. 保存当前场景
    persist()
    // 保存当前场景ID和教学状态以便恢复
    const currentScenario = localStorage.getItem('jd_scenario') || 'manufacturing'
    localStorage.setItem('jd_scenario_before_case', currentScenario)
    const wasTeachingActive = localStorage.getItem('teaching_active')
    if (wasTeachingActive) localStorage.setItem('jd_teaching_before_case', wasTeachingActive)
    localStorage.removeItem('teaching_active')

    // 2. 设置案例标记
    localStorage.setItem('jd_active_case', caseId)
    localStorage.setItem('jd_scenario', caseId)  // 用案例ID作为临时场景ID

    // 3. 尝试加载已有案例数据
    const saved = loadCaseState(caseId)
    if (saved) {
      applySavedState(saved)
      return { success: true }
    }

    // 4. 首次进入：初始化案例
    const initResult = initCaseAccount(caseConfig.data)
    if (initResult.success) {
      persistCaseState(caseId)
    }
    // 通知浮动窗刷新
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('task-updated'))
    }
    return initResult
  }

  /** 从案例专属存储键加载状态 */
  function loadCaseState(caseId) {
    try {
      const raw = localStorage.getItem(getCaseStorageKey(caseId))
      if (raw) return JSON.parse(raw)
    } catch (e) { /* ignore */ }
    return null
  }

  /** 保存案例状态到专属存储键 */
  function persistCaseState(caseId) {
    try {
      localStorage.setItem(getCaseStorageKey(caseId), JSON.stringify({
        subjects: state.subjects,
        vouchers: state.vouchers,
        periodBalances: state.periodBalances,
        accounts: state.accounts,
        voucherSeq: state.voucherSeq,
        auxiliaryDimensions: state.auxiliaryDimensions,
        auxiliaryItems: state.auxiliaryItems,
        voucherTemplates: state.voucherTemplates,
        bankStatements: state.bankStatements,
        accountingPeriods: state.accountingPeriods,
        auditLogs: state.auditLogs,
        cashFlowItems: state.cashFlowItems,
        progressVersion: state.progressVersion,
      }))
    } catch (e) { /* ignore */ }
  }

  /**
   * 初始化案例账套
   * @param {object} caseData - 案例数据对象 (含 subjects, openingBalances)
   */
  function initCaseAccount(caseData) {
    if (!caseData) return { success: false, errors: ['案例数据不存在'] }

    // 重置状态
    resetToDefaults()

    // 设置案例专属科目
    if (caseData.subjects && caseData.subjects.length > 0) {
      state.subjects = caseData.subjects.map(s => ({ ...s }))
    }

    // 设置期初余额
    if (caseData.openingBalances && caseData.openingBalances.length > 0) {
      const period = '202601'
      state.periodBalances = caseData.openingBalances.map(o => ({
        id: genId(),
        subjectId: o.subjectId,
        subjectType: o.type || 'asset',
        period,
        openingDebit: round(o.debit || o.openingDebit || 0),
        openingCredit: round(o.credit || o.openingCredit || 0),
        currentDebit: 0,
        currentCredit: 0,
        closingDebit: round(o.debit || o.openingDebit || 0),
        closingCredit: round(o.credit || o.openingCredit || 0),
      }))
    }

    // 确保会计期间
    ensurePeriods(2026)

    return { success: true }
  }

  /**
   * 退出案例模式，恢复之前的场景
   */
  function exitCase() {
    const caseId = getActiveCaseId()
    if (!caseId) return { success: false, errors: ['当前不在案例模式'] }

    // 1. 保存案例当前状态
    persistCaseState(caseId)
    // 2. 清除案例标记（保留 tutorial_task，让浮动窗自动切换到教学任务）
    localStorage.removeItem('jd_active_case')
    // 3. 恢复之前的教学状态和场景
    const wasTeachingBefore = localStorage.getItem('jd_teaching_before_case')
    if (wasTeachingBefore) localStorage.setItem('teaching_active', wasTeachingBefore)
    localStorage.removeItem('jd_teaching_before_case')
    const previousScenario = localStorage.getItem('jd_scenario_before_case') || 'manufacturing'
    localStorage.removeItem('jd_scenario_before_case')
    // 4. 加载原场景
    localStorage.setItem('jd_scenario', previousScenario)
    const saved = loadState()
    if (saved) applySavedState(saved)
    // 5. 通知浮动窗刷新
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('task-updated'))
    }
    return { success: true }
  }

  _store = {
    // 状态
    state,
    // 账套
    getCurrentAccount, switchAccount, addAccount, deleteAccount,
    // 科目
    getSubjectTree, addSubject, updateSubject, deleteSubject,
    getSubjectById, findSubjectsByCode,
    // 凭证
    addVoucher, addTeachingVoucher, updateVoucher, deleteVoucher,
    approveVoucher, unapproveVoucher, signVoucher, unsignVoucher, postVoucher, unpostVoucher,
    getVoucherList, getVoucherById, getNextVoucherNo,
    // 余额
    getPeriodBalances,
    // 报表
    getTrialBalance, getBalanceSheet, getIncomeStatement, getCashFlow, getFinancialRatios,
    // Dashboard
    getDashboardStats, getMonthlyStats,
    // 辅助核算
    getAuxDimensions, addAuxDimension, updateAuxDimension, deleteAuxDimension,
    getAuxItems, addAuxItem, updateAuxItem, deleteAuxItem,
    // 凭证模板
    getVoucherTemplates, addVoucherTemplate, deleteVoucherTemplate,
    // 出纳
    getBankStatements, addBankStatement, deleteBankStatement,
    matchBankStatement, unmatchBankStatement,
    // 角色
    getCurrentRole, switchRole, getRoleMenuFilter,
    ROLES, canApproveVoucher, canPostVoucher,
    // 自由模式
    practiceMode, togglePracticeMode, isPracticeMode,
    // XP/等级/成就
    addXP, getLevelInfo, getXPData, setXPData,
    completeTask, getAchievementStatus,
    markExamPerfect, markMonthComplete, markScenarioComplete,
    markPersistentWin, breakStreak,
    // 会计期间
    ensurePeriods, getPeriods, togglePeriod,
    // 审计
    addAuditLog, getAuditLogs,
    // 工具
    resetToDefaults,
    initTeachingAccount, initCommercialAccount, initServiceAccount, initConstructionAccount, switchScenarioState,
    // 案例模式
    getActiveCaseId, isCaseMode, switchToCase, exitCase, persistCaseState,
  }

  return _store
}
