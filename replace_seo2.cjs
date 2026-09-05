const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const startMarker = `{/* SEO SECTION */}`;
const endMarker = `{/* STICKY MOBILE CTA */}`;

if (content.includes(startMarker) && content.includes(endMarker)) {
    const beforeStart = content.substring(0, content.indexOf(startMarker));
    const afterEnd = content.substring(content.indexOf(endMarker));
    
    const newSection = `{/* SEO SECTION */}
          <section className="pt-24 pb-32 bg-gray-50 dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="max-w-4xl mx-auto">
                <FadeIn>
                  <p className="text-sm font-black text-yellow-500 uppercase tracking-widest mb-3 text-center md:text-left">Bike Service Near Me in Bangalore</p>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight text-center md:text-left">Looking for Bike Service Near Me? We Come to You.</h2>
                  
                  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-12">
                    <p>
                      Get professional bike service near you in Bangalore with our convenient doorstep bike servicing and repair. Book a verified bike mechanic to visit your home, office, or roadside location and get your bike back on the road quickly.
                    </p>
                    <p>
                      From general bike service and engine repair to battery replacement, brake repair, tyre service, puncture repair, wheel alignment, electrical repairs, and oil changes, our mechanics handle it all.
                    </p>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mt-12 mb-8">Why Choose Our Bike Service Near You?</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {[
                      { icon: '🔧', text: 'Verified & experienced bike mechanics' },
                      { icon: '🏠', text: 'Bike service at home' },
                      { icon: '📍', text: 'Bike repair near your location' },
                      { icon: '⚡', text: 'Fast doorstep service' },
                      { icon: '💰', text: 'Transparent & upfront pricing' },
                      { icon: '🛠️', text: 'Genuine parts available' },
                      { icon: '🛡️', text: 'Service warranty' },
                      { icon: '🚗', text: 'Home, office & roadside assistance' }
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
                        Need a Bike Mechanic Near Me?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                        Skip the workshop queues. Get reliable bike repair and servicing at your doorstep in Bangalore.
                      </p>
                      <p className="text-gray-900 dark:text-white font-bold">
                        Book your bike service today and get a mechanic near you.
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

          `;
          
    content = beforeStart + newSection + afterEnd;
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("SEO section replaced.");
} else {
    console.log("Could not find start/end markers.");
}
