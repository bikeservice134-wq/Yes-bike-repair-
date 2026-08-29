import { motion } from 'motion/react';
import { PrivacyPolicy } from "./PrivacyPolicy";
import { TermsAndConditions } from "./TermsAndConditions";
import React, { useState, useEffect } from 'react';
import logoUrl from './assets/images/bike_service_logo_1787571187541.jpg';
import coverageMapUrl from './assets/images/coverage_map_illustration_1787573120801.jpg';


import { 
  Wrench, Star, Clock, 
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
  Mail,
  Calendar,
  Truck,
  Battery,
  Droplet,
  Car,
  SprayCan,
  Share2,
  Facebook
} from 'lucide-react';


export const FadeIn = ({ children, className = "w-full" }: { children: React.ReactNode, className?: string }) => (
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


const BookingTrackerModal = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 2000);
    const timer2 = setTimeout(() => setCurrentStep(2), 4500);
    const timer3 = setTimeout(() => setCurrentStep(3), 7000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    { label: "Booked", description: "Your request is received" },
    { label: "Mechanic Assigned", description: "Arun is on the way" },
    { label: "Arrived", description: "Mechanic is at your location" },
    { label: "Service Complete", description: "Your vehicle is ready!" }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#151515] w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Status</h3>
          <p className="text-gray-500 dark:text-[#bdbdbd]">Tracking your service request in real-time</p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-[#333] before:to-transparent">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#151515] bg-gray-100 dark:bg-[#222] text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-500"
                  style={{
                    backgroundColor: isCompleted || isActive ? '#eab308' : '',
                    color: isCompleted || isActive ? '#fff' : ''
                  }}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : (isActive ? <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" /> : <div className="w-2.5 h-2.5 bg-gray-300 dark:bg-[#555] rounded-full" />)}
                </div>
                
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#1a1a1a] shadow-sm transition-all duration-500"
                  style={{
                    borderColor: isActive ? '#eab308' : '',
                    opacity: currentStep < index ? 0.5 : 1,
                    transform: isActive ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div className="flex flex-col">
                    <h4 className={"font-bold text-[16px] mb-1 " + (isCompleted || isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-[#888]")}>{step.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-[#aaa]">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {currentStep === 3 && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={onClose} className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-8 py-3 rounded-lg font-bold transition-colors">
              Close Tracker
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


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
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [heroVehicle, setHeroVehicle] = useState("Bike");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "privacy" | "terms">("home");
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
      <div className="bg-white dark:bg-[#0b0b0b] text-gray-900 dark:text-white font-sans selection:bg-yellow-500 selection:text-black min-h-screen">
            {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0b0b0b]/95 border-b border-gray-200 dark:border-[#303030] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="Yes Bike Service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-black text-yellow-500 leading-none text-left">
              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>
            </button>
          </div>
          <nav className="hidden lg:flex gap-6 items-center">
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Home</a>
            <a href="#pricing" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Pricing</a>
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Book Service</a>
          </nav>
          
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <a href="#home" className="hidden md:inline-flex bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2.5 rounded-lg font-extrabold transition-colors ml-4">

            Book Now
          </a>
        </div>
      </header>

      {currentView === "home" ? (
        <main>
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
            <p className="text-gray-600 dark:text-[#bdbdbd] text-lg md:text-[19px] max-w-[620px] mb-8">
              Professional two-wheeler servicing at your home.
              Book a verified mechanic online and get your vehicle fixed
              without visiting a service center.
            </p>

          </div>

          <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] p-5 sm:p-8 rounded-[20px] shadow-2xl backdrop-blur-sm relative">
            <h3 className="text-gray-900 dark:text-white text-[25px] font-bold mb-3">Book in 30 Seconds.</h3>
            
            <ul className="text-sm text-gray-600 dark:text-gray-400 mb-5 space-y-2 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Certified mechanic at your doorstep in 30 minutes.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Services starting from ₹399.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> 30-day service warranty for complete peace of mind.</li>
            </ul>

            <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg mb-5 border border-gray-200 dark:border-[#303030]">
              {['Bike', 'Scooter'].map(type => (
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
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-[15px]" />
                <div>
                  <input type="tel" name="phone" required placeholder="Mobile No *"
                    pattern="[0-9]{10}" maxLength={10}
                    className={`w-full p-[13px] rounded-lg border ${heroErrors.phone ? 'border-yellow-400' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-[15px]`} />
                  {heroErrors.phone && <p className="text-yellow-400 text-sm mt-1">{heroErrors.phone}</p>}
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
                  className={`w-full p-[13px] rounded-lg border ${heroErrors.location ? 'border-yellow-400' : 'border-gray-300 dark:border-[#444]'} bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-[15px]`} />
                {heroErrors.location && <p className="text-yellow-400 text-sm mt-1">{heroErrors.location}</p>}
                
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
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-[15px]" />
                <input type="text" name="model" required placeholder="Model *" 
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-[15px]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <select name="service" required
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-[15px]">
                  <option value="">Select Service *</option>
                  {heroVehicle === 'Car_Removed' ? (
                    <>
                      <option>₹999 Jump Start</option>
                      <option>₹999 Puncture Repair</option>
                      <option>Repair / Other</option>
                    </>
                  ) : (
                    <>
                      <option>₹699 General servicing</option>
                      <option>₹399 Basic servicing</option>
                      <option>₹1,339 Full Service</option>
                      <option>Repair / Other</option>
                    </>
                  )}
                </select>

                <select name="timeSlot" required value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full p-[13px] rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-[15px]">
                  <option value="">Select Time *</option>
                  <option>Morning (9-12)</option>
                  <option>Afternoon (12-4)</option>
                  <option>Evening (4-8)</option>
                </select>

              </div>

              {selectedTimeSlot && (
                <div className="flex items-center gap-2 mt-3 p-3 bg-green-50/50 dark:bg-[#122216] rounded-lg border border-green-100 dark:border-[#1c3a26] text-sm text-gray-700 dark:text-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                   <Clock className="w-4 h-4 text-green-600 dark:text-green-500" />
                   <span className="font-medium">
                     Estimated arrival: <span className="text-gray-900 dark:text-white font-bold">{
                       selectedTimeSlot.includes('Morning') ? '9:30 AM - 10:30 AM' :
                       selectedTimeSlot.includes('Afternoon') ? '12:30 PM - 1:30 PM' :
                       selectedTimeSlot.includes('Evening') ? '4:30 PM - 5:30 PM' : 'Within 30-45 mins'
                     }</span>
                   </span>
                </div>
              )}
              

              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors text-[16px] flex justify-center items-center gap-2 mt-2">
                <Wrench className="w-5 h-5" /> Book Mechanic Now
              </button>

            </form>

            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-[#303030]">
              <h4 className="text-gray-900 dark:text-white font-bold text-[16px] mb-3 text-center">Service Highlights</h4>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-gray-600 dark:text-[#bdbdbd] font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-yellow-500" /> Verified Mechanics</li>
                <li className="flex items-center gap-1.5"><Settings className="w-3.5 h-3.5 text-yellow-500" /> Genuine Spare Parts</li>
                <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-yellow-500" /> 30-Day Warranty</li>
                <li className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-yellow-500" /> Transparent Pricing</li>
                <li className="flex items-center gap-1.5 col-span-2 justify-center mt-1"><Home className="w-3.5 h-3.5 text-yellow-500" /> Doorstep Service</li>
              </ul>
            </div>
          </div>
        </div>
                    </FadeIn>
      </section>


      {/* TRUSTED BY RIDERS */}

      <section className="py-16 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-[32px] font-bold mb-12 text-gray-900 dark:text-white">
              Trusted by <span className="text-yellow-600 dark:text-yellow-500">Riders</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3">58,000+</div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">Happy Customers</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3">10+</div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">Partner Garages</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3">1</div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">City Covered</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[40px] md:text-[48px] font-black text-gray-900 dark:text-white leading-none mb-3 flex items-baseline justify-center gap-1">
                  4.8<span className="text-[24px] md:text-[28px] text-gray-400 dark:text-[#666]">/5</span>
                </div>
                <div className="text-gray-600 dark:text-[#bdbdbd] font-bold text-sm tracking-wide">Customer Rating</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>


      

      {/* ABOUT US */}
      <section id="about" className="py-20 px-5 bg-white dark:bg-[#1d1d1d] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <span className="text-yellow-500 font-black tracking-widest uppercase text-sm mb-3 block">About YES Bike Service</span>
              <h2 className="text-[36px] md:text-[40px] font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                Reliable Two-Wheeler Service, <span className="text-yellow-500 dark:text-yellow-400">Right at Your Doorstep</span>
              </h2>
              
              <p className="text-gray-600 dark:text-[#bdbdbd] mb-4 text-[17px] leading-relaxed">
                At YES Bike Service, we make bike and scooter servicing simple, convenient, and transparent. Our goal is to save riders time by bringing professional two-wheeler service and repair directly to their doorstep.
              </p>
              <p className="text-gray-600 dark:text-[#bdbdbd] mb-10 text-[17px] leading-relaxed">
                From routine servicing and brake repairs to battery replacement, tyre services, engine work, and emergency assistance, our experienced mechanics are equipped to handle your bike’s needs with care.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-[#bdbdbd] mb-6 text-[17px] leading-relaxed border-l-4 border-yellow-500 pl-4">
                We’re building a better way to maintain two-wheelers—combining professional workmanship, transparent pricing, convenient doorstep service, and a customer-first experience.
              </p>
              
              <p className="font-bold text-gray-900 dark:text-white text-[19px] mb-8">
                Your Bike. Our Expertise. Service Made Easy.
              </p>
              <a href="#home" className="inline-flex justify-center w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold transition-colors items-center gap-2 text-lg">
                Book Service Today
              </a>
            </div>
            
            <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
              <div className="bg-gray-50 dark:bg-[#101010] border border-gray-100 dark:border-[#303030] rounded-3xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Why Choose YES Bike Service?</h3>
                <ul className="space-y-6">
                  {[
                    { icon: '🔧', title: 'Verified Mechanics', desc: 'Skilled professionals you can trust.' },
                    { icon: '🏠', title: 'Doorstep Service', desc: 'Get your bike serviced at home or office.' },
                    { icon: '🛠️', title: 'Genuine Spare Parts', desc: 'Quality parts for dependable performance.' },
                    { icon: '💰', title: 'Transparent Pricing', desc: 'Know the cost before approving repairs.' },
                    { icon: '🛡️', title: 'Service Warranty', desc: 'Added confidence with warranty-backed service.' },
                    { icon: '📱', title: 'Easy Online Booking', desc: 'Book your service in just a few clicks.' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-xl shrink-0 text-xl flex items-center justify-center">
                         {item.icon}
                      </div>
                      <div>
                        <span className="block text-gray-900 dark:text-white text-[17px] font-bold mb-1">{item.title}</span>
                        <span className="block text-gray-600 dark:text-[#bdbdbd] text-[15px]">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
      {/* OUR SERVICES */}
      <section id="services" className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                Our <span className="text-yellow-500 dark:text-yellow-400">Comprehensive Services</span>
              </h2>
              <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-[17px]">
                From routine maintenance to complete overhauls, we offer a wide range of services to keep your two-wheeler in top condition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Engine Repair & Overhaul', icon: '🔧', desc: 'Complete engine repair and overhaul, including dismantling, detailed inspection, replacement of worn components, precision assembly, and comprehensive performance testing.' },
                { title: 'Battery Replacement', icon: '🔋', desc: 'We check battery health, charging performance, and electrical connections before installing a high-quality battery compatible with your motorcycle’s specifications.' },
                { title: 'Tyre Replacement', icon: '🛞', desc: 'Complete tyre replacement with tyre inspection, professional installation, wheel balancing, air-pressure adjustment, and safety checks for confident riding.' },
                { title: 'Brake Service', icon: '🛑', desc: 'Thorough brake inspection covering brake pads, discs, drums, brake fluid, and cables, followed by necessary adjustments and performance testing for reliable stopping power.' },
                { title: 'Clutch Repair', icon: '⚡', desc: 'Experiencing hard gear shifts, clutch slipping, or poor acceleration? Our technicians inspect and adjust the clutch, replace cables when required, and service clutch plates for smoother gear engagement.' },
                { title: 'Chain & Sprocket Replacement', icon: '⛓️', desc: 'We inspect chain and sprocket wear, lubricate moving components, adjust chain tension, and replace worn parts to improve drivetrain performance and extend component life.' },
                { title: 'Suspension Repair', icon: '🌀', desc: 'Inspection and repair of front forks, rear shock absorbers, bushings, seals, and other suspension components to provide a smoother, safer, and more controlled ride.' },
                { title: 'Electrical Repair', icon: '💡', desc: 'Professional diagnosis and repair of wiring, switches, lights, horn, indicators, ignition, charging circuits, and electrical accessories using appropriate diagnostic equipment.' },
                { title: 'Insurance Claim Assistance', icon: '📄', desc: 'We make the repair process easier by assisting with insurance documentation, vehicle inspection coordination, repair estimates, and quality restoration work.' }
              ].map((service, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1d1d1d] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-[#303030] hover:border-yellow-500 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none group">
                  <div className="text-4xl mb-4 opacity-90 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                  <h3 className="text-[20px] font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-[#bdbdbd] text-[15px] leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
      {/* BRANDS WE SERVICE */}
      <section className="py-20 px-5 bg-white dark:bg-[#1d1d1d] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                Brands We <span className="text-yellow-500 dark:text-yellow-400">Service</span>
              </h2>
              <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-[17px]">
                Our expert mechanics are trained to repair and service all major two-wheeler brands with genuine spare parts.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                'Honda', 'Hero', 'Bajaj', 'TVS', 'Yamaha', 'Royal Enfield', 'Suzuki', 'KTM', 'Vespa', 'Aprilia', 'Ather', 'Ola'
              ].map((brand, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-[#101010] border border-gray-100 dark:border-[#303030] hover:border-yellow-500 transition-colors rounded-2xl py-4 px-8 flex items-center justify-center min-w-[140px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none cursor-default group">
                  <span className="text-lg font-bold text-gray-700 dark:text-[#e0e0e0] group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
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
                  <div className="bg-white dark:bg-[#1d1d1d] p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-gray-100 dark:border-[#303030] hover:border-yellow-500/30 transition-colors group">
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
      <section className="py-20 px-5 bg-gray-900 dark:bg-[#0a0a0a] border-t border-gray-800 dark:border-[#222]">
        <FadeIn>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-white">
                How We <span className="text-yellow-500">Compare</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-[17px]">
                See why thousands of riders choose our service over local garages and authorized service centers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b-2 border-gray-700 text-white font-bold text-lg w-1/4">Feature</th>
                    <th className="p-4 border-b-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 font-bold text-lg text-center rounded-t-xl w-1/4">YES Bike Service</th>
                    <th className="p-4 border-b-2 border-gray-700 text-gray-400 font-bold text-lg text-center w-1/4">Local Garage</th>
                    <th className="p-4 border-b-2 border-gray-700 text-gray-400 font-bold text-lg text-center w-1/4">Authorized Center</th>
                  </tr>
                </thead>
                <tbody className="text-[16px]">
                  {[
                    { feature: 'Doorstep Service', apna: true, local: false, auth: false },
                    { feature: 'Transparent Pricing', apna: true, local: false, auth: 'Partial' },
                    { feature: 'Genuine Spares', apna: true, local: 'Uncertain', auth: true },
                    { feature: 'Service Warranty', apna: 'Yes (30 Days)', local: false, auth: 'Yes' },
                    { feature: 'Time Taken', apna: 'Same Day', local: 'Variable', auth: '1-3 Days' },
                    { feature: 'Live Updates', apna: true, local: false, auth: false }
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-800">
                      <td className="p-4 font-medium text-gray-300">{row.feature}</td>
                      <td className="p-4 bg-yellow-500/5 text-center">
                        {row.apna === true ? <CheckCircle2 className="w-6 h-6 text-yellow-500 mx-auto" /> : <span className="font-bold text-yellow-500">{row.apna}</span>}
                      </td>
                      <td className="p-4 text-center text-gray-500">
                        {row.local === false ? <X className="w-6 h-6 text-red-500 mx-auto opacity-50" /> : row.local === true ? <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto opacity-50" /> : <span>{row.local}</span>}
                      </td>
                      <td className="p-4 text-center text-gray-500">
                        {row.auth === false ? <X className="w-6 h-6 text-red-500 mx-auto opacity-50" /> : row.auth === true ? <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto opacity-50" /> : <span>{row.auth}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>
      {/* PRICING */}
      <section id="pricing" className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-11">
            <h2 className="text-[40px] font-bold mb-2.5 leading-tight text-gray-900 dark:text-white">
              Service <span className="text-yellow-600 dark:text-yellow-500">Packages</span>
            </h2>
            <p className="text-gray-600 dark:text-[#bdbdbd]">Choose the right package for your vehicle. Expert mechanics handle it all right at your location.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-[18px] p-[30px] relative flex flex-col shadow-sm dark:shadow-none">
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">Basic Service</h3>
              <div className="text-yellow-600 dark:text-yellow-500 text-[38px] font-black my-[15px]">₹399</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li>✓ Bike Inspection</li>
                <li>✓ Chain Lubrication</li>
                <li>✓ Brake Check</li>
                <li>✓ Battery Check</li>
                <li>✓ Basic Cleaning</li>
              </ul>
              <a href="#home" className="block text-center bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors">
                Book Now
              </a>
            </div>

            <div className="bg-yellow-50 dark:bg-[#1d1d1d] border-2 border-yellow-500 rounded-[18px] p-[30px] relative flex flex-col shadow-md dark:shadow-none scale-105 z-10 hidden md:flex">
              <div className="absolute -top-[14px] right-5 bg-yellow-500 text-black px-3 py-1 rounded-[20px] text-[12px] font-black">
                MOST POPULAR
              </div>
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">General Service</h3>
              <div className="text-yellow-600 dark:text-yellow-500 text-[38px] font-black my-[15px]">₹699</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Complete Inspection</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Engine Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Brake Service</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Chain Adjustment</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Electrical Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Lubrication</li>
              </ul>
              <a href="#home" className="block text-center bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors shadow-sm dark:shadow-none">
                Book Now
              </a>
            </div>
            
            {/* Mobile version without scale for Most Popular */}
            <div className="bg-yellow-50 dark:bg-[#1d1d1d] border-2 border-yellow-500 rounded-[18px] p-[30px] relative flex flex-col shadow-md dark:shadow-none lg:hidden">
              <div className="absolute -top-[14px] right-5 bg-yellow-500 text-black px-3 py-1 rounded-[20px] text-[12px] font-black">
                MOST POPULAR
              </div>
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">General Service</h3>
              <div className="text-yellow-600 dark:text-yellow-500 text-[38px] font-black my-[15px]">₹699</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Complete Inspection</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Engine Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Brake Service</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Chain Adjustment</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Electrical Check</li>
                <li className="font-medium text-gray-800 dark:text-[#ddd]">✓ Lubrication</li>
              </ul>
              <a href="#home" className="block text-center bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors shadow-sm dark:shadow-none">
                Book Now
              </a>
            </div>

            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-[18px] p-[30px] relative flex flex-col shadow-sm dark:shadow-none">
              <h3 className="text-[19px] font-bold text-gray-900 dark:text-white">Full Service</h3>
              <div className="text-yellow-600 dark:text-yellow-500 text-[38px] font-black my-[15px]">₹1,339</div>
              <ul className="space-y-[16px] my-5 flex-1 text-gray-600 dark:text-[#bdbdbd]">
                <li>✓ Full Bike Inspection</li>
                <li>✓ Engine Service</li>
                <li>✓ Brake Service</li>
                <li>✓ Electrical Inspection</li>
                <li>✓ Chain Service</li>
                <li>✓ Complete Maintenance</li>
              </ul>
              <a href="#home" className="block text-center bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3.5 rounded-lg font-extrabold transition-colors">
                Book Now
              </a>
            </div>
            
          </div>
        </div>
                    </FadeIn>
      </section>


      {/* COVERAGE AREA */}
      <section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-[#303030] bg-gray-50 dark:bg-[#101010] p-3 aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                 <img src={coverageMapUrl} alt="Service Coverage Map" className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none rounded-2xl"></div>
              </div>
              
              <div>
                <h2 className="text-[36px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                  Our Service <span className="text-yellow-600 dark:text-yellow-500">Coverage</span>
                </h2>
                <p className="text-gray-600 dark:text-[#bdbdbd] mb-8 text-[17px]">
                  We currently provide doorstep repair services across major neighborhoods in Bangalore. Fast, reliable, and right at your location.
                </p>
                
                <div className="flex flex-wrap gap-2.5">
                  {AVAILABLE_LOCATIONS.map((loc, idx) => (
                    <span key={'loc-'+idx} className="bg-gray-50 dark:bg-[#151515] text-gray-800 dark:text-[#ddd] px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-200 dark:border-[#333] shadow-sm flex items-center gap-2 hover:border-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors cursor-default">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>


      {/* GOOGLE REVIEWS */}
      <section className="bg-gray-50 dark:bg-[#101010] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-11 gap-4 text-center md:text-left">
              <div>
                <h2 className="text-[36px] font-bold mb-2 leading-tight text-gray-900 dark:text-white">
                  Customer <span className="text-yellow-600 dark:text-yellow-500">Reviews</span>
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
                  text: "Arun was very professional. Came to my location in Koramangala and fixed my bike's puncture in 20 minutes. Highly recommended for quick service!",
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

      {/* FAQ */}
      <section className="bg-white dark:bg-[#1d1d1d] py-20 px-5 border-t border-gray-200 dark:border-[#303030]">
                  <FadeIn>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-11">
            <span className="text-yellow-500 font-black tracking-widest uppercase text-sm mb-3 block">Got Questions?</span>
            <h2 className="text-[36px] md:text-[40px] font-bold mb-3 leading-tight text-gray-900 dark:text-white">
              Frequently Asked <span className="text-yellow-600 dark:text-yellow-500">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-[#bdbdbd] text-[17px]">Everything you need to know about our doorstep auto service.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-xl overflow-hidden transition-colors hover:border-yellow-500 shadow-sm dark:shadow-none"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-bold text-[17px] text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-yellow-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
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
      <section className="py-20 px-5 text-center bg-yellow-500">
                  <FadeIn>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[42px] font-bold mb-[15px] leading-tight text-white">Bike Problem? We've Got You Covered.</h2>
          <p className="text-white/90 font-medium text-lg mb-[25px]">Book a professional bike mechanic at your doorstep.</p>
          <a href="#home" className="inline-block bg-white text-yellow-500 hover:bg-gray-100 px-8 py-4 rounded-xl font-extrabold transition-colors text-lg shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-2xl">
            Book Your Service
          </a>
        </div>
                    </FadeIn>
      </section>

      </main>
      ) : currentView === "privacy" ? <PrivacyPolicy /> : <TermsAndConditions />}
      {/* FOOTER */}
      <footer className="bg-white dark:bg-[#1d1d1d] py-10 px-5 text-center border-t border-gray-200 dark:border-[#303030]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center gap-2 mb-3">
            <img src={logoUrl} alt="Yes Bike Service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-black text-yellow-500 leading-none">
              YES <span className="text-gray-900 dark:text-white">BIKE SERVICE</span>
            </button>
          </div>
          <p className="text-gray-500 dark:text-[#bdbdbd] text-[14px]">Professional doorstep two-wheeler repair service.</p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out YES Bike Service for doorstep two-wheeler repairs! ' + window.location.href)}`, '_blank') }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 transition-colors text-sm font-bold">
              <Share2 className="w-4 h-4" /> WhatsApp
            </button>
            <button onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank') }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2]/20 transition-colors text-sm font-bold">
              <Facebook className="w-4 h-4" /> Facebook
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-3">
            <button onClick={() => { setCurrentView('terms'); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-yellow-500 transition-colors">Terms & Conditions</button>
            <button onClick={() => { setCurrentView('privacy'); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-yellow-500 transition-colors">Privacy Policy</button>
          </div>
          <p className="text-gray-400 dark:text-[#bdbdbd] text-[14px] mt-2.5">© 2026 Yes Bike Service. All Rights Reserved.</p>
        </div>
      </footer>

      {heroSuccess && (
        <BookingTrackerModal onClose={() => setHeroSuccess(false)} />
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

      {/* QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151515] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-[#2a2a2a]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Custom Quote</h3>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setQuoteSuccess(true); setTimeout(() => {setQuoteSuccess(false); setIsQuoteModalOpen(false);}, 3000); }} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Vehicle Type</label>
                <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg border border-gray-200 dark:border-[#303030]">
                  {['Bike', 'Scooter'].map(type => (
                    <button
                      key={'quote-'+type}
                      type="button"
                      className="flex-1 py-2 text-sm font-bold rounded-md transition-all text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:bg-white dark:focus:bg-[#222] focus:text-gray-900 dark:focus:text-white focus:shadow-sm"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand</label>
                  <input type="text" required placeholder="e.g. Honda" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Model</label>
                  <input type="text" required placeholder="e.g. Activa 6G" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Issue Description</label>
                <textarea required placeholder="Describe what needs to be fixed..." rows={3} className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mobile Number</label>
                <input type="tel" required pattern="[0-9]{10}" placeholder="10-digit number" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm" />
              </div>
              
              <button type="submit" className="w-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-4 py-3 rounded-lg font-bold transition-colors mt-2">
                Request Estimate
              </button>
            </form>
          </div>
        </div>
      )}
      
      {quoteSuccess && <Toast message="Quote request sent! We'll contact you shortly." onClose={() => setQuoteSuccess(false)} />}

    </div>
  );
}
