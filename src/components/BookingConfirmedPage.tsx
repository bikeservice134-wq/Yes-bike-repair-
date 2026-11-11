import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Wrench,
  Clock,
  Calendar,
  ShieldCheck,
  ArrowLeft,
  Printer,
  Sparkles,
  Bike,
  Check,
  Copy,
  Share2
} from 'lucide-react';

export interface BookingConfirmedDetails {
  bookingId: string;
  fullName: string;
  phone: string;
  vehicle: string;
  brand: string;
  model: string;
  location: string;
  service: string;
  timing: string;
  date?: string;
  time?: string;
  rawMessage?: string;
  estimatedPrice: string;
  timestamp?: string;
}

interface BookingConfirmedPageProps {
  data: BookingConfirmedDetails | null;
  onReturnToHome: () => void;
}

export const BookingConfirmedPage: React.FC<BookingConfirmedPageProps> = ({
  data,
  onReturnToHome
}) => {
  // Fallback data if accessed directly
  const booking: BookingConfirmedDetails = data || {
    bookingId: 'ID-11088',
    fullName: 'Valued Customer',
    phone: '+91 70904 00617',
    vehicle: 'Bike / Scooter',
    brand: 'Honda / Royal Enfield / Yamaha / TVS',
    model: 'Two-Wheeler Doorstep Care',
    location: 'Bengaluru (Doorstep Service)',
    service: 'General Service & Inspection',
    timing: 'Scheduled for Today',
    date: new Date().toISOString().split('T')[0],
    time: 'Within 30-45 Mins',
    estimatedPrice: 'Pay After Service',
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  };

  const [imageError, setImageError] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(599); // 10 minutes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const supportWhatsAppUrl = `https://wa.me/917090400617?text=${encodeURIComponent(
    `Hi YES BIKE SERVICE! My booking ID is #${booking.bookingId} for ${booking.brand} ${booking.model} in ${booking.location}. Please confirm my mechanic dispatch.`
  )}`;

  const mechanicWhatsAppUrl = `https://wa.me/917090400617?text=${encodeURIComponent(
    `🏍️🛵 *YES BIKE SERVICE — DOORSTEP MECHANIC DISPATCH*\n\nQuality Bike Care at Your Doorstep!\nSit back and relax. We've got your bike covered!\n\n📋 *BOOKING DISPATCH DETAILS:*\n🆔 *Booking ID:* #${booking.bookingId}\n👤 *Customer:* ${booking.fullName}\n📞 *Customer Phone:* ${booking.phone}\n📍 *Service Location:* ${booking.location}\n🗺️ *Maps:* https://maps.google.com/?q=${encodeURIComponent(booking.location + ' Bengaluru')}\n🏍️ *Vehicle:* ${booking.brand} ${booking.model}\n🔧 *Package:* ${booking.service}\n📅 *Scheduled:* ${booking.timing || `${booking.date} at ${booking.time}`}\n💰 *Estimated Amount:* ${booking.estimatedPrice}\n\n👷 *Mechanic:* Please confirm arrival time and proceed to customer doorstep.`
  )}`;

  const handleCopyBookingId = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(booking.bookingId);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = booking.bookingId;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: `YES BIKE SERVICE Confirmation #${booking.bookingId}`,
          text: `My bike service booking #${booking.bookingId} is confirmed with YES BIKE SERVICE Bengaluru for ${booking.brand} ${booking.model}.`,
          url: window.location.href,
        });
      } catch {}
    } else {
      window.open(supportWhatsAppUrl, '_blank');
    }
  };

  return (
    <main className="min-h-screen pt-16 sm:pt-18 pb-12 bg-gradient-to-b from-amber-500/10 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-xl mx-auto px-3 sm:px-4 space-y-3.5">
        
        {/* TOP BAR / BREADCRUMB */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onReturnToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-amber-400 hover:text-zinc-950 dark:bg-zinc-850 dark:hover:bg-amber-400 dark:hover:text-zinc-950 text-gray-800 dark:text-zinc-200 text-xs font-black transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:border-amber-400 text-gray-700 dark:text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
              title="Share Booking Summary"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:border-amber-400 text-gray-700 dark:text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5 text-amber-500" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* COMPACT CONFIRMATION CARD */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200/90 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden text-center space-y-3.5">
          {/* Subtle warm halo glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* LARGE SUCCESS ICON (PROPORTIONATELY SIZED FOR COMPACT VIEW) */}
          <div className="relative mx-auto flex flex-col items-center justify-center pt-0.5">
            <div className="relative group">
              {/* Soft glowing halo */}
              <div className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-lg animate-pulse pointer-events-none" />
              
              {/* Success Badge */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md shadow-emerald-500/25 ring-4 ring-emerald-500/20 bg-[#008037] flex items-center justify-center transition-transform duration-300 hover:scale-105">
                {!imageError ? (
                  <img
                    src="/assets/aistudio/IMG-20261111-WA0001_bbce814c.jpg"
                    alt="Booking Confirmed Success Icon"
                    className="w-full h-full object-cover object-center scale-110"
                    loading="eager"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-[#008037] rounded-full flex items-center justify-center p-3.5">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-inner">
                      <svg className="w-10 h-10 text-[#008037] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EXACT REQUIRED PROMPT TEXT HEADERS */}
          <div className="relative space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              BOOKING CONFIRMED!
            </h1>
            <h2 className="text-sm sm:text-base font-black text-amber-600 dark:text-amber-400 tracking-tight">
              Thank You for Choosing YES BIKE SERVICE!
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Your booking has been successfully confirmed!</span>
            </div>
          </div>

          {/* COMPACT 10-MINUTE DISPATCH PROGRESS */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5 text-left">
            <div className="flex items-center justify-between flex-wrap gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black text-gray-900 dark:text-white">
                  Mechanic Dispatch in Progress
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-700 dark:text-amber-300 bg-white/80 dark:bg-zinc-900/80 px-2 py-0.5 rounded-md border border-amber-500/20">
                <Clock className="w-3 h-3" />
                <span>Call Expected: {formatCountdown(secondsRemaining)}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-500 h-1.5 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${Math.min(100, Math.max(12, ((600 - secondsRemaining) / 600) * 100))}%` }}
              />
            </div>
          </div>

          {/* EXACT REQUIRED BULLETS & HIGHLIGHTS */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 dark:text-amber-300">
                <span className="text-sm">📞</span>
                <span>Team Callback in 10 Mins</span>
              </div>
              <p className="text-[11px] font-medium text-gray-800 dark:text-zinc-200 leading-snug">
                Our team will call you within 10 minutes to confirm your service details and mechanic assignment.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-850 border border-gray-200/80 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 dark:text-white">
                <span className="text-sm">🏍️</span>
                <span>Hassle-Free Doorstep Arrival</span>
              </div>
              <p className="text-[11px] font-medium text-gray-700 dark:text-zinc-300 leading-snug">
                Our professional mechanic will arrive at your doorstep to provide hassle-free bike and scooter servicing.
              </p>
            </div>
          </div>

          {/* EXACT REQUIRED TAGLINE BANNER WITH WHATSAPP MECHANIC SEND */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 shadow-xs text-center space-y-2">
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-black tracking-wide uppercase">
                Quality Bike Care at Your Doorstep!
              </div>
              <p className="text-[11px] sm:text-xs font-bold opacity-95">
                Sit back and relax. We've got your bike covered!
              </p>
            </div>

            <div className="pt-0.5 flex items-center justify-center gap-2 flex-wrap">
              <a
                href={mechanicWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#20ba5a] text-white font-black text-xs shadow-md shadow-black/15 active:scale-95 transition-all cursor-pointer"
                title="Send dispatch details to doorstep mechanic on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp mechanic send</span>
              </a>

              <a
                href={supportWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950/85 hover:bg-zinc-950 text-white font-black text-xs shadow-md shadow-black/15 active:scale-95 transition-all cursor-pointer"
                title="Customer WhatsApp Support"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* COMPACT VERIFIED BOOKING DETAILS RECEIPT SLIP */}
          <div className="text-left pt-1">
            <div className="p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-200/80 dark:border-zinc-800 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-zinc-800 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 text-zinc-950 font-black flex items-center justify-center text-[10px]">
                    YB
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase block">
                      Booking Ref
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400">
                        #{booking.bookingId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyBookingId}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-200/80 hover:bg-amber-400 hover:text-zinc-950 dark:bg-zinc-800 dark:hover:bg-amber-400 dark:hover:text-zinc-950 text-gray-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        title="Copy Reference ID"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Confirmed
                  </span>
                  <span className="text-[9px] text-gray-500 dark:text-zinc-400 block mt-0.5">
                    Zero Advance
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80">
                  <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase block">
                    Customer Name
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block truncate">
                    {booking.fullName}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80">
                  <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase block">
                    Mobile Number
                  </span>
                  <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400 block truncate">
                    {booking.phone}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80">
                  <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase block">
                    Vehicle
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block truncate flex items-center gap-1">
                    <Bike className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{booking.brand} {booking.model}</span>
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80">
                  <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase block">
                    Location
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white block truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{booking.location}</span>
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 col-span-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase block">
                        Service Package
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block truncate">
                        {booking.service}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 uppercase block">
                        Estimated
                      </span>
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400 block">
                        {booking.estimatedPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Promise Note */}
              <div className="pt-2 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between text-[10px] font-semibold text-gray-600 dark:text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>100% Satisfaction Guarantee</span>
                </span>
                <span>Pay after service (UPI / Cash)</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (WHATSAPP, CALL, RETURN HOME) */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2">
            <a
              href={mechanicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#20ba5a] text-white font-black text-xs shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp mechanic send</span>
            </a>

            <a
              href="tel:+917090400617"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-bold text-xs border border-gray-200 dark:border-zinc-700 transition-all cursor-pointer active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Call Helpline</span>
            </a>

            <button
              type="button"
              onClick={onReturnToHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-black text-xs shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>Back Home</span>
            </button>
          </div>
        </div>

        {/* 4 COMPACT DOORSTEP SERVICE HIGHLIGHTS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-0.5">
            <Clock className="w-4 h-4 text-amber-500 mx-auto" />
            <div className="font-bold text-gray-900 dark:text-white text-[11px]">10-Min Call</div>
            <p className="text-[9px] text-gray-500 dark:text-zinc-400">Supervisor dispatch</p>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-0.5">
            <Bike className="w-4 h-4 text-amber-500 mx-auto" />
            <div className="font-bold text-gray-900 dark:text-white text-[11px]">Doorstep</div>
            <p className="text-[9px] text-gray-500 dark:text-zinc-400">Home or office</p>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-0.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto" />
            <div className="font-bold text-gray-900 dark:text-white text-[11px]">100% Genuine</div>
            <p className="text-[9px] text-gray-500 dark:text-zinc-400">Verified lubricants</p>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-0.5">
            <Sparkles className="w-4 h-4 text-amber-500 mx-auto" />
            <div className="font-bold text-gray-900 dark:text-white text-[11px]">Pay After</div>
            <p className="text-[9px] text-gray-500 dark:text-zinc-400">Zero advance</p>
          </div>
        </div>

      </div>
    </main>
  );
};
