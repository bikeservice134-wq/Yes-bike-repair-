const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/General Bike Service/g, 'General Service');
fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Renamed General Bike Service to General Service");
