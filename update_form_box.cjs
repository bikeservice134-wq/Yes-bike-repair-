const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `<div className="order-1 lg:order-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] p-5 sm:p-6 rounded-[24px] shadow-2xl relative z-10 w-full mx-auto max-w-[380px]">`;
const replace1 = `<div className="order-1 lg:order-2 bg-white/90 dark:bg-[#161616]/95 backdrop-blur-xl border border-gray-100 dark:border-[#2a2a2a] p-6 sm:p-8 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10 w-full mx-auto max-w-[420px] transition-transform hover:-translate-y-1 duration-500">`;

const target2 = `            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-100 dark:border-[#303030] p-6 rounded-2xl shadow-sm text-left inline-block w-full max-w-xl">`;
const replace2 = `            <div className="bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-md border border-gray-200/50 dark:border-[#333]/50 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] text-left inline-block w-full max-w-xl">`;

let updated = false;
if (content.includes(target1)) {
  content = content.replace(target1, replace1);
  updated = true;
}
if (content.includes(target2)) {
  content = content.replace(target2, replace2);
  updated = true;
}

if (updated) {
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Form Box styles successfully!");
} else {
  console.log("Could not find targets");
}
