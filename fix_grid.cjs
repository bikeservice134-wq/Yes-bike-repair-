const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
    'grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center',
    'flex flex-col justify-center items-center text-center'
);

content = content.replace(
    '<p className="text-gray-600 dark:text-[#bdbdbd] text-lg md:text-[19px] max-w-[620px] mb-8">',
    '<p className="text-gray-600 dark:text-[#bdbdbd] text-lg md:text-[19px] max-w-[620px] mb-8 mx-auto">'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Grid layout adjusted");
