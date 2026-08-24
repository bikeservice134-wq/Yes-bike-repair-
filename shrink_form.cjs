const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the form container
const oldFormContainerPattern = /<div className="bg-white dark:bg-\[#1d1d1d\] border border-gray-200 dark:border-\[#303030\] p-5 sm:p-8 rounded-\[20px\] shadow-2xl backdrop-blur-sm relative">[\s\S]*?<\/form>\s*<\/div>/;

const newFormContent = `<div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-sm relative">
            <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2">Book in 30 Seconds</h3>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
              Verified mechanics • Services from ₹399 • 30-day warranty
            </p>

            <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-md mb-4 border border-gray-200 dark:border-[#303030]">
              {['Bike', 'Scooter', 'Car'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setHeroVehicle(type)}
                  className={\`flex-1 py-1.5 text-xs font-bold rounded transition-all \${heroVehicle === type ? 'bg-white dark:bg-[#1d1d1d] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-[#444]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}\`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleQuickBook} className="space-y-2.5">
              <input type="hidden" name="vehicle" value={heroVehicle} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input type="text" name="name" required placeholder="Full Name *" 
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm" />
                <div>
                  <input type="tel" name="phone" required placeholder="Mobile No *"
                    pattern="[0-9]{10}" maxLength={10}
                    className={\`w-full p-2.5 rounded-lg border \${heroErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm\`} />
                  {heroErrors.phone && <p className="text-red-500 text-xs mt-1">{heroErrors.phone}</p>}
                </div>
              </div>

              <div className="relative">
                <input type="text" name="location" required placeholder="Service Location (Search area) *"
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
                  className={\`w-full p-2.5 rounded-lg border \${heroErrors.location ? 'border-red-500' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm\`} />
                {heroErrors.location && <p className="text-red-500 text-xs mt-1">{heroErrors.location}</p>}
                
                {isLocationDropdownOpen && locationSearch.trim().length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {AVAILABLE_LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map(loc => (
                      <li
                        key={loc}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer text-gray-900 dark:text-white text-xs border-b border-gray-100 dark:border-[#2a2a2a] last:border-0"
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
                      <li className="px-3 py-2 text-gray-500 text-xs">We currently do not operate in this area.</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input type="text" name="brand" required placeholder="Brand (e.g. Honda) *" 
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm" />
                <input type="text" name="model" required placeholder="Model *" 
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <select name="service" required
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm">
                  <option value="">Select Service *</option>
                  <option>₹699 General servicing</option>
                  <option>₹399 Basic servicing</option>
                  <option>Repair / Other</option>
                </select>

                <select name="timeSlot" required
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-sm">
                  <option value="">Select Time *</option>
                  <option>Morning (9-12)</option>
                  <option>Afternoon (12-4)</option>
                  <option>Evening (4-8)</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-bold transition-colors text-sm flex justify-center items-center gap-2 mt-1">
                <Wrench className="w-4 h-4" /> Book Mechanic Now
              </button>
            </form>
          </div>`;

content = content.replace(oldFormContainerPattern, newFormContent);
fs.writeFileSync('src/App.tsx', content);
