const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = `<section className="py-20 px-5 bg-gray-900 dark:bg-[#0a0a0a] border-t border-gray-800 dark:border-[#222]">
        <FadeIn>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-white">
                How We <span className="text-yellow-500">Compare</span>`;
const targetEnd = `              </table>
            </div>
          </div>
        </FadeIn>
      </section>`;

const startIndex = content.indexOf(targetStart);
if (startIndex === -1) {
    console.error("Target start not found");
    process.exit(1);
}

const endIndex = content.indexOf(targetEnd, startIndex);
if (endIndex === -1) {
    console.error("Target end not found");
    process.exit(1);
}

const newContent = content.substring(0, startIndex) + content.substring(endIndex + targetEnd.length);
fs.writeFileSync('src/App.tsx', newContent);
console.log("Removed successfully!");
