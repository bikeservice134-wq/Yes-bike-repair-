const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const tMask1 = `from-gray-50 to-transparent dark:from-[#101010]`;
const rMask1 = `from-gray-50 to-transparent dark:from-[#0f0f0f]`;

content = content.replace(new RegExp(tMask1, 'g'), rMask1);

// Also upgrade the borders of the packages.
content = content.replace(
  `border-2 border-yellow-500 shadow-xl`, 
  `border-2 border-yellow-400 dark:border-yellow-500/50 shadow-[0_8px_30px_rgba(234,179,8,0.15)] dark:shadow-[0_8px_30px_rgba(234,179,8,0.05)]`
);

content = content.replace(
  `border-2 border-red-500/20 dark:border-red-500/30 shadow-xl`,
  `border border-gray-200 dark:border-[#222] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]`
);

content = content.replace(
  `border border-gray-100 dark:border-[#303030] shadow-xl`,
  `border border-gray-200 dark:border-[#222] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]`
);

fs.writeFileSync('src/App.tsx', content);
console.log("Updated Pricing Cards!");
