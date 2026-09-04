const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// I need to find the new time input block and replace it with a flex container holding both date and time
const targetBlock = `                          <div className="relative group flex gap-2">
                            <div className="relative group w-full">
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors z-10">
                                  <Clock className="w-3 h-3" />
                                </div>
                                <input type="time" name="time" required className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium" />
                            </div>
                          </div>`;

const newBlock = `                          <div className="flex gap-2">
                            <div className="relative group flex-1">
                                <input type="date" name="date" required className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400" />
                            </div>
                            <div className="relative group flex-1">
                                <input type="time" name="time" required className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400" />
                            </div>
                          </div>`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, newBlock);
} else {
    console.log("Could not find the target time block to replace.");
}

// I also need to update the form submission to include the new date field
const oldMessage = "const message = `🏍️🛵 NEW BOOKING\\n\\n👤 Name: ${formData.get('fullName')}\\n📞 Phone: ${formData.get('phone')}\\n📍 Location: ${formData.get('location')}\\n🏍️ Vehicle Type: ${heroVehicle}\\n🔧 Service: ${formData.get('service')}\\n⏰ Time: ${formData.get('time')}\\n\\n✅ Please confirm my booking!`;";
const newMessage = "const message = `🏍️🛵 NEW BOOKING\\n\\n👤 Name: ${formData.get('fullName')}\\n📞 Phone: ${formData.get('phone')}\\n📍 Location: ${formData.get('location')}\\n🏍️ Vehicle Type: ${heroVehicle}\\n🔧 Service: ${formData.get('service')}\\n📅 Date: ${formData.get('date')}\\n⏰ Time: ${formData.get('time')}\\n\\n✅ Please confirm my booking!`;";
content = content.replace(oldMessage, newMessage);


fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Date input added");
