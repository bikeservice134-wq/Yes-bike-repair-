const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newSection = `      {/* MECHANIC ON CALL */}
      <section className="py-20 px-5 bg-white dark:bg-[#1d1d1d] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-[36px] md:text-[40px] font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                Mechanic on <span className="text-red-600 dark:text-red-500">Call Services</span>
              </h2>
              <p className="text-gray-600 dark:text-[#bdbdbd] mb-4 text-[17px] leading-relaxed">
                No time to visit a bike workshop or scooter service center? Yes Bike Service brings the workshop to your doorstep.
              </p>
              <p className="text-gray-600 dark:text-[#bdbdbd] mb-8 text-[17px] leading-relaxed">
                With just one tap in the Yes Bike Service app, book a trusted mechanic at your home, office, or preferred location. Simply choose Doorstep Services, select the service package you need, and schedule your appointment.
              </p>
              
              <p className="font-bold text-gray-900 dark:text-white text-[19px] mb-8">
                Your bike needs service. We bring the mechanic to you.
              </p>
              <a href="#home" className="inline-flex justify-center w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-colors items-center gap-2 text-lg">
                Book your doorstep bike service today!
              </a>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-gray-50 dark:bg-[#101010] border border-gray-100 dark:border-[#303030] rounded-3xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Yes Bike Service?</h3>
                <ul className="space-y-4">
                  {[
                    'Verified mechanics',
                    'Convenient doorstep service',
                    'Genuine spare parts',
                    'Transparent pricing',
                    'Multiple bike & scooter services',
                    'Easy online booking',
                    'Service warranty'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full shrink-0">
                         <CheckCircle2 className="w-5 h-5 text-red-600 dark:text-red-500" />
                      </div>
                      <span className="text-gray-800 dark:text-[#e0e0e0] text-[17px] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

`;

content = content.replace("      {/* PRICING */}", newSection + "      {/* PRICING */}");
fs.writeFileSync('src/App.tsx', content);
