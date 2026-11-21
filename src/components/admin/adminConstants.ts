import { Booking, BookingStatus, Mechanic } from '../../types/admin';

export interface ServicePackageItem {
  id: string;
  name: string;
  price: number;
  priceLabel?: string;
  duration: string;
  category: 'Periodic' | 'Breakdown' | 'Royal Enfield';
  popular?: boolean;
  items: string[];
}

export const BENGALURU_ZONES = [
  'Indiranagar',
  'Koramangala',
  'HSR Layout',
  'Whitefield',
  'BTM Layout',
  'Jayanagar',
  'Electronic City',
  'Marathahalli',
  'Bellandur',
  'Hebbal',
  'Yelahanka',
  'JP Nagar'
];

export const DEFAULT_SERVICE_PACKAGES: ServicePackageItem[] = [
  {
    id: 'pkg-basic',
    name: 'Basic General Service',
    price: 699,
    priceLabel: '₹699',
    duration: '45 - 60 Mins',
    category: 'Periodic',
    popular: true,
    items: [
      '12-Point Doorstep Safety Inspection',
      'Air Filter Cleaning & Intake Inspection',
      'Brake Check, Adjustment & Cable Tuning',
      'Chain Tensioning & Synthetic Lubrication',
      'Dry Wash & 1-Month / 500 KM Warranty'
    ]
  },
  {
    id: 'pkg-oil',
    name: 'General Service with Engine Oil',
    price: 1349,
    priceLabel: '₹1,349',
    duration: '60 - 90 Mins',
    category: 'Periodic',
    popular: true,
    items: [
      'Complete 12-Point Doorstep General Service',
      'Engine Oil Replacement Included (10W-30 / 20W-40)',
      'Air Filter Cleaning & Spark Plug Service',
      'Front & Rear Brake Adjustment & Degreasing',
      'Dry Wash & 1-Month / 500 KM Warranty'
    ]
  },
  {
    id: 'pkg-re-350-500',
    name: 'Royal Enfield 350cc–500cc General Service with Engine Oil',
    price: 2399,
    priceLabel: '₹2,399/-',
    duration: '90 - 120 Mins',
    category: 'Royal Enfield',
    items: [
      'Engine Oil Replacement',
      'Oil Filter Cleaning / Replacement',
      'Air Filter Cleaning',
      'Spark Plug Cleaning',
      'Brake Inspection & Adjustment',
      'Clutch Adjustment',
      'Chain Cleaning & Lubrication',
      'Chain Tension Adjustment',
      'Battery Check-up',
      'Electrical Check-up',
      'Cable & Lever Adjustment',
      'Nut & Bolt Tightening',
      'Engine Leakage Inspection',
      'General Lubrication',
      'Full Bike Inspection',
      'Dry Wash'
    ]
  },
  {
    id: 'pkg-re-650-twin',
    name: 'Royal Enfield 650 cc General Service with Engine Oil Twin',
    price: 3999,
    priceLabel: '₹3,999',
    duration: '90 - 120 Mins',
    category: 'Royal Enfield',
    items: [
      'Engine Oil Replacement',
      'Oil Filter Cleaning / Replacement',
      'Air Filter Cleaning',
      'Spark Plug Cleaning',
      'Brake Inspection & Adjustment',
      'Clutch Adjustment',
      'Chain Cleaning & Lubrication',
      'Chain Tension Adjustment',
      'Battery Check-up',
      'Electrical Check-up',
      'Cable & Lever Adjustment',
      'Nut & Bolt Tightening',
      'Engine Leakage Inspection',
      'General Lubrication',
      'Full Bike Inspection',
      'Dry Wash'
    ]
  },
  {
    id: 'pkg-jump-start',
    name: 'Jump Start Service',
    price: 449,
    priceLabel: '₹449',
    duration: '30 Mins',
    category: 'Breakdown',
    items: [
      'Express 30-Min Doorstep / Roadside Arrival',
      'Safe 12V Portable Battery Jump Start (Bikes & Scooters)',
      'Battery Voltage & Charging Coil Health Test',
      'Battery Terminal Cleaning & Rust Removal',
      'Starter Relay & Fuse Continuity Check'
    ]
  },
  {
    id: 'pkg-puncture',
    name: 'Puncture Repair',
    price: 599,
    priceLabel: '₹599',
    duration: '30 - 45 Mins',
    category: 'Breakdown',
    items: [
      'On-Spot Doorstep / Roadside Tyre Puncture Fix',
      'Tubeless Plug / Tube Patch Repair',
      'Valve Pin & Rim Bead Leak Check',
      'Cold Tyre Pressure Calibration (Front & Rear)',
      'Tread Wear & Safety Inspection'
    ]
  },
  {
    id: 'pkg-inspection',
    name: 'Inspection & Repair',
    price: 399,
    priceLabel: 'Starting at ₹399',
    duration: '30 - 60 Mins',
    category: 'Breakdown',
    items: [
      'Doorstep Multi-Point Fault Diagnosis',
      'Starting Trouble, Electrical & Braking Checks',
      'Minor Adjustments & Cable Fixes On-Spot',
      'Transparent Spare Parts & Repair Estimate',
      'Zero Hidden Charges · Pay After Service'
    ]
  }
];

export const BOOKING_STATUS_META: Record<
  BookingStatus,
  {
    label: string;
    shortLabel: string;
    badgeClass: string;
    dotClass: string;
    nextStatus?: BookingStatus;
    nextLabel?: string;
    stepNumber: number;
  }
> = {
  pending: {
    label: 'Pending',
    shortLabel: 'Pending',
    badgeClass: 'bg-amber-400/12 text-amber-300 border-amber-400/30',
    dotClass: 'bg-amber-400',
    nextStatus: 'accepted',
    nextLabel: 'Accept',
    stepNumber: 1
  },
  accepted: {
    label: 'Accepted',
    shortLabel: 'Accepted',
    badgeClass: 'bg-blue-500/12 text-blue-300 border-blue-500/30',
    dotClass: 'bg-blue-400',
    nextStatus: 'mechanic_assigned',
    nextLabel: 'Assign',
    stepNumber: 2
  },
  mechanic_assigned: {
    label: 'Mechanic Assigned',
    shortLabel: 'Assigned',
    badgeClass: 'bg-purple-500/12 text-purple-300 border-purple-500/30',
    dotClass: 'bg-purple-400',
    nextStatus: 'on_the_way',
    nextLabel: 'Dispatch',
    stepNumber: 3
  },
  on_the_way: {
    label: 'On The Way',
    shortLabel: 'En Route',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/35',
    dotClass: 'bg-amber-400',
    nextStatus: 'mechanic_reached',
    nextLabel: 'Reached',
    stepNumber: 4
  },
  mechanic_reached: {
    label: 'Mechanic Reached',
    shortLabel: 'Reached',
    badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-500/35',
    dotClass: 'bg-sky-400',
    nextStatus: 'service_started',
    nextLabel: 'Start Service',
    stepNumber: 5
  },
  service_started: {
    label: 'Service Started',
    shortLabel: 'In Progress',
    badgeClass: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/35',
    dotClass: 'bg-yellow-400',
    nextStatus: 'completed',
    nextLabel: 'Complete',
    stepNumber: 6
  },
  completed: {
    label: 'Completed',
    shortLabel: 'Completed',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35',
    dotClass: 'bg-emerald-400',
    stepNumber: 7
  },
  cancelled: {
    label: 'Cancelled',
    shortLabel: 'Cancelled',
    badgeClass: 'bg-red-500/15 text-red-300 border-red-500/35',
    dotClass: 'bg-red-400',
    stepNumber: 0
  }
};

export interface AdminBusinessSettings {
  helpline: string;
  whatsappNumber: string;
  workingHours: string;
  coverageArea: string;
  gstin: string;
}

export const DEFAULT_BUSINESS_SETTINGS: AdminBusinessSettings = {
  helpline: '+91 7090400617',
  whatsappNumber: '917090400617',
  workingHours: '8:00 AM - 8:00 PM (Monday to Sunday)',
  coverageArea: 'Doorstep anywhere in Bengaluru within 10-15 km radius of hubs',
  gstin: '29AABCY1234F1Z5'
};

export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 10) return `91${digits}`;
  return digits;
};

export const buildCustomerWhatsAppUrl = (booking: Booking): string => {
  const phoneWithCountry = normalizePhone(booking.phone);
  const msg = `🏍️🛵 *YES BIKE SERVICE | BENGALURU*\n\nHello *${booking.customerName}*! 👋\nRegarding your Doorstep Service Booking *${booking.id}* for *${booking.brand} ${booking.model}*:\n\n🔧 *Service:* ${booking.serviceType}\n📅 *Date:* ${booking.date}\n⏰ *Time:* ${booking.time}\n📍 *Location:* ${booking.location}\n👷 *Mechanic:* ${booking.mechanicName || 'Assigned shortly'}\n💰 *Amount:* ₹${booking.amount} (${booking.paymentStatus})\n\nOur verified technician is preparing your service kit. Feel free to reply here if you have any questions!\n\n⭐ *Quality Bike Care at Your Doorstep!*`;
  return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`;
};

export const buildMechanicWhatsAppUrl = (
  booking: Booking,
  mechanics: Mechanic[],
  fallbackWhatsApp = '917090400617'
): string => {
  const mech = mechanics.find((m) => m.id === booking.mechanicId || m.name === booking.mechanicName);
  const targetPhone = mech?.phone || fallbackWhatsApp;
  const phoneWithCountry = normalizePhone(targetPhone);
  const msg = `🏍️🛵 *YES BIKE SERVICE — DOORSTEP MECHANIC DISPATCH*\n\nQuality Bike Care at Your Doorstep!\nSit back and relax. We've got your bike covered!\n\n📋 *JOB DISPATCH DETAILS:*\n🆔 *Booking ID:* #${booking.id}\n👤 *Customer:* ${booking.customerName}\n📞 *Customer Phone:* ${booking.phone}\n📍 *Location:* ${booking.location}\n🗺️ *Google Maps:* ${booking.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(booking.location + ' Bengaluru')}`}\n🏍️ *Vehicle:* ${booking.brand} ${booking.model}${booking.registrationNumber ? ` (${booking.registrationNumber})` : ''}\n🔧 *Package:* ${booking.serviceType}\n📅 *Date:* ${booking.date}\n⏰ *Time:* ${booking.time}\n💰 *Amount:* ₹${booking.amount} (${booking.paymentStatus})\n👷 *Assigned Mechanic:* ${booking.mechanicName || 'On Duty Technician'}\n\n*Action:* Please confirm job acceptance and proceed with standard tool kit and genuine consumables.`;
  return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`;
};
