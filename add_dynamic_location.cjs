const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const stateRegex = /const \[locationSearch, setLocationSearch\] = useState\(''\);/;
const newState = `const [locationSearch, setLocationSearch] = useState('');
  const [activeLocation, setActiveLocation] = useState('Indiranagar');

  React.useEffect(() => {
    const locations = ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Jayanagar', 'Malleswaram', 'BTM Layout', 'Marathahalli', 'Electronic City', 'Bellandur'];
    const interval = setInterval(() => {
      setActiveLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);`;

content = content.replace(stateRegex, newState);

const heroRegex = /<div className="order-2 lg:order-1 text-center lg:text-left">\s*<h1/;
const newHero = `<div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 text-sm font-semibold mb-6 shadow-sm transition-all duration-500 ease-in-out">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Mechanic currently serving near {activeLocation}
            </div>
            <h1`;

content = content.replace(heroRegex, newHero);

fs.writeFileSync('src/App.tsx', content);
console.log("Added active location indicator!");
