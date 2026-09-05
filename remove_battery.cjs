const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Remove from dropdown
const dropdownItem = `                              <option value="Battery Replacement (₹1,499)">🔋 Battery - ₹1,499</option>\n`;
content = content.replace(dropdownItem, '');

// Remove from packageDetailsData
const pdStart = `    'Battery Replacement': [`;
const pdEnd = `    ]`;
if (content.includes(pdStart)) {
    const startIdx = content.indexOf(pdStart);
    // Find next closing bracket
    const endIdx = content.indexOf(pdEnd, startIdx) + pdEnd.length;
    content = content.substring(0, startIdx) + content.substring(endIdx);
    
    // Cleanup any lingering empty commas or spaces if needed, but in this case it's the last item in the object so it might leave a comma before it or something, wait, `Running Repair` was at line 83? Let's check `cat -n src/App.tsx | sed -n '80,105p'` to be sure.
    // Instead of substring, I will use regex
    content = content.replace(/\s*'Battery Replacement': \[\s*.*?\s*\]\s*/s, '\n');
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Battery Replacement removed successfully.");
