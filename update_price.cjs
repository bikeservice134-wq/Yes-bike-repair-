const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace all instances of 1,249 with 1,349
content = content.replace(/1,249/g, '1,349');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Updated price to 1,349");
