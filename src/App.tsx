import React, { useState, useEffect } from 'react';
import { 
  Menu, Wrench, Users, Clock, Shield, Star, CheckCircle2, ChevronDown, MapPin, 
  Phone, User, Smartphone, X, ArrowRight, Sun, Moon,
  Zap, Award, ThumbsUp, PenTool, Mail
} from 'lucide-react';
import logoUrl from './assets/images/yes_bike_service_logo_1788515679582.jpg';
import coverageMapUrl from './assets/images/coverage_map_illustration_1787573120801.jpg';

// Reusable FadeIn Component
export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-[100]">
      <CheckCircle2 className="w-5 h-5 text-green-400" />
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
};

export default function App() {
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{name: string, price: string} | null>(null);
  const [detailsModalContent, setDetailsModalContent] = useState<{name: string, details: string[]} | null>(null);

  const packageDetailsData = {
    'General Bike Service': [
      'Initial inspection of bike condition',
      'Carburettor tuning and setting',
      'Spark plug gap setting and cleaning',
      'Chain tension adjustment and lubrication',
      'Clutch play setting',
      'Brake shoe cleaning and sanding',
      'Electrical system check (lights, horn, indicators)',
      'Dry wash and exterior polishing'
    ],
    'General Service + Engine Oil': [
      'Draining old engine oil',
      'Replacing oil filter (if applicable)',
      'Flushing engine (if needed)',
      'Pouring fresh semi-synthetic engine oil',
      'Checking oil seals for leakage',
      'Initial inspection of bike condition',
      'Carburettor tuning and setting',
      'Spark plug gap setting and cleaning',
      'Chain tension adjustment and lubrication',
      'Clutch play setting',
      'Brake shoe cleaning and sanding',
      'Electrical system check',
      'Dry wash and exterior polishing'
    ],
    'Jump Start Service': [
      'Battery voltage diagnostic check',
      'Connecting portable jump starter pack',
      'Starting engine safely',
      'Alternator output check to ensure charging'
    ],
    'Puncture Repair': [
      'Locating the puncture site',
      'Removing foreign objects (nails, glass)',
      'Inserting high-quality puncture plug',
      'Trimming excess plug material',
      'Checking overall tire pressure'
    ],
    'Battery Replacement': [
      'Battery voltage and health diagnostic check',
      'Safe removal of the old battery',
      'Installation of genuine Exide/Amaron battery',
      'Terminal greasing to prevent corrosion',
      'Electrical system check to ensure proper charging'
    ]
  };

  const [packageSuccess, setPackageSuccess] = useState(false);
  const [heroVehicle, setHeroVehicle] = useState("Bike");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "thank-you" | "about" | "terms" | "privacy">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);
  
  const [locationSearch, setLocationSearch] = useState('');
  const [activeLocation, setActiveLocation] = useState('Indiranagar');
  
  useEffect(() => {
    const locations = ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Jayanagar'];
    const interval = setInterval(() => {
      setActiveLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    { question: "1. What is doorstep bike service?", answer: "A trained mechanic comes to your home, office, or preferred location to inspect, service, or repair your two-wheeler." },
    { question: "2. Which brands do you service?", answer: "We service most popular motorcycles and scooters, including Hero, Honda, TVS, Bajaj, Yamaha, Suzuki, Royal Enfield, and KTM." },
    { question: "3. How do I book a mechanic?", answer: "Select your service, provide your details, and book online. We will call to confirm." },
    { question: "4. Do I need to provide tools?", answer: "No, our mechanics carry all necessary tools and genuine spare parts." },
    { question: "5. How long does a service take?", answer: "A standard general service usually takes about 60 to 90 minutes." }
  ];

  const testimonials = [
    {
      name: "Rahul M.",
      role: "Royal Enfield Owner",
      text: "Absolutely brilliant service. The mechanic arrived on time and fixed my Classic 350's engine issue right in my parking lot. Very transparent pricing.",
      rating: 5,
      initials: "RM",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      name: "Sneha K.",
      role: "Honda Activa Rider",
      text: "So convenient! Didn't have to spend my weekend at the garage. The general service was quick, and my scooter feels as good as new.",
      rating: 5,
      initials: "SK",
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
    },
    {
      name: "Vikram S.",
      role: "KTM Duke Owner",
      text: "I was stuck with a dead battery in the middle of nowhere. Booked the jump start service, and they reached me in 15 mins. Lifesavers!",
      rating: 5,
      initials: "VS",
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
            {/* HEADER - Premium Glassmorphism */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0A0A0A]/80 border-b border-gray-100 dark:border-white/10 shadow-sm backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setCurrentView('home'); window.scrollTo(0,0); setIsMobileMenuOpen(false); }}>
            <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"><Wrench className="w-6 h-6 text-black" /></div>
            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">Yes Bike <span className="text-yellow-500">Service</span></span>
          </div>
          
          <nav className="hidden lg:flex gap-8 items-center">
            <a href="#services" className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Services</a>
            
            <a href="#faq" className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400 focus:ring-2 focus:ring-yellow-500/50 outline-none"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden md:flex items-center gap-3">
              <a href="tel:+917090400617" className="inline-flex bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white px-5 py-2 rounded-xl font-bold text-sm transition-all items-center gap-2">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20would%20like%20to%20book%20a%20mechanic." target="_blank" rel="noopener noreferrer" className="inline-flex bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-95">
                Book Now
              </a>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-white/5 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col p-5 gap-4">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white py-2 border-b border-gray-100 dark:border-white/5">Services</a>
              
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 dark:text-white py-2 border-b border-gray-100 dark:border-white/5">FAQ</a>
              <a href="tel:+917090400617" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold text-[16px] shadow-md">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20would%20like%20to%20book%20a%20mechanic." target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 text-center bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold text-[16px] shadow-md">
                Book Mechanic Now
              </a>
            </div>
          </div>
        )}
      </header>

      {currentView === "home" && (
        <main>
          
          {/* HERO SECTION */}
          <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-[#0A0A0A] dark:to-[#050505] -z-20"></div>
            <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.15),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.08),transparent_50%)] -z-10"></div>
            
            <div className="max-w-7xl mx-auto px-5">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full">
                
                
                                                {/* Hero Text */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                  <FadeIn>
                    <h1 className="text-4xl sm:text-[52px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-4">
                      Bengaluru's <br className="block sm:hidden lg:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Doorstep Bike Repair</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-medium max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                      Excellent two-wheeler servicing right at your home or office.
                    </p>

                  </FadeIn>
                  

                </div>
                                {/* Hero Form */}
                <div id="booking-form" className="relative z-10 w-full max-w-[300px] mx-auto lg:ml-auto">
                  <FadeIn delay={300}>
                    {/* Decorative blurred background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent blur-3xl -z-10 rounded-2xl"></div>
                    <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400/10 rounded-bl-[60px] -z-10"></div>
                      <div className="text-center mb-3">
                        <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-1 leading-tight">
                          Book Mechanic Now
                        </h3>
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">Mechanic reaches in <span className="text-yellow-600 dark:text-yellow-500">20 mins</span>.</p>
                        <div className="bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[11px] font-bold px-3 py-1.5 rounded-lg inline-block border border-green-100 dark:border-green-500/20">
                          Honest pricing with services starting from ₹399
                        </div>
                      </div>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const message = `🏍️🛵 NEW BOOKING\n\n👤 Name: ${formData.get('fullName')}\n📞 Phone: ${formData.get('phone')}\n📍 Location: ${formData.get('location')}\n🏍️ Vehicle Type: ${heroVehicle}\n🔧 Service: ${formData.get('service')}\n📅 Date: ${formData.get('date')}\n⏰ Time: ${formData.get('time')}\n\n✅ Please confirm my booking!`;
                        window.open(`https://wa.me/917090400617?text=${encodeURIComponent(message)}`, '_blank');
                        
                        // Trigger Google Ads Conversion
                        if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
                          (window as any).gtag('event', 'conversion', {
                              'send_to': 'AW-18313979172/mupQCP_io-4cEKTK5JxE',
                              'value': 1.0,
                              'currency': 'INR'
                          });
                        }
                        
                        setCurrentView('thank-you');
                        window.scrollTo(0, 0);
                      }}>
                        
                        {/* Toggle */}
                        <div className="flex bg-gray-100/80 dark:bg-[#222] p-1 rounded-lg mb-3 border border-gray-200/50 dark:border-white/5">
                          <button type="button" onClick={() => setHeroVehicle('Bike')} className={`flex-1 py-1.5 rounded-md text-xs font-black transition-all ${heroVehicle === 'Bike' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}`}>
                            🏍️ Bike
                          </button>
                          <button type="button" onClick={() => setHeroVehicle('Scooter')} className={`flex-1 py-1.5 rounded-md text-xs font-black transition-all ${heroVehicle === 'Scooter' ? 'bg-white dark:bg-[#333] text-black dark:text-white shadow-sm scale-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 scale-95 hover:scale-100'}`}>
                            🛵 Scooter
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="relative group">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                              <User className="w-3 h-3" />
                            </div>
                            <input type="text" name="fullName" required placeholder="Full Name" className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium" />
                          </div>
                          
                          <div className="relative group">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                              <Smartphone className="w-3 h-3" />
                            </div>
                            <input type="tel" name="phone" required placeholder="Phone Number" className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium" />
                          </div>
                          
                          <div className="relative group">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                              <MapPin className="w-3 h-3" />
                            </div>
                            <input type="text" name="location" required placeholder="Service Location" className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400 placeholder:font-medium" />
                          </div>
                          
                          <div className="relative group">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-[#222] rounded-full flex items-center justify-center shadow-sm text-gray-400 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                              <Wrench className="w-3 h-3" />
                            </div>
                            <select name="service" required defaultValue="" className="w-full pl-8 pr-7 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm appearance-none cursor-pointer invalid:text-gray-400 invalid:font-medium">
                              <option value="" disabled hidden>Select Service Type</option>
                              <option value="General Bike Service (₹699)">🔧 Gen. Service - ₹699</option>
                              <option value="General Service + Engine Oil (₹1,249)">🛢️ Serv. + Oil - ₹1,249</option>
                              <option value="Jump Start Service (₹399)">⚡ Jump Start - ₹399</option>
                              <option value="Puncture Repair (₹599)">🔘 Puncture - ₹599</option>
                              <option value="Battery Replacement (₹1,499)">🔋 Battery - ₹1,499</option>
                              <option value="Other / Custom Issue">📋 Other Issue</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="relative group flex-1">
                                <input type="date" name="date" required className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400" />
                            </div>
                            <div className="relative group flex-1">
                                <input type="time" name="time" required className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white dark:focus:bg-[#222] transition-all font-semibold text-xs sm:text-sm placeholder:text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-black text-[14px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.25)] flex justify-center items-center gap-1.5 group">
                            Book Mechanic Now 
                            <div className="w-4 h-4 bg-white/30 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                              <ArrowRight className="w-2.5 h-2.5" />
                            </div>
                          </button>
                          <p className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" /> No advance payment
                          </p>
                        </div>
                      </form>
                    </div>
                  </FadeIn>

                </div>

              </div>
              
              <FadeIn delay={400}>
                <div className="mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-center bg-white dark:bg-[#111] py-6 px-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    4.8/5 Customer Rating
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                    10,000+ Vehicles Serviced
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <Shield className="w-5 h-5 text-yellow-500" />
                    Verified Mechanics
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          
          {/* HOW IT WORKS */}
          <section className="py-24 bg-white dark:bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="text-center mb-16">
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">How It <span className="text-yellow-500">Works</span></h2>
                  <p className="text-gray-500 max-w-2xl mx-auto font-medium">Get your bike fixed in three simple steps without stepping out of your home.</p>
                </FadeIn>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0 z-0"></div>
                
                <FadeIn delay={100} className="relative z-10 flex">
                  <div className="bg-[#FAFAFA] dark:bg-[#111] p-8 rounded-3xl text-center w-full border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-20 h-20 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-yellow-500/20 group-hover:border-yellow-500 transition-colors">
                      <Smartphone className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">1. Book Online</h3>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed">Select your service, choose a time slot, and provide your location in under 60 seconds.</p>
                  </div>
                </FadeIn>

                <FadeIn delay={200} className="relative z-10 flex">
                  <div className="bg-[#FAFAFA] dark:bg-[#111] p-8 rounded-3xl text-center w-full border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-20 h-20 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-yellow-500/20 group-hover:border-yellow-500 transition-colors">
                      <Wrench className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">2. Mechanic Arrives</h3>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed">Our verified expert mechanic reaches your location fully equipped within 30 minutes.</p>
                  </div>
                </FadeIn>

                <FadeIn delay={300} className="relative z-10 flex">
                  <div className="bg-[#FAFAFA] dark:bg-[#111] p-8 rounded-3xl text-center w-full border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-20 h-20 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-green-500/20 group-hover:border-green-500 transition-colors">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">3. Ride Happy</h3>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed">Review the service, pay via cash or UPI, and get back on the road with complete peace of mind.</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* POPULAR PACKAGES */}
          <section id="services" className="pt-32 pb-24 bg-white dark:bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-5">
              <div className="text-center mb-16">
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Our Popular <span className="text-yellow-500">Packages</span></h2>
                  <p className="text-gray-500 max-w-2xl mx-auto font-medium">No hidden costs. Just honest, upfront pricing for all services.</p>
                </FadeIn>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 max-w-6xl mx-auto">
                {/* General Service */}
                <FadeIn delay={100} className="flex">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-[32px] p-6 sm:p-8 flex flex-col w-full hover:border-yellow-500/30 transition-all shadow-sm hover:shadow-xl relative">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">General Bike Service</h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹699</div>
                        <div className="text-lg font-bold text-gray-400 line-through mb-1">₹899</div>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-sm font-black bg-green-50 dark:bg-green-500/10 inline-block px-4 py-1.5 rounded-lg mb-6 tracking-wide uppercase">Offer Price: ₹699</p>
                      
                      <div className="space-y-2.5 mb-6 bg-gray-50 dark:bg-[#1A1A1A] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">🏠</div> 
                          Available at Your Doorstep
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">🛡️</div> 
                          500 Kms or 1 Month Warranty
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">🔧</div> 
                          Recommended Every 3,000 Kms or 3 Months
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">⏱️</div> 
                          Service Time: 2 Hours
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-2">
                      <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Service Includes:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                        {['Air Filter Cleaning', 'Battery Voltage Check', 'Brake Service', 'Cables & Levers Adj.', 'Chain Tension Check', 'Clutch Greasing', 'Dry Wash', 'Electrical Check-up', 'Engine Oil Check', 'Greasing & Lube', 'Oil Leakage Check', 'Spark Plug Cleaning'].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-gray-600 dark:text-gray-400"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}</li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => { setSelectedPackage({name: 'General Bike Service', price: '₹699'}); setIsPackageModalOpen(true); }} className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2">
                          Book Now <ArrowRight className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDetailsModalContent({name: 'General Bike Service', details: packageDetailsData['General Bike Service']})} className="flex-1 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white py-4 rounded-xl font-black transition-all text-sm flex justify-center items-center">
                          View Technical Details
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Engine Oil Combo (Bestseller) */}
                <FadeIn delay={200} className="flex">
                  <div className="bg-gray-900 dark:bg-[#161616] border border-yellow-500/50 rounded-[32px] p-6 sm:p-8 flex flex-col w-full relative shadow-[0_10px_40px_rgba(234,179,8,0.15)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full blur-2xl"></div>
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-1.5 rounded-b-xl text-[11px] font-black uppercase tracking-widest shadow-md z-10">
                      Most Popular
                    </div>
                    
                    <div className="mb-6 pt-4 relative z-10">
                      <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">🏍️ General Service + Engine Oil</h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-4xl font-black text-yellow-400 tracking-tight">₹1,249</div>
                        <div className="text-lg font-bold text-gray-500 line-through mb-1">₹1,500</div>
                      </div>
                      <p className="text-gray-300 text-sm font-semibold mb-6">Professional doorstep bike service with engine oil change.</p>
                      
                      <div className="space-y-2.5 mb-6 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-4 text-sm font-bold text-white">
                          <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shadow-sm text-base">✓</div> 
                          Available at Your Doorstep
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-white">
                          <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shadow-sm text-base">✓</div> 
                          500 Kms or 1 Month Warranty
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-white">
                          <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shadow-sm text-base">✓</div> 
                          Recommended Every 3,000 Kms or 3 Months
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-white">
                          <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shadow-sm text-base">✓</div> 
                          Service Time: Approx. 2 Hours
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-2 relative z-10">
                      <h4 className="text-sm font-black text-white mb-4 uppercase tracking-wider">Service Includes:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                        {['Air Filter Cleaning', 'Battery Voltage Check', 'Brake Service', 'Cables & Levers Adj.', 'Chain Tension Check', 'Clutch Greasing', 'Dry Wash', 'Electrical Check-up', 'Engine Oil Change', 'Greasing & Lube', 'Oil Leakage Check', 'Spark Plug Cleaning'].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-gray-300"><CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" /> {item}</li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => { setSelectedPackage({name: 'General Service + Engine Oil', price: '₹1,249'}); setIsPackageModalOpen(true); }} className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black py-4 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(234,179,8,0.4)] flex justify-center items-center gap-2">
                          Book Now <ArrowRight className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDetailsModalContent({name: 'General Service + Engine Oil', details: packageDetailsData['General Service + Engine Oil']})} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-black transition-all text-sm flex justify-center items-center backdrop-blur-sm">
                          View Technical Details
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Jump Start */}
                <FadeIn delay={300} className="flex">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-[32px] p-6 sm:p-8 flex flex-col w-full hover:border-yellow-500/30 transition-all shadow-sm hover:shadow-xl relative">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">⚡ Jump Start Service</h3>
                      <div className="flex items-end gap-3 mb-4">
                        <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹399</div>
                        <div className="text-lg font-bold text-gray-400 line-through mb-1">₹600</div>
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-sm font-black bg-green-50 dark:bg-green-500/10 inline-block px-4 py-1.5 rounded-lg mb-6 tracking-wide uppercase">Special Price: ₹399</p>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-6">Get your bike started quickly with our doorstep jump-start service. No workshop visit, no waiting.</p>
                      
                      <div className="space-y-2.5 mb-6 bg-gray-50 dark:bg-[#1A1A1A] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">🏠</div> 
                          Available at Your Doorstep
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shadow-sm text-base">⏱️</div> 
                          20 Minutes Approx.
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                      <button onClick={() => { setSelectedPackage({name: 'Jump Start Service', price: '₹399'}); setIsPackageModalOpen(true); }} className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailsModalContent({name: 'Jump Start Service', details: packageDetailsData['Jump Start Service']})} className="flex-1 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white py-4 rounded-xl font-black transition-all text-sm flex justify-center items-center">
                        View Technical Details
                      </button>
                    </div>
                  </div>
                </FadeIn>

                {/* Puncture Repair */}
                <FadeIn delay={400} className="flex">
                  <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-[32px] p-6 sm:p-8 flex flex-col w-full hover:border-yellow-500/30 transition-all shadow-sm hover:shadow-xl relative">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">🛞 Puncture Repair</h3>
                      <div className="flex items-end gap-3 mb-6">
                        <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹599</div>
                        <div className="text-lg font-bold text-gray-400 line-through mb-1">₹750</div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-[#1A1A1A] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Service Includes:</h4>
                        <div className="space-y-4 mb-4">
                          <div className="flex items-center gap-3 text-[13px] font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Available at Your Doorstep</div>
                          <div className="flex items-center gap-3 text-[13px] font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Takes only 20 minutes</div>
                          <div className="flex items-center gap-3 text-[13px] font-bold text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> One Tyre Puncture Repair</div>
                        </div>
                        
                        <div className="bg-yellow-50 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-500 text-[13px] font-bold px-4 py-3 rounded-xl flex items-start gap-2 border border-yellow-200/50 dark:border-yellow-500/20">
                          <span className="text-lg leading-none">+</span>
                          <span>₹100 extra for each additional puncture</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                      <button onClick={() => { setSelectedPackage({name: 'Puncture Repair', price: '₹599'}); setIsPackageModalOpen(true); }} className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2">
                        Book Now <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDetailsModalContent({name: 'Puncture Repair', details: packageDetailsData['Puncture Repair']})} className="flex-1 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white py-4 rounded-xl font-black transition-all text-sm flex justify-center items-center">
                        View Technical Details
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <div className="mt-16 text-center">
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Need a custom repair or have something else in mind?</p>
                <button onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 hover:border-yellow-500 text-gray-900 dark:text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md">
                  Request Custom Service
                </button>
              </div>
            </div>
            </section>

          {/* BRANDS & COVERAGE */}
          <section id="areas" className="py-24 bg-[#FAFAFA] dark:bg-[#050505] border-y border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-5">
              <FadeIn>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Brands We <span className="text-yellow-500">Service</span></h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24 max-w-5xl mx-auto">
                  {[
                    { name: 'Hero', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-100 dark:border-red-500/20' },
                    { name: 'Honda', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-600/10', border: 'border-red-100 dark:border-red-600/20' },
                    { name: 'TVS', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-600/10', border: 'border-blue-100 dark:border-blue-600/20' },
                    { name: 'Bajaj', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-500/20' },
                    { name: 'Yamaha', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-600/10', border: 'border-red-100 dark:border-red-600/20' },
                    { name: 'Suzuki', color: 'text-blue-700', bg: 'bg-blue-50 dark:bg-blue-700/10', border: 'border-blue-100 dark:border-blue-700/20' },
                    { name: 'Royal Enfield', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20' },
                    { name: 'KTM', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', border: 'border-orange-100 dark:border-orange-500/20' }
                  ].map((brand, idx) => (
                    <div key={idx} className="group bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-xl hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${brand.bg}`}></div>
                      </div>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${brand.bg} ${brand.border} border ${brand.color} font-black text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 relative z-10 shadow-sm`}>
                        {brand.name === 'KTM' ? 'KTM' : brand.name === 'TVS' ? 'TVS' : brand.name.split(' ').length > 1 ? brand.name.split(' ').map(n=>n[0]).join('') : brand.name.substring(0, 1)}
                      </div>
                      <span className="font-black text-gray-800 dark:text-gray-200 text-sm sm:text-[15px] uppercase tracking-wider relative z-10">{brand.name}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-[#0A0A0A] rounded-[32px] p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-xl">
                  <div>
                    <h2 className="text-3xl font-black mb-6 leading-tight text-gray-900 dark:text-white tracking-tight">
                      Covering all major zones in <span className="text-yellow-500">Bengaluru</span>
                    </h2>
                    <p className="text-gray-500 mb-8 text-lg font-medium leading-relaxed">
                      Our extensive network of verified mechanics ensures we reach your location within 30 minutes, wherever you are in the city.
                    </p>
                    <div className="grid grid-cols-2 gap-y-4 text-sm font-bold text-gray-800 dark:text-gray-200">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-500" /> Indiranagar</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-500" /> Koramangala</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-500" /> HSR Layout</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-yellow-500" /> Whitefield</div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                    <img src={coverageMapUrl} alt="Bengaluru Coverage Map" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1.5 rounded-lg font-bold text-xs shadow-md">
                      Live Tracking Available
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          
          {/* FAQ SECTION */}
          
          {/* TESTIMONIALS */}
          <section className="py-24 bg-[#FAFAFA] dark:bg-[#050505] border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-5">
              <div className="text-center mb-16">
                <FadeIn>
                  <span className="text-yellow-500 font-bold tracking-wider uppercase text-sm mb-3 block">Customer Reviews</span>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    Loved by Riders. <span className="text-yellow-500">Trusted by Drivers.</span>
                  </h2>
                  <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                    Real experiences from customers who chose expert doorstep service, transparent pricing, and zero workshop hassle.
                  </p>
                </FadeIn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, idx) => (
                  <FadeIn delay={100 + (idx * 100)} key={idx}>
                    <div className="bg-white dark:bg-[#111] p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md hover:border-yellow-500/30 transition-all h-full flex flex-col">
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-8 flex-grow text-lg leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.color}`}>
                          {testimonial.initials}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                          <div className="text-sm font-medium text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-white dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-white/5" id="faq">
            <div className="max-w-4xl mx-auto px-5">
              <div className="text-center mb-16">
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    Frequently Asked <span className="text-yellow-500">Questions</span>
                  </h2>
                  <p className="text-gray-500 font-medium">Everything you need to know about our doorstep service.</p>
                </FadeIn>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <FadeIn delay={100 + (idx * 50)} key={idx}>
                    <div className="bg-[#FAFAFA] dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-[24px] overflow-hidden shadow-sm transition-all hover:border-yellow-500/30">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left px-6 sm:px-8 py-6 flex items-center justify-between focus:outline-none"
                      >
                        <span className="font-bold text-gray-900 dark:text-white sm:text-lg pr-4">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-yellow-500' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 sm:px-8 pb-6 pt-1 text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="py-24 px-5 text-center bg-[#FAFAFA] dark:bg-[#050505] border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
            <FadeIn>
              <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">Ready for a smooth ride?</h2>
                <p className="text-xl mb-10 text-gray-600 dark:text-gray-400 font-medium">Book a mechanic now and experience premium doorstep service.</p>
                <a href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20would%20like%20to%20book%20a%20mechanic." target="_blank" rel="noopener noreferrer" className="inline-flex bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-black text-lg transition-all shadow-[0_4px_14px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-95 items-center gap-3">
                  Book Now <ArrowRight className="w-6 h-6" />
                </a>
              </div>
            </FadeIn>
          </section>
        
          {/* STICKY MOBILE CTA */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-t border-gray-200 dark:border-white/10 md:hidden z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <button 
              onClick={() => { document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'}) }} 
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-black text-[15px] transition-all flex justify-center items-center gap-2 shadow-[0_4px_14px_rgba(234,179,8,0.3)] active:scale-[0.98]"
            >
              Book Mechanic Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
</main>
      )}
{currentView === "thank-you" && (
        <main className="pt-32 pb-32 px-5 min-h-[80vh] flex items-center justify-center">
          <div className="max-w-md w-full bg-white dark:bg-[#111] p-8 rounded-[32px] text-center border border-gray-100 dark:border-white/5 shadow-2xl">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Booking Received!</h2>
            <p className="text-gray-500 font-medium mb-8">
              We have received your service request. Our team will contact you shortly to confirm the appointment.
            </p>
            <button 
              onClick={() => setCurrentView('home')} 
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl font-bold transition-all shadow-md"
            >
              Back to Home
            </button>
          </div>
        </main>
      )}
      {currentView === "about" && (
        <main className="pt-32 pb-32 px-5 min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
          <div className="max-w-3xl w-full bg-white dark:bg-[#111] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl text-left">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">About Us</h1>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              <p>Welcome to Yes Bike Service, India's premium doorstep two-wheeler service provider. We were founded with a simple mission: to make bike maintenance simple, transparent, and hassle-free for everyone.</p>
              <p>Our network of highly trained and verified mechanics is spread across the city, allowing us to reach you within minutes, whether you're at home, at work, or stranded on the road.</p>
              <p>We pride ourselves on using only genuine parts, offering honest, upfront pricing, and ensuring that your beloved two-wheeler gets the highest quality care possible.</p>
            </div>
            <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="mt-8 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold transition-all">
              Back to Home
            </button>
          </div>
        </main>
      )}
      
      {currentView === "terms" && (
        <main className="pt-32 pb-32 px-5 min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
          <div className="max-w-3xl w-full bg-white dark:bg-[#111] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl text-left">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">Terms & Conditions</h1>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
              <p><strong>1. Acceptance of Terms:</strong> By using our services, you agree to be bound by these terms.</p>
              <p><strong>2. Service Delivery:</strong> While we strive to reach you within the stated time frame, traffic and weather conditions may cause delays. We will keep you updated.</p>
              <p><strong>3. Payment:</strong> No advance payment is required for standard bookings. Payment is due upon completion of the service.</p>
              <p><strong>4. Warranty:</strong> We offer a 500 kms or 1-month warranty on our service (excluding third-party parts where the manufacturer's warranty applies).</p>
              <p><strong>5. Liability:</strong> We are not liable for pre-existing damages to the vehicle. Customers are advised to declare known issues before service begins.</p>
            </div>
            <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="mt-8 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold transition-all">
              Back to Home
            </button>
          </div>
        </main>
      )}

      {currentView === "privacy" && (
        <main className="pt-32 pb-32 px-5 min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
          <div className="max-w-3xl w-full bg-white dark:bg-[#111] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl text-left">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
              <p><strong>1. Information Collection:</strong> We collect information necessary to provide our services, such as your name, phone number, and location.</p>
              <p><strong>2. Use of Information:</strong> Your details are used solely to schedule services, dispatch mechanics, and communicate with you regarding your booking.</p>
              <p><strong>3. Data Security:</strong> We implement appropriate security measures to protect your personal information against unauthorized access.</p>
              <p><strong>4. Third Parties:</strong> We do not sell, trade, or rent your personal identification information to others.</p>
              <p><strong>5. Consent:</strong> By submitting the booking form, you consent to our collection and use of your information as outlined in this policy.</p>
            </div>
            <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="mt-8 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold transition-all">
              Back to Home
            </button>
          </div>
        </main>
      )}
  

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-32 md:pb-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-sm"><Wrench className="w-6 h-6 text-black" /></div>
              <span className="text-2xl font-black tracking-tight">Yes Bike <span className="text-yellow-500">Service</span></span>
            </div>
            <p className="text-gray-400 font-medium max-w-sm">India's premium doorstep two-wheeler service. Making bike maintenance simple, transparent, and hassle-free.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2.5 text-gray-400 font-medium text-sm">
              <li>General Service</li>
              <li>Engine Oil Change</li>
              <li>Puncture Repair</li>
              <li>Jump Start</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Available Areas</h4>
            <ul className="space-y-2.5 text-gray-400 font-medium text-sm">
              <li><button onClick={() => { document.getElementById('areas')?.scrollIntoView({behavior: 'smooth'}) }} className="hover:text-yellow-500 transition-colors">Koramangala</button></li>
              <li><button onClick={() => { document.getElementById('areas')?.scrollIntoView({behavior: 'smooth'}) }} className="hover:text-yellow-500 transition-colors">Indiranagar</button></li>
              <li><button onClick={() => { document.getElementById('areas')?.scrollIntoView({behavior: 'smooth'}) }} className="hover:text-yellow-500 transition-colors">HSR Layout</button></li>
              <li><button onClick={() => { document.getElementById('areas')?.scrollIntoView({behavior: 'smooth'}) }} className="hover:text-yellow-500 transition-colors">Whitefield</button></li>
              <li><button onClick={() => { document.getElementById('areas')?.scrollIntoView({behavior: 'smooth'}) }} className="hover:text-yellow-500 transition-colors">Jayanagar</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2.5 text-gray-400 font-medium text-sm">
              <li><button onClick={() => { setCurrentView('about'); window.scrollTo(0,0); }} className="hover:text-yellow-500 transition-colors">About Us</button></li>
              <li><button onClick={() => { setCurrentView('terms'); window.scrollTo(0,0); }} className="hover:text-yellow-500 transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => { setCurrentView('privacy'); window.scrollTo(0,0); }} className="hover:text-yellow-500 transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2.5 text-gray-400 font-medium text-sm">
              <li className="flex items-center gap-3">
                <a href="tel:+917090400617" className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1.5 rounded-lg transition-colors font-bold">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Call +91 7090400617</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-500 shrink-0" />
                <span>support@yesbikeservice.in</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-yellow-500 shrink-0" />
                <span>Bengaluru, Karnataka</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()} Yes Bike Service. All rights reserved.
        </div>
      </footer>

      
      {/* DETAILS MODAL */}
      {detailsModalContent && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDetailsModalContent(null)}></div>
          <div className="bg-white dark:bg-[#111] w-full max-w-md rounded-[32px] p-6 sm:p-8 relative z-10 shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Technical Details</h3>
                <div className="inline-block bg-gray-100 dark:bg-white/5 rounded-lg px-3 py-1.5 mt-2">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{detailsModalContent.name}</span>
                </div>
              </div>
              <button onClick={() => setDetailsModalContent(null)} className="bg-gray-100 dark:bg-white/5 p-2 rounded-full text-gray-500 hover:text-black dark:hover:text-white transition-colors shrink-0 ml-4">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 sticky top-0 bg-white dark:bg-[#111] pt-2 pb-2">Step-by-step procedure:</h4>
              <ul className="space-y-2.5">
                {detailsModalContent.details.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 items-start">
                    <span className="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-500 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs mt-0.5">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            
            <button onClick={() => setDetailsModalContent(null)} className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white px-4 py-4 rounded-xl font-bold text-[16px] transition-all mt-6">
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* PACKAGE MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPackageModalOpen(false)}></div>
          <div className="bg-white dark:bg-[#111] w-full max-w-md rounded-[32px] p-6 sm:p-8 relative z-10 shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Book Package</h3>
                {selectedPackage && (
                  <div className="inline-block bg-yellow-50 dark:bg-yellow-500/10 rounded-lg px-3 py-1.5 mt-2">
                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-500">{selectedPackage.name}</span>
                    <span className="mx-2 text-yellow-300">|</span>
                    <span className="text-sm font-black text-yellow-600 dark:text-yellow-500">{selectedPackage.price}</span>
                  </div>
                )}
              </div>
              <button onClick={() => setIsPackageModalOpen(false)} className="bg-gray-100 dark:bg-white/5 p-2 rounded-full text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            
            <div className="mt-8 space-y-4">
              <a 
                href={`https://wa.me/917090400617?text=${encodeURIComponent("Hi Yes Bike Service, I would like to book the " + selectedPackage?.name + " (" + selectedPackage?.price + ").")}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-4 rounded-xl font-black text-[16px] transition-all hover:scale-[1.02] shadow-xl flex justify-center items-center gap-2"
              >
                Book via WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
            </div>

          </div>
        </div>
      )}

            {/* WHATSAPP FAB */}
      <a 
        href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20have%20a%20query%20regarding..." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
