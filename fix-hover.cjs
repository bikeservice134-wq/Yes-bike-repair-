const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/hover:text-\[\#e5a900\] dark:text-\[\#ffc107\]/g, 'hover:text-[#e5a900] dark:hover:text-[#ffc107]');
fs.writeFileSync('src/App.tsx', content);
