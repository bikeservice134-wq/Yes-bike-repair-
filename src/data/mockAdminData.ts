import { Booking, Mechanic, Customer, Invoice, JobCard } from '../types/admin';

export const INITIAL_MECHANICS: Mechanic[] = [
  {
    id: 'MEC-101',
    name: 'Ramesh Kumar',
    phone: '+91 98450 12345',
    experience: '8 Years',
    rating: 4.9,
    status: 'available',
    completedJobs: 412,
    specialties: ['Royal Enfield Specialist', 'Carburetor & EFI Tuning', 'Engine Overhaul'],
    assignedArea: 'HSR Layout & Koramangala'
  },
  {
    id: 'MEC-102',
    name: 'Suresh M.',
    phone: '+91 98860 23456',
    experience: '6 Years',
    rating: 4.8,
    status: 'on_job',
    activeBookingId: 'ID-11078',
    completedJobs: 328,
    specialties: ['KTM & Performance Bikes', 'Disc Brake & ABS Calibration', 'Electrical Wiring'],
    assignedArea: 'Indiranagar & Domlur'
  },
  {
    id: 'MEC-103',
    name: 'Anand Rao',
    phone: '+91 97410 34567',
    experience: '10 Years',
    rating: 4.95,
    status: 'available',
    completedJobs: 560,
    specialties: ['Honda & TVS Scooters', 'CVT Belt & Transmission', 'General Service'],
    assignedArea: 'Whitefield & Marathahalli'
  },
  {
    id: 'MEC-104',
    name: 'Manjunath K.',
    phone: '+91 99000 45678',
    experience: '5 Years',
    rating: 4.75,
    status: 'available',
    completedJobs: 245,
    specialties: ['Yamaha & Bajaj Bikes', 'Clutch Plate Overhaul', 'Chain Sprocket Assembly'],
    assignedArea: 'BTM Layout & Jayanagar'
  },
  {
    id: 'MEC-105',
    name: 'Imran Khan',
    phone: '+91 96110 56789',
    experience: '7 Years',
    rating: 4.85,
    status: 'off_duty',
    completedJobs: 389,
    specialties: ['Electric 2-Wheelers (Ather/Ola)', 'Battery Diagnostics', 'Fast Doorstep Service'],
    assignedArea: 'Electronic City'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'ID-11078',
    customerName: 'OSMAN GONI',
    phone: '+91 8867353838',
    location: 'HSR Layout, Bengaluru',
    addressDetails: '#42, 14th Main, Sector 4, Near BDA Complex, HSR Layout, Bengaluru - 560102',
    googleMapsUrl: 'https://maps.google.com/?q=HSR+Layout+Bengaluru',
    vehicleType: 'Bike',
    brand: 'KTM',
    model: 'Duke 250',
    registrationNumber: 'KA-01-EQ-4421',
    serviceType: 'Basic General Service - ₹699',
    customerComplaint: 'Chain slackness and mild engine vibration at 4000 RPM',
    customerNotes: 'Please carry Motul 7100 10W50 synthetic oil',
    date: '2026-11-09',
    time: '12:01 AM',
    mechanicId: 'MEC-102',
    mechanicName: 'Suresh M.',
    amount: 699,
    advancePaid: 0,
    remainingBalance: 699,
    paymentMethod: 'UPI / GPay',
    paymentStatus: 'Unpaid',
    status: 'mechanic_assigned',
    createdAt: '2026-11-09T00:01:00.000Z',
    isNew: true,
    history: [
      {
        timestamp: '2026-11-09 00:01',
        status: 'pending',
        note: 'Customer booked via doorstep form',
        updatedBy: 'System'
      },
      {
        timestamp: '2026-11-09 00:03',
        status: 'accepted',
        note: 'Booking acknowledged by Admin',
        updatedBy: 'Admin Dispatch'
      },
      {
        timestamp: '2026-11-09 00:05',
        status: 'mechanic_assigned',
        note: 'Assigned to Suresh M. (KTM specialist)',
        updatedBy: 'Admin Dispatch'
      }
    ]
  },
  {
    id: 'ID-11079',
    customerName: 'Rahul Mehta',
    phone: '+91 98451 98122',
    location: 'Indiranagar, Bengaluru',
    addressDetails: 'Flat 302, Palm Grove Apts, 12th Cross, 100ft Road, Indiranagar',
    googleMapsUrl: 'https://maps.google.com/?q=Indiranagar+100ft+road+Bengaluru',
    vehicleType: 'Bike',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    registrationNumber: 'KA-03-MR-8812',
    serviceType: 'Standard General Service - ₹999',
    customerComplaint: 'Front disc brake squeal and engine oil change required',
    customerNotes: 'Available after 10 AM',
    date: '2026-11-09',
    time: '10:30 AM',
    mechanicId: 'MEC-101',
    mechanicName: 'Ramesh Kumar',
    amount: 999,
    advancePaid: 500,
    remainingBalance: 499,
    paymentMethod: 'UPI / GPay',
    paymentStatus: 'Partial',
    status: 'on_the_way',
    createdAt: '2026-11-09T08:15:00.000Z',
    isNew: false,
    history: [
      {
        timestamp: '2026-11-09 08:15',
        status: 'pending',
        note: 'Booking placed online',
        updatedBy: 'Customer'
      },
      {
        timestamp: '2026-11-09 08:20',
        status: 'accepted',
        note: 'Confirmed with customer',
        updatedBy: 'Admin'
      },
      {
        timestamp: '2026-11-09 08:25',
        status: 'mechanic_assigned',
        note: 'Ramesh Kumar assigned',
        updatedBy: 'Admin'
      },
      {
        timestamp: '2026-11-09 10:00',
        status: 'on_the_way',
        note: 'Mechanic departed from Koramangala hub',
        updatedBy: 'Ramesh Kumar'
      }
    ]
  },
  {
    id: 'ID-11080',
    customerName: 'Sneha Kulkarni',
    phone: '+91 97412 44331',
    location: 'Koramangala, Bengaluru',
    addressDetails: '#18, 5th Block, near Jyoti Nivas College, Koramangala',
    googleMapsUrl: 'https://maps.google.com/?q=Koramangala+5th+Block+Bengaluru',
    vehicleType: 'Scooter',
    brand: 'Honda',
    model: 'Activa 6G',
    registrationNumber: 'KA-05-JL-1904',
    serviceType: 'Comprehensive Full Service - ₹1499',
    customerComplaint: 'Self-start button not working consistently, mileage reduced',
    customerNotes: 'Please test battery voltage and clean spark plug',
    date: '2026-11-09',
    time: '11:00 AM',
    mechanicId: 'MEC-103',
    mechanicName: 'Anand Rao',
    amount: 1499,
    advancePaid: 0,
    remainingBalance: 1499,
    paymentMethod: 'Cash',
    paymentStatus: 'Unpaid',
    status: 'service_started',
    createdAt: '2026-11-09T07:30:00.000Z',
    isNew: false,
    history: [
      {
        timestamp: '2026-11-09 07:30',
        status: 'pending',
        note: 'New online request',
        updatedBy: 'Customer'
      },
      {
        timestamp: '2026-11-09 08:00',
        status: 'accepted',
        note: 'Confirmed',
        updatedBy: 'Admin'
      },
      {
        timestamp: '2026-11-09 08:30',
        status: 'mechanic_assigned',
        note: 'Anand Rao assigned',
        updatedBy: 'Admin'
      },
      {
        timestamp: '2026-11-09 10:30',
        status: 'mechanic_reached',
        note: 'Mechanic arrived at doorstep',
        updatedBy: 'Anand Rao'
      },
      {
        timestamp: '2026-11-09 11:05',
        status: 'service_started',
        note: 'Pre-service 12-point inspection completed, starting oil change',
        updatedBy: 'Anand Rao'
      }
    ]
  },
  {
    id: 'ID-11081',
    customerName: 'Vikram Sundaram',
    phone: '+91 99011 87654',
    location: 'Whitefield, Bengaluru',
    addressDetails: 'Villa 14, Prestige Silver Oak, ECC Road, Whitefield',
    googleMapsUrl: 'https://maps.google.com/?q=Prestige+Silver+Oak+Whitefield',
    vehicleType: 'Bike',
    brand: 'Bajaj',
    model: 'Pulsar NS200',
    registrationNumber: 'KA-53-MC-3319',
    serviceType: 'Breakdown & Emergency Repair - ₹499',
    customerComplaint: 'Bike stalled near ITPL back gate, clutch wire snapped',
    customerNotes: 'Urgent assistance needed',
    date: '2026-11-09',
    time: '09:00 AM',
    mechanicId: 'MEC-104',
    mechanicName: 'Manjunath K.',
    amount: 799,
    advancePaid: 799,
    remainingBalance: 0,
    paymentMethod: 'UPI / GPay',
    paymentStatus: 'Paid',
    status: 'completed',
    createdAt: '2026-11-09T08:45:00.000Z',
    isNew: false,
    history: [
      {
        timestamp: '2026-11-09 08:45',
        status: 'pending',
        note: 'Emergency request received',
        updatedBy: 'Customer'
      },
      {
        timestamp: '2026-11-09 08:50',
        status: 'accepted',
        note: 'Emergency dispatch triggered',
        updatedBy: 'Admin'
      },
      {
        timestamp: '2026-11-09 08:52',
        status: 'mechanic_assigned',
        note: 'Manjunath K. assigned nearby',
        updatedBy: 'Admin'
      },
      {
        timestamp: '2026-11-09 09:12',
        status: 'mechanic_reached',
        note: 'Reached breakdown location',
        updatedBy: 'Manjunath K.'
      },
      {
        timestamp: '2026-11-09 09:15',
        status: 'service_started',
        note: 'New OEM clutch cable replaced and lever adjusted',
        updatedBy: 'Manjunath K.'
      },
      {
        timestamp: '2026-11-09 09:45',
        status: 'completed',
        note: 'Bike test driven & handed over. Payment collected via GPay.',
        updatedBy: 'Manjunath K.'
      }
    ]
  },
  {
    id: 'ID-11082',
    customerName: 'Priya Nambiar',
    phone: '+91 98440 55123',
    location: 'BTM Layout, Bengaluru',
    addressDetails: 'Flat 101, Lakeview Residency, 7th Main, BTM 2nd Stage',
    googleMapsUrl: 'https://maps.google.com/?q=BTM+Layout+2nd+Stage+Bengaluru',
    vehicleType: 'Scooter',
    brand: 'TVS',
    model: 'Jupiter 125',
    registrationNumber: 'KA-05-NE-6042',
    serviceType: 'Basic General Service - ₹699',
    customerComplaint: 'Periodic checkup, check tyre air and rear brake tightness',
    customerNotes: 'Prefer evening slot 4 PM',
    date: '2026-11-09',
    time: '04:00 PM',
    amount: 699,
    advancePaid: 0,
    remainingBalance: 699,
    paymentMethod: 'Pending',
    paymentStatus: 'Unpaid',
    status: 'pending',
    createdAt: '2026-11-09T09:30:00.000Z',
    isNew: true,
    history: [
      {
        timestamp: '2026-11-09 09:30',
        status: 'pending',
        note: 'New booking submitted from customer portal',
        updatedBy: 'Customer'
      }
    ]
  },
  {
    id: 'ID-11083',
    customerName: 'Karthik Raja',
    phone: '+91 97390 11990',
    location: 'Electronic City, Bengaluru',
    addressDetails: '#89, Phase 1, near Wipro Gate 5, Electronic City',
    googleMapsUrl: 'https://maps.google.com/?q=Electronic+City+Phase+1+Bengaluru',
    vehicleType: 'Bike',
    brand: 'Yamaha',
    model: 'FZ-S FI',
    registrationNumber: 'KA-51-AB-1290',
    serviceType: 'Standard General Service - ₹999',
    customerComplaint: 'Customer called to reschedule due to office travel',
    customerNotes: 'Cancelled by customer',
    date: '2026-11-08',
    time: '02:00 PM',
    amount: 999,
    advancePaid: 0,
    remainingBalance: 999,
    paymentMethod: 'Cash',
    paymentStatus: 'Unpaid',
    status: 'cancelled',
    createdAt: '2026-11-08T11:00:00.000Z',
    isNew: false,
    history: [
      {
        timestamp: '2026-11-08 11:00',
        status: 'pending',
        note: 'Booking submitted',
        updatedBy: 'Customer'
      },
      {
        timestamp: '2026-11-08 11:45',
        status: 'cancelled',
        note: 'Customer requested cancellation - travelling out of town',
        updatedBy: 'Admin'
      }
    ]
  },
  {
    id: 'ID-11084',
    customerName: 'Arun Kumar',
    phone: '+91 99800 66554',
    location: 'Jayanagar, Bengaluru',
    addressDetails: '#314, 4th Block, 9th Main, Jayanagar',
    googleMapsUrl: 'https://maps.google.com/?q=Jayanagar+4th+Block+Bengaluru',
    vehicleType: 'Bike',
    brand: 'Royal Enfield',
    model: 'Hunter 350',
    registrationNumber: 'KA-05-MK-7723',
    serviceType: 'Comprehensive Full Service - ₹1499',
    customerComplaint: 'Hard clutch, brake fluid flush, engine oil replacement',
    customerNotes: 'Mechanic on the way',
    date: '2026-11-09',
    time: '02:30 PM',
    mechanicId: 'MEC-101',
    mechanicName: 'Ramesh Kumar',
    amount: 1499,
    advancePaid: 1499,
    remainingBalance: 0,
    paymentMethod: 'UPI / GPay',
    paymentStatus: 'Paid',
    status: 'accepted',
    createdAt: '2026-11-09T09:00:00.000Z',
    isNew: true,
    history: [
      {
        timestamp: '2026-11-09 09:00',
        status: 'pending',
        note: 'Booking received',
        updatedBy: 'Customer'
      },
      {
        timestamp: '2026-11-09 09:15',
        status: 'accepted',
        note: 'Admin accepted booking',
        updatedBy: 'Admin'
      }
    ]
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'OSMAN GONI',
    phone: '+91 8867353838',
    location: 'HSR Layout, Bengaluru',
    totalBookings: 1,
    totalSpent: 699,
    lastBookingDate: '2026-11-09',
    vehicle: 'KTM Duke 250'
  },
  {
    id: 'CUST-002',
    name: 'Rahul Mehta',
    phone: '+91 98451 98122',
    location: 'Indiranagar, Bengaluru',
    totalBookings: 3,
    totalSpent: 3497,
    lastBookingDate: '2026-11-09',
    vehicle: 'Royal Enfield Classic 350'
  },
  {
    id: 'CUST-003',
    name: 'Sneha Kulkarni',
    phone: '+91 97412 44331',
    location: 'Koramangala, Bengaluru',
    totalBookings: 2,
    totalSpent: 2198,
    lastBookingDate: '2026-11-09',
    vehicle: 'Honda Activa 6G'
  },
  {
    id: 'CUST-004',
    name: 'Vikram Sundaram',
    phone: '+91 99011 87654',
    location: 'Whitefield, Bengaluru',
    totalBookings: 4,
    totalSpent: 4296,
    lastBookingDate: '2026-11-09',
    vehicle: 'Bajaj Pulsar NS200'
  },
  {
    id: 'CUST-005',
    name: 'Priya Nambiar',
    phone: '+91 98440 55123',
    location: 'BTM Layout, Bengaluru',
    totalBookings: 1,
    totalSpent: 699,
    lastBookingDate: '2026-11-09',
    vehicle: 'TVS Jupiter 125'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    invoiceNumber: 'INV-2026-0891',
    bookingId: 'ID-11081',
    date: '2026-11-09',
    customerName: 'Vikram Sundaram',
    phone: '+91 99011 87654',
    location: 'Whitefield, Bengaluru',
    vehicle: 'Bajaj Pulsar NS200 (KA-53-MC-3319)',
    serviceName: 'Breakdown & Emergency Clutch Replacement',
    items: [
      { description: 'Emergency Doorstep Callout & Diagnostics', quantity: 1, unitPrice: 299, total: 299 },
      { description: 'OEM Bajaj Pulsar NS200 Clutch Cable', quantity: 1, unitPrice: 320, total: 320 },
      { description: 'Clutch Lever Free-play & Cable Installation Labor', quantity: 1, unitPrice: 180, total: 180 }
    ],
    subtotal: 799,
    tax: 0,
    total: 799,
    paymentMethod: 'UPI / GPay',
    paymentStatus: 'Paid'
  }
];

export const INITIAL_JOB_CARDS: JobCard[] = [
  {
    jobCardNumber: 'JC-2026-0412',
    bookingId: 'ID-11081',
    date: '2026-11-09',
    mechanicName: 'Manjunath K.',
    customerName: 'Vikram Sundaram',
    phone: '+91 99011 87654',
    vehicle: 'Bajaj Pulsar NS200',
    odometerReading: '24,350 km',
    fuelLevel: 'Half Tank',
    checklist: [
      { item: 'Engine Oil Level & Quality', checked: true, condition: 'Good' },
      { item: 'Clutch Cable & Lever Free-play', checked: true, condition: 'Replaced' },
      { item: 'Front & Rear Brake Pads / Shoes', checked: true, condition: 'Good' },
      { item: 'Drive Chain Tension & Lubrication', checked: true, condition: 'Adjusted' },
      { item: 'Spark Plug & Ignition Check', checked: true, condition: 'Good' },
      { item: 'Battery Terminal & Voltage (12.6V+)', checked: true, condition: 'Good' },
      { item: 'Air Filter Cleaning / Inspection', checked: true, condition: 'Needs Attention' },
      { item: 'Tyre Pressure (Front 29 / Rear 33 PSI)', checked: true, condition: 'Adjusted' },
      { item: 'Headlight, Indicator & Brake Light', checked: true, condition: 'Good' },
      { item: 'Handlebar Cone Set & Suspension', checked: true, condition: 'Good' },
      { item: 'Nut & Bolt Torque Tightening', checked: true, condition: 'Good' },
      { item: 'Final Road Test Drive Verification', checked: true, condition: 'Good' }
    ],
    mechanicNotes: 'New OEM clutch cable installed and lubricated with synthetic cable grease. Chain tension set to 25mm slack. Advised customer air filter replacement on next 3000 km.',
    customerSignOff: true
  }
];
