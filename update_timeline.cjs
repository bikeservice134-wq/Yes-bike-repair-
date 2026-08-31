const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const tLine = `ring-8 ring-gray-50 dark:ring-[#101010]`;
const rLine = `ring-8 ring-white dark:ring-[#0a0a0a]`;

if (content.includes(tLine)) {
  content = content.replace(tLine, rLine);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Timeline Ring!");
}

const tCard = `bg-white dark:bg-[#1d1d1d] p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-gray-100 dark:border-[#303030] hover:border-yellow-500/30 transition-colors group`;
const rCard = `bg-gray-50/50 dark:bg-[#111] p-6 md:p-8 rounded-3xl shadow-sm dark:shadow-none border border-gray-100 dark:border-[#222] hover:border-yellow-500/30 hover:bg-white dark:hover:bg-[#161616] transition-all duration-300 group`;

if (content.includes(tCard)) {
  content = content.replace(tCard, rCard);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Timeline Cards!");
}
