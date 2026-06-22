var fs=require('fs');
// 月10
var c=fs.readFileSync('src/data/tutorials/months/10.js','utf8');
var s=c.indexOf("'月末结转"),t=c.lastIndexOf('{',s),pf=c.substring(t);
var e=pf.indexOf('entries:'),a=pf.indexOf('[',e),d=0,z=-1;
for(var i=a;i<pf.length;i++){if(pf[i]=='[')d++;else if(pf[i]==']'){d--;if(d===0){z=i;break}}}
var ne='[\n      { subjectCode: \'6001\', debit: 307079.65, credit: 0 },\n      { subjectCode: \'6051\', debit: 8000, credit: 0 },\n      { subjectCode: \'6111\', debit: 28000, credit: 0 },\n      { subjectCode: \'6401\', debit: 0, credit: 180000 },\n      { subjectCode: \'6402\', debit: 0, credit: 2375 },\n      { subjectCode: \'6403\', debit: 0, credit: 2080 },\n      { subjectCode: \'6601\', debit: 0, credit: 44800 },\n      { subjectCode: \'660101\', debit: 0, credit: 9000 },\n      { subjectCode: \'6602\', debit: 0, credit: 17300 },\n      { subjectCode: \'660201\', debit: 0, credit: 700 },\n      { subjectCode: \'660203\', debit: 0, credit: 31000 },\n      { subjectCode: \'6603\', debit: 0, credit: 4788 },\n      { subjectCode: \'5101\', debit: 0, credit: 5000 },\n      { subjectCode: \'4103\', debit: 0, credit: 46036.65 }\n    ]';
c=c.substring(0,t+a)+ne+c.substring(t+z+1);
fs.writeFileSync('src/data/tutorials/months/10.js',c,'utf8');
console.log('10 ok');
