const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "{['Bike', 'Scooter', 'Car'].map(type => (",
  "{['Bike', 'Scooter'].map(type => ("
);

// We need to also fix the heroVehicle logic if it depends on 'Car'
content = content.replace(
  "{heroVehicle === 'Car' ? (",
  "{heroVehicle === 'Car_Removed' ? (" // This will never be true now
);

fs.writeFileSync('src/App.tsx', content);
