const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the Wrench icon with the uploaded logo image in the header
const targetHeader = `<div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"><Wrench className="w-6 h-6 text-black" /></div>`;
const newHeader = `<img src="/IMG_20260904_185235.jpg" alt="Yes Bike Service Logo" className="w-10 h-10 rounded-full shadow-sm group-hover:scale-105 transition-transform object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} /><div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform hidden"><Wrench className="w-6 h-6 text-black" /></div>`;

if (content.includes(targetHeader)) {
    content = content.replace(targetHeader, newHeader);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Header logo updated");
} else {
    console.log("Could not find header logo to replace.");
}

// Check footer for logo
const targetFooter = `<div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm"><Wrench className="w-6 h-6 text-black" /></div>`;
const newFooter = `<img src="/IMG_20260904_185235.jpg" alt="Yes Bike Service Logo" className="w-10 h-10 rounded-full shadow-sm object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} /><div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm hidden"><Wrench className="w-6 h-6 text-black" /></div>`;

if (content.includes(targetFooter)) {
    content = content.replace(targetFooter, newFooter);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Footer logo updated");
} else {
    console.log("Could not find footer logo to replace.");
}

