const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Update imports
content = content.replace(
  /MapPin,/,
  'MapPin, LocateFixed, Loader2,'
);

// 2. Add state and ref to App
const appStart = content.indexOf('export default function App() {');
const insertionPoint = content.indexOf('\n', appStart) + 1;
const stateCode = `
  const locationInputRef = React.useRef<HTMLInputElement>(null);
  const [isLocating, setIsLocating] = useState(false);
  const handleLocateMe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${latitude}&lon=\${longitude}\`);
          const data = await response.json();
          if (data && locationInputRef.current) {
            let address = "";
            if (data.address) {
                const parts = [];
                if (data.address.suburb) parts.push(data.address.suburb);
                else if (data.address.neighbourhood) parts.push(data.address.neighbourhood);
                if (data.address.city || data.address.town || data.address.county) parts.push(data.address.city || data.address.town || data.address.county);
                address = parts.join(', ');
            }
            locationInputRef.current.value = address || data.display_name.split(',').slice(0, 3).join(',');
          }
        } catch (error) {
          console.error("Error getting location", error);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Error getting location", error);
        setIsLocating(false);
      }
    );
  };
`;
content = content.substring(0, insertionPoint) + stateCode + content.substring(insertionPoint);

// 3. Update the input field
const oldInput = `<input type="text" name="location" required placeholder="Service Location" className="w-full pl-8 pr-3 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium" />`;
const newInput = `<input ref={locationInputRef} type="text" name="location" required placeholder="e.g. Koramangala, Bengaluru" className="w-full pl-8 pr-8 py-1 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium" />
                            <button 
                              type="button" 
                              onClick={handleLocateMe}
                              title="Use current location"
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors"
                            >
                              {isLocating ? <Loader2 className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3.5 h-3.5" />}
                            </button>`;

content = content.replace(oldInput, newInput);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Improved Service Location");
