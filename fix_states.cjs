const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const anchor = '  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);';
const newStates = `  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{name: string, price: string} | null>(null);
  const [packageSuccess, setPackageSuccess] = useState(false);`;

if (content.includes(anchor)) {
    content = content.replace(anchor, newStates);
    fs.writeFileSync('src/App.tsx', content);
    console.log("States added");
} else {
    console.log("Anchor not found");
}
