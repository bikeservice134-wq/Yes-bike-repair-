const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('font-family')) {
  css += `\nbody {\n  font-family: 'Plus Jakarta Sans', sans-serif;\n}\n`;
  fs.writeFileSync('src/index.css', css);
}
