const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('<div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-[18px] p-[30px] relative flex flex-col shadow-sm dark:shadow-none">\n              <div className="absolute -top-[14px] left-5 bg-black text-white px-3 py-1 rounded-[20px] text-[12px] font-black">\n                CAR SERVICE\n              </div>\n              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">Jump Start</h3>');

const endStr = 'Book Now\n              </a>\n            </div>';
let currentIdx = content.indexOf(endStr, startIdx); // first end (Jump start)
currentIdx = content.indexOf(endStr, currentIdx + endStr.length); // second end (Puncture)

if (startIdx !== -1 && currentIdx !== -1) {
    const toRemove = content.substring(startIdx, currentIdx + endStr.length);
    content = content.replace(toRemove, '');
    fs.writeFileSync('src/App.tsx', content);
    console.log("Removed pricing blocks");
} else {
    console.log("Pricing blocks not found");
}

