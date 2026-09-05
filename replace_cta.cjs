const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetCTA = `                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">
                        Stop Searching for a "Bike Mechanic Near Me".
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                        Book Bangalore's most trusted two-wheeler experts today and get your ride running like new.
                      </p>
                      <p className="text-gray-900 dark:text-white font-bold">
                        Fast, reliable, and hassle-free <strong className="font-bold">bike service Bangalore</strong>.
                      </p>
                    </div>
                    <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.3)] uppercase tracking-wider text-sm whitespace-nowrap">
                      BOOK BIKE SERVICE NOW
                    </button>`;

const newCTA = `                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">
                        Beat the Bangalore Traffic. We Come to You.
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                        From Koramangala to Whitefield, book Namma Bengaluru's most trusted two-wheeler experts today.
                      </p>
                      <p className="text-gray-900 dark:text-white font-bold">
                        Fast, reliable, and hassle-free <strong className="font-bold">doorstep bike service across Bangalore</strong>.
                      </p>
                    </div>
                    <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.3)] uppercase tracking-wider text-sm whitespace-nowrap">
                      BOOK MECHANIC IN BANGALORE
                    </button>`;

if (content.includes(targetCTA)) {
    content = content.replace(targetCTA, newCTA);
    fs.writeFileSync('src/App.tsx', content, 'utf-8');
    console.log("CTA updated successfully.");
} else {
    console.log("Could not find the CTA to replace.");
}
