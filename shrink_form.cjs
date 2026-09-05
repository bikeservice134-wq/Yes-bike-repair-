const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the large padding and text classes in the booking form card
const oldCardHeader = `<div className="text-center mb-3">
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-1 leading-tight">
                          Book Mechanic Now
                        </h3>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">Mechanic reaches in <span className="text-yellow-600 dark:text-yellow-500">20 mins</span>.</p>
                        <div className="bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[11px] font-bold px-3 py-1.5 rounded-lg inline-block border border-green-100 dark:border-green-500/20">
                          Honest pricing with services starting from ₹399
                        </div>
                      </div>`;
const newCardHeader = `<div className="text-center mb-2">
                        <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white mb-1 leading-tight">
                          Book Mechanic Now
                        </h3>
                        <p className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Mechanic reaches in <span className="text-yellow-600 dark:text-yellow-500">20 mins</span>.</p>
                      </div>`;

content = content.replace(oldCardHeader, newCardHeader);

const oldInputsWrapper = `<div className="space-y-2">`;
const newInputsWrapper = `<div className="space-y-1.5">`;
content = content.replace(oldInputsWrapper, newInputsWrapper);


const oldCardContainer = `<div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">`;
const newCardContainer = `<div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl p-3 sm:p-4 shadow-xl relative overflow-hidden">`;
content = content.replace(oldCardContainer, newCardContainer);


const oldInputs = `py-1.5`;
const newInputs = `py-1`;

// Not going to globally replace py-1.5, I'll use regex for the inputs in the form
const formRegex = /<input[^>]*className="([^"]*py-1\.5[^"]*)"/g;
content = content.replace(formRegex, (match, classes) => {
    return match.replace('py-1.5', 'py-1');
});

const selectRegex = /<select[^>]*className="([^"]*py-1\.5[^"]*)"/g;
content = content.replace(selectRegex, (match, classes) => {
    return match.replace('py-1.5', 'py-1');
});

const buttonRegex = /<button type="button" onClick=\{[^}]*\} className=\{`([^`]*py-1\.5[^`]*)`\}/g;
content = content.replace(buttonRegex, (match, classes) => {
    return match.replace('py-1.5', 'py-1');
});


fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Form shrink complete.");
