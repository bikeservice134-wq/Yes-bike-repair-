const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add Clock import
if (!content.includes('Clock,')) {
    content = content.replace('Wrench, Star,', 'Wrench, Star, Clock,');
}

// Add state
content = content.replace(
    'const [heroVehicle, setHeroVehicle] = useState("Bike");',
    'const [heroVehicle, setHeroVehicle] = useState("Bike");\n  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");'
);

// Add value and onChange to timeSlot select
content = content.replace(
    '<select name="timeSlot" required',
    '<select name="timeSlot" required value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}'
);

// Add the ETA label
const etaLabel = `
              </div>

              {selectedTimeSlot && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-green-50/50 dark:bg-[#122216] rounded-lg border border-green-100 dark:border-[#1c3a26] text-sm text-gray-700 dark:text-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                   <Clock className="w-4 h-4 text-green-600 dark:text-green-500" />
                   <span className="font-medium">
                     Estimated arrival: <span className="text-gray-900 dark:text-white font-bold">{
                       selectedTimeSlot.includes('Morning') ? '9:30 AM - 10:30 AM' :
                       selectedTimeSlot.includes('Afternoon') ? '12:30 PM - 1:30 PM' :
                       selectedTimeSlot.includes('Evening') ? '4:30 PM - 5:30 PM' : 'Within 30-45 mins'
                     }</span>
                   </span>
                </div>
              )}

              <button type="submit"`;

content = content.replace(
    `              </div>\n\n              <button type="submit"`,
    etaLabel
);

fs.writeFileSync('src/App.tsx', content);
