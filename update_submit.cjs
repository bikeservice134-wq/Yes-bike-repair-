const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const t2 = `className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl font-black text-[16px] transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2 mt-4"`;
const r2 = `className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-4 py-3.5 rounded-xl font-bold text-[16px] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_20px_rgba(234,179,8,0.25)] flex justify-center items-center gap-2 mt-6"`;

content = content.replace(t2, r2);
fs.writeFileSync('src/App.tsx', content);
console.log("Replaced!");
