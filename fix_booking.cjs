const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update the success state
content = content.replace(
  'const [success, setSuccess] = useState(false);',
  'const [successBookingId, setSuccessBookingId] = useState<string | null>(null);'
);

// 2. Rewrite handleSubmit
const oldHandleSubmit = `  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const phone = formData.get('phone') as string;
    const date = formData.get('date') as string;
    
    const newErrors: { phone?: string, date?: string } = {};
    if (!validatePhone(phone)) newErrors.phone = "Please enter a valid 10-digit mobile number.";
    if (isPastDate(date)) newErrors.date = "Please select a date in the future.";
    
    if (Object.keys(newErrors).length > 0) {
      setBookingErrors(newErrors);
      return;
    }
    
    setBookingErrors({});
    
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      brand: formData.get('brand'),
      model: formData.get('model'),
      service: formData.get('service'),
      date: formData.get('date'),
      time: formData.get('time'),
      message: formData.get('message'),
    };

    const whatsappNumber = "917090400617";
    const whatsappMessage = \`🚗 *NEW BIKE SERVICE BOOKING*

👤 Name: \${data.name}
📞 Phone: \${data.phone}
📍 Location: \${data.location}
🏍️ Bike: \${data.brand} \${data.model}
🔧 Service: \${data.service}
📅 Date: \${data.date}
⏰ Time: \${data.time}

📝 Problem:
\${data.message || "Not specified"}\`;

    const whatsappURL = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(whatsappMessage)}\`;
    setSuccess(true);
    
    setTimeout(() => {
      window.open(whatsappURL, "_blank");
    }, 700);
  };`;

const newHandleSubmit = `  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const phone = formData.get('phone') as string;
    const date = formData.get('date') as string;
    
    const newErrors: { phone?: string, date?: string } = {};
    if (!validatePhone(phone)) newErrors.phone = "Please enter a valid 10-digit mobile number.";
    if (isPastDate(date)) newErrors.date = "Please select a date in the future.";
    
    if (Object.keys(newErrors).length > 0) {
      setBookingErrors(newErrors);
      return;
    }
    
    setBookingErrors({});
    
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      year: formData.get('year') as string,
      service: formData.get('service') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      problem: formData.get('problem') as string,
    };

    const bookingID = "YES-" + Math.floor(100000 + Math.random() * 900000);
    const whatsappNumber = "917090400617";
    
    const whatsappMessage = \`🏍️ *NEW BIKE SERVICE BOOKING*

━━━━━━━━━━━━━━━━

🆔 *Booking ID:* \${bookingID}

👤 *Customer:* \${data.name}

📞 *Phone:* \${data.phone}

📍 *Location:* \${data.location}

🏍️ *Bike:* \${data.brand} \${data.model}

📅 *Year:* \${data.year || "Not specified"}

🔧 *Service:* \${data.service}

📆 *Date:* \${data.date}

⏰ *Time:* \${data.time}

📝 *Problem:*
\${data.problem || "Not specified"}

━━━━━━━━━━━━━━━━

YES BIKE REPAIR
Doorstep Bike Service\`;

    const whatsappURL = \`https://wa.me/\${whatsappNumber}?text=\${encodeURIComponent(whatsappMessage)}\`;
    setSuccessBookingId(bookingID);
    
    setTimeout(() => {
      window.open(whatsappURL, "_blank");
    }, 700);
  };`;

content = content.replace(oldHandleSubmit, newHandleSubmit);

// 3. Update the form JSX
const oldFormStart = '<form onSubmit={handleSubmit} className="bg-white dark:bg-[#1d1d1d] p-[30px] rounded-[18px] border border-gray-200 dark:border-[#303030] shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">';
const oldFormEnd = '</form>';

const formRegex = /<form onSubmit=\{handleSubmit\}[^>]*>([\s\S]*?)<\/form>/;
const match = content.match(formRegex);

if (match) {
  const newFormInner = `
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] mb-[18px]">
                <div>
                  <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Full Name *</label>
                  <input type="text" name="name" required placeholder="Enter your name" 
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Phone Number *</label>
                  <input type="tel" name="phone" required placeholder="10-digit mobile number"
                    pattern="[0-9]{10}" maxLength={10}
                    className={\`w-full p-[13px] rounded-lg border \${bookingErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]\`} />
                  {bookingErrors.phone && <p className="text-red-500 text-sm mt-1">{bookingErrors.phone}</p>}
                </div>
              </div>

              <div className="mb-[18px]">
                <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Service Location *</label>
                <input type="text" name="location" required placeholder="Enter your full location"
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] mb-[18px]">
                <div>
                  <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Bike Brand *</label>
                  <select name="brand" required 
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]">
                    <option value="">Select Brand</option>
                    <option>Honda</option>
                    <option>TVS</option>
                    <option>Bajaj</option>
                    <option>Yamaha</option>
                    <option>Hero</option>
                    <option>Suzuki</option>
                    <option>KTM</option>
                    <option>Royal Enfield</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Bike Model *</label>
                  <input type="text" name="model" required placeholder="e.g. Activa 6G"
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />
                </div>
              </div>

              <div className="mb-[18px]">
                <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Vehicle Year</label>
                <select name="year"
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]">
                  <option value="">Select Year</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                </select>
              </div>

              <div className="mb-[18px]">
                <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Service Required *</label>
                <select name="service" required
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]">
                  <option value="">Select Service</option>
                  <option>General Bike Service - ₹799</option>
                  <option>Basic Bike Service - ₹449</option>
                  <option>Full Bike Service - ₹1,339</option>
                  <option>Bike Repair</option>
                  <option>Puncture Repair</option>
                  <option>Battery Jump Start</option>
                  <option>Oil Change</option>
                  <option>Emergency Bike Repair</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] mb-[18px]">
                <div>
                  <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Preferred Date *</label>
                  <input type="date" name="date" required min={new Date().toISOString().split("T")[0]}
                    className={\`w-full p-[13px] rounded-lg border \${bookingErrors.date ? 'border-red-500' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]\`} />
                  {bookingErrors.date && <p className="text-red-500 text-sm mt-1">{bookingErrors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Preferred Time *</label>
                  <input type="time" name="time" required
                    className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />
                </div>
              </div>

              <div className="mb-[18px]">
                <label className="block text-sm font-bold mb-[7px] text-gray-900 dark:text-white">Describe Your Bike Problem</label>
                <textarea name="problem" placeholder="Example: Bike not starting, brake problem, engine noise..." rows={4}
                  className="w-full p-[13px] min-h-[100px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all resize-y text-[15px]"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors text-[17px]">
                🔧 Confirm Booking
              </button>

              {successBookingId && (
                <div className="mt-5 p-[15px] rounded-lg bg-green-50 dark:bg-[#123d20] border border-green-200 dark:border-[#123d20] text-green-700 dark:text-[#9effb2] font-medium text-center">
                  ✅ <strong>Booking Created!</strong><br /><br />
                  Booking ID: <strong>{successBookingId}</strong><br />
                  Opening WhatsApp...
                </div>
              )}
`;

  content = content.replace(match[1], newFormInner);
}

fs.writeFileSync('src/App.tsx', content);

