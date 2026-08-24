const fs = require('fs');

// App.tsx
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/YES <span className="text-gray-900 dark:text-white">BIKE & CAR REPAIR<\/span>/g, 'YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>');
content = content.replace(/YES Bike & Car Repair/g, 'Yes Bike Service');
fs.writeFileSync('src/App.tsx', content);

// index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace(/<title>.*<\/title>/, '<title>Yes Bike Service</title>');
indexContent = indexContent.replace(/<meta property="og:title" content=".*" \/>/, '<meta property="og:title" content="Yes Bike Service" />');
indexContent = indexContent.replace(/<meta name="description" content=".*" \/>/, '<meta name="description" content="Expert doorstep bike service and mechanic on call." />');
indexContent = indexContent.replace(/<meta property="og:description" content=".*" \/>/, '<meta property="og:description" content="Expert doorstep bike service and mechanic on call." />');
fs.writeFileSync('index.html', indexContent);

