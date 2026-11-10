export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'mechanic_assigned'
  | 'on_the_way'
  | 'mechanic_reached'
  | 'service_started'
  | 'completed'
  | 'cancelled';

export interface BookingHistoryItem {
  timestamp: string;
  status: BookingStatus;
  note: string;
  updatedBy: string;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  location: string;
  addressDetails?: string;
  googleMapsUrl?: string;
  vehicleType: 'Bike' | 'Scooter';
  brand: string;
  model: string;
  registrationNumber?: string;
  serviceType: string;
  customerComplaint?: string;
  customerNotes?: string;
  date: string;
  time: string;
  mechanicId?: string;
  mechanicName?: string;
  amount: number;
  advancePaid: number;
  remainingBalance: number;
  paymentMethod: 'Cash' | 'UPI / GPay' | 'Credit/Debit Card' | 'Pending';
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
  status: BookingStatus;
  createdAt: string;
  isNew?: boolean;
  history?: BookingHistoryItem[];
}

export interface Mechanic {
  id: string;
  name: string;
  phone: string;
  experience: string;
  rating: number;
  status: 'available' | 'on_job' | 'off_duty';
  activeBookingId?: string;
  completedJobs: number;
  specialties: string[];
  assignedArea: string;
  avatarUrl?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  location: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: string;
  vehicle: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  invoiceNumber: string;
  bookingId: string;
  date: string;
  customerName: string;
  phone: string;
  location: string;
  vehicle: string;
  serviceName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Unpaid';
}

export interface JobCard {
  jobCardNumber: string;
  bookingId: string;
  date: string;
  mechanicName: string;
  customerName: string;
  phone: string;
  vehicle: string;
  odometerReading?: string;
  fuelLevel?: string;
  checklist: {
    item: string;
    checked: boolean;
    condition: 'Good' | 'Needs Attention' | 'Replaced' | 'Adjusted';
  }[];
  mechanicNotes: string;
  customerSignOff: boolean;
}

export interface DashboardStats {
  totalBookings: number;
  newBookings: number;
  pendingBookings: number;
  acceptedBookings: number;
  mechanicAssigned: number;
  onTheWay: number;
  serviceInProgress: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
}
