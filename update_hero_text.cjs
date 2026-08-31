const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetContent = `            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Book in <span className="text-yellow-500">30 Seconds.</span>
            </h1>`;

const replacement = `            <h1 className="text-[44px] md:text-[56px] lg:text-[72px] font-black text-gray-900 dark:text-white leading-[1.05] mb-6 tracking-tight">
              Expert Bike Care. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-yellow-600">At Your Doorstep.</span>
            </h1>`;

if (content.includes(targetContent)) {
  content = content.replace(targetContent, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Hero Text successfully!");
} else {
  console.log("Could not find target content in App.tsx for Hero text");
}
