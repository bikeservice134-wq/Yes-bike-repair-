import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

pattern = re.compile(r'<form onSubmit=\{\(e\) => \{.*?setPackageSuccess\(true\);[^\n]*\n[^\n]*setTimeout\(\(\) => \{setPackageSuccess\(false\); setIsPackageModalOpen\(false\);\}, 3000\);\n\s*\}\} className="p-4 space-y-3 max-h-\[70vh\] overflow-y-auto">.*?</form>', re.DOTALL)

replacement = """<form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const location = formData.get('location');
              const vehicleType = formData.get('vehicleType');
              
              const pkgName = selectedPackage ? selectedPackage.name : 'Unknown Package';
              const pkgPrice = selectedPackage ? selectedPackage.price : '';
              
              const message = `🏍️🛵PACKAGE BOOKING\\n\\n*Package:* ${pkgName} (${pkgPrice})\\n\\n👤 Name: ${fullName}\\n📞 Phone: ${phone}\\n📍 Location: ${location}\\n🏍️ Vehicle Type: ${vehicleType}\\n\\n✅ Please confirm my booking!`;
              
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              
              window.open(whatsappUrl, '_blank');
              
              setPackageSuccess(true); 
              setTimeout(() => {setPackageSuccess(false); setIsPackageModalOpen(false);}, 3000); 
            }} className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg border border-gray-200 dark:border-[#303030]">
                  <label className="flex-1 text-center cursor-pointer">
                    <input type="radio" name="vehicleType" value="Bike" defaultChecked className="peer sr-only" />
                    <div className="py-2 text-sm font-bold rounded-md transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-sm">
                      Bike
                    </div>
                  </label>
                  <label className="flex-1 text-center cursor-pointer">
                    <input type="radio" name="vehicleType" value="Scooter" className="peer sr-only" />
                    <div className="py-2 text-sm font-bold rounded-md transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-sm">
                      Scooter
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <input type="text" name="fullName" required placeholder="Full Name *" className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Mobile No *" className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <input type="text" name="location" required placeholder="Location / Address *" className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 mt-2">
                {packageSuccess ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 animate-in zoom-in" />
                    Request Sent!
                  </span>
                ) : (
                  <>Book on WhatsApp <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>"""

new_content = pattern.sub(replacement, content, count=1)
if new_content == content:
    print("Failed to replace modal form!")
else:
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced modal form!")
