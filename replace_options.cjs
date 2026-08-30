const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `                  <option value="">Select Service *</option>
                  {heroVehicle === 'Car_Removed' ? (
                    <>
                      <option>₹999 Jump Start</option>
                      <option>₹999 Puncture Repair</option>
                      <option>Repair / Other</option>
                    </>
                  ) : (
                    <>
                      <option>₹699 General servicing</option>
                      <option>₹399 Basic servicing</option>
                      <option>₹1,339 Full Service</option>
                      <option>Repair / Other</option>
                    </>
                  )}`;

const newContent = `                  <option value="">Select Service *</option>
                  <option>General Bike Service ₹699</option>
                  <option>General Service with Engine Oil ₹1,249</option>
                  <option>Jump Start Service ₹399</option>
                  <option>Puncture Repair ₹599</option>
                  <option>Repair / Other</option>`;

if (content.includes(target)) {
    content = content.replace(target, newContent);
    fs.writeFileSync('src/App.tsx', content);
    console.log("Replaced successfully!");
} else {
    console.error("Target string not found!");
}
