<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">📊 企业财务全流程</h2>
    </div>

    <div class="flow-intro">
      从企业设立到报表编制，完整的企业财务循环。点击每个环节查看详细说明。
    </div>

    <div class="flow-chart">
      <div v-for="(node, idx) in nodes" :key="idx" class="flow-node" @click="toggleDetail(idx)">
        <div class="flow-card" :class="{ 'is-active': activeNode === idx }" :style="{ borderColor: activeNode === idx ? node.color : '#e8e8e8' }">
          <div class="flow-icon" :style="{ background: node.color }">{{ node.icon }}</div>
          <div class="flow-title">{{ node.title }}</div>
          <div class="flow-sub">{{ node.subtitle }}</div>
          <div v-if="activeNode === idx" class="flow-active-indicator">▼ 详情已展开</div>
        </div>
        <div v-if="idx < nodes.length - 1" class="flow-arrow">▼</div>
      </div>
    </div>

    <!-- 详情展开区 -->
    <transition name="fade">
      <div v-if="activeNode !== null" class="flow-detail" :style="{ borderLeftColor: nodes[activeNode].color }">
        <div class="detail-header">
          <span class="detail-icon">{{ nodes[activeNode].icon }}</span>
          <span class="detail-title">{{ nodes[activeNode].title }}</span>
          <el-tag size="small" :style="{ background: nodes[activeNode].color, color: '#fff', border: 'none' }">{{ nodes[activeNode].subtitle }}</el-tag>
        </div>
        <div class="detail-body">
          <div class="detail-section">
            <div class="detail-section-title">📖 业务说明</div>
            <div class="detail-text">{{ nodes[activeNode].description }}</div>
          </div>
          <div class="detail-section">
            <div class="detail-section-title">📝 典型会计分录</div>
            <div class="detail-entries">
              <div v-for="(entry, i) in nodes[activeNode].entries" :key="i" class="detail-entry">
                <span class="de-bit" v-if="entry.debit > 0">借：{{ entry.subject }} ¥{{ formatAmt(entry.debit) }}</span>
                <span class="cr-edit" v-if="entry.credit > 0">贷：{{ entry.subject }} ¥{{ formatAmt(entry.credit) }}</span>
              </div>
            </div>
          </div>
          <div v-if="nodes[activeNode].tips" class="detail-section">
            <div class="detail-section-title">💡 教学要点</div>
            <div class="detail-tips">
              <div v-for="(tip, i) in nodes[activeNode].tips" :key="i" class="detail-tip">• {{ tip }}</div>
            </div>
          </div>
          <div v-if="nodes[activeNode].relatedTags" class="detail-section">
            <div class="detail-section-title">🏷️ 相关知识点</div>
            <div class="detail-tags">
              <el-tag v-for="tag in nodes[activeNode].relatedTags" :key="tag" size="small" type="primary" effect="plain" style="margin:2px">{{ tag }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatAmount } from '@/utils/accounting.js'

const activeNode = ref(null)

function toggleDetail(idx) {
  activeNode.value = activeNode.value === idx ? null : idx
  // 展开后滚动到详情区
  if (activeNode.value !== null) {
    setTimeout(() => {
      const el = document.querySelector('.flow-detail')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

function formatAmt(v) {
  return formatAmount(v)
}

const nodes = [
  {
    icon: '💰',
    title: '企业设立与资本金',
    subtitle: '融资 · 投资',
    color: '#409eff',
    description: '企业成立时，股东投入资本金，形成企业最初的资金来源。也可能通过银行借款等方式融资。这是企业财务循环的起点。',
    entries: [
      { subject: '银行存款', debit: 500000 },
      { subject: '实收资本', credit: 500000 },
    ],
    tips: ['资本金是企业经营的"血液"，注意区分注册资本与实际出资', '银行借款需要按期计提利息，注意短期/长期借款的分类'],
    relatedTags: ['融资'],
  },
  {
    icon: '📦',
    title: '采购业务',
    subtitle: '采购 · 应付',
    color: '#e6a23c',
    description: '企业采购原材料、商品或服务，涉及增值税进项税额的处理。月末如有未到票的采购需做暂估入库。',
    entries: [
      { subject: '原材料', debit: 100000 },
      { subject: '应交税费—应交增值税（进项税额）', debit: 13000 },
      { subject: '应付账款', credit: 113000 },
    ],
    tips: ['增值税进项税可抵扣，不计入采购成本', '暂估入库：月末货到票未到时，按暂估金额入账', '次月初红字冲回暂估'],
    relatedTags: ['采购'],
  },
  {
    icon: '🏭',
    title: '生产与成本核算',
    subtitle: '成本核算',
    color: '#67c23a',
    description: '制造业企业的核心环节。将原材料投入生产，通过人工和制造费用加工成产成品。月末需将制造费用分配计入产品成本。',
    entries: [
      { subject: '生产成本—直接材料', debit: 80000 },
      { subject: '原材料', credit: 80000 },
      { subject: '库存商品', debit: 120000 },
      { subject: '生产成本', credit: 120000 },
    ],
    tips: ['制造费用月末需按合理标准分配计入各产品成本', '完工产品与在产品之间需分配成本', '销售时结转销售成本：借主营业务成本，贷库存商品'],
    relatedTags: ['成本核算'],
  },
  {
    icon: '💼',
    title: '销售业务',
    subtitle: '销售 · 应收',
    color: '#f56c6c',
    description: '企业销售商品或提供服务，确认收入和应收账款。涉及增值税销项税额的处理。可能产生销售折扣和折让。',
    entries: [
      { subject: '应收账款', debit: 226000 },
      { subject: '主营业务收入', credit: 200000 },
      { subject: '应交税费—应交增值税（销项税额）', credit: 26000 },
      { subject: '主营业务成本', debit: 120000 },
      { subject: '库存商品', credit: 120000 },
    ],
    tips: ['收入确认遵循"五步法"模型', '注意增值税销项税与进项税的匹配', '应收账款需定期计提坏账准备'],
    relatedTags: ['销售'],
  },
  {
    icon: '💳',
    title: '日常费用与资产管理',
    subtitle: '费用 · 资产',
    color: '#9b59b6',
    description: '企业日常运营中发生的各类费用（办公费、差旅费、工资社保等）和资产管理（固定资产折旧、无形资产摊销、存货盘点等）。',
    entries: [
      { subject: '管理费用', debit: 50000 },
      { subject: '应付职工薪酬', credit: 50000 },
      { subject: '管理费用—折旧费', debit: 10000 },
      { subject: '累计折旧', credit: 10000 },
    ],
    tips: ['工资需先计提再发放，涉及社保和个税代扣', '固定资产折旧方法有直线法/双倍余额递减法/年数总和法', '每月末需计提坏账准备和资产减值准备'],
    relatedTags: ['费用', '工资社保', '资产'],
  },
  {
    icon: '🧾',
    title: '税费核算',
    subtitle: '税费',
    color: '#e74c3c',
    description: '企业需按期申报缴纳各项税费，包括增值税、企业所得税、城建税、教育费附加等。每季度末计提所得税。',
    entries: [
      { subject: '所得税费用', debit: 25000 },
      { subject: '应交税费—应交所得税', credit: 25000 },
    ],
    tips: ['增值税=销项-进项，按月/季申报', '企业所得税按季预缴，年终汇算清缴', '注意递延所得税资产/负债的确认'],
    relatedTags: ['税费'],
  },
  {
    icon: '🔄',
    title: '期末结转与对账',
    subtitle: '期末',
    color: '#1abc9c',
    description: '月末将所有损益类科目余额结转至"本年利润"，计算当月盈亏。年末将本年利润分配至盈余公积和未分配利润。',
    entries: [
      { subject: '主营业务收入', debit: 200000 },
      { subject: '本年利润', credit: 200000 },
      { subject: '本年利润', debit: 150000 },
      { subject: '主营业务成本', credit: 120000 },
      { subject: '管理费用', credit: 30000 },
    ],
    tips: ['损益结转后，损益类科目余额为零', '年末利润分配顺序：弥补亏损→提取盈余公积→分配股利', '出纳需每月进行银行对账，编制余额调节表'],
    relatedTags: ['期末', '出纳'],
  },
  {
    icon: '📋',
    title: '财务报表编制',
    subtitle: '报表',
    color: '#2c3e50',
    description: '根据总账和明细账编制三大财务报表：资产负债表反映企业财务状况，利润表反映经营成果，现金流量表反映现金流动情况。',
    entries: [
      { subject: '（资产负债表）', debit: 0 },
      { subject: '资产 = 负债 + 所有者权益', credit: 0 },
    ],
    tips: ['资产负债表以"资产=负债+所有者权益"为编制基础', '利润表采用"收入-费用=利润"的多步式结构', '现金流量表区分经营/投资/筹资三类活动'],
    relatedTags: [],
  },
]
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
.page-header { margin-bottom: 16px; }
.page-title { font-size: 22px; color: #303133; }

.flow-intro {
  color: #909399;
  font-size: 14px;
  margin-bottom: 24px;
  padding: 10px 14px;
  background: #f8f9fb;
  border-radius: 6px;
}

.flow-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.flow-node {
  cursor: pointer;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.flow-card {
  background: #fff;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.25s ease;
  position: relative;
}
.flow-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}
.flow-card.is-active {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  background: #f8f9ff;
}
.flow-active-indicator {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: #409eff;
  background: #ecf5ff;
  padding: 1px 10px;
  border-radius: 8px;
  white-space: nowrap;
}

.flow-icon {
  font-size: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  color: #fff;
}
.flow-title {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
}
.flow-sub {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
}

.flow-arrow {
  color: #d0d0d0;
  font-size: 20px;
  padding: 6px 0;
  line-height: 1;
}

/* 详情展开 */
.flow-detail {
  width: 100%;
  max-width: 580px;
  margin: 12px auto 0;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-left: 4px solid #409eff;
  border-radius: 8px;
  padding: 16px 20px;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}
.detail-icon { font-size: 22px; }
.detail-title { font-size: 16px; font-weight: 700; color: #303133; flex: 1; }

.detail-section { margin-bottom: 14px; }
.detail-section-title {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 6px;
}
.detail-text {
  font-size: 13px;
  color: #303133;
  line-height: 1.7;
}
.detail-entries {
  background: #f8f9fb;
  border-radius: 6px;
  padding: 10px 14px;
}
.detail-entry {
  font-family: monospace;
  font-size: 13px;
  padding: 3px 0;
}
.de-bit { color: #409eff; font-weight: 600; display: block; }
.cr-edit { color: #e6a23c; font-weight: 600; display: block; }

.detail-tips {
  font-size: 13px;
  color: #606266;
  line-height: 1.7;
}
.detail-tip { padding: 1px 0; }

.detail-tags { display: flex; flex-wrap: wrap; gap: 2px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
