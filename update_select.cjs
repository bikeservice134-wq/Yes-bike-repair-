const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldSelect = `<select name="service" required className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Choose a service...</option>
                    <option value="General Service">General Service</option>
                    <option value="Engine Oil Change">Engine Oil Change</option>
                    <option value="Breakdown Assistance">Breakdown Assistance</option>
                    <option value="Battery Replacement">Battery Replacement</option>
                    <option value="Tyre / Puncture">Tyre / Puncture</option>
                  </select>`;

const newSelect = `<select name="service" required className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Choose a service...</option>
                    <option value="General Bike Service ₹699">General Bike Service ₹699</option>
                    <option value="General Service with Engine Oil ₹1,249">General Service with Engine Oil ₹1,249</option>
                    <option value="Jump Start Service ₹399">Jump Start Service ₹399</option>
                    <option value="Puncture Repair ₹599">Puncture Repair ₹599</option>
                  </select>`;

content = content.replace(oldSelect, newSelect);
fs.writeFileSync('src/App.tsx', content);
console.log("Updated!");
