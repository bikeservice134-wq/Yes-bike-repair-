const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const mainFormRegex = /<h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 text-center">Book Mechanic Now<\/h3>/;
const newMainForm = `<h3 className="text-xl font-black text-gray-900 dark:text-white mb-0.5 text-center">Book Mechanic Now</h3>
            <p className="text-xs text-yellow-600 dark:text-yellow-500 text-center font-bold mb-3">Book in 30 Seconds.</p>
            
            <div className="space-y-1.5 mb-4 bg-gray-50 dark:bg-[#101010] p-2.5 rounded-xl border border-gray-100 dark:border-[#333]">
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

content = content.replace(mainFormRegex, newMainForm);

const modalFormRegex = /<h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Service<\/h3>\s*\{selectedPackage && \(\s*<p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500 mt-1">\s*\{selectedPackage\.name\} - \{selectedPackage\.price\}\s*<\/p>\s*\)\}/;
const newModalForm = `<h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Service</h3>
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
                </div>`;

content = content.replace(modalFormRegex, newModalForm);

fs.writeFileSync('src/App.tsx', content);
console.log("Promotional text added back!");
