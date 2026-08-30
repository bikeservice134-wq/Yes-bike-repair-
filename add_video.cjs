const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `              <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-[17px]">
                From routine maintenance to complete overhauls, we offer a wide range of services to keep your two-wheeler in top condition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;

const newContent = `              <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-[17px]">
                From routine maintenance to complete overhauls, we offer a wide range of services to keep your two-wheeler in top condition.
              </p>
            </div>

            {/* VIDEO PREVIEW SECTION */}
            <div className="mb-14 relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-[#303030] aspect-video sm:aspect-[21/9] max-h-[400px] w-full group bg-black">
              <video 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" 
                autoPlay 
                loop 
                muted 
                playsInline
                src="https://cdn.coverr.co/videos/coverr-mechanic-working-on-a-car-engine-2401/1080p.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex justify-between items-end">
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-yellow-500" /> Expert Mechanics at Work
                  </h3>
                  <p className="text-gray-300 max-w-md text-sm md:text-base">
                    Every service follows a strict 40-point checklist ensuring absolute safety, performance, and longevity.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-yellow-500/90 backdrop-blur-sm text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> Live Preview
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;

if (content.includes(target)) {
    content = content.replace(target, newContent);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Replaced successfully!");
} else {
    console.error("Target string not found!");
}
