<template>
  <div class="voucher-scroll">
    <div class="voucher-wrapper">
      <!-- 纸张纹理背景 -->
      <div class="voucher-paper" :class="'voucher-' + doc.type">
        <!-- ===== 1. 增值税发票 ===== -->
        <template v-if="doc.type === 'invoice'">
          <div v-html="redStamp(doc.stampText || '国家税务总局\n发票专用章', 85, 9, doc.stampId, 6)" class="stamp-overlay"></div>
          <div class="inv-top">
            <span class="inv-title">{{ doc.region || '××' }}增值税{{ doc.invoiceType || '专用' }}发票</span>
            <span class="inv-no">{{ doc.copy || '发票联' }} No {{ doc.invoiceNo || '12345678' }}</span>
          </div>
          <div class="inv-copy">{{ doc.copy || '发票联' }}</div>
          <div class="inv-date">开票日期：{{ doc.date }}</div>
          <div class="inv-section">
            <div class="inv-section-title">购 货 单 位</div>
            <div class="inv-field"><strong>名称：</strong>{{ doc.buyer }}</div>
            <div class="inv-field"><strong>纳税人识别号：</strong>{{ doc.buyerTaxId || '91440101MA5XXXXXXXX' }}</div>
            <div class="inv-field"><strong>地址、电话：</strong>{{ doc.buyerAddr || 'XX市XX区XX路XX号 020-XXXXXXXX' }}</div>
          </div>
          <table class="inv-table">
            <thead><tr><th>项目名称</th><th>单位</th><th>数量</th><th>单价</th><th>金额</th><th>税率</th><th>税额</th></tr></thead>
            <tbody>
              <tr v-for="item in (doc.lineItems || [])" :key="item.name">
                <td style="text-align:center">{{ item.name }}</td>
                <td style="text-align:center">{{ item.unit || '件' }}</td>
                <td style="text-align:right">{{ item.qty }}</td>
                <td style="text-align:right">{{ fmt(item.price) }}</td>
                <td style="text-align:right">{{ fmt(item.amount) }}</td>
                <td style="text-align:center">{{ item.taxRate || '13%' }}</td>
                <td style="text-align:right">{{ fmt(item.tax || 0) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="inv-total">
            <div class="inv-total-amount">价税合计：<strong>¥{{ fmt(doc.totalAmount) }}</strong></div>
            <div class="inv-total-cn">（大写）{{ cnNumber(doc.totalAmount) }}</div>
          </div>
          <div class="inv-section">
            <div class="inv-section-title">销 货 单 位</div>
            <div class="inv-field"><strong>名称：</strong>{{ doc.seller }}</div>
            <div class="inv-field"><strong>纳税人识别号：</strong>{{ doc.sellerTaxId || '91440101MA3XXXXXXXX' }}</div>
          </div>
          <div class="inv-footer">
            <span>收款人：{{ doc.payee || '李四' }}</span>
            <span>复核：{{ doc.reviewer || '王五' }}</span>
            <span>开票人：{{ doc.drawer || '赵六' }}</span>
            <span>销货单位（章）</span>
          </div>
        </template>

        <!-- ===== 2. 银行电子回单 ===== -->
        <template v-else-if="doc.type === 'bank'">
          <div v-html="squareStamp('电子回单专用章', 15, 15)" class="stamp-overlay"></div>
          <div class="bank-header">
            <span class="bank-header-title">🏦 中国工商银行 电子回单</span>
            <span class="bank-header-sub">电子凭证 与原件等效</span>
          </div>
          <div class="bank-ref">回单编号：{{ doc.refNo || 'HD' + (doc.date || '').replace(/-/g, '') + 'XXXX' }}</div>
          <table class="bank-table">
            <tr><td class="bk-label">交易日期</td><td>{{ doc.date }}</td><td class="bk-label">指令序号</td><td>{{ doc.instructionNo || 'HQH' + (doc.date || '').replace(/-/g, '') + '001' }}</td></tr>
            <tr><td class="bk-label">付款人</td><td colspan="3">{{ doc.payer || '本公司' }}</td></tr>
            <tr><td class="bk-label">付款账号</td><td>{{ doc.payerAccount || '6222 0200 **** 1234' }}</td><td class="bk-label">收款人</td><td>{{ doc.payeeName || '' }}</td></tr>
            <tr><td class="bk-label">收款账号</td><td colspan="3">{{ doc.payeeAccount || '6222 0200 **** 5678' }}</td></tr>
            <tr><td class="bk-label">金额（小写）</td><td colspan="3" class="bk-amount">¥{{ fmt(doc.totalAmount) }}</td></tr>
            <tr><td class="bk-label">金额（大写）</td><td colspan="3">{{ cnNumber(doc.totalAmount) }}</td></tr>
            <tr><td class="bk-label">摘要</td><td colspan="3">{{ doc.content || '' }}</td></tr>
            <tr v-if="doc.remark"><td class="bk-label">附言</td><td colspan="3">{{ doc.remark }}</td></tr>
          </table>
          <div class="bank-footer">本回单仅表明您的账户有金融性交易，不能作为到账凭证。如有疑问请致电95588。</div>
          <div class="bank-stamp">中国工商银行电子回单专用章</div>
        </template>

        <!-- ===== 3. 收据/缴费单 ===== -->
        <template v-else-if="doc.type === 'receipt'">
          <div v-if="doc.stampText" v-html="squareStamp(doc.stampText, 15, 15)" class="stamp-overlay"></div>
          <div class="rct-title">{{ doc.docTitle || '收  据' }}</div>
          <div class="rct-body">
            <div class="rct-row"><span class="rct-label">交款单位：</span><span>{{ doc.payer || '本公司' }}</span></div>
            <div class="rct-row"><span class="rct-label">收款方式：</span><span>{{ doc.paymentMethod || '银行转账' }}</span></div>
            <div class="rct-row"><span class="rct-label">日期：</span><span>{{ doc.date }}</span></div>
            <div class="rct-row" v-if="doc.refNo"><span class="rct-label">编号：</span><span>{{ doc.refNo }}</span></div>
            <div class="rct-row" v-if="doc.content"><span class="rct-label">摘要：</span><span>{{ doc.content }}</span></div>
            <table class="rct-table">
              <thead><tr><th>项目</th><th>数量</th><th>单价</th><th>金额</th></tr></thead>
              <tbody>
                <tr v-for="item in (doc.items || [{ name: doc.itemName || '费用', qty: 1, price: doc.totalAmount, amount: doc.totalAmount }])" :key="item.name">
                  <td style="text-align:left">{{ item.name }}</td>
                  <td style="text-align:center">{{ item.qty }}</td>
                  <td style="text-align:right">{{ fmt(item.price) }}</td>
                  <td style="text-align:right">{{ fmt(item.amount) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="rct-total">
              ¥{{ fmt(doc.totalAmount) }}
              <div class="rct-total-cn">（大写）{{ cnNumber(doc.totalAmount) }}</div>
            </div>
            <div class="rct-footer">
              <span>收款人：{{ doc.receiver || '李四' }}</span>
              <span>交款人：{{ doc.payerPerson || '张三' }}</span>
              <span>收款单位（章）</span>
            </div>
          </div>
        </template>

        <!-- ===== 4. 文档/计算表/合同（智能格式化） ===== -->
        <template v-else>
          <div v-if="doc.stampText" v-html="squareStamp(doc.stampText, 15, 15)" class="stamp-overlay"></div>
          <div class="doc-title-bar">{{ doc.docTitle || '原始凭证' }}</div>
          <div class="doc-body">
            <!-- 合同类 -->
            <template v-if="isContract(doc.docTitle)">
              <div class="doc-contract-header">{{ doc.docTitle }}</div>
              <div class="doc-contract-seal" v-if="doc.signature">签约方：{{ doc.signature }}</div>
              <div class="doc-contract-body">
                <pre class="doc-pre doc-pre-contract">{{ doc.content || '' }}</pre>
              </div>
              <div class="doc-contract-footer">
                <div class="doc-signature">签约日期：{{ doc.date || '' }}</div>
              </div>
            </template>

            <!-- 盘点表/对账表 -->
            <template v-else-if="isInventory(doc.docTitle)">
              <div class="doc-inv-header">{{ doc.docTitle }}</div>
              <div class="doc-inv-body">
                <table class="doc-inv-table">
                  <tbody>
                    <tr v-for="line in parseLines(doc.content)" :key="line">
                      <td>{{ line }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="doc.signature" class="doc-signature">{{ doc.signature }}</div>
            </template>

            <!-- 成本/折旧/税费计算表 -->
            <template v-else-if="isCalculation(doc.docTitle)">
              <div class="doc-calc-header">{{ doc.docTitle }}</div>
              <div class="doc-calc-body">
                <div class="doc-calc-formula" v-for="(line, li) in parseLines(doc.content)" :key="li">
                  <template v-if="line.includes('＝') || line.includes('=') || line.includes('：')">
                    <span class="doc-calc-line">{{ line }}</span>
                  </template>
                  <template v-else>
                    <span class="doc-calc-label">{{ line }}</span>
                  </template>
                </div>
              </div>
              <div v-if="doc.signature" class="doc-signature">{{ doc.signature }}</div>
            </template>

            <!-- 入库单/出库单 -->
            <template v-else-if="isWarehouseDoc(doc.docTitle)">
              <div class="doc-wh-header">{{ doc.docTitle }}</div>
              <div class="doc-wh-body">
                <div class="doc-wh-info" v-if="doc.date">日期：{{ doc.date }}</div>
                <div class="doc-wh-content">
                  <pre class="doc-pre">{{ doc.content || '' }}</pre>
                </div>
                <div v-if="doc.signature" class="doc-wh-signature">{{ doc.signature }}</div>
              </div>
            </template>

            <!-- 日记账/对账单 -->
            <template v-else-if="isLedger(doc.docTitle)">
              <div class="doc-ledger-header">{{ doc.docTitle }}</div>
              <div class="doc-ledger-body">
                <div class="doc-ledger-line" v-for="(line, li) in parseLines(doc.content)" :key="li">
                  <template v-if="line.startsWith('━━') || line.startsWith('———')">
                    <div class="doc-ledger-sep"></div>
                  </template>
                  <template v-else-if="line.includes('：')">
                    <span class="doc-ledger-label">{{ line.split('：')[0] }}：</span>
                    <span class="doc-ledger-value">{{ line.split('：').slice(1).join('：') }}</span>
                  </template>
                  <template v-else>
                    <span>{{ line }}</span>
                  </template>
                </div>
              </div>
              <div v-if="doc.signature" class="doc-signature">{{ doc.signature }}</div>
            </template>

            <!-- 报销单 -->
            <template v-else-if="isExpenseReport(doc.docTitle)">
              <div class="doc-exp-header">{{ doc.docTitle }}</div>
              <div class="doc-exp-body">
                <pre class="doc-pre">{{ doc.content || '' }}</pre>
              </div>
              <div class="doc-exp-footer">
                <span v-if="doc.signature">{{ doc.signature }}</span>
                <span v-if="doc.date">{{ doc.date }}</span>
              </div>
            </template>

            <!-- 兜底：通用文档 -->
            <template v-else>
              <pre class="doc-pre">{{ doc.content || '' }}</pre>
              <div class="doc-signature" v-if="doc.signature">{{ doc.signature }}</div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatAmount } from '@/utils/accounting.js'

const props = defineProps({
  doc: { type: Object, required: true },
})

// 用于 SVG stamp 的唯一 ID 计数器
let stampIdCounter = 0

function fmt(v) {
  if (v === undefined || v === null) return '0.00'
  return formatAmount(v)
}

function cnNumber(n) {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿']
  const num = Math.round(Math.abs(n) * 100) / 100
  if (num === 0) return '零元整'
  const intPart = Math.floor(num)
  const decPart = Math.round((num - intPart) * 100)
  let result = ''
  let unitIdx = 0
  let temp = intPart
  while (temp > 0) {
    let section = temp % 10000
    let secStr = ''
    let needZero = false
    for (let i = 0; i < 4; i++) {
      const digit = section % 10
      if (digit === 0) {
        if (i > 0 && secStr.length > 0) needZero = true
      } else {
        if (needZero) { secStr = '零' + secStr; needZero = false }
        secStr = digits[digit] + units[i] + secStr
      }
      section = Math.floor(section / 10)
    }
    if (secStr) secStr += bigUnits[unitIdx]
    else if (temp >= 1000 && unitIdx > 0 && result) secStr = '零'
    result = secStr + result
    temp = Math.floor(temp / 10000)
    unitIdx++
  }
  if (intPart > 0) result += '元'
  if (decPart === 0) {
    result += '整'
  } else {
    if (decPart >= 10) result += digits[Math.floor(decPart / 10)] + '角'
    if (decPart % 10 > 0) result += digits[decPart % 10] + '分'
  }
  return result
}

function redStamp(text, size = 80, fontSize = 10, innerText, innerFontSize = 8) {
  stampIdCounter++
  const uid = 'stamp-path-' + stampIdCounter
  const half = size / 2
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="stamp-red">
    <circle cx="${half}" cy="${half}" r="${half - 2}" fill="none" stroke="#c0362d" stroke-width="2.5" opacity="0.85"/>
    <circle cx="${half}" cy="${half}" r="${half - 6}" fill="none" stroke="#c0362d" stroke-width="1" opacity="0.5"/>
    <text x="${half}" y="${half - 4}" text-anchor="middle" dominant-baseline="central" font-family="SimSun, serif" font-size="${fontSize}" fill="#c0362d" font-weight="bold" opacity="0.85">
      <textPath href="#${uid}">${text}</textPath>
    </text>
    ${innerText ? `<text x="${half}" y="${half + 12}" text-anchor="middle" font-family="SimSun, serif" font-size="${innerFontSize}" fill="#c0362d" font-weight="bold" opacity="0.85">${innerText}</text>` : ''}
    <defs><path id="${uid}" d="M ${half - 18} ${half} A 18 18 0 1 1 ${half + 18} ${half} A 18 18 0 1 1 ${half - 18} ${half}"/></defs>
  </svg>`
}

function squareStamp(text, right = 20, top = 20) {
  const color = '#c0362d'
  return `<div class="stamp-square" style="right:${right}px;top:${top}px;border:2px solid ${color};padding:4px 10px;color:${color};font-size:11px;font-weight:bold;font-family:SimSun,serif;opacity:0.8;transform:rotate(-5deg);mix-blend-mode:multiply;text-align:center;background:rgba(255,255,255,0.3)">
    ${text.replace(/\n/g, '<br>')}
  </div>`
}

// ─── 文档类型检测 ───

function isContract(title) {
  if (!title) return false
  return /合同/.test(title)
}

function isInventory(title) {
  if (!title) return false
  return /盘点|库存表|对账表/.test(title)
}

function isCalculation(title) {
  if (!title) return false
  return /计算表|折旧|摊销|成本|税费计提/.test(title) && !isContract(title)
}

function isWarehouseDoc(title) {
  if (!title) return false
  return /入库|出库|收料/.test(title)
}

function isLedger(title) {
  if (!title) return false
  return /日记账|对账|余额调节/.test(title) || /资金日报/.test(title)
}

function isExpenseReport(title) {
  if (!title) return false
  return /报销/.test(title)
}

function parseLines(content) {
  if (!content) return []
  return content.split('\n').filter(l => l.trim())
}
</script>

<style scoped>
/* ─── 容器 ─── */
.voucher-scroll {
  width: 100%;
  overflow-x: auto;
  padding: 12px 0;
}
.voucher-wrapper {
  display: flex;
  justify-content: center;
  min-width: min-content;
}

/* ─── 纸张基础 ─── */
.voucher-paper {
  background: #fefcf5;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(139,119,90,0.03) 28px, rgba(139,119,90,0.03) 29px),
    radial-gradient(ellipse at 20% 50%, rgba(139,119,90,0.025) 0%, transparent 70%),
    radial-gradient(ellipse at 80% 50%, rgba(139,119,90,0.015) 0%, transparent 70%);
  box-shadow:
    0 2px 24px rgba(0,0,0,0.12),
    0 0 0 1px rgba(0,0,0,0.06),
    inset 0 0 60px rgba(139,119,90,0.04);
  position: relative;
  overflow: hidden;
  font-family: 'Noto Serif SC', 'SimSun', 'STSong', serif;
}
/* 纸张暗角 */
.voucher-paper::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.02) 100%);
  pointer-events: none; z-index: 1;
}
/* 扫描折痕 */
.voucher-paper::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(0,0,0,0.004) 28px, rgba(0,0,0,0.004) 29px);
  pointer-events: none; z-index: 1;
}
.stamp-overlay { position: absolute; z-index: 10; pointer-events: none; }
.stamp-square { position: absolute; z-index: 10; pointer-events: none; }
.stamp-red { position: absolute; z-index: 10; pointer-events: none; mix-blend-mode: multiply; }

/* ─── 增值税发票 ─── */
.voucher-invoice { width: 640px; padding: 0; }
.inv-top { display:flex; justify-content:space-between; align-items:center; padding:18px 22px 8px; border-bottom:2px solid #222; position:relative; z-index:2; }
.inv-title { font-size:17px; font-weight:900; letter-spacing:2px; }
.inv-no { font-size:12px; color:#333; }
.inv-copy { text-align:center; font-size:14px; font-weight:900; color:#c0362d; letter-spacing:6px; padding:8px 0 4px; position:relative; z-index:2; }
.inv-date { padding:4px 22px; font-size:12px; position:relative; z-index:2; }
.inv-section { border:1px solid #222; margin:6px 22px; padding:4px 8px; position:relative; z-index:2; background:rgba(255,255,255,0.3); }
.inv-section-title { font-weight:700; font-size:12px; background:#f0ebe1; margin:-4px -8px 4px; padding:3px 8px; }
.inv-field { font-size:11px; margin:2px 0; }
.inv-table { width:calc(100% - 44px); margin:4px 22px; border-collapse:collapse; position:relative; z-index:2; }
.inv-table th { background:#f0ebe1; border:1px solid #222; padding:4px 6px; font-size:11px; text-align:center; }
.inv-table td { border:1px solid #222; padding:3px 6px; font-size:11px; }
.inv-total { border:1px solid #222; margin:4px 22px; padding:6px 12px; text-align:right; position:relative; z-index:2; background:rgba(255,255,255,0.3); }
.inv-total-amount { font-size:14px; }
.inv-total-cn { font-size:11px; color:#555; margin-top:2px; }
.inv-footer { display:flex; justify-content:space-between; padding:10px 22px 18px; font-size:11px; color:#666; position:relative; z-index:2; }

/* ─── 银行电子回单 ─── */
.voucher-bank { width: 600px; padding: 0; }
.bank-header { background: linear-gradient(135deg, #a02820, #c0362d); color:#fff; padding:14px 20px; display:flex; justify-content:space-between; align-items:center; position:relative; z-index:2; }
.bank-header-title { font-size:16px; font-weight:700; }
.bank-header-sub { font-size:11px; font-weight:400; opacity:0.8; }
.bank-ref { text-align:right; padding:6px 20px; font-size:10px; color:#888; border-bottom:1px solid #ddd; position:relative; z-index:2; background:#fff; }
.bank-table { width:100%; border-collapse:collapse; position:relative; z-index:2; background:#fff; }
.bank-table td { border:1px solid #d0d0d0; padding:7px 12px; font-size:12px; }
.bk-label { background:#f5f2ed; font-weight:600; width:100px; color:#444; }
.bk-amount { font-size:16px; font-weight:700; color:#a02820; }
.bank-footer { padding:8px 20px; font-size:9px; color:#aaa; text-align:center; border-top:1px solid #eee; position:relative; z-index:2; background:#fff; }
.bank-stamp { text-align:right; padding:6px 20px 14px; font-size:11px; color:#c0362d; font-weight:700; position:relative; z-index:2; background:#fff; }

/* ─── 收据/缴费单 ─── */
.voucher-receipt { width: 520px; padding: 0; }
.rct-title { background:#a02820; color:#fff; text-align:center; padding:10px; font-size:15px; font-weight:700; letter-spacing:2px; position:relative; z-index:2; }
.rct-body { padding:16px 22px; position:relative; z-index:2; }
.rct-row { display:flex; margin:4px 0; font-size:12px; }
.rct-label { width:85px; color:#666; flex-shrink:0; }
.rct-table { width:100%; border-collapse:collapse; margin:8px 0; }
.rct-table th { background:#f0ebe1; border:1px solid #222; padding:4px 8px; font-size:11px; text-align:center; }
.rct-table td { border:1px solid #222; padding:4px 8px; font-size:11px; text-align:right; }
.rct-total { text-align:right; font-size:14px; font-weight:700; margin:8px 0; padding:6px 0; border-top:2px solid #222; }
.rct-total-cn { font-size:11px; color:#555; font-weight:400; margin-top:2px; }
.rct-footer { display:flex; justify-content:space-between; margin-top:12px; font-size:11px; color:#666; padding-top:8px; border-top:1px dashed #ccc; }

/* ─── 文档/计算表/合同（智能格式化） ─── */
.voucher-text { min-width: 480px; max-width: 640px; padding: 0; }
.doc-title-bar { background:#2c3e50; color:#fff; text-align:center; padding:10px 16px; font-size:15px; font-weight:700; letter-spacing:1px; position:relative; z-index:2; }
.doc-body { padding:16px 20px; font-family:'Noto Sans SC','Microsoft YaHei','SimHei',sans-serif; font-size:13px; line-height:2; position:relative; z-index:2; }
.doc-pre { font-family:'Noto Sans SC','Microsoft YaHei','SimHei',sans-serif; font-size:13px; line-height:1.9; white-space:pre-wrap; margin:0; }
.doc-signature { margin-top:16px; padding-top:10px; border-top:1px dashed #ccc; display:flex; justify-content:space-between; font-size:11px; color:#666; }

/* 合同样式 */
.doc-contract-header { text-align:center; font-size:16px; font-weight:700; padding:8px 0 12px; border-bottom:2px solid #2c3e50; margin-bottom:12px; color:#2c3e50; }
.doc-contract-seal { text-align:center; font-size:11px; color:#c0362d; margin-bottom:8px; font-weight:600; }
.doc-contract-body { padding:4px 0; }
.doc-pre-contract { line-height:2.2; font-size:13px; }
.doc-contract-footer { margin-top:16px; padding-top:10px; border-top:1px dashed #ccc; font-size:11px; color:#666; display:flex; justify-content:space-between; }

/* 盘点表样式 */
.doc-inv-header { text-align:center; font-size:15px; font-weight:700; padding:6px 0 10px; border-bottom:2px solid #e6a23c; margin-bottom:8px; color:#b8821a; }
.doc-inv-body { padding:0 4px; }
.doc-inv-table { width:100%; border-collapse:collapse; }
.doc-inv-table td { border:1px solid #d0d0d0; padding:6px 10px; font-size:12px; vertical-align:top; }
.doc-inv-table tr:nth-child(even) { background:#faf8f4; }

/* 成本/计算表样式 */
.doc-calc-header { text-align:center; font-size:14px; font-weight:700; padding:6px 0 10px; border-bottom:2px solid #409eff; margin-bottom:8px; color:#2c6eb0; }
.doc-calc-body { padding:4px 8px; background:#f9fafc; border-radius:4px; }
.doc-calc-formula { padding:3px 0; font-size:12px; line-height:1.8; }
.doc-calc-line { color:#303133; font-weight:500; }
.doc-calc-label { color:#909399; font-size:11px; }

/* 入库单/出库单样式 */
.doc-wh-header { text-align:center; font-size:14px; font-weight:700; padding:6px 0 10px; border-bottom:2px solid #67c23a; margin-bottom:8px; color:#529b2e; }
.doc-wh-body { padding:0 4px; }
.doc-wh-info { font-size:12px; color:#909399; margin-bottom:6px; }
.doc-wh-content { background:#f9fdf5; border:1px solid #e8f0e0; border-radius:4px; padding:8px 12px; }
.doc-wh-signature { margin-top:10px; font-size:11px; color:#666; text-align:right; }

/* 日记账/对账单样式 */
.doc-ledger-header { text-align:center; font-size:14px; font-weight:700; padding:6px 0 10px; border-bottom:2px solid #909399; margin-bottom:8px; color:#606266; font-family:'Courier New',monospace; }
.doc-ledger-body { background:#fcfcf9; border:1px solid #e8e4dd; border-radius:4px; padding:8px 12px; font-family:'Courier New',monospace; font-size:12px; }
.doc-ledger-line { padding:2px 0; line-height:1.7; }
.doc-ledger-label { color:#606266; }
.doc-ledger-value { color:#303133; font-weight:500; }
.doc-ledger-sep { border-top:1px solid #d0d0d0; margin:4px 0; }

/* 报销单样式 */
.doc-exp-header { text-align:center; font-size:14px; font-weight:700; padding:6px 0 10px; border-bottom:2px solid #f56c6c; margin-bottom:8px; color:#c0362d; }
.doc-exp-body { padding:4px 8px; }
.doc-exp-footer { margin-top:12px; padding-top:8px; border-top:1px dashed #ccc; display:flex; justify-content:space-between; font-size:11px; color:#666; }
</style>

<!-- 非scoped样式：让全局 data-theme="light" 能穿透到VoucherDisplay内部 -->
<style>
[data-theme="light"] .voucher-scroll { background: #fff !important; }
[data-theme="light"] .voucher-wrapper { background: #fff !important; }
[data-theme="light"] .voucher-paper { background: #fefcf5 !important; }
[data-theme="light"] .voucher-invoice { background: #fefcf5 !important; }
[data-theme="light"] .voucher-bank { background: #fff !important; }
[data-theme="light"] .voucher-receipt { background: #fefcf5 !important; }
[data-theme="light"] .voucher-text { background: #fff !important; }
[data-theme="light"] .doc-body { background: #fff !important; }
[data-theme="light"] .doc-pre { color: #303133 !important; background: #fff !important; }
[data-theme="light"] .doc-signature { color: #666 !important; }
[data-theme="light"] .bank-table { background: #fff !important; }
[data-theme="light"] .bank-ref { background: #fff !important; }
[data-theme="light"] .inv-section-title { background: #f0ebe1 !important; }
[data-theme="light"] .inv-table th { background: #f0ebe1 !important; }
[data-theme="light"] .doc-title-bar { background: #2c3e50 !important; color: #fff !important; }
</style>
