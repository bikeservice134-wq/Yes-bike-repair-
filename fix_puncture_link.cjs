const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<a href="#home" className="block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </a>',
  '<button onClick={() => { setSelectedPackage({ name: "Puncture Repair", price: "₹599" }); setIsPackageModalOpen(true); }} className="w-full block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </button>'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Fixed puncture link");
