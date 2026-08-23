const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replacements map
const replacements = [
  ['bg-white', 'bg-white dark:bg-[#1d1d1d]'], // For cards
  ['bg-[#0b0b0b]', 'bg-[#0b0b0b]'], // preserve if any
  ['text-gray-900', 'text-gray-900 dark:text-white'],
  ['bg-gray-50', 'bg-gray-50 dark:bg-[#101010]'], // backgrounds
  ['border-gray-200', 'border-gray-200 dark:border-[#303030]'],
  ['border-gray-300', 'border-gray-300 dark:border-[#444]'],
  ['text-gray-600', 'text-gray-600 dark:text-[#bdbdbd]'],
  ['text-[#e5a900]', 'text-[#e5a900] dark:text-[#ffc107]'],
  ['text-gray-800', 'text-gray-800 dark:text-[#ddd]'],
  ['text-gray-500', 'text-gray-500 dark:text-[#bdbdbd]'],
  ['text-gray-400', 'text-gray-400 dark:text-[#bdbdbd]'],
  ['shadow-sm', 'shadow-sm dark:shadow-none'],
  ['shadow-md', 'shadow-md dark:shadow-none'],
  ['shadow-xl', 'shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]'],
  ['bg-[#fffdf0]', 'bg-[#fffdf0] dark:bg-[#1d1d1d]'],
];

// Special case for root div:
content = content.replace(
  'className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#ffc107] selection:text-black"',
  'className={`min-h-screen ${isDark ? "dark" : ""} transition-colors duration-300`}'
);
content = content.replace(
  '<div className={`min-h-screen ${isDark ? "dark" : ""} transition-colors duration-300`}>',
  '<div className={`min-h-screen ${isDark ? "dark" : ""} transition-colors duration-300`}>\n      <div className="bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white font-sans selection:bg-[#ffc107] selection:text-black min-h-screen">'
);
content = content.replace(
  '    </div>\n  );\n}',
  '      </div>\n    </div>\n  );\n}'
);

for (const [find, replace] of replacements) {
  content = content.split(find).join(replace);
}

// Ensure cards that used bg-white get the correct dark background (1d1d1d)
// Root bg-white was handled, but let's check other bg-white replacements.
// Wait, the header was bg-white/95. Let's fix that.
content = content.replace('bg-white dark:bg-[#1d1d1d]/95', 'bg-white/95 dark:bg-[#0b0b0b]/95'); // since split replaces exactly

// Fix hero gradient
content = content.replace(
  "background: 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), radial-gradient(circle at 80% 40%, #fff9e6, #ffffff 45%, #f9fafb)'",
  "background: isDark ? 'linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.65)), radial-gradient(circle at 80% 40%, #5a4300, #111 45%, #000)' : 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), radial-gradient(circle at 80% 40%, #fff9e6, #ffffff 45%, #f9fafb)'"
);

// Add imports for Moon/Sun and state
content = content.replace('ChevronDown', 'ChevronDown,\n  Moon,\n  Sun');
content = content.replace('const [activeFaq, setActiveFaq] = useState<number | null>(null);', 'const [activeFaq, setActiveFaq] = useState<number | null>(null);\n  const [isDark, setIsDark] = useState(false);');

// Add toggle button to header
const toggleBtn = `
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <a href="#booking" className="hidden md:inline-flex bg-[#ffc107] hover:bg-[#e5a900] text-black px-5 py-2.5 rounded-lg font-extrabold transition-colors ml-4">
`;
content = content.replace('<a href="#booking" className="hidden md:inline-flex bg-[#ffc107] hover:bg-[#e5a900] text-black px-5 py-2.5 rounded-lg font-extrabold transition-colors">', toggleBtn);

fs.writeFileSync('src/App.tsx', content);
