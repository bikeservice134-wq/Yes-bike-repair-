const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetSection = content.substring(
  content.indexOf('{/* PRICING / PACKAGES */}'),
  content.indexOf('{/* COVERAGE SECTION */}')
);

const newSection = `
          {/* PRICING / PACKAGES */}
          <section id="pricing" className="py-12 bg-white dark:bg-[#0a0a0a]">
            <FadeIn>
              <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-center mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-white bg-[#ff0000] px-8 py-3 w-full max-w-3xl rounded-full text-center">
                    Our Popular Packages
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {popularPackages.map((pkg, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#161616] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
                      <img src={pkg.img} alt={pkg.title.replace('\\n', ' ')} className="w-full h-36 md:h-40 object-cover" />
                      <div className="p-4 flex-1 flex">
                        {/* Left Column */}
                        <div className="flex-1 flex flex-col justify-between">
                          <h3 className="text-gray-800 dark:text-gray-200 text-[15px] md:text-base whitespace-pre-line leading-tight">
                            {pkg.title}
                          </h3>
                          <div className="mt-4">
                            <button 
                              onClick={() => { 
                                setSelectedPackage({name: pkg.title.replace(/\\n/g, ' '), price: pkg.price}); 
                                setIsPackageModalOpen(true); 
                              }} 
                              className="bg-[#ff0000] text-white px-3 md:px-4 py-2 rounded text-sm font-medium leading-tight text-center"
                            >
                              Book<br />now
                            </button>
                          </div>
                        </div>
                        {/* Right Column */}
                        <div className="flex flex-col items-end justify-between ml-2">
                          <div className="text-right flex flex-col items-end">
                            <div className="text-gray-500 text-sm line-through leading-none mb-1">{pkg.originalPrice}</div>
                            <div className="text-black dark:text-white font-bold text-base md:text-lg leading-none">{pkg.price}</div>
                          </div>
                          <div className="flex flex-col items-center mt-4 mr-1">
                            <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#ffcc00] text-[#ffcc00]" />
                            <span className="text-black dark:text-white text-sm md:text-base mt-0.5">{pkg.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>
`;

content = content.replace(targetSection, newSection);
fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Layout updated.');
