const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `                    <h1 className="text-4xl sm:text-[52px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-4">
                      Bengaluru's <br className="block sm:hidden lg:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Doorstep Bike Repair</span>
                    </h1>`;

const newText = `                    <h1 className="text-4xl sm:text-[52px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-4">
                      Bengaluru's <br className="block sm:hidden lg:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Doorstep Bike Repair</span>
                    </h1>
                    <ul className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-bold flex flex-col gap-3 mx-auto lg:mx-0 mb-8 mt-8">
                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        General Service
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        General Service + Engine Oil
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        Jump Start Service
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        Puncture Repair
                      </li>
                    </ul>`;

if (content.includes(target)) {
    content = content.replace(target, newText);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Hero updated.");
} else {
    console.log("Could not find target.");
}
