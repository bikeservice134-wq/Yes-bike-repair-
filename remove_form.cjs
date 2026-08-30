const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `<div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] p-5 sm:p-8 rounded-[20px] shadow-2xl backdrop-blur-sm relative">`;
const targetEnd = `              </ul>
            </div>
          </div>`;

const startIndex = content.indexOf(targetStart);
if (startIndex === -1) {
    console.error("Target start not found");
    process.exit(1);
}

// Find the targetEnd AFTER the start index
const endIndex = content.indexOf(targetEnd, startIndex);
if (endIndex === -1) {
    console.error("Target end not found");
    process.exit(1);
}

const textToRemove = content.substring(startIndex, endIndex + targetEnd.length);

const newContent = content.substring(0, startIndex) + content.substring(endIndex + targetEnd.length);
fs.writeFileSync('src/App.tsx', newContent);
console.log("Removed successfully!");
