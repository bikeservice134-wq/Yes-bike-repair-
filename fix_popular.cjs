const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'hidden md:flex',
  'hidden lg:flex'
);

content = content.replace(
  'dark:shadow-none md:hidden">',
  'dark:shadow-none lg:hidden">'
);

fs.writeFileSync('src/App.tsx', content);
