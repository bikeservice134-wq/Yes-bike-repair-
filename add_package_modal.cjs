const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const packageModalStr = `      {/* PACKAGE BOOKING MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151515] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-[#2a2a2a]">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Service</h3>
                {selectedPackage && (
                  <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500 mt-1">
                    {selectedPackage.name} - {selectedPackage.price}
                  </p>
                )}
              </div>
              <button onClick={() => setIsPackageModalOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors self-start">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const brand = formData.get('brand');
              const model = formData.get('model');
              const location = formData.get('location');
              const time = formData.get('time');
              const vehicleType = formData.get('vehicleType');
              
              const pkgName = selectedPackage ? selectedPackage.name : 'Unknown Package';
              const pkgPrice = selectedPackage ? selectedPackage.price : '';
              
              const message = \`🏍️🛵PACKAGE BOOKING\\n\\n*Package:* \${pkgName} (\${pkgPrice})\\n\\n👤 Name: \${fullName}\\n📞 Phone: \${phone}\\n📍 Location: \${location}\\n🏍️ Vehicle: \${brand} \${model} (\${vehicleType})\\n⏰ Time Slot: \${time}\\n\\n✅ Please confirm my booking!\`;
              
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(message)}\`;
              
              window.open(whatsappUrl, '_blank');
              
              setPackageSuccess(true); 
              setTimeout(() => {setPackageSuccess(false); setIsPackageModalOpen(false);}, 3000); 
            }} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Vehicle Type</label>
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                <input type="text" name="fullName" required placeholder="John Doe" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mobile Number *</label>
                <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit number" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location / Address *</label>
                <input type="text" name="location" required placeholder="Full address or area..." className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand *</label>
                  <input type="text" name="brand" required placeholder="e.g. Honda" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Model *</label>
                  <input type="text" name="model" required placeholder="e.g. Activa 6G" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Select Time *</label>
                <select name="time" required className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                  <option value="">Preferred time slot...</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                </select>
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-bold transition-colors mt-2 flex items-center justify-center gap-2 shadow-md">
                Book Package on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
      
      {packageSuccess && <Toast message="Package booked! We'll contact you shortly." onClose={() => setPackageSuccess(false)} />}
`;

const quoteModalStr = '{/* QUOTE MODAL */}';
const index = content.indexOf(quoteModalStr);

if (index !== -1) {
  content = content.substring(0, index) + packageModalStr + '\n      ' + content.substring(index);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Package modal added");
} else {
  console.log("Could not find QUOTE MODAL");
}
