import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

new_packages_html = """
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            {/* Pkg 1: General Service */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 h-full relative group hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Wrench className="w-24 h-24" />
              </div>
              <div className="relative z-10 mb-6 mt-2">
                <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-500/20 transition-colors duration-300">
                  <Wrench className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">General Service</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Standard maintenance for peak performance.</p>
              </div>
              <div className="relative z-10 flex items-end gap-2 mb-8 pb-8 border-b border-gray-100 dark:border-zinc-800/50">
                <div className="text-4xl font-black text-gray-900 dark:text-white">₹699</div>
                <div className="text-lg font-medium text-gray-400 line-through mb-1.5">₹899</div>
              </div>
              
              <div className="relative z-10 mb-8 flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Complete Vehicle Inspection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Foam Wash & Polishing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Brakes & Clutch Adjustment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Chain Tension Adjustment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Carburetor Cleaning / Tuning</span>
                  </li>
                </ul>
              </div>
              <div className="relative z-10 mt-auto flex flex-col gap-3">
                <button onClick={() => { setSelectedPackage({ name: 'General Service', price: '₹699' }); setIsPackageModalOpen(true); }} className="w-full relative group/btn overflow-hidden bg-gray-900 dark:bg-white hover:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-black font-bold text-[14px] py-4 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                  <span className="relative z-10 flex items-center gap-2">Book Service</span>
                </button>
                <button onClick={() => { setTechnicalDetailsContent({ title: 'General Service', steps: ['Complete Vehicle Inspection', 'Washing & Polishing', 'Brakes & Clutch Adjustment', 'Chain Tension Adjustment', 'Carburetor Cleaning / Tuning', 'Electrical System Check', 'Tyre Pressure Check'] }); setIsTechnicalDetailsOpen(true); }} className="w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors py-2">
                  View Technical Details
                </button>
              </div>
            </div>

            {/* Pkg 2: General Service + Engine Oil */}
            <div className="bg-zinc-950 dark:bg-zinc-900 rounded-3xl border-2 border-yellow-500 p-8 flex flex-col shadow-2xl shadow-yellow-500/20 h-full relative group hover:-translate-y-1 transition-all duration-300 overflow-hidden transform md:-translate-y-4 md:hover:-translate-y-5">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Settings className="w-24 h-24 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none"></div>
              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-black text-[10px] uppercase tracking-[0.2em] py-1.5 px-5 rounded-full shadow-lg whitespace-nowrap">
                Most Popular
              </div>
              
              <div className="relative z-10 mb-6 mt-2">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-5">
                  <Settings className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white mb-2">Service + Engine Oil</h3>
                <p className="text-gray-400 text-sm font-medium">Premium doorstep service with full oil change.</p>
              </div>
              <div className="relative z-10 flex items-end gap-2 mb-8 pb-8 border-b border-white/10">
                <div className="text-4xl font-black text-white">₹1,349</div>
                <div className="text-lg font-medium text-gray-500 line-through mb-1.5">₹1,500</div>
              </div>
              
              <div className="relative z-10 mb-8 flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-yellow-500/20 rounded-full p-0.5 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-200 font-medium text-sm">Everything in General Service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-yellow-500/20 rounded-full p-0.5 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    </div>
                    <span className="text-white font-bold text-sm">Premium Engine Oil Change</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-yellow-500/20 rounded-full p-0.5 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-200 font-medium text-sm">Oil Filter Replacement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-yellow-500/20 rounded-full p-0.5 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-200 font-medium text-sm">Engine Flushing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-yellow-500/20 rounded-full p-0.5 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-200 font-medium text-sm">Spark Plug Check/Replace</span>
                  </li>
                </ul>
              </div>
              <div className="relative z-10 mt-auto flex flex-col gap-3">
                <button onClick={() => { setSelectedPackage({ name: 'General Service + Engine Oil', price: '₹1,349' }); setIsPackageModalOpen(true); }} className="w-full relative overflow-hidden bg-yellow-500 hover:bg-yellow-400 text-black font-black text-[14px] py-4 px-4 rounded-xl shadow-[0_4px_14px_rgba(234,179,8,0.4)] hover:shadow-[0_6px_25px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                  <span className="relative z-10 flex items-center gap-2">Book Service Now <ArrowRight className="w-4 h-4" /></span>
                </button>
                <button onClick={() => { setTechnicalDetailsContent({ title: 'General Service + Engine Oil', steps: ['Everything in General Service', 'Engine Oil Change', 'Oil Filter Replacement (if applicable)', 'Engine Flushing (if needed)', 'Spark Plug Check/Replace'] }); setIsTechnicalDetailsOpen(true); }} className="w-full text-center text-xs font-semibold text-gray-400 hover:text-white transition-colors py-2">
                  View Technical Details
                </button>
              </div>
            </div>

            {/* Pkg 3: Jump Start */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300 h-full relative group hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-24 h-24" />
              </div>
              <div className="relative z-10 mb-6 mt-2">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Zap className="w-6 h-6 text-orange-500 transition-colors" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Jump Start Service</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Fast emergency battery revival.</p>
              </div>
              <div className="relative z-10 flex items-end gap-2 mb-8 pb-8 border-b border-gray-100 dark:border-zinc-800/50">
                <div className="text-4xl font-black text-gray-900 dark:text-white">₹399</div>
                <div className="text-lg font-medium text-gray-400 line-through mb-1.5">₹600</div>
              </div>
              
              <div className="relative z-10 mb-8 flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Immediate Battery Jump Start</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Battery Voltage Testing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Charging System Check</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Terminals Cleaning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Fast 20 Min Arrival</span>
                  </li>
                </ul>
              </div>
              <div className="relative z-10 mt-auto flex flex-col gap-3">
                <button onClick={() => { setSelectedPackage({ name: 'Jump Start Service', price: '₹399' }); setIsPackageModalOpen(true); }} className="w-full relative group/btn overflow-hidden bg-gray-900 dark:bg-white hover:bg-orange-500 text-white dark:text-black hover:text-white dark:hover:text-black font-bold text-[14px] py-4 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                  <span className="relative z-10 flex items-center gap-2">Book Service</span>
                </button>
                <button onClick={() => { setTechnicalDetailsContent({ title: 'Jump Start Service', steps: ['Immediate Battery Jump Start', 'Battery Voltage Testing', 'Charging System Check', 'Terminals Cleaning'] }); setIsTechnicalDetailsOpen(true); }} className="w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors py-2">
                  View Technical Details
                </button>
              </div>
            </div>
"""

pattern = r'<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch">.*?</button>\s*</div>\s*</div>\s*</div>'
content = re.sub(pattern, new_packages_html, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

