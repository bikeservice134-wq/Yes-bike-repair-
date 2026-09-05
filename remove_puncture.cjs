const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove from Hero
const heroItem = `                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        Puncture Repair
                      </li>`;
content = content.replace(heroItem, '');

// 2. Remove from Dropdown
const dropdownItem = `                              <option value="Puncture Repair (₹599)">🔘 Puncture - ₹599</option>\n`;
content = content.replace(dropdownItem, '');

// 3. Remove Package Card
const startCard = `                {/* Puncture Repair */}`;
const endCard = `                </FadeIn>`;
if (content.includes(startCard)) {
    const startIdx = content.indexOf(startCard);
    // Find the NEXT </FadeIn> after startIdx
    const endIdx = content.indexOf(endCard, startIdx) + endCard.length;
    if (endIdx > startIdx) {
        content = content.substring(0, startIdx) + content.substring(endIdx);
    }
}

// 4. Remove from packageDetailsData
const pdStart = `    'Puncture Repair': [`;
const pdEnd = `    ],`;
if (content.includes(pdStart)) {
    const startIdx = content.indexOf(pdStart);
    // Find next closing bracket
    const endIdx = content.indexOf(pdEnd, startIdx) + pdEnd.length;
    // there's a comma after it maybe? Let's just remove the block and any trailing comma if we can, or just replace the specific string
    
    // Let's use regex to replace it
    content = content.replace(/    'Puncture Repair': \[\s*.*?    \],/s, '');
}

// 5. Remove from Footer
content = content.replace(`              <li>Puncture Repair</li>\n`, '');

// 6. Update SEO text
content = content.replace('and tyre puncture repairs.', 'and general maintenance.');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Puncture Repair removed successfully.");
