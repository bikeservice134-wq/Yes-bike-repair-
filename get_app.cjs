const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
const start = content.indexOf('{/* HERO SECTION */}');
const end = content.indexOf('{/* PRICING SECTION');
if (start !== -1 && end !== -1) {
    fs.writeFileSync('hero_section.txt', content.substring(start, end));
} else {
    fs.writeFileSync('hero_section.txt', content.substring(start, start + 4000));
}
