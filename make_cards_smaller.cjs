const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The grid starts at `<div className="grid grid-cols-1 lg:grid-cols-3`
const gridStart = content.indexOf('<div className="grid grid-cols-1 lg:grid-cols-3');
const gridEnd = content.indexOf('</div>\n              <div className="mt-16 text-center">');

if (gridStart !== -1 && gridEnd !== -1) {
  let gridContent = content.substring(gridStart, gridEnd);
  
  // Make sizes smaller
  // Padding p-6 -> p-4
  gridContent = gridContent.replace(/p-6/g, 'p-4 sm:p-5');
  // Title text-xl -> text-lg
  gridContent = gridContent.replace(/text-xl font-black/g, 'text-lg font-black');
  // Icon sizes text-xl -> text-lg
  gridContent = gridContent.replace(/<span className="text-xl leading-tight">/g, '<span className="text-lg leading-tight">');
  // Prices text-3xl -> text-2xl
  gridContent = gridContent.replace(/text-3xl font-black/g, 'text-2xl font-black');
  // Margins mb-6 -> mb-4
  gridContent = gridContent.replace(/mb-6/g, 'mb-4');
  // Buttons py-3.5 -> py-2.5
  gridContent = gridContent.replace(/py-3\.5/g, 'py-2.5');
  // Buttons py-3 -> py-2
  gridContent = gridContent.replace(/py-3 /g, 'py-2 ');
  
  // Gap between cards gap-6 xl:gap-8 -> gap-4 xl:gap-6
  gridContent = gridContent.replace(/gap-6 xl:gap-8/g, 'gap-4 xl:gap-6');
  // Max width max-w-[1400px] -> max-w-6xl
  gridContent = gridContent.replace(/max-w-\[1400px\]/g, 'max-w-5xl');
  
  content = content.substring(0, gridStart) + gridContent + content.substring(gridEnd);
  fs.writeFileSync('src/App.tsx', content, 'utf-8');
  console.log("Made cards smaller");
} else {
  console.log("Could not find grid");
}
