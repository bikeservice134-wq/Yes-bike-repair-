import React, { useState, useEffect } from 'react';
import { 
  Wrench, Clock, Shield, ThumbsUp, MousePointerClick, Star, CheckCircle2, ChevronDown, ChevronUp, MapPin, 
  Phone, User, Smartphone, Settings, Tag, Bike, X, ArrowRight, ArrowDown, ArrowUp, Mail, Instagram, Facebook, Twitter, Sun, Moon, Map, MessageCircle, Calendar, Banknote, Wallet, Zap, Cog, Copy, Check, Navigation, Disc, Search, Home, Quote } from 'lucide-react';
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



const MODELS_BY_BRAND: Record<string, string[]> = {
  Bajaj: ["Pulsar 150", "Pulsar NS200", "Pulsar N160", "Platina 100", "CT 110", "Dominar 400", "Avenger Cruise 220"],
  Hero: ["Splendor Plus", "Super Splendor", "HF Deluxe", "Passion Pro", "Glamour", "Xtreme 160R", "Destini 125", "Pleasure Plus"],
  Honda: ["Activa 6G", "Activa 125", "Dio", "Shine 125", "SP 125", "Unicorn", "Hornet 2.0", "H'ness CB350"],
  KTM: ["Duke 200", "Duke 250", "Duke 390", "RC 200", "RC 390", "Adventure 390"],
  TVS: ["Jupiter", "Ntorq 125", "Apache RTR 160", "Apache RTR 200", "Raider", "Radeon", "Sport", "XL100"],
  "Royal Enfield": ["Classic 350", "Hunter 350", "Bullet 350", "Meteor 350", "Himalayan", "Continental GT 650", "Interceptor 650"],
  Vespa: ["Vespa ZX 125", "Vespa VXL 150", "Vespa SXL 150"],
  Mahindra: ["Mojo 300", "Gusto 125", "Centuro", "Rodeo RZ", "Flyte"],
  Yamaha: ["FZ-S FI", "R15 V4", "MT-15 V2", "Fascino 125", "RayZR 125", "Aerox 155", "FZ 25"],
  Suzuki: ["Access 125", "Burgman Street", "Avenis", "Gixxer SF", "Gixxer", "V-Strom SX"],
  Triumph: ["Speed 400", "Scrambler 400 X", "Trident 660", "Street Twin", "Bonneville T100"],
  Jawa: ["Jawa Classic", "42", "Perak", "42 Bobber"],
  Kawasaki: ["Ninja 300", "Ninja 400", "Ninja 650", "Z650", "Z900"],
  Yezdi: ["Roadster", "Scrambler", "Adventure"],
  BMW: ["G 310 R", "G 310 GS", "S 1000 RR", "R 1250 GS"],
  "Harley-Davidson": ["X440", "Iron 883", "Street 750", "Fat Boy"],
  Aprilia: ["SR 125", "SR 160", "SXR 160", "RS 457"],
  Piaggio: ["Ape", "Beverly"],
  Benelli: ["Imperiale 400", "TRK 502", "Leoncino 500"],
  Husqvarna: ["Svartpilen 250", "Vitpilen 250", "Svartpilen 401"],
  Ather: ["450X", "450S", "450 Apex", "Rizta"],
  "Ola Electric": ["S1 Pro Gen 2", "S1 Air", "S1 X"],
  "TVS Electric": ["iQube Standard", "iQube S", "iQube ST"],
  Revolt: ["RV400", "RV400 BRZ"],
  Ultraviolette: ["F77 Mach 2", "F77 Recon"],
  Other: ["Other Model"]
};

const POPULAR_BENGALURU_AREAS = [
  "Indiranagar",
  "Koramangala",
  "HSR Layout",
  "Whitefield",
  "Jayanagar",
  "Electronic City",
  "Marathahalli",
  "BTM Layout"
];

const QUICK_SERVICE_OPTIONS = [
  { id: "General Service - ₹699", name: "General Service", price: "₹699", note: "21-point checkup, tuning & washing", badge: "Most Popular" },
  { id: "General Service + Engine Oil - ₹1,349", name: "General Service + Engine Oil", price: "₹1,349", note: "Includes 100% genuine Castrol/Motul oil", badge: "Best Value" },
  { id: "Jump Start Service - ₹399", name: "Jump Start Service", price: "₹399", note: "Roadside battery jump start in 20 mins", badge: "Express" },
  { id: "Puncture Repair - ₹599", name: "Puncture Repair", price: "₹599", note: "Doorstep tyre puncture fix in ~20 mins", badge: "Express" },
  { id: "Running Repair - ₹450", name: "Running Repair", price: "₹450", note: "Vehicle inspection & quick repairs at doorstep", badge: "Quick Fix" },
];

const ALL_BRANDS_LIST = [
  { name: "Bajaj", category: "Commuter", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Popular", tagline: "Pulsar, Platina, Avenger, Dominar" },
  { name: "Hero", category: "Commuter", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Popular", tagline: "Splendor, Passion, HF Deluxe, Xtreme" },
  { name: "Honda", category: "Commuter", popular: true, coreTwoWheeler: true, icon: "🛵", badge: "Popular", tagline: "Activa, Shine, Dio, Unicorn, Hornet" },
  { name: "KTM", category: "Sports", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Sports", tagline: "Duke 200/250/390, RC 200/390, ADV" },
  { name: "TVS", category: "Commuter", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Popular", tagline: "Jupiter, Ntorq, Apache RTR, Raider" },
  { name: "Royal Enfield", category: "Cruiser", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Top Rated", tagline: "Classic, Hunter, Bullet, Meteor, Himalayan" },
  { name: "Vespa", category: "Scooter", popular: true, coreTwoWheeler: true, icon: "🛵", badge: "Classic", tagline: "VXL 125/150, SXL 125/150, ZX" },
  { name: "Mahindra", category: "Commuter", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Two-Wheeler", tagline: "Mojo, Gusto, Centuro, Rodeo" },
  { name: "Yamaha", category: "Sports", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Performance", tagline: "FZ, R15, MT-15, RayZR, Aerox" },
  { name: "Suzuki", category: "Commuter", popular: true, coreTwoWheeler: true, icon: "🛵", badge: "Popular", tagline: "Access 125, Burgman, Gixxer, Avenis" },
  { name: "Triumph", category: "Premium", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Premium", tagline: "Speed 400, Scrambler 400 X, Bonneville" },
  { name: "Jawa", category: "Cruiser", popular: true, coreTwoWheeler: true, icon: "🏍️", badge: "Classic", tagline: "Jawa 42, Perak, Classic, Bobber" },
  { name: "Kawasaki", category: "Sports", popular: false, coreTwoWheeler: false, icon: "🏍️", badge: "Superbike", tagline: "Ninja 300/400/650, Z650, Z900" },
  { name: "Yezdi", category: "Cruiser", popular: false, coreTwoWheeler: false, icon: "🏍️", badge: "Adventure", tagline: "Roadster, Scrambler, Adventure" },
  { name: "BMW", category: "Premium", popular: false, coreTwoWheeler: false, icon: "🏍️", badge: "Premium", tagline: "G 310 R, G 310 GS, F 900 R" },
  { name: "Harley-Davidson", category: "Cruiser", popular: false, coreTwoWheeler: false, icon: "🏍️", badge: "Cruiser", tagline: "X440, Iron 883, Street 750" },
  { name: "Aprilia", category: "Sports", popular: false, coreTwoWheeler: false, icon: "🛵", badge: "Italian", tagline: "RS 457, SR 125/160, Storm" },
  { name: "Piaggio", category: "Scooter", popular: false, coreTwoWheeler: false, icon: "🛵", badge: "Urban", tagline: "Typhoon, Medley, Beverly" },
  { name: "Benelli", category: "Sports", popular: false, coreTwoWheeler: false, icon: "🏍️", badge: "Tourer", tagline: "Imperiale 400, TRK 502, Leoncino" },
  { name: "Husqvarna", category: "Sports", popular: false, coreTwoWheeler: false, icon: "🏍️", badge: "Swedish", tagline: "Svartpilen 250/401, Vitpilen 250" },
  { name: "Ather", category: "Electric", popular: true, coreTwoWheeler: false, icon: "⚡", badge: "Smart EV", tagline: "450X, 450S, 450 Apex, Rizta" },
  { name: "Ola Electric", category: "Electric", popular: true, coreTwoWheeler: false, icon: "⚡", badge: "Electric", tagline: "S1 Pro, S1 Air, S1 X+" },
  { name: "TVS Electric", category: "Electric", popular: false, coreTwoWheeler: false, icon: "⚡", badge: "iQube EV", tagline: "iQube, iQube S, iQube ST" },
  { name: "Revolt", category: "Electric", popular: false, coreTwoWheeler: false, icon: "⚡", badge: "E-Motorcycle", tagline: "RV400, RV400 BRZ, RV1" },
  { name: "Ultraviolette", category: "Electric", popular: false, coreTwoWheeler: false, icon: "⚡", badge: "Hi-Tech EV", tagline: "F77 Mach 2, F77 Recon" },
];

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
  
  const [isTechnicalDetailsOpen, setIsTechnicalDetailsOpen] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [technicalDetailsContent, setTechnicalDetailsContent] = useState({ title: '', steps: [] as string[] });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    if (currentView === 'booking-success') {
      if (typeof window !== 'undefined') {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-18313979172/mupQCP_io-4cEKTK5JxE',
            'value': 1.0,
            'currency': 'INR'
          });
        }
        if ((window as any).gtag_report_conversion) {
          (window as any).gtag_report_conversion();
        }
      }
    }
  }, [currentView]);
  
  const [locationSearch, setLocationSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('TwoWheelers');
  const [brandSearch, setBrandSearch] = useState('');
  const [brandToast, setBrandToast] = useState<string | null>(null);
  const [heroBrand, setHeroBrand] = useState("");
  const [heroModel, setHeroModel] = useState("");
  const [heroName, setHeroName] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroService, setHeroService] = useState("General Service - ₹699");
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [bookingTime, setBookingTime] = useState("Morning (09:00 AM - 12:00 PM)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [bookingConfirmedData, setBookingConfirmedData] = useState<{
    bookingId: string;
    fullName: string;
    phone: string;
    vehicle: string;
    brand: string;
    model: string;
    location: string;
    service: string;
    timing: string;
    estimatedPrice: string;
    timestamp: string;
  } | null>(null);
  const [copiedBookingId, setCopiedBookingId] = useState(false);

  const [modalBrand, setModalBrand] = useState("");
  const [activeLocation, setActiveLocation] = useState('Indiranagar');

  const handleBookService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get('name') as string)?.trim() || heroName || 'Rider';
    const phone = (formData.get('phone') as string)?.trim() || heroPhone || '';
    const brand = heroBrand || (formData.get('brand') as string) || 'Hero';
    const model = heroModel || (formData.get('model') as string) || '';
    const location = (formData.get('location') as string)?.trim() || locationSearch || 'Bengaluru';
    const service = heroService || (formData.get('service') as string) || 'General Service - ₹699';
    const date = (formData.get('date') as string)?.trim() || bookingDate;
    const time = (formData.get('time') as string)?.trim() || bookingTime;

    const timingText = `${date} • ${time}`;

    const selectedOpt = QUICK_SERVICE_OPTIONS.find(s => s.id === service);
    const estimatedPrice = selectedOpt ? selectedOpt.price : '₹699';
    const bookingId = `YB-${Math.floor(10000 + Math.random() * 90000)}`;

    const confirmedData = {
      bookingId,
      fullName,
      phone,
      vehicle: heroVehicle,
      brand,
      model: model || 'General Model',
      location,
      service,
      timing: timingText,
      estimatedPrice,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setBookingConfirmedData(confirmedData);

    const message = `🏍️ 🛵 NEW BOOKING RECEIVED!

Hello YES BIKE SERVICE Team 👋

📋 Booking Reference: ${bookingId}
👤 Customer: ${fullName}
📞 Phone: +91 ${phone}
📍 Location: ${location}
🏍️ Vehicle: ${heroVehicle} - ${brand} ${model}
🔧 Service: ${service}
📅 Date: ${date}
⏰ Time: ${time}

✅ Doorstep Mechanic Assigned!
YES BIKE SERVICE - Doorstep Service Bengaluru`;

    const whatsappNumber = "917090400617";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
      setCurrentView('booking-success');
      window.scrollTo(0, 0);
      if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
        (window as any).gtag_report_conversion();
      }
    }, 350);
  };
  
  useEffect(() => {
    const locations = ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Jayanagar'];
    const interval = setInterval(() => {
      setActiveLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    { question: "1. What is doorstep bike service?", answer: "Our doorstep bike service brings certified two-wheeler mechanics right to your home, office, or breakdown location in Bangalore. We carry specialized tools, equipment, and genuine spare parts to service or repair your bike on-site." },
    { question: "2. Which brands do you service?", answer: "We service all major commuter, sports, premium, and electric two-wheeler brands including Hero, Honda, TVS, Bajaj, Yamaha, Royal Enfield, Suzuki, KTM, Kawasaki, Jawa, Yezdi, BMW, Triumph, Harley-Davidson, Ather, Ola Electric, and more." },
    { question: "3. How do I book a mechanic?", answer: "Simply fill out our quick booking form above, choose your vehicle brand and service, enter your location, and click Book Mechanic Now. Our mechanic is dispatched immediately and calls to confirm." },
    { question: "4. Do I need to provide tools?", answer: "No, our mechanics carry all necessary professional tools, diagnostic gear, and genuine spare parts required for the service. You only need to provide a safe spot for the mechanic to work." },
    { question: "5. How long does a service take?", answer: "A standard General Service takes approximately 60–90 minutes. Jump start and quick emergency fixes typically take 15–25 minutes." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-zinc-950/95 border-b border-gray-200 dark:border-zinc-800 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-[0_4px_10px_rgba(234,179,8,0.3)] shrink-0"><Wrench className="w-5 h-5 text-black" /></div>
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-[25px] font-extrabold tracking-tight text-yellow-500 leading-none text-left">
              Yes <span className="text-gray-900 dark:text-white">Bike Service</span>
            </button>
          </div>
          <nav className="hidden lg:flex gap-6 items-center">
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Home</a>
            <a href="#pricing" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Pricing</a>
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Book Online</a>
          </nav>
          
          <button onClick={() => setIsDark(!isDark)} className="ml-auto lg:ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <a href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20would%20like%20to%20book%20a%20mechanic." target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-6 py-2.5 rounded-full font-bold transition-all ml-4 shadow-[0_4px_14px_rgba(234,179,8,0.2)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.3)] hover:-translate-y-0.5">
            Book Now
          </a>
        </div>
      </header>

      {currentView === "home" && (
        <main>
          {/* HERO SECTION */}
          <section id="home" className="relative overflow-hidden pt-24 lg:pt-28 pb-12 lg:pb-20 bg-white dark:bg-zinc-950">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-yellow-500/10 dark:bg-yellow-500/5 blur-[130px] rounded-full pointer-events-none"></div>
            
            <FadeIn>
              <div className="max-w-xl w-full mx-auto px-4 flex flex-col items-center justify-center relative z-10">
                {/* HERO HEADER */}
                <div className="text-center mb-5 max-w-lg">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 border border-yellow-500/25 text-yellow-800 dark:text-yellow-400 text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
                    <span>Bengaluru's</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                    Doorstep Bike Repair
                  </h1>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-zinc-400 font-medium">
                    Certified mechanic at your home or office in 20 minutes across Bengaluru
                  </p>

                  {/* User-Requested 3 Core Services */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
                    {[
                      { id: "General Service - ₹699", label: "General Service", price: "₹699", icon: "🛠️" },
                      { id: "General Service + Engine Oil - ₹1,349", label: "General Service + Engine Oil", price: "₹1,349", icon: "🛢️" },
                      { id: "Jump Start Service - ₹399", label: "Jump Start Service", price: "₹399", icon: "⚡" },
                    ].map((srv) => {
                      const isSelected = heroService === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setHeroService(srv.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-xs ${
                            isSelected
                              ? 'bg-yellow-500 text-zinc-950 border-yellow-500 font-extrabold shadow-sm ring-2 ring-yellow-400/40'
                              : 'bg-white/90 dark:bg-zinc-800/90 text-gray-700 dark:text-zinc-200 border-gray-200 dark:border-zinc-700 hover:border-yellow-400'
                          }`}
                        >
                          <span>{srv.icon}</span>
                          <span>{srv.label}</span>
                          <span className={`text-[11px] font-black ml-0.5 ${isSelected ? 'text-zinc-950' : 'text-yellow-600 dark:text-yellow-400'}`}>{srv.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SMALL SIZE COMPACT BOOKING FORM */}
                <div id="booking-form" className="w-full max-w-[375px] sm:max-w-[390px] relative z-20 pt-3">
                  <div className="absolute inset-0 -top-1 bg-gradient-to-br from-yellow-400/25 via-yellow-500/15 to-yellow-600/10 blur-xl rounded-2xl pointer-events-none opacity-60 animate-pulse" style={{ animationDuration: "4s" }}></div>
                  
                  {/* FLOATING STATUS BADGE */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center group cursor-default">
                    <div className="absolute inset-0 bg-yellow-500/25 blur-md rounded-full"></div>
                    <div className="relative bg-zinc-900 dark:bg-black text-white text-[10px] font-black uppercase tracking-wider py-1 px-3.5 rounded-full shadow-lg border border-yellow-400/40 flex items-center gap-1.5 overflow-hidden">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="relative z-10 text-yellow-400 font-bold whitespace-nowrap">
                        Reaches in 20 mins
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 pt-4.5 sm:pt-5 shadow-xl border border-white/60 dark:border-zinc-700/50 relative overflow-hidden">
                    <div className="text-center mb-2.5 mt-0.5">
                      <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                        Book Mechanic Now
                      </h2>
                      <div className="mt-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-yellow-400/10 border border-amber-500/20 dark:border-yellow-400/20 text-[10.5px] font-semibold text-gray-700 dark:text-zinc-200">
                        <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3 h-3 inline mr-0.5 text-emerald-500 shrink-0" />
                          Zero Advance
                        </span>
                        <span className="text-gray-300 dark:text-zinc-600 font-normal">|</span>
                        <span>
                          Starts <strong className="font-extrabold text-amber-600 dark:text-yellow-400">₹399</strong>
                        </span>
                      </div>
                    </div>

                    <form className="space-y-2 relative z-10" onSubmit={handleBookService}>
                      {/* Segmented Control for Vehicle Type */}
                      <div className="flex p-0.5 bg-gray-100/90 dark:bg-zinc-800/90 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setHeroVehicle('Bike')}
                          className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                            heroVehicle === 'Bike'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <span>🏍️</span> Bike
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeroVehicle('Scooter')}
                          className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                            heroVehicle === 'Scooter'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-xs ring-1 ring-black/5 dark:ring-white/10'
                              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <span>🛵</span> Scooter
                        </button>
                      </div>

                      {/* Customer Name & Phone */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <User className="h-3.5 w-3.5" />
                          </div>
                          <input 
                            type="text" 
                            name="name" 
                            required 
                            value={heroName}
                            onChange={(e) => setHeroName(e.target.value)}
                            placeholder="Full Name" 
                            className="w-full pl-8 pr-2 py-2 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold placeholder:font-medium placeholder:text-gray-400" 
                          />
                        </div>
                        
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Phone className="h-3 w-3" />
                          </div>
                          <div className="absolute left-6 inset-y-0 flex items-center pointer-events-none text-[10px] font-extrabold text-gray-400 dark:text-zinc-500 border-r border-gray-200 dark:border-zinc-700 pr-1 my-1.5">
                            +91
                          </div>
                          <input 
                            type="tel" 
                            name="phone" 
                            required 
                            pattern="[0-9]{10}"
                            maxLength={10}
                            value={heroPhone}
                            onChange={(e) => setHeroPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="Mobile No." 
                            className="w-full pl-13 pr-2 py-2 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold placeholder:font-medium placeholder:text-gray-400 tracking-wide" 
                          />
                        </div>
                      </div>

                      {/* Brand & Model Selection */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Tag className="h-3.5 w-3.5" />
                          </div>
                          <select 
                            name="brand" 
                            required 
                            value={heroBrand} 
                            onChange={(e) => {
                              setHeroBrand(e.target.value);
                              setHeroModel("");
                            }} 
                            className="w-full pl-8 pr-6 py-2 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Select Brand</option>
                            {Object.keys(MODELS_BY_BRAND).map(brand => (
                              <option key={brand} value={brand} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">{brand}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-3 w-3" />
                          </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Bike className="h-3.5 w-3.5" />
                          </div>
                          <select 
                            name="model" 
                            required 
                            value={heroModel}
                            onChange={(e) => setHeroModel(e.target.value)}
                            className="w-full pl-8 pr-6 py-2 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold appearance-none cursor-pointer disabled:opacity-50" 
                            disabled={!heroBrand}
                          >
                            <option value="" disabled>{heroBrand ? "Select Model" : "Brand First"}</option>
                            {heroBrand && MODELS_BY_BRAND[heroBrand]?.map(model => (
                              <option key={model} value={model} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">{model}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Location Input with Auto-Fill / Geolocation */}
                      <div className="space-y-1">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <MapPin className="h-3.5 w-3.5" />
                          </div>
                          <input 
                            type="text" 
                            name="location" 
                            required 
                            placeholder="Locality / Area, Bengaluru" 
                            className="w-full pl-8 pr-20 py-2 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold placeholder:font-medium placeholder:text-gray-400" 
                            value={locationSearch} 
                            onChange={(e) => setLocationSearch(e.target.value)} 
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsDetectingLocation(true);
                              if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                  () => {
                                    setIsDetectingLocation(false);
                                    setLocationSearch(`${activeLocation}, Bengaluru`);
                                  },
                                  () => {
                                    setIsDetectingLocation(false);
                                    setLocationSearch(`${activeLocation}, Bengaluru`);
                                  },
                                  { timeout: 3000 }
                                );
                              } else {
                                setIsDetectingLocation(false);
                                setLocationSearch(`${activeLocation}, Bengaluru`);
                              }
                            }}
                            className="absolute right-1 top-1 bottom-1 px-2 rounded-md bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Auto-fill locality"
                          >
                            <Navigation className={`w-2.5 h-2.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                            <span>{isDetectingLocation ? '...' : 'Auto-fill'}</span>
                          </button>
                        </div>

                        {/* Quick Bengaluru locality chips */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[10px]">
                          <span className="text-[9.5px] font-bold text-gray-400 dark:text-zinc-500 shrink-0">Popular:</span>
                          {POPULAR_BENGALURU_AREAS.slice(0, 4).map((area) => (
                            <button
                              key={area}
                              type="button"
                              onClick={() => setLocationSearch(`${area}, Bengaluru`)}
                              className={`px-1.5 py-0.5 rounded text-[9.5px] border transition-all shrink-0 cursor-pointer ${
                                locationSearch.includes(area)
                                  ? 'bg-yellow-500 text-black border-yellow-500 font-bold shadow-xs'
                                  : 'bg-gray-100/80 dark:bg-zinc-800/80 text-gray-600 dark:text-zinc-300 border-gray-200/60 dark:border-zinc-700/60 hover:border-yellow-400 font-medium'
                              }`}
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between px-0.5">
                          <label className="text-[10.5px] font-bold text-gray-600 dark:text-zinc-400 flex items-center gap-1">
                            <Wrench className="w-3 h-3 text-yellow-500" />
                            <span>Service</span>
                          </label>
                          <span className="text-[9.5px] font-bold text-yellow-600 dark:text-yellow-400">
                            Doorstep Repair
                          </span>
                        </div>

                        {/* 5 Core Services in Compact 1-Tap Row */}
                        <div className="grid grid-cols-5 gap-1">
                          {[
                            { id: "General Service - ₹699", name: "General", price: "₹699" },
                            { id: "General Service + Engine Oil - ₹1,349", name: "Gen+Oil", price: "₹1,349" },
                            { id: "Jump Start Service - ₹399", name: "Jump Start", price: "₹399" },
                            { id: "Puncture Repair - ₹599", name: "Puncture", price: "₹599" },
                            { id: "Running Repair - ₹450", name: "Running", price: "₹450" },
                          ].map((s) => {
                            const isSelected = heroService.startsWith(s.name) || heroService === s.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => setHeroService(s.id)}
                                className={`p-1 rounded-lg text-center border transition-all cursor-pointer flex flex-col items-center justify-center min-h-[38px] ${
                                  isSelected
                                    ? 'bg-yellow-500/15 border-yellow-500 text-gray-900 dark:text-white font-extrabold ring-1 ring-yellow-400 shadow-xs'
                                    : 'bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:border-yellow-400/70 font-semibold'
                                }`}
                              >
                                <span className="text-[9px] leading-tight truncate w-full">{s.name}</span>
                                <span className="text-[9.5px] font-black text-amber-600 dark:text-yellow-400">{s.price}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Dropdown for other services */}
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Wrench className="h-3 w-3" />
                          </div>
                          <select 
                            name="service" 
                            required 
                            value={heroService} 
                            onChange={(e) => setHeroService(e.target.value)} 
                            className="w-full pl-8 pr-6 py-1.5 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold appearance-none cursor-pointer"
                          >
                            {QUICK_SERVICE_OPTIONS.map(opt => (
                              <option key={opt.id} value={opt.id} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">
                                {opt.name} — {opt.price} ({opt.badge})
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-3 w-3" />
                          </div>
                        </div>
                      </div>

                      {/* Date & Time Selection */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Date */}
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between px-0.5">
                            <label className="text-[10.5px] font-bold text-gray-600 dark:text-zinc-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-yellow-500" />
                              <span>Date</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const todayStr = new Date().toISOString().split('T')[0];
                                setBookingDate(todayStr);
                              }}
                              className="text-[9.5px] font-bold text-yellow-600 dark:text-yellow-400 hover:underline cursor-pointer"
                            >
                              Today
                            </button>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                              <Calendar className="h-3.5 w-3.5" />
                            </div>
                            <input 
                              type="date" 
                              name="date" 
                              required 
                              min={new Date().toISOString().split('T')[0]}
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full pl-8 pr-1 py-1.5 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold cursor-pointer"
                              title="Select Service Date" 
                            />
                          </div>
                        </div>

                        {/* Time */}
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between px-0.5">
                            <label className="text-[10.5px] font-bold text-gray-600 dark:text-zinc-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-yellow-500" />
                              <span>Time</span>
                            </label>
                            <span className="text-[9.5px] font-bold text-yellow-600 dark:text-yellow-400">
                              Slot
                            </span>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                              <Clock className="h-3.5 w-3.5" />
                            </div>
                            <select 
                              name="time" 
                              required 
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full pl-8 pr-6 py-1.5 rounded-lg border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs font-semibold appearance-none cursor-pointer"
                            >
                              <option value="Morning (09:00 AM - 12:00 PM)">🌅 Morning (9 AM - 12 PM)</option>
                              <option value="Afternoon (12:00 PM - 03:00 PM)">☀️ Afternoon (12 PM - 3 PM)</option>
                              <option value="Evening (03:00 PM - 07:00 PM)">🌆 Evening (3 PM - 7 PM)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                              <ChevronDown className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Action Button */}
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-zinc-950 font-black text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-[0_6px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_8px_25px_rgba(234,179,8,0.45)] transition-all flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 cursor-pointer mt-2"
                      >
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out pointer-events-none"></div>
                        <span className="relative z-10 flex items-center justify-center gap-1.5">
                          {isSubmitting ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                              <span>Dispatching Mechanic...</span>
                            </>
                          ) : (
                            <>
                              <span>Book Mechanic Now</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                            </>
                          )}
                        </span>
                      </button>
                      
                      {/* Trust Highlights & Emergency Helpline */}
                      <div className="pt-0.5 flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center gap-2 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <Shield className="w-3 h-3 text-emerald-500" />
                            No Advance
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3 text-amber-500" />
                            20-Min Doorstep
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            Genuine Spares
                          </span>
                        </div>

                        <div className="text-[10px] text-gray-500 dark:text-zinc-400 font-medium text-center">
                          Emergency?{" "}
                          <a 
                            href="tel:917090400617" 
                            className="font-bold text-gray-900 dark:text-yellow-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            <Phone className="w-2.5 h-2.5 text-emerald-500 inline" />
                            +91 7090400617
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </FadeIn>
          </section>
      {/* WHY CHOOSE US SECTION */}

      {/* TRUST STATS SECTION */}
      <section className="py-8 sm:py-10 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950 border-y border-gray-200/80 dark:border-zinc-800/80 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-24 bg-yellow-500/5 blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Stat 1: 4.8/5 Customer Rating */}
            <div className="group relative bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-yellow-400/70 dark:hover:border-yellow-500/40 transition-all duration-300 flex items-start gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-yellow-500/15 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0 ring-1 ring-yellow-400/40 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                <Star className="w-7 h-7 fill-yellow-500 text-yellow-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-amber-500 dark:text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="ml-1.5 text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-yellow-400 bg-yellow-500/10 dark:bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-400/30">
                    Google Reviews
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  4.8/5 <span className="text-base sm:text-lg font-bold text-gray-700 dark:text-zinc-300">Customer Rating</span>
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                  <span>From 5,000+ reviews</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">98% 5★</span>
                </p>
              </div>
            </div>

            {/* Stat 2: 10,000+ Vehicles Serviced */}
            <div className="group relative bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-yellow-400/70 dark:hover:border-yellow-500/40 transition-all duration-300 flex items-start gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-yellow-500/15 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0 ring-1 ring-yellow-400/40 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                <Bike className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-yellow-400 bg-yellow-500/10 dark:bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-400/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Bengaluru's #1
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  10,000+ <span className="text-base sm:text-lg font-bold text-gray-700 dark:text-zinc-300">Vehicles Serviced</span>
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                  <span>Trusted by Bengaluru</span>
                  <span className="w-1 h-1 rounded-full bg-yellow-500"></span>
                  <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-bold">50+ Pincodes</span>
                </p>
              </div>
            </div>

            {/* Stat 3: Verified Mechanics */}
            <div className="group relative bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-yellow-400/70 dark:hover:border-yellow-500/40 transition-all duration-300 flex items-start gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-yellow-500/15 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0 ring-1 ring-yellow-400/40 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                <Shield className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    20 Min On-Site
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  Verified Mechanics
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                  <span>Fastest in the city</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Certified Pros</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      

      {/* PRICING PACKAGES SECTION */}

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 md:py-24 relative bg-gray-50 dark:bg-zinc-950/60 overflow-hidden border-t border-gray-100 dark:border-white/5">
        {/* Subtle decorative radial lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 dark:bg-yellow-500/15 border border-yellow-500/25 text-yellow-700 dark:text-yellow-400 font-extrabold text-xs tracking-wider uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              Simple & Hassle-Free
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600">Works</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Get your bike fixed in three simple steps without stepping out of your home.
            </p>
          </div>
          
          {/* 3 Step Cards Grid with Connecting Pipeline */}
          <div className="relative">
            {/* Desktop Connector Track */}
            <div className="hidden md:block absolute top-[90px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-yellow-500/20 via-yellow-500 to-yellow-500/20 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
              
              {/* STEP 1 */}
              <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-7 sm:p-8 border-2 border-gray-100 dark:border-zinc-800 hover:border-yellow-400/80 dark:hover:border-yellow-500/50 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 flex flex-col hover:-translate-y-1.5 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>
                
                {/* Step Pill Header */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-sm">
                    Step 1
                  </span>
                  <span className="text-xs font-bold text-amber-600 dark:text-yellow-400 flex items-center gap-1">
                    ⚡ Under 60 Sec
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/15 dark:bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                  <Smartphone className="w-8 h-8" />
                </div>

                {/* Step Title & Description */}
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                  Book Online
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  Select your service, choose a time slot, and provide your location in under 60 seconds.
                </p>

                {/* Micro Perks List */}
                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>No advance payment required</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instant WhatsApp confirmation</span>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-7 sm:p-8 border-2 border-yellow-400/70 dark:border-yellow-500/40 hover:border-yellow-400 dark:hover:border-yellow-400 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/15 transition-all duration-300 flex flex-col hover:-translate-y-1.5 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>
                
                {/* Step Pill Header */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-sm">
                    Step 2
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Fast Response
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 dark:bg-yellow-500/25 border border-yellow-400/40 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6 group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-300">
                  <Navigation className="w-8 h-8" />
                </div>

                {/* Step Title & Description */}
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                  Mechanic Arrives
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  Our verified expert mechanic reaches your location fully equipped in 20 mins.
                </p>

                {/* Micro Perks List */}
                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Specialized diagnostic & repair toolkit</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Background-verified two-wheeler pro</span>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-7 sm:p-8 border-2 border-gray-100 dark:border-zinc-800 hover:border-yellow-400/80 dark:hover:border-yellow-500/50 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 flex flex-col hover:-translate-y-1.5 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>
                
                {/* Step Pill Header */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-sm">
                    Step 3
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    🛡️ Guaranteed Peace of Mind
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/15 dark:bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                  <ThumbsUp className="w-8 h-8" />
                </div>

                {/* Step Title & Description */}
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                  Ride Happy
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  Review the service, pay via cash or UPI, and get back on the road with complete peace of mind.
                </p>

                {/* Micro Perks List */}
                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Free post-service test ride inspection</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Easy payment via UPI, GPay, or Cash</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Action Strip below the 3 steps */}
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-gray-900 dark:text-white">Ready for doorstep service?</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">Doorstep mechanics dispatched across all Bengaluru locations in ~20 mins.</p>
              </div>
            </div>
            <button
              onClick={() => {
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:shadow-yellow-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Book Online Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 relative bg-gray-50 dark:bg-zinc-950/50 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center justify-center gap-2 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 px-4 py-2 rounded-full font-bold text-sm tracking-wide uppercase mb-6 border border-yellow-200 dark:border-yellow-500/20 shadow-sm">
              <Star className="w-4 h-4" /> Transparent Pricing
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
              Our Popular Packages
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              No hidden costs. Just honest, upfront pricing for all services.
            </p>
          </div>

                    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-[96rem] mx-auto items-stretch">
            {/* Pkg 1: General Service */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-yellow-400/80 dark:border-yellow-500/40 p-6 sm:p-7 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 h-full relative group hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Wrench className="w-24 h-24 text-yellow-500" />
              </div>

              {/* Floating Top Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-800 dark:text-yellow-300 font-extrabold text-[11px] uppercase tracking-wider border border-yellow-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                  Doorstep Standard
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] border border-emerald-500/20">
                  Save ₹200 (22% OFF)
                </span>
              </div>

              {/* Header */}
              <div className="relative z-10 mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-yellow-500/15 dark:bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 ring-1 ring-yellow-400/30">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                      General Service
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-yellow-400">
                      Offer Price: ₹699
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹699</span>
                <span className="text-lg font-medium text-gray-400 line-through">₹899</span>
                <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">/ all-inclusive</span>
              </div>

              {/* Key Highlights: Doorstep, 1 Month Warranty, ~60-90 Mins */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-yellow-400/5 border border-amber-500/15 dark:border-yellow-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">At Your Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Home/Office</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-yellow-400/5 border border-amber-500/15 dark:border-yellow-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🛡️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">1 Month</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Warranty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-yellow-400/5 border border-amber-500/15 dark:border-yellow-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">~60-90 Min</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Completion</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="relative z-10 mb-6 flex-grow">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  <span>What's Included:</span>
                  <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 normal-case">5 Core Services</span>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Complete Vehicle Inspection</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">21-point vital checkup including electricals, tyres & lights</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Foam Wash & Polishing</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Eco foam wash, degreasing & high-gloss exterior polish</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Brakes & Clutch Adjustment</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Brake pad cleaning, lever play calibration & clutch tuning</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Chain Tension Adjustment</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Chain slack correction, degreasing & high-load lubrication</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Carburetor Cleaning / Tuning</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Jet cleaning, idle RPM adjustment & air-fuel mix optimization</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions: Book Now & View Technical Details */}
              <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <button 
                  onClick={() => { 
                    setSelectedPackage({ name: 'General Service', price: '₹699' }); 
                    setIsPackageModalOpen(true); 
                  }} 
                  className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-zinc-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(234,179,8,0.35)] hover:shadow-[0_6px_22px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Book Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: 'General Service (₹699)', 
                      steps: [
                        'Complete 21-Point Vehicle Safety & Performance Inspection', 
                        'High-Pressure Eco Foam Wash & Deep Body Polish', 
                        'Front & Rear Brakes Cleaning, Pad Inspection & Clutch Play Adjustment', 
                        'Drive Chain Slack Calibration, Degreasing & Synthetic Lube', 
                        'Carburetor / Throttle Body Cleaning, Air-Fuel & Idle RPM Tuning', 
                        'Spark Plug Cleaning & Gap Verification', 
                        'Engine Oil Level & Viscosity Inspection', 
                        'Battery Voltage, Terminals & Charging System Check', 
                        'Tyre Air Pressure Check & Tread Wear Analysis'
                      ] 
                    }); 
                    setIsTechnicalDetailsOpen(true); 
                  }} 
                  className="w-full text-center text-xs font-bold text-gray-600 hover:text-yellow-600 dark:text-gray-300 dark:hover:text-yellow-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View Technical Details</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pkg 2: General Service + Engine Oil */}
            <div className="relative pt-4 flex flex-col h-full transform lg:-translate-y-3 lg:hover:-translate-y-4 transition-all duration-300">
              {/* Top Floating Badge (Outside overflow-hidden so it is never clipped) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center whitespace-nowrap">
                <div className="relative bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-zinc-950 font-black text-[10.5px] uppercase tracking-[0.16em] py-1.5 px-4 rounded-full shadow-[0_4px_16px_rgba(234,179,8,0.5)] flex items-center gap-1.5 border border-yellow-200">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                  </span>
                  <span>Most Popular • Recommended</span>
                </div>
              </div>

              <div className="bg-zinc-950 dark:bg-zinc-900 rounded-3xl border-2 border-yellow-400 p-6 sm:p-7 pt-7 sm:pt-8 flex flex-col shadow-2xl shadow-yellow-500/25 h-full relative group hover:-translate-y-1 transition-all duration-300 overflow-hidden ring-1 ring-yellow-400/50">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                  <Settings className="w-24 h-24 text-yellow-400" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 via-yellow-500/5 to-transparent pointer-events-none"></div>
                
                {/* Sub-header Badges */}
                <div className="flex items-center justify-between gap-2 mb-3 mt-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-extrabold text-[10.5px] uppercase tracking-wider border border-yellow-400/40">
                    <span>🛢️</span> Semi-Synthetic Included
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-400/30">
                    Save ₹151 (10% OFF)
                  </span>
                </div>

                {/* Header */}
                <div className="relative z-10 mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-yellow-500/25 rounded-2xl flex items-center justify-center text-yellow-400 ring-1 ring-yellow-400/40 shadow-inner">
                      <Settings className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '18s' }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-white">
                        General Service + Engine Oil
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400">
                        Offer Price: ₹1,349
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Banner */}
                <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-4 border-b border-white/10">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">₹1,349</span>
                  <span className="text-lg font-medium text-gray-400 line-through">₹1,500</span>
                  <span className="text-xs font-semibold text-yellow-400/90 bg-yellow-400/10 px-2 py-0.5 rounded-md border border-yellow-400/20">
                    Oil Included
                  </span>
                </div>

                {/* Key Highlights: Semi-Synthetic Engine Oil, Doorstep, 1 Month Warranty */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center group-hover:border-yellow-500/40 transition-colors">
                    <span className="text-lg mb-0.5">🛢️</span>
                    <span className="text-[11px] font-bold text-white leading-tight">Semi-Synthetic</span>
                    <span className="text-[9.5px] text-gray-400">Engine Oil</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center group-hover:border-yellow-500/40 transition-colors">
                    <span className="text-lg mb-0.5">🏠</span>
                    <span className="text-[11px] font-bold text-white leading-tight">At Your Doorstep</span>
                    <span className="text-[9.5px] text-gray-400">Zero Hassle</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center group-hover:border-yellow-500/40 transition-colors">
                    <span className="text-lg mb-0.5">🛡️</span>
                    <span className="text-[11px] font-bold text-white leading-tight">1 Month</span>
                    <span className="text-[9.5px] text-gray-400">Warranty</span>
                  </div>
                </div>
                
                {/* What's Included */}
                <div className="relative z-10 mb-6 flex-grow">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-white mb-3">
                    <span>What's Included:</span>
                    <span className="text-[10.5px] font-bold text-yellow-400 normal-case">Full Maintenance</span>
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-bold text-xs block">Everything in General Service</span>
                        <span className="text-[10.5px] text-gray-400">Complete vehicle inspection, wash, brakes, chain & carburetor tuning</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-yellow-300 font-bold text-xs block">Engine Oil Change</span>
                        <span className="text-[10.5px] text-gray-300">Fresh branded Semi-Synthetic engine oil (Motul / Castrol 4T)</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-bold text-xs block">Oil Filter Replacement (if applicable)</span>
                        <span className="text-[10.5px] text-gray-400">OEM specification filter cleaning or replacement for optimal pressure</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-bold text-xs block">Engine Flushing (if needed)</span>
                        <span className="text-[10.5px] text-gray-400">Safe flush treatment to remove carbon sludge and engine deposits</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-bold text-xs block">Spark Plug Check/Replace</span>
                        <span className="text-[10.5px] text-gray-400">Electrode gap verification, carbon cleanup or new plug fitment</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Actions: Book Now & View Technical Details */}
                <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-2 border-t border-white/10">
                  <button 
                    onClick={() => { 
                      setSelectedPackage({ name: 'General Service + Engine Oil', price: '₹1,349' }); 
                      setIsPackageModalOpen(true); 
                    }} 
                    className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-400 hover:from-yellow-300 hover:to-yellow-400 text-black font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_18px_rgba(234,179,8,0.45)] hover:shadow-[0_6px_25px_rgba(234,179,8,0.6)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => { 
                      setTechnicalDetailsContent({ 
                        title: 'General Service + Engine Oil (₹1,349)', 
                        steps: [
                          'Everything in General Service (Full 21-point vehicle safety & electrical inspection)',
                          'Eco Foam Wash, High-Gloss Polish & Degreasing',
                          'Semi-Synthetic Engine Oil Replacement (Motul / Castrol 4T API SN JASO MA2)',
                          'Engine Flushing Treatment to dissolve sludge & varnish (if applicable)',
                          'OEM Specification Oil Filter Check / Replacement',
                          'Brake Shoe/Pad Cleaning, Drum Dusting & Lever Slack Adjustment',
                          'Drive Chain Deep Cleaning, Tension Alignment & Heavy Synthetic Lubrication',
                          'Spark Plug Cleaning, Electrode Gap Calibration & Replacement check',
                          'Carburetor / Throttle Body Tuning & Idle RPM Optimization',
                          'Tyre Pressure & Battery Charging Voltage Test'
                        ] 
                      }); 
                      setIsTechnicalDetailsOpen(true); 
                    }} 
                    className="w-full text-center text-xs font-bold text-gray-300 hover:text-yellow-400 transition-colors py-2 rounded-lg hover:bg-white/5 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>View Technical Details</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pkg 3: Jump Start Service */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-amber-400/80 dark:border-amber-500/40 p-6 sm:p-7 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 h-full relative group hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Zap className="w-24 h-24 text-amber-500" />
              </div>

              {/* Floating Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-extrabold text-[11px] uppercase tracking-wider border border-amber-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  Quick Assistance
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] border border-emerald-500/20">
                  Save ₹201 (33% OFF)
                </span>
              </div>

              {/* Header */}
              <div className="relative z-10 mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-amber-500/15 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 ring-1 ring-amber-400/30">
                    <Zap className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span>Jump Start Service</span>
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      Offer Price: ₹399
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹399</span>
                <span className="text-lg font-medium text-gray-400 line-through">₹600</span>
                <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">/ doorstep rescue</span>
              </div>

              {/* Key Highlights: Available at Doorstep, Quick Assistance, Takes ~20 Mins */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 dark:border-amber-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">At Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Home/Office</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 dark:border-amber-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⚡</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Quick Assist</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Priority Rider</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 dark:border-amber-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">~20 Minutes</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Fast Service</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="relative z-10 mb-6 flex-grow">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  <span>What's Included:</span>
                  <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 normal-case">Complete Rescue</span>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Immediate Battery Jump Start</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Commercial grade 12V high-discharge booster safe for digital ECUs</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Battery Voltage & Health Test</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Digital multimeter analysis of cranking amp & cell retention</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Charging System / Alternator Check</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">RR unit & stator output check to prevent future battery drainage</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Terminals Cleaning & Anti-Rust Grease</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Sulphation removal, wire tightening and dielectric spray application</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions: Book Now & View Technical Details */}
              <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <button 
                  onClick={() => { 
                    setSelectedPackage({ name: 'Jump Start Service', price: '₹399' }); 
                    setIsPackageModalOpen(true); 
                  }} 
                  className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Book Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: 'Jump Start Service (₹399)', 
                      steps: [
                        'Heavy-Duty 12V Instant High-Cranking Booster Jump Start',
                        'Resting Voltage & Cranking Voltage Drop Diagnostic Test',
                        'Alternator / Magneto Coil Output Voltage Evaluation at 3000 RPM',
                        'RR (Rectifier Regulator) Health & Parasitic Battery Drain Check',
                        'Terminal Sulphation & Acid Corrosion Removal',
                        'Lead Wire Re-Torque & Anti-Oxidation Protective Coating',
                        'Approx ~20 Minutes On-Site Service Turnaround'
                      ] 
                    }); 
                    setIsTechnicalDetailsOpen(true); 
                  }} 
                  className="w-full text-center text-xs font-bold text-gray-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View Technical Details</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pkg 4: Puncture Repair */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-amber-400/80 dark:border-amber-500/40 p-6 sm:p-7 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 h-full relative group hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Disc className="w-24 h-24 text-amber-500" />
              </div>

              {/* Floating Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-extrabold text-[11px] uppercase tracking-wider border border-amber-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  Quick Assistance
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] border border-emerald-500/20">
                  Save ₹151 (20% OFF)
                </span>
              </div>

              {/* Header */}
              <div className="relative z-10 mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-amber-500/15 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 ring-1 ring-amber-400/30">
                    <span className="text-2xl leading-none">🛞</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span>Puncture Repair</span>
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      Offer Price: ₹599
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹599</span>
                <span className="text-lg font-medium text-gray-400 line-through">₹750</span>
                <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">/ 1 tyre puncture</span>
              </div>

              {/* Key Highlights: Available at Doorstep, 20 min service time, One Tyre Puncture */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 dark:border-amber-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">At Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Home/Road</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 dark:border-amber-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">20 Min Service</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Fast Arrival</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/15 dark:border-amber-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🛞</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">One Tyre Fix</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Tubeless/Tube</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="relative z-10 mb-6 flex-grow">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  <span>What's Included:</span>
                  <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 normal-case">Emergency Fix</span>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Available at Your Doorstep</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Prompt mechanic dispatch across Bangalore directly to your location</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">⏱️ 20 Min Service Time</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Rapid detection, extraction of nail/glass and instant airtight sealing</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">🛞 One Tyre Puncture Included</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Heavy-duty vulcanizing plug/patch for tubeless or spoke-tube tyres</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-400/40 dark:border-amber-400/30">
                    <span className="text-amber-600 dark:text-amber-400 font-black text-sm shrink-0 mt-0.5">➕</span>
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">₹100 Extra for Each Additional Puncture</span>
                      <span className="text-[10.5px] text-gray-700 dark:text-zinc-300">Just ₹100 extra per each additional puncture found on the tyre</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">PSI Air Inflation & Valve Check</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Digital pressure inflation to spec and Schrader valve core inspection</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions: Book Puncture Repair Now & View Technical Details */}
              <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <button 
                  onClick={() => { 
                    setSelectedPackage({ name: 'Puncture Repair', price: '₹599' }); 
                    setIsPackageModalOpen(true); 
                  }} 
                  className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Book Puncture Repair Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: 'Puncture Repair (₹599)', 
                      steps: [
                        'Doorstep Assistance at Home, Office, or Roadside in Bengaluru',
                        '⏱️ ~20 Minutes Quick Turnaround Time On-Site',
                        'Bubble Leak Diagnostic & Foreign Object (Nail/Glass) Removal',
                        '🛞 Complete One Tyre Puncture Repair using High-Grade Self-Vulcanizing Plug',
                        'Heavy-Duty Cold Vulcanizing Adhesive Application for Maximum Seal',
                        '➕ Transparent Rate: ₹100 Extra for Each Additional Tyre Puncture Found',
                        'Accurate Cold Tyre Pressure Inflation to OEM PSI Specs',
                        'Schrader Valve Core Tightening & Rim Bead Leak Inspection'
                      ] 
                    }); 
                    setIsTechnicalDetailsOpen(true); 
                  }} 
                  className="w-full text-center text-xs font-bold text-gray-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View Technical Details</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pkg 5: Running Repair */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border-2 border-yellow-400/80 dark:border-yellow-500/40 p-6 sm:p-7 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 h-full relative group hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Wrench className="w-24 h-24 text-yellow-500" />
              </div>

              {/* Floating Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-800 dark:text-yellow-300 font-extrabold text-[11px] uppercase tracking-wider border border-yellow-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                  Quick Diagnosis
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] border border-emerald-500/20">
                  Save ₹150 (25% OFF)
                </span>
              </div>

              {/* Header */}
              <div className="relative z-10 mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-yellow-500/15 dark:bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 ring-1 ring-yellow-400/30">
                    <span className="text-2xl leading-none">🔧</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span>Running Repair</span>
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-yellow-400">
                      Offer Price: ₹450
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹450</span>
                <span className="text-lg font-medium text-gray-400 line-through">₹600</span>
                <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">/ doorstep inspection</span>
              </div>

              {/* Key Highlights: Available at Doorstep, 20 min service time, Vehicle Inspection */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-yellow-500/5 dark:bg-yellow-400/5 border border-yellow-500/15 dark:border-yellow-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">At Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Home/Road</span>
                </div>
                <div className="p-2.5 rounded-xl bg-yellow-500/5 dark:bg-yellow-400/5 border border-yellow-500/15 dark:border-yellow-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">20 Min Service</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Fast Arrival</span>
                </div>
                <div className="p-2.5 rounded-xl bg-yellow-500/5 dark:bg-yellow-400/5 border border-yellow-500/15 dark:border-yellow-400/15 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🔍</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Inspection</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Multi-Point</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="relative z-10 mb-6 flex-grow">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  <span>What's Included:</span>
                  <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 normal-case">Quick Diagnosis</span>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">• Available at Your Doorstep</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Mechanic arrives at your doorstep across Bangalore for instant diagnosis</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">⏱️ 20 min service time</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Prompt diagnostic evaluation and quick on-site mechanic attendance</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">🔍 Vehicle Inspection</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">Complete multi-point check of brakes, clutch, spark plug, starting & chain</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-400/40 dark:border-amber-400/30">
                    <span className="text-amber-600 dark:text-amber-400 font-black text-sm shrink-0 mt-0.5">🛠️</span>
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Repairs & Parts at Additional Charges</span>
                      <span className="text-[10.5px] text-gray-700 dark:text-zinc-300">Minor fixes included; required spare parts charged transparently with your approval</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">Immediate Transparent Estimate</span>
                      <span className="text-[10.5px] text-gray-500 dark:text-zinc-400">100% upfront quote before any parts replacement or major overhaul</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions: Book Running Repair Now & View Technical Details */}
              <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <button 
                  onClick={() => { 
                    setSelectedPackage({ name: 'Running Repair', price: '₹450' }); 
                    setIsPackageModalOpen(true); 
                  }} 
                  className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 hover:from-yellow-400 hover:to-amber-400 text-zinc-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(234,179,8,0.35)] hover:shadow-[0_6px_22px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Book Running Repair Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: 'Running Repair (₹450)', 
                      steps: [
                        'Doorstep Assistance at Home, Office, or Roadside in Bengaluru',
                        '⏱️ ~20 Minutes Quick Turnaround Time On-Site',
                        '🔍 Comprehensive Multi-Point Vehicle Health Inspection',
                        'Starting Problem, Battery Voltage & Spark Diagnostic',
                        'Clutch & Throttle Free-Play Adjustment & Cable Lubrication',
                        'Front & Rear Brake Lever/Pedal Travel Inspection & Adjustment',
                        'Drive Chain Slack Check, Alignment & Lubrication',
                        'Loose Fastener, Nut & Bolt Tightening',
                        '🛠️ Transparent Pricing: Minor Adjustments Covered; Genuine Parts & Overhauls Charged with Prior Approval'
                      ] 
                    }); 
                    setIsTechnicalDetailsOpen(true); 
                  }} 
                  className="w-full text-center text-xs font-bold text-gray-600 hover:text-yellow-600 dark:text-gray-300 dark:hover:text-yellow-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View Technical Details</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      
      {/* ALL BIKE BRANDS SECTION */}
      <section id="brands" className="py-20 relative bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-white/5">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-yellow-500/[0.04] blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 dark:bg-yellow-500/15 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-black tracking-wider uppercase mb-4">
              <span className="text-sm">🏍️</span> Two-Wheelers Specialist
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              We Look After <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">All Brands</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              We service and repair all major two-wheeler brands at your doorstep across Bangalore.
            </p>
          </div>

          {/* Search and Category Filter Controls */}
          <div className="max-w-4xl mx-auto mb-10 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search brand or model (e.g. Royal Enfield, Activa, Ather)..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800 text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all shadow-sm"
              />
              {brandSearch && (
                <button
                  type="button"
                  onClick={() => setBrandSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {[
                { id: 'TwoWheelers', label: '🏍️ Two-Wheelers (12)' },
                { id: 'All', label: 'All Brands (25)' },
                { id: 'Popular', label: '🔥 Popular' },
                { id: 'Commuter', label: '🛵 Commuter & Scooters' },
                { id: 'Cruiser', label: '🏍️ Cruisers & Retro' },
                { id: 'Sports', label: '🏁 Sports & Premium' },
                { id: 'Electric', label: '⚡ Electric (EV)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setBrandFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    brandFilter === tab.id
                      ? 'bg-yellow-500 text-black shadow-sm font-black scale-105'
                      : 'bg-gray-100 hover:bg-gray-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Interactive Grid */}
          <div className="mb-12">
            {(() => {
              const filteredBrands = ALL_BRANDS_LIST.filter(brand => {
                const matchesSearch = 
                  brand.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
                  brand.tagline.toLowerCase().includes(brandSearch.toLowerCase()) ||
                  brand.badge.toLowerCase().includes(brandSearch.toLowerCase());
                
                if (!matchesSearch) return false;
                if (brandFilter === 'TwoWheelers') return brand.coreTwoWheeler;
                if (brandFilter === 'All') return true;
                if (brandFilter === 'Popular') return brand.popular;
                if (brandFilter === 'Commuter') return brand.category === 'Commuter' || brand.category === 'Scooter';
                if (brandFilter === 'Cruiser') return brand.category === 'Cruiser';
                if (brandFilter === 'Sports') return brand.category === 'Sports' || brand.category === 'Premium';
                if (brandFilter === 'Electric') return brand.category === 'Electric';
                return true;
              });

              if (filteredBrands.length === 0) {
                return (
                  <div className="text-center py-12 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 max-w-lg mx-auto">
                    <p className="text-gray-600 dark:text-gray-400 font-semibold mb-3">No brand found matching "{brandSearch}"</p>
                    <button
                      onClick={() => { setBrandSearch(''); setBrandFilter('All'); }}
                      className="text-xs font-bold text-yellow-600 dark:text-yellow-500 hover:underline"
                    >
                      Clear search and view all brands
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {filteredBrands.map(brand => {
                    const isSelected = heroBrand.toLowerCase() === brand.name.toLowerCase();
                    return (
                      <div
                        key={brand.name}
                        onClick={() => {
                          setHeroBrand(brand.name);
                          if (brand.category === 'Electric') {
                            setHeroVehicle('EV');
                          } else if (brand.category === 'Scooter') {
                            setHeroVehicle('Scooter');
                          } else {
                            setHeroVehicle('Bike');
                          }
                          setHeroModel('');
                          setBrandToast(`Selected ${brand.name}! Select your service & book mechanic.`);
                          setTimeout(() => setBrandToast(null), 3500);
                          const formElem = document.getElementById('booking-form');
                          if (formElem) {
                            formElem.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left ${
                          isSelected
                            ? 'bg-yellow-500/10 border-yellow-500 ring-2 ring-yellow-400/50 shadow-md'
                            : 'bg-white dark:bg-zinc-900/90 border-gray-200/90 dark:border-zinc-800 hover:border-yellow-400 dark:hover:border-yellow-500/60 hover:shadow-md hover:-translate-y-1'
                        }`}
                      >
                        {/* Top: Icon + Badge */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-xl group-hover:scale-110 transition-transform">{brand.icon}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            brand.category === 'Electric'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                              : isSelected
                              ? 'bg-yellow-500 text-black border-transparent font-black'
                              : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border-gray-200/60 dark:border-zinc-700'
                          }`}>
                            {brand.badge}
                          </span>
                        </div>

                        {/* Name */}
                        <div>
                          <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5">
                            {brand.name}
                            {isSelected && <Check className="w-4 h-4 text-yellow-500 stroke-[3]" />}
                          </h4>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-1 leading-snug">
                            {brand.tagline}
                          </p>
                        </div>

                        {/* Hover Prompt */}
                        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-bold text-yellow-600 dark:text-yellow-400 opacity-80 group-hover:opacity-100">
                          <span>{isSelected ? 'Selected' : 'Book Doorstep'}</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* "Don't see your brand?" Callout Card */}
          <div className="bg-gradient-to-r from-gray-50 via-yellow-500/[0.04] to-gray-50 dark:from-zinc-900 dark:via-yellow-500/[0.05] dark:to-zinc-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-zinc-800 text-center max-w-4xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mx-auto mb-4">
              <Bike className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">
              Don’t see your brand? No problem — we service most bikes and scooters.
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
              From vintage classics and custom builds to unlisted two-wheelers, our verified doorstep mechanics carry universal diagnostic scanners, specialty toolkits, and multi-brand spares.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#booking-form"
                onClick={(e) => {
                  e.preventDefault();
                  const formElem = document.getElementById('booking-form');
                  if (formElem) {
                    formElem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-black text-sm uppercase tracking-wider py-4 px-8 rounded-xl shadow-[0_4px_15px_rgba(234,179,8,0.3)] hover:shadow-[0_8px_25px_rgba(234,179,8,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                Book a doorstep mechanic in Bangalore today <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/917090400617?text=Hi%20YES%20BIKE%20SERVICE,%20I%20have%20a%20bike/scooter%20and%20wanted%20to%20check%20if%20doorstep%20service%20is%20available%20for%20my%20model."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 font-bold text-sm py-4 px-6 rounded-xl hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" /> Ask on WhatsApp
              </a>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-gray-200/80 dark:border-zinc-800 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 100% Genuine Spares
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-yellow-500 shrink-0" /> ~20 Min Arrival
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Background Verified
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Pay After Service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Brand Selection Toast */}
      {brandToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white border border-yellow-500/50 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{brandToast}</p>
            <p className="text-xs text-gray-400">Booking form updated above</p>
          </div>
          <button
            onClick={() => setBrandToast(null)}
            className="text-gray-400 hover:text-white ml-2 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* COVERAGE AREA SECTION */}
      <section id="areas" className="py-20 relative bg-white dark:bg-zinc-950 overflow-hidden border-t border-gray-100 dark:border-white/5">
        <div className="absolute inset-0 bg-yellow-50/50 dark:bg-yellow-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-500 text-xs font-bold tracking-wider uppercase mb-6">
                  <MapPin className="w-4 h-4" /> Doorstep Service Across Bangalore
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
                  We Cover 50+ Localities Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Bengaluru</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Our extensive network of verified mechanics ensures we reach your location in 20 mins, wherever you are in the city.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm"><MapPin className="w-4 h-4 text-emerald-500" /> Indiranagar</div>
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm"><MapPin className="w-4 h-4 text-emerald-500" /> Koramangala</div>
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm"><MapPin className="w-4 h-4 text-emerald-500" /> HSR Layout</div>
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm"><MapPin className="w-4 h-4 text-emerald-500" /> Whitefield</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent blur-3xl rounded-full"></div>
                <div className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl">
                  <img src={coverageMapUrl} alt="Bengaluru Coverage Map" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <div className="p-6 w-full flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        Live Tracking Available
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section className="py-24 relative bg-gray-50/70 dark:bg-zinc-950/60 overflow-hidden border-t border-gray-100 dark:border-white/5">
        {/* Subtle background ambient glows */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-yellow-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-yellow-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs font-black tracking-wider uppercase mb-4 border border-yellow-200/80 dark:border-yellow-500/20 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-current text-yellow-500" /> Customer Reviews
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              Loved by Riders. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Trusted Across Bengaluru.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              Real experiences from customers who chose expert doorstep service, transparent pricing, and zero workshop hassle.
            </p>

            {/* Google Reviews Trust Bar */}
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3 md:gap-6 py-2.5 px-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-sm text-xs font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-gray-900 dark:text-white">4.8</span>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <span className="hidden sm:inline text-gray-300 dark:text-zinc-700">•</span>
              <span className="text-gray-600 dark:text-gray-400">From <strong className="text-gray-900 dark:text-white">5,000+ reviews</strong> on Google</span>
              <span className="hidden sm:inline text-gray-300 dark:text-zinc-700">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Customers
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Review 1 - Rahul M. */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-yellow-400/60 dark:hover:border-yellow-500/40 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300">
              <div className="absolute top-6 right-6 text-yellow-500/20 group-hover:text-yellow-500/30 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 stroke-1 fill-current" />
              </div>

              <div>
                {/* Header tags: Vehicle & Locality */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-[11px] font-bold border border-yellow-200/60 dark:border-yellow-500/20">
                    🏍️ Royal Enfield
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-[11px] font-medium">
                    <MapPin className="w-3 h-3 text-red-500" /> Indiranagar
                  </span>
                </div>

                {/* Stars & Timing */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-zinc-500">2 days ago</span>
                </div>

                {/* Quote Content */}
                <p className="text-gray-700 dark:text-gray-300 font-medium text-base mb-6 leading-relaxed">
                  "Absolutely brilliant service. The mechanic arrived on time and fixed my Classic 350's engine issue right in my parking lot. Very transparent pricing."
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-5 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-black flex items-center justify-center text-sm shadow-md shadow-yellow-500/20 shrink-0">
                    RM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      Rahul M.
                      <span className="inline-flex items-center text-emerald-500" title="Verified Customer">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </h4>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Royal Enfield Owner</p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {/* Review 2 - Sneha K. */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-yellow-400/60 dark:hover:border-yellow-500/40 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300">
              <div className="absolute top-6 right-6 text-yellow-500/20 group-hover:text-yellow-500/30 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 stroke-1 fill-current" />
              </div>

              <div>
                {/* Header tags: Vehicle & Locality */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-[11px] font-bold border border-yellow-200/60 dark:border-yellow-500/20">
                    🛵 Honda Activa
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-[11px] font-medium">
                    <MapPin className="w-3 h-3 text-red-500" /> Koramangala
                  </span>
                </div>

                {/* Stars & Timing */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-zinc-500">4 days ago</span>
                </div>

                {/* Quote Content */}
                <p className="text-gray-700 dark:text-gray-300 font-medium text-base mb-6 leading-relaxed">
                  "So convenient! Didn't have to spend my weekend at the garage. The general service was quick, and my scooter feels as good as new."
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-5 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-black flex items-center justify-center text-sm shadow-md shadow-yellow-500/20 shrink-0">
                    SK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      Sneha K.
                      <span className="inline-flex items-center text-emerald-500" title="Verified Customer">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </h4>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Honda Activa Rider</p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
            </div>

            {/* Review 3 - Vikram S. */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-yellow-400/60 dark:hover:border-yellow-500/40 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300">
              <div className="absolute top-6 right-6 text-yellow-500/20 group-hover:text-yellow-500/30 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 stroke-1 fill-current" />
              </div>

              <div>
                {/* Header tags: Vehicle & Locality */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-[11px] font-bold border border-yellow-200/60 dark:border-yellow-500/20">
                    🏁 KTM Duke
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-[11px] font-medium">
                    <MapPin className="w-3 h-3 text-red-500" /> HSR Layout
                  </span>
                </div>

                {/* Stars & Timing */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-zinc-500">1 week ago</span>
                </div>

                {/* Quote Content */}
                <p className="text-gray-700 dark:text-gray-300 font-medium text-base mb-6 leading-relaxed">
                  "I was stuck with a dead battery in the middle of nowhere. Booked the jump start service, and they reached me in 15 mins. Lifesavers!"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-5 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-black flex items-center justify-center text-sm shadow-md shadow-yellow-500/20 shrink-0">
                    VS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      Vikram S.
                      <span className="inline-flex items-center text-emerald-500" title="Verified Customer">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </h4>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">KTM Duke Owner</p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Guarantees */}
          <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6 text-xs font-bold text-gray-700 dark:text-gray-300">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-yellow-500" /> ~20 Min Arrival
              </span>
              <span className="hidden sm:inline text-gray-300 dark:text-zinc-700">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-blue-500" /> 100% Genuine Spares
              </span>
              <span className="hidden sm:inline text-gray-300 dark:text-zinc-700">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-emerald-500" /> Pay After Service
              </span>
              <span className="hidden sm:inline text-gray-300 dark:text-zinc-700">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-purple-500" /> 30-Day Service Warranty
              </span>
            </div>

            <a
              href="#home"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-yellow-500 hover:text-black dark:bg-white dark:text-black dark:hover:bg-yellow-400 text-white text-xs font-extrabold transition-all shadow-sm shrink-0"
            >
              Book Doorstep Mechanic <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section id="faq" className="py-20 relative bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Questions</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
              Everything you need to know about our doorstep service.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "1. What is doorstep bike service?",
                a: "Doorstep bike service brings professional two-wheeler repair and maintenance directly to your home, office, or roadside. Our verified mechanics arrive fully equipped with tools and genuine parts.",
                icon: Home
              },
              {
                q: "2. Which brands do you service?",
                a: "We service all major brands including Royal Enfield, Honda, Yamaha, KTM, Bajaj, TVS, Suzuki, Hero, and electric scooters like Ather and Ola.",
                icon: Bike
              },
              {
                q: "3. How do I book a mechanic?",
                a: "Simply fill out the booking form on our website with your vehicle details, preferred time, and Bangalore location. Our mechanic will be assigned and reach in 20 mins or at your scheduled slot.",
                icon: Calendar
              },
              {
                q: "4. Do I need to provide tools?",
                a: "No, our mechanics carry a full mobile workshop with all necessary tools, diagnostics, and genuine consumables. You just need to provide space to park and work on the vehicle.",
                icon: Wrench
              },
              {
                q: "5. How long does a service take?",
                a: "A general service typically takes between 60 to 90 minutes. Quick emergency jump-start services take only 15 to 20 minutes.",
                icon: Clock
              }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              const IconComponent = faq.icon;
              return (
                <div 
                  key={index}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'bg-white dark:bg-zinc-900 border-yellow-400/80 dark:border-yellow-500/50 shadow-md ring-1 ring-yellow-400/20'
                      : 'bg-gray-50 dark:bg-zinc-900/60 border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 font-bold text-base md:text-lg text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 md:gap-4 min-w-0">
                      <div className={`shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                          ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/25 scale-105 border border-yellow-400' 
                          : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-500/20 group-hover:scale-105 border border-yellow-500/15'
                      }`}>
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className={`transition-colors duration-200 leading-snug ${isOpen ? 'text-yellow-600 dark:text-yellow-400' : ''}`}>
                        {faq.q}
                      </span>
                    </div>

                    <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'rotate-180 bg-yellow-500 text-black shadow-sm' 
                        : 'rotate-0 bg-white dark:bg-zinc-800 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white'
                    }`}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </span>
                  </button>
                  
                  {/* Smooth animated accordion drawer */}
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-6 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-zinc-800/60 pt-4 pl-5 md:pl-[4.25rem]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-[#0A0D14] text-zinc-300 pt-14 pb-16 lg:pt-18 lg:pb-20 border-t border-zinc-800/90 relative overflow-hidden shadow-2xl">
        {/* Sleek luminous golden accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-80 pointer-events-none"></div>

        {/* Subtle background ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/[0.05] blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Pre-Footer Fast-Assistance Banner */}
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-yellow-500/20 via-zinc-900/95 to-amber-500/20 border border-yellow-500/35 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-black flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/30">
                <Bike className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[11px] font-black uppercase tracking-wider mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Instant Doorstep Mechanic in Bangalore
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Stuck with bike breakdown or need scheduled service?
                </h3>
                <p className="text-sm text-zinc-300 font-medium mt-0.5">
                  Our certified mechanics reach your location within ~20 minutes with genuine tools & spares.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="tel:+917090400617"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800/90 hover:bg-yellow-400 hover:text-black text-white text-xs sm:text-sm font-black transition-all shadow-md border border-zinc-700 hover:border-yellow-400 transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-yellow-400 group-hover:text-black" />
                <span>Call +91 70904 00617</span>
              </a>
              <a
                href="https://wa.me/917090400617?text=Hi%20YES%20BIKE%20SERVICE%20Team%2C%20I%20need%20doorstep%20bike%20service%20in%20Bangalore."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm font-black transition-all shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Help</span>
              </a>
              <button
                onClick={() => {
                  const form = document.getElementById('booking-form') || document.getElementById('home');
                  if (form) form.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-black text-xs sm:text-sm font-black transition-all shadow-lg shadow-yellow-500/25 transform hover:-translate-y-0.5"
              >
                <span>Book Mechanic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
            
            {/* Column 1: Brand & Bio (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30 shrink-0 ring-2 ring-yellow-400/30">
                  <Wrench className="h-6 w-6 text-black stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight text-white block leading-tight">
                    YES BIKE SERVICE
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    Doorstep Two-Wheeler Care
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-normal">
                Bengaluru's trusted doorstep two-wheeler service network. Certified mechanics bring the garage to your home, office, or roadside with 100% genuine spares and transparent pricing.
              </p>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="tel:+917090400617"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-850 hover:bg-yellow-400 hover:text-black text-white text-xs font-extrabold transition-all shadow-sm border border-zinc-700/80 transform hover:-translate-y-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-yellow-400 group-hover:text-black" />
                  Call +91 70904 00617
                </a>
                <a
                  href="https://wa.me/917090400617?text=Hi%20YES%20BIKE%20SERVICE%20Team%2C%20I%20need%20doorstep%20bike%20service%20in%20Bangalore."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-white text-emerald-400 border border-emerald-500/30 text-xs font-extrabold transition-all shadow-sm transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp Support
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-zinc-300 pt-1">
                <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-800/90 shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Verified Mechanics
                </span>
                <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-800/90 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  ~20 Min Arrival
                </span>
                <span className="inline-flex items-center gap-1.5 bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-800/90 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  Transparent Pricing
                </span>
              </div>

              {/* Payment Methods Accepted */}
              <div className="pt-2 border-t border-zinc-800/80">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-yellow-400" />
                  100% Pay After Service • All Modes Accepted
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-black text-zinc-300">
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">UPI</span>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">Google Pay</span>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">PhonePe</span>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">Paytm</span>
                  <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">Cash on Service</span>
                </div>
              </div>
            </div>
            
            {/* Column 2: Quick Links (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-5 pb-2 border-b border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-xs shadow-yellow-400/50"></span>
                <h4 className="font-extrabold text-white uppercase tracking-wider text-xs">
                  Quick Links
                </h4>
              </div>
              <ul className="space-y-3 text-sm font-medium">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Services', href: '#services' },
                  { label: 'Brands We Service', href: '#brands' },
                  { label: 'Bangalore Areas', href: '#areas' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'Customer Reviews', href: '#reviews' },
                  { label: 'FAQ', href: '#faq' }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-all hover:translate-x-1"
                    >
                      <span className="text-yellow-400 font-bold text-base leading-none">›</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Dispatch (lg:col-span-4) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-5 pb-2 border-b border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-xs shadow-yellow-400/50"></span>
                <h4 className="font-extrabold text-white uppercase tracking-wider text-xs">
                  Contact & Dispatch
                </h4>
              </div>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-3 text-zinc-300">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5 border border-yellow-500/25">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">Bangalore, Karnataka, India</span>
                    <span className="text-xs text-zinc-400 font-medium">Serving 50+ Localities City-wide</span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/25">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <a
                      href="tel:+917090400617"
                      className="font-black text-white hover:text-yellow-400 transition-colors block text-sm"
                    >
                      +91 70904 00617
                    </a>
                    <span className="text-[11px] font-semibold text-emerald-400">Click to call directly</span>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/25">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <a
                      href="mailto:help@yesbikeservice.in"
                      className="font-bold text-white hover:text-yellow-400 transition-colors block text-sm"
                    >
                      help@yesbikeservice.in
                    </a>
                    <span className="text-[11px] font-medium text-zinc-400">24/7 email response</span>
                  </div>
                </li>

                <li className="flex items-center gap-3 text-zinc-300">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/15 text-yellow-400 flex items-center justify-center shrink-0 border border-yellow-500/25">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">Everyday: 7:00 AM - 10:00 PM</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">Mechanics on duty now</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Popular Bangalore Localities Covered Strip */}
          <div className="mb-12 pt-8 pb-4 border-t border-zinc-800/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Popular Bangalore Localities Covered (Click to Select)
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                ~20 Minute Mechanic Dispatch to all 50+ areas
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Indiranagar", "Koramangala", "HSR Layout", "Whitefield", 
                "Jayanagar", "Electronic City", "Marathahalli", "BTM Layout", 
                "Bellandur", "Hebbal", "JP Nagar", "Malleshwaram", 
                "Bannerghatta Road", "Sarjapur Road", "Yelahanka"
              ].map((locality) => (
                <button
                  key={locality}
                  onClick={() => {
                    setLocationSearch(locality);
                    const form = document.getElementById('booking-form') || document.getElementById('home');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-yellow-500 hover:text-yellow-300 hover:bg-zinc-800 transition-all hover:scale-105 shadow-xs cursor-pointer"
                >
                  📍 {locality}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bottom Bar: Legal, Copyright & Back to Top */}
          <div className="pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
            <div className="flex flex-wrap items-center gap-3 text-center md:text-left">
              <span className="font-bold text-zinc-200">
                © {new Date().getFullYear()} YES BIKE SERVICE. All rights reserved.
              </span>
              <span className="hidden sm:inline text-zinc-700">•</span>
              <span className="text-zinc-400 font-medium">Bengaluru's Trusted Doorstep Two-Wheeler Care</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 font-semibold">
                <button
                  onClick={() => { setCurrentView('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-zinc-400 hover:text-yellow-400 underline-offset-4 hover:underline transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span className="text-zinc-700">|</span>
                <button
                  onClick={() => { setCurrentView('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-zinc-400 hover:text-yellow-400 underline-offset-4 hover:underline transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-850 hover:bg-yellow-400 hover:text-black text-zinc-200 font-bold transition-all shadow-sm border border-zinc-750 cursor-pointer"
                aria-label="Back to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* QUICK CONTACT BOTTOM BAR (MOBILE) */}
      {/* PACKAGE BOOKING MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-[280px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-zinc-800">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-zinc-800">
              <div className="w-full">
                <h3 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-0.5">Book Online</h3>
                {selectedPackage && (
                  <div className="bg-gray-50 dark:bg-zinc-950 rounded-lg p-3 border border-gray-100 dark:border-zinc-800 mb-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {selectedPackage.name}
                    </p>
                    <p className="text-lg font-extrabold tracking-tight text-yellow-600 dark:text-yellow-500">{selectedPackage.price}</p>
                  </div>
                )}
              </div>
              <button onClick={() => setIsPackageModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors self-start bg-gray-100 dark:bg-zinc-800 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
              <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              const fullName = (formData.get('fullName') as string) || 'Customer';
              const phone = (formData.get('phone') as string) || '';
              const location = (formData.get('location') as string) || 'Bengaluru';
              const vehicleType = (formData.get('vehicleType') as string) || 'Bike';
              const date = (formData.get('date') as string) || 'Today';
              const time = (formData.get('time') as string) || 'ASAP';
              const brand = (formData.get('brand') as string) || modalBrand || 'General';
              const model = (formData.get('model') as string) || 'Model';
              
              const pkgName = selectedPackage ? selectedPackage.name : 'Selected Service';
              const pkgPrice = selectedPackage ? selectedPackage.price : '₹699';
              const bookingId = `YB-${Math.floor(10000 + Math.random() * 90000)}`;

              setBookingConfirmedData({
                bookingId,
                fullName,
                phone,
                vehicle: vehicleType,
                brand,
                model,
                location,
                service: `${pkgName} (${pkgPrice})`,
                timing: `Scheduled: ${date} at ${time}`,
                estimatedPrice: pkgPrice,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              });
              
              const message = `🏍️ 🛵 NEW BOOKING RECEIVED!

Hello YES BIKE SERVICE Team 👋

📋 Booking Reference: ${bookingId}
👤 Customer: ${fullName}
📞 Phone: +91 ${phone}
📍 Location: ${location}
🏍️ Vehicle: ${vehicleType} - ${brand} ${model}
🔧 Service: ${pkgName} (${pkgPrice})
🕐 Preferred Time: ${date} at ${time}

✅ Doorstep Mechanic Assigned!
YES BIKE SERVICE - Doorstep Service Bengaluru`;
              
              const whatsappNumber = "917090400617"; 
              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
              setIsPackageModalOpen(false);
              setCurrentView('booking-success');
              window.scrollTo(0, 0);
              if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                (window as any).gtag_report_conversion();
              }
            }} className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                            <div className="flex bg-gray-100 dark:bg-zinc-950 p-1 rounded-xl border border-gray-200 dark:border-zinc-800">
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Bike" defaultChecked className="peer sr-only" />
                  <div className="py-1 text-[12px] font-bold rounded-lg transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-zinc-800 peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    🏍️ Bike
                  </div>
                </label>
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Scooter" className="peer sr-only" />
                  <div className="py-1 text-[12px] font-bold rounded-lg transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-zinc-800 peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    🛵 Scooter
                  </div>
                </label>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Tag className="h-4 w-4" />
                    </div>
                    <select name="brand" required value={modalBrand} onChange={(e) => setModalBrand(e.target.value)} className="w-full pl-10 pr-10 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-950 transition-all text-[12px] font-semibold shadow-sm appearance-none cursor-pointer">
                       <option value="" disabled>Select Brand</option>
                       {Object.keys(MODELS_BY_BRAND).map(brand => (
                         <option key={brand} value={brand}>{brand}</option>
                       ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Bike className="h-4 w-4" />
                    </div>
                    <select name="model" required defaultValue="" className="w-full pl-10 pr-10 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-950 transition-all text-[12px] font-semibold shadow-sm appearance-none cursor-pointer" disabled={!modalBrand}>
                       <option value="" disabled>Select Model</option>
                       {modalBrand && MODELS_BY_BRAND[modalBrand]?.map(model => (
                         <option key={model} value={model}>{model}</option>
                       ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    <input type="text" name="fullName" required placeholder="Full Name" className="w-full pl-10 pr-4 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-950 transition-all text-[12px] font-semibold shadow-sm" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="Phone Number" className="w-full pl-10 pr-4 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-950 transition-all text-[12px] font-semibold shadow-sm" />
                  </div>
                </div>
                
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <textarea name="location" required placeholder="Full Address, Bengaluru" className="w-full pl-10 pr-4 py-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-950 transition-all text-[12px] font-semibold shadow-sm resize-none h-[50px]"></textarea>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <select name="service" required defaultValue="" className="w-full pl-10 pr-10 py-1 rounded-[10px] border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-950 transition-all text-[11px] font-semibold shadow-sm appearance-none cursor-pointer">
                       <option value="" disabled>Select Service Type</option>
                       {QUICK_SERVICE_OPTIONS.map((opt) => (
                         <option key={opt.id} value={opt.id}>{opt.name} - {opt.price}</option>
                       ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} defaultValue={new Date().toISOString().split('T')[0]} className="w-full pl-10 pr-2 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[11.5px] font-semibold cursor-pointer" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Clock className="h-4 w-4" />
                    </div>
                    <select name="time" required defaultValue="Immediate (Next 20 Mins)" className="w-full pl-10 pr-7 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[11.5px] font-semibold appearance-none cursor-pointer">
                      <option value="Immediate (Next 20 Mins)">⚡ In 20 Mins (Now)</option>
                      <option value="Morning (09:00 AM - 12:00 PM)">🌅 Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12:00 PM - 03:00 PM)">☀️ Afternoon (12 PM - 3 PM)</option>
                      <option value="Evening (03:00 PM - 06:00 PM)">🌆 Evening (3 PM - 6 PM)</option>
                      <option value="Late Evening (06:00 PM - 08:00 PM)">🌙 Late (6 PM - 8 PM)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full relative group overflow-hidden bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-[14px] py-2.5 px-4 rounded-xl shadow-[0_4px_14px_rgba(234,179,8,0.3)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.4)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-4">
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 flex items-center justify-center w-full">
                  {packageSuccess ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 animate-in zoom-in" />
                      Request Sent!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Confirm Booking <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* TECHNICAL DETAILS MODAL */}
      {(showTechDetails || isTechnicalDetailsOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => {
              setShowTechDetails(false);
              setIsTechnicalDetailsOpen(false);
            }}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-yellow-500/15 dark:bg-yellow-500/20 rounded-xl text-yellow-600 dark:text-yellow-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">
                    {technicalDetailsContent.title || "Service Specifications"}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Doorstep checklist, technical specifications & warranty terms
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowTechDetails(false);
                  setIsTechnicalDetailsOpen(false);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              {/* If package specific steps exist */}
              {technicalDetailsContent.steps && technicalDetailsContent.steps.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-black tracking-wider text-gray-900 dark:text-white uppercase flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-yellow-500" /> Included Service Checklist
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      {technicalDetailsContent.steps.length} Inspection Points
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {technicalDetailsContent.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-700/60 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-800 dark:text-zinc-200 font-semibold">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Genuine Spares */}
              <div>
                <h4 className="text-xs font-black tracking-wider text-gray-900 dark:text-white uppercase mb-3 flex items-center gap-2">
                  <Cog className="w-4 h-4 text-yellow-500" /> 100% Genuine Parts & Consumables
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900/50">
                    <p className="font-bold text-gray-900 dark:text-white text-xs mb-0.5">Engine Oil Standards</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Motul / Castrol (API SN, JASO MA2)</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900/50">
                    <p className="font-bold text-gray-900 dark:text-white text-xs mb-0.5">Brake Pads & Liners</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">OEM / Brembo / ByBre certified</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900/50">
                    <p className="font-bold text-gray-900 dark:text-white text-xs mb-0.5">Spark Plugs</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">NGK / Bosch Iridium & Copper</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900/50">
                    <p className="font-bold text-gray-900 dark:text-white text-xs mb-0.5">Filters & Cables</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">OEM High-Flow filtration specs</p>
                  </div>
                </div>
              </div>
              
              {/* Mechanic Certification & Warranty */}
              <div>
                <h4 className="text-xs font-black tracking-wider text-gray-900 dark:text-white uppercase mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-500" /> Mechanic Certification & 1-Month Warranty
                </h4>
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-900/10">
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-emerald-950 dark:text-emerald-100 font-medium">
                        <strong>1 Month / 1000 KM Warranty</strong> on all tuning, adjustments & workmanship.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-emerald-950 dark:text-emerald-100 font-medium">
                        Certified technicians with minimum 5+ years multi-brand workshop experience.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-emerald-950 dark:text-emerald-100 font-medium">
                        Background verified, police-cleared, equipped with specialized toolkit and digital torque wrenches.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 flex items-center justify-between gap-3">
              <button 
                onClick={() => {
                  setShowTechDetails(false);
                  setIsTechnicalDetailsOpen(false);
                  setSelectedPackage({ name: 'General Service', price: '₹699' });
                  setIsPackageModalOpen(true);
                }}
                className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Book General Service (₹699)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => {
                  setShowTechDetails(false);
                  setIsTechnicalDetailsOpen(false);
                }}
                className="px-5 py-2.5 bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 font-bold text-xs rounded-xl hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* SUCCESS / BOOKING CONFIRMED RECEIPT VIEW */}
      {(heroSuccess || currentView === 'booking-success') && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-7 max-w-md w-full my-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-500"></div>

            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                    Booking Confirmed!
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
                    Mechanic assigned & dispatching in Bengaluru
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setHeroSuccess(false);
                  setCurrentView('home');
                  window.scrollTo(0, 0);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center text-gray-500 dark:text-zinc-400 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Booking Reference ID & Live status badge */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200/60 dark:border-zinc-700/60">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400">Booking ID:</span>
                <span className="font-mono font-black text-xs sm:text-sm text-yellow-600 dark:text-yellow-400">
                  {bookingConfirmedData?.bookingId || 'YB-74921'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(bookingConfirmedData?.bookingId || 'YB-74921');
                    setCopiedBookingId(true);
                    setTimeout(() => setCopiedBookingId(false), 2000);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded cursor-pointer"
                  title="Copy ID"
                >
                  {copiedBookingId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Mechanic Dispatched</span>
              </div>
            </div>

            {/* Dispatch Progress Steps */}
            <div className="mt-3.5 p-3 rounded-2xl bg-amber-50/60 dark:bg-yellow-500/5 border border-amber-200/60 dark:border-yellow-500/20">
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-amber-900 dark:text-yellow-400 mb-2.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Doorstep Dispatch Status
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                  <span className="font-semibold text-gray-900 dark:text-white">Service Request Registered</span>
                  <span className="ml-auto text-[10px] text-gray-400 font-mono">{bookingConfirmedData?.timestamp || 'Just now'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 text-black flex items-center justify-center text-[9px] font-bold animate-pulse">⚡</div>
                  <span className="font-semibold text-gray-900 dark:text-white">Mechanic Contacting Customer</span>
                  <span className="ml-auto text-[10px] font-bold text-amber-600 dark:text-yellow-400">Within 10 Mins</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-zinc-500">
                  <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-500 flex items-center justify-center text-[9px] font-bold">3</div>
                  <span>Doorstep Service & Transparent Billing</span>
                  <span className="ml-auto text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Verified</span>
                </div>
              </div>
            </div>

            {/* Booking Details Card */}
            <div className="mt-3.5 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block">Vehicle</span>
                  <span className="font-bold text-gray-900 dark:text-white text-[12.5px] truncate block">
                    {bookingConfirmedData ? `${bookingConfirmedData.vehicle} • ${bookingConfirmedData.brand} ${bookingConfirmedData.model}` : 'Bike • Hero Splendor'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block">Service Selected</span>
                  <span className="font-bold text-gray-900 dark:text-white text-[12.5px] truncate block">
                    {bookingConfirmedData?.service || 'General Service - ₹699'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block">Customer</span>
                  <span className="font-semibold text-gray-900 dark:text-white block truncate">
                    {bookingConfirmedData?.fullName || 'Customer'}
                  </span>
                  <span className="text-gray-500 dark:text-zinc-400 block text-[11px]">
                    +91 {bookingConfirmedData?.phone || '7090400617'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block">Timing / Location</span>
                  <span className="font-semibold text-gray-900 dark:text-white line-clamp-1 block">
                    {bookingConfirmedData?.location || 'Bengaluru'}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-[10px] mt-0.5">
                    {bookingConfirmedData?.timing || 'Doorstep Service (Bengaluru)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 space-y-2">
              <a
                href={`https://wa.me/917090400617?text=${encodeURIComponent(
                  `Hi YES BIKE SERVICE, I just submitted Booking Reference ${bookingConfirmedData?.bookingId || 'YB-74921'} for my ${bookingConfirmedData?.vehicle || 'Bike'} (${bookingConfirmedData?.brand || ''} ${bookingConfirmedData?.model || ''}) at ${bookingConfirmedData?.location || 'Bengaluru'}. Please confirm mechanic arrival time.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Dispatcher on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:917090400617"
                  className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  Call Support
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setHeroSuccess(false);
                    setCurrentView('home');
                    window.scrollTo(0, 0);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs flex items-center justify-center gap-1 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/917090400617?text=Hi,%20I%20need%20help%20with%20my%20bike" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute inset-0 w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30"></div>
        <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
      </main>
      )}
    </div>
  );
}

