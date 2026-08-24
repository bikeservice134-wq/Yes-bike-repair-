const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add State
content = content.replace(
  'const [heroSuccess, setHeroSuccess] = useState(false);',
  `const [heroSuccess, setHeroSuccess] = useState(false);\n  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);\n  const [quoteSuccess, setQuoteSuccess] = useState(false);`
);

// 2. Add Button in Hero
content = content.replace(
  `without visiting a service center.\n            </p>\n          </div>`,
  `without visiting a service center.\n            </p>\n            <div className="flex gap-4">\n              <button \n                onClick={() => setIsQuoteModalOpen(true)}\n                className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white border border-gray-200 dark:border-[#333] hover:border-gray-900 dark:hover:border-[#666] px-5 py-3 rounded-lg font-bold transition-all text-[15px] shadow-sm flex items-center gap-2"\n              >\n                <Settings className="w-4 h-4 text-gray-500" />\n                Get a Custom Quote\n              </button>\n            </div>\n          </div>`
);

// 3. Add Modal at bottom (before the final closing div)
const modalContent = `
      {/* QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151515] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-[#2a2a2a]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Custom Quote</h3>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setQuoteSuccess(true); setTimeout(() => {setQuoteSuccess(false); setIsQuoteModalOpen(false);}, 3000); }} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Vehicle Type</label>
                <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg border border-gray-200 dark:border-[#303030]">
                  {['Bike', 'Scooter', 'Car'].map(type => (
                    <button
                      key={'quote-'+type}
                      type="button"
                      className="flex-1 py-2 text-sm font-bold rounded-md transition-all text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:bg-white dark:focus:bg-[#222] focus:text-gray-900 dark:focus:text-white focus:shadow-sm"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand</label>
                  <input type="text" required placeholder="e.g. Honda" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Model</label>
                  <input type="text" required placeholder="e.g. Activa 6G" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Issue Description</label>
                <textarea required placeholder="Describe what needs to be fixed..." rows={3} className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mobile Number</label>
                <input type="tel" required pattern="[0-9]{10}" placeholder="10-digit number" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
              </div>
              
              <button type="submit" className="w-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-4 py-3 rounded-lg font-bold transition-colors mt-2">
                Request Estimate
              </button>
            </form>
          </div>
        </div>
      )}
      
      {quoteSuccess && <Toast message="Quote request sent! We'll contact you shortly." onClose={() => setQuoteSuccess(false)} />}
`;

content = content.replace(
  '    </div>\n  );\n}\n',
  modalContent + '\n    </div>\n  );\n}\n'
);

fs.writeFileSync('src/App.tsx', content);
