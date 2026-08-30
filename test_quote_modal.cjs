const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
const searchStr = '{/* QUOTE MODAL */}';
console.log("Found QUOTE MODAL:", content.includes(searchStr));
