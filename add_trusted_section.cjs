const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const trustedSection = `      {/* TRUSTED BY RIDERS */}
      <section className="py-16 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-[32px] font-bold mb-12 text-gray-900 dark:text-white">
              Trusted by <span className="text-[#e5a900] dark:text-[#ffc107]">Riders</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3">58,000+</div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">Happy Customers</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3">10+</div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">Partner Garages</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3">1</div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">City Covered</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3 flex items-baseline justify-center gap-1">
                  4.8<span className="text-[24px] md:text-[28px] text-gray-400 dark:text-[#666]">/5</span>
                </div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">Customer Rating</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

`;

content = content.replace("      {/* PRICING */}", trustedSection + "      {/* PRICING */}");

fs.writeFileSync('src/App.tsx', content);
