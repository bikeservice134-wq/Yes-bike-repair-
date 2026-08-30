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
  MessageCircle,
  ChevronDown,
  Moon,
  Sun,
  X,
  Calendar,
  Truck,
  Battery,
  Droplet,
  Car,
  SprayCan,
  Share2,
  Facebook,
  MapPin,
  ArrowRight
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
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{name: string, price: string} | null>(null);
  const [packageSuccess, setPackageSuccess] = useState(false);
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
  const [activeLocation, setActiveLocation] = useState('Indiranagar');

  React.useEffect(() => {
    const locations = ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Jayanagar', 'Malleswaram', 'BTM Layout', 'Marathahalli', 'Electronic City', 'Bellandur'];
    const interval = setInterval(() => {
      setActiveLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
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
            <img src={logoUrl} alt="Yes bike service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-black text-yellow-500 leading-none text-left">
              Yes <span className="text-gray-900 dark:text-white">bike service</span>
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
          <a href="#home" className="hidden md:inline-flex bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-extrabold transition-colors ml-4">

            Book Now
          </a>
        </div>
      </header>

      {currentView === "home" ? (
        <main>
      {/* NEW HERO WITH EXTENDED BOOKING FORM */}
      <section 
        id="home" 
        className="min-h-[750px] flex items-center relative overflow-hidden py-16"
        style={{
          background: isDark ? 'linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.85)), radial-gradient(circle at 20% 50%, #5a4300, #111 45%, #000)' : 'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), radial-gradient(circle at 20% 50%, #fff9e6, #ffffff 45%, #f9fafb)'
        }}
      >
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 md:opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Bike Mechanic" className="w-full h-full object-cover" />
        </div>
        
        <FadeIn>
        <div className="max-w-6xl w-full mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
          
          {/* LEFT: HIGHLIGHTS & TEXT */}
          <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 text-sm font-semibold mb-6 shadow-sm transition-all duration-500 ease-in-out">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Mechanic currently serving near {activeLocation}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Book in <span className="text-yellow-500">30 Seconds.</span>
            </h1>
            <div className="space-y-4 mb-10 text-gray-600 dark:text-[#bdbdbd] text-lg md:text-xl font-medium">
              <p className="flex items-start gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                Certified mechanic at your doorstep in 30 minutes.
              </p>
              <p className="flex items-start gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                Services starting from ₹399.
              </p>
              <p className="flex items-start gap-3 justify-center lg:justify-start">
                <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                30-day service warranty for complete peace of mind.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#1d1d1d] border border-gray-100 dark:border-[#303030] p-6 rounded-2xl shadow-sm text-left inline-block w-full max-w-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-[#303030] pb-2">Service Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">👨‍🔧</span> Verified Mechanics
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">⚙️</span> Genuine Spare Parts
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">🛡️</span> 30-Day Warranty
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">₹</span> Transparent Pricing
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-bold text-sm sm:col-span-2">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">🏠</span> Doorstep Service
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT: BOOKING FORM */}
          <div className="order-1 lg:order-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] p-5 sm:p-6 rounded-[24px] shadow-2xl relative z-10 w-full mx-auto max-w-[380px]">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-0.5 text-center">Book Mechanic Now</h3>
            <p className="text-xs text-yellow-600 dark:text-yellow-500 text-center font-bold mb-3">Book in 30 Seconds.</p>
            
            <div className="space-y-1.5 mb-4 bg-gray-50 dark:bg-[#101010] p-2.5 rounded-xl border border-gray-100 dark:border-[#333]">
              <div className="flex items-start gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 w-3.5 shrink-0">✓</span> 
                <span>Certified mechanic at your doorstep in 30 minutes.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 w-3.5 shrink-0">✓</span> 
                <span>Services starting from ₹399.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mt-0.5 w-3.5 shrink-0">✓</span> 
                <span>30-day service warranty for complete peace of mind.</span>
              </div>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const brand = formData.get('brand');
              const model = formData.get('model');
              const service = formData.get('service');
              const time = formData.get('time');
              
              const message = `🏍️🛵QUICK VEHICLE SERVICE BOOKING\n\n👤 Name: ${fullName}\n📞 Phone: ${phone}\n📍 Location: ${locationSearch}\n🏍️ Vehicle: ${brand} ${model} (${heroVehicle})\n🔧 Service Required: ${service}\n⏰ Preferred Time Slot: ${time}\n\n✅ Book Now — Get a Mechanic at Your Doorstep`;
              
              // Standard WhatsApp business number (placeholder)
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              
              window.open(whatsappUrl, '_blank');
              setHeroSuccess(true);
            }}>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button type="button" onClick={() => setHeroVehicle('Bike')} className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}`}>🏍️ Bike</button>
                <button type="button" onClick={() => setHeroVehicle('Scooter')} className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-md' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333]'}`}>🛵 Scooter</button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input type="text" name="fullName" required placeholder="John Doe" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Mobile No *</label>
                  <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Service Location (Search area) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      placeholder="E.g., Koramangala" 
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Brand *</label>
                    <input type="text" name="brand" required placeholder="e.g. Honda" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Model *</label>
                    <input type="text" name="model" required placeholder="e.g. Activa 6G" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Service *</label>
                  <select name="service" required className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Choose a service...</option>
                    <option value="General Bike Service ₹699">General Bike Service ₹699</option>
                    <option value="General Service with Engine Oil ₹1,249">General Service with Engine Oil ₹1,249</option>
                    <option value="Jump Start Service ₹399">Jump Start Service ₹399</option>
                    <option value="Puncture Repair ₹599">Puncture Repair ₹599</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Time *</label>
                  <select name="time" required className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                    <option value="">Preferred time slot...</option>
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-xl font-black text-[16px] transition-all hover:scale-[1.02] active:scale-95 shadow-md flex justify-center items-center gap-2 mt-4">
                Book Mechanic Now <ArrowRight className="w-5 h-5" />
              </button>
            </form>
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
      
      {/* PRICING / FEATURED SERVICES */}
      <section id="pricing" className="py-20 px-5 bg-gray-50 dark:bg-[#101010] border-t border-gray-200 dark:border-[#303030]">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                Service <span className="text-yellow-600 dark:text-yellow-500">Packages</span>
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Choose the Right Service for Your Bike
              </h3>
              <p className="text-gray-600 dark:text-[#bdbdbd] text-lg mb-8 leading-relaxed">
                Get professional bike servicing and repairs at your doorstep. Choose the package that suits your bike, and our verified mechanics will take care of the rest at your home or office.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Expert Mechanics</span>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-700">&bull;</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Transparent Pricing</span>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-700">&bull;</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Doorstep Service</span>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-700">&bull;</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Service Warranty</span>
              </div>
            </div>

            
            <div className="overflow-hidden relative -mx-5 px-5 md:mx-0 md:px-0">
              {/* Fade masks for smooth edges */}
              <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-[#101010] z-20 pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-[#101010] z-20 pointer-events-none"></div>

              <div className="flex w-max gap-6 animate-scroll hover:[animation-play-state:paused] py-4">
                {/* We double the packages for infinite scroll effect */}
                {[...Array(2)].map((_, loopIdx) => (
                  <React.Fragment key={loopIdx}>
                    {/* FEATURED SERVICE 1: General Service */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border-2 border-yellow-500 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-yellow-500 text-black px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        🏍️ FEATURED PACKAGE
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        General Bike Service
                      </h2>
                      <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-500 mb-4">
                        Complete Service at Your Doorstep
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🛡️</span> 1 Month Warranty
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⏱️</span> Takes ~2 Hours
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹699</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹899</span>
                        </div>
                      </div>
                      <button onClick={() => { setSelectedPackage({ name: "General Bike Service", price: "₹699" }); setIsPackageModalOpen(true); }} className="w-full block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </button>
                    </div>

                    {/* FEATURED SERVICE 2: With Engine Oil */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#18181b] rounded-3xl p-6 md:p-8 border-2 border-red-500/20 dark:border-red-500/30 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        ⭐ BEST VALUE
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        Service + Engine Oil
                      </h2>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        General Service + Motul Oil Change
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🛢️</span> Premium Engine Oil
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🛡️</span> 1 Month Warranty
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹1,249</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹1,500</span>
                        </div>
                      </div>
                      <button onClick={() => { setSelectedPackage({ name: "Service + Engine Oil", price: "₹1,249" }); setIsPackageModalOpen(true); }} className="w-full block bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </button>
                    </div>

                    {/* FEATURED SERVICE 3: Jump Start */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#1d1d1d] rounded-3xl p-6 md:p-8 border-2 border-red-500/20 dark:border-red-500/30 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        ⚡ EMERGENCY
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        Jump Start Service
                      </h2>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Quick Battery Jump Start
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⚡</span> Quick & Reliable
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⏱️</span> 30 Mins Service Time
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹399</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹600</span>
                        </div>
                      </div>
                      <button onClick={() => { setSelectedPackage({ name: "Jump Start Service", price: "₹399" }); setIsPackageModalOpen(true); }} className="w-full block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </button>
                    </div>

                    {/* FEATURED SERVICE 4: Puncture Repair */}
                    <div className="w-[320px] md:w-[450px] shrink-0 bg-white dark:bg-[#1d1d1d] rounded-3xl p-6 md:p-8 border-2 border-orange-500/20 dark:border-orange-500/30 shadow-xl relative overflow-hidden flex flex-col transition-transform hover:-translate-y-2">
                      <div className="inline-block bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 px-4 py-1.5 rounded-full text-xs font-black mb-4 w-max">
                        🛞 TYRE SERVICE
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        Puncture Repair
                      </h2>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Quick Doorstep Service
                      </h3>
                      
                      <div className="flex-1 mb-6">
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>🏠</span> Doorstep Service
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>⏱️</span> Takes 30 mins
                          </li>
                          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
                            <span>➕</span> ₹100 extra per added puncture
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-[#222] rounded-xl p-4 border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">💰 Special Price</div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">₹599</span>
                          <span className="text-lg text-gray-400 dark:text-gray-500 line-through font-bold">₹750</span>
                        </div>
                      </div>
                      <button onClick={() => { setSelectedPackage({ name: "Puncture Repair", price: "₹599" }); setIsPackageModalOpen(true); }} className="w-full block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-extrabold transition-all text-center">
                        Book Now
                      </button>
                    </div>
                  </React.Fragment>
                ))}
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
                    <span key={'loc-'+idx} className="bg-gray-50 dark:bg-[#151515] text-gray-800 dark:text-[#ddd] px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 dark:border-[#333] shadow-sm flex items-center gap-2 hover:border-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors cursor-default">
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

            <div className="overflow-hidden relative -mx-5 px-5 md:mx-0 md:px-0">
              {/* Fade masks for smooth edges */}
              <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-[#101010] z-10 pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-[#101010] z-10 pointer-events-none"></div>

              <div className="flex w-max gap-6 animate-scroll">
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
                  },
                  {
                    name: "Amit Kumar",
                    time: "1 month ago",
                    text: "Fantastic doorstep service! Changed my engine oil and fixed the brakes perfectly right in my parking lot.",
                    initial: "A",
                    color: "bg-orange-600"
                  },
                  {
                    name: "Neha Gupta",
                    time: "2 months ago",
                    text: "Very transparent pricing and professional mechanics. Highly recommended for scooty servicing. Great experience overall.",
                    initial: "N",
                    color: "bg-red-600"
                  },
                  {
                    name: "Suresh P",
                    time: "2 months ago",
                    text: "Convenient and time-saving. I didn't have to wait at the garage all day. Will definitely book again next time.",
                    initial: "S",
                    color: "bg-teal-600"
                  },
                  // Duplicated for infinite scroll effect
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
                  },
                  {
                    name: "Amit Kumar",
                    time: "1 month ago",
                    text: "Fantastic doorstep service! Changed my engine oil and fixed the brakes perfectly right in my parking lot.",
                    initial: "A",
                    color: "bg-orange-600"
                  },
                  {
                    name: "Neha Gupta",
                    time: "2 months ago",
                    text: "Very transparent pricing and professional mechanics. Highly recommended for scooty servicing. Great experience overall.",
                    initial: "N",
                    color: "bg-red-600"
                  },
                  {
                    name: "Suresh P",
                    time: "2 months ago",
                    text: "Convenient and time-saving. I didn't have to wait at the garage all day. Will definitely book again next time.",
                    initial: "S",
                    color: "bg-teal-600"
                  }
                ].map((review, idx) => (
                  <div key={idx} className="w-[300px] sm:w-[350px] shrink-0 bg-white dark:bg-[#1d1d1d] border border-gray-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm dark:shadow-none flex flex-col transition-all hover:shadow-md cursor-default">
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
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <img src={logoUrl} alt="Yes bike service Logo" className="w-9 h-9 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-black text-yellow-500 leading-none">
              Yes <span className="text-gray-900 dark:text-white">bike service</span>
            </button>
          </div>
          <p className="text-gray-500 dark:text-[#bdbdbd] text-[14px]">Professional doorstep two-wheeler repair service.</p>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out Yes bike service for doorstep two-wheeler repairs! ' + window.location.href)}`, '_blank') }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 transition-colors text-sm font-bold">
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
          <p className="text-gray-400 dark:text-[#bdbdbd] text-[14px] mt-2.5">© 2026 Yes bike service. All Rights Reserved.</p>
        </div>
      </footer>

      {heroSuccess && (
        <BookingTrackerModal onClose={() => setHeroSuccess(false)} />
      )}
      {/* QUICK CONTACT MINI-BAR */}
      <div className="fixed right-5 bottom-5 flex flex-col sm:flex-row items-end sm:items-center gap-3 z-50">
        
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-white dark:bg-[#1d1d1d] shadow-[0_5px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_25px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-[#303030] p-2 rounded-full sm:px-4 backdrop-blur-sm animate-in fade-in slide-in-from-right-10 duration-500">
          <a href="tel:+917090400617" aria-label="Call Us" className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-black shadow-md transition-colors">
            <Phone className="w-[18px] h-[18px]" />
          </a>
          
        </div>
        <a
          href="https://wa.me/917090400617?text=Hi,%20I%20want%20to%20know%20if%20a%20specific%20spare%20part%20is%20available%20for%20my%20bike."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 rounded-full shadow-[0_5px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_25px_rgba(0,0,0,0.5)] border border-gray-800 dark:border-gray-200 hover:scale-105 transition-transform font-bold text-sm shrink-0"
        >
          <MessageCircle className="w-5 h-5" />
          Message Support
        </a>
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

            {/* PACKAGE BOOKING MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151515] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-[#2a2a2a]">
              <div className="w-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Service</h3>
                <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold mb-2">Book in 30 Seconds.</p>
                {selectedPackage && (
                  <p className="text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-[#222] inline-block px-3 py-1.5 rounded-lg mb-3">
                    {selectedPackage.name} - <span className="text-yellow-600 dark:text-yellow-500">{selectedPackage.price}</span>
                  </p>
                )}
                <div className="space-y-1.5 bg-gray-50 dark:bg-[#101010] p-2.5 rounded-xl border border-gray-100 dark:border-[#333]">
                  <div className="flex items-start gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5 w-3 shrink-0">✓</span> 
                    <span>Certified mechanic at your doorstep in 30 minutes.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5 w-3 shrink-0">✓</span> 
                    <span>Services starting from ₹399.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5 w-3 shrink-0">✓</span> 
                    <span>30-day service warranty for complete peace of mind.</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsPackageModalOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors self-start">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const brand = formData.get('brand');
              const model = formData.get('model');
              const location = formData.get('location');
              const time = formData.get('time');
              const vehicleType = formData.get('vehicleType');
              
              const pkgName = selectedPackage ? selectedPackage.name : 'Unknown Package';
              const pkgPrice = selectedPackage ? selectedPackage.price : '';
              
              const message = `🏍️🛵PACKAGE BOOKING\n\n*Package:* ${pkgName} (${pkgPrice})\n\n👤 Name: ${fullName}\n📞 Phone: ${phone}\n📍 Location: ${location}\n🏍️ Vehicle: ${brand} ${model} (${vehicleType})\n⏰ Time Slot: ${time}\n\n✅ Please confirm my booking!`;
              
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              
              window.open(whatsappUrl, '_blank');
              
              setPackageSuccess(true); 
              setTimeout(() => {setPackageSuccess(false); setIsPackageModalOpen(false);}, 3000); 
            }} className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-lg border border-gray-200 dark:border-[#303030]">
                  <label className="flex-1 text-center cursor-pointer">
                    <input type="radio" name="vehicleType" value="Bike" defaultChecked className="peer sr-only" />
                    <div className="py-2 text-sm font-bold rounded-md transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-sm">
                      Bike
                    </div>
                  </label>
                  <label className="flex-1 text-center cursor-pointer">
                    <input type="radio" name="vehicleType" value="Scooter" className="peer sr-only" />
                    <div className="py-2 text-sm font-bold rounded-md transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-sm">
                      Scooter
                    </div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input type="text" name="fullName" required placeholder="John Doe" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Mobile Number *</label>
                <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit number" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Location / Address *</label>
                <input type="text" name="location" required placeholder="Full address or area..." className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Brand *</label>
                  <input type="text" name="brand" required placeholder="e.g. Honda" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Model *</label>
                  <input type="text" name="model" required placeholder="e.g. Activa 6G" className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Time *</label>
                <select name="time" required className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm appearance-none cursor-pointer">
                  <option value="">Preferred time slot...</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                </select>
              </div>
              
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-bold transition-colors mt-2 flex items-center justify-center gap-2 shadow-md">
                Book Package on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
      
      {packageSuccess && <Toast message="Package booked! We'll contact you shortly." onClose={() => setPackageSuccess(false)} />}

    </div>
  );
}
