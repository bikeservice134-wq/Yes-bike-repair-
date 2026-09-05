const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const startMarker = `{/* SEO SECTION */}`;
const endMarker = `{/* STICKY MOBILE CTA */}`;

if (content.includes(startMarker) && content.includes(endMarker)) {
    const beforeStart = content.substring(0, content.indexOf(startMarker));
    const afterEnd = content.substring(content.indexOf(endMarker) + endMarker.length);
    
    const newSection = `{/* SEO SECTION */}
          <section className="pt-24 pb-32 bg-gray-50 dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="max-w-4xl mx-auto">
                <FadeIn>
                  <p className="text-sm font-black text-yellow-500 uppercase tracking-widest mb-3 text-center md:text-left">Top Rated Doorstep Bike Service Bangalore</p>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight text-center md:text-left">Looking for the Best "Bike Service Near Me"? We Come to You.</h2>
                  
                  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-12">
                    <p>
                      Searching for a reliable <strong className="text-gray-800 dark:text-gray-200">bike mechanic near me</strong>? Skip the local garage queues and get premium <strong className="text-gray-800 dark:text-gray-200">bike repair near me</strong> with our expert <strong className="text-gray-800 dark:text-gray-200">doorstep bike service</strong> in Bangalore. Whether you need a routine oil change or emergency <strong className="text-gray-800 dark:text-gray-200">bike repair Bangalore</strong>, our verified professionals bring the workshop to your location—be it your home, office, or roadside.
                    </p>
                    <p>
                      We specialize in comprehensive <strong className="text-gray-800 dark:text-gray-200">two wheeler service near me</strong>, including engine diagnostics, battery jump-starts, brake replacements, and tyre puncture repairs. Experience the ultimate convenience of <strong className="text-gray-800 dark:text-gray-200">bike service at home</strong> without compromising on quality or genuine parts. When you need a top-tier <strong className="text-gray-800 dark:text-gray-200">motorcycle service near me</strong>, we are just a click away.
                    </p>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-12 mb-8">Why We Are the #1 Choice for Bike Service Bangalore</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {[
                      { icon: '🔧', text: 'Verified & expert bike mechanics' },
                      { icon: '🏠', text: 'Premium bike service at home' },
                      { icon: '📍', text: 'Fastest bike repair near your location' },
                      { icon: '⚡', text: 'Quick doorstep bike service' },
                      { icon: '💰', text: 'Transparent & upfront pricing' },
                      { icon: '🛠️', text: '100% Genuine OEM parts' },
                      { icon: '🛡️', text: 'Comprehensive service warranty' },
                      { icon: '🚗', text: 'Anywhere in Bangalore assistance' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 bg-white dark:bg-[#111] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300 font-bold text-[15px]">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-white dark:bg-[#111] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">
                        Stop Searching for a "Bike Mechanic Near Me".
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                        Book Bangalore's most trusted two-wheeler experts today and get your ride running like new.
                      </p>
                      <p className="text-gray-900 dark:text-white font-bold">
                        Fast, reliable, and hassle-free <strong className="font-bold">bike service Bangalore</strong>.
                      </p>
                    </div>
                    <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.3)] uppercase tracking-wider text-sm whitespace-nowrap">
                      BOOK BIKE SERVICE NOW
                    </button>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* STICKY MOBILE CTA */}`;
          
    content = beforeStart + newSection + afterEnd;
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("SEO section replaced.");
} else {
    console.log("Could not find start/end markers.");
}
