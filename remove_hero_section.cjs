const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const heroStart = '      {/* HERO WITH BOOKING FORM */}';
const heroEnd = '      {/* BRANDS WE SERVICE */}';

const heroStartIndex = content.indexOf(heroStart);
const heroEndIndex = content.indexOf(heroEnd, heroStartIndex);

if (heroStartIndex !== -1 && heroEndIndex !== -1) {
    content = content.substring(0, heroStartIndex) + content.substring(heroEndIndex);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Hero section removed");
} else {
    console.log("Could not find boundaries");
}
