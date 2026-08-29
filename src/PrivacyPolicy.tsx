import React from 'react';
import { FadeIn } from './App';

export const PrivacyPolicy = () => {
  return (
    <div className="py-20 px-5 bg-white dark:bg-[#0b0b0b] min-h-screen">
      <FadeIn>
        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-[#151515] p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-[#303030]">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white leading-tight">Privacy <span className="text-yellow-500">Policy</span></h1>
          <p className="text-gray-500 dark:text-[#888] mb-10 text-sm font-medium">Last Updated: August 24, 2026</p>
          
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-[#ddd] space-y-8">
            <p className="text-[17px] leading-relaxed">
              At YES BIKE SERVICE, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you use our website, mobile application, or bike service booking services.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="mb-3">When you use our services, we may collect:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Name</li>
                <li>Mobile/phone number</li>
                <li>Email address</li>
                <li>Service location or address</li>
                <li>Bike/scooter details, including brand, model and year</li>
                <li>Service and repair requirements</li>
                <li>Booking date and preferred time</li>
                <li>Payment and transaction information</li>
                <li>Information you provide through WhatsApp, calls, forms, or customer support</li>
              </ul>
              <p>We may also automatically collect basic technical information such as device type, browser, IP address, and website usage information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-3">We may use your information to:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-yellow-400">
                <li>Process and confirm service bookings</li>
                <li>Contact you regarding your booking</li>
                <li>Assign and coordinate mechanics</li>
                <li>Provide doorstep bike repair and maintenance services</li>
                <li>Process payments and invoices</li>
                <li>Send booking confirmations, updates, and service reminders</li>
                <li>Provide customer support</li>
                <li>Improve our website, application, and services</li>
                <li>Prevent fraud, misuse, and unauthorized activity</li>
                <li>Send promotional offers where permitted by law and according to your preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Sharing of Information</h2>
              <p className="mb-3 font-medium text-gray-900 dark:text-white">We do not sell or rent your personal information.</p>
              <p className="mb-3">We may share necessary information with:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Mechanics or service partners responsible for completing your booking</li>
                <li>Payment processors and technology providers</li>
                <li>Communication providers used for booking notifications</li>
                <li>Government authorities or law-enforcement agencies when legally required</li>
                <li>Service providers that help us operate our website, app, or business</li>
              </ul>
              <p>Only information necessary for the relevant purpose will be shared.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Phone Number and WhatsApp</h2>
              <p className="mb-3">If you provide your phone number, we may use it to contact you about your booking, service status, payment, or customer support.</p>
              <p>If you choose WhatsApp communication, your information may be processed through WhatsApp and its applicable privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Payments</h2>
              <p>Payments may be processed through third-party payment providers. We generally do not store complete card, UPI, or banking credentials on our own systems. Payment providers may collect and process payment information according to their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Cookies and Tracking</h2>
              <p className="mb-3">Our website may use cookies and similar technologies to:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Keep the website functioning properly</li>
                <li>Remember preferences</li>
                <li>Understand website usage</li>
                <li>Improve performance</li>
                <li>Measure advertising and marketing effectiveness</li>
              </ul>
              <p>You can manage cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Data Security</h2>
              <p className="mb-3">We use reasonable technical and organizational measures to protect your personal information against unauthorized access, misuse, alteration, disclosure, or destruction.</p>
              <p>However, no internet-based service can guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Data Retention</h2>
              <p>We retain personal information only for as long as reasonably necessary to provide services, maintain business and transaction records, resolve disputes, comply with legal obligations, and protect our legitimate business interests.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Your Rights</h2>
              <p className="mb-3">Depending on applicable law, you may have rights to:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion where legally permitted</li>
                <li>Withdraw consent for certain communications</li>
                <li>Opt out of promotional communications</li>
              </ul>
              <p>To make a privacy-related request, please contact us using the details provided on our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Children's Privacy</h2>
              <p>Our services are not intentionally directed toward children. We do not knowingly collect personal information from children without appropriate consent where required by law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Third-Party Services</h2>
              <p>Our website or application may contain links to or integrations with third-party services. We are not responsible for the privacy practices of third-party websites or platforms. We recommend reviewing their privacy policies before providing personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated Last Updated date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact YES BIKE SERVICE through the contact details provided on our website.</p>
              <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333]">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">YES BIKE SERVICE</h3>
                <p className="flex items-center gap-2 mb-2"><span className="text-gray-500">Website:</span> <a href="https://yesbikeservice.in" className="text-yellow-500 hover:underline">yesbikeservice.in</a></p>
                <p className="flex items-center gap-2"><span className="text-gray-500">Phone:</span> <a href="tel:+917090400617" className="text-yellow-500 hover:underline">7090400617</a></p>
              </div>
            </section>

            <p className="text-sm text-gray-500 dark:text-[#888] mt-10 pt-6 border-t border-gray-200 dark:border-[#303030]">
              By using our website or booking our services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
