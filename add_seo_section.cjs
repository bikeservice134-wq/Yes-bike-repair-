const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const anchorPoint = `          {/* STICKY MOBILE CTA */}`;
const newSection = `
          {/* SEO SECTION */}
          <section className="pt-24 pb-32 bg-gray-50 dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="max-w-4xl mx-auto">
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">Bike Service Near Me in Bangalore</h2>
                  <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    <p>
                      Looking for bike service near me in Bangalore? Get reliable bike servicing and repair at your doorstep. Our verified mechanics provide professional bike service at your home, office, or roadside location—without the hassle of visiting a workshop.
                    </p>
                    <p>
                      We handle general bike service, engine repair, battery replacement, brake repair, tyre and puncture service, wheel alignment, electrical repairs, oil change, and more.
                    </p>
                    <p>
                      Whether you need a bike mechanic near me, emergency bike repair, or regular maintenance, our doorstep service makes bike care fast, convenient, and hassle-free.
                    </p>
                    
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-12 mb-6">Why Choose Our Bike Service?</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {[
                        'Verified & experienced mechanics',
                        'Doorstep bike service across Bangalore',
                        'Home, office & roadside repairs',
                        'Transparent pricing',
                        'Genuine parts available',
                        'Convenient online booking'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 font-bold">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-white dark:bg-[#111] p-8 rounded-[32px] border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 shadow-sm">
                      <p className="text-xl font-bold text-gray-900 dark:text-white text-center sm:text-left m-0">
                        Need a bike mechanic near you? <br className="hidden sm:block"/> <span className="text-yellow-500">Book a doorstep bike service today.</span>
                      </p>
                      <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap">
                        Book a Mechanic Today
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* STICKY MOBILE CTA */}`;

if (content.includes(anchorPoint)) {
    content = content.replace(anchorPoint, newSection);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("SEO section added.");
} else {
    console.log("Could not find the anchor point for SEO section.");
}
