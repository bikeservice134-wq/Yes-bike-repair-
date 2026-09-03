const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const ulClose = '                  </ul>';
const pOpen = '                                    <p className="text-lg font-bold text-gray-900 dark:text-white">';

content = content.replace(ulClose + '\\n' + pOpen, ulClose + '</div>\\n' + pOpen);
// Let's use a regex to be safe!
content = content.replace(/<\/ul>\s*<p className="text-lg font-bold text-gray-900 dark:text-white">/, '</ul></div>\n                                    <p className="text-lg font-bold text-gray-900 dark:text-white">');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Fixed missing div');
