const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetFormStart = '<form onSubmit={(e) => {\\n              e.preventDefault();\\n              setHeroSuccess(true);\\n            }}>';
const targetFormStartActual = `<form onSubmit={(e) => {
              e.preventDefault();
              setHeroSuccess(true);
            }}>`;

let startIndex = content.indexOf(targetFormStartActual);

if (startIndex === -1) {
  // Try finding just the start of form
  startIndex = content.indexOf('<form onSubmit={(e) => {');
}

if (startIndex !== -1) {
  let endIndex = content.indexOf('</form>', startIndex);
  if (endIndex !== -1) {
    endIndex += '</form>'.length;
    
    const newForm = `<form onSubmit={(e) => {
              e.preventDefault();
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const brand = formData.get('brand');
              const model = formData.get('model');
              const service = formData.get('service');
              const time = formData.get('time');
              
              const message = \`Hello! I would like to book a service:\\n\\n*Vehicle Type:* \${heroVehicle}\\n*Brand:* \${brand}\\n*Model:* \${model}\\n*Service:* \${service}\\n*Time Slot:* \${time}\\n*Location:* \${locationSearch}\\n\\n*Name:* \${fullName}\\n*Phone:* \${phone}\`;
              
              // Standard WhatsApp business number (placeholder)
              const whatsappNumber = "918867353838"; 
              const whatsappUrl = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(message)}\`;
              
              window.open(whatsappUrl, '_blank');
              setHeroSuccess(true);
            }}>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button type="button" onClick={() => setHeroVehicle('Bike')} className={\`py-3 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}\`}>🏍️ Bike</button>
                <button type="button" onClick={() => setHeroVehicle('Scooter')} className={\`py-3 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all \${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}\`}>🛵 Scooter</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input type="text" name="fullName" required placeholder="John Doe" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Mobile No *</label>
                  <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
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
                      className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Brand *</label>
                    <input type="text" name="brand" required placeholder="e.g. Honda" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Model *</label>
                    <input type="text" name="model" required placeholder="e.g. Activa 6G" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Service *</label>
                  <select name="service" required className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Choose a service...</option>
                    <option value="General Service">General Service</option>
                    <option value="Engine Oil Change">Engine Oil Change</option>
                    <option value="Breakdown Assistance">Breakdown Assistance</option>
                    <option value="Battery Replacement">Battery Replacement</option>
                    <option value="Tyre / Puncture">Tyre / Puncture</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Time *</label>
                  <select name="time" required className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Preferred time slot...</option>
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-4 rounded-xl font-black text-[17px] transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2 mt-6">
                Book Mechanic Now <ArrowRight className="w-5 h-5" />
              </button>
            </form>`;
            
    content = content.substring(0, startIndex) + newForm + content.substring(endIndex);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Form updated with WhatsApp submission!");
  } else {
    console.log("Could not find </form>");
  }
} else {
  console.log("Could not find <form onSubmit...>");
}
