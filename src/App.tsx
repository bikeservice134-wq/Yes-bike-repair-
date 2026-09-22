import React, { useState, useEffect } from 'react';
import { 
  Wrench, Clock, Shield, ThumbsUp, MousePointerClick, Star, CheckCircle2, ChevronDown, ChevronUp, MapPin, 
  Phone, PhoneCall, User, Smartphone, Settings, Tag, Bike, X, ArrowRight, ArrowDown, ArrowUp, Mail, Instagram, Facebook, Twitter, Sun, Moon, Map, MessageCircle, Calendar, Banknote, Wallet, Zap, Cog, Copy, Check, Navigation, Disc, Search, Home, Quote } from 'lucide-react';
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

// India Standard Time (IST - Asia/Kolkata) Helpers
export const getTodayIST = (): string => {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
  } catch {
    return new Date().toISOString().split('T')[0];
  }
};

export const getCurrentISTTime = (): string => {
  try {
    const timeStr = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date());
    return `${timeStr} IST`;
  } catch {
    return `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST`;
  }
};

export const getCurrentTimeHHMM = (): string => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date());
  } catch {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
};

const QUICK_SERVICE_OPTIONS = [
  { id: "General Service - ₹699", name: "General Service", price: "₹699", note: "21-point checkup, tuning & washing", badge: "Most Popular" },
  { id: "General Service + Engine Oil - ₹1,349", name: "General Service + Engine Oil", price: "₹1,349", note: "Includes 100% genuine Castrol/Motul oil", badge: "Best Value" },
  { id: "Jump Start Service - ₹399", name: "Jump Start Service", price: "₹399", note: "Roadside battery jump start at your location", badge: "Express" },
  { id: "Puncture Repair - ₹599", name: "Puncture Repair", price: "₹599", note: "Doorstep tyre puncture fix at your location", badge: "Express" },
  { id: "Running Repair - ₹450", name: "Running Repair", price: "₹450", note: "Vehicle inspection & quick repairs at doorstep", badge: "Quick Fix" },
];

export interface LocalityItem {
  name: string;
  zone: 'South' | 'East' | 'North' | 'Central & West';
  eta: string;
  landmark: string;
  activeCount: number;
}

export const BENGALURU_LOCALITIES: LocalityItem[] = [
  // South
  { name: 'Koramangala', zone: 'South', eta: '20-30 min', landmark: 'Sony World / 4th-8th Block', activeCount: 6 },
  { name: 'HSR Layout', zone: 'South', eta: '20-30 min', landmark: '27th Main / Sectors 1-7', activeCount: 5 },
  { name: 'BTM Layout', zone: 'South', eta: '20-30 min', landmark: 'Udupi Garden / Ring Road', activeCount: 4 },
  { name: 'Jayanagar', zone: 'South', eta: '20-30 min', landmark: '3rd, 4th & 9th Blocks', activeCount: 4 },
  { name: 'JP Nagar', zone: 'South', eta: '25-30 min', landmark: 'Phases 1 to 8', activeCount: 4 },
  { name: 'Electronic City', zone: 'South', eta: '25-30 min', landmark: 'Phase 1 & Phase 2 / Wipro', activeCount: 5 },
  { name: 'Bannerghatta Road', zone: 'South', eta: '25-30 min', landmark: 'Arekere / Meenakshi Mall', activeCount: 3 },
  { name: 'Banashankari', zone: 'South', eta: '25-30 min', landmark: 'BSK 2nd & 3rd Stage', activeCount: 3 },
  { name: 'Begur & Singasandra', zone: 'South', eta: '25-30 min', landmark: 'Hosur Road Corridor', activeCount: 3 },
  { name: 'Kudlu Gate', zone: 'South', eta: '20-30 min', landmark: 'Haralur Road Junction', activeCount: 3 },
  { name: 'Kasavanahalli', zone: 'South', eta: '20-30 min', landmark: 'Sarjapur ORR Link', activeCount: 3 },
  { name: 'Kumaraswamy Layout', zone: 'South', eta: '25-30 min', landmark: 'Dayananda Sagar Area', activeCount: 2 },
  { name: 'Arekere & Hulimavu', zone: 'South', eta: '25-30 min', landmark: 'BG Road Lakeside', activeCount: 3 },

  // East
  { name: 'Indiranagar', zone: 'East', eta: '20-30 min', landmark: '100ft Road / 12th Main', activeCount: 6 },
  { name: 'Whitefield', zone: 'East', eta: '25-30 min', landmark: 'ITPB / Hope Farm / Nexus', activeCount: 5 },
  { name: 'Marathahalli', zone: 'East', eta: '20-30 min', landmark: 'Bridge / Multiplex Corridor', activeCount: 4 },
  { name: 'Bellandur', zone: 'East', eta: '20-30 min', landmark: 'EcoSpace / Outer Ring Road', activeCount: 5 },
  { name: 'Sarjapur Road', zone: 'East', eta: '25-30 min', landmark: 'Wipro Campus / Carmelaram', activeCount: 4 },
  { name: 'CV Raman Nagar', zone: 'East', eta: '20-30 min', landmark: 'DRDO / Bagmane Tech Park', activeCount: 3 },
  { name: 'Mahadevapura', zone: 'East', eta: '20-30 min', landmark: 'Phoenix Marketcity', activeCount: 4 },
  { name: 'Brookefield', zone: 'East', eta: '20-30 min', landmark: 'AECS Layout / ITPL Main', activeCount: 3 },
  { name: 'Hoodi', zone: 'East', eta: '25-30 min', landmark: 'Hoodi Circle / IT Corridor', activeCount: 3 },
  { name: 'KR Puram', zone: 'East', eta: '25-30 min', landmark: 'Hanging Bridge / Tin Factory', activeCount: 3 },
  { name: 'Kaggadasapura', zone: 'East', eta: '20-30 min', landmark: 'Near DRDO Complex', activeCount: 2 },
  { name: 'Domlur', zone: 'East', eta: '20-30 min', landmark: 'Embassy GolfLinks (EGL)', activeCount: 3 },
  { name: 'Varthur', zone: 'East', eta: '25-30 min', landmark: 'Gunjur / Balagere Road', activeCount: 2 },
  { name: 'Murugeshpalya', zone: 'East', eta: '20-30 min', landmark: 'Old Airport Road', activeCount: 3 },

  // North
  { name: 'Hebbal', zone: 'North', eta: '25-30 min', landmark: 'Flyover / Esteem Mall', activeCount: 4 },
  { name: 'Yelahanka', zone: 'North', eta: '25-30 min', landmark: 'New Town & Old Town', activeCount: 3 },
  { name: 'Kalyan Nagar', zone: 'North', eta: '20-30 min', landmark: 'HRBR Layout / CMR Road', activeCount: 4 },
  { name: 'Manyata Tech Park', zone: 'North', eta: '20-30 min', landmark: 'Nagawara / ORR Junction', activeCount: 5 },
  { name: 'RT Nagar', zone: 'North', eta: '20-30 min', landmark: 'Dinnur Main / Post Office', activeCount: 3 },
  { name: 'Sahakar Nagar', zone: 'North', eta: '25-30 min', landmark: 'Kodigehalli / CQAL', activeCount: 3 },
  { name: 'Sanjay Nagar', zone: 'North', eta: '25-30 min', landmark: 'RMV 2nd Stage', activeCount: 2 },
  { name: 'Kammanahalli', zone: 'North', eta: '20-30 min', landmark: 'Nehru Road / Ramaiah', activeCount: 3 },
  { name: 'Hennur Road', zone: 'North', eta: '25-30 min', landmark: 'Biozeen / Geddalahalli', activeCount: 3 },
  { name: 'Thanisandra', zone: 'North', eta: '25-30 min', landmark: 'Bhartiya City Corridor', activeCount: 3 },
  { name: 'Banaswadi', zone: 'North', eta: '20-30 min', landmark: 'Subramanya Temple Road', activeCount: 3 },
  { name: 'Horamavu', zone: 'North', eta: '25-30 min', landmark: 'Kalkere / Ring Road Link', activeCount: 2 },

  // Central & West
  { name: 'MG Road & Brigade', zone: 'Central & West', eta: '20-30 min', landmark: 'CBD Commercial Hub', activeCount: 4 },
  { name: 'Richmond Town', zone: 'Central & West', eta: '20-30 min', landmark: 'Langford Town / Victoria', activeCount: 3 },
  { name: 'Malleshwaram', zone: 'Central & West', eta: '20-30 min', landmark: 'Sampige & Margosa Road', activeCount: 4 },
  { name: 'Rajajinagar', zone: 'Central & West', eta: '20-30 min', landmark: 'Navrang / Orion Mall', activeCount: 4 },
  { name: 'Basavanagudi', zone: 'Central & West', eta: '20-30 min', landmark: 'Gandhi Bazaar / DVG Road', activeCount: 3 },
  { name: 'Vijayanagar', zone: 'Central & West', eta: '25-30 min', landmark: 'RPC Layout / Water Tank', activeCount: 3 },
  { name: 'Yeshwanthpur', zone: 'Central & West', eta: '25-30 min', landmark: 'Metro / APMC Yard', activeCount: 3 },
  { name: 'Frazer Town', zone: 'Central & West', eta: '20-30 min', landmark: 'Coles Park / Mosque Road', activeCount: 3 },
  { name: 'Sadashivanagar', zone: 'Central & West', eta: '20-30 min', landmark: 'Palace Grounds Area', activeCount: 2 },
  { name: 'Nagarbhavi', zone: 'Central & West', eta: '25-30 min', landmark: 'Bangalore University', activeCount: 2 },
  { name: 'Kengeri', zone: 'Central & West', eta: '25-30 min', landmark: 'Satellite Town / Metro', activeCount: 2 },
  { name: 'Ulsoor', zone: 'Central & West', eta: '20-30 min', landmark: 'Ulsoor Lake / Trinity Circle', activeCount: 3 },
  { name: 'Shanti Nagar', zone: 'Central & West', eta: '20-30 min', landmark: 'KH Road / Double Road', activeCount: 3 },
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
            'send_to': 'AW-18313979172/gVmhCI-SzP8cEKTK5JxE',
            'value': 1.0,
            'currency': 'INR'
          });
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
  const [coverageSearch, setCoverageSearch] = useState('');
  const [coverageZone, setCoverageZone] = useState<string>('All');
  const [selectedCoverageArea, setSelectedCoverageArea] = useState<LocalityItem>(BENGALURU_LOCALITIES[0]);
  const [coverageToast, setCoverageToast] = useState<string | null>(null);
  const [heroBrand, setHeroBrand] = useState("");
  const [heroModel, setHeroModel] = useState("");
  const [heroName, setHeroName] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroService, setHeroService] = useState("General Service - ₹699");
  const [bookingDate, setBookingDate] = useState(() => getTodayIST());
  const [bookingTime, setBookingTime] = useState(() => getCurrentTimeHHMM());
  const [modalWatchTime, setModalWatchTime] = useState(() => getCurrentTimeHHMM());
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
    const fullName = (formData.get('name') as string)?.trim() || (formData.get('fullName') as string)?.trim() || heroName || 'Rider';
    const phone = (formData.get('phone') as string)?.trim() || heroPhone || '';
    const brand = heroBrand || (formData.get('brand') as string) || 'Hero';
    const model = heroModel || (formData.get('model') as string) || '';
    const location = (formData.get('location') as string)?.trim() || locationSearch || 'Bengaluru';
    const service = heroService || (formData.get('service') as string) || 'General Service - ₹699';
    const date = (formData.get('date') as string)?.trim() || bookingDate;
    let time = (formData.get('time') as string)?.trim() || bookingTime;
    const customTime = (formData.get('customTime') as string)?.trim();

    if (customTime) {
      time = customTime;
    }

    if (time && time.includes(':') && !time.includes('AM') && !time.includes('PM')) {
      try {
        const [h, m] = time.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        time = `${String(formattedHour).padStart(2, '0')}:${m} ${ampm}`;
      } catch {
        // keep as is
      }
    }

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
      timestamp: getCurrentISTTime()
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
⏰ Service Time: ${time}

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

  const faqItems = [
    {
      q: "1. What is doorstep bike service?",
      schemaQ: "What is doorstep bike service?",
      a: "Doorstep bike service brings certified two-wheeler mechanics directly to your home, office, or roadside across Bengaluru. Mechanics arrive fully equipped with professional tools, diagnostic equipment, and genuine spare parts.",
      icon: Home
    },
    {
      q: "2. Which two-wheeler brands do you service?",
      schemaQ: "Which two-wheeler brands do you service?",
      a: "We service all major brands in Bengaluru including Royal Enfield, Honda, Yamaha, KTM, Bajaj, TVS, Suzuki, Hero, Jawa, Yezdi, and electric scooters like Ather and Ola Electric.",
      icon: Bike
    },
    {
      q: "3. How do I book a doorstep bike mechanic?",
      schemaQ: "How do I book a doorstep bike mechanic?",
      a: "Simply fill out our online booking form with your vehicle details, preferred date, time slot, and Bengaluru location, or call +91 70904 00617. Our certified mechanic is assigned for your selected slot.",
      icon: Calendar
    },
    {
      q: "4. Do I need to provide tools or equipment?",
      schemaQ: "Do I need to provide tools or equipment?",
      a: "No, our mechanics carry a full mobile workshop with all necessary professional tools, diagnostics, battery jump-starters, and genuine consumables. You only need to provide space to park and work on the vehicle.",
      icon: Wrench
    },
    {
      q: "5. How long does a doorstep bike service take?",
      schemaQ: "How long does a doorstep bike service take?",
      a: "A standard general service typically takes between 60 to 90 minutes. Quick emergency jump-start and puncture repair services take approximately 20 to 30 minutes.",
      icon: Clock
    },
    {
      q: "6. What doorstep bike services are available and what are the prices?",
      schemaQ: "What doorstep bike services are available and what are the prices?",
      a: "We offer General Service at ₹699, General Service with Engine Oil replacement at ₹1,349, Jump Start Service at ₹399, Puncture Repair at ₹599, and Running Repairs or general inspection at ₹450.",
      icon: Shield
    },
    {
      q: "7. Is there any advance payment required?",
      schemaQ: "Is there any advance payment required?",
      a: "No. We operate with a strict Zero Advance Payment policy. You pay only after the bike service is completed to your complete satisfaction.",
      icon: CheckCircle2
    },
    {
      q: "8. Which areas in Bengaluru do you cover?",
      schemaQ: "Which areas in Bengaluru do you cover?",
      a: "We cover all major locations across Bengaluru including Koramangala, Indiranagar, HSR Layout, Whitefield, Marathahalli, Bellandur, Electronic City, Jayanagar, JP Nagar, BTM Layout, Hebbal, Yelahanka, and surrounding areas.",
      icon: MapPin
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/95 dark:bg-zinc-950/95 border-b border-gray-200 dark:border-zinc-800 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-[0_4px_10px_rgba(234,179,8,0.3)] shrink-0">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <button onClick={() => { setCurrentView('home'); window.scrollTo(0,0); }} className="text-lg sm:text-[22px] lg:text-[25px] font-extrabold tracking-tight text-yellow-500 leading-none text-left cursor-pointer">
              Yes <span className="text-gray-900 dark:text-white">Bike Service</span>
            </button>
          </div>
          <nav className="hidden lg:flex gap-6 items-center">
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Home</a>
            <a href="#pricing" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Pricing</a>
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Book Online</a>
          </nav>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a 
              href="tel:+917090400617" 
              className="inline-flex md:hidden items-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-black px-2.5 py-1.5 rounded-full font-black text-xs shadow-xs transition-transform active:scale-95"
              aria-label="Call Mechanic Now"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer" aria-label="Toggle theme">
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('booking-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setCurrentView('home');
                  setTimeout(() => {
                    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 text-zinc-950 px-5 py-2.5 rounded-full font-black text-xs lg:text-sm transition-all ml-2 shadow-[0_4px_14px_rgba(234,179,8,0.25)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-zinc-950" />
              <span>Book Mechanic Now</span>
            </button>
          </div>
        </div>
      </header>

      {currentView === "home" && (
        <main>
          {/* HERO SECTION */}
          <section id="home" className="relative overflow-hidden pt-24 lg:pt-28 pb-12 lg:pb-20 bg-white dark:bg-zinc-950">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-yellow-500/10 dark:bg-yellow-500/5 blur-[130px] rounded-full pointer-events-none"></div>
            
            <FadeIn>
              <div className="max-w-2xl w-full mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                {/* 1. Tagline */}
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-yellow-700 dark:text-yellow-400 mb-1">
                  BENGALURU'S TRUSTED TWO WHEELER CARE
                </div>

                {/* 2. Main Headline */}
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-1">
                  Doorstep Bike Repair & Service
                </h1>

                {/* 3. Subtitle */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 font-medium max-w-md mb-2">
                  Certified mechanic at your home or office across Bengaluru
                </p>

                {/* 4. Trust Highlights */}
                <div className="flex items-center justify-center gap-2.5 text-xs font-bold text-gray-700 dark:text-zinc-300 mb-3.5">
                  <span className="flex items-center gap-1 text-gray-800 dark:text-zinc-200">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    Certified Mechanic
                  </span>
                  <span className="text-gray-300 dark:text-zinc-600">•</span>
                  <span className="flex items-center gap-1 text-gray-800 dark:text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Zero Advance Payment
                  </span>
                </div>

                {/* 5. 3 Services Selector */}
                <div className="grid grid-cols-3 gap-2 w-full max-w-[480px] sm:max-w-[500px] mb-3.5">
                  {[
                    { id: "General Service - ₹699", icon: "🛠️", label: "General Service", price: "₹699" },
                    { id: "General Service + Engine Oil - ₹1,349", icon: "🛢️", label: "Service + Oil", price: "₹1,349" },
                    { id: "Jump Start Service - ₹399", icon: "⚡", label: "Jump Start", price: "₹399" },
                  ].map((srv) => {
                    const isSelected = heroService === srv.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setHeroService(srv.id)}
                        className={`p-2.5 sm:p-3 rounded-2xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-yellow-500 text-black border-yellow-500 font-black shadow-md ring-2 ring-yellow-400'
                            : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 hover:border-yellow-400 font-semibold'
                        }`}
                      >
                        <span className="text-lg sm:text-xl mb-1">{srv.icon}</span>
                        <span className="text-xs font-bold leading-tight line-clamp-1">{srv.label}</span>
                        <span className={`text-xs sm:text-sm font-black mt-0.5 ${isSelected ? 'text-black' : 'text-amber-600 dark:text-yellow-400'}`}>
                          {srv.price}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div id="booking-form" className="w-full max-w-[480px] sm:max-w-[500px] relative z-20 text-left">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/25 via-yellow-500/15 to-amber-600/15 blur-xl rounded-3xl pointer-events-none opacity-60"></div>

                      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-gray-200/90 dark:border-zinc-800 relative overflow-hidden">
                        {/* Card Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 flex items-center justify-center text-sm font-bold">
                          ⚡
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
                            Quick Booking
                          </h2>
                          <p className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">Doorstep service across Bengaluru</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Available Today</span>
                      </div>
                    </div>

                    <form className="space-y-3 relative z-10" onSubmit={handleBookService}>
                      {/* Vehicle Type Switch */}
                      <div className="flex p-1 bg-gray-100 dark:bg-zinc-800/80 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setHeroVehicle('Bike')}
                          className={`flex-1 text-xs sm:text-sm font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            heroVehicle === 'Bike'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm font-extrabold'
                              : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <span className="text-sm">🏍️</span> Bike
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeroVehicle('Scooter')}
                          className={`flex-1 text-xs sm:text-sm font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            heroVehicle === 'Scooter'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm font-extrabold'
                              : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <span className="text-sm">🛵</span> Scooter
                        </button>
                      </div>

                      {/* Name & Phone in 2-Columns */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User className="h-4 w-4" />
                          </div>
                          <input 
                            type="text" 
                            name="name" 
                            required 
                            value={heroName}
                            onChange={(e) => setHeroName(e.target.value)}
                            placeholder="Your Name" 
                            autoComplete="name"
                            className="w-full pl-9 pr-2.5 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-medium placeholder:text-gray-400" 
                          />
                        </div>
                        
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                            <span className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-zinc-300 pr-1.5 border-r border-gray-300 dark:border-zinc-700">
                              <span className="text-xs" role="img" aria-label="India">🇮🇳</span>
                              <span>+91</span>
                            </span>
                          </div>
                          <input 
                            type="tel" 
                            name="phone" 
                            required 
                            inputMode="numeric"
                            autoComplete="tel"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            value={heroPhone}
                            onChange={(e) => setHeroPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="Phone number" 
                            className={`w-full pl-[56px] py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-semibold placeholder:text-gray-400 tracking-wider ${
                              heroPhone.length === 10 ? 'pr-7 ring-emerald-500/50' : 'pr-2'
                            }`}
                          />
                          {heroPhone.length === 10 && (
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                          )}
                          {heroPhone.length > 0 && heroPhone.length < 10 && (
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                              <span className="text-[10px] font-bold text-amber-600 dark:text-yellow-400">
                                {10 - heroPhone.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Brand & Model in 2-Columns */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Tag className="h-4 w-4" />
                          </div>
                          <select 
                            name="brand" 
                            required 
                            value={heroBrand} 
                            onChange={(e) => {
                              setHeroBrand(e.target.value);
                              setHeroModel("");
                            }} 
                            className="w-full pl-9 pr-6 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-medium appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Select Brand</option>
                            {Object.keys(MODELS_BY_BRAND).map(brand => (
                              <option key={brand} value={brand} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">{brand}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Bike className="h-4 w-4" />
                          </div>
                          <select 
                            name="model" 
                            required 
                            value={heroModel} 
                            onChange={(e) => setHeroModel(e.target.value)}
                            className="w-full pl-9 pr-6 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-medium appearance-none cursor-pointer disabled:opacity-50" 
                            disabled={!heroBrand}
                          >
                            <option value="" disabled>{heroBrand ? "Select Model" : "Brand First"}</option>
                            {heroBrand && MODELS_BY_BRAND[heroBrand]?.map(model => (
                              <option key={model} value={model} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">{model}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Location Input with Auto-Fill */}
                      <div className="space-y-1.5">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <MapPin className="h-4 w-4 text-yellow-500" />
                          </div>
                          <input 
                            type="text" 
                            name="location" 
                            required 
                            placeholder="Locality / Area, Bengaluru" 
                            className="w-full pl-9 pr-16 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-medium placeholder:text-gray-400" 
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
                            className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-700 dark:text-yellow-400 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            title="Auto-fill locality"
                          >
                            <Navigation className={`w-3 h-3 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                            <span>GPS</span>
                          </button>
                        </div>

                        {/* Quick locality chips */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
                          {POPULAR_BENGALURU_AREAS.slice(0, 5).map((area) => (
                            <button
                              key={area}
                              type="button"
                              onClick={() => setLocationSearch(`${area}, Bengaluru`)}
                              className={`px-2 py-1 rounded-lg text-xs border transition-all shrink-0 cursor-pointer ${
                                locationSearch.includes(area)
                                  ? 'bg-yellow-500 text-black border-yellow-500 font-bold'
                                  : 'bg-gray-100/70 dark:bg-zinc-800/70 text-gray-600 dark:text-zinc-300 border-gray-200/50 dark:border-zinc-700/50 hover:border-yellow-400'
                              }`}
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Dropdown */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Wrench className="h-4 w-4 text-yellow-500" />
                        </div>
                        <select 
                          name="service" 
                          required 
                          value={heroService} 
                          onChange={(e) => setHeroService(e.target.value)} 
                          className="w-full pl-9 pr-7 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-medium appearance-none cursor-pointer"
                        >
                          {QUICK_SERVICE_OPTIONS.map(opt => (
                            <option key={opt.id} value={opt.id} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">
                              {opt.id.startsWith("General Service -") ? "🛠️ " : opt.id.startsWith("General Service + Engine Oil") ? "🛢️ " : opt.id.startsWith("Jump Start") ? "⚡ " : "🔧 "}
                              {opt.name} ({opt.price})
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </div>
                      </div>

                      {/* Date & Set Time in 2-Columns */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-zinc-400 px-0.5">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                            <span>Select Date</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const now = getCurrentTimeHHMM();
                              setBookingTime(now);
                              setModalWatchTime(now);
                              setBookingDate(getTodayIST());
                            }}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-bold transition-colors cursor-pointer text-xs"
                            title="Set to Current Time"
                          >
                            <Clock className="w-3 h-3 text-yellow-500" />
                            <span>Same Time</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <input 
                              type="date" 
                              name="date" 
                              required 
                              min={getTodayIST()}
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full pl-9 pr-2 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-medium cursor-pointer"
                            />
                          </div>

                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <input 
                              type="time" 
                              name="time" 
                              required 
                              value={bookingTime}
                              onChange={(e) => {
                                setBookingTime(e.target.value);
                                setModalWatchTime(e.target.value);
                              }}
                              onClick={(e) => {
                                try {
                                  // @ts-ignore
                                  e.currentTarget.showPicker?.();
                                } catch (_) {}
                              }}
                              className="w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-xs sm:text-sm font-bold font-mono cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Action Button */}
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-zinc-950 font-black text-sm sm:text-base uppercase tracking-wider py-3.5 sm:py-4 rounded-xl shadow-lg shadow-yellow-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <span>Book Mechanic Now</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                      
                      {/* Trust Highlights & Emergency Helpline */}
                      <div className="pt-1 flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-emerald-500" />
                          Zero Advance Payment
                        </span>
                        <a 
                          href="tel:+917090400617" 
                          className="font-bold text-gray-800 dark:text-yellow-400 hover:underline inline-flex items-center gap-1 text-xs"
                        >
                          <Phone className="w-3 h-3 text-emerald-500" />
                          <span>7090400617</span>
                        </a>
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
                    Rapid On-Site Doorstep
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
              <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-7 sm:p-8 border-2 border-amber-400/80 dark:border-amber-500/50 hover:border-amber-400 dark:hover:border-amber-400 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 flex flex-col hover:-translate-y-1.5 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125"></div>
                
                {/* Step Pill Header */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-sm">
                    Step 2
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Fast Response
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 dark:bg-amber-500/25 border border-amber-400/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-300">
                  <Navigation className="w-8 h-8" />
                </div>

                {/* Step Title & Description */}
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
                  Mechanic Arrives
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  Our verified expert mechanic reaches your location fully equipped in 30 mins.
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
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/90 dark:border-zinc-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-gray-900 dark:text-white">Ready for doorstep service?</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">Doorstep mechanics dispatched across all Bengaluru locations in ~30 mins.</p>
              </div>
            </div>
            <button
              onClick={() => {
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-zinc-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
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
                    Book Mechanic Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
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
                      Book Mechanic Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
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

              {/* Key Highlights: Available at Doorstep, Quick Assistance, Takes ~30 Mins */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">At Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Home/Office</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⚡</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Quick Assist</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Priority Rider</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">~30 Minutes</span>
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
                    Book Mechanic Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
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
                        'Approx ~30 Minutes On-Site Service Turnaround'
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

              {/* Key Highlights: Available at Doorstep, 30 min service time, One Tyre Puncture */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">At Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Home/Road</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">30 Min Service</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Fast Arrival</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
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
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">⏱️ 30 Min Service Time</span>
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
                    Book Mechanic Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: 'Puncture Repair (₹599)', 
                      steps: [
                        'Doorstep Assistance at Home, Office, or Roadside in Bengaluru',
                        '⏱️ ~30 Minutes Quick Turnaround Time On-Site',
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

              {/* Key Highlights: Available at Doorstep, 30 min service time, Vehicle Inspection */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">At Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Home/Road</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">30 Min Service</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Fast Arrival</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
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
                      <span className="text-gray-900 dark:text-white font-bold text-xs block">⏱️ 30 min service time</span>
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
                  className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Book Mechanic Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: 'Running Repair (₹450)', 
                      steps: [
                        'Doorstep Assistance at Home, Office, or Roadside in Bengaluru',
                        '⏱️ ~30 Minutes Quick Turnaround Time On-Site',
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
                  className="w-full text-center text-xs font-bold text-gray-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View Technical Details</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      
      {/* COVERAGE AREA SECTION */}
      <section id="areas" className="py-20 sm:py-24 relative bg-white dark:bg-zinc-950 overflow-hidden border-t border-gray-100 dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/[0.03] via-transparent to-yellow-500/[0.02] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 dark:bg-yellow-500/15 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-black tracking-wider uppercase mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <MapPin className="w-3.5 h-3.5" /> Doorstep Service Across Bangalore
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
                We Cover 50+ Localities Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400">Bengaluru</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                Our mobile mechanics are stationed across 50+ central hubs in Bangalore. Whether you are at home, tech park office, or stranded roadside, verified mechanics reach your doorstep in ~30 minutes with diagnostic kits, battery boosters, and genuine parts.
              </p>
            </div>

            {/* 4 Pillars Live Dispatch Guarantees */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-12">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-gray-900 dark:text-white leading-tight">~30 Min Arrival</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Fast doorstep dispatch</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-gray-900 dark:text-white leading-tight">45+ Mobile Mechanics</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">On duty across Bangalore</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-gray-900 dark:text-white leading-tight">₹0 Visiting Charges</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Free travel in 50+ zones</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-gray-900 dark:text-white leading-tight">Live GPS Tracking</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">WhatsApp link & direct call</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid: Locality Navigator (Left) + Interactive Map Card (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Locality Search, Zone Tabs & Grid (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Search & Zone Filter Bar */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={coverageSearch}
                      onChange={(e) => setCoverageSearch(e.target.value)}
                      placeholder="Search your Bangalore locality (e.g., Koramangala, Whitefield, HSR)..."
                      className="w-full pl-11 pr-10 py-3 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-400 transition-all shadow-sm"
                    />
                    {coverageSearch && (
                      <button
                        type="button"
                        onClick={() => setCoverageSearch('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Zone Filter Chips */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {[
                      { id: 'All', label: 'All Localities (52)' },
                      { id: 'South', label: 'South Bengaluru' },
                      { id: 'East', label: 'East Bengaluru' },
                      { id: 'North', label: 'North Bengaluru' },
                      { id: 'Central & West', label: 'Central & West' },
                    ].map(tab => {
                      const isActive = coverageZone === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setCoverageZone(tab.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-yellow-500 text-black shadow-xs font-black'
                              : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Localities Card Grid */}
                {(() => {
                  const filtered = BENGALURU_LOCALITIES.filter(loc => {
                    const matchesSearch = loc.name.toLowerCase().includes(coverageSearch.toLowerCase()) ||
                                          loc.landmark.toLowerCase().includes(coverageSearch.toLowerCase()) ||
                                          loc.zone.toLowerCase().includes(coverageSearch.toLowerCase());
                    if (!matchesSearch) return false;
                    if (coverageZone === 'All') return true;
                    return loc.zone === coverageZone;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="p-8 text-center rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                        <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2 opacity-80" />
                        <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                          No exact match found for "{coverageSearch}"
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                          Don't worry — we cover all pin codes and localities in and around Bangalore!
                        </p>
                        <button
                          onClick={() => { setCoverageSearch(''); setCoverageZone('All'); }}
                          className="px-4 py-2 rounded-xl bg-yellow-500 text-black font-bold text-xs cursor-pointer hover:bg-yellow-400 transition-colors"
                        >
                          Show All 50+ Localities
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="max-h-[380px] overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {filtered.map(loc => {
                          const isSelected = selectedCoverageArea.name === loc.name;
                          return (
                            <div
                              key={loc.name}
                              onClick={() => {
                                setSelectedCoverageArea(loc);
                                setLocationSearch(`${loc.name}, Bengaluru`);
                                setCoverageToast(`Selected ${loc.name}! Booking location updated.`);
                                setTimeout(() => setCoverageToast(null), 3000);
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                                isSelected
                                  ? 'bg-yellow-500/10 border-yellow-500 shadow-sm ring-2 ring-yellow-500/30'
                                  : 'bg-gray-50/70 hover:bg-white dark:bg-zinc-900/60 dark:hover:bg-zinc-900 border-gray-200/80 dark:border-zinc-800 hover:border-yellow-500/40 hover:shadow-xs'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-yellow-600 dark:text-yellow-400' : 'text-emerald-500'}`} />
                                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight truncate">
                                    {loc.name}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate pl-5">
                                  {loc.landmark}
                                </p>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  {loc.eta}
                                </span>
                                <span className="block text-[10px] text-gray-400 mt-1 font-medium">
                                  {loc.activeCount} mechanics
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Selected Locality Action Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
                        Active In Your Area
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">
                      {selectedCoverageArea.name}, Bengaluru
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-0.5">
                      {selectedCoverageArea.landmark} • <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedCoverageArea.eta} arrival</span> • ₹0 Doorstep Travel Fee
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <a
                      href="#booking-form"
                      onClick={(e) => {
                        e.preventDefault();
                        setLocationSearch(`${selectedCoverageArea.name}, Bengaluru`);
                        const bookingElem = document.getElementById('booking-form');
                        if (bookingElem) {
                          bookingElem.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      Book in {selectedCoverageArea.name} <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="tel:+917090400617"
                      className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-yellow-500 text-gray-800 dark:text-white transition-colors"
                      title="Call Dispatch"
                    >
                      <Phone className="w-4 h-4 text-emerald-500" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Bengaluru Coverage Map with Interactive Radar Overlay (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/25 to-transparent blur-3xl rounded-full pointer-events-none"></div>
                
                <div className="relative rounded-3xl overflow-hidden border-2 border-yellow-500/30 dark:border-zinc-700 shadow-2xl bg-zinc-950">
                  
                  {/* Top Live Radar Badge */}
                  <div className="p-3.5 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="font-extrabold text-white">Live GPS Dispatch Active</span>
                    </div>
                    <span className="font-bold text-yellow-400 text-[11px] bg-yellow-500/15 px-2 py-0.5 rounded-md border border-yellow-500/25">
                      45+ Mechanics On Duty
                    </span>
                  </div>

                  {/* Interactive Map Visual */}
                  <div className="relative group">
                    <img 
                      src={coverageMapUrl} 
                      alt="Bengaluru Two-Wheeler Doorstep Coverage Map" 
                      className="w-full h-[360px] sm:h-[400px] object-cover filter brightness-[0.92] contrast-[1.05]" 
                    />

                    {/* Interactive Hotspot Pins overlaid on key Bangalore hubs */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Indiranagar Hotspot */}
                      <button
                        type="button"
                        onClick={() => {
                          const area = BENGALURU_LOCALITIES.find(l => l.name === 'Indiranagar');
                          if (area) {
                            setSelectedCoverageArea(area);
                            setLocationSearch('Indiranagar, Bengaluru');
                          }
                        }}
                        className="pointer-events-auto absolute top-[38%] right-[32%] group/pin cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute h-6 w-6 rounded-full bg-yellow-400 opacity-60"></span>
                          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black flex items-center justify-center shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                          </div>
                        </div>
                        <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 text-yellow-400 font-bold text-[10px] px-2 py-0.5 rounded-md border border-yellow-500/40 opacity-90 group-hover/pin:opacity-100 shadow-md">
                          Indiranagar • 15m
                        </span>
                      </button>

                      {/* Koramangala Hotspot */}
                      <button
                        type="button"
                        onClick={() => {
                          const area = BENGALURU_LOCALITIES.find(l => l.name === 'Koramangala');
                          if (area) {
                            setSelectedCoverageArea(area);
                            setLocationSearch('Koramangala, Bengaluru');
                          }
                        }}
                        className="pointer-events-auto absolute top-[52%] left-[46%] group/pin cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute h-6 w-6 rounded-full bg-emerald-400 opacity-60"></span>
                          <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                          </div>
                        </div>
                        <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-500/40 opacity-90 group-hover/pin:opacity-100 shadow-md">
                          Koramangala • 15m
                        </span>
                      </button>

                      {/* HSR Layout Hotspot */}
                      <button
                        type="button"
                        onClick={() => {
                          const area = BENGALURU_LOCALITIES.find(l => l.name === 'HSR Layout');
                          if (area) {
                            setSelectedCoverageArea(area);
                            setLocationSearch('HSR Layout, Bengaluru');
                          }
                        }}
                        className="pointer-events-auto absolute top-[68%] left-[56%] group/pin cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute h-6 w-6 rounded-full bg-yellow-400 opacity-60"></span>
                          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black flex items-center justify-center shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                          </div>
                        </div>
                        <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 text-yellow-400 font-bold text-[10px] px-2 py-0.5 rounded-md border border-yellow-500/40 opacity-90 group-hover/pin:opacity-100 shadow-md">
                          HSR Layout • 18m
                        </span>
                      </button>

                      {/* Whitefield Hotspot */}
                      <button
                        type="button"
                        onClick={() => {
                          const area = BENGALURU_LOCALITIES.find(l => l.name === 'Whitefield');
                          if (area) {
                            setSelectedCoverageArea(area);
                            setLocationSearch('Whitefield, Bengaluru');
                          }
                        }}
                        className="pointer-events-auto absolute top-[36%] right-[12%] group/pin cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute h-6 w-6 rounded-full bg-yellow-400 opacity-60"></span>
                          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black flex items-center justify-center shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                          </div>
                        </div>
                        <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 text-yellow-400 font-bold text-[10px] px-2 py-0.5 rounded-md border border-yellow-500/40 opacity-90 group-hover/pin:opacity-100 shadow-md">
                          Whitefield • 20m
                        </span>
                      </button>

                      {/* Hebbal Hotspot */}
                      <button
                        type="button"
                        onClick={() => {
                          const area = BENGALURU_LOCALITIES.find(l => l.name === 'Hebbal');
                          if (area) {
                            setSelectedCoverageArea(area);
                            setLocationSearch('Hebbal, Bengaluru');
                          }
                        }}
                        className="pointer-events-auto absolute top-[20%] left-[38%] group/pin cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="animate-ping absolute h-6 w-6 rounded-full bg-yellow-400 opacity-60"></span>
                          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black flex items-center justify-center shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                          </div>
                        </div>
                        <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 text-yellow-400 font-bold text-[10px] px-2 py-0.5 rounded-md border border-yellow-500/40 opacity-90 group-hover/pin:opacity-100 shadow-md">
                          Hebbal • 20m
                        </span>
                      </button>
                    </div>

                    {/* Gradient Overlay at Bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-5 text-white">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-extrabold text-xs text-white">Live Tracking Available</span>
                        </div>
                        <span className="text-[11px] text-zinc-300 font-medium">Updated every 30s</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                        Doorstep mechanics ride equipped with diagnostic gear, jump-start packs, tyre puncture machines, and genuine oils.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* Area Selection Toast */}
      {coverageToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white border border-yellow-500/50 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{coverageToast}</p>
            <p className="text-xs text-gray-400">Ready to book mechanic</p>
          </div>
          <a
            href="#booking-form"
            onClick={() => setCoverageToast(null)}
            className="ml-2 px-3 py-1.5 rounded-lg bg-yellow-500 text-black font-extrabold text-xs hover:bg-yellow-400 transition-colors"
          >
            Book Now
          </a>
          <button
            onClick={() => setCoverageToast(null)}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
                <Clock className="w-4 h-4 text-amber-500" /> ~30 Min Arrival
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
              Book Mechanic Now <ArrowRight className="w-3.5 h-3.5" />
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

          {/* JSON-LD FAQ Schema Markup for Search Engine Crawlers & Rich Snippets */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqItems.map((faq) => ({
                  "@type": "Question",
                  "name": faq.schemaQ,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              })
            }}
          />

          <div className="space-y-4">
            {faqItems.map((faq, index) => {
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
      <footer className="bg-[#0A0D14] text-zinc-300 pt-14 pb-24 md:pb-16 lg:pb-20 border-t border-zinc-800/90 relative overflow-hidden shadow-2xl">
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
                <span>Book Mechanic Now</span>
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
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  ~30 Min Arrival
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
                ~30 Minute Mechanic Dispatch to all 50+ areas
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg sm:max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200/80 dark:border-zinc-800 flex flex-col max-h-[92vh]">
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
              <div className="w-full pr-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-1">Book Service Package</h3>
                {selectedPackage && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 dark:bg-yellow-400/10 rounded-lg border border-yellow-500/20 text-xs sm:text-sm">
                    <span className="font-extrabold text-gray-900 dark:text-white truncate">
                      {selectedPackage.name}
                    </span>
                    <span className="font-black text-amber-600 dark:text-yellow-400 shrink-0">{selectedPackage.price}</span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsPackageModalOpen(false)} 
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors self-start bg-gray-100 dark:bg-zinc-800 p-2.5 rounded-full cursor-pointer shrink-0"
                aria-label="Close modal"
              >
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
            }} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              
              <div className="flex bg-gray-100 dark:bg-zinc-950 p-1 rounded-xl border border-gray-200 dark:border-zinc-800">
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Bike" defaultChecked className="peer sr-only" />
                  <div className="py-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-zinc-800 peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-sm">
                    🏍️ Bike
                  </div>
                </label>
                <label className="flex-1 text-center cursor-pointer">
                  <input type="radio" name="vehicleType" value="Scooter" className="peer sr-only" />
                  <div className="py-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-gray-500 peer-checked:bg-white peer-checked:dark:bg-zinc-800 peer-checked:text-gray-900 peer-checked:dark:text-white peer-checked:shadow-sm">
                    🛵 Scooter
                  </div>
                </label>
              </div>

              <div className="space-y-3">
                {/* Brand & Model */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Tag className="h-4 w-4" />
                    </div>
                    <select 
                      name="brand" 
                      required 
                      value={modalBrand} 
                      onChange={(e) => setModalBrand(e.target.value)} 
                      className="w-full pl-9 pr-6 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs sm:text-sm font-semibold appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Brand</option>
                      {Object.keys(MODELS_BY_BRAND).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <Bike className="h-4 w-4" />
                    </div>
                    <select 
                      name="model" 
                      required 
                      defaultValue="" 
                      className="w-full pl-9 pr-6 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs sm:text-sm font-semibold appearance-none cursor-pointer disabled:opacity-50" 
                      disabled={!modalBrand}
                    >
                      <option value="" disabled>{modalBrand ? "Select Model" : "Brand First"}</option>
                      {modalBrand && MODELS_BY_BRAND[modalBrand]?.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Customer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      name="fullName" 
                      required 
                      autoComplete="name"
                      placeholder="Your Full Name" 
                      className="w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs sm:text-sm font-semibold placeholder:text-gray-400" 
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-zinc-300 pr-2 border-r border-gray-300 dark:border-zinc-700">
                        <span className="text-xs" role="img" aria-label="India">🇮🇳</span>
                        <span>+91</span>
                      </span>
                    </div>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="[0-9]{10}" 
                      maxLength={10}
                      placeholder="Phone number" 
                      className="w-full pl-16 pr-3 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-zinc-800 transition-all text-xs sm:text-sm font-semibold placeholder:text-gray-400 tracking-wider" 
                    />
                  </div>
                </div>
                
                {/* Location / Address */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <textarea 
                    name="location" 
                    required 
                    placeholder="Locality / Address in Bengaluru" 
                    className="w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs sm:text-sm font-semibold placeholder:text-gray-400 resize-none min-h-[64px]"
                  ></textarea>
                </div>

                {/* Service Dropdown */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <select 
                    name="service" 
                    required 
                    defaultValue={selectedPackage ? selectedPackage.name : ""} 
                    className="w-full pl-9 pr-7 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs sm:text-sm font-semibold appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Service Type</option>
                    {QUICK_SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>{opt.name} - {opt.price}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Date & Set Time */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-zinc-400 px-0.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Preferred Date</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const now = getCurrentTimeHHMM();
                        setBookingTime(now);
                        setModalWatchTime(now);
                        setBookingDate(getTodayIST());
                      }}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-bold transition-colors cursor-pointer text-xs"
                      title="Set to Current Time"
                    >
                      <Clock className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Same Time</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <input 
                        type="date" 
                        name="date" 
                        required 
                        min={getTodayIST()} 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-xs sm:text-sm font-semibold cursor-pointer" 
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                        <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <input 
                        type="time" 
                        name="time" 
                        required 
                        value={bookingTime} 
                        onChange={(e) => {
                          setBookingTime(e.target.value);
                          setModalWatchTime(e.target.value);
                        }}
                        onClick={(e) => {
                          try {
                            // @ts-ignore
                            e.currentTarget.showPicker?.();
                          } catch (_) {}
                        }}
                        className="w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 transition-all text-xs sm:text-sm font-bold font-mono cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full relative group overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-zinc-950 font-black text-sm sm:text-base uppercase tracking-wider py-3.5 sm:py-4 px-4 rounded-xl shadow-[0_6px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_8px_25px_rgba(234,179,8,0.45)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mt-2"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Book Mechanic Now</span>
                  <ArrowRight className="w-4 h-4" />
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block">Date, Time & Location</span>
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

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-gray-200 dark:border-zinc-800 p-2.5 px-3 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] flex items-center gap-2">
        <a
          href="tel:+917090400617"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-zinc-900 hover:bg-black dark:bg-zinc-850 dark:hover:bg-zinc-800 text-white text-xs font-black shadow-sm transition-all active:scale-[0.98]"
        >
          <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Call Mechanic</span>
        </a>
        <a
          href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20need%20doorstep%20mechanic%20service."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm transition-all active:scale-[0.98] shrink-0"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('booking-form');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              setCurrentView('home');
              setTimeout(() => {
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          className="flex-[1.25] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-zinc-950 text-xs font-black shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5 shrink-0" />
          <span>Book Mechanic Now</span>
        </button>
      </div>

      </main>
      )}
    </div>
  );
}

