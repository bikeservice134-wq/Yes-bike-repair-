const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace("export default \nconst AVAILABLE_LOCATIONS", "const AVAILABLE_LOCATIONS");
content = content.replace("export default const AVAILABLE_LOCATIONS", "const AVAILABLE_LOCATIONS");
fs.writeFileSync('src/App.tsx', content);
