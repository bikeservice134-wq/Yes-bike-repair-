const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldMessage = "const message = `Hello! I would like to book a service:\\n\\n*Vehicle Type:* ${heroVehicle}\\n*Brand:* ${brand}\\n*Model:* ${model}\\n*Service:* ${service}\\n*Time Slot:* ${time}\\n*Location:* ${locationSearch}\\n\\n*Name:* ${fullName}\\n*Phone:* ${phone}`;";

const newMessage = "const message = `🏍️🛵QUICK VEHICLE SERVICE BOOKING\\n\\n👤 Name: ${fullName}\\n📞 Phone: ${phone}\\n📍 Location: ${locationSearch}\\n🏍️ Vehicle: ${brand} ${model} (${heroVehicle})\\n🔧 Service Required: ${service}\\n⏰ Preferred Time Slot: ${time}\\n\\n✅ Book Now — Get a Mechanic at Your Doorstep`;";

content = content.replace(oldMessage, newMessage);
fs.writeFileSync('src/App.tsx', content);
console.log("Message template updated!");
