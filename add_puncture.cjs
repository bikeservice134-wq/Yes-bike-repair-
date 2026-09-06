const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Update priceMap
content = content.replace(
  /'Jump Start Service': '₹399'/,
  `'Jump Start Service': '₹399',\n      'Puncture Repair': '₹599'`
);

// 2. Add to packageDetailsData
content = content.replace(
  /    'Jump Start Service': \[/,
  `    'Puncture Repair': [
      'Locating tyre puncture safely',
      'Removing debris/nail from the tyre',
      'Plugging the puncture with high-quality seal',
      'Checking tyre pressure & reinflating'
    ],
    'Jump Start Service': [`
);

// 3. Add to dropdown
content = content.replace(
  /<option value="Jump Start Service \(₹399\)">⚡ Jump Start - ₹399<\/option>/,
  `<option value="Jump Start Service (₹399)">⚡ Jump Start - ₹399</option>\n                              <option value="Puncture Repair (₹599)">🛞 Puncture Repair - ₹599</option>`
);

// 4. Update the grid layout
content = content.replace(
  /<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:p-5 xl:gap-8 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">/,
  `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:p-5 xl:gap-6 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">`
);

// 5. Add the card
const jumpStartEnd = `                </FadeIn>
              </div>`;
const newCard = `                </FadeIn>

                {/* Puncture Repair */}
                <FadeIn delay={400} className="flex">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl p-4 sm:p-5 flex flex-col w-full hover:border-yellow-500/30 transition-all shadow-sm hover:shadow-xl relative h-full">
                    <div className="mb-4 flex-grow">
                      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2 flex items-start gap-2 line-clamp-2 min-h-[56px]"><span className="text-lg leading-tight">🛞</span> <span className="leading-tight">Puncture Repair</span></h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">₹599</div>
                        <div className="text-sm font-bold text-gray-400 line-through mb-1">₹750</div>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-xs font-black bg-green-50 dark:bg-green-500/10 inline-block px-3 py-1 rounded-md mb-4 tracking-wide uppercase">Special Price: ₹599</p>
                        
                      <div className="space-y-2.5 mb-4 bg-gray-50 dark:bg-[#1A1A1A] p-4 rounded-xl border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-sm">🏠</div> 
                          Available at Doorstep
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-sm">⏱️</div> 
                          30 Minutes Approx.
                        </div>
                      </div>
                        
                      <div className="space-y-3">
                        <h4 className="font-black text-gray-900 dark:text-white text-xs uppercase tracking-wider">What's Included</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> 1 Tyre Puncture Repair</li>
                          <li className="flex items-start gap-2 text-xs font-bold text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Additional Puncture: ₹100/- per tyre</li>
                        </ul>
                      </div>
                    </div>
                      
                    <div className="flex flex-col gap-2 mt-auto pt-4">
                      <button onClick={() => handleBookPackage('Puncture Repair')} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-2.5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 text-sm">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailsModalContent({name: 'Puncture Repair', details: packageDetailsData['Puncture Repair']})} className="w-full bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white py-2 rounded-xl font-black transition-all text-xs flex justify-center items-center">
                        View Technical Details
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>`;

content = content.replace(jumpStartEnd, newCard);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Added Puncture Repair package");
