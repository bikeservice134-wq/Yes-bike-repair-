const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const heroStart = '<div className="max-w-6xl w-full mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">';
const heroEnd = '</FadeIn>\n      </section>';

const heroStartIndex = content.indexOf(heroStart);
const heroEndIndex = content.indexOf(heroEnd, heroStartIndex);

if (heroStartIndex !== -1 && heroEndIndex !== -1) {
    const newHero = `<div className="max-w-4xl w-full mx-auto px-5 py-24 flex flex-col justify-center items-center text-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Two Wheeler Service <br className="hidden md:block"/>
              <span className="text-yellow-500">at Home</span>
            </h1>
            <p className="text-gray-600 dark:text-[#bdbdbd] text-lg md:text-xl max-w-[700px] mb-10 mx-auto leading-relaxed">
              Professional two-wheeler servicing at your home in Bangalore.
              Book a verified mechanic online and get your vehicle fixed
              without visiting a service center.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#pricing" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-extrabold transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg w-full sm:w-auto text-center flex items-center justify-center gap-2">
                <Wrench className="w-5 h-5" /> View Service Packages
              </a>
              <a href="#services" className="bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#222] border border-gray-200 dark:border-[#333] text-gray-800 dark:text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm text-lg w-full sm:w-auto text-center">
                Explore Services
              </a>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center justify-center mt-12">
              <div className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" /> Doorstep Service
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" /> Transparent Pricing
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" /> 1 Month Warranty
              </div>
            </div>
          </div>
        </div>
        `;
        
    content = content.substring(0, heroStartIndex) + newHero + content.substring(heroEndIndex);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Form removed and hero re-centered");
} else {
    console.log("Could not find boundaries");
}
