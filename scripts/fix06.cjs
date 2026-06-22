var fs=require('fs');
// 月06
var c=fs.readFileSync('src/data/tutorials/months/06.js','utf8');
var s=c.indexOf("'月末结转"),t=c.lastIndexOf('{',s),pf=c.substring(t);
var e=pf.indexOf('entries:'),a=pf.indexOf('[',e),d=0,z=-1;
for(var i=a;i<pf.length;i++){if(pf[i]=='[')d++;else if(pf[i]==']'){d--;if(d===0){z=i;break}}}
var ne='[\n      { subjectCode: \'6001\', debit: 295000, credit: 0 },\n      { subjectCode: \'6111\', debit: 104.17, credit: 0 },\n      { subjectCode: \'6403\', debit: 0, credit: 3055 },\n      { subjectCode: \'6601\', debit: 0, credit: 43000 },\n      { subjectCode: \'6602\', debit: 0, credit: 8800 },\n      { subjectCode: \'660201\', debit: 0, credit: 750 },\n      { subjectCode: \'660202\', debit: 0, credit: 3200 },\n      { subjectCode: \'660203\', debit: 0, credit: 32000 },\n      { subjectCode: \'6701\', debit: 0, credit: 6780 },\n      { subjectCode: \'6801\', debit: 0, credit: 35688 },\n      { subjectCode: \'5101\', debit: 0, credit: 5000 },\n      { subjectCode: \'4103\', debit: 0, credit: 156831.17 }\n    ]';
c=c.substring(0,t+a)+ne+c.substring(t+z+1);
fs.writeFileSync('src/data/tutorials/months/06.js',c,'utf8');
console.log('06 ok');
