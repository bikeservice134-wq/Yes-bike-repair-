const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldSectionPattern = /\{\/\* SERVICES LIST \*\/\}[\s\S]*?(?=\{\/\* PRICING \*\/|\{\/\* FAQ \*\/)/;

const newSection = `{/* SERVICES LIST */}
      <section className="py-20 px-5 bg-gray-50 dark:bg-[#101010]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-11">
              <h2 className="text-[40px] font-bold mb-2.5 leading-tight text-gray-900 dark:text-white">
                Our <span className="text-red-600 dark:text-red-500">Services</span>
              </h2>
              <p className="text-gray-600 dark:text-[#bdbdbd]">Expert mechanics handle it all right at your location.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: Calendar, text: 'Periodic Service' },
                { icon: Settings, text: 'Engine Repair' },
                { icon: Truck, text: 'RSA Services' },
                { icon: Battery, text: 'Bike Batteries' },
                { icon: Droplet, text: 'Wash & Wheel Care' },
                { icon: Car, text: 'Accidental Repair' },
                { icon: SprayCan, text: 'Dent & Paint' },
                { icon: Car, text: 'Car Services' }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-[#1d1d1d] aspect-square p-4 md:p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-[#303030] flex flex-col items-center justify-center text-center group hover:border-red-600 transition-colors cursor-pointer">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#fee2e2] dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-500 mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <item.icon size={28} className="md:w-8 md:h-8" />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-[14px] md:text-[16px] leading-tight">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
               <a href="#home" className="inline-flex bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-colors items-center gap-2 text-lg">
                  Book Service
               </a>
            </div>
          </div>
        </FadeIn>
      </section>

      `;

content = content.replace(oldSectionPattern, newSection);
fs.writeFileSync('src/App.tsx', content);
