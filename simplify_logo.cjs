const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldHeaderLogo = `<img src="/src/assets/images/ultra_premium_bike_logo_1788610062922.jpg" alt="Yes Bike Service Logo" className="w-10 h-10 rounded-full shadow-sm group-hover:scale-105 transition-transform object-cover"  /><div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform hidden"><Wrench className="w-6 h-6 text-black" /></div>`;
const newHeaderLogo = `<div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"><Wrench className="w-6 h-6 text-black" /></div>`;

const oldFooterLogo = `<img src="/src/assets/images/ultra_premium_bike_logo_1788610062922.jpg" alt="Yes Bike Service Logo" className="w-10 h-10 rounded-full shadow-sm object-cover"  /><div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm hidden"><Wrench className="w-6 h-6 text-black" /></div>`;
const newFooterLogo = `<div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm"><Wrench className="w-6 h-6 text-black" /></div>`;

if (content.includes(oldHeaderLogo)) {
    content = content.replace(oldHeaderLogo, newHeaderLogo);
    console.log("Header logo updated.");
}

if (content.includes(oldFooterLogo)) {
    content = content.replace(oldFooterLogo, newFooterLogo);
    console.log("Footer logo updated.");
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
