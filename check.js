// 회귀 검사: 문법 + 화면에 걸린 onclick 함수가 실제로 존재하는지. 실행: node check.js
const fs=require('fs'),vm=require('vm');
const h=fs.readFileSync(__dirname+'/index.html','utf8');
const js=h.match(/<script>([\s\S]*)<\/script>/)[1];
new vm.Script(js);   // 문법 오류면 여기서 throw
const defined=new Set([...js.matchAll(/function\s+([\w$]+)\s*\(/g)].map(m=>m[1]).concat([...js.matchAll(/(?:const|let|var)\s+([\w$]+)\s*=/g)].map(m=>m[1])));
const used=new Set([...js.matchAll(/onclick="([\w$]+)\(/g)].map(m=>m[1]));
const missing=[...used].filter(u=>!defined.has(u));
if(missing.length){console.error('MISSING handlers:',missing);process.exit(1);}
console.log('check OK: syntax + '+used.size+' handlers defined');
