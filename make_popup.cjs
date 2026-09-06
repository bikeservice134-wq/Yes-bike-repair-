const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Update handleBookPackage
content = content.replace(
  /const handleBookPackage = \(packageName: string\) => \{[\s\S]*?\}, 100\);\s*\};\s*/,
  `const handleBookPackage = (packageName: string) => {
    const priceMap: Record<string, string> = {
      'General Service': '₹699',
      'General Service + Engine Oil': '₹1,349',
      'Jump Start Service': '₹399'
    };
    setSelectedPackage({name: packageName, price: priceMap[packageName] || ''});
    setIsPackageModalOpen(true);
  };\n\n`
);

// 2. Replace the modal content
const modalStart = content.indexOf('{/* PACKAGE MODAL */}');
const modalEnd = content.indexOf('{/* WHATSAPP FAB */}');

const newModal = `{/* PACKAGE MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPackageModalOpen(false)}></div>
          <div className="bg-white dark:bg-[#111] w-full max-w-md rounded-[32px] p-6 sm:p-8 relative z-10 shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Book Package</h3>
                {selectedPackage && (
                  <div className="inline-block bg-yellow-50 dark:bg-yellow-500/10 rounded-lg px-3 py-1.5 mt-2 border border-yellow-200 dark:border-yellow-500/20">
                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-500">{selectedPackage.name}</span>
                    <span className="mx-2 text-yellow-300">|</span>
                    <span className="text-sm font-black text-yellow-600 dark:text-yellow-500">{selectedPackage.price}</span>
                  </div>
                )}
              </div>
              <button onClick={() => setIsPackageModalOpen(false)} className="bg-gray-100 dark:bg-white/5 p-2 rounded-full text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const message = \`🏍️🛵 NEW BOOKING\\n\\n👤 Name: \${formData.get('fullName')}\\n📞 Phone: \${formData.get('phone')}\\n📍 Location: \${formData.get('location')}\\n🏍️ Vehicle Type: \${heroVehicle}\\n🔧 Service: \${selectedPackage?.name} (\${selectedPackage?.price})\\n\\n✅ Please confirm my booking!\`;
              window.open(\`https://wa.me/917090400617?text=\${encodeURIComponent(message)}\`, '_blank');
              
              if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-18313979172/mupQCP_io-4cEKTK5JxE',
                    'value': 1.0,
                    'currency': 'INR'
                });
              }
              
              setIsPackageModalOpen(false);
              setCurrentView('thank-you');
              window.scrollTo(0, 0);
            }} className="space-y-4">
              
              <div className="flex bg-gray-100/80 dark:bg-[#222] p-1 rounded-lg mb-3 border border-gray-200/50 dark:border-white/5">
                <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`flex-1 py-1.5 rounded-md text-xs font-black transition-all \${heroVehicle === 'Bike' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}\`}>
                  🏍️ Bike
                </button>
                <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`flex-1 py-1.5 rounded-md text-xs font-black transition-all \${heroVehicle === 'Scooter' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}\`}>
                  🛵 Scooter
                </button>
              </div>

              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input type="text" name="fullName" required placeholder="Full Name" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-sm placeholder:text-gray-400" />
              </div>
                
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                  <Smartphone className="w-4 h-4" />
                </div>
                <input type="tel" name="phone" required placeholder="Phone Number" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-sm placeholder:text-gray-400" />
              </div>
                
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <input type="text" name="location" required placeholder="Service Location, Bengaluru" className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-sm placeholder:text-gray-400" />
              </div>

              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-4 rounded-xl font-black text-[16px] transition-all hover:scale-[1.02] shadow-[0_4px_14px_rgba(234,179,8,0.3)] flex justify-center items-center gap-2 mt-2">
                Confirm Booking <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      `;

content = content.substring(0, modalStart) + newModal + content.substring(modalEnd);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Updated handleBookPackage and added popup booking form.");
