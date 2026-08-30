const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const mainFormRegex = /<h3 className="text-xl font-black text-gray-900 dark:text-white mb-0\.5 text-center">Book Mechanic Now<\/h3>[\s\S]*?30-day service warranty for complete peace of mind\.<\/span>\s*<\/div>\s*<\/div>/;

const newMainForm = '<h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 text-center">Book Mechanic Now</h3>';

content = content.replace(mainFormRegex, newMainForm);

const modalFormRegex = /<p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold mb-2">Book in 30 Seconds\.<\/p>[\s\S]*?<div className="space-y-1\.5 bg-gray-50 dark:bg-\[#101010\] p-2\.5 rounded-xl border border-gray-100 dark:border-\[#333\]">[\s\S]*?30-day service warranty for complete peace of mind\.<\/span>\s*<\/div>\s*<\/div>/;

const newModalForm = `{selectedPackage && (
                  <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500 mt-1">
                    {selectedPackage.name} - {selectedPackage.price}
                  </p>
                )}`;

content = content.replace(modalFormRegex, newModalForm);

fs.writeFileSync('src/App.tsx', content);
console.log("Promotional text removed!");
