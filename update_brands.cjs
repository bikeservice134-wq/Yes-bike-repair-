const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const t3 = `<div key={idx} className="bg-gray-50 dark:bg-[#101010] border border-gray-100 dark:border-[#303030] hover:border-yellow-500 transition-colors rounded-2xl py-4 px-8 flex items-center justify-center min-w-[140px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none cursor-default group">`;
const r3 = `<div key={idx} className="bg-white dark:bg-[#161616] border border-gray-100 dark:border-[#2a2a2a] hover:border-yellow-500/50 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-all duration-300 rounded-2xl py-4 px-8 flex items-center justify-center min-w-[140px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(234,179,8,0.1)] dark:shadow-none cursor-default group">`;

content = content.replace(t3, r3);
fs.writeFileSync('src/App.tsx', content);
console.log("Updated Brands!");
