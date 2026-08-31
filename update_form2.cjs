const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startTag = `              <div>\n                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>`;
const endTag = `              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-bold transition-colors mt-2 flex items-center justify-center gap-2 shadow-md">\n                Book Package on WhatsApp\n              </button>`;

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `              <div className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Settings className="h-5 w-5" />
                    </div>
                    <input type="text" name="brand" required placeholder="Brand *" className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Bike className="h-5 w-5" />
                    </div>
                    <input type="text" name="model" required placeholder="Model *" className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium" />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <Clock className="h-5 w-5" />
                  </div>
                  <select name="time" required className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all text-sm font-medium appearance-none cursor-pointer">
                    <option value="">Preferred time slot...</option>
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <br/>
`;
  
  content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated form 2 successfully!");
} else {
  console.log("Could not find start or end tags!");
}
