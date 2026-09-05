const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Move in Hero Bullet Points
const heroListStart = content.indexOf('<ul className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-bold flex flex-col gap-3 mx-auto lg:mx-0 mb-8 mt-8">');
const heroListEnd = content.indexOf('</ul>', heroListStart);
let heroList = content.substring(heroListStart, heroListEnd);

heroList = `<ul className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl font-bold flex flex-col gap-3 mx-auto lg:mx-0 mb-8 mt-8">
                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        General Bike Service
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        General Service + Engine Oil
                      </li>
                      <li className="flex items-center justify-center lg:justify-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0" />
                        Jump Start Service
                      </li>
`;
content = content.substring(0, heroListStart) + heroList + content.substring(heroListEnd);

// 2. Move in Dropdown
const dropdownStart = content.indexOf('<select name="service"');
const dropdownEnd = content.indexOf('</select>', dropdownStart);
let dropdown = content.substring(dropdownStart, dropdownEnd);

dropdown = `<select name="service" required defaultValue="" className="w-full pl-8 pr-7 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium">
                              <option value="" disabled hidden>Select Service Type</option>
                              <option value="General Bike Service (₹699)">🔧 Gen. Service - ₹699</option>
                              <option value="General Service + Engine Oil (₹1,249)">🛢️ Serv. + Oil - ₹1,249</option>
                              <option value="Jump Start Service (₹399)">⚡ Jump Start - ₹399</option>
                              <option value="Running Repair (₹399)">⏱️ Running Repair - ₹399</option>
                              <option value="Other / Custom Issue">📋 Other Issue</option>
`;
content = content.substring(0, dropdownStart) + dropdown + content.substring(dropdownEnd);

// 3. Move in Grid
const genServiceStart = content.indexOf('{/* General Service */}');
const genServiceOilStart = content.indexOf('{/* General Service + Engine Oil */}');
const jumpStartStart = content.indexOf('{/* Jump Start */}');
const gridEnd = content.indexOf('</div>\n              <div className="mt-16 text-center">');

if (genServiceStart !== -1 && genServiceOilStart !== -1 && jumpStartStart !== -1 && gridEnd !== -1) {
  // Find their order in the document to extract safely
  let positions = [
    { name: 'General', start: genServiceStart },
    { name: 'Oil', start: genServiceOilStart },
    { name: 'Jump', start: jumpStartStart }
  ].sort((a, b) => a.start - b.start);

  let b1 = content.substring(positions[0].start, positions[1].start);
  let b2 = content.substring(positions[1].start, positions[2].start);
  let b3 = content.substring(positions[2].start, gridEnd);

  let blockGeneral = "";
  let blockJump = "";
  let blockOil = "";

  if (positions[0].name === 'General') blockGeneral = b1;
  else if (positions[0].name === 'Oil') blockOil = b1;
  else blockJump = b1;

  if (positions[1].name === 'General') blockGeneral = b2;
  else if (positions[1].name === 'Oil') blockOil = b2;
  else blockJump = b2;

  if (positions[2].name === 'General') blockGeneral = b3;
  else if (positions[2].name === 'Oil') blockOil = b3;
  else blockJump = b3;

  // Reorder and fix delays
  // General: 100
  // Oil: 200
  // Jump Start: 300
  blockGeneral = blockGeneral.replace(/delay=\{[0-9]+\}/, 'delay={100}');
  blockOil = blockOil.replace(/delay=\{[0-9]+\}/, 'delay={200}');
  blockJump = blockJump.replace(/delay=\{[0-9]+\}/, 'delay={300}');

  content = content.substring(0, positions[0].start) + blockGeneral + blockOil + blockJump + content.substring(gridEnd);
}

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Moved General Service + Engine Oil up.");
