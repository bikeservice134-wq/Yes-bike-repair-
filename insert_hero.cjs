const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const mainTag = '<main>';
const mainIndex = content.indexOf(mainTag);

const newSection = `      {/* NEW HERO WITH EXTENDED BOOKING FORM */}
      <section 
        id="home" 
        className="min-h-[750px] flex items-center relative overflow-hidden py-16"
        style={{
          background: isDark ? 'linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.85)), radial-gradient(circle at 20% 50%, #5a4300, #111 45%, #000)' : 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), radial-gradient(circle at 20% 50%, #fff9e6, #ffffff 45%, #f9fafb)'
        }}
      >
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 md:opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Bike Mechanic" className="w-full h-full object-cover" />
        </div>
        
        <FadeIn>
        <div className="max-w-6xl w-full mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
          
          {/* LEFT: HIGHLIGHTS & TEXT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Book in <span className="text-yellow-500">30 Seconds.</span>
            </h1>
            <div className="space-y-4 mb-10 text-gray-600 dark:text-[#bdbdbd] text-lg md:text-xl font-medium">
              <p className="flex items-start gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                Certified mechanic at your doorstep in 30 minutes.
              </p>
              <p className="flex items-start gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                Services starting from ₹399.
              </p>
              <p className="flex items-start gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                30-day service warranty for complete peace of mind.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-100 dark:border-[#303030] p-6 rounded-2xl shadow-sm text-left inline-block w-full max-w-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-[#303030] pb-2">Service Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">👨‍🔧</span> Verified Mechanics
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">⚙️</span> Genuine Spare Parts
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">🛡️</span> 30-Day Warranty
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">₹</span> Transparent Pricing
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm sm:col-span-2">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">🏠</span> Doorstep Service
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT: BOOKING FORM */}
          <div className="order-1 lg:order-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] p-6 sm:p-8 rounded-[24px] shadow-2xl relative z-10 w-full mx-auto max-w-[450px]">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 text-center">Book Mechanic Now</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setHeroSuccess(true);
            }}>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`py-3 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}\`}>🏍️ Bike</button>
                <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`py-3 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}\`}>🛵 Scooter</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input type="text" required placeholder="John Doe" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Mobile No *</label>
                  <input type="tel" required pattern="[0-9]{10}" placeholder="10-digit mobile number" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Service Location (Search area) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      placeholder="E.g., Koramangala" 
                      className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Brand *</label>
                    <input type="text" required placeholder="e.g. Honda" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Model *</label>
                    <input type="text" required placeholder="e.g. Activa 6G" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Service *</label>
                  <select required className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Choose a service...</option>
                    <option value="general">General Service</option>
                    <option value="oil">Engine Oil Change</option>
                    <option value="breakdown">Breakdown Assistance</option>
                    <option value="battery">Battery Replacement</option>
                    <option value="tyre">Tyre / Puncture</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Time *</label>
                  <select required className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Preferred time slot...</option>
                    <option value="asap">As soon as possible</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-4 rounded-xl font-black text-[17px] transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2 mt-6">
                Book Mechanic Now <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        </FadeIn>
      </section>
`;

if (mainIndex !== -1) {
    content = content.substring(0, mainIndex + mainTag.length) + '\n' + newSection + content.substring(mainIndex + mainTag.length);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Hero successfully injected!");
}
