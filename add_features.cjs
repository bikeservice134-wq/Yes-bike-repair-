const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `          </section>

          {/* HOW IT WORKS */}`;

const featureSection = `          </section>
          
          {/* VALUE PROPOSITION FEATURES */}
          <section className="py-20 bg-[#FAFAFA] dark:bg-[#050505] border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <FadeIn delay={100} className="flex">
                  <div className="bg-white dark:bg-[#111] p-8 sm:p-10 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm flex flex-col items-start w-full">
                    <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <MapPin className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">At Your Doorstep</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
                      Our verified mechanic comes to you — home, office, or roadside.
                      No garage visits. No waiting. Just professional bike service wherever you are.
                    </p>
                  </div>
                </FadeIn>
                
                <FadeIn delay={200} className="flex">
                  <div className="bg-white dark:bg-[#111] p-8 sm:p-10 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm flex flex-col items-start w-full">
                    <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-yellow-400/20 animate-ping rounded-2xl"></div>
                      <LocateFixed className="w-8 h-8 text-yellow-600 dark:text-yellow-500 relative z-10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Live Mechanic Tracking</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
                      Track your mechanic’s location in real time from arrival to service completion.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}`;

content = content.replace(target, featureSection);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Added features section.");
