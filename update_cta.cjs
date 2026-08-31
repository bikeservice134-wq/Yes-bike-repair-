const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const tCTA = `<section className="py-20 px-5 text-center bg-yellow-500">
                  <FadeIn>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[42px] font-bold mb-[15px] leading-tight text-white">Bike Problem? We've Got You Covered.</h2>
          <p className="text-white/90 font-medium text-lg mb-[25px]">Book a professional bike mechanic at your doorstep.</p>
          <a href="#home" className="inline-block bg-white text-yellow-500 hover:bg-gray-100 px-8 py-4 rounded-xl font-extrabold transition-colors text-lg shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-2xl">
            Book Your Service
          </a>
        </div>
                    </FadeIn>
      </section>`;

const rCTA = `<section className="py-24 px-5 text-center bg-yellow-400 relative overflow-hidden">
        {/* Soft decorative background patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
        <FadeIn>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-[44px] md:text-[52px] font-black mb-[15px] leading-[1.1] text-gray-900 tracking-tight">Bike Problem? We've Got You Covered.</h2>
            <p className="text-gray-900/80 font-semibold text-lg md:text-xl mb-[30px] max-w-2xl mx-auto">Book a professional, certified bike mechanic directly to your doorstep in minutes.</p>
            <a href="#home" className="inline-block bg-gray-900 text-white hover:bg-black px-10 py-4 rounded-full font-bold transition-all text-lg shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)] hover:-translate-y-1">
              Book Your Service
            </a>
          </div>
        </FadeIn>
      </section>`;

if (content.includes(tCTA)) {
  content = content.replace(tCTA, rCTA);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated CTA!");
} else {
  console.log("Could not find CTA");
}
