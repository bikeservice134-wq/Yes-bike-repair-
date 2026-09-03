const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Extract the two blocks
const leftStart = content.indexOf('{/* LEFT */}');
const rightStart = content.indexOf('{/* RIGHT: SHORT FORM */}');
const afterHero = content.indexOf('              </div>\n            </FadeIn>\n          </section>\n          {/* BRANDS WE SERVICE */}');

let leftBlock = content.substring(leftStart, rightStart);
let rightBlock = content.substring(rightStart, afterHero);

// We need to modify leftBlock and rightBlock classes to look good in a stack
// leftBlock: change order, text-center, etc.
leftBlock = leftBlock.replace('order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start', 'flex flex-col items-center text-center');
leftBlock = leftBlock.replace('text-left text-gray-700', 'text-left inline-block mx-auto text-gray-700'); // keep list left aligned but centered as a block

// Right block: change order, remove hover transform if we want
rightBlock = rightBlock.replace('order-1 lg:order-2 ', '');

// Now replace the grid container
const gridStart = content.indexOf('<div className="max-w-6xl w-full mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">');
const gridEnd = gridStart + '<div className="max-w-6xl w-full mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">'.length;

const newGrid = '<div className="max-w-4xl w-full mx-auto px-5 flex flex-col gap-10 items-center relative z-10 pt-4">';

// We have the container, we just replace everything from gridStart to afterHero
const combined = newGrid + '\n                ' + rightBlock + '\n                ' + leftBlock;

let newContent = content.substring(0, gridStart) + combined + content.substring(afterHero);

fs.writeFileSync('src/App.tsx', newContent, 'utf-8');
console.log('Hero stacked with form above text.');
