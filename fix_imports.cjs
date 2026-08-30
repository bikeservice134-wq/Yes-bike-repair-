const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace('Facebook\n} from \'lucide-react\';', 'Facebook,\n  MapPin,\n  ArrowRight\n} from \'lucide-react\';');
fs.writeFileSync('src/App.tsx', content);
console.log("Imports added");
