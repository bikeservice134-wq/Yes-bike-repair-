const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The current code has:
// <div className="flex items-center gap-1 mb-1 md:mb-1.5">
//   <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#ffcc00] text-[#ffcc00]" />
//   <span className="text-gray-800 dark:text-gray-200 text-sm md:text-base">{pkg.rating}</span>
// </div>

const target = `<div className="flex items-center gap-1 mb-1 md:mb-1.5">
                            <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#ffcc00] text-[#ffcc00]" />
                            <span className="text-gray-800 dark:text-gray-200 text-sm md:text-base">{pkg.rating}</span>
                          </div>`;

const replacement = `<div className="flex flex-col items-center justify-center mr-1">
                            <Star className="w-5 h-5 fill-[#ffcc00] text-[#ffcc00]" />
                            <span className="text-gray-900 dark:text-gray-100 font-medium text-[15px]">{pkg.rating}</span>
                          </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Updated rating layout');
