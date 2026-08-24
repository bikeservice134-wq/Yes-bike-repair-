const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const importStatement = `import coverageMapUrl from './assets/images/coverage_map_illustration_1787573120801.jpg';\n`;

// Insert the import
content = content.replace(
    "import logoUrl from './assets/images/bike_service_logo_1787571187541.jpg';",
    "import logoUrl from './assets/images/bike_service_logo_1787571187541.jpg';\n" + importStatement
);

const coverageSection = `
      {/* COVERAGE AREA */}
      <section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-[#303030] bg-gray-50 dark:bg-[#101010] p-3 aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                 <img src={coverageMapUrl} alt="Service Coverage Map" className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none rounded-2xl"></div>
              </div>
              
              <div>
                <h2 className="text-[36px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                  Our Service <span className="text-red-700 dark:text-red-600">Coverage</span>
                </h2>
                <p className="text-gray-600 dark:text-[#bdbdbd] mb-8 text-[17px]">
                  We currently provide doorstep repair services across major neighborhoods in Bangalore. Fast, reliable, and right at your location.
                </p>
                
                <div className="flex flex-wrap gap-2.5">
                  {AVAILABLE_LOCATIONS.map((loc, idx) => (
                    <span key={'loc-'+idx} className="bg-gray-50 dark:bg-[#151515] text-gray-800 dark:text-[#ddd] px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-200 dark:border-[#333] shadow-sm flex items-center gap-2 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-default">
                      <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
`;

content = content.replace(
    `      {/* FAQ */}\n      <section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">`,
    coverageSection + '\n' + `      {/* FAQ */}\n      <section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">`
);

fs.writeFileSync('src/App.tsx', content);
