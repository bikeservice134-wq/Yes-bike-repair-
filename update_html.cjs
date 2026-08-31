const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('Plus+Jakarta+Sans')) {
  html = html.replace('</head>', '  <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">\n  </head>');
  fs.writeFileSync('index.html', html);
}
