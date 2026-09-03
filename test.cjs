const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');
const start = content.indexOf('{/* PRICING / PACKAGES */}');
const end = content.indexOf('{/* COVERAGE SECTION */}');
console.log(content.slice(start, end));
