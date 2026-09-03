const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');
const start = content.indexOf('{/* HERO SECTION */}');
const end = content.indexOf('{/* BOOKING FORM');
if (end === -1) {
  console.log(content.substring(start, start + 2000));
} else {
  console.log(content.substring(start, end));
}
