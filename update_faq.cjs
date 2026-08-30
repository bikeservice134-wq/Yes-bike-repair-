const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldFaqRegex = /const faqs = \[[\s\S]*?\];/;
const newFaq = `const faqs = [
    {
      question: "1. What is doorstep bike service?",
      answer: "Doorstep bike service means a trained mechanic comes to your home, office, or preferred location to inspect, service, or repair your two-wheeler."
    },
    {
      question: "2. Which bikes do you service?",
      answer: "We service most popular motorcycles and scooters, including brands such as Hero, Honda, TVS, Bajaj, Yamaha, Suzuki, Royal Enfield, KTM, and others."
    },
    {
      question: "3. How do I book a bike mechanic?",
      answer: "You can book online by selecting your bike, service required, location, and preferred time. You can also contact us through WhatsApp or phone."
    },
    {
      question: "4. How quickly can a mechanic arrive?",
      answer: "For eligible doorstep services, a mechanic can typically reach you within 30–60 minutes, depending on your location, traffic, and mechanic availability."
    },
    {
      question: "5. What bike repair services do you provide?",
      answer: "We provide general servicing, engine oil replacement, battery replacement, brake service, puncture repair, chain maintenance, electrical repairs, jump-start assistance, tyre replacement, and other common bike repairs."
    },
    {
      question: "6. Can you repair my bike at home?",
      answer: "Yes. Many routine repairs and maintenance services can be completed at your doorstep. If the repair requires workshop equipment, we can recommend pickup and drop service where available."
    },
    {
      question: "7. Do you provide bike pickup and drop?",
      answer: "Yes, pickup and drop may be available for services that require workshop-level repairs. Availability depends on your location and service requirement."
    },
    {
      question: "8. Do you use genuine spare parts?",
      answer: "We aim to provide quality, compatible spare parts. Before replacing any part, we explain the requirement and obtain your approval."
    },
    {
      question: "9. Do I need to pay before the service?",
      answer: "No. You only pay for the services and parts that you approve. Any additional repair requirement should be communicated before the work is carried out."
    },
    {
      question: "10. Is there a warranty on bike service?",
      answer: "Warranty coverage depends on the service or package selected. Applicable warranty terms will be communicated at the time of booking."
    },
    {
      question: "11. How long does a general bike service take?",
      answer: "A standard general service usually takes around 2 hours, depending on the bike's condition and the work required."
    },
    {
      question: "12. Can I book an emergency bike repair?",
      answer: "Yes, you can request assistance for common breakdown issues such as a dead battery, puncture, starting problems, or minor roadside repairs, subject to service availability."
    },
    {
      question: "13. Do you service scooters as well?",
      answer: "Yes. We provide service and repair support for many scooters and other two-wheelers."
    },
    {
      question: "14. Can I share photos of my bike problem before booking?",
      answer: "Yes. Sharing a photo or video of the issue can help our team understand the problem and prepare the mechanic before arrival."
    },
    {
      question: "15. Do you service bikes in all areas of Bangalore?",
      answer: "We cover many areas across Bangalore. Service availability depends on your exact location and the type of repair required."
    },
    {
      question: "16. What information is required to book a service?",
      answer: "You'll generally need your name, phone number, location, bike brand/model, service requirement, and preferred date and time."
    },
    {
      question: "17. What if my bike needs additional repairs?",
      answer: "The mechanic will inspect the bike and explain any additional work required. No additional repair should be carried out without your approval."
    },
    {
      question: "18. How can I contact customer support?",
      answer: "You can contact our customer support team through phone or WhatsApp for booking assistance, service updates, and general queries."
    }
  ];`;

content = content.replace(oldFaqRegex, newFaq);
fs.writeFileSync('src/App.tsx', content);
console.log("FAQ Updated!");
