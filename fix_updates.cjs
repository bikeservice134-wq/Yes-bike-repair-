const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove the requested text
const textToRemove = `<p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-medium max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                      Excellent two-wheeler servicing right at your home or office.
                    </p>`;
const textToRemoveAlt = `<p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-medium max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">\n                      Excellent two-wheeler servicing right at your home or office.\n                    </p>`;

if (content.includes(textToRemove)) {
    content = content.replace(textToRemove, '');
} else if (content.includes(textToRemoveAlt)) {
    content = content.replace(textToRemoveAlt, '');
} else {
    // try replacing just the line
    content = content.replace('Excellent two-wheeler servicing right at your home or office.', '');
}

// 2. Update the logo path
const oldLogo = '/src/assets/images/premium_bike_logo_1788528519448.jpg';
const newLogo = '/src/assets/images/ultra_premium_bike_logo_1788610062922.jpg';
if (content.includes(oldLogo)) {
    content = content.replaceAll(oldLogo, newLogo);
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Updates applied.");
