const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove Hero Section
const heroStart = '<section \n        id="home"';
const heroEnd = '      </section>\n      {/* TRUSTED BY RIDERS */}';
const heroStartIndex = content.indexOf(heroStart);
const heroEndIndex = content.indexOf(heroEnd, heroStartIndex);
if (heroStartIndex !== -1 && heroEndIndex !== -1) {
    content = content.substring(0, heroStartIndex) + content.substring(heroEndIndex + heroEnd.length - '      {/* TRUSTED BY RIDERS */}'.length);
}

// 2. Remove Trusted by Riders
const trustedStart = '{/* TRUSTED BY RIDERS */}';
const trustedEnd = '      </section>\n            {/* ABOUT US */}';
const trustedStartIndex = content.indexOf(trustedStart);
const trustedEndIndex = content.indexOf(trustedEnd, trustedStartIndex);
if (trustedStartIndex !== -1 && trustedEndIndex !== -1) {
    content = content.substring(0, trustedStartIndex) + content.substring(trustedEndIndex + '      </section>\n            '.length);
}

// 3. Remove About Us
const aboutStart = '{/* ABOUT US */}';
const aboutEnd = '      </section>\n      {/* OUR SERVICES */}';
const aboutStartIndex = content.indexOf(aboutStart);
const aboutEndIndex = content.indexOf(aboutEnd, aboutStartIndex);
if (aboutStartIndex !== -1 && aboutEndIndex !== -1) {
    content = content.substring(0, aboutStartIndex) + content.substring(aboutEndIndex + '      </section>\n      '.length);
}

fs.writeFileSync('src/App.tsx', content);
console.log("Sections removed!");
