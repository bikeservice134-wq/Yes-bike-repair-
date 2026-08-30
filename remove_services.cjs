const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const servicesStart = '{/* OUR SERVICES */}';
const servicesEnd = '      </section>\n      {/* BRANDS WE SERVICE */}';
const servicesStartIndex = content.indexOf(servicesStart);
const servicesEndIndex = content.indexOf(servicesEnd, servicesStartIndex);

if (servicesStartIndex !== -1 && servicesEndIndex !== -1) {
    content = content.substring(0, servicesStartIndex) + content.substring(servicesEndIndex + '      </section>\n      '.length);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Services section removed successfully");
} else {
    console.log("Could not find boundaries");
}
