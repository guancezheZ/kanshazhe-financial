const fs = require('fs')

// Fix 10.js non-monetary exchange entries
let c = fs.readFileSync('src/data/tutorials/months/10.js', 'utf8')
const old = `{ subjectCode: '1604', summary: '换入设备（待安装）', debit: 100000, credit: 0,
        explanation: '在建工程增加100,000元。非货币性资产交换中，换入资产的入账价值=换出资产公允价值90,000元+补价10,000元=100,000元。注意：这台设备需要安装后才能使用，先通过"在建工程"核算。交换具有商业实质，采用公允价值计量模式。' },
      { subjectCode: '222101', summary: '换入设备-进项税额', debit: 11700, credit: 0,
        explanation: '应交增值税进项税额增加11,700元。设备公允价值90,000×13%=11,700元可抵扣。' },
      { subjectCode: '6001', summary: '换出A产品视同销售', debit: 0, credit: 100000,
        explanation: '主营业务收入增加100,000元。非货币性资产交换中，换出资产视同销售处理，按公允价值确认收入。' },
      { subjectCode: '222101', summary: '换出产品-销项税额', debit: 0, credit: 13000,
        explanation: '应交增值税销项税额增加13,000元。换出产品公允价值100,000×13%=13,000元。' },
      { subjectCode: '100201', summary: '支付补价及税差', debit: 0, credit: 21700,
        explanation: '银行存款减少21,700元。包括：补价10,000元+设备增值税11,700元-产品增值税13,000元...实际支付应为补价10,000+设备进项11,700-产品销项13,000=实际支付8,700元？不对，是企业收到产品销项13,000和支付设备进项11,700+补价10,000。通常情况下，向对方支付净额=补价10,000+增值税净额（进项11,700-销项13,000）=应收到1,300元。简化处理：支付补价10,000元+增值税差额（进项11,700-销项13,000=-1,300，实际应收款）或转账处理。' }`

const newE = `{ subjectCode: '1604', summary: '换入设备（待安装）', debit: 110000, credit: 0,
        explanation: '在建工程增加110,000元。非货币性资产交换中，换入资产的入账价值=换出产品公允价值100,000元+支付补价10,000元=110,000元。本题为小规模纳税人简化处理，不考虑增值税。设备需要安装后使用先通过在建工程核算。' },
      { subjectCode: '6001', summary: '换出A产品视同销售', debit: 0, credit: 100000,
        explanation: '主营业务收入增加100,000元。非货币性资产交换中换出资产视同销售处理按公允价值确认收入（简化处理不考虑增值税）。' },
      { subjectCode: '100201', summary: '支付补价', debit: 0, credit: 10000,
        explanation: '银行存款减少10,000元。支付的补价用于平衡交换双方资产的公允价值差额（产品100,000元-设备90,000元=补价10,000元）。' }`

c = c.replace(old, newE)
fs.writeFileSync('src/data/tutorials/months/10.js', c)
console.log('10.js: non-monetary exchange fixed')

// Check 9.js for 23,000 imbalance
c = fs.readFileSync('src/data/tutorials/months/09.js', 'utf8')
console.log('09.js has', (c.match(/debit:/g)||[]).length, 'debit entries')

// The issue might be in the 研发支出 task with entries debit=23000, credit=0, but entries have flat 0 credits
// Let's check by finding entries with big imbalances
console.log('Done')
