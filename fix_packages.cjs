const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');

const startStr = '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">';
const startIdx = content.indexOf(startStr);

if (startIdx === -1) {
  console.log("Could not find packages grid start");
  process.exit(1);
}

// Find where the section ends
const endIdx = content.indexOf('</section>', startIdx);
if (endIdx === -1) {
  console.log("Could not find section end");
  process.exit(1);
}

// We need to replace everything from startStr to endIdx
console.log("Found bounds", startIdx, endIdx);
