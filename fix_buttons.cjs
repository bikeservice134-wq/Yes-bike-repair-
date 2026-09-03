const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  />Select Package<\/button>/g,
  '>Book Now</button>'
);

content = content.replace(
  />Book Now →<\/button>/g,
  '>Book Now</button>'
);

content = content.replace(
  />Book Jump Start<\/button>/g,
  '>Book Now</button>'
);

content = content.replace(
  />🚀 Checkout<\/button>/g,
  '>Book Now</button>'
);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Buttons updated');
