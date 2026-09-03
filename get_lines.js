const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');
console.log(lines.slice(255, 420).join('\n'));
