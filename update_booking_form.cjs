const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeader = '<h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 text-center">Book Mechanic Now</h3>';
const newHeader = `<h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 text-center">Book Mechanic Now</h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-500 text-center font-bold mb-5">Book in 30 Seconds.</p>
            
            <div className="space-y-2.5 mb-6 bg-gray-50 dark:bg-[#101010] p-3.5 rounded-xl border border-gray-100 dark:border-[#333]">
              <div className="flex items-start gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 w-3.5 shrink-0">✓</span> 
                <span>Certified mechanic at your doorstep in 30 minutes.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 w-3.5 shrink-0">✓</span> 
                <span>Services starting from ₹399.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 w-3.5 shrink-0">✓</span> 
                <span>30-day service warranty for complete peace of mind.</span>
              </div>
            </div>`;

content = content.replace(oldHeader, newHeader);
fs.writeFileSync('src/App.tsx', content);
console.log("Updated booking form header!");
