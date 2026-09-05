const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const startMarker = `{/* SEO SECTION */}`;
const endMarker = `{/* STICKY MOBILE CTA */}`;

if (content.includes(startMarker) && content.includes(endMarker)) {
    const beforeStart = content.substring(0, content.indexOf(startMarker));
    const afterEnd = content.substring(content.indexOf(endMarker));
    
    const newSection = `{/* SEO SECTION */}
          <section className="pt-24 pb-32 bg-white dark:bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="max-w-4xl mx-auto text-center">
                <FadeIn>
                  <p className="text-sm font-black text-yellow-500 uppercase tracking-widest mb-3">Bike Service Near Me in Bangalore</p>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Your Bike Needs Service? We Come to You.</h2>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto mb-8">
                    Get fast doorstep bike service and repair in Bangalore. Book a verified mechanic for your home, office, or roadside location—without waiting at a service centre.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200">
                     <span>General Service</span> <span className="text-gray-300 dark:text-gray-700">•</span>
                     <span>Engine Repair</span> <span className="text-gray-300 dark:text-gray-700">•</span>
                     <span>Battery</span> <span className="text-gray-300 dark:text-gray-700">•</span>
                     <span>Brakes</span> <span className="text-gray-300 dark:text-gray-700">•</span>
                     <span>Tyres</span> <span className="text-gray-300 dark:text-gray-700">•</span>
                     <span>Puncture</span> <span className="text-gray-300 dark:text-gray-700">•</span>
                     <span>Electrical Repairs & More</span>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#111] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl text-left relative overflow-hidden">
                     {/* Decorative background element */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
                     
                     <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
                       <div className="flex-1">
                         <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                           ⚡ Book Now. Get a Mechanic at Your Doorstep.
                         </h3>
                         
                         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-0">
                           {[
                             'Verified Mechanics',
                             'Fast Doorstep Service',
                             'Transparent Pricing',
                             'Genuine Parts Available',
                             'Home, Office & Roadside Support'
                           ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3">
                               <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                               <span className="text-gray-700 dark:text-gray-300 font-bold">{item}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                       
                       <div className="w-full lg:w-auto bg-white dark:bg-[#1A1A1A] p-6 sm:p-8 rounded-[24px] border border-gray-100 dark:border-white/5 text-center flex flex-col items-center justify-center shadow-lg">
                         <p className="text-gray-900 dark:text-white font-black text-xl leading-tight mb-6 max-w-[220px]">
                           Don’t Ride With a Problem. Get Your Bike Fixed Today.
                         </p>
                         <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.3)] uppercase tracking-wider text-sm whitespace-nowrap">
                           BOOK A MECHANIC NOW
                         </button>
                       </div>
                     </div>
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
