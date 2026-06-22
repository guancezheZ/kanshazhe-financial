var fs=require('fs');
// 月09
var c=fs.readFileSync('src/data/tutorials/months/09.js','utf8');
var s=c.indexOf("'月末结转"),t=c.lastIndexOf('{',s),pf=c.substring(t);
var e=pf.indexOf('entries:'),a=pf.indexOf('[',e),d=0,z=-1;
for(var i=a;i<pf.length;i++){if(pf[i]=='[')d++;else if(pf[i]==']'){d--;if(d===0){z=i;break}}}
var ne='[\n      { subjectCode: \'6001\', debit: 221200, credit: 0 },\n      { subjectCode: \'6051\', debit: 8000, credit: 0 },\n      { subjectCode: \'6101\', debit: 2000, credit: 0 },\n      { subjectCode: \'6111\', debit: 24104.17, credit: 0 },\n      { subjectCode: \'6603\', debit: 9475, credit: 0 },\n      { subjectCode: \'6401\', debit: 0, credit: 80000 },\n      { subjectCode: \'6402\', debit: 0, credit: 1187.5 },\n      { subjectCode: \'6403\', debit: 0, credit: 1430 },\n      { subjectCode: \'6601\', debit: 0, credit: 45500 },\n      { subjectCode: \'6602\', debit: 0, credit: 20050 },\n      { subjectCode: \'660201\', debit: 0, credit: 800 },\n      { subjectCode: \'660203\', debit: 0, credit: 31000 },\n      { subjectCode: \'6701\', debit: 0, credit: 2750 },\n      { subjectCode: \'6801\', debit: 0, credit: 54198 },\n      { subjectCode: \'5101\', debit: 0, credit: 5000 },\n      { subjectCode: \'4103\', debit: 0, credit: 12863.67 }\n    ]';
c=c.substring(0,t+a)+ne+c.substring(t+z+1);
fs.writeFileSync('src/data/tutorials/months/09.js',c,'utf8');
console.log('09 ok');
