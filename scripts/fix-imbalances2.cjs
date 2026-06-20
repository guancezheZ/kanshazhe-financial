const fs = require('fs')

// Fix 09.js - investment property conversion entries
let c = fs.readFileSync('src/data/tutorials/months/09.js', 'utf8')
let old = `{ subjectCode: '1521', summary: '自用办公楼转出租（原值转入）', debit: 600000, credit: 0,
        explanation: '投资性房地产增加600,000元（原值）。成本模式下，自用转投资性房地产时，按固定资产原值转入投资性房地产科目。相当于重新"贴标签"——资产还是那个资产，但核算科目变了，从"固定资产"转到"投资性房地产"。' },
      { subjectCode: '1602', summary: '办公楼已提折旧转入投资性房地产', debit: 0, credit: 120000,
        explanation: '累计折旧冲减120,000元。办公楼的累计折旧同步转入投资性房地产的备抵科目。注意：这里不是新计提折旧，而是将原有的累计折旧转出。' },
      { subjectCode: '1601', summary: '办公楼原值转出（固定资产减少）', debit: 0, credit: 600000,
        explanation: '固定资产减少600,000元（原值）。办公楼从固定资产中移除，转入投资性房地产。注意：这并不意味资产"消失"了，而是核算方式发生了变化——从"自用"变成了"出租"。' }`

let fixed = `{ subjectCode: '1521', summary: '自用办公楼转出租（原值）', debit: 600000, credit: 0,
        explanation: '投资性房地产增加600,000元（原值）。成本模式下自用转出租时按固定资产原值转入投资性房地产科目。' },
      { subjectCode: '1602', summary: '转出自用办公楼已提折旧', debit: 120000, credit: 0,
        explanation: '累计折旧冲减120,000元。将办公楼原有的累计折旧从固定资产累计折旧中转出（借方转出），同步转入投资性房地产的备抵科目。' },
      { subjectCode: '1601', summary: '办公楼原值转出', debit: 0, credit: 600000,
        explanation: '固定资产减少600,000元（原值）。办公楼从固定资产中移除核算方式变化而非资产消失。' },
      { subjectCode: '1521', summary: '投资性房地产确认累计折旧', debit: 0, credit: 120000,
        explanation: '投资性房地产科目中确认累计折旧120,000元。1521科目按净值反映：原值600,000-折旧120,000=480,000元（账面净值）。' }`

c = c.replace(old, fixed)
fs.writeFileSync('src/data/tutorials/months/09.js', c)
console.log('09.js: investment property conversion fixed')

// Fix 10.js - fixed asset disposal entries
c = fs.readFileSync('src/data/tutorials/months/10.js', 'utf8')
old = `{ subjectCode: '1606', summary: '结转清理净收益', debit: 5000, credit: 0,
        explanation: '固定资产清理转出5,000元（清理贷方余额）。账面价值115,000+清理收入120,000=贷方差额5,000元。后面再做...实际上，固定资产业务单独的清理后，余额应转入资产处置损益。' }`

fixed = `{ subjectCode: '1606', summary: '结转清理净收益（关闭清理账户）', debit: 5000, credit: 0,
        explanation: '固定资产清理转出5,000元（贷方余额结平）。计算：收到价款120,000-账面价值115,000=清理净收益5,000元。固定资产清理科目余额归零。' },
      { subjectCode: '6111', summary: '确认清理净收益（资产处置损益）', debit: 0, credit: 5000,
        explanation: '投资收益/资产处置损益增加5,000元。出售固定资产产生的净收益计入营业利润（通过资产处置损益或投资收益科目），而不是营业外收入。' }`

c = c.replace(old, fixed)
fs.writeFileSync('src/data/tutorials/months/10.js', c)
console.log('10.js: fixed asset disposal fixed')
