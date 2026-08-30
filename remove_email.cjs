const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /<div className="w-6 h-\[1px\] sm:w-\[1px\] sm:h-6 bg-gray-200 dark:bg-\[#444\]"><\/div>\s*<a href="mailto:bikeservice134@gmail\.com" aria-label="Email Us" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-\[#2a2a2a\] dark:hover:bg-\[#333\] text-gray-800 dark:text-gray-200 transition-colors">\s*<Mail className="w-\[18px\] h-\[18px\]" \/>\s*<\/a>/,
  ""
);

content = content.replace(/,\s*Mail/, "");

fs.writeFileSync('src/App.tsx', content);
console.log("Removed email button!");
