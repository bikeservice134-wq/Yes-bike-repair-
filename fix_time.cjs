const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetSelect = `                          <div className="relative group">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                              <Clock className="w-3 h-3" />
                            </div>
                            <select name="time" required defaultValue="" className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium">
                              <option value="" disabled hidden>Preferred Time</option>
                              <option value="Immediate (Within 20 mins)">🚀 Immediate</option>
                              <option value="Today - Morning (9 AM - 12 PM)">🌅 Today (Morn)</option>
                              <option value="Today - Afternoon (12 PM - 4 PM)">☀️ Today (Aft)</option>
                              <option value="Today - Evening (4 PM - 8 PM)">🌙 Today (Eve)</option>
                              <option value="Tomorrow - First Half">📅 Tomorrow (Morn)</option>
                              <option value="Tomorrow - Second Half">📅 Tomorrow (Aft)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>`;

const newTimeInput = `                          <div className="relative group flex gap-2">
                            <div className="relative group w-full">
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors z-10">
                                  <Clock className="w-3 h-3" />
                                </div>
                                <input type="time" name="time" required className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium" />
                            </div>
                          </div>`;

if (content.includes(targetSelect)) {
    content = content.replace(targetSelect, newTimeInput);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Time field updated");
} else {
    console.log("Time field not found");
}
