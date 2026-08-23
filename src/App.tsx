import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Settings, 
  Bike, 
  Zap, 
  CheckCircle2, 
  Home, 
  DollarSign, 
  ShieldCheck, 
  Phone,
  ChevronDown,
  Moon,
  Sun,
  X,
  Mail
} from 'lucide-react';


const FadeIn = ({ children, className = "w-full" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-50 dark:bg-[#123d20] border border-green-200 dark:border-[#123d20] text-green-700 dark:text-[#9effb2] px-4 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <CheckCircle2 className="w-5 h-5" />
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 ml-2" type="button">
         <X className="w-4 h-4" />
      </button>
    </div>
  );
};


const AVAILABLE_LOCATIONS = [
  "Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Jayanagar",
  "JP Nagar", "BTM Layout", "Electronic City", "Marathahalli", "Bellandur",
  "Malleswaram", "Rajajinagar", "Hebbal", "Kalyan Nagar", "Banashankari"
];

export default function App() {
  
    const [availableSlots, setAvailableSlots] = useState(3);
  React.useEffect(() => {
    setAvailableSlots(Math.floor(Math.random() * 3) + 2);
  }, []);


  const [heroSuccess, setHeroSuccess] = useState(false);
  const [heroVehicle, setHeroVehicle] = useState("Bike");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  const [heroErrors, setHeroErrors] = useState<{ phone?: string, location?: string }>({});
  const [locationSearch, setLocationSearch] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
  const isPastDate = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dateString);
    return selected < today;
  };

  const faqs = [
    {
      question: "Do you service bikes at my home or office?",
      answer: "Yes, our mechanics provide doorstep service at your preferred location, be it home or office. Just select your location when booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major UPI apps (GPay, PhonePe, Paytm), cash, and online bank transfers. Payment is strictly taken after the service is completed to your satisfaction."
    },
    {
      question: "Do you use genuine spare parts?",
      answer: "Absolutely! We only use OEM (Original Equipment Manufacturer) genuine spare parts with standard warranties to ensure the longevity of your bike."
    },
    {
      question: "Is there any visiting charge?",
      answer: "We have a transparent pricing model. Our visiting charge is waived off if you proceed with the repair or service. Otherwise, a nominal fee is applied."
    }
  ];

  const handleQuickBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone') as string;
    
    setHeroErrors({});
    if (!validatePhone(phone)) {
      setHeroErrors({ phone: "Please enter a valid 10-digit mobile number." });
      return;
    }
    const location = formData.get('location') as string;
    if (!AVAILABLE_LOCATIONS.includes(location)) {
      setHeroErrors({ location: "Please select a valid service area from the dropdown." });
      return;
    }
    
    const whatsappNumber = "917090400617";
    
    const vehicleType = formData.get('vehicle')?.toString().toUpperCase() || 'VEHICLE';
    
    const whatsappMessage = `🚗 *QUICK ${vehicleType} SERVICE BOOKING*

👤 Name: ${formData.get('name')}
📞 Phone: ${formData.get('phone')}
📍 Location: ${formData.get('location')}
🏍️ Vehicle: ${formData.get('brand')} ${formData.get('model')}
🔧 Service: ${formData.get('service')}
⏰ Time Slot: ${formData.get('timeSlot')}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    setHeroSuccess(true);
    
    setTimeout(() => {
      window.open(whatsappURL, "_blank");
    }, 700);
  };

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""} transition-colors duration-300`}>
      <div className="bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white font-sans selection:bg-[#ffc107] selection:text-black min-h-screen">
            {/* BANNER */}
      <div className="bg-[#ffc107] text-black text-center py-2 px-4 text-sm font-bold flex justify-center items-center gap-2">
        <Zap className="w-4 h-4" />
        <span>Hurry! Only <span className="bg-black text-white px-2 py-0.5 rounded-md mx-1">{availableSlots}</span> available service slots left for today.</span>
      </div>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0b0b0b]/95 border-b border-gray-200 dark:border-[#303030] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="text-[25px] font-black text-[#ffc107]">
            YES <span className="text-gray-900 dark:text-white">BIKE REPAIR</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-[#e5a900] dark:hover:text-[#ffc107] transition-colors">Home</a>
            <a href="#pricing" className="text-gray-900 dark:text-white font-semibold hover:text-[#e5a900] dark:hover:text-[#ffc107] transition-colors">Pricing</a>
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-[#e5a900] dark:hover:text-[#ffc107] transition-colors">Book Service</a>
          </nav>
          
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <a href="#home" className="hidden md:inline-flex bg-[#ffc107] hover:bg-[#e5a900] text-black px-5 py-2.5 rounded-lg font-extrabold transition-colors ml-4">

            Book Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section 
        id="home" 
        className="min-h-[650px] flex items-center"
        style={{
          background: isDark ? 'linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.65)), radial-gradient(circle at 80% 40%, #5a4300, #111 45%, #000)' : 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), radial-gradient(circle at 80% 40%, #fff9e6, #ffffff 45%, #f9fafb)'
        }}
      >
                  <FadeIn>
        <div className="max-w-6xl w-full mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-[72px] font-bold leading-[1.05] mb-5 text-gray-900 dark:text-white">
              Bike Repair<br />
              <span className="text-[#e5a900] dark:text-[#ffc107]">At Your Doorstep.</span>
            </h1>
            <p className="text-gray-600 dark:text-[#bdbdbd] text-lg md:text-[19px] max-w-[620px] mb-8">
              Professional bike servicing and repairs at your home.
              Book a verified mechanic online and get your bike fixed
              without visiting a service center.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#home" className="inline-flex items-center gap-2 bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-xl font-extrabold transition-colors text-base">
                <Wrench className="w-5 h-5" /> Book Bike Service
              </a>
              <a href="tel:+917090400617" className="inline-flex items-center gap-2 border border-gray-300 dark:border-[#444] text-gray-900 dark:text-white hover:bg-gray-50 dark:bg-[#101010] px-6 py-3.5 rounded-xl font-extrabold transition-colors text-base">
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] p-5 sm:p-8 rounded-[20px] shadow-2xl backdrop-blur-sm relative">
            <h3 className="text-gray-900 dark:text-white text-[25px] font-bold mb-3">Book in 30 Seconds.</h3>
            
            <ul className="text-sm text-gray-600 dark:text-gray-400 mb-5 space-y-2 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ffc107]" /> Certified mechanic at your doorstep in 30 minutes.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ffc107]" /> Services starting from ₹399.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#ffc107]" /> 30-day service warranty for complete peace of mind.</li>
            </ul>

            <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg mb-5 border border-gray-200 dark:border-[#303030]">
              {['Bike', 'Scooter', 'Car'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setHeroVehicle(type)}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${heroVehicle === type ? 'bg-white dark:bg-[#1d1d1d] text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-[#444]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleQuickBook} className="space-y-3 sm:space-y-4">
              <input type="hidden" name="vehicle" value={heroVehicle} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="text" name="name" required placeholder="Full Name *" 
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />
                <div>
                  <input type="tel" name="phone" required placeholder="Mobile No *"
                    pattern="[0-9]{10}" maxLength={10}
                    className={`w-full p-[13px] rounded-lg border ${heroErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]`} />
                  {heroErrors.phone && <p className="text-red-500 text-sm mt-1">{heroErrors.phone}</p>}
                </div>
              </div>

              <div className="relative">
                <input type="text" name="location" required placeholder="Service Location (Search area) *"
                  value={locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setIsLocationDropdownOpen(true);
                    if (heroErrors.location) {
                      setHeroErrors({...heroErrors, location: undefined});
                    }
                  }}
                  onFocus={() => setIsLocationDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
                  autoComplete="off"
                  className={`w-full p-[13px] rounded-lg border ${heroErrors.location ? 'border-red-500' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]`} />
                {heroErrors.location && <p className="text-red-500 text-sm mt-1">{heroErrors.location}</p>}
                
                {isLocationDropdownOpen && locationSearch.trim().length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {AVAILABLE_LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).map(loc => (
                      <li
                        key={loc}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer text-gray-900 dark:text-white text-sm border-b border-gray-100 dark:border-[#2a2a2a] last:border-0"
                        onMouseDown={() => {
                          setLocationSearch(loc);
                          setIsLocationDropdownOpen(false);
                          setHeroErrors({...heroErrors, location: undefined});
                        }}
                      >
                        {loc}
                      </li>
                    ))}
                    {AVAILABLE_LOCATIONS.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase())).length === 0 && (
                      <li className="px-4 py-3 text-gray-500 text-sm">We currently do not operate in this area.</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="text" name="brand" required placeholder="Brand (e.g. Honda) *" 
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />
                <input type="text" name="model" required placeholder="Model *" 
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <select name="service" required
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]">
                  <option value="">Select Service *</option>
                  <option>₹699 General servicing</option>
                  <option>₹399 Basic servicing</option>
                  <option>Repair / Other</option>
                </select>

                <select name="timeSlot" required
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all text-[15px]">
                  <option value="">Select Time *</option>
                  <option>Morning (9-12)</option>
                  <option>Afternoon (12-4)</option>
                  <option>Evening (4-8)</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors text-[16px] flex justify-center items-center gap-2 mt-2">
                <Wrench className="w-5 h-5" /> Book Mechanic Now
              </button>

            </form>
          </div>
        </div>
                    </FadeIn>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-5 bg-white dark:bg-[#1d1d1d]">
        <FadeIn>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-11">
            <h2 className="text-[40px] font-bold mb-2.5 leading-tight text-gray-900 dark:text-white">
              Simple <span className="text-[#e5a900] dark:text-[#ffc107]">Pricing</span>
            </h2>
            <p className="text-gray-600 dark:text-[#bdbdbd]">No hidden charges. Pay only for the service you approve.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-[18px] p-[30px] relative flex flex-col shadow-sm dark:shadow-none">
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">Basic Service</h3>
              <div className="text-[#e5a900] dark:text-[#ffc107] text-[38px] font-black my-[15px]">₹399</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li>✓ Bike Inspection</li>
                <li>✓ Chain Lubrication</li>
                <li>✓ Brake Check</li>
                <li>✓ Battery Check</li>
                <li>✓ Basic Cleaning</li>
              </ul>
              <a href="#home" className="block text-center bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors">
                Book Now
              </a>
            </div>

            <div className="bg-[#fffdf0] dark:bg-[#1d1d1d] border-2 border-[#ffc107] rounded-[18px] p-[30px] relative flex flex-col shadow-md dark:shadow-none scale-105 z-10 hidden md:flex">
              <div className="absolute -top-[14px] right-5 bg-[#ffc107] text-black px-3 py-1 rounded-[20px] text-[12px] font-black">
                MOST POPULAR
              </div>
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">General Service</h3>
              <div className="text-[#e5a900] dark:text-[#ffc107] text-[38px] font-black my-[15px]">₹699</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Complete Inspection</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Engine Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Brake Service</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Chain Adjustment</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Electrical Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Lubrication</li>
              </ul>
              <a href="#home" className="block text-center bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors shadow-sm dark:shadow-none">
                Book Now
              </a>
            </div>
            
            {/* Mobile version without scale for Most Popular */}
            <div className="bg-[#fffdf0] dark:bg-[#1d1d1d] border-2 border-[#ffc107] rounded-[18px] p-[30px] relative flex flex-col shadow-md dark:shadow-none md:hidden">
              <div className="absolute -top-[14px] right-5 bg-[#ffc107] text-black px-3 py-1 rounded-[20px] text-[12px] font-black">
                MOST POPULAR
              </div>
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">General Service</h3>
              <div className="text-[#e5a900] dark:text-[#ffc107] text-[38px] font-black my-[15px]">₹699</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Complete Inspection</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Engine Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Brake Service</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Chain Adjustment</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Electrical Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Lubrication</li>
              </ul>
              <a href="#home" className="block text-center bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors shadow-sm dark:shadow-none">
                Book Now
              </a>
            </div>

            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-[18px] p-[30px] relative flex flex-col shadow-sm dark:shadow-none">
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">Full Service</h3>
              <div className="text-[#e5a900] dark:text-[#ffc107] text-[38px] font-black my-[15px]">₹1,339</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li>✓ Full Bike Inspection</li>
                <li>✓ Engine Service</li>
                <li>✓ Brake Service</li>
                <li>✓ Electrical Inspection</li>
                <li>✓ Chain Service</li>
                <li>✓ Complete Maintenance</li>
              </ul>
              <a href="#home" className="block text-center bg-[#ffc107] hover:bg-[#e5a900] text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors">
                Book Now
              </a>
            </div>
          </div>
        </div>
                    </FadeIn>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">
                  <FadeIn>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-11">
            <h2 className="text-[40px] font-bold mb-2.5 leading-tight text-gray-900 dark:text-white">
              Frequently Asked <span className="text-[#e5a900] dark:text-[#ffc107]">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-[#bdbdbd]">Common questions about our bike repair service.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-xl overflow-hidden transition-colors hover:border-[#ffc107] shadow-sm dark:shadow-none"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-bold text-[17px] text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#ffc107] transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`px-6 text-gray-600 dark:text-[#bdbdbd] overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
                    </FadeIn>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 text-center bg-[#ffc107]">
                  <FadeIn>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[42px] font-bold mb-[15px] leading-tight text-black">Bike Problem? We've Got You Covered.</h2>
          <p className="text-black/80 font-medium text-lg mb-[25px]">Book a professional bike mechanic at your doorstep.</p>
          <a href="#home" className="inline-block bg-black text-white hover:bg-gray-900 px-8 py-4 rounded-xl font-extrabold transition-colors text-lg shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-2xl">
            Book Your Service
          </a>
        </div>
                    </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-[#1d1d1d] py-10 px-5 text-center border-t border-gray-200 dark:border-[#303030]">
        <div className="max-w-6xl mx-auto">
          <div className="text-[25px] font-black text-[#ffc107] mb-2.5 block">
            YES <span className="text-gray-900 dark:text-white">BIKE REPAIR</span>
          </div>
          <p className="text-gray-500 dark:text-[#bdbdbd] text-[14px]">Professional doorstep bike repair and service.</p>
          <p className="text-gray-400 dark:text-[#bdbdbd] text-[14px] mt-2.5">© 2026 YES Bike Repair. All Rights Reserved.</p>
        </div>
      </footer>

      {heroSuccess && (
        <Toast message="Booking request submitted! We will contact you soon." onClose={() => setHeroSuccess(false)} />
      )}
      {/* QUICK CONTACT MINI-BAR */}
      <div className="fixed right-5 bottom-5 flex flex-col sm:flex-row items-end sm:items-center gap-3 z-50">
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-white dark:bg-[#1d1d1d] shadow-[0_5px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_25px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-[#303030] p-2 rounded-full sm:px-4 backdrop-blur-sm animate-in fade-in slide-in-from-right-10 duration-500">
          <a href="tel:+917090400617" aria-label="Call Us" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:hover:bg-[#333] text-gray-800 dark:text-gray-200 transition-colors">
            <Phone className="w-[18px] h-[18px]" />
          </a>
          <div className="w-6 h-[1px] sm:w-[1px] sm:h-6 bg-gray-200 dark:bg-[#444]"></div>
          <a href="mailto:bikeservice134@gmail.com" aria-label="Email Us" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:hover:bg-[#333] text-gray-800 dark:text-gray-200 transition-colors">
            <Mail className="w-[18px] h-[18px]" />
          </a>
        </div>
        <a 
          href="https://wa.me/917090400617" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-[58px] h-[58px] bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-[0_5px_25px_rgba(0,0,0,0.4)] no-underline transition-transform hover:scale-110 shrink-0"
          aria-label="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </a>
      </div>
      </div>
    </div>
  );
}
