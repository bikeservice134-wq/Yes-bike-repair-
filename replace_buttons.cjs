const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `            <div className="flex flex-wrap gap-4">
              <a href="#home" className="inline-flex items-center gap-2 bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-xl font-extrabold transition-colors text-base">
                <Wrench className="w-5 h-5" /> Book Bike Service
              </a>
              <a href="tel:+917090400617" className="inline-flex items-center gap-2 border border-gray-300 dark:border-[#444] text-gray-900 dark:text-white hover:bg-gray-50 dark:bg-[#101010] px-6 py-3.5 rounded-xl font-extrabold transition-colors text-base">
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>`;

const replaceStr = `            <div className="mt-8">
              <h3 className="text-gray-900 dark:text-white font-bold text-[20px] mb-4">Service Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-gray-700 dark:text-[#bdbdbd] font-medium text-base">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-[#ffc107]" /> Verified Mechanics</li>
                <li className="flex items-center gap-2.5"><Settings className="w-5 h-5 text-[#ffc107]" /> Genuine Spare Parts</li>
                <li className="flex items-center gap-2.5"><ShieldCheck className="w-5 h-5 text-[#ffc107]" /> 30-Day Service Warranty</li>
                <li className="flex items-center gap-2.5"><DollarSign className="w-5 h-5 text-[#ffc107]" /> Transparent Pricing</li>
                <li className="flex items-center gap-2.5"><Home className="w-5 h-5 text-[#ffc107]" /> Doorstep Service</li>
              </ul>
            </div>`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/App.tsx', content);
