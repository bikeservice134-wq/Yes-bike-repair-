import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

pattern = re.compile(r'<form onSubmit=\{\(e\) => \{.*?<form', re.DOTALL)
# wait, there's no nested form.
pattern = re.compile(r'(<form onSubmit=\{\(e\) => \{\s*e\.preventDefault\(\);\s*const formData = new FormData\(e\.currentTarget\);.*?pkgName =.*?)</form>', re.DOTALL)

matches = pattern.findall(content)
print(f"Found {len(matches)} matches")

if len(matches) == 1:
    new_form = """<form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const location = formData.get('location');
              const vehicleType = formData.get('vehicleType');
              
              const pkgName = selectedPackage ? selectedPackage.name : 'Unknown Package';
              const pkgPrice = selectedPackage ? selectedPackage.price : '';
              
              const message = `🏍️🛵PACKAGE BOOKING\\n\\n*Package:* ${pkgName} (${pkgPrice})\\n\\n👤 Name: ${fullName}\\n📞 Phone: ${phone}\\n📍 Location: ${location}\\n🏍️ Vehicle Type: ${vehicleType}\\n\\n✅ Please call me back to confirm the booking!`;
              
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              
              window.open(whatsappUrl, '_blank');
              
              setPackageSuccess(true); 
              setTimeout(() => {setPackageSuccess(false); setIsPackageModalOpen(false);}, 3000); 
            }} className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              
              <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg border border-gray-200 dark:border-[#303030]">
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Bike" defaultChecked className="peer sr-only" />
                  <div className="py-2.5 text-sm font-bold rounded-md transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    🏍️ Bike
                  </div>
                </label>
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Scooter" className="peer sr-only" />
                  <div className="py-2.5 text-sm font-bold rounded-md transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    🛵 Scooter
                  </div>
                </label>
              </div>
                            
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <input type="text" name="fullName" required placeholder="Full Name *" className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Mobile No *" className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <input type="text" name="location" required placeholder="Service Location (e.g. Koramangala) *" className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-4 py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_20px_rgba(234,179,8,0.25)] flex justify-center items-center gap-2 mt-4">
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
    
    content = content.replace(matches[0] + '</form>', new_form)
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Replaced!")
