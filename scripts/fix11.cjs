var fs=require('fs');
// 月11 - 特殊结转（研发支出费用化 + 期间损益结转）
// 非结转P&L：
// 660101: net Cr 8000 → Dr 660101 8000 (to 4103 Cr)
// 6602: net Cr 17000 → Dr 6602 17000 (to 4103 Cr)
// 6603: net Dr 145 → Cr 6603 145 (to 4103 Dr)
// 5101: net Dr 5000 → Cr 5101 5000 (to 4103 Dr)
// 研发支出：Dr 6602 23000 / Cr 530101 23000
// 4103: Cr (8000+17000) - (145+5000) = Cr 19855
// Total Dr: 8000+40000=48000, Total Cr: 23000+145+5000+19855=48000
var c=fs.readFileSync('src/data/tutorials/months/11.js','utf8');
var s=c.indexOf("'月末结转"),t=c.lastIndexOf('{',s),pf=c.substring(t);
var e=pf.indexOf('entries:'),a=pf.indexOf('[',e),d=0,z=-1;
for(var i=a;i<pf.length;i++){if(pf[i]=='[')d++;else if(pf[i]==']'){d--;if(d===0){z=i;break}}}
var ne='[\n      { subjectCode: \'6602\', debit: 23000, credit: 0 },\n      { subjectCode: \'660101\', debit: 8000, credit: 0 },\n      { subjectCode: \'6602\', debit: 17000, credit: 0 },\n      { subjectCode: \'530101\', debit: 0, credit: 23000 },\n      { subjectCode: \'6603\', debit: 0, credit: 145 },\n      { subjectCode: \'5101\', debit: 0, credit: 5000 },\n      { subjectCode: \'4103\', debit: 0, credit: 19855 }\n    ]';
c=c.substring(0,t+a)+ne+c.substring(t+z+1);
fs.writeFileSync('src/data/tutorials/months/11.js',c,'utf8');
console.log('11 ok');
