const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('{/* PREMIUM BRANDS */}');
const endMarker = '</section>';
let endIdx = content.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + content.substring(endIdx + endMarker.length).trimStart();
  fs.writeFileSync('src/App.tsx', content);
  console.log("Successfully removed Premium Brands section.");
} else {
  console.log("Could not find section boundaries.");
}
