const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `<div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 md:p-12 border-2 border-yellow-500 shadow-xl relative overflow-hidden">`;
const targetEnd = `              <div className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] bg-orange-500 opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            </div>`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Not found");
    process.exit(1);
}

const targetBlock = content.substring(startIndex, endIndex + targetEnd.length);

const newContent = `
            <div className="overflow-hidden relative -mx-5 px-5 md:mx-0 md:px-0">
              {/* Fade masks for smooth edges */}
              <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-[#101010] z-20 pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-[#101010] z-20 pointer-events-none"></div>

              <div className="flex w-max gap-6 animate-scroll hover:[animation-play-state:paused] py-4">
                {/* We double the packages for infinite scroll effect */}
                {[...Array(2)].map((_, loopIdx) => (
                  <React.Fragment key={loopIdx}>
                    {/* FEATURED SERVICE 1: General Service */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border-2 border-yellow-500 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-yellow-500 text-black px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        🏍️ FEATURED PACKAGE
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        General Bike Service
                      </h2>
                      <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-500 mb-4">
                        Complete Service at Your Doorstep
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🛡️</span> 1 Month Warranty
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⏱️</span> Takes ~2 Hours
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹699</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹899</span>
                        </div>
                      </div>
                      <a href="#home" className="block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </a>
                    </div>

                    {/* FEATURED SERVICE 2: With Engine Oil */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#18181b] rounded-3xl p-6 md:p-8 border-2 border-red-500/20 dark:border-red-500/30 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        ⭐ BEST VALUE
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        Service + Engine Oil
                      </h2>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        General Service + Motul Oil Change
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🛢️</span> Premium Engine Oil
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🛡️</span> 1 Month Warranty
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹1,249</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹1,500</span>
                        </div>
                      </div>
                      <a href="#home" className="block bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </a>
                    </div>

                    {/* FEATURED SERVICE 3: Jump Start */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#1d1d1d] rounded-3xl p-6 md:p-8 border-2 border-red-500/20 dark:border-red-500/30 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        ⚡ EMERGENCY
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        Jump Start Service
                      </h2>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Quick Battery Jump Start
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⚡</span> Quick & Reliable
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⏱️</span> 30 Mins Service Time
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹399</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹600</span>
                        </div>
                      </div>
                      <a href="#home" className="block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </a>
                    </div>

                    {/* FEATURED SERVICE 4: Puncture Repair */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#1d1d1d] rounded-3xl p-6 md:p-8 border-2 border-orange-500/20 dark:border-orange-500/30 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        🛞 TYRE SERVICE
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        Puncture Repair
                      </h2>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Quick Doorstep Service
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⏱️</span> Takes 30 mins
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>➕</span> ₹100 extra per added puncture
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹599</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹750</span>
                        </div>
                      </div>
                      <a href="#home" className="block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </a>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>`;

content = content.replace(targetBlock, newContent);
fs.writeFileSync('src/App.tsx', content);
console.log("Replaced successfully!");
