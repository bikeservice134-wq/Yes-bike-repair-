const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const t1 = `className="hidden md:inline-flex bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-extrabold transition-colors ml-4"`;
const r1 = `className="hidden md:inline-flex bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full font-bold transition-all ml-4 shadow-[0_4px_14px_rgba(234,179,8,0.2)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.3)] hover:-translate-y-0.5"`;

content = content.replace(t1, r1);
fs.writeFileSync('src/App.tsx', content);
console.log("Replaced!");
