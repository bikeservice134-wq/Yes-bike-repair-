const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /{([^}]*)\/\* QUICK CONTACT MINI-BAR \*\/([^}]*)<div className="fixed right-5 bottom-5 flex flex-col sm:flex-row items-end sm:items-center gap-3 z-50">/;
const replacement = `{/* QUICK CONTACT MINI-BAR */}
      <div className="fixed right-5 bottom-5 flex flex-col sm:flex-row items-end sm:items-center gap-3 z-50">
        <button
          onClick={() => setIsQuoteModalOpen(true)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-full shadow-[0_5px_25px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_25px_rgba(0,0,0,0.5)] border border-yellow-400 hover:scale-105 transition-all font-black text-sm shrink-0 animate-bounce sm:animate-none"
        >
          <FileText className="w-5 h-5" />
          Quick Quote
        </button>`;

content = content.replace(/\{\/\* QUICK CONTACT MINI-BAR \*\/\}\s*<div className="fixed right-5 bottom-5 flex flex-col sm:flex-row items-end sm:items-center gap-3 z-50">/, replacement);

fs.writeFileSync('src/App.tsx', content);
console.log("Added Quick Quote button to mini-bar!");
