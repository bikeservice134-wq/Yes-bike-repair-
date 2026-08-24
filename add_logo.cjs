const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importToAdd = `import logoUrl from './assets/images/bike_service_logo_1787571187541.jpg';\n`;
if (!content.includes('logoUrl')) {
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\n" + importToAdd);
}

// Replace Header Logo
content = content.replace(
    `<div className="text-[25px] font-black text-red-600">\n            YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>\n          </div>`,
    `<div className="flex items-center gap-2">\n            <img src={logoUrl} alt="Yes Bike Service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />\n            <div className="text-[25px] font-black text-red-600 leading-none">\n              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>\n            </div>\n          </div>`
);

// Replace Footer Logo
content = content.replace(
    `<div className="text-[25px] font-black text-red-600 mb-2.5 block">\n            YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>\n          </div>`,
    `<div className="flex justify-center items-center gap-2 mb-3">\n            <img src={logoUrl} alt="Yes Bike Service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />\n            <div className="text-[25px] font-black text-red-600 leading-none">\n              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>\n            </div>\n          </div>`
);

fs.writeFileSync('src/App.tsx', content);
