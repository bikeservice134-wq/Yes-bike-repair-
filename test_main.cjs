const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
const mainTag = '<main>';
const mainIndex = content.indexOf(mainTag);
console.log(content.substring(mainIndex, mainIndex + 200));
