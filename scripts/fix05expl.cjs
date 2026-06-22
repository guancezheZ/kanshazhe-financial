var f = require('fs'), c = f.readFileSync('src/data/tutorials/months/05.js', 'utf8');
var s = c.indexOf("'月末结转"), t = c.lastIndexOf('{', s), pf = c.substring(t);
var e = pf.indexOf('entries:'), a = pf.indexOf('[', e), d = 0, z = -1;
for (var i = a; i < pf.length; i++) { if (pf[i] == '[') d++; else if (pf[i] == ']') { d--; if (d === 0) { z = i; break } } }
var entriesStr = pf.substring(a + 1, z);
var parts = entriesStr.split('},');
var SUMMARY = { '6001': '结转主营业务收入', '6301': '结转营业外收入', '660202': '结转管理费用-差旅费', '6602': '结转管理费用', '660203': '结转管理费用-工资', '6601': '结转销售费用', '6603': '结转财务费用', '6701': '结转资产减值损失', '660201': '结转管理费用-办公费', '6403': '结转税金及附加', '5101': '结转制造费用' };
var EXPL = { '6001': '主营业务收入结转至本年利润。', '6301': '营业外收入结转至本年利润。', '660202': '差旅费结转至本年利润。', '6602': '管理费用结转至本年利润。', '660203': '管理工资结转至本年利润。', '6601': '销售费用结转至本年利润。', '6603': '财务费用结转至本年利润。', '6701': '资产减值损失结转至本年利润。', '660201': '办公费结转至本年利润。', '6403': '税金及附加结转至本年利润。', '5101': '制造费用结转至生产成本。' };
var newParts = [];
for (var p of parts) {
  var scm = p.match(/subjectCode:\s*'([^']+)'/);
  if (scm && SUMMARY[scm[1]] && !p.includes('summary:')) {
    var sc = scm[1];
    p = p.replace(/\s*\}$/, ", summary: '" + SUMMARY[sc] + "', explanation: '" + EXPL[sc] + "' }");
  }
  newParts.push(p);
}
var newSection = '[\n      ' + newParts.join(',\n      ') + '\n    ]';
c = c.substring(0, t + a) + newSection + c.substring(t + z + 1);
f.writeFileSync('src/data/tutorials/months/05.js', c, 'utf8');
console.log('05 fixed');
