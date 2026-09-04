const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Wrapper and padding
content = content.replace('className="relative z-10 w-full max-w-sm mx-auto lg:ml-auto"', 'className="relative z-10 w-full max-w-[300px] mx-auto lg:ml-auto"');
content = content.replace('rounded-[24px] p-5 sm:p-6 shadow-2xl relative overflow-hidden', 'rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden');

// 2. Titles
content = content.replace('<h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1.5 leading-tight">', '<h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-1 leading-tight">');
content = content.replace('<p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4">', '<p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">');

// 3. Toggle
const oldToggle = `<div className="flex bg-gray-100/80 dark:bg-[#222] p-1 rounded-xl mb-5 border border-gray-200/50 dark:border-white/5">
                          <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`flex-1 py-2.5 rounded-lg text-sm font-black transition-all \${heroVehicle === 'Bike' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}\`}>
                            🏍️ Bike
                          </button>
                          <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`flex-1 py-2.5 rounded-lg text-sm font-black transition-all \${heroVehicle === 'Scooter' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}\`}>
                            🛵 Scooter
                          </button>
                        </div>`;
const newToggle = `<div className="flex bg-gray-100/80 dark:bg-[#222] p-1 rounded-lg mb-3 border border-gray-200/50 dark:border-white/5">
                          <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`flex-1 py-1.5 rounded-md text-xs font-black transition-all \${heroVehicle === 'Bike' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}\`}>
                            🏍️ Bike
                          </button>
                          <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`flex-1 py-1.5 rounded-md text-xs font-black transition-all \${heroVehicle === 'Scooter' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}\`}>
                            🛵 Scooter
                          </button>
                        </div>`;
content = content.replace(oldToggle, newToggle);

// 4. Space
content = content.replace('<div className="space-y-3">', '<div className="space-y-2">');

// 5. Inputs
content = content.replaceAll('className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-[15px] sm:text-base placeholder:text-gray-400 placeholder:font-medium"',
                             'className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium"');

content = content.replaceAll('className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-[15px] sm:text-base appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium"',
                             'className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium"');


// 6. Icons
content = content.replaceAll('w-7 h-7 bg-white dark:bg-[#222]', 'w-5 h-5 bg-white dark:bg-[#222]');
content = content.replaceAll('<User className="w-4 h-4" />', '<User className="w-3 h-3" />');
content = content.replaceAll('<Smartphone className="w-4 h-4" />', '<Smartphone className="w-3 h-3" />');
content = content.replaceAll('<MapPin className="w-4 h-4" />', '<MapPin className="w-3 h-3" />');
content = content.replaceAll('<Wrench className="w-4 h-4" />', '<Wrench className="w-3 h-3" />');
content = content.replaceAll('<Clock className="w-4 h-4" />', '<Clock className="w-3 h-3" />');
content = content.replaceAll('left-3', 'left-2');

// 7. Button
const oldBtn = `<div className="mt-5">
                          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-3.5 rounded-xl font-black text-[16px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.25)] flex justify-center items-center gap-2 group">
                            Book Mechanic Now 
                            <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </button>
                          <p className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> No advance payment
                          </p>
                        </div>`;
const newBtn = `<div className="mt-3">
                          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-black text-[14px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.25)] flex justify-center items-center gap-1.5 group">
                            Book Mechanic Now 
                            <div className="w-4 h-4 bg-white/30 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                              <ArrowRight className="w-2.5 h-2.5" />
                            </div>
                          </button>
                          <p className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" /> No advance payment
                          </p>
                        </div>`;
content = content.replace(oldBtn, newBtn);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Form resized.");
