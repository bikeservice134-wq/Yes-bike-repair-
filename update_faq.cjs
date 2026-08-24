const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeader = `<div className="text-center mb-11">
            <h2 className="text-[40px] font-bold mb-2.5 leading-tight text-gray-900 dark:text-white">
              Frequently Asked <span className="text-red-700 dark:text-red-600">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-[#bdbdbd]">Common questions about our repair services.</p>
          </div>`;

const newHeader = `<div className="text-center mb-11">
            <span className="text-red-600 font-black tracking-widest uppercase text-sm mb-3 block">Got Questions?</span>
            <h2 className="text-[36px] md:text-[40px] font-bold mb-3 leading-tight text-gray-900 dark:text-white">
              Frequently Asked <span className="text-red-700 dark:text-red-600">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-[#bdbdbd] text-[17px]">Everything you need to know about our doorstep auto service.</p>
          </div>`;

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/App.tsx', content);
