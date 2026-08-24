const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newSection = `      {/* SERVICES LIST */}
      <section className="py-20 px-5 bg-white dark:bg-[#1d1d1d] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3">
                <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                  Experience the <span className="text-[#e5a900] dark:text-[#ffc107]">Best Two-Wheeler Service</span>
                </h2>
                <p className="text-gray-600 dark:text-[#bdbdbd] mb-8 text-[17px]">
                  Keep your bike running smoother, safer, and longer with professional two-wheeler service.
                </p>
                <div className="hidden lg:block">
                  <p className="text-gray-900 dark:text-white font-bold mb-6">
                    ✓ Trusted mechanics.<br/>
                    ✓ Transparent pricing.<br/>
                    ✓ Quality service.
                  </p>
                  <a href="#home" className="inline-flex bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors items-center gap-2">
                    Book Your Bike Service Today &rarr;
                  </a>
                </div>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🏍️', text: 'Periodic Bike Service' },
                  { icon: '🔋', text: 'Two-Wheeler Battery Replacement' },
                  { icon: '🔍', text: 'Bike Inspection & Diagnostics' },
                  { icon: '🛞', text: 'Tyre Replacement' },
                  { icon: '⚡', text: 'EV Bike Repair' },
                  { icon: '🛢️', text: 'Engine Oil Replacement' },
                  { icon: '🔧', text: 'Full & Half Engine Repair' },
                  { icon: '🧰', text: 'Brake, Chain & General Repairs' },
                  { icon: '🏠', text: 'Doorstep Service Available' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-[#101010] p-4 rounded-xl border border-gray-100 dark:border-[#303030] flex items-center gap-4 hover:border-[#ffc107] dark:hover:border-[#ffc107] transition-colors">
                    <div className="w-12 h-12 flex-shrink-0 bg-white dark:bg-[#1d1d1d] shadow-sm rounded-lg flex items-center justify-center text-[22px]">
                      {item.icon}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white text-[15px]">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:hidden mt-4 w-full">
                <p className="text-gray-900 dark:text-white font-bold mb-6 text-center">
                  ✓ Trusted mechanics. ✓ Transparent pricing. ✓ Quality service.
                </p>
                <a href="#home" className="flex justify-center bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors items-center gap-2 w-full">
                  Book Your Bike Service Today &rarr;
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

`;

content = content.replace("      {/* PRICING */}", newSection + "      {/* PRICING */}");
content = content.replace('<section id="pricing" className="py-20 px-5 bg-white dark:bg-[#1d1d1d]">', '<section id="pricing" className="py-20 px-5 bg-gray-50 dark:bg-[#101010]">');
content = content.replace('<section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">', '<section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">');

fs.writeFileSync('src/App.tsx', content);
