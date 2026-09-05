const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove Running Repair and Battery from dropdown
const oldSelect = `<select name="service" required defaultValue="" className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium">
                              <option value="" disabled hidden>Select Service Type</option>
                              <option value="General Bike Service (₹699)">🔧 Gen. Service - ₹699</option>
                              <option value="General Service + Engine Oil (₹1,249)">🛢️ Serv. + Oil - ₹1,249</option>
                              <option value="Jump Start Service (₹399)">⚡ Jump Start - ₹399</option>
                              <option value="Puncture Repair (₹599)">🔘 Puncture - ₹599</option>
                              <option value="Battery Replacement (₹1,499)">🔋 Battery - ₹1,499</option>
                              <option value="Running Repair (₹399)">⏱️ Running Repair - ₹399</option>
                              <option value="Other / Custom Issue">📋 Other Issue</option>
                            </select>`;
const newSelect = `<select name="service" required defaultValue="" className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium">
                              <option value="" disabled hidden>Select Service Type</option>
                              <option value="General Bike Service (₹699)">🔧 Gen. Service - ₹699</option>
                              <option value="General Service + Engine Oil (₹1,249)">🛢️ Serv. + Oil - ₹1,249</option>
                              <option value="Jump Start Service (₹399)">⚡ Jump Start - ₹399</option>
                              <option value="Puncture Repair (₹599)">🔘 Puncture - ₹599</option>
                              <option value="Other / Custom Issue">📋 Other Issue</option>
                            </select>`;

if(content.includes(oldSelect)) {
    content = content.replace(oldSelect, newSelect);
    console.log("Dropdown updated.");
} else {
    console.log("Could not find dropdown");
}

// 2. Remove Running Repair block from Services
const rrStart = `                {/* Running Repair */}`;
const rrEnd = `                </FadeIn>`;
if(content.includes(rrStart)) {
    const startIdx = content.indexOf(rrStart);
    let endIdx = content.indexOf(rrEnd, startIdx);
    
    // We need to find the specific FadeIn for Running Repair, because there are multiple <FadeIn>.
    // Wait, the FadeIn for Puncture Repair ends right before the Running Repair block. Let's just substring replace.
}
