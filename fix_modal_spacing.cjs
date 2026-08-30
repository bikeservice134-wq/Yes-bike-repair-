const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">',
  '<label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">'
);
// replace all globally
content = content.replace(/<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1\.5">/g, '<label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">');

content = content.replace(
  '<div className="grid grid-cols-2 gap-3">',
  '<div className="grid grid-cols-2 gap-2">'
);

fs.writeFileSync('src/App.tsx', content);
