const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "{['Bike', 'Scooter', 'Car'].map(type => (",
  "{['Bike', 'Scooter'].map(type => ("
);

fs.writeFileSync('src/App.tsx', content);
