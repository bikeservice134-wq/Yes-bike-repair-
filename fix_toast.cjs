const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update React import
content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");

// Update lucide-react import
content = content.replace("  Sun\n} from 'lucide-react';", "  Sun,\n  X\n} from 'lucide-react';");

// Insert Toast component after FadeIn component
const toastComponent = `

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-50 dark:bg-[#123d20] border border-green-200 dark:border-[#123d20] text-green-700 dark:text-[#9effb2] px-4 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <CheckCircle2 className="w-5 h-5" />
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 ml-2" type="button">
         <X className="w-4 h-4" />
      </button>
    </div>
  );
};
`;

const fadeInEndIndex = content.indexOf('  </motion.div>\n);') + '  </motion.div>\n);'.length;
content = content.slice(0, fadeInEndIndex) + toastComponent + content.slice(fadeInEndIndex);

// Remove the static success message
const staticMessage = `              {heroSuccess && (
                <div className="mt-3 p-[15px] rounded-lg bg-green-50 dark:bg-[#123d20] border border-green-200 dark:border-[#123d20] text-green-700 dark:text-[#9effb2] text-sm text-center font-semibold">
                  ✅ Booking request submitted!
                </div>
              )}`;
content = content.replace(staticMessage, '');

// Render the Toast component right inside the App component, maybe at the end before </div></div>
const appEnd = `      {/* WHATSAPP */}`;
const renderToast = `      {heroSuccess && (
        <Toast message="Booking request submitted! We will contact you soon." onClose={() => setHeroSuccess(false)} />
      )}
      {/* WHATSAPP */}`;
content = content.replace(appEnd, renderToast);

fs.writeFileSync('src/App.tsx', content);
