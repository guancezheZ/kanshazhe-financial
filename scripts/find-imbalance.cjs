const fs = require('fs')

function findImbalance(file, month) {
  let c = fs.readFileSync(file, 'utf8')
  // Simple approach: extract each task block and check debits/credits
  const tasks = c.split("    title:")
  for (let i = 1; i < tasks.length; i++) {
    const t = tasks[i]
    const title = t.match(/'([^']+)'/)?.[1] || 'unknown'
    const debits = [...t.matchAll(/debit:\s*([\d.]+)/g)].map(m => parseFloat(m[1]) || 0)
    const credits = [...t.matchAll(/credit:\s*([\d.]+)/g)].map(m => parseFloat(m[1]) || 0)
    const drSum = debits.reduce((a,b) => a+b, 0)
    const crSum = credits.reduce((a,b) => a+b, 0)
    const diff = Math.abs(drSum - crSum)
    if (diff > 0.02) {
      console.log(`${month} - ${title}: DR=${drSum} CR=${crSum} DIFF=${diff.toFixed(2)}`)
    }
  }
}

findImbalance('src/data/tutorials/months/09.js', '09')
findImbalance('src/data/tutorials/months/10.js', '10')
findImbalance('src/data/tutorials/months/11.js', '11')
findImbalance('src/data/tutorials/months/12.js', '12')
