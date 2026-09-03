const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const pricingSection = `
          {/* PRICING / PACKAGES */}
          <section id="pricing" className="py-24 px-5 bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                    Our Popular <span className="text-yellow-500 dark:text-yellow-400">Packages</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-lg">No hidden costs. Just honest, upfront pricing for all services.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                  {/* Pkg 1 */}
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] border border-gray-200 dark:border-[#333] p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">General Bike Service</h3>
                    <div className="text-3xl font-black text-yellow-600 dark:text-yellow-500 mb-2">₹699 <span className="text-lg text-gray-400 line-through font-medium ml-2">₹899</span></div>
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-500 mb-4">Offer Price: ₹699</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">🏠 Available at Your Doorstep</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">🛡️ 500 Kms or 1 Month Warranty</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">🔧 Recommended Every 3,000 Kms or 3 Months</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">⏱️ Service Time: 2 Hours</li>
                    </ul>
                    
                    <p className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Service Includes:</p>
                    <ul className="mb-8 flex-1 grid grid-cols-1 gap-2">
                      {[
                        'Air Filter Cleaning', 'Battery Voltage Check', 'Brake Service',
                        'Cables & Levers Adj.', 'Chain Tension Check', 'Clutch Greasing',
                        'Dry Wash', 'Electrical Check-up', 'Engine Oil Check',
                        'Greasing & Lube', 'Oil Leakage Check', 'Spark Plug Cleaning'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'General Bike Service', price: '₹699'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-100 dark:bg-[#2a2a2a] hover:bg-yellow-500 dark:hover:bg-yellow-500 text-gray-900 dark:text-white hover:text-black px-4 py-3 rounded-xl font-bold transition-colors mt-auto">Select Package</button>
                  </div>
                  
                  {/* Pkg 2 */}
                  <div className="bg-gray-900 dark:bg-[#161616] rounded-[24px] border-2 border-yellow-500 p-8 flex flex-col shadow-[0_8px_30px_rgba(234,179,8,0.15)] relative transform xl:-translate-y-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">🏍️ General Service + Engine Oil</h3>
                    <div className="text-3xl font-black text-yellow-400 mb-2">₹1,249 <span className="text-lg text-gray-500 line-through font-medium ml-2">₹1,500</span></div>
                    <p className="text-sm font-medium text-gray-300 mb-6 leading-relaxed">Professional doorstep bike service with engine oil change.</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium">✓ Available at Your Doorstep</li>
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium">✓ 500 Kms or 1 Month Warranty</li>
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium">✓ Recommended Every 3,000 Kms or 3 Months</li>
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium"><Clock className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /> Service Time: Approx. 2 Hours</li>
                    </ul>
                    <p className="font-bold text-white mb-3 text-sm">Service Includes:</p>
                    <ul className="mb-8 flex-1 grid grid-cols-1 gap-2">
                      {[
                        'Air Filter Cleaning', 'Battery Voltage Check', 'Brake Service',
                        'Cables & Levers Adj.', 'Chain Tension Check', 'Clutch Greasing',
                        'Dry Wash', 'Electrical Check-up', 'Engine Oil Change',
                        'Greasing & Lube', 'Oil Leakage Check', 'Spark Plug Cleaning'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'General Service + Engine Oil', price: '₹1,249'}); setIsPackageModalOpen(true); }} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-4 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] mt-auto">Book Now →</button>
                  </div>
                  
                  {/* Pkg 3 */}
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] border border-gray-200 dark:border-[#333] p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">⚡ Jump Start Service</h3>
                    <div className="text-3xl font-black text-yellow-600 dark:text-yellow-500 mb-2">₹399 <span className="text-lg text-gray-400 line-through font-medium ml-2">₹600</span></div>
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-500 mb-4">Special Price: ₹399</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-6 leading-relaxed">Get your bike started quickly with our doorstep jump-start service. No workshop visit, no waiting.</p>
                    <ul className="space-y-4 mb-8 flex-1">
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Available at Your Doorstep</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><Clock className="w-5 h-5 text-yellow-500 shrink-0" /> 20 Minutes Approx.</li>
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'Jump Start Service', price: '₹399'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-100 dark:bg-[#2a2a2a] hover:bg-yellow-500 dark:hover:bg-yellow-500 text-gray-900 dark:text-white hover:text-black px-4 py-3 rounded-xl font-bold transition-colors">Book Jump Start</button>
                  </div>
                  
                  {/* Pkg 4 */}
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] border border-gray-200 dark:border-[#333] p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">🛞 Puncture Repair</h3>
                    <div className="text-3xl font-black text-yellow-600 dark:text-yellow-500 mb-6">₹599 <span className="text-lg text-gray-400 line-through font-medium ml-2">₹750</span></div>
                    <p className="font-bold text-gray-900 dark:text-white mb-4">Service Includes</p>
                    <ul className="space-y-4 mb-8 flex-1">
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Available at Your Doorstep</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><Clock className="w-5 h-5 text-yellow-500 shrink-0" /> Takes only 20 minutes</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> One Tyre Puncture Repair</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><span className="text-yellow-500 font-black text-lg leading-none shrink-0 mt-0">+</span> ₹100 extra for each additional puncture</li>
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'Puncture Repair', price: '₹599'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-100 dark:bg-[#2a2a2a] hover:bg-yellow-500 dark:hover:bg-yellow-500 text-gray-900 dark:text-white hover:text-black px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">🚀 Checkout</button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>
`;

const insertIndex = content.indexOf('{/* COVERAGE SECTION */}');
if (insertIndex !== -1) {
  content = content.slice(0, insertIndex) + pricingSection + '\n          ' + content.slice(insertIndex);
  fs.writeFileSync('src/App.tsx', content, 'utf-8');
  console.log('Restored Full Pricing Section');
} else {
  console.error('Could not find COVERAGE SECTION');
}
