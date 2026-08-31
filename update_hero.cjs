const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetContent = `<section 
        id="home" 
        className="min-h-[750px] flex items-center relative overflow-hidden py-16"
        style={{
          background: isDark ? 'linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.85)), radial-gradient(circle at 20% 50%, #5a4300, #111 45%, #000)' : 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), radial-gradient(circle at 20% 50%, #fff9e6, #ffffff 45%, #f9fafb)'
        }}
      >`;

const replacement = `<section 
        id="home" 
        className="min-h-[750px] flex items-center relative overflow-hidden pt-24 pb-16 bg-white dark:bg-[#0a0a0a]"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        
        {/* Soft yellow glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-yellow-500/10 dark:bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>
`;

if (content.includes(targetContent)) {
  content = content.replace(targetContent, replacement);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Updated Hero Section successfully!");
} else {
  console.log("Could not find target content in App.tsx for Hero");
}
