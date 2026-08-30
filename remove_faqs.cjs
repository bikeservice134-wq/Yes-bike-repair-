const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetContent = `    },
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
    }`;

if (content.includes(targetContent)) {
  content = content.replace(targetContent, "    }");
  fs.writeFileSync('src/App.tsx', content);
  console.log("Successfully removed FAQs");
} else {
  console.log("Could not find the target text.");
}
