import React, { useState, useEffect } from 'react';
import { 
  Wrench, Clock, Shield, ThumbsUp, MousePointerClick, Star, CheckCircle2, ChevronDown, ChevronUp, MapPin, 
  Phone, PhoneCall, User, Smartphone, Settings, Tag, Bike, X, ArrowRight, ArrowDown, ArrowUp, Mail, Instagram, Facebook, Twitter, Sun, Moon, Map, MessageCircle, Calendar, Banknote, Wallet, Zap, Cog, Copy, Check, Navigation, Disc, Home, Quote, RotateCcw, Search, Menu } from 'lucide-react';

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
  Ducati: ["Monster", "Scrambler", "Panigale V2", "Multistrada V2", "Hypermotard", "Diavel"],
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

export const formatTime12Hour = (hhmm: string): string => {
  if (!hhmm) return "Select Time (ASAP)";
  try {
    const [hStr, mStr] = hhmm.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr ? mStr.slice(0, 2) : '00';
    if (isNaN(h)) return hhmm;
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${String(h).padStart(2, '0')}:${m} ${period}`;
  } catch {
    return hhmm;
  }
};

export const parseTime12Hour = (hhmm: string): { hour: number; minute: string; period: 'AM' | 'PM' } => {
  let h = 10;
  let m = "00";
  let p: 'AM' | 'PM' = 'AM';
  if (hhmm && hhmm.includes(':')) {
    const [hStr, mStr] = hhmm.split(':');
    const rawH = parseInt(hStr, 10);
    if (!isNaN(rawH)) {
      p = rawH >= 12 ? 'PM' : 'AM';
      h = rawH % 12;
      if (h === 0) h = 12;
    }
    m = mStr ? mStr.slice(0, 2) : "00";
  }
  return { hour: h, minute: m, period: p };
};

const QUICK_SERVICE_OPTIONS = [
  { id: "General Service - ₹799", name: "General Service", price: "₹799", note: "12-point doorstep service, dry wash & warranty", badge: "Most Popular" },
  { id: "General Service with Engine Oil - ₹1,349", name: "General Service with Engine Oil", price: "₹1,349", note: "Doorstep service, 500 Kms/1 Mo warranty, 12 checks + oil", badge: "Best Value" },
  { id: "Jump Start Service - ₹399", name: "Jump Start Service", price: "₹399", note: "Available at Doorstep • 30 Mins • For Bikes & Scooters", badge: "Express" },
  { id: "Puncture Repair - ₹599", name: "Puncture Repair", price: "₹599", note: "Doorstep tyre puncture fix at your location", badge: "Express" },
  { id: "Running Repair - ₹450", name: "Running Repair", price: "₹450", note: "Vehicle inspection & quick repairs at doorstep", badge: "Quick Fix" },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            'send_to': 'AW-17586403307/v2iuCP_DnIIdEOvv7MFB',
            'value': 1.0,
            'currency': 'INR'
          });
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17586403307/EvEbCPiDm4IdEOvv7MFB',
            'value': 1.0,
            'currency': 'INR'
          });
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
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17586403307/D8AlCOPU7-scEOvv7MFB',
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
  const [heroBrand, setHeroBrand] = useState("");
  const [heroModel, setHeroModel] = useState("");
  const [heroName, setHeroName] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [heroService, setHeroService] = useState("General Service - ₹799");
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

  // Live IST Clock that ticks every 10 seconds
  const [liveClockTime, setLiveClockTime] = useState<string>(() => formatTime12Hour(getCurrentTimeHHMM()));
  const [timeMode, setTimeMode] = useState<'same_time' | 'custom'>('same_time');
  const [isSameTimeActive, setIsSameTimeActive] = useState<boolean>(true);
  const [sameTimeNotice, setSameTimeNotice] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveClockTime(formatTime12Hour(getCurrentTimeHHMM()));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Time Picker Modal State (Mobile-responsive dialog with Same Time, Clear, Cancel, Set)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [timePickerTarget, setTimePickerTarget] = useState<'hero' | 'package'>('hero');
  const [pickerNotice, setPickerNotice] = useState<string | null>(null);
  const [pickerHour, setPickerHour] = useState<number>(() => {
    const parsed = parseTime12Hour(getCurrentTimeHHMM());
    return parsed.hour;
  });
  const [pickerMinute, setPickerMinute] = useState<string>(() => {
    const parsed = parseTime12Hour(getCurrentTimeHHMM());
    return parsed.minute;
  });
  const [pickerPeriod, setPickerPeriod] = useState<'AM' | 'PM'>(() => {
    const parsed = parseTime12Hour(getCurrentTimeHHMM());
    return parsed.period;
  });

  const applySameTime = (target?: 'hero' | 'package' | 'picker') => {
    const now = getCurrentTimeHHMM();
    const today = getTodayIST();
    setBookingTime(now);
    setModalWatchTime(now);
    setBookingDate(today);
    setIsSameTimeActive(true);
    setTimeMode('same_time');
    const formatted = formatTime12Hour(now);

    const parsed = parseTime12Hour(now);
    setPickerHour(parsed.hour);
    setPickerMinute(parsed.minute);
    setPickerPeriod(parsed.period);

    setSameTimeNotice(`⚡ Simple Same Time: Today at ${formatted} (Instant Doorstep Dispatch)`);
    setPickerNotice(`⚡ Simple Same Time: ${formatted} (Ready for ASAP booking)`);

    setTimeout(() => {
      setSameTimeNotice(null);
    }, 3500);
  };

  const openTimePicker = (target: 'hero' | 'package') => {
    setTimePickerTarget(target);
    const currentTimeStr = bookingTime || getCurrentTimeHHMM();
    const parsed = parseTime12Hour(currentTimeStr);
    setPickerHour(parsed.hour);
    setPickerMinute(parsed.minute);
    setPickerPeriod(parsed.period);
    setPickerNotice(null);
    setIsTimePickerOpen(true);
  };

  const getFormattedPickerTime24 = (h: number, m: string, p: 'AM' | 'PM'): string => {
    let hour24 = h % 12;
    if (p === 'PM') hour24 += 12;
    return `${String(hour24).padStart(2, '0')}:${m.padStart(2, '0')}`;
  };

  const handlePickerSameTime = () => {
    applySameTime(timePickerTarget);
  };

  const handlePickerClear = () => {
    setBookingTime('');
    setModalWatchTime('');
    setIsSameTimeActive(false);
    setIsTimePickerOpen(false);
  };

  const handlePickerCancel = () => {
    setIsTimePickerOpen(false);
  };

  const handlePickerSet = () => {
    const time24 = getFormattedPickerTime24(pickerHour, pickerMinute, pickerPeriod);
    setBookingTime(time24);
    setModalWatchTime(time24);
    const now = getCurrentTimeHHMM();
    if (time24 === now && bookingDate === getTodayIST()) {
      setIsSameTimeActive(true);
    } else {
      setIsSameTimeActive(false);
    }
    setIsTimePickerOpen(false);
  };

  const handlePresetOffset = (minsToAdd: number) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minsToAdd);
    const h24 = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const p: 'AM' | 'PM' = h24 >= 12 ? 'PM' : 'AM';
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    setPickerHour(h12);
    setPickerMinute(m);
    setPickerPeriod(p);
  };

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
    const service = heroService || (formData.get('service') as string) || 'General Service - ₹799';
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

    const isSameTimeOrToday = isSameTimeActive || (date === getTodayIST() && (!time || time === 'ASAP' || time.includes(formatTime12Hour(getCurrentTimeHHMM()))));
    const timingText = `${date} • ${time}${isSameTimeOrToday ? ' ⚡ (Simple Same Time / Immediate Dispatch)' : ''}`;

    const selectedOpt = QUICK_SERVICE_OPTIONS.find(s => s.id === service);
    const estimatedPrice = selectedOpt ? selectedOpt.price : '₹799';
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
⏰ Service Time: ${time} ${isSameTimeOrToday ? '⚡ (Simple Same Time / Immediate Dispatch)' : ''}

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
      a: "We offer General Service at ₹799 (discounted from ₹999), General Service with Engine Oil replacement at ₹1,349, Jump Start Service at ₹399, Puncture Repair at ₹599, and Running Repairs or general inspection at ₹450.",
      icon: Shield
    },
    {
      q: "7. Is there any advance payment required?",
      schemaQ: "Is there any advance payment required?",
      a: "No advance payment is required. You pay only after the bike service is completed to your complete satisfaction.",
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
        <div className="max-w-6xl mx-auto px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-[0_4px_10px_rgba(234,179,8,0.3)] shrink-0">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <button 
              onClick={() => { 
                setCurrentView('home'); 
                setIsMobileMenuOpen(false); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className="text-lg sm:text-[22px] lg:text-[25px] font-extrabold tracking-tight text-yellow-500 leading-none text-left cursor-pointer"
            >
              Yes <span className="text-gray-900 dark:text-white">Bike Service</span>
            </button>
          </div>
          <nav className="hidden lg:flex gap-6 items-center">
            <a href="#home" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Home</a>
            <a href="#brands" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Brands</a>
            <a href="#pricing" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Pricing</a>
            <a href="#how-it-works" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">How It Works</a>
            <a href="#reviews" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">Reviews</a>
            <a href="#faq" className="text-gray-900 dark:text-white font-semibold hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a 
              href="tel:+917090400617" 
              className="inline-flex md:hidden items-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-black px-2.5 py-1.5 rounded-full font-black text-xs shadow-xs transition-transform active:scale-95 min-h-[36px]"
              aria-label="Call Mechanic Now"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 min-h-[40px] min-w-[40px] rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center text-gray-700 dark:text-zinc-300" 
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 min-h-[40px] min-w-[40px] rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-yellow-500 hover:text-black dark:hover:text-black transition-colors cursor-pointer flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 text-zinc-950 px-5 py-2.5 rounded-full font-black text-xs lg:text-sm transition-all ml-1 shadow-[0_4px_14px_rgba(234,179,8,0.25)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.4)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-zinc-950" />
              <span>Book Mechanic Now</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-zinc-800 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
              <nav className="grid grid-cols-2 gap-2 text-sm font-bold">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Bike Brands', href: '#brands' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'Reviews', href: '#reviews' },
                  { label: 'FAQ', href: '#faq' }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (currentView !== 'home') setCurrentView('home');
                    }}
                    className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-yellow-500 hover:text-black dark:hover:text-black transition-all flex items-center justify-between min-h-[44px]"
                  >
                    <span>{item.label}</span>
                    <span className="text-yellow-500 text-xs">›</span>
                  </a>
                ))}
              </nav>

              <div className="pt-2 border-t border-gray-100 dark:border-zinc-800 grid grid-cols-2 gap-2">
                <a
                  href="tel:+917090400617"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-black shadow-sm min-h-[44px]"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20need%20doorstep%20mechanic%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black shadow-sm min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
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
                </div>

                {/* 5. 3 Services Selector */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full max-w-lg mb-3 sm:mb-3.5">
                  {[
                    { id: "General Service - ₹799", icon: "🛠️", label: "General Service", price: "₹799" },
                    { id: "General Service with Engine Oil - ₹1,349", icon: "🛢️", label: "Service + Oil", price: "₹1,349" },
                    { id: "Jump Start Service - ₹399", icon: "⚡", label: "Jump Start", price: "₹399" },
                  ].map((srv) => {
                    const isSelected = heroService === srv.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setHeroService(srv.id)}
                        className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-yellow-500 text-black border-yellow-500 font-black shadow-md ring-2 ring-yellow-400'
                            : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 hover:border-yellow-400 font-semibold'
                        }`}
                      >
                        <span className="text-base sm:text-xl mb-0.5 sm:mb-1">{srv.icon}</span>
                        <span className="text-[11px] sm:text-xs font-bold leading-tight truncate max-w-full">{srv.label}</span>
                        <span className={`text-xs sm:text-sm font-black mt-0.5 ${isSelected ? 'text-black' : 'text-amber-600 dark:text-yellow-400'}`}>
                          {srv.price}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div id="booking-form" className="w-full max-w-lg relative z-20 text-left">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/25 via-yellow-500/15 to-amber-600/15 blur-xl rounded-3xl pointer-events-none opacity-60"></div>

                      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl border border-gray-200/90 dark:border-zinc-800 relative overflow-hidden">
                        {/* Card Header */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 flex items-center justify-center text-sm font-bold shrink-0">
                          ⚡
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight truncate">
                            Quick Booking
                          </h2>
                          <p className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium truncate">Doorstep service across Bengaluru</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-bold shrink-0">
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
                          className={`flex-1 text-xs sm:text-sm font-bold py-2.5 min-h-[42px] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] ${
                            heroVehicle === 'Bike'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm font-extrabold'
                              : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <span className="text-base">🏍️</span> <span>Bike</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeroVehicle('Scooter')}
                          className={`flex-1 text-xs sm:text-sm font-bold py-2.5 min-h-[42px] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] ${
                            heroVehicle === 'Scooter'
                              ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm font-extrabold'
                              : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          <span className="text-base">🛵</span> <span>Scooter</span>
                        </button>
                      </div>

                      {/* Name & Phone in Responsive Grid (1 col on mobile, 2 cols on tablet/desktop) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
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
                            className="w-full min-h-[46px] pl-9 pr-3 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[16px] sm:text-sm font-medium placeholder:text-gray-400 transition-shadow" 
                          />
                        </div>
                        
                        <div className="relative group">
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
                            className={`w-full min-h-[46px] pl-[58px] py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[16px] sm:text-sm font-semibold placeholder:text-gray-400 tracking-wider transition-shadow ${
                              heroPhone.length === 10 ? 'pr-7 ring-emerald-500/50' : 'pr-3'
                            }`}
                          />
                          {heroPhone.length === 10 && (
                            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                          )}
                          {heroPhone.length > 0 && heroPhone.length < 10 && (
                            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                              <span className="text-[10px] font-bold text-amber-600 dark:text-yellow-400">
                                {10 - heroPhone.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Brand & Model in 2-Columns */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                        <div className="relative group min-w-0">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
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
                            className="w-full min-h-[46px] pl-9 pr-6 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[15px] sm:text-sm font-medium appearance-none cursor-pointer truncate transition-shadow"
                          >
                            <option value="" disabled>Select Brand</option>
                            {Object.keys(MODELS_BY_BRAND).map(brand => (
                              <option key={brand} value={brand} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">{brand}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        <div className="relative group min-w-0">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <Bike className="h-4 w-4" />
                          </div>
                          <select 
                            name="model" 
                            required 
                            value={heroModel} 
                            onChange={(e) => setHeroModel(e.target.value)}
                            className="w-full min-h-[46px] pl-9 pr-6 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[15px] sm:text-sm font-medium appearance-none cursor-pointer disabled:opacity-50 truncate transition-shadow" 
                            disabled={!heroBrand}
                          >
                            <option value="" disabled>{heroBrand ? "Select Model" : "Brand First"}</option>
                            {heroBrand && MODELS_BY_BRAND[heroBrand]?.map(model => (
                              <option key={model} value={model} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">{model}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Location Input with Auto-Fill */}
                      <div className="space-y-1.5">
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                            <MapPin className="h-4 w-4 text-yellow-500" />
                          </div>
                          <input 
                            type="text" 
                            name="location" 
                            required 
                            placeholder="Locality / Area, Bengaluru" 
                            className="w-full min-h-[46px] pl-9 pr-20 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[16px] sm:text-sm font-medium placeholder:text-gray-400 transition-shadow" 
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
                            className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 min-h-[34px] rounded-lg bg-yellow-500/15 hover:bg-yellow-500/25 active:scale-[0.96] text-yellow-700 dark:text-yellow-400 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                            title="Auto-fill locality"
                          >
                            <Navigation className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                            <span>GPS</span>
                          </button>
                        </div>

                        {/* Quick locality chips */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs -mx-1 px-1 touch-pan-x overscroll-x-contain">
                          {POPULAR_BENGALURU_AREAS.slice(0, 5).map((area) => (
                            <button
                              key={area}
                              type="button"
                              onClick={() => setLocationSearch(`${area}, Bengaluru`)}
                              className={`px-2.5 py-1 min-h-[28px] rounded-lg text-xs border transition-all shrink-0 cursor-pointer active:scale-[0.97] ${
                                locationSearch.includes(area)
                                  ? 'bg-yellow-500 text-black border-yellow-500 font-bold shadow-xs'
                                  : 'bg-gray-100/80 dark:bg-zinc-800/80 text-gray-700 dark:text-zinc-300 border-gray-200/60 dark:border-zinc-700/60 hover:border-yellow-400'
                              }`}
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Dropdown */}
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-500 transition-colors">
                          <Wrench className="h-4 w-4 text-yellow-500" />
                        </div>
                        <select 
                          name="service" 
                          required 
                          value={heroService} 
                          onChange={(e) => setHeroService(e.target.value)} 
                          className="w-full min-h-[46px] pl-9 pr-7 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[15px] sm:text-sm font-medium appearance-none cursor-pointer truncate transition-shadow"
                        >
                          {QUICK_SERVICE_OPTIONS.map(opt => (
                            <option key={opt.id} value={opt.id} className="text-gray-900 dark:text-white bg-white dark:bg-zinc-900">
                              {opt.id.includes("Engine Oil") ? "🛢️ " : opt.id.startsWith("General Service") ? "🛠️ " : opt.id.startsWith("Jump Start") ? "⚡ " : "🔧 "}
                              {opt.name} ({opt.price})
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </div>
                      </div>

                      {/* Calendar & Time Inputs (Responsive Mobile Grid with clear touch targets) */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                        {/* Calendar Date Input */}
                        <div className="relative group min-w-0">
                          <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-yellow-600 dark:text-yellow-400 group-focus-within:text-yellow-500 transition-colors">
                            <Calendar className="h-4 w-4 shrink-0" />
                          </div>
                          <input 
                            type="date" 
                            name="date" 
                            required 
                            min={getTodayIST()}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full min-h-[46px] pl-8 sm:pl-9 pr-1.5 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[15px] sm:text-sm font-semibold cursor-pointer transition-shadow"
                            title="Calendar (Select Service Date)"
                          />
                        </div>

                        {/* Time Input */}
                        <div className="relative group min-w-0">
                          <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-yellow-600 dark:text-yellow-400 group-focus-within:text-yellow-500 transition-colors">
                            <Clock className="h-4 w-4 shrink-0" />
                          </div>
                          <input 
                            type="time" 
                            name="time" 
                            required 
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full min-h-[46px] pl-8 sm:pl-9 pr-1.5 py-2.5 sm:py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 text-[15px] sm:text-sm font-semibold cursor-pointer transition-shadow"
                            title="Time (Select Service Time)"
                          />
                        </div>
                      </div>

                      {/* Submit Action Button */}
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-zinc-950 font-black text-sm sm:text-base uppercase tracking-wider min-h-[50px] sm:min-h-[52px] py-3.5 sm:py-4 rounded-xl shadow-lg shadow-yellow-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <span>
                              {heroService.includes("Engine Oil")
                                ? "Book General Service with Engine Oil now"
                                : heroService.startsWith("General Service")
                                ? "Book General Service now"
                                : heroService.includes("Running Repair")
                                ? "Book Running Repair now"
                                : heroService.includes("Puncture Repair")
                                ? "Book Puncture Repair now"
                                : heroService.includes("Jump Start")
                                ? "Book Jump Start now"
                                : "Book Mechanic Now"}
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>
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

      {/* WE SERVICE ALL MAJOR BIKE BRANDS SECTION */}
      <section id="brands" className="py-16 sm:py-20 relative bg-white dark:bg-zinc-950 overflow-hidden border-t border-gray-100 dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/[0.02] via-transparent to-yellow-500/[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 dark:bg-yellow-500/15 border border-yellow-500/25 text-yellow-700 dark:text-yellow-400 font-extrabold text-xs tracking-wider uppercase mb-3 shadow-xs">
                <Bike className="w-3.5 h-3.5" />
                <span>Multi-Brand Doorstep Specialist</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
                We Service All Major <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400">Bike Brands</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
                From everyday scooters to premium motorcycles, our skilled mechanics provide doorstep service and repair for all major two-wheeler brands.
              </p>
            </div>

            {/* Brand Ribbon Text */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-yellow-500/10 border-2 border-yellow-500/30 max-w-4xl mx-auto mb-8 text-center shadow-lg shadow-yellow-500/5">
              <p className="text-base sm:text-lg md:text-xl font-black text-gray-900 dark:text-white leading-relaxed tracking-wide">
                Bajaj · Hero · Honda · TVS · Yamaha · Suzuki · Royal Enfield · KTM · Jawa · Vespa · Mahindra · Triumph · BMW · Aprilia · Benelli · Ducati
              </p>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="#booking-form"
                onClick={(e) => {
                  e.preventDefault();
                  const bookingForm = document.getElementById('booking-form') || document.getElementById('home');
                  if (bookingForm) {
                    bookingForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 text-zinc-950 font-black text-sm sm:text-base py-3.5 px-8 rounded-full shadow-[0_4px_14px_rgba(234,179,8,0.3)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <span>Book Your Bike Service Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

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

      <div id="services"></div>
      <section id="pricing" className="py-20 sm:py-24 relative bg-gray-50 dark:bg-zinc-950/50 overflow-hidden">
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
                  Save ₹200 (20% OFF)
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
                      Offer Price: ₹799
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-3 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹799</span>
                <span className="text-lg font-medium text-gray-400 line-through">₹999</span>
                <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">/ all-inclusive</span>
              </div>

              {/* Key Highlights: Doorstep, Warranty, Interval, Service Time */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-yellow-400/10 border border-amber-500/20 text-gray-900 dark:text-zinc-100 text-xs font-bold">
                  <span className="text-sm shrink-0">🏍️</span>
                  <span>Available at Your Doorstep</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-yellow-400/10 border border-amber-500/20 text-gray-900 dark:text-zinc-100 text-xs font-bold">
                  <span className="text-sm shrink-0">🛡️</span>
                  <span>500 km or 1-Month Service Warranty</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-yellow-400/10 border border-amber-500/20 text-gray-900 dark:text-zinc-100 text-xs font-bold">
                  <span className="text-sm shrink-0">🔧</span>
                  <span>Recommended Every 3,000 km or 3 Months</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-yellow-400/10 border border-amber-500/20 text-gray-900 dark:text-zinc-100 text-xs font-bold">
                  <span className="text-sm shrink-0">⏱️</span>
                  <span>Service Time: Approx. 2 Hours</span>
                </div>
              </div>

              {/* Service Includes */}
              <div className="relative z-10 mb-5 flex-grow">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-2.5">
                  <span>Service Includes:</span>
                  <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 normal-case">12 Core Services</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Air Filter Cleaning",
                    "Battery Voltage Check",
                    "Brake Check & Service",
                    "Cables & Levers Adjustment",
                    "Chain Tension Check",
                    "Clutch Greasing",
                    "Dry Wash",
                    "Electrical Check-up",
                    "Engine Oil Check",
                    "Greasing & Lubrication",
                    "Oil Leakage Check",
                    "Spark Plug Cleaning"
                  ].map((serviceItem, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-1.5 px-2 rounded-lg bg-gray-50/90 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-gray-900 dark:text-white font-semibold text-[11.5px] leading-tight">
                        {serviceItem}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions: Book Now & View Technical Details */}
              <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <button 
                  onClick={() => { 
                    setSelectedPackage({ name: 'General Service', price: '₹799' }); 
                    setIsPackageModalOpen(true); 
                  }} 
                  className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-zinc-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(234,179,8,0.35)] hover:shadow-[0_6px_22px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5 font-black">
                    Book General Service now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: 'General Service (₹799)', 
                      steps: [
                        'Air Filter Cleaning & Intake Inspection',
                        'Battery Voltage Check & Terminal Cleaning',
                        'Brake Check & Service (Front & Rear Shoe/Disc Inspection & Calibration)',
                        'Cables & Levers Adjustment (Clutch, Brake & Throttle Free Play)',
                        'Chain Tension Check, Slack Calibration & Synthetic Lubrication',
                        'Clutch Greasing & Smooth Engagement Calibration',
                        'Dry Wash & Exterior Detailing',
                        'Electrical Check-up (Headlight, Tail Light, Indicators & Horn Circuit)',
                        'Engine Oil Level, Viscosity & Contamination Check',
                        'Greasing & Lubrication of Vital Pivot Points & Bearings',
                        'Oil Leakage Check & Gasket/Seal Inspection',
                        'Spark Plug Cleaning, Carbon Removal & Gap Calibration'
                      ] 
                    }); 
                    setIsTechnicalDetailsOpen(true); 
                  }} 
                  className="w-full text-center text-xs font-bold text-gray-600 hover:text-yellow-600 dark:text-gray-300 dark:hover:text-yellow-400 transition-colors py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View All 12 Technical Points</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pkg 2: General Service with Engine Oil */}
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
                    <span>🛢️</span> Engine Oil Included
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
                        General Service with Engine Oil
                      </h3>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400">
                        Offer Price: ₹1,349
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Banner */}
                <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">₹1,349</span>
                  <span className="text-lg font-medium text-gray-400 line-through">₹1,500</span>
                  <span className="text-xs font-semibold text-yellow-400/90 bg-yellow-400/10 px-2 py-0.5 rounded-md border border-yellow-400/20">
                    Engine Oil Included
                  </span>
                </div>

                {/* Key Highlights: The 3 exact bullets */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-white text-xs font-bold">
                    <span className="text-sm shrink-0">🏍️</span>
                    <span>Available at Your Doorstep</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-white text-xs font-bold">
                    <span className="text-sm shrink-0">🛡️</span>
                    <span>500 Kms or 1 Month Warranty</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-white text-xs font-bold">
                    <span className="text-sm shrink-0">🔧</span>
                    <span>Recommended Every 3,000 Kms or 3 Months</span>
                  </div>
                </div>
                
                {/* Service Includes */}
                <div className="relative z-10 mb-5 flex-grow">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-white mb-2.5">
                    <span>Service Includes:</span>
                    <span className="text-[10.5px] font-bold text-yellow-400 normal-case">12 Core Services</span>
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      { name: "Air Filter Cleaning", isOil: false },
                      { name: "Battery Voltage Check", isOil: false },
                      { name: "Brake Service", isOil: false },
                      { name: "Cables & Levers Adjustment", isOil: false },
                      { name: "Chain Tension Check", isOil: false },
                      { name: "Clutch Greasing", isOil: false },
                      { name: "Dry Wash", isOil: false },
                      { name: "Electrical Check-up", isOil: false },
                      { name: "Engine Oil Change", isOil: true },
                      { name: "Greasing & Lubrication", isOil: false },
                      { name: "Oil Leakage Check", isOil: false },
                      { name: "Spark Plug Cleaning", isOil: false },
                    ].map((item, idx) => (
                      <li key={idx} className={`flex items-center gap-2 p-1.5 px-2 rounded-lg border ${
                        item.isOil 
                          ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-bold shadow-xs' 
                          : 'bg-white/5 border-white/10 text-white font-semibold text-[11.5px]'
                      }`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${item.isOil ? 'text-yellow-400' : 'text-emerald-400'}`} />
                        <span className="leading-tight">
                          {item.name} {item.isOil && <span className="ml-1 text-[9.5px] bg-yellow-400 text-black px-1.5 py-0.2 rounded font-black uppercase">Oil Change</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions: Book Now & View Technical Details */}
                <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-2 border-t border-white/10">
                  <button 
                    onClick={() => { 
                      setSelectedPackage({ name: 'General Service with Engine Oil', price: '₹1,349' }); 
                      setIsPackageModalOpen(true); 
                    }} 
                    className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-400 hover:from-yellow-300 hover:to-yellow-400 text-black font-black text-sm py-3.5 px-4 rounded-xl shadow-[0_4px_18px_rgba(234,179,8,0.45)] hover:shadow-[0_6px_25px_rgba(234,179,8,0.6)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5 font-black">
                      Book General Service with Engine Oil now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => { 
                      setTechnicalDetailsContent({ 
                        title: 'General Service with Engine Oil (₹1,349)', 
                        steps: [
                          'Air Filter Cleaning & Intake Duct Inspection',
                          'Battery Voltage Check, Terminal Cleaning & Charging Health Test',
                          'Brake Service (Front & Rear Shoe/Disc Inspection, Pad Dusting & Free Play Adjustment)',
                          'Cables & Levers Adjustment (Clutch, Front/Rear Brake & Throttle Slack Calibration)',
                          'Chain Tension Check, Alignment & High-Tack Synthetic Chain Lubrication',
                          'Clutch Greasing & Smooth Friction Plate Engagement Check',
                          'Dry Wash & Premium Exterior Body Detailing',
                          'Electrical Check-up (Headlight, Tail/Brake Light, Indicators, Switchgears & Horn Circuit)',
                          'Engine Oil Change (Draining old degraded oil & refilling fresh branded 4T 10W-30 / 20W-40 Engine Oil)',
                          'Greasing & Lubrication of Vital Pivot Points, Center Stand & Side Stand Bearings',
                          'Oil Leakage Check & Engine Gasket / Sump Drain Washer Inspection',
                          'Spark Plug Cleaning, Carbon Sludge Removal & Electrode Gap Calibration'
                        ] 
                      }); 
                      setIsTechnicalDetailsOpen(true); 
                    }} 
                    className="w-full text-center text-xs font-bold text-gray-300 hover:text-yellow-400 transition-colors py-2 rounded-lg hover:bg-white/5 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>View All 12 Technical Points</span>
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
                      <span>⚡ Jump Start Service</span>
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      Offer Price: ₹399
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="relative z-10 flex items-baseline gap-2.5 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-xl font-bold text-gray-400 dark:text-zinc-500 line-through tracking-tight">/₹600/</span>
                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">₹399</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Save ₹201 (33% OFF)</span>
              </div>

              {/* Key Highlights: Available at Doorstep, Quick Assistance, 30 Mins Service Time */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏠</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Doorstep</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Available</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">⏱️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">30 Minutes</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">Service Time</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center flex flex-col items-center justify-center">
                  <span className="text-lg mb-0.5">🏍️</span>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Bikes & Scooters</span>
                  <span className="text-[9.5px] text-gray-500 dark:text-zinc-400">All Models</span>
                </div>
              </div>

              {/* What's Included / Service Highlights */}
              <div className="relative z-10 mb-6 flex-grow">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  <span>⚡ Jump Start Features:</span>
                  <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 normal-case">Priority Rescue</span>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-extrabold text-sm block">• Available at Your Doorstep</span>
                      <span className="text-[10.5px] text-gray-600 dark:text-zinc-400">Technician reaches your home, office, or roadside breakdown location across Bengaluru</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-extrabold text-sm block">• 30 Minutes Service Time</span>
                      <span className="text-[10.5px] text-gray-600 dark:text-zinc-400">Priority rider dispatch with rapid on-site arrival and prompt assistance</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-extrabold text-sm block">• Quick Battery Jump Start</span>
                      <span className="text-[10.5px] text-gray-600 dark:text-zinc-400">Commercial grade 12V high-discharge booster safe for modern digital ECUs & sensors</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50/80 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 dark:text-white font-extrabold text-sm block">• For Bikes & Scooters</span>
                      <span className="text-[10.5px] text-gray-600 dark:text-zinc-400">Compatible with all gearless scooters (Activa, Jupiter), motorcycles & electric 2-wheelers</span>
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
                  <span className="relative z-10 flex items-center justify-center gap-1.5 font-black">
                    Book Jump Start now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={() => { 
                    setTechnicalDetailsContent({ 
                      title: '⚡ Jump Start Service (/₹600/ ₹399)', 
                      steps: [
                        '• Available at Your Doorstep across Bengaluru',
                        '• 30 Minutes Service Time rapid response',
                        '• Quick Battery Jump Start with commercial 12V high-cranking booster',
                        '• For Bikes & Scooters (all brands & models)',
                        'Resting Voltage & Cranking Voltage Drop Diagnostic Test',
                        'Alternator / Magneto Coil Output Voltage Evaluation at 3000 RPM',
                        'RR (Rectifier Regulator) Health & Parasitic Battery Drain Check',
                        'Terminal Sulphation & Acid Corrosion Removal',
                        'Lead Wire Re-Torque & Anti-Oxidation Protective Coating'
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
                  <span className="relative z-10 flex items-center justify-center gap-1.5 font-black">
                    Book Puncture Repair now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
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
                  <span className="relative z-10 flex items-center justify-center gap-1.5 font-black">
                    Book Running Repair now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
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

      
      

      {/* CUSTOMER REVIEWS SECTION */}
      <section id="reviews" className="py-16 sm:py-24 relative bg-gray-50/70 dark:bg-zinc-950/60 overflow-hidden border-t border-gray-100 dark:border-white/5">
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
            <div className="bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-yellow-400/60 dark:hover:border-yellow-500/40 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300">
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
            <div className="bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-yellow-400/60 dark:hover:border-yellow-500/40 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300">
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
            <div className="bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-yellow-400/60 dark:hover:border-yellow-500/40 flex flex-col justify-between relative group hover:-translate-y-1.5 transition-all duration-300">
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
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
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

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 shrink-0">
              <a
                href="tel:+917090400617"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800/90 hover:bg-yellow-400 hover:text-black text-white text-xs sm:text-sm font-black transition-all shadow-md border border-zinc-700 hover:border-yellow-400 transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-yellow-400 group-hover:text-black" />
                <span>Call +91 70904 00617</span>
              </a>
              <a
                href="https://wa.me/917090400617?text=Hi%20YES%20BIKE%20SERVICE%20Team%2C%20I%20need%20doorstep%20bike%20service%20in%20Bangalore."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm font-black transition-all shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Help</span>
              </a>
              <button
                onClick={() => {
                  const form = document.getElementById('booking-form') || document.getElementById('home');
                  if (form) form.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-black text-xs sm:text-sm font-black transition-all shadow-lg shadow-yellow-500/25 transform hover:-translate-y-0.5 cursor-pointer"
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
                  { label: 'Bike Brands', href: '#brands' },
                  { label: 'Services', href: '#services' },
                  { label: 'Pricing', href: '#pricing' },
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg sm:max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200/80 dark:border-zinc-800 flex flex-col max-h-[92vh]">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
              <div className="w-full pr-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-1">Book Service Package</h3>
                {selectedPackage && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 dark:bg-yellow-400/10 rounded-lg border border-yellow-500/20 text-xs sm:text-sm">
                    <span className="font-extrabold text-gray-900 dark:text-white truncate">
                      {selectedPackage.name.includes("Jump Start") ? "⚡ Jump Start Service" : selectedPackage.name}
                    </span>
                    {selectedPackage.name.includes("Jump Start") ? (
                      <span className="flex items-center gap-1.5 shrink-0">
                        <span className="line-through text-gray-400 font-semibold text-xs">/₹600/</span>
                        <span className="font-black text-amber-600 dark:text-yellow-400">{selectedPackage.price}</span>
                      </span>
                    ) : (
                      <span className="font-black text-amber-600 dark:text-yellow-400 shrink-0">{selectedPackage.price}</span>
                    )}
                  </div>
                )}
                {selectedPackage && selectedPackage.name.includes("Jump Start") && (
                  <div className="mt-2 text-[11px] font-bold text-gray-700 dark:text-zinc-300 flex flex-wrap gap-x-2.5 gap-y-0.5">
                    <span>• Available at Your Doorstep</span>
                    <span>• 30 Minutes Service Time</span>
                    <span>• Quick Battery Jump Start</span>
                    <span>• For Bikes & Scooters</span>
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
              const pkgPrice = selectedPackage ? selectedPackage.price : '₹799';
              const bookingId = `YB-${Math.floor(10000 + Math.random() * 90000)}`;

              const isSameTimeOrToday = isSameTimeActive || (date === getTodayIST() && (!time || time === 'ASAP' || time.includes(formatTime12Hour(getCurrentTimeHHMM()))));
              const displayTiming = `${date} at ${time}${isSameTimeOrToday ? ' ⚡ (Simple Same Time / Immediate Dispatch)' : ''}`;

              setBookingConfirmedData({
                bookingId,
                fullName,
                phone,
                vehicle: vehicleType,
                brand,
                model,
                location,
                service: `${pkgName} (${pkgPrice})`,
                timing: `Scheduled: ${displayTiming}`,
                estimatedPrice: pkgPrice,
                timestamp: getCurrentISTTime()
              });
              
              const message = `🏍️ 🛵 NEW BOOKING RECEIVED!

Hello YES BIKE SERVICE Team 👋

📋 Booking Reference: ${bookingId}
👤 Customer: ${fullName}
📞 Phone: +91 ${phone}
📍 Location: ${location}
🏍️ Vehicle: ${vehicleType} - ${brand} ${model}
🔧 Service: ${pkgName} (${pkgPrice})
🕐 Preferred Time: ${date} at ${time} ${isSameTimeOrToday ? '⚡ (Simple Same Time / Immediate Dispatch)' : ''}

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
            }} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto">
              
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
                      className="w-full min-h-[46px] pl-9 pr-6 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[15px] sm:text-sm font-semibold appearance-none cursor-pointer disabled:opacity-50 truncate" 
                      disabled={!modalBrand}
                    >
                      <option value="" disabled>{modalBrand ? "Select Model" : "Brand First"}</option>
                      {modalBrand && MODELS_BY_BRAND[modalBrand]?.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-gray-400">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Customer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                      className="w-full min-h-[46px] pl-9 pr-3 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[16px] sm:text-sm font-semibold placeholder:text-gray-400" 
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
                      className="w-full min-h-[46px] pl-16 pr-3 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-zinc-800 transition-all text-[16px] sm:text-sm font-semibold placeholder:text-gray-400 tracking-wider" 
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
                    className="w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[16px] sm:text-sm font-semibold placeholder:text-gray-400 resize-none min-h-[64px]"
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
                    defaultValue={selectedPackage ? `${selectedPackage.name} - ${selectedPackage.price}` : ""} 
                    className="w-full min-h-[46px] pl-9 pr-7 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[15px] sm:text-sm font-semibold appearance-none cursor-pointer truncate"
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
                
                {/* Calendar & Time Inputs (Responsive Mobile Grid with clear touch targets) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {/* Calendar Date Input */}
                  <div className="relative group min-w-0">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-yellow-600 dark:text-yellow-400 group-focus-within:text-yellow-500 transition-colors">
                      <Calendar className="h-4 w-4 shrink-0" />
                    </div>
                    <input 
                      type="date" 
                      name="date" 
                      required 
                      min={getTodayIST()}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full min-h-[46px] pl-8 sm:pl-9 pr-1.5 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[15px] sm:text-sm font-semibold cursor-pointer"
                      title="Calendar (Select Service Date)"
                    />
                  </div>

                  {/* Time Input */}
                  <div className="relative group min-w-0">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-yellow-600 dark:text-yellow-400 group-focus-within:text-yellow-500 transition-colors">
                      <Clock className="h-4 w-4 shrink-0" />
                    </div>
                    <input 
                      type="time" 
                      name="time" 
                      required 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full min-h-[46px] pl-8 sm:pl-9 pr-1.5 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[15px] sm:text-sm font-semibold cursor-pointer"
                      title="Time (Select Service Time)"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full relative group overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-zinc-950 font-black text-sm sm:text-base uppercase tracking-wider min-h-[50px] sm:min-h-[52px] py-3.5 sm:py-4 px-4 rounded-xl shadow-[0_6px_20px_rgba(234,179,8,0.3)] hover:shadow-[0_8px_25px_rgba(234,179,8,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-center">
                  <span>
                    {selectedPackage ? (
                      selectedPackage.name.includes("Engine Oil")
                        ? "Book General Service with Engine Oil now"
                        : selectedPackage.name.startsWith("General Service")
                        ? "Book General Service now"
                        : selectedPackage.name.includes("Running Repair")
                        ? "Book Running Repair now"
                        : selectedPackage.name.includes("Puncture Repair")
                        ? "Book Puncture Repair now"
                        : selectedPackage.name.includes("Jump Start")
                        ? "Book Jump Start now"
                        : `Book ${selectedPackage.name} now`
                    ) : "Book Mechanic Now"}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
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
            
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
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
                  setSelectedPackage({ name: 'General Service', price: '₹799' });
                  setIsPackageModalOpen(true);
                }}
                className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>🚀 Book General Service (₹799)</span>
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 max-w-md w-full my-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left relative overflow-hidden">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block">Vehicle</span>
                  <span className="font-bold text-gray-900 dark:text-white text-[12.5px] truncate block">
                    {bookingConfirmedData ? `${bookingConfirmedData.vehicle} • ${bookingConfirmedData.brand} ${bookingConfirmedData.model}` : 'Bike • Hero Splendor'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block">Service Selected</span>
                  <span className="font-bold text-gray-900 dark:text-white text-[12.5px] truncate block">
                    {bookingConfirmedData?.service || 'General Service - ₹799'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
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

      {/* MOBILE RESPONSIVE TIME PICKER MODAL */}
      {isTimePickerOpen && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Backdrop dismiss */}
          <div 
            className="absolute inset-0"
            onClick={handlePickerCancel}
          />
          
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-3xl border border-gray-200/90 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
            {/* Mobile Drag Indicator */}
            <div className="sm:hidden w-12 h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full mx-auto mt-2.5 mb-1 shrink-0"></div>

            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-gray-50/70 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                    Select Service Time
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
                    Bangalore doorstep mechanic arrival slot
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePickerCancel}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center text-gray-500 dark:text-zinc-400 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              
              {/* Fast-Track Instant Simple Same Time Banner */}
              <button
                type="button"
                onClick={() => {
                  applySameTime(timePickerTarget);
                  setIsTimePickerOpen(false);
                }}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black text-xs sm:text-sm flex items-center justify-between shadow-md shadow-yellow-500/25 transition-all active:scale-[0.98] cursor-pointer group text-left border border-yellow-300"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-black fill-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-zinc-950">
                      <span>⚡ Simple Same Time (Right Now)</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-zinc-900/80">
                      Today at {liveClockTime} • Mechanic arrives in ~30 mins
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-black/10 hover:bg-black/20 px-2.5 py-1.5 rounded-xl text-xs font-black shrink-0 transition-colors">
                  <span>1-Tap</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Feedback banner when Same Time is tapped */}
              {pickerNotice && (
                <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-yellow-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in duration-150">
                  <Clock className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                  <span>{pickerNotice}</span>
                </div>
              )}

              {/* Big Digital Clock Display & AM/PM Toggle */}
              <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-gray-100/80 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700/80 shadow-inner">
                <div className="flex items-center gap-1.5">
                  <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-sm text-center">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-gray-900 dark:text-white tracking-tight">
                      {String(pickerHour).padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Hour</span>
                  </div>
                  
                  <span className="text-2xl font-black text-yellow-500 animate-pulse">:</span>

                  <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-sm text-center">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-gray-900 dark:text-white tracking-tight">
                      {pickerMinute}
                    </span>
                    <span className="block text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Min</span>
                  </div>
                </div>

                {/* AM / PM Toggle */}
                <div className="flex flex-col gap-1 bg-white dark:bg-zinc-900 p-1 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setPickerPeriod('AM')}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      pickerPeriod === 'AM'
                        ? 'bg-yellow-500 text-black shadow-sm'
                        : 'text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickerPeriod('PM')}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      pickerPeriod === 'PM'
                        ? 'bg-yellow-500 text-black shadow-sm'
                        : 'text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block mb-2">
                  Quick Shortcuts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      applySameTime(timePickerTarget);
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-950 dark:text-yellow-300 border border-yellow-500/40 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <Clock className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                    <span>⚡ Simple Same Time ({liveClockTime})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetOffset(30)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-zinc-800 hover:bg-yellow-500/15 text-gray-700 dark:text-zinc-300 border border-gray-200/60 dark:border-zinc-700/60 transition-all cursor-pointer"
                  >
                    +30 Mins
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetOffset(60)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-zinc-800 hover:bg-yellow-500/15 text-gray-700 dark:text-zinc-300 border border-gray-200/60 dark:border-zinc-700/60 transition-all cursor-pointer"
                  >
                    +1 Hour
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPickerHour(10); setPickerMinute('00'); setPickerPeriod('AM'); }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-zinc-800 hover:bg-yellow-500/15 text-gray-700 dark:text-zinc-300 border border-gray-200/60 dark:border-zinc-700/60 transition-all cursor-pointer"
                  >
                    10:00 AM
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPickerHour(2); setPickerMinute('00'); setPickerPeriod('PM'); }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-zinc-800 hover:bg-yellow-500/15 text-gray-700 dark:text-zinc-300 border border-gray-200/60 dark:border-zinc-700/60 transition-all cursor-pointer"
                  >
                    02:00 PM
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPickerHour(5); setPickerMinute('00'); setPickerPeriod('PM'); }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-zinc-800 hover:bg-yellow-500/15 text-gray-700 dark:text-zinc-300 border border-gray-200/60 dark:border-zinc-700/60 transition-all cursor-pointer"
                  >
                    05:00 PM
                  </button>
                </div>
              </div>

              {/* Hour Selection (1 to 12) */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block mb-1.5">
                  Select Hour
                </span>
                <div className="grid grid-cols-6 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                    const isSelected = pickerHour === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setPickerHour(h)}
                        className={`h-10 rounded-xl font-bold font-mono text-sm transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'bg-yellow-500 text-black font-black shadow-md ring-2 ring-yellow-400'
                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-200/40 dark:border-zinc-700/40'
                        }`}
                      >
                        {String(h).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minute Selection */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 block mb-1.5">
                  Select Minutes
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                  {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((m) => {
                    const isSelected = pickerMinute === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPickerMinute(m)}
                        className={`h-9 rounded-xl font-bold font-mono text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'bg-yellow-500 text-black font-black shadow-md ring-2 ring-yellow-400'
                            : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-200/40 dark:border-zinc-700/40'
                        }`}
                      >
                        :{m}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* THE 4 ACTION COMMAND BUTTONS: Same Time, Clear, Cancel, Set */}
            <div className="p-3.5 sm:p-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900/90 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. Simple Same Time */}
                <button
                  type="button"
                  onClick={handlePickerSameTime}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-900 dark:text-yellow-300 font-black text-xs sm:text-sm border border-yellow-500/40 transition-all active:scale-[0.98] cursor-pointer shadow-xs"
                  title="Sync to current live system time"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
                  <span className="truncate">Simple Same Time</span>
                </button>

                {/* 2. Clear */}
                <button
                  type="button"
                  onClick={handlePickerClear}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-black text-xs sm:text-sm border border-gray-200 dark:border-zinc-700 transition-all active:scale-[0.98] cursor-pointer"
                  title="Clear time (ASAP arrival)"
                >
                  <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                  <span>Clear</span>
                </button>

                {/* 3. Cancel */}
                <button
                  type="button"
                  onClick={handlePickerCancel}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gray-100 hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-rose-950/30 text-gray-700 hover:text-rose-600 dark:text-zinc-300 dark:hover:text-rose-400 font-black text-xs sm:text-sm border border-gray-200 dark:border-zinc-700 hover:border-rose-300 transition-all active:scale-[0.98] cursor-pointer"
                  title="Discard changes and close"
                >
                  <X className="w-4 h-4 shrink-0" />
                  <span>Cancel</span>
                </button>

                {/* 4. Set */}
                <button
                  type="button"
                  onClick={handlePickerSet}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black text-xs sm:text-sm shadow-md shadow-yellow-500/25 transition-all active:scale-[0.98] cursor-pointer"
                  title="Apply and set selected time"
                >
                  <Check className="w-4 h-4 stroke-[3] shrink-0" />
                  <span>Set</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-gray-200 dark:border-zinc-800 p-2.5 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-4px_25px_rgba(0,0,0,0.15)] flex items-center gap-2">
        <a
          href="tel:+917090400617"
          className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-2 rounded-xl bg-zinc-900 hover:bg-black dark:bg-zinc-850 dark:hover:bg-zinc-800 text-white text-xs font-black shadow-sm transition-all active:scale-[0.98]"
        >
          <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Call Mechanic</span>
        </a>
        <a
          href="https://wa.me/917090400617?text=Hi%20Yes%20Bike%20Service,%20I%20need%20doorstep%20mechanic%20service."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm transition-all active:scale-[0.98] shrink-0"
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
          className="flex-[1.25] flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-zinc-950 text-xs font-black shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5 shrink-0" />
          <span>Book Mechanic Now</span>
        </button>
      </div>

      </main>
      )}

      {/* PRIVACY POLICY VIEW */}
      {currentView === "privacy" && (
        <main className="pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 animate-in fade-in duration-300">
          <button
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-yellow-400 hover:text-black dark:bg-zinc-800 dark:hover:bg-yellow-400 dark:hover:text-black text-gray-800 dark:text-zinc-200 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-sm active:scale-95"
          >
            ← Back to Home
          </button>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200/90 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl space-y-6">
            <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Privacy Policy</h1>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 font-medium">Last updated: September 2026 • Yes Bike Service Bengaluru</p>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-zinc-300 leading-relaxed">
              <p>At Yes Bike Service, we are committed to safeguarding your privacy. This privacy policy explains how we collect, store, and utilize your personal information when you book our doorstep two-wheeler service in Bengaluru.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">1. Information We Collect</h2>
              <p>When you book a service, we collect minimal information necessary for fulfillment: your name, phone number, vehicle make and model, service location/locality in Bengaluru, and chosen date and time.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">2. How We Use Your Data</h2>
              <p>Your information is used strictly to dispatch our certified mechanics, send live dispatch confirmations via WhatsApp or SMS, and provide transparent service billing.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">3. Data Protection & Security</h2>
              <p>We respect customer privacy and do not sell, rent, or trade your personal information to third parties or marketing brokers. All communication is securely handled.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">4. Contact & Inquiries</h2>
              <p>For any privacy-related questions, reach out to our team at <a href="mailto:help@yesbikeservice.in" className="text-yellow-600 dark:text-yellow-400 font-bold underline">help@yesbikeservice.in</a> or call <a href="tel:+917090400617" className="text-yellow-600 dark:text-yellow-400 font-bold underline">+91 70904 00617</a>.</p>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
              <button
                onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black text-sm cursor-pointer shadow-md transition-all active:scale-95"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </main>
      )}

      {/* TERMS OF SERVICE VIEW */}
      {currentView === "terms" && (
        <main className="pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 animate-in fade-in duration-300">
          <button
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-yellow-400 hover:text-black dark:bg-zinc-800 dark:hover:bg-yellow-400 dark:hover:text-black text-gray-800 dark:text-zinc-200 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-sm active:scale-95"
          >
            ← Back to Home
          </button>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200/90 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-xl space-y-6">
            <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Terms of Service</h1>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 font-medium">Last updated: September 2026 • Yes Bike Service Bengaluru</p>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-zinc-300 leading-relaxed">
              <p>Welcome to Yes Bike Service. By booking a doorstep two-wheeler service or accessing our platform, you agree to these Terms of Service.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">1. Scope of Doorstep Services</h2>
              <p>Yes Bike Service provides doorstep two-wheeler maintenance, general servicing, engine oil changes, battery jump starts, and repair inspections across Bengaluru. Services are performed at your home, office, or accessible roadside parking location.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">2. Pricing & Transparent Payment</h2>
              <p>All service package prices are transparently displayed without hidden charges. Payment is due only after your bike service is completed and verified. We accept UPI (Google Pay, PhonePe, Paytm), cash, and digital payments.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">3. Service Warranty</h2>
              <p>Qualifying general services carry a 500 km or 1-month warranty on workmanship for inspected components. The warranty applies under standard riding conditions.</p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pt-2">4. Support & Rescheduling</h2>
              <p>Need to reschedule or have questions? Contact us at <a href="tel:+917090400617" className="text-yellow-600 dark:text-yellow-400 font-bold underline">+91 70904 00617</a> or email <a href="mailto:help@yesbikeservice.in" className="text-yellow-600 dark:text-yellow-400 font-bold underline">help@yesbikeservice.in</a>.</p>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
              <button
                onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black text-sm cursor-pointer shadow-md transition-all active:scale-95"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

