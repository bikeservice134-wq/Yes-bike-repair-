const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Insert Premium Brands section
const premiumBrandsSection = `
      {/* PREMIUM BRANDS */}
      <section className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
              Premium Cars & bikes Brands<br/><span className="text-red-700 dark:text-red-600">We Service</span>
            </h2>
            <p className="text-gray-600 dark:text-[#bdbdbd] text-[17px] max-w-3xl mx-auto">
              Top Premium Car & bike Brands We Service: Expert Maintenance and Repairs for Luxury Vehicles.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Jaguar', 'Land Rover', 'Volvo', 'Lexus', 'Harley-Davidson', 'Ducati', 'Triumph', 'Kawasaki'].map(brand => (
                 <div key={'premium-'+brand} className="flex items-center justify-center p-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl hover:border-red-300 hover:bg-red-50 dark:hover:border-[#442222] dark:hover:bg-[#221111] transition-all group cursor-default shadow-sm">
                   <span className="font-bold text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500 text-sm md:text-[15px] uppercase tracking-wider text-center">
                     {brand}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        </FadeIn>
      </section>

      {/* TRUSTED BY RIDERS */}
`;

content = content.replace('      {/* TRUSTED BY RIDERS */}', premiumBrandsSection);

// 2. Change TRUSTED BY RIDERS background to bg-white
content = content.replace(
  '{/* TRUSTED BY RIDERS */}\n      <section className="py-16 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">',
  '{/* TRUSTED BY RIDERS */}\n      <section className="py-16 px-5 bg-white dark:bg-[#1d1d1d] border-t border-gray-200 dark:border-[#303030]">'
);

fs.writeFileSync('src/App.tsx', content);
