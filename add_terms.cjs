const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('import { TermsAndConditions }')) {
  content = content.replace(
    'import { PrivacyPolicy } from "./PrivacyPolicy";',
    'import { PrivacyPolicy } from "./PrivacyPolicy";\nimport { TermsAndConditions } from "./TermsAndConditions";'
  );
}

if (content.includes('const [currentView, setCurrentView] = useState<"home" | "privacy">')) {
  content = content.replace(
    'const [currentView, setCurrentView] = useState<"home" | "privacy">("home");',
    'const [currentView, setCurrentView] = useState<"home" | "privacy" | "terms">("home");'
  );
}

const termsRender = `      </main>\n      ) : currentView === "privacy" ? <PrivacyPolicy /> : <TermsAndConditions />}\n      {/* FOOTER */}`;
content = content.replace(
  `      </main>\n      ) : <PrivacyPolicy />}\n      {/* FOOTER */}`,
  termsRender
);

const footerLinksOld = `<div className="flex justify-center gap-4 mt-3">
            <button onClick={() => { setCurrentView('privacy'); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Privacy Policy</button>
          </div>`;
          
const footerLinksNew = `<div className="flex justify-center gap-4 mt-3">
            <button onClick={() => { setCurrentView('terms'); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Terms & Conditions</button>
            <button onClick={() => { setCurrentView('privacy'); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Privacy Policy</button>
          </div>`;
          
content = content.replace(footerLinksOld, footerLinksNew);

fs.writeFileSync('src/App.tsx', content);
