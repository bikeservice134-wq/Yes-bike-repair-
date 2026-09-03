const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = '{/* REVIEWS */}';

const brandsSection = `          {/* BRANDS WE SERVICE */}
          <section className="py-20 px-5 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                    Brands We <span className="text-yellow-500 dark:text-yellow-400">Service</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-lg">We provide expert service for all major two-wheeler brands in India.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                  {['Hero', 'Honda', 'TVS', 'Bajaj', 'Yamaha', 'Suzuki', 'Royal Enfield', 'KTM'].map((brand, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] px-6 py-4 rounded-2xl flex items-center justify-center min-w-[120px] shadow-sm hover:border-yellow-500/50 dark:hover:border-yellow-500/50 hover:shadow-md transition-all group">
                      <span className="font-black text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 text-lg uppercase tracking-wider">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>
          
          `;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, brandsSection + targetStr);
  fs.writeFileSync('src/App.tsx', content, 'utf-8');
  console.log('Brands section added');
} else {
  console.error('Could not find REVIEWS marker');
}
