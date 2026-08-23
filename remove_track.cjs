const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const stateStr = `    const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    const statuses = [
      "Booking Confirmed ✅",
      "Mechanic Assigned (John Doe) 👨‍🔧",
      "Mechanic En Route 🛵",
      "Service in Progress 🔧",
      "Service Completed 🎉"
    ];
    // Simple deterministic status based on input length
    const hash = trackId.length + (trackId.charCodeAt(0) || 0);
    const status = statuses[hash % statuses.length];
    setTrackResult(status);
  };`;

content = content.replace(stateStr, "");

const sectionStart = `      {/* TRACK BOOKING */}`;
const sectionEnd = `      {/* PRICING */}`;

const startIndex = content.indexOf(sectionStart);
const endIndex = content.indexOf(sectionEnd);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.slice(0, startIndex) + content.slice(endIndex);
}

fs.writeFileSync('src/App.tsx', content);
