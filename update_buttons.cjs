const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add handleBookPackage function
const appStart = content.indexOf('export default function App() {');
const insertionPoint = content.indexOf('\n', appStart) + 1;
const fnCode = `
  const handleBookPackage = (packageName: string) => {
    document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'});
    setTimeout(() => {
      const selectEl = document.querySelector('select[name="service"]') as HTMLSelectElement;
      if (selectEl) {
        Array.from(selectEl.options).forEach(opt => {
          if (opt.value.includes(packageName)) {
            selectEl.value = opt.value;
          }
        });
      }
    }, 100);
  };
`;
content = content.substring(0, insertionPoint) + fnCode + content.substring(insertionPoint);

// 2. Replace the onClick handlers
content = content.replace(/onClick=\{\(\) => \{ setSelectedPackage\([^)]+\); setIsPackageModalOpen\(true\); \}\}/g, function(match) {
  if (match.includes("'General Bike Service'")) {
    return `onClick={() => handleBookPackage('General Bike Service')}`;
  } else if (match.includes("'General Service + Engine Oil'")) {
    return `onClick={() => handleBookPackage('General Service + Engine Oil')}`;
  } else if (match.includes("'Jump Start Service'")) {
    return `onClick={() => handleBookPackage('Jump Start Service')}`;
  }
  return match;
});

// 3. We can also remove the setIsPackageModalOpen state and the Modal itself, but maybe keeping it is safe, it just won't be triggered. Actually let's remove it to clean up if we want, but leaving it unused is fine.

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Updated buttons");
