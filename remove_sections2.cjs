const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const heroStart = '{/* HERO */}';
const servicesStart = '{/* OUR SERVICES */}';

const heroStartIndex = content.indexOf(heroStart);
const servicesStartIndex = content.indexOf(servicesStart);

if (heroStartIndex !== -1 && servicesStartIndex !== -1) {
    content = content.substring(0, heroStartIndex) + content.substring(servicesStartIndex);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Sections removed successfully");
} else {
    console.log("Could not find boundaries");
}
