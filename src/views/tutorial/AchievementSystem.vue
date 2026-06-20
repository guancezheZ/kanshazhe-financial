<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">🏅 成就 & 声望</h2>
      <span class="page-subtitle">完成任务获取XP，解锁成就徽章</span>
    </div>

    <!-- 等级卡片 -->
    <div class="level-card">
      <div class="level-icon">{{ levelInfo.icon }}</div>
      <div class="level-body">
        <div class="level-title-row">
          <span class="level-rank">{{ levelInfo.title }}</span>
          <span class="level-num">Lv.{{ levelInfo.level }}</span>
          <span class="level-xp">（{{ levelInfo.totalXp }} XP）</span>
        </div>
        <div v-if="!levelInfo.isMaxLevel" class="level-next">
          下一级：{{ levelInfo.nextIcon }} {{ levelInfo.nextTitle }}
        </div>
        <div class="level-bar">
          <el-progress
            :percentage="Math.min(100, Math.round((levelInfo.xpProgress / levelInfo.xpToNext) * 100))"
            :stroke-width="8"
            :color="levelBarColor"
            :format="() => levelInfo.xpProgress + ' / ' + levelInfo.xpToNext + ' XP'"
          />
        </div>
      </div>
    </div>

    <div class="stats-summary">
      <div class="stat-card">
        <span class="stat-num">{{ unlockedCount }}</span>
        <span class="stat-label">已解锁</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ totalCount }}</span>
        <span class="stat-label">总徽章</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ doneCount }}</span>
        <span class="stat-label">完成任务</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ progressPercent }}%</span>
        <span class="stat-label">收集进度</span>
      </div>
    </div>

    <!-- 分组展示成就 -->
    <div v-for="group in groups" :key="group.key" class="ach-group">
      <div class="ach-group-header">
        <span class="ach-group-icon">{{ group.icon }}</span>
        <span class="ach-group-title">{{ group.title }}</span>
        <span class="ach-group-count">（{{ group.done }}/{{ group.list.length }}）</span>
      </div>
      <div class="badge-grid">
        <div
          v-for="badge in group.list" :key="badge.id"
          class="badge-card"
          :class="{ unlocked: badge.unlocked, locked: !badge.unlocked }"
          @click="showBadgeDetail(badge)"
        >
          <div class="badge-icon">{{ badge.unlocked ? badge.icon : '🔒' }}</div>
          <div class="badge-name">{{ badge.name }}</div>
          <div class="badge-condition">{{ badge.condition }}</div>
          <div v-if="badge.xpReward" class="badge-xp">+{{ badge.xpReward }} XP</div>
          <div v-if="badge.unlocked" class="badge-check">✓</div>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <Teleport to="body">
      <el-dialog v-model="detailVisible" :title="detailBadge?.unlocked ? '🏅 ' + detailBadge?.name : '🔒 未解锁'" width="420" :close-on-click-modal="false">
        <div v-if="detailBadge" style="text-align:center;padding:10px 0">
          <div style="font-size:60px;margin-bottom:10px">{{ detailBadge.unlocked ? detailBadge.icon : '🔒' }}</div>
          <div style="font-size:18px;font-weight:700;color:#303133;margin-bottom:4px">{{ detailBadge.name }}</div>
          <div style="font-size:13px;color:#909399;margin-bottom:8px">{{ detailBadge.condition }}</div>
          <div v-if="detailBadge.unlocked" style="font-size:12px;color:#67c23a;background:#f0f9eb;padding:6px 12px;border-radius:6px;display:inline-block">
            ✅ 已于 {{ detailBadge.unlockDate }} 解锁
          </div>
          <div v-else style="font-size:12px;color:#e6a23c;background:#fdf6ec;padding:6px 12px;border-radius:6px;display:inline-block">
            ⏳ 尚未解锁
          </div>
          <div v-if="detailBadge.xpReward" style="margin-top:10px;font-size:14px;color:#e6a23c;font-weight:600">
            ✨ 解锁奖励：+{{ detailBadge.xpReward }} XP
          </div>
          <div style="margin-top:14px;font-size:13px;color:#606266;line-height:1.7;text-align:left;padding:0 10px">
            {{ detailBadge.description }}
          </div>
        </div>
        <template #footer>
          <el-button type="primary" @click="detailVisible = false">知道了</el-button>
        </template>
      </el-dialog>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores/store.js'
import { ACHIEVEMENTS, ACHIEVEMENT_GROUPS, calcLevel, loadAchievements } from '@/data/xp-system.js'

const store = useStore()

const detailVisible = ref(false)
const detailBadge = ref(null)

// 从store获取成就状态+等级
const achievements = ref([])
const levelInfo = computed(() => {
  try { return store.getLevelInfo() }
  catch { return calcLevel(0) }
})

const unlockedCount = computed(() => achievements.value.filter(a => a.unlocked).length)
const totalCount = computed(() => achievements.value.length)
const progressPercent = computed(() => Math.round(unlockedCount.value / totalCount.value * 100))

// 任务完成数
const doneCount = computed(() => {
  try { return store.getXPData().completedTasks.length }
  catch { return 0 }
})

const levelBarColor = computed(() => {
  const lv = levelInfo.value.level
  if (lv >= 11) return '#e6a23c'
  if (lv >= 8) return '#409eff'
  if (lv >= 5) return '#67c23a'
  return '#909399'
})

// 按组分组的成就
const groups = computed(() => {
  const map = {}
  for (const a of achievements.value) {
    const g = a.group || 'other'
    if (!map[g]) {
      const gi = a._groupInfo || { title: '其他', icon: '📦' }
      map[g] = { key: g, title: gi.title, icon: gi.icon, list: [], done: 0 }
    }
    map[g].list.push(a)
    if (a.unlocked) map[g].done++
  }
  return Object.values(map)
})

onMounted(() => {
  loadAchievementList()
})

function loadAchievementList() {
  const achData = loadAchievements()
  achievements.value = ACHIEVEMENTS.map(a => {
    const isUnlocked = achData[a.id]?.unlocked || false
    return {
      id: a.id,
      icon: a.icon,
      name: a.title,
      condition: a.description,
      description: a.description,
      group: a.group,
      xpReward: a.xpReward,
      unlocked: isUnlocked,
      unlockDate: achData[a.id]?.unlockedAt
        ? achData[a.id].unlockedAt.slice(0, 10)
        : null,
      _groupInfo: ACHIEVEMENT_GROUPS[a.group] || { title: '', icon: '' },
    }
  })
}

function showBadgeDetail(ach) {
  detailBadge.value = ach
  detailVisible.value = true
}
</script>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
}
.page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.page-title { font-size: 22px; color: #303133; margin: 0; }
.page-subtitle { font-size: 13px; color: #909399; }

/* 等级卡片 */
.level-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f0f5ff, #e6f0ff);
  border: 1px solid #d6e4ff;
  border-radius: 12px;
  margin-bottom: 16px;
}
.level-icon { font-size: 40px; line-height: 1; flex-shrink: 0; }
.level-body { flex: 1; min-width: 0; }
.level-title-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 2px;
}
.level-rank { font-size: 20px; font-weight: 700; color: #303133; }
.level-num { font-size: 13px; font-weight: 600; color: #606266; }
.level-xp { font-size: 12px; color: #909399; }
.level-next { font-size: 11px; color: #909399; margin-bottom: 6px; }
.level-bar { max-width: 400px; }

.stats-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}
.stat-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
}
.stat-num {
  display: block;
  font-size: 26px;
  font-weight: 700;
  color: #409eff;
  line-height: 1.2;
}
.stat-label {
  font-size: 12px;
  color: #909399;
}

/* 分组 */
.ach-group { margin-bottom: 20px; }
.ach-group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #f0f0f0;
}
.ach-group-icon { font-size: 18px; }
.ach-group-title { font-size: 15px; font-weight: 600; color: #303133; }
.ach-group-count { font-size: 12px; color: #909399; }

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
}
.badge-card {
  background: #fff;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  padding: 14px 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.badge-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.badge-card.unlocked { border-color: #67c23a; background: #f6ffed; }
.badge-card.locked { opacity: 0.6; }
.badge-icon { font-size: 32px; margin-bottom: 4px; line-height: 1.2; }
.badge-name { font-size: 13px; font-weight: 600; color: #303133; margin-bottom: 2px; }
.badge-condition { font-size: 10px; color: #909399; line-height: 1.3; }
.badge-xp { font-size: 10px; color: #e6a23c; font-weight: 600; margin-top: 2px; }
.badge-check { position: absolute; top: 4px; right: 8px; color: #67c23a; font-size: 16px; font-weight: 700; }
</style>
