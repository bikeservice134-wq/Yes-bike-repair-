const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const gallerySection = `      {/* SERVICE GALLERY */}
      <section className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-11">
              <h2 className="text-[40px] font-bold mb-2.5 leading-tight text-gray-900 dark:text-white">
                Service <span className="text-[#e5a900] dark:text-[#ffc107]">Gallery</span>
              </h2>
              <p className="text-gray-600 dark:text-[#bdbdbd]">Professional service, handled by experts right in front of you.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="overflow-hidden rounded-2xl h-[280px] sm:h-64 shadow-sm group">
                <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800" alt="Motorbike Mechanic" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="overflow-hidden rounded-2xl h-[280px] sm:h-64 shadow-sm group">
                <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800" alt="Car Engine Repair" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="overflow-hidden rounded-2xl h-[280px] sm:h-64 shadow-sm group">
                <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800" alt="Professional Mechanics" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="overflow-hidden rounded-2xl h-[280px] sm:h-64 shadow-sm group">
                <img src="https://images.unsplash.com/photo-1632823469888-06798c8c51dd?auto=format&fit=crop&q=80&w=800" alt="Doorstep Service Van" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

`;

content = content.replace(gallerySection, "");
content = content.replace('<section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">', '<section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">');

fs.writeFileSync('src/App.tsx', content);
