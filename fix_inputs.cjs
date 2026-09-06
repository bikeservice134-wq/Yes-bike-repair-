const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The main booking form inputs (the ones in the popup)
content = content.replace(/text-sm placeholder:text-gray-400/g, 'text-[16px] md:text-sm placeholder:text-gray-400');
// The ones in the hero form
content = content.replace(/text-xs sm:text-sm placeholder:text-gray-400/g, 'text-[16px] md:text-sm placeholder:text-gray-400');
content = content.replace(/text-xs sm:text-sm appearance-none/g, 'text-[16px] md:text-sm appearance-none');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Fixed input font sizes for mobile");
