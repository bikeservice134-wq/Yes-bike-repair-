import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Regular expression to match the form block precisely
pattern = re.compile(r'<form onSubmit=\{\(e\) => \{.*?</form>', re.DOTALL)

replacement = """<form onSubmit={(e) => {
              e.preventDefault();
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              
              const message = `🏍️🛵QUICK VEHICLE SERVICE BOOKING\\n\\n👤 Name: ${fullName}\\n📞 Phone: ${phone}\\n📍 Location: ${locationSearch}\\n🏍️ Vehicle Type: ${heroVehicle}\\n\\n✅ Please call me back to confirm the booking!`;
              
              // Standard WhatsApp business number (placeholder)
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              
              window.open(whatsappUrl, '_blank');
              setHeroSuccess(true);
            }}>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button type="button" onClick={() => setHeroVehicle('Bike')} className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}`}>🏍️ Bike</button>
                <button type="button" onClick={() => setHeroVehicle('Scooter')} className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}`}>🛵 Scooter</button>
              </div>
              <div className="space-y-4">
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

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <input type="text" required placeholder="Service Location *" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-4 py-3.5 rounded-xl font-bold text-[16px] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_20px_rgba(234,179,8,0.25)] flex justify-center items-center gap-2 mt-6">
                Book Mechanic Now <ArrowRight className="w-5 h-5" />
              </button>
            </form>"""

new_content = pattern.sub(replacement, content, count=1)
if new_content == content:
    print("Failed to replace!")
else:
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced!")

