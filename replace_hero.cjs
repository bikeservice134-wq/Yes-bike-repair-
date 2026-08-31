const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeroForm = `<form onSubmit={(e) => {
              e.preventDefault();
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const brand = formData.get('brand');
              const model = formData.get('model');
              const service = formData.get('service');
              const time = formData.get('time');
              
              const message = \`🏍️🛵QUICK VEHICLE SERVICE BOOKING\\n\\n👤 Name: \${fullName}\\n📞 Phone: \${phone}\\n📍 Location: \${locationSearch}\\n🏍️ Vehicle: \${brand} \${model} (\${heroVehicle})\\n🔧 Service Required: \${service}\\n⏰ Preferred Time Slot: \${time}\\n\\n✅ Book Now — Get a Mechanic at Your Doorstep\`;
              
              // Standard WhatsApp business number (placeholder)
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(message)}\`;
              
              window.open(whatsappUrl, '_blank');
              setHeroSuccess(true);
            }}>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}\`}>🏍️ Bike</button>
                <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}\`}>🛵 Scooter</button>
              </div>
              <div className="space-y-4">
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

const newHeroForm = `<form onSubmit={(e) => {
              e.preventDefault();
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              
              const message = \`🏍️🛵QUICK VEHICLE SERVICE BOOKING\\n\\n👤 Name: \${fullName}\\n📞 Phone: \${phone}\\n📍 Location: \${locationSearch}\\n🏍️ Vehicle Type: \${heroVehicle}\\n\\n✅ Please call me back to confirm the booking!\`;
              
              // Standard WhatsApp business number (placeholder)
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(message)}\`;
              
              window.open(whatsappUrl, '_blank');
              setHeroSuccess(true);
            }}>
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-[0_4px_12px_rgba(234,179,8,0.3)]' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333] hover:border-yellow-500/50'}\`}>🏍️ Bike</button>
                <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-[0_4px_12px_rgba(234,179,8,0.3)]' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333] hover:border-yellow-500/50'}\`}>🛵 Scooter</button>
              </div>
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <input type="text" name="fullName" required placeholder="Full Name *" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Mobile No *" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <input type="text" required placeholder="Service Location (e.g. Koramangala) *" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
                </div>
              </div>`;

if (content.includes(oldHeroForm)) {
  content = content.replace(oldHeroForm, newHeroForm);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Hero Form successfully!");
} else {
  // Let's use substring replacement if whitespace is off
  const startStr = `<form onSubmit={(e) => {`;
  const endStr = `              </div>\n                            <button type="submit" className="w-full bg-gradient-to-r`;
  
  const startIndex = content.indexOf(startStr);
  const endIndex = content.indexOf(endStr);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const pre = content.substring(0, startIndex);
    const post = content.substring(endIndex);
    fs.writeFileSync('src/App.tsx', pre + newHeroForm + post);
    console.log("Updated Hero Form using substring successfully!");
  } else {
    console.log("Could not find start/end markers.");
  }
}
