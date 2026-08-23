const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const stateStr = `  const [trackId, setTrackId] = useState("");
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
  };
`;

content = content.replace("const [heroSuccess, setHeroSuccess] = useState(false);", stateStr + "\n  const [heroSuccess, setHeroSuccess] = useState(false);");

const trackSectionStr = `      {/* TRACK BOOKING */}
      <section id="track" className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[32px] font-bold mb-4 text-gray-900 dark:text-white">
            Track <span className="text-[#e5a900] dark:text-[#ffc107]">Your Booking</span>
          </h2>
          <p className="text-gray-600 dark:text-[#bdbdbd] mb-8">Enter your Booking ID to see the live status of your service.</p>
          
          <div className="bg-white dark:bg-[#1d1d1d] p-6 sm:p-8 rounded-[20px] shadow-xl border border-gray-200 dark:border-[#303030]">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="Enter Booking ID (e.g. YES-1234)" 
                required
                className="flex-1 p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" 
              />
              <button type="submit" className="bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-bold transition-colors">
                Track Status
              </button>
            </form>

            {trackResult && (
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#303030] text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-[#123d20] text-green-600 dark:text-[#9effb2] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Status Update</h4>
                    <p className="text-gray-600 dark:text-[#bdbdbd] text-sm">Booking ID: {trackId}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-[#0b0b0b] p-5 rounded-xl border border-gray-200 dark:border-[#303030]">
                  <p className="text-lg font-bold text-gray-900 dark:text-white text-center">
                    {trackResult}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        </FadeIn>
      </section>

`;

content = content.replace("      {/* PRICING */}", trackSectionStr + "      {/* PRICING */}");

fs.writeFileSync('src/App.tsx', content);
