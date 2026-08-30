const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Reduce main form container max-width and padding
content = content.replace(
  '<div className="order-1 lg:order-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] p-6 sm:p-8 rounded-[24px] shadow-2xl relative z-10 w-full mx-auto max-w-[450px]">',
  '<div className="order-1 lg:order-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] p-5 sm:p-6 rounded-[24px] shadow-2xl relative z-10 w-full mx-auto max-w-[380px]">'
);

// 2. Reduce margins in form header
content = content.replace(
  '<h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 text-center">Book Mechanic Now</h3>\n            <p className="text-sm text-yellow-600 dark:text-yellow-500 text-center font-bold mb-5">Book in 30 Seconds.</p>',
  '<h3 className="text-xl font-black text-gray-900 dark:text-white mb-0.5 text-center">Book Mechanic Now</h3>\n            <p className="text-xs text-yellow-600 dark:text-yellow-500 text-center font-bold mb-3">Book in 30 Seconds.</p>'
);

// 3. Reduce checklist margin and padding
content = content.replace(
  '<div className="space-y-2.5 mb-6 bg-gray-50 dark:bg-[#101010] p-3.5 rounded-xl border border-gray-100 dark:border-[#333]">',
  '<div className="space-y-1.5 mb-4 bg-gray-50 dark:bg-[#101010] p-2.5 rounded-xl border border-gray-100 dark:border-[#333]">'
);

// 4. Reduce gap between bike/scooter buttons
content = content.replace(
  '<div className="grid grid-cols-2 gap-3 mb-5">',
  '<div className="grid grid-cols-2 gap-2 mb-4">'
);
content = content.replace(
  'onClick={() => setHeroVehicle(\'Bike\')} className={`py-3 px-2',
  'onClick={() => setHeroVehicle(\'Bike\')} className={`py-2 px-2'
);
content = content.replace(
  'onClick={() => setHeroVehicle(\'Scooter\')} className={`py-3 px-2',
  'onClick={() => setHeroVehicle(\'Scooter\')} className={`py-2 px-2'
);

// 5. Reduce gap between inputs
content = content.replace(
  '<div className="space-y-4">',
  '<div className="space-y-3">'
);

// 6. Reduce grid gap for brand/model
content = content.replace(
  '<div className="grid grid-cols-2 gap-3">',
  '<div className="grid grid-cols-2 gap-2">'
);

// 7. Reduce input padding
content = content.replace(/py-2\.5/g, 'py-2');

// 8. Reduce submit button size
content = content.replace(
  '<button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-4 rounded-xl font-black text-[17px] transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2 mt-6">',
  '<button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl font-black text-[16px] transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2 mt-4">'
);

// MODAL BOOKING FORM

// Reduce max width and padding of modal
content = content.replace(
  '<div className="bg-white dark:bg-[#151515] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">',
  '<div className="bg-white dark:bg-[#151515] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">'
);
content = content.replace(
  '<div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-[#2a2a2a]">',
  '<div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-[#2a2a2a]">'
);
content = content.replace(
  '}} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">',
  '}} className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">'
);

fs.writeFileSync('src/App.tsx', content);
console.log("Updated sizes!");
