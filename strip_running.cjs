const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const strToRemove = `                {/* Running Repair */}
                <FadeIn delay={500} className="flex">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-[32px] p-6 sm:p-8 flex flex-col w-full hover:border-yellow-500/30 transition-all shadow-sm hover:shadow-xl relative">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">⏱️ Running Repair</h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹399</div>
                        <div className="text-lg font-bold text-gray-400 line-through mb-1">₹600</div>
                      </div>
                      
                      <div className="space-y-2.5 mb-6 bg-gray-50 dark:bg-[#1A1A1A] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">🏠</div> 
                          Available at Your Doorstep
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">⏱️</div> 
                          Approx. 30 Minutes
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-wider">What's Included</h4>
                        <ul className="space-y-3">
                          {['Complete Vehicle Inspection', 'On-the-Spot Running Repairs', 'Repairs & Parts Charged Separately'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                      <button onClick={() => { setSelectedPackage({name: 'Running Repair', price: '₹399'}); setIsPackageModalOpen(true); }} className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailsModalContent({name: 'Running Repair', details: packageDetailsData['Running Repair']})} className="flex-1 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white py-4 rounded-xl font-black transition-all text-sm flex justify-center items-center">
                        View Technical Details
                      </button>
                    </div>
                  </div>
                </FadeIn>`;

if (content.includes(strToRemove)) {
    content = content.replace(strToRemove, '');
    console.log("Running repair package card removed.");
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
} else {
    console.log("Could not find Running Repair card.");
}
