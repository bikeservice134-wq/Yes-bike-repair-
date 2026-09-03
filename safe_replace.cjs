const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const r1 = 'max-w-6xl w-full mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10';
const r1_new = 'max-w-4xl w-full mx-auto px-5 flex flex-col gap-10 items-center relative z-10 pt-4';

const r2 = 'order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start';
const r2_new = 'order-2 text-center flex flex-col items-center';

const r3 = 'order-1 lg:order-2 bg-white/90';
const r3_new = 'order-1 bg-white/90';

const r4 = '<ul className="space-y-3 mb-8 text-left text-gray-700 dark:text-gray-300 font-medium">';
const r4_new = '<div className="inline-block text-left"><ul className="space-y-3 mb-8 text-left text-gray-700 dark:text-gray-300 font-medium">';

const r5 = '</ul>\n                                    <p className="text-lg font-bold text-gray-900 dark:text-white">';
const r5_new = '</ul></div>\n                                    <p className="text-lg font-bold text-gray-900 dark:text-white">';

content = content.replace(r1, r1_new).replace(r2, r2_new).replace(r3, r3_new).replace(r4, r4_new).replace(r5, r5_new);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Replaced successfully');
