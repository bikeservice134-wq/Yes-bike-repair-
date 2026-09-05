const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Change grid columns to 3
content = content.replace('className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 max-w-6xl mx-auto"', 'className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8"');

// Fix the middle package design (General Service + Engine Oil) to match the layout better now that they are in 3 columns
const oldMidPackage = `<div className="bg-gray-900 border border-yellow-500/30 rounded-[32px] p-6 sm:p-8 flex flex-col w-full shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10 group-hover:bg-yellow-400/10 transition-colors"></div>
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-400/10 rounded-bl-full blur-2xl"></div>
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-1.5 rounded-b-xl text-[11px] font-black uppercase tracking-widest shadow-md z-10">
                      Most Popular
                    </div>`;

// Replace the Jump Start text to match heights better
const oldJumpStartP = `<p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-6">Get your bike started quickly with our doorstep jump-start service. No workshop visit, no waiting.</p>`;
const newJumpStartP = `<p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-6">Get your bike started quickly with our doorstep jump-start service. No workshop visit, no waiting.</p>`;


// Actually I'll write a full replacement for the whole grid to make them look uniform and premium.

const startMarker = `{/* General Service */}`;
const endMarker = `</div>
              <div className="mt-16 text-center">`;

if (content.includes(startMarker) && content.includes(endMarker)) {
    const beforeStart = content.substring(0, content.indexOf(startMarker));
    const afterEnd = content.substring(content.indexOf(endMarker) + endMarker.length);

    const replacement = `{/* General Service */}
                <FadeIn delay={100} className="flex">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex flex-col w-full hover:border-yellow-500/30 transition-all shadow-sm hover:shadow-xl relative h-full">
                    <div className="mb-6 flex-grow">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[56px]">General Bike Service</h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">₹699</div>
                        <div className="text-sm font-bold text-gray-400 line-through mb-1">₹899</div>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-xs font-black bg-green-50 dark:bg-green-500/10 inline-block px-3 py-1 rounded-md mb-6 tracking-wide uppercase">Offer Price: ₹699</p>
                      
                      <div className="space-y-2.5 mb-6 bg-gray-50 dark:bg-[#1A1A1A] p-4 rounded-xl border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-sm">🏠</div> 
                          At Your Doorstep
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-sm">🛡️</div> 
                          1 Month Warranty
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-sm">⏱️</div> 
                          ~60-90 Minutes
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-black text-gray-900 dark:text-white text-xs uppercase tracking-wider">What's Included</h4>
                        <ul className="space-y-2">
                          {['Complete Vehicle Inspection', 'Washing & Polishing', 'Brakes & Clutch Adjustment', 'Chain Tension Adjustment', 'Carburetor Cleaning / Tuning'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-auto pt-4">
                      <button onClick={() => { setSelectedPackage({name: 'General Bike Service', price: '₹699'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 text-sm">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailsModalContent({name: 'General Bike Service', details: packageDetailsData['General Bike Service']})} className="w-full bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white py-3 rounded-xl font-black transition-all text-xs flex justify-center items-center">
                        View Technical Details
                      </button>
                    </div>
                  </div>
                </FadeIn>

                {/* General Service + Engine Oil */}
                <FadeIn delay={200} className="flex">
                  <div className="bg-gray-900 border border-yellow-500/30 rounded-3xl p-6 flex flex-col w-full shadow-xl relative overflow-hidden group h-full">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10 group-hover:bg-yellow-400/10 transition-colors"></div>
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1 rounded-b-lg text-[9px] font-black uppercase tracking-widest shadow-md z-10">
                      Most Popular
                    </div>
                    
                    <div className="mb-6 flex-grow relative z-10 mt-2">
                      <h3 className="text-xl font-black text-white mb-2 flex items-start gap-2 line-clamp-2 min-h-[56px]"><span className="text-xl leading-tight">🏍️</span> <span className="leading-tight">General Service + Engine Oil</span></h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-3xl font-black text-yellow-400 tracking-tight">₹1,249</div>
                        <div className="text-sm font-bold text-gray-500 line-through mb-1">₹1,500</div>
                      </div>
                      <p className="text-gray-300 text-xs font-semibold mb-6">Premium doorstep service with full oil change.</p>
                      
                      <div className="space-y-2.5 mb-6 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shadow-sm text-sm">🛢️</div> 
                          Semi-Synthetic Engine Oil
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shadow-sm text-sm">🏠</div> 
                          At Your Doorstep
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shadow-sm text-sm">🛡️</div> 
                          1 Month Warranty
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-black text-white text-xs uppercase tracking-wider">What's Included</h4>
                        <ul className="space-y-2">
                          {['Everything in General Service', 'Engine Oil Change', 'Oil Filter Replacement (if applicable)', 'Engine Flushing (if needed)'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-auto pt-4 relative z-10">
                      <button onClick={() => { setSelectedPackage({name: 'General Service + Engine Oil', price: '₹1,249'}); setIsPackageModalOpen(true); }} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black py-3.5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.4)] flex justify-center items-center gap-2 text-sm">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailsModalContent({name: 'General Service + Engine Oil', details: packageDetailsData['General Service + Engine Oil']})} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-black transition-all text-xs flex justify-center items-center backdrop-blur-sm">
                        View Technical Details
                      </button>
                    </div>
                  </div>
                </FadeIn>

                {/* Jump Start */}
                <FadeIn delay={300} className="flex">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex flex-col w-full hover:border-yellow-500/30 transition-all shadow-sm hover:shadow-xl relative h-full">
                    <div className="mb-6 flex-grow">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 flex items-start gap-2 line-clamp-2 min-h-[56px]"><span className="text-xl leading-tight">⚡</span> <span className="leading-tight">Jump Start Service</span></h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">₹399</div>
                        <div className="text-sm font-bold text-gray-400 line-through mb-1">₹600</div>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-xs font-black bg-green-50 dark:bg-green-500/10 inline-block px-3 py-1 rounded-md mb-6 tracking-wide uppercase">Special Price: ₹399</p>
                      
                      <div className="space-y-2.5 mb-6 bg-gray-50 dark:bg-[#1A1A1A] p-4 rounded-xl border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-sm">🏠</div> 
                          At Your Doorstep
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-sm">⏱️</div> 
                          Arrives in ~20 Mins
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-black text-gray-900 dark:text-white text-xs uppercase tracking-wider">What's Included</h4>
                        <ul className="space-y-2">
                          {['Immediate Battery Jump Start', 'Battery Voltage Testing', 'Charging System Check', 'Terminals Cleaning'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-auto pt-4">
                      <button onClick={() => { setSelectedPackage({name: 'Jump Start Service', price: '₹399'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 text-sm">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailsModalContent({name: 'Jump Start Service', details: packageDetailsData['Jump Start Service']})} className="w-full bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white py-3 rounded-xl font-black transition-all text-xs flex justify-center items-center">
                        View Technical Details
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <div className="mt-16 text-center">`;

    content = beforeStart + replacement + afterEnd;
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Packages layout improved.");
} else {
    console.log("Markers not found");
}
