const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetContent1 = `              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input type="text" name="fullName" required placeholder="John Doe" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Mobile No *</label>
                  <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
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
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Brand *</label>
                    <input type="text" name="brand" required placeholder="e.g. Honda" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Model *</label>
                    <input type="text" name="model" required placeholder="e.g. Activa 6G" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Service *</label>
                  <select name="service" required className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Choose a service...</option>
                    <option value="General Bike Service ₹699">General Bike Service ₹699</option>
                    <option value="General Service with Engine Oil ₹1,249">General Service with Engine Oil ₹1,249</option>
                    <option value="Jump Start Service ₹399">Jump Start Service ₹399</option>
                    <option value="Puncture Repair ₹599">Puncture Repair ₹599</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Time *</label>
                  <select name="time" required className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Preferred time slot...</option>
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>`;

const replacement1 = `              <div className="space-y-4">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <input type="text" name="fullName" required placeholder="Full Name *" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Mobile No *" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                </div>

                {/* Location */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <input type="text" required placeholder="Service Location (e.g. Koramangala) *" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
                </div>

                {/* Brand & Model */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Settings className="h-5 w-5" />
                    </div>
                    <input type="text" name="brand" required placeholder="Brand *" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Bike className="h-5 w-5" />
                    </div>
                    <input type="text" name="model" required placeholder="Model *" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                </div>

                {/* Service & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <select name="service" required className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium appearance-none cursor-pointer">
                      <option value="">Select Service...</option>
                      <option value="General Bike Service ₹699">General Bike Service ₹699</option>
                      <option value="General Service with Engine Oil ₹1,249">General Service with Engine Oil ₹1,249</option>
                      <option value="Jump Start Service ₹399">Jump Start Service ₹399</option>
                      <option value="Puncture Repair ₹599">Puncture Repair ₹599</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Clock className="h-5 w-5" />
                    </div>
                    <select name="time" required className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium appearance-none cursor-pointer">
                      <option value="">Preferred Time...</option>
                      <option value="As soon as possible">As soon as possible</option>
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>`;

if(content.includes(targetContent1)) {
  content = content.replace(targetContent1, replacement1);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated form 1 successfully!");
} else {
  console.log("Could not find target content 1");
}

