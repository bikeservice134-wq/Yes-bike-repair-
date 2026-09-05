const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const startTag = '<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24 max-w-5xl mx-auto">';
const endTag = '</FadeIn>';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag, startIndex);

const replacement = `<div className="mb-24 max-w-4xl mx-auto bg-white dark:bg-[#111] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl text-center">
                  <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Popular Brands</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-bold leading-relaxed text-base md:text-lg mb-10">
                    Hero &bull; Honda &bull; TVS &bull; Bajaj &bull; Yamaha &bull; Royal Enfield &bull; Suzuki &bull; KTM &bull; Kawasaki &bull; Jawa &bull; Yezdi &bull; BMW &bull; Triumph &bull; Harley-Davidson &bull; Aprilia &bull; Vespa &bull; Piaggio &bull; Benelli &bull; Husqvarna &bull; Ather &bull; Ola Electric &bull; TVS Electric &bull; Revolt &bull; Ultraviolette
                  </p>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-500/10 p-6 md:p-8 rounded-2xl border border-yellow-200 dark:border-yellow-500/20 max-w-2xl mx-auto">
                    <p className="text-yellow-800 dark:text-yellow-400 font-bold text-lg mb-6">
                      Don’t see your brand? No problem — we service most bikes and scooters.
                    </p>
                    <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-black transition-all hover:scale-[1.02] shadow-[0_4px_14px_rgba(234,179,8,0.3)] flex justify-center items-center gap-2 mx-auto text-sm md:text-base">
                      Book a doorstep mechanic in Bangalore today <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              `;

content = content.substring(0, startIndex) + replacement + content.substring(endIndex);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Updated Brands We Service section");
