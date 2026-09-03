const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');

const packagesData = `
const popularPackages = [
  {
    title: "General\\nService",
    originalPrice: "₹1050",
    price: "₹599",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80"
  },
  {
    title: "General\\nService With\\nOil",
    originalPrice: "₹1550",
    price: "₹999",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1622175960965-06b208eb6758?w=800&q=80"
  },
  {
    title: "Running\\nRepair",
    originalPrice: "₹550",
    price: "₹399",
    rating: "4.6",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
  },
  {
    title: "Jump\\nStart",
    originalPrice: "₹550",
    price: "₹399",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1560935105-027f677fb6fc?w=800&q=80"
  }
];
`;

const newPricingSection = `
          {/* PRICING / PACKAGES */}
          <section id="pricing" className="py-12 px-4 md:px-5 bg-white dark:bg-[#0a0a0a]">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8 md:mb-10">
                  <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-white bg-[#ff0000] px-8 py-3 md:py-4 rounded-full text-center shadow-lg">
                    Our Popular Packages
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {popularPackages.map((pkg, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#161616] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-[#222] overflow-hidden flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
                      <img src={pkg.img} alt={pkg.title.replace('\\n', ' ')} className="w-full h-32 md:h-40 object-cover" />
                      <div className="p-3 md:p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-gray-800 dark:text-gray-200 font-medium text-sm md:text-base whitespace-pre-line leading-snug">
                            {pkg.title}
                          </h3>
                          <div className="text-right flex flex-col items-end">
                            <div className="text-gray-500 text-xs md:text-sm line-through leading-none mb-1.5">{pkg.originalPrice}</div>
                            <div className="text-black dark:text-white font-bold text-sm md:text-base leading-none">{pkg.price}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end mt-auto pt-2">
                          <button 
                            onClick={() => { 
                              setSelectedPackage({name: pkg.title.replace(/\\n/g, ' '), price: pkg.price}); 
                              setIsPackageModalOpen(true); 
                            }} 
                            className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-4 md:px-5 py-2 md:py-2.5 rounded text-sm md:text-base font-medium leading-tight text-center transition-colors shadow-sm"
                          >
                            Book<br />now
                          </button>
                          <div className="flex items-center gap-1 mb-1 md:mb-1.5">
                            <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#ffcc00] text-[#ffcc00]" />
                            <span className="text-gray-800 dark:text-gray-200 text-sm md:text-base">{pkg.rating}</span>
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

const startIndex = content.indexOf('{/* PRICING / PACKAGES */}');
const endIndex = content.indexOf('{/* HOW IT WORKS */}');

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = content.slice(0, startIndex) + packagesData + newPricingSection + content.slice(endIndex);
  fs.writeFileSync('src/App.tsx', newContent, 'utf-8');
  console.log('Successfully replaced pricing section');
} else {
  console.error('Could not find start or end index');
}
