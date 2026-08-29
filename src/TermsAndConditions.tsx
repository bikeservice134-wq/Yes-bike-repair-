import React from 'react';
import { FadeIn } from './App';

export const TermsAndConditions = () => {
  return (
    <div className="py-20 px-5 bg-white dark:bg-[#0b0b0b] min-h-screen">
      <FadeIn>
        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-[#151515] p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-[#303030]">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white leading-tight">Terms & <span className="text-yellow-500">Conditions</span></h1>
          <p className="text-gray-500 dark:text-[#888] mb-10 text-sm font-medium">Last Updated: August 24, 2026</p>
          
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-[#ddd] space-y-8">
            <p className="text-[17px] leading-relaxed">
              Welcome to YES Bike Service. By accessing our website, mobile application, or booking our services, you agree to the following Terms & Conditions. Please read them carefully before making a booking.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. About Our Services</h2>
              <p className="mb-3">YES Bike Service provides two-wheeler repair and maintenance services, including doorstep bike servicing, scooter servicing, inspection, battery-related services, tyre and puncture services, engine repairs, oil replacement, and other related services.</p>
              <p>Service availability may vary depending on your location, vehicle type, mechanic availability, and required service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Booking</h2>
              <p className="mb-3">Customers can book a service through our website, mobile application, phone, WhatsApp, or other available booking channels.</p>
              <p className="mb-3">You agree to provide accurate information, including:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Customer name and contact number</li>
                <li>Location/address</li>
                <li>Vehicle brand and model</li>
                <li>Required service</li>
                <li>Preferred date and time</li>
              </ul>
              <p>A booking is considered confirmed only after confirmation from YES Bike Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Service Charges & Pricing</h2>
              <p className="mb-3">Prices displayed on our website or app are indicative unless specifically stated otherwise.</p>
              <p className="mb-3">Additional charges may apply for:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Spare parts</li>
                <li>Engine or major repairs</li>
                <li>Additional labour</li>
                <li>Consumables</li>
                <li>Emergency or special services</li>
                <li>Services requested beyond the selected package</li>
              </ul>
              <p>The customer will be informed about additional work or charges, where reasonably possible, before proceeding.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Inspection & Additional Repairs</h2>
              <p className="mb-3">The initial booking may cover only the selected service/package.</p>
              <p className="mb-3">During inspection, our mechanic may identify additional issues. Any additional repair should be approved by the customer before the work is carried out.</p>
              <p>YES Bike Service is not responsible for pre-existing vehicle defects that are unrelated to the booked service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Spare Parts</h2>
              <p className="mb-3">Where replacement parts are required, parts may be charged separately unless they are specifically included in the selected package.</p>
              <p>Availability of genuine/OEM or compatible parts may depend on the vehicle model and supplier availability.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Customer Responsibilities</h2>
              <p className="mb-3">The customer must:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Provide correct vehicle and contact information.</li>
                <li>Ensure reasonable access to the vehicle.</li>
                <li>Disclose known vehicle problems when making a booking.</li>
                <li>Remove valuable personal belongings from the vehicle before service.</li>
                <li>Make payment for approved services and parts.</li>
              </ul>
              <p>YES Bike Service is not responsible for personal belongings left inside the vehicle.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Doorstep Service</h2>
              <p className="mb-3">Doorstep service is subject to mechanic availability, location accessibility, traffic, weather, safety conditions, and other circumstances beyond our reasonable control.</p>
              <p>The estimated mechanic arrival time is not guaranteed and may change due to operational or external factors.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Cancellation & Rescheduling</h2>
              <p className="mb-3">Customers may request cancellation or rescheduling of a booking before the mechanic is dispatched.</p>
              <p>If a mechanic has already been assigned, dispatched, or has reached the customer's location, applicable visit, inspection, or cancellation charges may apply.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Payments</h2>
              <p className="mb-3">Customers agree to pay the applicable charges for services and approved parts.</p>
              <p>Payment methods may include online payment, UPI, card, cash, or other methods made available by YES Bike Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Service Warranty</h2>
              <p className="mb-3">Where a warranty is offered, it applies only to the specific service or repair covered by the applicable warranty terms.</p>
              <p className="mb-3">Warranty coverage may not apply to:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>New damage or accidents</li>
                <li>Misuse or negligence</li>
                <li>Modification of the vehicle</li>
                <li>Normal wear and tear</li>
                <li>Repairs performed by another mechanic or workshop</li>
                <li>Parts not supplied or installed by YES Bike Service</li>
                <li>Problems unrelated to the original repair</li>
              </ul>
              <p>The applicable warranty period will be communicated on the relevant service/package.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Service Delays</h2>
              <p className="mb-3">Service completion times are estimates and may vary depending on the condition of the vehicle, availability of parts, complexity of repairs, and other circumstances.</p>
              <p>YES Bike Service shall not be liable for delays caused by circumstances beyond its reasonable control.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. User Account & Information</h2>
              <p className="mb-3">If you create an account, you are responsible for maintaining the accuracy and confidentiality of your account information.</p>
              <p>You agree not to misuse our website, application, booking system, or services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Communications</h2>
              <p className="mb-3">By making a booking or submitting your contact details, you agree that YES Bike Service may contact you regarding:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-yellow-400">
                <li>Booking confirmations</li>
                <li>Service updates</li>
                <li>Mechanic arrival information</li>
                <li>Payment information</li>
                <li>Customer support</li>
                <li>Service-related communications</li>
              </ul>
              <p>Marketing communications may be subject to applicable consent and opt-out requirements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Website & App Usage</h2>
              <p className="mb-3">You must not:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-yellow-400">
                <li>Attempt to gain unauthorized access to our systems.</li>
                <li>Interfere with the website or application.</li>
                <li>Submit false or misleading information.</li>
                <li>Use our platform for fraudulent or unlawful activities.</li>
                <li>Copy or reproduce our website content without permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Third-Party Services</h2>
              <p>Our services may use third-party providers for payments, communication, mapping, hosting, analytics, or other operational functions. Their services may be subject to their own terms and policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">16. Limitation of Liability</h2>
              <p className="mb-3">YES Bike Service will make reasonable efforts to provide professional services. However, to the extent permitted by applicable law, we are not liable for indirect, incidental, consequential, or unforeseeable losses arising from the use of our platform or services.</p>
              <p>Nothing in these Terms is intended to exclude any liability that cannot legally be excluded under applicable law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">17. Intellectual Property</h2>
              <p className="mb-3">All website content, including logos, branding, graphics, text, designs, images, software, and other materials belonging to YES Bike Service are protected by applicable intellectual-property laws.</p>
              <p>You may not reproduce, modify, distribute, or commercially use our content without prior written permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">18. Privacy</h2>
              <p>Your use of our services is also subject to our Privacy Policy, which explains how we collect, use, store, and protect personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">19. Changes to These Terms</h2>
              <p className="mb-3">YES Bike Service may update these Terms & Conditions from time to time. Updated terms will be published on our website with a revised "Last Updated" date.</p>
              <p>Your continued use of our services after an update constitutes acceptance of the revised terms, to the extent permitted by law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">20. Governing Law</h2>
              <p>These Terms & Conditions shall be governed by the laws applicable in India. Any disputes shall be subject to the jurisdiction of the competent courts having jurisdiction over the applicable location.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">21. Contact Us</h2>
              <p className="mb-4">For questions, complaints, cancellations, or service-related support, please contact YES Bike Service through the contact details provided on our website or app.</p>
              <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-[#333]">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">YES Bike Service</h3>
                <p className="flex items-center gap-2 mb-2"><span className="text-gray-500">Website:</span> <a href="https://yesbikeservice.in" className="text-yellow-500 hover:underline">yesbikeservice.in</a></p>
                <p className="flex items-center gap-2"><span className="text-gray-500">Phone:</span> <a href="tel:+917090400617" className="text-yellow-500 hover:underline">7090400617</a></p>
              </div>
            </section>

            <p className="text-sm text-gray-500 dark:text-[#888] mt-10 pt-6 border-t border-gray-200 dark:border-[#303030]">
              By booking or using our services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
