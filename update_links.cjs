const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<a href="#home" className="block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </a>',
  '<button onClick={() => { setSelectedPackage({ name: "General Bike Service", price: "₹699" }); setIsPackageModalOpen(true); }} className="w-full block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </button>'
);

content = content.replace(
  '<a href="#home" className="block bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </a>',
  '<button onClick={() => { setSelectedPackage({ name: "Service + Engine Oil", price: "₹1,249" }); setIsPackageModalOpen(true); }} className="w-full block bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </button>'
);

content = content.replace(
  '<a href="#home" className="block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </a>',
  '<button onClick={() => { setSelectedPackage({ name: "Jump Start Service", price: "₹399" }); setIsPackageModalOpen(true); }} className="w-full block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </button>'
);

content = content.replace(
  '<a href="#home" className="block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </a>',
  '<button onClick={() => { setSelectedPackage({ name: "Puncture Repair", price: "₹599" }); setIsPackageModalOpen(true); }} className="w-full block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">\n                        Book Now\n                      </button>'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Updated links to buttons");
