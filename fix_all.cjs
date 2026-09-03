const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// I need to find the OLD pricing section and remove it.
const startOld = content.indexOf('{/* PRICING / PACKAGES */}', content.indexOf('Our Popular Packages') + 100);
if (startOld !== -1) {
  const endOld = content.indexOf('{/* COVERAGE SECTION */}');
  if (endOld !== -1) {
    content = content.slice(0, startOld) + content.slice(endOld);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log('Removed old duplicate pricing section');
  }
}
