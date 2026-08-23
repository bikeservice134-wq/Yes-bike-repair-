const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const stateStr = `  const [availableSlots, setAvailableSlots] = useState(3);
  React.useEffect(() => {
    setAvailableSlots(Math.floor(Math.random() * 3) + 2);
  }, []);`;

content = content.replace("const [heroSuccess, setHeroSuccess] = useState(false);", stateStr + "\n  const [heroSuccess, setHeroSuccess] = useState(false);");

const bannerStr = `      {/* BANNER */}
      <div className="bg-[#ffc107] text-black text-center py-2 px-4 text-sm font-bold flex justify-center items-center gap-2">
        <Zap className="w-4 h-4" />
        <span>Hurry! Only <span className="bg-black text-white px-2 py-0.5 rounded-md mx-1">{availableSlots}</span> available service slots left for today.</span>
      </div>`;

content = content.replace("{/* NAVBAR */}", bannerStr + "\n      {/* NAVBAR */}");

fs.writeFileSync('src/App.tsx', content);
