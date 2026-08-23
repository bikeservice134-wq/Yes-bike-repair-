const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the section
const sectionRegex = /\s*\{\/\* WHY CHOOSE US \*\/\}\s*<section className="py-20 px-5 bg-white dark:bg-\[\#1d1d1d\]">[\s\S]*?<\/section>/;
content = content.replace(sectionRegex, '');

fs.writeFileSync('src/App.tsx', content);
