const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Use a regex to match the SERVICES section
const sectionRegex = /\s*\{\/\* SERVICES \*\/\}\s*<section id="services"[\s\S]*?<\/section>/;
content = content.replace(sectionRegex, '');

fs.writeFileSync('src/App.tsx', content);
