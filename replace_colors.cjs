const fs = require('fs');

const files = ['src/App.tsx', 'src/PrivacyPolicy.tsx', 'src/TermsAndConditions.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace red classes with yellow classes
    content = content.replace(/text-red-600/g, 'text-yellow-500');
    content = content.replace(/text-red-700/g, 'text-yellow-600');
    content = content.replace(/text-red-500/g, 'text-yellow-400');
    content = content.replace(/text-red-400/g, 'text-yellow-300');
    
    // Background colors
    content = content.replace(/bg-red-600/g, 'bg-yellow-500');
    content = content.replace(/bg-red-700/g, 'bg-yellow-600');
    content = content.replace(/bg-red-500/g, 'bg-yellow-400');
    content = content.replace(/bg-red-100/g, 'bg-yellow-100');
    content = content.replace(/bg-red-50/g, 'bg-yellow-50');
    content = content.replace(/bg-red-900\/20/g, 'bg-yellow-900/20');
    
    // Borders
    content = content.replace(/border-red-600/g, 'border-yellow-500');
    content = content.replace(/border-red-500/g, 'border-yellow-400');
    content = content.replace(/border-red-200/g, 'border-yellow-200');
    
    // Hex colors
    content = content.replace(/#dc2626/g, '#eab308');
    content = content.replace(/#fee2e2/g, '#fef08a');
    
    // For buttons and selections, we need to change text-white to text-black if it's over a yellow background
    // E.g. bg-yellow-500 hover:bg-yellow-600 text-white -> bg-yellow-500 hover:bg-yellow-600 text-black
    // Let's do a simple regex for the common button patterns:
    content = content.replace(/bg-yellow-500 hover:bg-yellow-600 text-white/g, 'bg-yellow-500 hover:bg-yellow-600 text-black');
    content = content.replace(/bg-yellow-500 text-white/g, 'bg-yellow-500 text-black');
    content = content.replace(/selection:bg-yellow-500 selection:text-white/g, 'selection:bg-yellow-500 selection:text-black');
    content = content.replace(/group-hover:bg-yellow-500 group-hover:text-white/g, 'group-hover:bg-yellow-500 group-hover:text-black');
    content = content.replace(/marker:text-red-500/g, 'marker:text-yellow-500');

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
