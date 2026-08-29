const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldArray = `              {[
                { icon: Calendar, text: 'Periodic Service' },
                { icon: Settings, text: 'Engine Repair' },
                { icon: Truck, text: 'RSA Services' },
                { icon: Battery, text: 'Bike Batteries' },
                { icon: Droplet, text: 'Wash & Wheel Care' },
                { icon: Car, text: 'Accidental Repair' },
                { icon: SprayCan, text: 'Dent & Paint' },
                { icon: Car, text: 'Car Services' }
              ]`;

const newArray = `              {[
                { icon: Settings, text: 'Engine Repair' },
                { icon: Battery, text: 'Bike Batteries' },
                { icon: Droplet, text: 'Wash & Wheel Care' }
              ]`;

content = content.replace(oldArray, newArray);

const oldText = `Periodic bike services, two-wheeler batteries, bike inspection, tyre replacement, EV repair, engine oil replacement, full and half engine repair, and much more.`;
const newText = `Two-wheeler batteries, bike inspection, tyre replacement, EV repair, engine oil replacement, full and half engine repair, and much more.`;

content = content.replace(oldText, newText);

fs.writeFileSync('src/App.tsx', content);
