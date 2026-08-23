const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add AVAILABLE_LOCATIONS before App component
const locationsStr = `
const AVAILABLE_LOCATIONS = [
  "Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Jayanagar",
  "JP Nagar", "BTM Layout", "Electronic City", "Marathahalli", "Bellandur",
  "Malleswaram", "Rajajinagar", "Hebbal", "Kalyan Nagar", "Banashankari"
];
`;
content = content.replace("function App() {", locationsStr + "\nfunction App() {");

// Update heroErrors definition
content = content.replace("useState<{ phone?: string }>({});", "useState<{ phone?: string, location?: string }>({});");

// Add location states
const statesStr = `  const [heroErrors, setHeroErrors] = useState<{ phone?: string, location?: string }>({});
  const [locationSearch, setLocationSearch] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);`;
content = content.replace("  const [heroErrors, setHeroErrors] = useState<{ phone?: string, location?: string }>({});", statesStr);

// Update handleQuickBook
const handleQuickBookSearch = `    setHeroErrors({});
    if (!validatePhone(phone)) {
      setHeroErrors({ phone: "Please enter a valid 10-digit mobile number." });
      return;
    }`;
const handleQuickBookReplace = `    setHeroErrors({});
    if (!validatePhone(phone)) {
      setHeroErrors({ phone: "Please enter a valid 10-digit mobile number." });
      return;
    }
    const location = formData.get('location') as string;
    if (!AVAILABLE_LOCATIONS.includes(location)) {
      setHeroErrors({ location: "Please select a valid service area from the dropdown." });
      return;
    }`;
content = content.replace(handleQuickBookSearch, handleQuickBookReplace);

// Update the location input in the form
const inputSearch = `              <input type="text" name="location" required placeholder="Service Location (e.g., Koramangala) *"
                className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />`;
const inputReplace = `              <div className="relative">
                <input type="text" name="location" required placeholder="Service Location (Search area) *"
                  value={locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setIsLocationDropdownOpen(true);
                    if (heroErrors.location) {
                      setHeroErrors({...heroErrors, location: undefined});
                    }
                  }}
                  onFocus={() => setIsLocationDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
                  autoComplete="off"
                  className={\`w-full p-[13px] rounded-lg border \${heroErrors.location ? 'border-red-500' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]\`} />
                {heroErrors.location && <p className="text-red-500 text-sm mt-1">{heroErrors.location}</p>}
                
                {isLocationDropdownOpen && locationSearch.trim().length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {AVAILABLE_LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map(loc => (
                      <li
                        key={loc}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer text-gray-900 dark:text-white text-sm border-b border-gray-100 dark:border-[#2a2a2a] last:border-0"
                        onMouseDown={() => {
                          setLocationSearch(loc);
                          setIsLocationDropdownOpen(false);
                          setHeroErrors({...heroErrors, location: undefined});
                        }}
                      >
                        {loc}
                      </li>
                    ))}
                    {AVAILABLE_LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).length === 0 && (
                      <li className="px-4 py-3 text-gray-500 text-sm">We currently do not operate in this area.</li>
                    )}
                  </ul>
                )}
              </div>`;
content = content.replace(inputSearch, inputReplace);

fs.writeFileSync('src/App.tsx', content);
