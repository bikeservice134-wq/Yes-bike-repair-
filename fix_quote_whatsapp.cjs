const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetFormStart = '<form onSubmit={(e) => { e.preventDefault(); setQuoteSuccess(true); setTimeout(() => {setQuoteSuccess(false); setIsQuoteModalOpen(false);}, 3000); }} className="p-5 space-y-4">';

let startIndex = content.indexOf(targetFormStart);

if (startIndex !== -1) {
  let endIndex = content.indexOf('</form>', startIndex);
  if (endIndex !== -1) {
    endIndex += '</form>'.length;
    
    const newForm = `<form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);
              const brand = formData.get('brand');
              const model = formData.get('model');
              const issue = formData.get('issue');
              const phone = formData.get('phone');
              
              // We need to store selected quote vehicle type if we want it, but assuming Bike/Scooter is enough.
              const message = \`Hello! I need a custom quote for a repair:\\n\\n*Brand:* \${brand}\\n*Model:* \${model}\\n*Issue:* \${issue}\\n*Phone:* \${phone}\`;
              
              const whatsappNumber = "918867353838"; 
              const whatsappUrl = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(message)}\`;
              
              window.open(whatsappUrl, '_blank');
              
              setQuoteSuccess(true); 
              setTimeout(() => {setQuoteSuccess(false); setIsQuoteModalOpen(false);}, 3000); 
            }} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Vehicle Type</label>
                <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg border border-gray-200 dark:border-[#303030]">
                  {['Bike', 'Scooter'].map(type => (
                    <button
                      key={'quote-'+type}
                      type="button"
                      className="flex-1 py-2 text-sm font-bold rounded-md transition-all text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:bg-white dark:focus:bg-[#222] focus:text-gray-900 dark:focus:text-white focus:shadow-sm"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand</label>
                  <input type="text" name="brand" required placeholder="e.g. Honda" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Model</label>
                  <input type="text" name="model" required placeholder="e.g. Activa 6G" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Issue Description</label>
                <textarea required name="issue" placeholder="Describe what needs to be fixed..." rows={3} className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mobile Number</label>
                <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit number" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-bold transition-colors mt-2">
                Request Estimate via WhatsApp
              </button>
            </form>`;
            
    content = content.substring(0, startIndex) + newForm + content.substring(endIndex);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Quote modal form updated with WhatsApp submission!");
  } else {
    console.log("Could not find </form> for quote modal");
  }
} else {
  console.log("Could not find quote modal form");
}
