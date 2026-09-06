const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Update the message format in both forms
content = content.replace(
  /const message = \`🏍️🛵 NEW BOOKING\\n\\n👤 Name: \${formData\.get\('fullName'\)}\\n📞 Phone: \${formData\.get\('phone'\)}\\n📍 Location: \${formData\.get\('location'\)}\\n🏍️ Vehicle Type: \${heroVehicle}\\n🔧 Service/g,
  `const message = \`🏍️🛵 NEW BOOKING\\n\\n👤 Name: \${formData.get('fullName')}\\n📞 Phone: \${formData.get('phone')}\\n📍 Location: \${formData.get('location')}\\n🏷️ Brand: \${formData.get('brand')}\\n🏍️ Model: \${formData.get('model')}\\n🏍️ Vehicle Type: \${heroVehicle}\\n🔧 Service`
);

// 2. We need to add the Brand and Model inputs to the hero form.
const heroFormLocation = `<div className="relative group">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                              <MapPin className="w-3 h-3" />
                            </div>
                            <input ref={locationInputRef} type="text" name="location"`;

const heroBrandModelHtml = `<div className="flex gap-2">
                            <div className="relative group flex-1">
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                                <Shield className="w-3 h-3" />
                              </div>
                              <select name="brand" required defaultValue="" className="w-full pl-8 pr-7 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-[16px] md:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium">
                                <option value="" disabled hidden>Select Brand</option>
                                <option value="Hero">Hero</option>
                                <option value="Honda">Honda</option>
                                <option value="TVS">TVS</option>
                                <option value="Bajaj">Bajaj</option>
                                <option value="Yamaha">Yamaha</option>
                                <option value="Royal Enfield">Royal Enfield</option>
                                <option value="Suzuki">Suzuki</option>
                                <option value="KTM">KTM</option>
                                <option value="Ather">Ather</option>
                                <option value="Ola">Ola</option>
                                <option value="Other">Other</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative group flex-1">
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                                <Zap className="w-3 h-3" />
                              </div>
                              <input type="text" name="model" required placeholder="Select Model" className="w-full pl-8 pr-3 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-[16px] md:text-sm placeholder:text-gray-400 placeholder:font-medium" />
                            </div>
                          </div>
                             
                          <div className="relative group">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                              <MapPin className="w-3 h-3" />
                            </div>
                            <input ref={locationInputRef} type="text" name="location"`;

content = content.replace(heroFormLocation, heroBrandModelHtml);

// 3. We need to add the Brand and Model inputs to the popup form.
const popupFormLocation = `<div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <input type="text" name="location" required placeholder="Service Location, Bengaluru"`;

const popupBrandModelHtml = `<div className="flex gap-2">
                <div className="relative group flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <Shield className="w-4 h-4" />
                  </div>
                  <select name="brand" required defaultValue="" className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-[16px] md:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium">
                    <option value="" disabled hidden>Select Brand</option>
                    <option value="Hero">Hero</option>
                    <option value="Honda">Honda</option>
                    <option value="TVS">TVS</option>
                    <option value="Bajaj">Bajaj</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Royal Enfield">Royal Enfield</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="KTM">KTM</option>
                    <option value="Ather">Ather</option>
                    <option value="Ola">Ola</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative group flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <Zap className="w-4 h-4" />
                  </div>
                  <input type="text" name="model" required placeholder="Select Model" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-[16px] md:text-sm placeholder:text-gray-400" />
                </div>
              </div>
                
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <input type="text" name="location" required placeholder="Service Location, Bengaluru"`;

content = content.replace(popupFormLocation, popupBrandModelHtml);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Forms updated with Brand and Model fields.");
