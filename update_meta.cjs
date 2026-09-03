const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf-8');
indexHtml = indexHtml.replace(/<title>.*?<\/title>/, '<title>Yes Bike Service | Premium Bike Service at Home</title>');
indexHtml = indexHtml.replace(/<meta name="description" content=".*?" \/>/, '<meta name="description" content="Book a certified mechanic in just 30 seconds. We come to you—home, office, or roadside. Fast, reliable, and transparent." />');
indexHtml = indexHtml.replace(/<meta property="og:title" content=".*?" \/>/, '<meta property="og:title" content="Yes Bike Service | Premium Bike Service at Home" />');
indexHtml = indexHtml.replace(/<meta property="og:description" content=".*?" \/>/, '<meta property="og:description" content="Book a certified mechanic in just 30 seconds. We come to you—home, office, or roadside. Fast, reliable, and transparent." />');
fs.writeFileSync('index.html', indexHtml, 'utf-8');

let metadata = JSON.parse(fs.readFileSync('metadata.json', 'utf-8'));
metadata.description = "Book a certified mechanic in just 30 seconds. We come to you—home, office, or roadside. Fast, reliable, and transparent.";
fs.writeFileSync('metadata.json', JSON.stringify(metadata, null, 2), 'utf-8');

console.log('Updated meta tags');
