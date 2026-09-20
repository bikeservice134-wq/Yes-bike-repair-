import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

new_form = """
                <div id="booking-form" className="order-2 lg:order-2 w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-0 relative z-20 mt-8 lg:mt-0">
                  <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/30 to-yellow-600/10 blur-2xl rounded-[2.5rem] pointer-events-none opacity-70"></div>
                  
                  <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl rounded-[2rem] p-6 shadow-2xl dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] border border-white/50 dark:border-zinc-700/50 relative overflow-hidden">
                    {/* Subtle top glare */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-50"></div>
                    
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center z-20 group cursor-default">
                      <div className="absolute inset-0 bg-yellow-500/20 blur-md rounded-full group-hover:bg-yellow-500/30 transition-colors duration-500"></div>
                      <div className="relative bg-zinc-900/95 dark:bg-black/95 text-white text-[10px] font-black uppercase tracking-[0.15em] py-1.5 px-4 rounded-full shadow-lg border border-white/10 flex items-center gap-2.5 backdrop-blur-xl">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                        </span>
                        <span className="text-yellow-400">Mechanic in 20 Mins</span>
                      </div>
                    </div>

                    <div className="text-center mb-6 mt-4">
                      <h3 className="text-[22px] md:text-[24px] font-black tracking-tight text-gray-900 dark:text-white leading-tight mb-1.5">
                        Book Mechanic Now
                      </h3>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">
                        Honest pricing starting from ₹399
                      </p>
                    </div>

                    <form className="space-y-4 relative z-10" onSubmit={handleBookService}>
                      {/* Segmented Control */}
                      <div className="flex p-1 bg-gray-100/80 dark:bg-zinc-800/80 rounded-[14px]">
                        <button
                          type="button"
                          onClick={() => setHeroVehicle('Bike')}
                          className={`flex-1 text-[13px] font-bold py-2 rounded-[10px] transition-all duration-300 flex items-center justify-center gap-2 ${
                            heroVehicle === 'Bike'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          🏍️ Bike
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeroVehicle('Scooter')}
                          className={`flex-1 text-[13px] font-bold py-2 rounded-[10px] transition-all duration-300 flex items-center justify-center gap-2 ${
                            heroVehicle === 'Scooter'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          🛵 Scooter
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <User className="h-4 w-4" />
                          </div>
                          <input type="text" name="name" required placeholder="Full Name" className="w-full pl-9 pr-3 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold placeholder:font-medium placeholder:text-gray-400" />
                        </div>
                        
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Phone className="h-4 w-4" />
                          </div>
                          <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Phone Number" className="w-full pl-9 pr-3 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold placeholder:font-medium placeholder:text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Tag className="h-4 w-4" />
                          </div>
                          <select name="brand" required value={heroBrand} onChange={(e) => setHeroBrand(e.target.value)} className="w-full pl-9 pr-8 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold appearance-none cursor-pointer">
                             <option value="" disabled>Brand</option>
                             {Object.keys(MODELS_BY_BRAND).map(brand => (
                               <option key={brand} value={brand}>{brand}</option>
                             ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Bike className="h-4 w-4" />
                          </div>
                          <select name="model" required defaultValue="" className="w-full pl-9 pr-8 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold appearance-none cursor-pointer disabled:opacity-50" disabled={!heroBrand}>
                             <option value="" disabled>Model</option>
                             {heroBrand && MODELS_BY_BRAND[heroBrand]?.map(model => (
                               <option key={model} value={model}>{model}</option>
                             ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <input type="text" name="location" required placeholder="Service Location, Bengaluru" className="w-full pl-9 pr-3 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold placeholder:font-medium placeholder:text-gray-400" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                          <Wrench className="h-4 w-4" />
                        </div>
                        <select name="service" required defaultValue="" className="w-full pl-9 pr-8 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold appearance-none cursor-pointer">
                           <option value="" disabled>Select Service Type</option>
                           <option value="Gen. Service - ₹699">Gen. Service - ₹699</option>
                           <option value="Serv. + Oil - 1,349">Serv. + Oil - 1,349</option>
                           <option value="Jump Start - ₹399">Jump Start - ₹399</option>
                           <option value="Puncture Repair - ₹599">Puncture Repair - ₹599</option>
                           <option value="Running Repair - 399">Running Repair - 399</option>
                           <option value="Other Issue">Other Issue</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>

                      <button type="submit" className="w-full relative group overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-yellow-500 dark:hover:bg-yellow-400 font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-5">
                        <span className="relative z-10 flex items-center gap-2">
                          Book Mechanic Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                      
                      <div className="pt-2 pb-1 flex justify-center w-full">
                        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wide flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-emerald-500" />
                          No advance payment
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
"""

pattern = r'<div id="booking-form" className="order-2 lg:order-2 w-full max-w-\[260px\].*?</form>\s*</div>\s*</div>'
content = re.sub(pattern, new_form, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

