const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Brands
content = content.replace(
  '<section className="py-20 px-5 bg-white dark:bg-[#1d1d1d] border-t border-gray-200 dark:border-[#303030]">',
  '<section className="py-20 px-5 bg-gray-50/50 dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#222]">'
);

// How it works
content = content.replace(
  '<section className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">',
  '<section className="py-20 px-5 bg-white dark:bg-[#0a0a0a]">'
);

// Pricing
content = content.replace(
  '<section id="pricing" className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">',
  '<section id="pricing" className="py-24 px-5 bg-gray-50/50 dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#222]">'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Updated sections successfully!");
