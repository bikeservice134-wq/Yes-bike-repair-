const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = '<div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] p-5 sm:p-8 rounded-[20px] shadow-2xl backdrop-blur-sm relative">';
const endMarker = '          </div>\n        </div>\n                    </FadeIn>\n      </section>';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers', startIndex, endIndex);
    process.exit(1);
}

const replacement = `<div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] p-5 sm:p-8 rounded-[20px] shadow-2xl backdrop-blur-sm relative">
            <div className="text-center mb-6">
              <h3 className="text-gray-900 dark:text-white text-[22px] font-black flex items-center justify-center gap-2 mb-1">
                <Wrench className="w-5 h-5 text-yellow-500" /> BOOK YOUR BIKE SERVICE
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">Book in 30 seconds</p>
            </div>

            <form onSubmit={handleQuickBook} className="space-y-4">
              
              {/* Bike Brand & Model */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                  <span className="text-yellow-500 text-base">🚲</span> Bike
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select name="brand" required
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'%236b7280\\'%3E%3Cpath stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M19 9l-7 7-7-7\\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}>
                    <option value="">Select Brand</option>
                    <option>Honda</option>
                    <option>Hero</option>
                    <option>Bajaj</option>
                    <option>TVS</option>
                    <option>Yamaha</option>
                    <option>Royal Enfield</option>
                    <option>Suzuki</option>
                    <option>KTM</option>
                  </select>
                  <select name="model" required
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'%236b7280\\'%3E%3Cpath stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M19 9l-7 7-7-7\\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}>
                    <option value="">Select Model</option>
                    <option>Activa</option>
                    <option>Splendor</option>
                    <option>Pulsar</option>
                    <option>Jupiter</option>
                    <option>Classic 350</option>
                    <option>Other / Not sure</option>
                  </select>
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                  <span className="text-yellow-500 text-base">🛠️</span> What do you need?
                </label>
                <select name="service" required
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'%236b7280\\'%3E%3Cpath stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M19 9l-7 7-7-7\\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}>
                  <option value="">Select Service</option>
                  <option>₹699 General servicing</option>
                  <option>₹399 Basic servicing</option>
                  <option>₹1,339 Full Service</option>
                  <option>₹999 Jump Start</option>
                  <option>₹999 Puncture Repair</option>
                  <option>Repair / Other</option>
                </select>
              </div>

              {/* Location */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                  <span className="text-yellow-500 text-base">📍</span> Your Location
                </label>
                <input type="text" name="location" required placeholder="Enter your location"
                  value={locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setIsLocationDropdownOpen(true);
                    if (heroErrors.location) {
                      setHeroErrors({...heroErrors, location: undefined});
                    }
                  }}
                  onFocus={() => setIsLocationDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
                  autoComplete="off"
                  className={\`w-full p-[13px] rounded-lg border \${heroErrors.location ? 'border-yellow-400' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm\`} />
                {heroErrors.location && <p className="text-yellow-400 text-sm mt-1">{heroErrors.location}</p>}
                
                {isLocationDropdownOpen && locationSearch.trim().length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {AVAILABLE_LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map(loc => (
                      <li
                        key={loc}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer text-gray-900 dark:text-white text-sm border-b border-gray-100 dark:border-[#2a2a2a] last:border-0"
                        onMouseDown={() => {
                          setLocationSearch(loc);
                          setIsLocationDropdownOpen(false);
                          setHeroErrors({...heroErrors, location: undefined});
                        }}
                      >
                        {loc}
                      </li>
                    ))}
                    {AVAILABLE_LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).length === 0 && (
                      <li className="px-4 py-3 text-gray-500 text-sm">We currently do not operate in this area.</li>
                    )}
                  </ul>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                    <span className="text-yellow-500 text-base">📅</span> Date
                  </label>
                  <select name="dateSlot" required
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'%236b7280\\'%3E%3Cpath stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M19 9l-7 7-7-7\\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}>
                    <option value="">Select Date</option>
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>Day after tomorrow</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                    <span className="text-yellow-500 text-base">⏰</span> Time
                  </label>
                  <select name="timeSlot" required value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke=\\'%236b7280\\'%3E%3Cpath stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M19 9l-7 7-7-7\\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}>
                    <option value="">Select Time</option>
                    <option>Morning (9-12)</option>
                    <option>Afternoon (12-4)</option>
                    <option>Evening (4-8)</option>
                  </select>
                </div>
              </div>

              {/* Add Photo */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                  <span className="text-yellow-500 text-base">📷</span> Add Photo of Issue <span className="text-gray-400 font-normal text-[11px] uppercase tracking-wider">(Optional)</span>
                </label>
                <div className="relative">
                  <input type="file" name="photo" accept="image/*"
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-gray-400 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 cursor-pointer" />
                </div>
              </div>

              {/* Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                    <span className="text-yellow-500 text-base">👤</span> Name
                  </label>
                  <input type="text" name="name" required placeholder="Your Name" 
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm" />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-2">
                    <span className="text-yellow-500 text-base">📱</span> Mobile
                  </label>
                  <input type="tel" name="phone" required placeholder="+91" 
                    pattern="[0-9]{10}" maxLength={10}
                    className={\`w-full p-[13px] rounded-lg border \${heroErrors.phone ? 'border-yellow-400' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm\`} />
                  {heroErrors.phone && <p className="text-yellow-400 text-sm mt-1">{heroErrors.phone}</p>}
                </div>
              </div>

              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-4 rounded-xl font-black text-lg transition-all flex justify-center items-center gap-2 mt-2 shadow-[0_5px_15px_rgba(234,179,8,0.3)] hover:shadow-[0_8px_25px_rgba(234,179,8,0.4)] hover:-translate-y-0.5 border-b-4 border-yellow-600 hover:border-yellow-700 active:border-b-0 active:translate-y-1">
                🟡 BOOK NOW
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-[#303030] flex items-center justify-center gap-6">
              <span className="flex items-center gap-1.5 text-sm font-bold text-gray-600 dark:text-[#e0e0e0]">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Verified Mechanic
              </span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-gray-600 dark:text-[#e0e0e0]">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Doorstep Service
              </span>
            </div>
`;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync('src/App.tsx', newContent);
