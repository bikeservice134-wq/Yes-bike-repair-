const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const tCov = `<section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">`;
const rCov = `<section className="bg-white dark:bg-[#0a0a0a] py-24 px-5 border-t border-gray-100 dark:border-[#222]">`;

if (content.includes(tCov)) {
  content = content.replace(tCov, rCov);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Coverage Background!");
}

const tRev = `<section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">`;
const rRev = `<section className="bg-gray-50/50 dark:bg-[#0f0f0f] py-24 px-5 border-t border-gray-100 dark:border-[#222]">`;

if (content.includes(tRev)) {
  content = content.replace(tRev, rRev);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Reviews Background!");
}

const tFaq = `<section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">`;
const rFaq = `<section className="bg-white dark:bg-[#0a0a0a] py-24 px-5 border-t border-gray-100 dark:border-[#222]">`;

if (content.includes(tFaq)) {
  content = content.replace(tFaq, rFaq);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated FAQ Background!");
}

