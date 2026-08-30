const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `<div className="max-w-6xl w-full mx-auto px-5 py-16 flex flex-col justify-center items-center text-center">`;
const targetEnd = `</section>`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = `<div className="max-w-4xl w-full mx-auto px-5 py-24 flex flex-col justify-center items-center text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Expert Two-Wheeler Repair <br className="hidden md:block"/>
              <span className="text-yellow-500">at Your Doorstep</span>
            </h1>
            <p className="text-gray-600 dark:text-[#bdbdbd] text-lg md:text-xl max-w-[700px] mb-10 mx-auto leading-relaxed">
              Professional two-wheeler servicing at your home.
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
          </div>
        </div>
                    </FadeIn>
      </section>`;
    content = content.substring(0, startIndex) + newContent + content.substring(endIndex + targetEnd.length);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Hero fixed!");
} else {
    console.log("Could not find hero");
}
