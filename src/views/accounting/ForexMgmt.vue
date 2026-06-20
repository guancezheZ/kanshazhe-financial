<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">外币核算</h2>
    <div class="page-actions">
      <el-button :loading="loading" @click="fetchLatestRates">获取最新汇率</el-button>
    </div>
    </div>
    <el-card shadow="never">
      <el-tabs v-model="tab">
        <el-tab-pane label="币种汇率" name="rates">
          <el-table :data="currencies" border stripe size="small" empty-text="默认仅人民币">
            <el-table-column label="币种" prop="code" width="80" />
            <el-table-column label="名称" prop="name" min-width="120" />
            <el-table-column label="汇率" width="120" align="right">
              <template #default="{ row }">{{ row.rate || 1 }}</template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template #default="{ row }">
                <el-button v-if="row.code !== 'CNY'" text size="small" @click="editRow(row)">修改汇率</el-button>
                <el-tag v-else size="small" type="info">本位币</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="期末调汇" name="adjust">
          <el-empty description="期末调汇功能：按最新汇率重估外币科目余额，生成汇兑损益凭证。" />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog v-model="showEdit" title="修改汇率" width="400">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="币种">{{ editForm.code }}</el-form-item>
        <el-form-item label="汇率"><el-input-number v-model="editForm.rate" :precision="4" :min="0.0001" style="width:100%" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEdit=false">取消</el-button>
        <el-button type="primary" @click="saveRate">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const tab = ref('rates')
const loading = ref(false)
const showEdit = ref(false)
const editForm = ref({ code: '', name: '', rate: 1 })
const currencies = ref([])

function loadCurrencies() {
  try {
    currencies.value = JSON.parse(localStorage.getItem('jd_currencies') || '[]')
  } catch { currencies.value = [] }
  if (currencies.value.length === 0) {
    currencies.value = [
      { code: 'CNY', name: '人民币', rate: 1 },
      { code: 'USD', name: '美元', rate: 7.25 },
      { code: 'EUR', name: '欧元', rate: 7.85 },
      { code: 'GBP', name: '英镑', rate: 9.20 },
      { code: 'JPY', name: '日元', rate: 0.048 },
      { code: 'HKD', name: '港币', rate: 0.93 },
      { code: 'KRW', name: '韩元', rate: 0.0053 },
    ]
    saveCurrencies()
  }
}

function saveCurrencies() {
  localStorage.setItem('jd_currencies', JSON.stringify(currencies.value))
}

function editRow(row) {
  editForm.value = { code: row.code, name: row.name, rate: row.rate }
  showEdit.value = true
}

function saveRate() {
  const idx = currencies.value.findIndex(c => c.code === editForm.value.code)
  if (idx >= 0) {
    currencies.value[idx].rate = editForm.value.rate
    saveCurrencies()
    ElMessage.success('汇率已更新')
    showEdit.value = false
  }
}

async function fetchLatestRates() {
  loading.value = true
  try {
    const resp = await fetch('https://open.er-api.com/v6/latest/CNY')
    if (!resp.ok) throw new Error('Failed to fetch')
    const data = await resp.json()
    if (data.rates) {
      const updates = { USD: 0, EUR: 0, GBP: 0, JPY: 0, HKD: 0, KRW: 0 }
      updates.USD = data.rates.USD || 0
      updates.EUR = data.rates.EUR || 0
      updates.GBP = data.rates.GBP || 0
      updates.JPY = data.rates.JPY || 0
      updates.HKD = data.rates.HKD || 0
      updates.KRW = data.rates.KRW || 0
      for (const c of currencies.value) {
        if (updates[c.code] !== undefined && updates[c.code] !== 0) {
          c.rate = c.code === 'CNY' ? 1 : parseFloat((1 / updates[c.code]).toFixed(4))
        }
      }
      saveCurrencies()
      ElMessage.success('汇率已更新')
    }
  } catch (e) {
    ElMessage.warning('获取失败，请稍后重试或手动输入汇率')
  }
  loading.value = false
}

onMounted(loadCurrencies)
</script>
<style scoped>
.page-header { margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
</style>
