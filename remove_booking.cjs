const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the section
const sectionRegex = /\s*\{\/\* BOOKING \*\/\}\s*<section id="booking"[\s\S]*?<\/section>/;
content = content.replace(sectionRegex, '');

// Remove the state variables
const state1 = "const [successBookingId, setSuccessBookingId] = useState<string | null>(null);";
const state2 = "const [bookingErrors, setBookingErrors] = useState<{ phone?: string, date?: string }>({});";
content = content.replace(state1, '');
content = content.replace(state2, '');

// Remove handleSubmit
const handleSubmitRegex = /\s*const handleSubmit = \(e: React.FormEvent<HTMLFormElement>\) => \{[\s\S]*?\}, 700\);\n  \};/;
content = content.replace(handleSubmitRegex, '');

fs.writeFileSync('src/App.tsx', content);
