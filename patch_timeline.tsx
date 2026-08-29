      {/* HOW IT WORKS */}
      <section className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                How Our <span className="text-yellow-500 dark:text-yellow-400">Bike Service Works</span>
              </h2>
              <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-[17px]">
                A simple, transparent, and hassle-free process from booking to delivery.
              </p>
            </div>

            <div className="relative border-l-2 border-yellow-500/30 ml-4 md:ml-8 space-y-10 py-2">
              {[
                { icon: '📞', title: 'Book Your Bike Service', desc: 'Call us or connect with us on WhatsApp to schedule your preferred service date and time. Simply share your bike model, service requirements, and pickup location.' },
                { icon: '🚚', title: 'Free Pickup & Drop', desc: 'Our team collects your motorcycle from your home, office, or any convenient location. No workshop visits, long queues, or unnecessary waiting.' },
                { icon: '🔍', title: 'Complete Bike Inspection', desc: 'Once your bike reaches our service facility, our trained mechanics conduct a detailed inspection covering the engine, brakes, battery, tyres, and other key components.' },
                { icon: '📋', title: 'Transparent Estimate & Approval', desc: 'After the inspection, we provide a clear and transparent service estimate. If additional repairs or spare parts are required, we proceed only after your approval.' },
                { icon: '🔧', title: 'Professional Repair & Servicing', desc: 'Our experienced technicians perform the required servicing and repairs using genuine spare parts and recommended service procedures.' },
                { icon: '🧪', title: 'Quality Check & Road Test', desc: 'Before delivery, every bike goes through a comprehensive quality inspection and performance check to ensure your bike is ready for the road.' },
                { icon: '🏍️', title: 'Safe Delivery to Your Door', desc: 'Once the service is complete, your motorcycle is cleaned, inspected, and delivered safely back to your home or office.' }
              ].map((step, idx) => (
                <div key={idx} className="relative pl-10 md:pl-12">
                  <div className="absolute -left-[21px] top-4 w-10 h-10 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ring-8 ring-gray-50 dark:ring-[#101010]">
                    {idx + 1}
                  </div>
                  <div className="bg-white dark:bg-[#1d1d1d] p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-[#303030] hover:border-yellow-500/30 transition-colors group">
                    <h3 className="text-[20px] font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">{step.icon}</span> 
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-[#bdbdbd] text-[16px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
