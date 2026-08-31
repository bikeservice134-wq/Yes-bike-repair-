const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const start = content.indexOf('<form onSubmit={(e) => {');
const end = content.indexOf('</form>', start) + 7;
console.log(content.slice(start, end));
