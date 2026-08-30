const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<a href="tel:\+917090400617" aria-label="Call Us" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-\[#2a2a2a\] dark:hover:bg-\[#333\] text-gray-800 dark:text-gray-200 transition-colors">/;
const replacement = '<a href="tel:+917090400617" aria-label="Call Us" className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-black shadow-md transition-colors">';

content = content.replace(regex, replacement);

fs.writeFileSync('src/App.tsx', content);
console.log("Changed button color to yellow");
