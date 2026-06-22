var f = require('fs'), p = 'src/data/tutorials/months/05.js', c = f.readFileSync(p, 'utf8');
var s = c.indexOf("'月末结转"), t = c.lastIndexOf('{', s), pf = c.substring(t);
var e = pf.indexOf('entries:'), a = pf.indexOf('[', e), d = 0, z = -1;
for (var i = a; i < pf.length; i++) { if (pf[i] == '[') d++; else if (pf[i] == ']') { d--; if (d === 0) { z = i; break } } }
var nl = '\n      ';
var ne = '[' + nl + "{ subjectCode: '6001', debit: 550000, credit: 0 }," + nl + "{ subjectCode: '6301', debit: 5000, credit: 0 }," + nl + "{ subjectCode: '660202', debit: 0, credit: 2500 }," + nl + "{ subjectCode: '6602', debit: 0, credit: 13000 }," + nl + "{ subjectCode: '660203', debit: 0, credit: 30000 }," + nl + "{ subjectCode: '6601', debit: 0, credit: 49500 }," + nl + "{ subjectCode: '6603', debit: 0, credit: 543.75 }," + nl + "{ subjectCode: '6701', debit: 0, credit: 5650 }," + nl + "{ subjectCode: '660201', debit: 0, credit: 600 }," + nl + "{ subjectCode: '6403', debit: 0, credit: 2795 }," + nl + "{ subjectCode: '5101', debit: 0, credit: 5000 }," + nl + "{ subjectCode: '4103', debit: 0, credit: 445411.25 }" + nl + '    ]';
c = c.substring(0, t + a) + ne + c.substring(t + z + 1);
f.writeFileSync(p, c, 'utf8');
console.log('05 ok');
