const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
console.log(content.includes('Book in 30 Seconds.'));
