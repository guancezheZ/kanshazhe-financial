var f = require('fs'), c = f.readFileSync('src/data/tutorials/months/12.js', 'utf8');
var s = c.indexOf('月末结转·期间损益（12月）');
var t = c.lastIndexOf('{', s), pf = c.substring(t);
var e = pf.indexOf('entries:'), a = pf.indexOf('[', e), d = 0, z = -1;
for (var i = a; i < pf.length; i++) { if (pf[i] == '[') d++; else if (pf[i] == ']') { d--; if (d === 0) { z = i; break } } }
var entries = pf.substring(a, z + 1);
var idx4103 = entries.indexOf("subjectCode: '4103'");
var endBrace = entries.indexOf('}', idx4103);
var before = entries.substring(0, idx4103);
var after = entries.substring(endBrace + 1);
var new4103 = "subjectCode: '4103', summary: '结转本年利润', debit: 37094, credit: 0, explanation: '本年利润结转至利润分配。' }";
var newEntries = before + new4103 + after;
c = c.substring(0, t + a) + newEntries + c.substring(t + z + 1);
f.writeFileSync('src/data/tutorials/months/12.js', c, 'utf8');
console.log('12 fixed');
