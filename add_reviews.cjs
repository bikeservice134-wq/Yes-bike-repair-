const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Star import
if (!content.includes('Star,')) {
    content = content.replace('Wrench,', 'Wrench, Star,');
}

// 2. Add Reviews Section and flip FAQ background
const reviewsSection = `
      {/* GOOGLE REVIEWS */}
      <section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-11 gap-4 text-center md:text-left">
              <div>
                <h2 className="text-[36px] font-bold mb-2 leading-tight text-gray-900 dark:text-white">
                  Customer <span className="text-red-700 dark:text-red-600">Reviews</span>
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                  <div className="flex bg-white dark:bg-[#1a1a1a] p-1.5 rounded-lg border border-gray-200 dark:border-[#333] shadow-sm">
                     <span className="font-bold text-gray-800 dark:text-white px-2">4.9</span>
                     <div className="flex items-center gap-0.5 text-[#fbbc04]">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                     </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-[#bdbdbd]">Based on 500+ Google Reviews</span>
                </div>
              </div>
              <a href="https://google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#222] border border-gray-200 dark:border-[#333] text-gray-800 dark:text-white px-5 py-3 rounded-lg font-bold transition-colors shadow-sm text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Write a Review
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rahul Sharma",
                  time: "2 days ago",
                  text: "Arun was very professional. Came to my location in Koramangala and fixed my car's puncture in 20 minutes. Highly recommended for quick service!",
                  initial: "R",
                  color: "bg-blue-600"
                },
                {
                  name: "Priya Menon",
                  time: "1 week ago",
                  text: "Great doorstep bike service. The ₹699 general service package was totally worth it. Transparent pricing and the mechanic was very polite.",
                  initial: "P",
                  color: "bg-purple-600"
                },
                {
                  name: "Vikram Reddy",
                  time: "3 weeks ago",
                  text: "My scooter wouldn't start. Booked them and the mechanic arrived within 30 mins. Jump started the battery quickly and did a basic checkup.",
                  initial: "V",
                  color: "bg-green-600"
                }
              ].map((review, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm dark:shadow-none flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={"w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg " + review.color}>
                        {review.initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-[15px]">{review.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-[#888]">{review.time}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#fbbc04] mb-3">
                    <Star className="w-[14px] h-[14px] fill-current" />
                    <Star className="w-[14px] h-[14px] fill-current" />
                    <Star className="w-[14px] h-[14px] fill-current" />
                    <Star className="w-[14px] h-[14px] fill-current" />
                    <Star className="w-[14px] h-[14px] fill-current" />
                  </div>
                  <p className="text-gray-700 dark:text-[#ddd] text-[15px] leading-relaxed flex-1">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
`;

content = content.replace(
    `      {/* FAQ */}\n      <section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">`,
    reviewsSection + '\n' + `      {/* FAQ */}\n      <section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">`
);

fs.writeFileSync('src/App.tsx', content);
