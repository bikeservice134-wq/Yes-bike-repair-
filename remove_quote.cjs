const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the Quick Quote button
content = content.replace(
  /<button\s*onClick=\{\(\) => setIsQuoteModalOpen\(true\)\}\s*className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-full shadow-\[0_5px_25px_rgba\(0,0,0,0\.2\)\] dark:shadow-\[0_5px_25px_rgba\(0,0,0,0\.5\)\] border border-yellow-400 hover:scale-105 transition-all font-black text-sm shrink-0 animate-bounce sm:animate-none"\s*>\s*<FileText className="w-5 h-5" \/>\s*Quick Quote\s*<\/button>/,
  ""
);

// 2. Remove the QUOTE MODAL entirely
const modalRegex = /\s*\{\/\* QUOTE MODAL \*\/\}\s*\{isQuoteModalOpen && \([\s\S]*?<\/div>\s*\)\}\s*\{quoteSuccess && <Toast message="Quote request sent! We'll contact you shortly\." onClose=\{\(\) => setQuoteSuccess\(false\)\} \/>\}/;
content = content.replace(modalRegex, "");

// 3. Remove state variables for quote
content = content.replace(/const \[isQuoteModalOpen, setIsQuoteModalOpen\] = useState\(false\);\n\s*/, "");
content = content.replace(/const \[quoteSuccess, setQuoteSuccess\] = useState\(false\);\n\s*/, "");

// 4. Remove FileText import
content = content.replace(/,\s*FileText/, "");

fs.writeFileSync('src/App.tsx', content);
console.log("Removed quote features");
