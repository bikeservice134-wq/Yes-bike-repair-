const fs = require('fs');
let content = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));
content.name = "Yes Bike Service";
fs.writeFileSync('metadata.json', JSON.stringify(content, null, 2));
