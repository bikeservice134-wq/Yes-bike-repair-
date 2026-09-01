import React, { useState, useEffect } from 'react';
import { 
  Wrench, Clock, Shield, Star, CheckCircle2, ChevronDown, ChevronUp, MapPin, 
  Phone, User, Smartphone, Settings, Bike, X, ArrowRight, Instagram, Facebook, Twitter, Sun, Moon, Map, MessageCircle
} from 'lucide-react';
import logoUrl from './assets/images/premium_bike_logo_1788163395781.jpg';
import coverageMapUrl from './assets/images/coverage_map_illustration_1787573120801.jpg';

// Reusable FadeIn Component
export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
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
    <div ref={domRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50">
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
  const [packageSuccess, setPackageSuccess] = useState(false);
  const [heroVehicle, setHeroVehicle] = useState("Bike");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "privacy" | "terms" | "booking-success">("home");
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
    { question: "1. What is doorstep bike service?", answer: "Doorstep bike service means a trained mechanic comes to your home, office, or preferred location to inspect, service, or repair your two-wheeler." },
    { question: "2. Which bikes do you service?", answer: "We service most popular motorcycles and scooters, including brands such as Hero, Honda, TVS, Bajaj, Yamaha, Suzuki, Royal Enfield, KTM, and others." },
    { question: "3. How do I book a bike mechanic?", answer: "You can book online by selecting your bike, service required, location, and preferred time. You can also contact us through WhatsApp." },
    { question: "4. Do I need to provide tools or spare parts?", answer: "No, our mechanics carry all necessary tools and genuine spare parts required for the service." },
    { question: "5. How long does a general service take?", answer: "A standard general service usually takes about 60 to 90 minutes depending on the bike's condition." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-[#0b0b0b]/95 border-b border-gray-200 dark:border-[#303030] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="Yes bike service Logo" className="w-10 h-10 rounded-xl object-cover ring-2 ring-yellow-500/20 shadow-md" referrerPolicy="no-referrer" />
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-black text-yellow-500 leading-none text-left">
              Yes <span className="text-gray-900 dark:text-white">bike service</span>
            </button>
          </div>
          <nav className="hidden lg:flex gap-6 items-center">
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Home</a>
            <a href="#pricing" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Pricing</a>
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Book Service</a>
          </nav>
          
          <button onClick={() => setIsDark(!isDark)} className="ml-auto lg:ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <a href="#home" className="hidden md:inline-flex bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full font-bold transition-all ml-4 shadow-[0_4px_14px_rgba(234,179,8,0.2)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.3)] hover:-translate-y-0.5">
            Book Now
          </a>
        </div>
      </header>

      {currentView === "home" ? (
        <main>
          {/* HERO SECTION */}
          <section id="home" className="min-h-[750px] flex items-center relative overflow-hidden pt-24 pb-16 bg-white dark:bg-[#0a0a0a]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-yellow-500/10 dark:bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <FadeIn>
              <div className="max-w-6xl w-full mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
                {/* LEFT */}
                <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 text-sm font-semibold mb-6 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Mechanic currently serving near {activeLocation}
                  </div>
                  <h1 className="text-[44px] md:text-[56px] lg:text-[72px] font-black text-gray-900 dark:text-white leading-[1.05] mb-6 tracking-tight">
                    Expert Bike Care. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-yellow-600">At Your Doorstep.</span>
                  </h1>
                  <div className="space-y-4 mb-10 text-gray-600 dark:text-[#bdbdbd] text-lg md:text-xl font-medium">
                    <p className="flex items-start gap-3 justify-center lg:justify-start">
                      <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" /> Certified mechanic at your doorstep in 20 minutes.
                    </p>
                    <p className="flex items-start gap-3 justify-center lg:justify-start">
                      <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" /> Services starting from ₹399.
                    </p>
                    <p className="flex items-start gap-3 justify-center lg:justify-start">
                      <CheckCircle2 className="w-6 h-6 text-yellow-500 shrink-0 mt-1" /> 30-day service warranty for complete peace of mind.
                    </p>
                  </div>
                </div>

                {/* RIGHT: SHORT FORM */}
                <div className="order-1 lg:order-2 bg-white/90 dark:bg-[#161616]/95 backdrop-blur-xl border border-gray-100 dark:border-[#2a2a2a] p-5 sm:p-6 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10 w-full mx-auto max-w-[400px] transition-transform hover:-translate-y-1 duration-500">
                  <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-1 text-center leading-tight">Book Mechanic Now <br/><span className="text-yellow-500 text-base md:text-lg">in 20 minutes.</span></h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center font-bold mb-4">Services starting from <span className="text-yellow-600 dark:text-yellow-500 text-sm">₹399.</span></p>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const fullName = formData.get('fullName');
                    const phone = formData.get('phone');
                    const service = formData.get('service');
                    const time = formData.get('time');
                    
                    const message = `🏍️🛵QUICK VEHICLE SERVICE BOOKING\n\n👤 Name: ${fullName}\n📞 Phone: ${phone}\n📍 Location: ${locationSearch}\n🏍️ Vehicle Type: ${heroVehicle}\n🛠️ Service: ${service}\n⏰ Time: ${time}\n\n✅ Please call me back to confirm the booking!`;
                    const whatsappNumber = "917090400617"; 
                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                    setCurrentView('booking-success');
                    window.scrollTo(0, 0);
                    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                      (window as any).gtag_report_conversion();
                    }
                  }}>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button type="button" onClick={() => setHeroVehicle('Bike')} className={`py-2 px-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${heroVehicle === 'Bike' ? 'bg-yellow-500 text-black shadow-[0_4px_12px_rgba(234,179,8,0.3)]' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333] hover:border-yellow-500/50'}`}>🏍️ Bike</button>
                      <button type="button" onClick={() => setHeroVehicle('Scooter')} className={`py-2 px-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${heroVehicle === 'Scooter' ? 'bg-yellow-500 text-black shadow-[0_4px_12px_rgba(234,179,8,0.3)]' : 'bg-gray-50 dark:bg-[#101010] text-gray-600 dark:text-[#bdbdbd] border border-gray-200 dark:border-[#333] hover:border-yellow-500/50'}`}>🛵 Scooter</button>
                    </div>
                    <div className="space-y-3">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                          <User className="h-4 w-4" />
                        </div>
                        <input type="text" name="fullName" required placeholder="Full Name *" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" />
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                          <Smartphone className="h-4 w-4" />
                        </div>
                        <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Mobile No *" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" />
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <input type="text" required placeholder="Service Location *" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Wrench className="h-4 w-4" />
                          </div>
                          <select name="service" required className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm appearance-none cursor-pointer">
                            <option value="">Choose a service...</option>
                            <option value="General Bike Service ₹699">General Bike Service ₹699</option>
                            <option value="General Service with Engine Oil ₹1,249">General Service with Engine Oil ₹1,249</option>
                            <option value="Jump Start Service ₹399">Jump Start Service ₹399</option>
                            <option value="Puncture Repair ₹599">Puncture Repair ₹599</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Clock className="h-4 w-4" />
                          </div>
                          <select name="time" required className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm appearance-none cursor-pointer">
                            <option value="">Preferred Time...</option>
                            <option value="As soon as possible">As soon as possible</option>
                            <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                            <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                            <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-4 py-3 rounded-xl font-bold text-[16px] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_20px_rgba(234,179,8,0.25)] flex justify-center items-center gap-2 mt-4">
                      Book Mechanic Now <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* WHY RIDERS CHOOSE US */}
          <section className="py-16 px-5 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-[36px] md:text-[40px] font-bold mb-3 leading-tight text-gray-900 dark:text-white">
                  Why Riders <span className="text-yellow-500 dark:text-yellow-400">Choose Us</span>
                </h2>
                <p className="text-gray-600 dark:text-[#bdbdbd] mb-12 text-lg font-medium">
                  Professional • Reliable • Doorstep Bike Service
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-[#161616] rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] transition-transform hover:-translate-y-1">
                    <div className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">12K+</div>
                    <div className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Happy Riders</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-[#161616] rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] transition-transform hover:-translate-y-1">
                    <div className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">4.9★</div>
                    <div className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Average Rating</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-[#161616] rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] transition-transform hover:-translate-y-1">
                    <div className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">20 Min</div>
                    <div className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Quick Response</div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-[#161616] rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] transition-transform hover:-translate-y-1">
                    <div className="text-4xl md:text-5xl font-black text-yellow-500 mb-2">100%</div>
                    <div className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Transparent Pricing</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* BRANDS WE SERVICE */}
          <section className="py-20 px-5 bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                    Brands We <span className="text-yellow-500 dark:text-yellow-400">Service</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-lg">We provide expert service for all major two-wheeler brands in India.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {['Hero', 'Honda', 'TVS', 'Bajaj', 'Yamaha', 'Suzuki', 'Royal Enfield', 'KTM'].map((brand, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#1a1a1a] px-6 py-4 rounded-2xl border border-gray-200 dark:border-[#333] shadow-sm font-bold text-gray-800 dark:text-gray-200 min-w-[140px] text-center hover:border-yellow-500 dark:hover:border-yellow-500 hover:shadow-md transition-all hover:-translate-y-1">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-20 px-5 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                    How Our Bike Service <span className="text-yellow-500 dark:text-yellow-400">Works</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-lg">3 simple steps to get your bike serviced effortlessly.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-50 dark:bg-[#161616] p-8 rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] relative overflow-hidden group">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <Smartphone className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">1. Book a Service</h3>
                    <p className="text-gray-600 dark:text-[#bdbdbd]">Share your bike details and preferred time via our short booking form.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#161616] p-8 rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] relative overflow-hidden group">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <MapPin className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">2. Mechanic Arrives</h3>
                    <p className="text-gray-600 dark:text-[#bdbdbd]">Our certified mechanic arrives at your location fully equipped.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#161616] p-8 rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] relative overflow-hidden group">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <Shield className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">3. Ride Freely</h3>
                    <p className="text-gray-600 dark:text-[#bdbdbd]">Pay online and ride safely with our 30-day service warranty.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* PRICING / PACKAGES */}
          <section id="pricing" className="py-24 px-5 bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                    Our Popular <span className="text-yellow-500 dark:text-yellow-400">Packages</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-lg">No hidden costs. Just honest, upfront pricing for all services.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Pkg 1 */}
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] border border-gray-200 dark:border-[#333] p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">General Bike Service</h3>
                    <div className="text-3xl font-black text-yellow-600 dark:text-yellow-500 mb-2">₹699 <span className="text-lg text-gray-400 line-through font-medium ml-2">₹899</span></div>
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-500 mb-4">Offer Price: ₹699</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">🏠 Available at Your Doorstep</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">🛡️ 500 Kms or 1 Month Warranty</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">🔧 Recommended Every 3,000 Kms or 3 Months</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">⏱️ Service Time: 2 Hours</li>
                    </ul>
                    
                    <p className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Service Includes:</p>
                    <ul className="mb-8 flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Air Filter Cleaning</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Battery Voltage Check</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Brake Service</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Cables & Levers Adj.</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Chain Tension Check</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Clutch Greasing</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Dry Wash</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Electrical Check-up</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Engine Oil Check</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Greasing & Lube</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Oil Leakage Check</li>
                      <li className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> Spark Plug Cleaning</li>
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'General Bike Service', price: '₹699'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-100 dark:bg-[#2a2a2a] hover:bg-yellow-500 dark:hover:bg-yellow-500 text-gray-900 dark:text-white hover:text-black px-4 py-3 rounded-xl font-bold transition-colors mt-auto">Select Package</button>
                  </div>
                  
                  {/* Pkg 2 */}
                  <div className="bg-gray-900 dark:bg-[#161616] rounded-[24px] border-2 border-yellow-500 p-8 flex flex-col shadow-[0_8px_30px_rgba(234,179,8,0.15)] relative transform md:-translate-y-2">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">🏍️ General Service + Engine Oil</h3>
                    <div className="text-3xl font-black text-yellow-400 mb-2">₹1,249 <span className="text-lg text-gray-500 line-through font-medium ml-2">₹1,500</span></div>
                    <p className="text-sm font-medium text-gray-300 mb-6 leading-relaxed">Professional doorstep bike service with engine oil change.</p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium">✓ Available at Your Doorstep</li>
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium">✓ 500 Kms or 1 Month Warranty</li>
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium">✓ Recommended Every 3,000 Kms or 3 Months</li>
                      <li className="flex items-start gap-2 text-sm text-gray-300 font-medium"><Clock className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" /> Service Time: Approx. 2 Hours</li>
                    </ul>

                    <p className="font-bold text-white mb-3 text-sm">Service Includes:</p>
                    <ul className="mb-8 flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Air Filter Cleaning</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Battery Voltage Check</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Brake Service</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Cables & Levers Adj.</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Chain Tension Check</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Clutch Greasing</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Dry Wash</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Electrical Check-up</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Engine Oil Change</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Greasing & Lube</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Oil Leakage Check</li>
                      <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> Spark Plug Cleaning</li>
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'General Service + Engine Oil', price: '₹1,249'}); setIsPackageModalOpen(true); }} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-4 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] mt-auto">Book Now →</button>
                  </div>
                  
                  {/* Pkg 3 */}
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] border border-gray-200 dark:border-[#333] p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">⚡ Jump Start Service</h3>
                    <div className="text-3xl font-black text-yellow-600 dark:text-yellow-500 mb-2">₹399 <span className="text-lg text-gray-400 line-through font-medium ml-2">₹600</span></div>
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-500 mb-4">Special Price: ₹399</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-6 leading-relaxed">Get your bike started quickly with our doorstep jump-start service. No workshop visit, no waiting.</p>
                    <ul className="space-y-4 mb-8 flex-1">
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Available at Your Doorstep</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><Clock className="w-5 h-5 text-yellow-500 shrink-0" /> 20 Minutes Approx.</li>
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'Jump Start Service', price: '₹399'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-100 dark:bg-[#2a2a2a] hover:bg-yellow-500 dark:hover:bg-yellow-500 text-gray-900 dark:text-white hover:text-black px-4 py-3 rounded-xl font-bold transition-colors">Book Jump Start</button>
                  </div>
                  
                  {/* Pkg 4 */}
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] border border-gray-200 dark:border-[#333] p-8 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 relative group">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">🛞 Puncture Repair</h3>
                    <div className="text-3xl font-black text-yellow-600 dark:text-yellow-500 mb-6">₹599 <span className="text-lg text-gray-400 line-through font-medium ml-2">₹750</span></div>
                    <p className="font-bold text-gray-900 dark:text-white mb-4">Service Includes</p>
                    <ul className="space-y-4 mb-8 flex-1">
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Available at Your Doorstep</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><Clock className="w-5 h-5 text-yellow-500 shrink-0" /> Takes only 20 minutes</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> One Tyre Puncture Repair</li>
                      <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium"><span className="text-yellow-500 font-black text-lg leading-none shrink-0 mt-0">+</span> ₹100 extra for each additional puncture</li>
                    </ul>
                    <button onClick={() => { setSelectedPackage({name: 'Puncture Repair', price: '₹599'}); setIsPackageModalOpen(true); }} className="w-full bg-gray-100 dark:bg-[#2a2a2a] hover:bg-yellow-500 dark:hover:bg-yellow-500 text-gray-900 dark:text-white hover:text-black px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">🚀 Checkout</button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* COVERAGE SECTION */}
          <section className="py-20 px-5 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                    Serving all across <span className="text-yellow-500 dark:text-yellow-400">Bengaluru</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] mb-8 text-lg leading-relaxed">
                    We currently cover all major zones in Bengaluru. Our network of verified mechanics ensures we reach your location within 30 minutes.
                  </p>
                  <ul className="grid grid-cols-2 gap-4 mb-8">
                    {['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Jayanagar', 'Malleswaram', 'BTM Layout', 'Electronic City'].map((loc, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-sm">
                        <MapPin className="w-4 h-4 text-yellow-500" /> {loc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[32px] overflow-hidden border border-gray-100 dark:border-[#2a2a2a] shadow-2xl relative">
                  <img src={coverageMapUrl} alt="Service Coverage Map" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                     <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm backdrop-blur-md">Fastest Coverage Area</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* REVIEWS */}
          <section className="py-24 px-5 bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-[36px] md:text-[40px] font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                    Loved by <span className="text-yellow-500 dark:text-yellow-400">Riders</span>
                  </h2>
                  <p className="text-gray-600 dark:text-[#bdbdbd] max-w-2xl mx-auto text-lg">See what our customers are saying about our doorstep service.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {name: "Rahul Verma", text: "Incredible service! The mechanic arrived in exactly 25 minutes to fix my Activa's puncture. Highly professional and polite.", rating: 5},
                    {name: "Sneha Reddy", text: "Got a full service for my Royal Enfield. Transparent pricing and they used genuine Motul oil right in front of me. Very satisfied.", rating: 5},
                    {name: "Karthik N.", text: "My bike wouldn't start in the morning. Booked a jump start and they were here instantly. Saved my work day!", rating: 4}
                  ].map((review, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#161616] p-8 rounded-[24px] border border-gray-100 dark:border-[#2a2a2a] shadow-sm">
                      <div className="flex text-yellow-500 mb-4">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">"{review.text}"</p>
                      <div className="font-bold text-gray-900 dark:text-white">{review.name}</div>
                      <div className="text-xs text-gray-500 mt-1">Bengaluru</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          {/* FAQ */}
          <section className="py-20 px-5 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#222]">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-[32px] font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 dark:border-[#333] rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#161616] transition-all">
                      <button 
                        className="w-full px-6 py-5 text-left font-bold flex justify-between items-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      >
                        {faq.question}
                        {activeFaq === index ? <ChevronUp className="w-5 h-5 text-yellow-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                      </button>
                      {activeFaq === index && (
                        <div className="px-6 pb-5 pt-1 text-gray-600 dark:text-[#bdbdbd] font-medium leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          {/* CTA */}
          <section className="py-20 px-5 text-center bg-yellow-500">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-[32px] md:text-[48px] font-black mb-6 text-black leading-tight">Your bike deserves the best.</h2>
                <p className="text-xl mb-10 text-yellow-950 font-medium">Book a mechanic now and experience premium doorstep service.</p>
                <a href="#home" className="inline-flex bg-black text-white px-8 py-4 rounded-full font-bold text-[18px] transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl items-center gap-3 group">
                  Book Service Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </section>
        </main>
      ) : currentView === "booking-success" ? (
        <main className="pt-32 pb-32 px-5 min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
          <FadeIn>
            <div className="max-w-xl w-full bg-white dark:bg-[#161616] rounded-[32px] p-10 md:p-14 text-center border border-gray-100 dark:border-[#2a2a2a] shadow-2xl">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-[32px] md:text-[40px] font-black text-gray-900 dark:text-white mb-4 leading-tight">Booking Successful!</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
                Thank you for choosing Yes Bike Service. Your request has been received. Our mechanic will contact you shortly to confirm your appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://wa.me/917090400617" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-8 py-4 rounded-xl font-bold text-[18px] transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                >
                  <MessageCircle className="w-5 h-5" /> Contact on WhatsApp
                </a>
                <button 
                  onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a2a] dark:hover:bg-[#333] text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-[18px] transition-all hover:-translate-y-1 shadow-md"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </FadeIn>
        </main>
      ) : currentView === "privacy" ? (
        <main className="pt-32 pb-20 px-5 min-h-screen">
           <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h1>Privacy Policy</h1>
              <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
              <h2>Information Collection</h2>
              <p>We collect information such as your name, phone number, and address strictly to provide our doorstep bike service.</p>
           </div>
        </main>
      ) : (
        <main className="pt-32 pb-20 px-5 min-h-screen">
           <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h1>Terms and Conditions</h1>
              <p>By booking a service, you agree to our terms of service.</p>
           </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-gray-900 dark:bg-[#050505] text-white pt-20 pb-10 px-5 border-t border-gray-800 dark:border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src={logoUrl} alt="Yes bike service Logo" className="w-12 h-12 rounded-xl object-cover ring-2 ring-yellow-500/20 shadow-md" referrerPolicy="no-referrer" />
                <span className="text-[24px] font-black text-yellow-500 leading-none">Yes <span className="text-white">bike service</span></span>
              </div>
              <p className="text-gray-400 mb-6 font-medium leading-relaxed">Expert two-wheeler care, delivered right to your doorstep. Transparent, reliable, and fast.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors font-medium">General Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors font-medium">Engine Oil Change</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors font-medium">Jump Start</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors font-medium">Puncture Repair</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors font-medium">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors font-medium" onClick={(e) => { e.preventDefault(); setCurrentView('terms'); window.scrollTo(0,0); }}>Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors font-medium" onClick={(e) => { e.preventDefault(); setCurrentView('privacy'); window.scrollTo(0,0); }}>Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400 font-medium">+91 7090400617</span>
                </li>
                <li className="flex items-start gap-3">
                  <Map className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400 font-medium">Bengaluru, Karnataka, India</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} Yes Bike Service. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* QUICK CONTACT BOTTOM BAR (MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur-md border-t border-gray-200 dark:border-[#222] md:hidden z-40 flex gap-2">
        <a href="tel:+917090400617" className="flex-1 bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Call
        </a>
        <a href="https://wa.me/917090400617?text=Hi, I need a bike service." target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          WhatsApp
        </a>
      </div>

      {/* PACKAGE BOOKING MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#151515] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-[#333]">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-[#2a2a2a]">
              <div className="w-full">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-0.5">Book Service</h3>
                <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold mb-3">Book in 30 Seconds.</p>
                {selectedPackage && (
                  <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-3 border border-gray-100 dark:border-[#2a2a2a] mb-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {selectedPackage.name}
                    </p>
                    <p className="text-lg font-black text-yellow-600 dark:text-yellow-500">{selectedPackage.price}</p>
                  </div>
                )}
              </div>
              <button onClick={() => setIsPackageModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors self-start bg-gray-100 dark:bg-[#222] p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              const fullName = formData.get('fullName');
              const phone = formData.get('phone');
              const location = formData.get('location');
              const vehicleType = formData.get('vehicleType');
              const time = formData.get('time');
              
              const pkgName = selectedPackage ? selectedPackage.name : 'Unknown Package';
              const pkgPrice = selectedPackage ? selectedPackage.price : '';
              
              const message = `🏍️🛵PACKAGE BOOKING\n\n*Package:* ${pkgName} (${pkgPrice})\n\n👤 Name: ${fullName}\n📞 Phone: ${phone}\n📍 Location: ${location}\n🏍️ Vehicle Type: ${vehicleType}\n⏰ Time: ${time}\n\n✅ Please confirm my booking!`;
              
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
              setIsPackageModalOpen(false);
              setCurrentView('booking-success');
              window.scrollTo(0, 0);
              if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                (window as any).gtag_report_conversion();
              }
            }} className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
              
              <div className="flex bg-gray-100 dark:bg-[#0b0b0b] p-1 rounded-xl border border-gray-200 dark:border-[#303030]">
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Bike" defaultChecked className="peer sr-only" />
                  <div className="py-2 text-sm font-bold rounded-lg transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    🏍️ Bike
                  </div>
                </label>
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Scooter" className="peer sr-only" />
                  <div className="py-2 text-sm font-bold rounded-lg transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-[#222] peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    🛵 Scooter
                  </div>
                </label>
              </div>
                            
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    <input type="text" name="fullName" required placeholder="Full Name *" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Mobile No *" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input type="text" name="location" required placeholder="Service Location *" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm" />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <Clock className="h-4 w-4" />
                  </div>
                  <select name="time" required className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#101010] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500 transition-all text-sm font-semibold shadow-sm appearance-none cursor-pointer">
                    <option value="">Preferred Time...</option>
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-4 py-3 rounded-xl font-bold text-[16px] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_20px_rgba(234,179,8,0.25)] flex justify-center items-center gap-2 mt-4">
                {packageSuccess ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 animate-in zoom-in" />
                    Request Sent!
                  </span>
                ) : (
                  <>Confirm Booking <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      
      {packageSuccess && <Toast message="Package booked! We'll contact you shortly." onClose={() => setPackageSuccess(false)} />}
      {heroSuccess && <Toast message="Booking requested! We'll contact you shortly." onClose={() => setHeroSuccess(false)} />}
    </div>
  );
}
