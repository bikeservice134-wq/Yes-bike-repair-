const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('import { PrivacyPolicy } from "./PrivacyPolicy";')) {
  content = content.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { PrivacyPolicy } from \"./PrivacyPolicy\";");
}

if (!content.includes('const [currentView, setCurrentView] = useState(')) {
  content = content.replace('const [isDark, setIsDark] = useState(() => {', 'const [currentView, setCurrentView] = useState<"home" | "privacy">("home");\n  const [isDark, setIsDark] = useState(() => {');
}

// Ensure header handles navigation back to home
const headerLogoOld = `            <div className="text-[25px] font-black text-red-600 leading-none">\n              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>\n            </div>`;
const headerLogoNew = `            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-black text-red-600 leading-none text-left">\n              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>\n            </button>`;
content = content.replace(headerLogoOld, headerLogoNew);

// Hide/Show main content sections based on currentView
content = content.replace('{/* HERO */}', '{currentView === "home" ? (\n        <main>\n      {/* HERO */}');

const footerOld = `      {/* FOOTER */}
      <footer className="bg-white dark:bg-[#1d1d1d] py-10 px-5 text-center border-t border-gray-200 dark:border-[#303030]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center gap-2 mb-3">
            <img src={logoUrl} alt="Yes Bike Service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
            <div className="text-[25px] font-black text-red-600 leading-none">
              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-[#bdbdbd] text-[14px]">Professional doorstep bike and car repair service.</p>
          <p className="text-gray-400 dark:text-[#bdbdbd] text-[14px] mt-2.5">© 2026 Yes Bike Service. All Rights Reserved.</p>
        </div>
      </footer>`;

const footerNew = `      </main>\n      ) : <PrivacyPolicy />}\n      {/* FOOTER */}
      <footer className="bg-white dark:bg-[#1d1d1d] py-10 px-5 text-center border-t border-gray-200 dark:border-[#303030]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center gap-2 mb-3">
            <img src={logoUrl} alt="Yes Bike Service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-black text-red-600 leading-none">
              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>
            </button>
          </div>
          <p className="text-gray-500 dark:text-[#bdbdbd] text-[14px]">Professional doorstep bike and car repair service.</p>
          <div className="flex justify-center gap-4 mt-3">
            <button onClick={() => { setCurrentView('privacy'); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Privacy Policy</button>
          </div>
          <p className="text-gray-400 dark:text-[#bdbdbd] text-[14px] mt-2.5">© 2026 Yes Bike Service. All Rights Reserved.</p>
        </div>
      </footer>`;

content = content.replace(footerOld, footerNew);

fs.writeFileSync('src/App.tsx', content);
