var fs=require('fs');
// 月07
var c=fs.readFileSync('src/data/tutorials/months/07.js','utf8');
var s=c.indexOf("'月末结转"),t=c.lastIndexOf('{',s),pf=c.substring(t);
var e=pf.indexOf('entries:'),a=pf.indexOf('[',e),d=0,z=-1;
for(var i=a;i<pf.length;i++){if(pf[i]=='[')d++;else if(pf[i]==']'){d--;if(d===0){z=i;break}}}
var ne='[\n      { subjectCode: \'6001\', debit: 280000, credit: 0 },\n      { subjectCode: \'6301\', debit: 12000, credit: 0 },\n      { subjectCode: \'6111\', debit: 104.17, credit: 0 },\n      { subjectCode: \'6403\', debit: 0, credit: 3250 },\n      { subjectCode: \'6601\', debit: 0, credit: 41000 },\n      { subjectCode: \'6602\', debit: 0, credit: 11200 },\n      { subjectCode: \'660201\', debit: 0, credit: 680 },\n      { subjectCode: \'660202\', debit: 0, credit: 2800 },\n      { subjectCode: \'660203\', debit: 0, credit: 31000 },\n      { subjectCode: \'6603\', debit: 0, credit: 543.75 },\n      { subjectCode: \'6701\', debit: 0, credit: 4520 },\n      { subjectCode: \'4103\', debit: 0, credit: 193110.42 }\n    ]';
c=c.substring(0,t+a)+ne+c.substring(t+z+1);
fs.writeFileSync('src/data/tutorials/months/07.js',c,'utf8');
console.log('07 ok');
