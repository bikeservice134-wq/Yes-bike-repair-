const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const carPackages = `            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-[18px] p-[30px] relative flex flex-col shadow-sm dark:shadow-none">
              <div className="absolute -top-[14px] left-5 bg-black text-white px-3 py-1 rounded-[20px] text-[12px] font-black">
                CAR SERVICE
              </div>
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">Jump Start</h3>
              <div className="text-red-700 dark:text-red-600 text-[38px] font-black my-[15px]">₹999</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li>✓ Quick Response</li>
                <li>✓ Battery Inspection</li>
                <li>✓ Jump Start Service</li>
                <li>✓ Alternator Check</li>
                <li>✓ At Your Location</li>
              </ul>
              <a href="#home" className="block text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg font-extrabold transition-colors">
                Book Now
              </a>
            </div>

            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-[18px] p-[30px] relative flex flex-col shadow-sm dark:shadow-none">
              <div className="absolute -top-[14px] left-5 bg-black text-white px-3 py-1 rounded-[20px] text-[12px] font-black">
                CAR SERVICE
              </div>
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">Puncture Repair</h3>
              <div className="text-red-700 dark:text-red-600 text-[38px] font-black my-[15px]">₹999</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li>✓ Professional Tools</li>
                <li>✓ Tubeless Tyre Repair</li>
                <li>✓ Air Pressure Check</li>
                <li>✓ Wheel Inspection</li>
                <li>✓ At Your Location</li>
              </ul>
              <a href="#home" className="block text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg font-extrabold transition-colors">
                Book Now
              </a>
            </div>
`;

content = content.replace(
  'grid grid-cols-1 md:grid-cols-3 gap-6',
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
);

content = content.replace(
  `              <a href="#home" className="block text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg font-extrabold transition-colors">\n                Book Now\n              </a>\n            </div>\n          </div>`,
  `              <a href="#home" className="block text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-lg font-extrabold transition-colors">\n                Book Now\n              </a>\n            </div>\n${carPackages}          </div>`
);

fs.writeFileSync('src/App.tsx', content);
