const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldPath = '/src/assets/images/brand_logo_1788528389927.jpg';
const newPath = '/src/assets/images/premium_bike_logo_1788528519448.jpg';

if (content.includes(oldPath)) {
    content = content.replaceAll(oldPath, newPath);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Logo updated with improved generated image");
} else {
    console.log("Could not find the previous logo path.");
}
