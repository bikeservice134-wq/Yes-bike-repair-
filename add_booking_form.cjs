const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const mainTag = '<main>';
const mainIndex = content.indexOf(mainTag);

if (mainIndex !== -1) {
    const newHero = `      {/* HERO WITH BOOKING FORM */}
      <section 
        id="home" 
        className="min-h-[700px] flex items-center relative overflow-hidden"
        style={{
          background: isDark ? 'linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.65)), radial-gradient(circle at 80% 40%, #5a4300, #111 45%, #000)' : 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), radial-gradient(circle at 80% 40%, #fff9e6, #ffffff 45%, #f9fafb)'
        }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Bike Mechanic" className="w-full h-full object-cover" />
        </div>
        
        <FadeIn>
        <div className="max-w-6xl w-full mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Two Wheeler Service <br className="hidden md:block"/>
              <span className="text-yellow-500">at Home</span>
            </h1>
            <p className="text-gray-600 dark:text-[#bdbdbd] text-lg md:text-[19px] max-w-[620px] mb-8">
              Professional two-wheeler servicing at your home in Bangalore.
              Book a verified mechanic online and get your vehicle fixed
              without visiting a service center.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" /> Doorstep Service
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" /> Transparent Pricing
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" /> 1 Month Warranty
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] p-6 sm:p-8 rounded-[24px] shadow-2xl relative">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book in 30 Seconds</h3>
            <p className="text-gray-500 dark:text-[#bdbdbd] text-sm mb-6">Get an instant quote and book your slot.</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              let errors = {};
              const phone = e.currentTarget.elements.namedItem('phone').value;
              if (phone.length !== 10) errors = { ...errors, phone: "Invalid 10-digit number" };
              if (!locationSearch) errors = { ...errors, location: "Please select a location" };
              
              if (Object.keys(errors).length > 0) {
                setHeroErrors(errors);
              } else {
                setHeroErrors({});
                setHeroSuccess(true);
              }
            }}>
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Vehicle Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-md scale-105' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333] hover:bg-gray-100 dark:hover:bg-[#222]'}\`}>🏍️ Bike</button>
                  <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-md scale-105' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333] hover:bg-gray-100 dark:hover:bg-[#222]'}\`}>🛵 Scooter</button>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location / Pincode</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="E.g., Koramangala, 560034" 
                    className={\`w-full pl-10 pr-4 py-3 rounded-xl border \${heroErrors.location ? 'border-red-500' : 'border-gray-200 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all\`}
                    value={locationSearch}
                    onChange={(e) => {
                      setLocationSearch(e.target.value);
                      setIsLocationDropdownOpen(true);
                      if (heroErrors.location) setHeroErrors({ ...heroErrors, location: undefined });
                    }}
                    onFocus={() => setIsLocationDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
                  />
                  {isLocationDropdownOpen && locationSearch.length > 1 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#222] border border-gray-200 dark:border-[#444] rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Jayanagar', 'JP Nagar', 'Bellandur', 'Marathahalli'].filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map((loc) => (
                        <div key={loc} className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#333] cursor-pointer text-gray-700 dark:text-gray-200 text-sm" onMouseDown={() => { setLocationSearch(loc); setIsLocationDropdownOpen(false); }}>
                          📍 {loc}, Bangalore
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {heroErrors.location && <p className="text-red-500 text-xs mt-1 font-medium">{heroErrors.location}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="10-digit mobile number" 
                    className={\`w-full pl-10 pr-4 py-3 rounded-xl border \${heroErrors.phone ? 'border-red-500' : 'border-gray-200 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all\`}
                    onChange={(e) => {
                      if (heroErrors.phone) setHeroErrors({ ...heroErrors, phone: undefined });
                    }}
                  />
                </div>
                {heroErrors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{heroErrors.phone}</p>}
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-4 rounded-xl font-black text-lg transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2">
                Check Prices <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        </FadeIn>
      </section>
`;

    content = content.substring(0, mainIndex + mainTag.length) + '\n' + newHero + content.substring(mainIndex + mainTag.length);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Hero with form added!");
} else {
    console.log("Could not find <main>");
}
