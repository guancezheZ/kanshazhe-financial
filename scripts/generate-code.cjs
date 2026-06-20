/**
 * 激活码生成工具
 *
 * 用法：生成任意数量的激活码，用户激活时自动绑定设备
 *   node scripts/generate-code.cjs [个数]
 *
 * 示例：
 *   node scripts/generate-code.cjs       # 生成1个
 *   node scripts/generate-code.cjs 5      # 生成5个
 *   node scripts/generate-code.cjs 10     # 生成10个
 */

const count = Math.max(1, parseInt(process.argv[2]) || 1)

const MASTER_KEY = '6125-9D04-84E5-007F'

function generateCode(seed) {
  let s = seed
  const chars = []
  for (let i = 0; i < 12; i++) {
    s = (s * 1103515245 + 12345) & 0x7FFFFFFF
    chars.push((s % 16).toString(16).toUpperCase())
  }
  let checksum = 0
  for (let i = 0; i < 12; i++) checksum ^= parseInt(chars[i], 16)
  chars.push(((checksum >> 8) & 0xF).toString(16).toUpperCase())
  chars.push(((checksum >> 4) & 0xF).toString(16).toUpperCase())
  chars.push((checksum & 0xF).toString(16).toUpperCase())
  chars.push(Math.floor(Math.random() * 16).toString(16).toUpperCase())
  return chars.slice(0,4).join('')+'-'+chars.slice(4,8).join('')+'-'+chars.slice(8,12).join('')+'-'+chars.slice(12,16).join('')
}

console.log('═══════════════════════════════════════')
console.log('  观测者财务模拟系统 · 激活码生成器')
console.log('═══════════════════════════════════════')
console.log('')
console.log(`  主密钥（通用）：${MASTER_KEY}`)
console.log('  （主密钥不限设备，激活码一机一码）')
console.log('')

const codes = []
for (let i = 0; i < count; i++) {
  const seed = Math.floor(Math.random() * 999999) + Date.now() + i
  codes.push(generateCode(seed))
}

codes.forEach((c, i) => {
  console.log(`  [${i + 1}] ${c}`)
})

console.log('')
console.log('═══════════════════════════════════════')
console.log('  这些激活码还没有绑定设备。')
console.log('  用户在激活界面输入后自动绑定到他的电脑。')
console.log('  已绑定的激活码其他人无法使用。')
