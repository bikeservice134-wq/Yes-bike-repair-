const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const currentHero = `<h1 className="text-4xl sm:text-[52px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-4">
                      Bike Service at <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Home in Bangalore</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-medium max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                      Get professional bike servicing and repairs at your doorstep in Bangalore. Our verified mechanics handle periodic service, engine repairs, battery replacement, wheel alignment, tyre care, and more—at your home, office, or roadside.
                    </p>`;

const oldHero = `<h1 className="text-4xl sm:text-[52px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-4">
                      Bengaluru's <br className="block sm:hidden lg:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Doorstep Bike Repair</span>
                    </h1>`;

if (content.includes(currentHero)) {
    content = content.replace(currentHero, oldHero);
    console.log("Hero text reverted.");
} else {
    console.log("Could not find the current hero text block.");
}

// Revert button texts
const oldFormButton = `Book a Mechanic Today`;
content = content.replaceAll(oldFormButton, `Book Mechanic Now`);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Button text reverted.");
