const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Service</h3>
                {selectedPackage && (
                  <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500 mt-1">
                    {selectedPackage.name} - {selectedPackage.price}
                  </p>
                )}
              </div>`;

const newStr = `              <div className="w-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Service</h3>
                <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold mb-2">Book in 30 Seconds.</p>
                {selectedPackage && (
                  <p className="text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-[#222] inline-block px-3 py-1.5 rounded-lg mb-3">
                    {selectedPackage.name} - <span className="text-yellow-600 dark:text-yellow-500">{selectedPackage.price}</span>
                  </p>
                )}
                <div className="space-y-1.5 bg-gray-50 dark:bg-[#101010] p-2.5 rounded-xl border border-gray-100 dark:border-[#333]">
                  <div className="flex items-start gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5 w-3 shrink-0">✓</span> 
                    <span>Certified mechanic at your doorstep in 30 minutes.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5 w-3 shrink-0">✓</span> 
                    <span>Services starting from ₹399.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5 w-3 shrink-0">✓</span> 
                    <span>30-day service warranty for complete peace of mind.</span>
                  </div>
                </div>
              </div>`;

content = content.replace(targetStr, newStr);
fs.writeFileSync('src/App.tsx', content);
console.log("Updated package modal!");
