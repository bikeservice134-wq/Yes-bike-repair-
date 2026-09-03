const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Find the start and end of galleryImages
const imagesStart = content.indexOf('const galleryImages = [');
const imagesEnd = content.indexOf('];\n', imagesStart) + 3;
if (imagesStart !== -1 && imagesEnd !== -1) {
  content = content.slice(0, imagesStart) + content.slice(imagesEnd);
}

// Find the start and end of the gallery section
const sectionStart = content.indexOf('{/* GALLERY SECTION */}');
const sectionEnd = content.indexOf('{/* REVIEWS */}');
if (sectionStart !== -1 && sectionEnd !== -1) {
  content = content.slice(0, sectionStart) + content.slice(sectionEnd);
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Gallery removed successfully');
