const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace general colors
content = content.replace(/\[#ffc107\]/g, 'red-600');
content = content.replace(/\[#e5a900\]/g, 'red-700');

// Replace specific text-black on elements with the new bg-red-600 to text-white
content = content.replace(/bg-red-600 hover:bg-red-700 text-black/g, 'bg-red-600 hover:bg-red-700 text-white');
content = content.replace(/bg-red-600 text-black/g, 'bg-red-600 text-white');
content = content.replace(/selection:bg-red-600 selection:text-black/g, 'selection:bg-red-600 selection:text-white');

// Fix CTA Section Text Colors
content = content.replace(/text-black">Bike Problem\?/g, 'text-white">Bike Problem?');
content = content.replace(/text-black\/80/g, 'text-white/90');
content = content.replace(/bg-black text-white hover:bg-gray-900/g, 'bg-white text-red-600 hover:bg-gray-100');

// Fix pricing popular card background tint
content = content.replace(/bg-\[#fffdf0\]/g, 'bg-red-50');

// Header book button specifically in desktop nav:
content = content.replace(/hidden md:inline-flex bg-red-600 hover:bg-red-700 text-black/g, 'hidden md:inline-flex bg-red-600 hover:bg-red-700 text-white');

// The sun icon color
content = content.replace(/text-yellow-400/g, 'text-red-500');

fs.writeFileSync('src/App.tsx', content);
