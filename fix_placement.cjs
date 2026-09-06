const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The chunk we accidentally put in the wrong place
const punctureCardRegex = /\s*{\/\* Puncture Repair \*\/}\s*<FadeIn delay=\{400\} className="flex">[\s\S]*?<\/FadeIn>\s*<\/div>/;
const match = content.match(punctureCardRegex);

if (match) {
  // Extract the card content, but remove the extra `</div>` at the end which we incorrectly added
  // Wait, let's look at the original replacement:
  // const jumpStartEnd = `                </FadeIn>\n              </div>`;
  // I replaced it with `</FadeIn>\n\n                {/* Puncture Repair */} ... \n              </div>`
  
  // So the chunk is from `{/* Puncture Repair */}` down to `</FadeIn>`
  const cardChunkRegex = /\s*{\/\* Puncture Repair \*\/}\s*<FadeIn delay=\{400\} className="flex">[\s\S]*?<\/FadeIn>/;
  const cardMatch = content.match(cardChunkRegex);
  
  if (cardMatch) {
    const cardCode = cardMatch[0];
    
    // Remove it from the current wrong location
    content = content.replace(cardCode, '');
    
    // Now find the correct location, which is after the Jump Start card in the "Our Popular Packages" section.
    // Let's find Jump Start Service in that section.
    const jumpStartRegex = /(<h3[^>]*>.*?Jump Start Service.*?<\/h3>[\s\S]*?<\/FadeIn>)/;
    const jumpStartMatch = content.match(jumpStartRegex);
    
    if (jumpStartMatch) {
      // Insert right after the Jump Start FadeIn block
      content = content.replace(jumpStartMatch[0], jumpStartMatch[0] + cardCode);
    }
    
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("Moved Puncture Repair card to the correct section");
  } else {
    console.log("Could not isolate card chunk");
  }
} else {
  console.log("Could not find accidental placement");
}
