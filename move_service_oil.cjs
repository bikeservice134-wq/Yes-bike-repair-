const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Move in Hero Bullet Points
const heroListStart = content.indexOf('<ul className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-bold flex flex-col gap-3 mx-auto lg:mx-0 mb-8 mt-8">');
const heroListEnd = content.indexOf('</ul>', heroListStart);
let heroList = content.substring(heroListStart, heroListEnd);

// find the 3 list items
// <li> General Service </li>
// <li> Jump Start Service </li>
// <li> General Service + Engine Oil </li>
// User wants General Service + Engine Oil "thoda sa upar", meaning above Jump Start Service.
// Just doing a simple replace
heroList = heroList.replace(
  /<li className="flex items-center justify-center lg:justify-start gap-3">\s*<CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" \/>\s*Jump Start Service\s*<\/li>\s*<li className="flex items-center justify-center lg:justify-start gap-3">\s*<CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" \/>\s*General Service \+ Engine Oil\s*<\/li>/s,
  `<li className="flex items-center justify-center lg:justify-start gap-3">\n                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />\n                        General Service + Engine Oil\n                      </li>\n                      <li className="flex items-center justify-center lg:justify-start gap-3">\n                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />\n                        Jump Start Service\n                      </li>`
);
content = content.substring(0, heroListStart) + heroList + content.substring(heroListEnd);

// 2. Move in Dropdown
const dropdownStart = content.indexOf('<select name="service"');
const dropdownEnd = content.indexOf('</select>', dropdownStart);
let dropdown = content.substring(dropdownStart, dropdownEnd);

dropdown = dropdown.replace(
  /<option value="Jump Start Service \(₹399\)">⚡ Jump Start - ₹399<\/option>\s*<option value="General Service \+ Engine Oil \(₹1,249\)">🛢️ Serv\. \+ Oil - ₹1,249<\/option>/s,
  `<option value="General Service + Engine Oil (₹1,249)">🛢️ Serv. + Oil - ₹1,249</option>\n                              <option value="Jump Start Service (₹399)">⚡ Jump Start - ₹399</option>`
);
content = content.substring(0, dropdownStart) + dropdown + content.substring(dropdownEnd);

// 3. Move in Grid
// The grid has:
// {/* General Service */}
// <FadeIn delay={100} ... > ... </FadeIn>
// {/* Jump Start */}
// <FadeIn delay={200} ... > ... </FadeIn>
// {/* General Service + Engine Oil */}
// <FadeIn delay={300} ... > ... </FadeIn>

// Let's use regex to extract the three blocks and reorder them.
const genServiceStart = content.indexOf('{/* General Service */}');
const jumpStartStart = content.indexOf('{/* Jump Start */}');
const genServiceOilStart = content.indexOf('{/* General Service + Engine Oil */}');
const gridEnd = content.indexOf('</div>\n              <div className="mt-16 text-center">');

if (genServiceStart !== -1 && genServiceOilStart !== -1 && jumpStartStart !== -1 && gridEnd !== -1) {
  const block1 = content.substring(genServiceStart, jumpStartStart);
  const block2 = content.substring(jumpStartStart, genServiceOilStart);
  const block3 = content.substring(genServiceOilStart, gridEnd);
  
  // change the delays to keep the animation order
  const newBlock3 = block2.replace('delay={200}', 'delay={300}');
  const newBlock2 = block3.replace('delay={300}', 'delay={200}');
  
  content = content.substring(0, genServiceStart) + block1 + newBlock2 + newBlock3 + content.substring(gridEnd);
} else {
  console.log("Could not find grid blocks");
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Reordered General Service + Engine Oil");
