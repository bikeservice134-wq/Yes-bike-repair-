const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const packagesStart = content.indexOf('const popularPackages = [');
if (packagesStart !== -1) {
  const packagesEnd = content.indexOf('];', packagesStart) + 2;
  content = content.slice(0, packagesStart) + content.slice(packagesEnd);
}

const sectionStart = content.indexOf('{/* PRICING / PACKAGES */}');
const sectionEnd = content.indexOf('{/* COVERAGE SECTION */}');
if (sectionStart !== -1 && sectionEnd !== -1) {
  content = content.slice(0, sectionStart) + content.slice(sectionEnd);
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Removed Pricing Section');
