const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const galleryData = `
const galleryImages = [
  "https://images.unsplash.com/photo-1599256621730-535171e28e50?w=800&q=80",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
  "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80",
  "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
  "https://images.unsplash.com/photo-1610260471960-953b942e5d16?w=800&q=80",
];
`;

const gallerySection = `
          {/* GALLERY SECTION */}
          <section className="py-24 px-5 bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                    Our Work <span className="text-yellow-500 dark:text-yellow-400">in Action</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-lg">Visual proof of our high-quality doorstep service and professional equipment.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {galleryImages.map((src, idx) => (
                    <div key={idx} className="overflow-hidden rounded-[24px] border border-gray-200 dark:border-[#333] group relative aspect-square">
                      <img 
                        src={src} 
                        alt={\`Service Gallery Image \${idx + 1}\`} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>
`;

// Insert the array at the top
const insertPoint1 = content.indexOf('export default function App() {');
content = content.slice(0, insertPoint1) + galleryData + '\n' + content.slice(insertPoint1);

// Insert the section before REVIEWS
const insertPoint2 = content.indexOf('{/* REVIEWS */}');
content = content.slice(0, insertPoint2) + gallerySection + '\n          ' + content.slice(insertPoint2);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Gallery added successfully');
