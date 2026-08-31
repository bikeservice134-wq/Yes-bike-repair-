const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const tFoot = `<footer className="bg-white dark:bg-[#1d1d1d] py-10 px-5 text-center border-t border-gray-200 dark:border-[#303030]">`;
const rFoot = `<footer className="bg-gray-50/80 dark:bg-[#0a0a0a] py-12 px-5 text-center border-t border-gray-100 dark:border-[#222]">`;

if (content.includes(tFoot)) {
  content = content.replace(tFoot, rFoot);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Footer!");
}
