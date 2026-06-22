var fs=require('fs');
// 月12
var c=fs.readFileSync('src/data/tutorials/months/12.js','utf8');
var s=c.indexOf("'月末结转"),t=c.lastIndexOf('{',s),pf=c.substring(t);
var e=pf.indexOf('entries:'),a=pf.indexOf('[',e),d=0,z=-1;
for(var i=a;i<pf.length;i++){if(pf[i]=='[')d++;else if(pf[i]==']'){d--;if(d===0){z=i;break}}}
// Dr: 6001(160000)+6051(8000)+6111(12000)+6701(1500)=181500
// Cr: 6401(80000)+6402(2375)+6403(1560)+6601(44500)+660101(8000)+6602(18500)+660201(500)+660203(31000)+6603(295)+6801(26864)+5101(5000)=218594
// 4103: Dr 218594-181500=37094
var ne='[\n      { subjectCode: \'6001\', debit: 160000, credit: 0 },\n      { subjectCode: \'6051\', debit: 8000, credit: 0 },\n      { subjectCode: \'6111\', debit: 12000, credit: 0 },\n      { subjectCode: \'6701\', debit: 1500, credit: 0 },\n      { subjectCode: \'6401\', debit: 0, credit: 80000 },\n      { subjectCode: \'6402\', debit: 0, credit: 2375 },\n      { subjectCode: \'6403\', debit: 0, credit: 1560 },\n      { subjectCode: \'6601\', debit: 0, credit: 44500 },\n      { subjectCode: \'660101\', debit: 0, credit: 8000 },\n      { subjectCode: \'6602\', debit: 0, credit: 18500 },\n      { subjectCode: \'660201\', debit: 0, credit: 500 },\n      { subjectCode: \'660203\', debit: 0, credit: 31000 },\n      { subjectCode: \'6603\', debit: 0, credit: 295 },\n      { subjectCode: \'6801\', debit: 0, credit: 26864 },\n      { subjectCode: \'5101\', debit: 0, credit: 5000 },\n      { subjectCode: \'4103\', debit: 37094, credit: 0 }\n    ]';
c=c.substring(0,t+a)+ne+c.substring(t+z+1);
fs.writeFileSync('src/data/tutorials/months/12.js',c,'utf8');
console.log('12 ok');
