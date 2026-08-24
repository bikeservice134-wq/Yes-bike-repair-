const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHighlights = `            <div className="mt-8">
              <h3 className="text-gray-900 dark:text-white font-bold text-[20px] mb-4">Service Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-gray-700 dark:text-[#bdbdbd] font-medium text-base">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-[#ffc107]" /> Verified Mechanics</li>
                <li className="flex items-center gap-2.5"><Settings className="w-5 h-5 text-[#ffc107]" /> Genuine Spare Parts</li>
                <li className="flex items-center gap-2.5"><ShieldCheck className="w-5 h-5 text-[#ffc107]" /> 30-Day Service Warranty</li>
                <li className="flex items-center gap-2.5"><DollarSign className="w-5 h-5 text-[#ffc107]" /> Transparent Pricing</li>
                <li className="flex items-center gap-2.5"><Home className="w-5 h-5 text-[#ffc107]" /> Doorstep Service</li>
              </ul>
            </div>`;

// Remove from the left side
content = content.replace(oldHighlights, "");

// Add below the form
const formEnd = `            </form>`;
const newHighlights = `            </form>

            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-[#303030]">
              <h4 className="text-gray-900 dark:text-white font-bold text-[16px] mb-3 text-center">Service Highlights</h4>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-gray-600 dark:text-[#bdbdbd] font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ffc107]" /> Verified Mechanics</li>
                <li className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5 text-[#ffc107]" /> Genuine Spare Parts</li>
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#ffc107]" /> 30-Day Warranty</li>
                <li className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[#ffc107]" /> Transparent Pricing</li>
                <li className="flex items-center gap-1.5 col-span-2 justify-center mt-1"><Home className="w-3.5 h-3.5 text-[#ffc107]" /> Doorstep Service</li>
              </ul>
            </div>`;

content = content.replace(formEnd, newHighlights);

fs.writeFileSync('src/App.tsx', content);
