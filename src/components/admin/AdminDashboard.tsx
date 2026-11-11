import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  UserCheck,
  Truck,
  MapPin,
  Wrench,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Eye,
  Plus,
  ArrowRight,
  ExternalLink,
  Printer,
  Bell,
  RefreshCw,
  LogOut,
  Users,
  Tag,
  Receipt,
  FileCheck2,
  QrCode,
  BarChart3,
  Settings,
  ChevronRight,
  Star,
  Check,
  X,
  AlertTriangle,
  Volume2,
  VolumeX,
  Play,
  BellRing,
  Sparkles,
  Radio,
  CheckCheck,
  Trash2,
  ShieldAlert
} from 'lucide-react';
import {
  Booking,
  BookingStatus,
  Mechanic,
  Customer,
  Invoice,
  JobCard,
  DashboardStats
} from '../../types/admin';
import {
  INITIAL_BOOKINGS,
  INITIAL_MECHANICS,
  INITIAL_CUSTOMERS,
  INITIAL_INVOICES,
  INITIAL_JOB_CARDS
} from '../../data/mockAdminData';
import {
  seedInitialDataIfEmpty,
  updateBookingStatusPermanently,
  assignMechanicPermanently,
  saveMechanicPermanently,
  saveInvoicePermanently,
  saveJobCardPermanently,
  subscribeToBookings,
  subscribeToMechanics,
  subscribeToInvoices,
  subscribeToJobCards
} from '../../services/persistenceService';
import { AdminLogin, AdminUser } from './AdminLogin';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { soundService, AlertSoundTone, SoundConfig } from '../../services/soundService';

export interface LiveAlert {
  id: string;
  bookingId?: string;
  customerName: string;
  phone: string;
  location: string;
  vehicle: string;
  service: string;
  amount: number;
  time: string;
  timestamp: number;
  read: boolean;
  type: 'new_booking' | 'mechanic_assigned' | 'status_change' | 'service_completed' | 'system';
  title: string;
  message: string;
}

interface AdminDashboardProps {
  onReturnToHome: () => void;
}

type AdminTab =
  | 'dashboard'
  | 'all_bookings'
  | 'new_bookings'
  | 'mechanics'
  | 'customers'
  | 'services'
  | 'invoices'
  | 'job_cards'
  | 'qr_records'
  | 'reports'
  | 'notifications'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToHome }) => {
  // Authentication Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_session');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const handleLogout = () => {
    try {
      localStorage.removeItem('yesbike_admin_session');
      signOut(auth).catch(() => {});
    } catch {
      // ignore
    }
    setAdminUser(null);
  };

  // Persistence via localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  const [mechanics, setMechanics] = useState<Mechanic[]>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_mechanics');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MECHANICS;
  });

  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_invoices');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_INVOICES;
  });

  const [jobCards, setJobCards] = useState<JobCard[]>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_jobcards');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_JOB_CARDS;
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState('');

  // Modals
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showAssignModal, setShowAssignModal] = useState<Booking | null>(null);
  const [showAddMechanicModal, setShowAddMechanicModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<Invoice | null>(null);
  const [showJobCardModal, setShowJobCardModal] = useState<JobCard | null>(null);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // New mechanic form
  const [newMechanicName, setNewMechanicName] = useState('');
  const [newMechanicPhone, setNewMechanicPhone] = useState('');
  const [newMechanicExp, setNewMechanicExp] = useState('3 Years');
  const [newMechanicArea, setNewMechanicArea] = useState('Indiranagar');
  const [newMechanicSpecialty, setNewMechanicSpecialty] = useState('General Bike & Scooter Service');

  // Live Booking Alerts State
  const [alerts, setAlerts] = useState<LiveAlert[]>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_live_alerts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'alert-1',
        bookingId: 'ID-11082',
        customerName: 'Priya Nambiar',
        phone: '+91 98452 77123',
        location: 'BTM Layout',
        vehicle: 'Honda Activa 6G',
        service: 'Basic General Service - ₹699',
        amount: 699,
        time: 'Just now',
        timestamp: Date.now() - 60000,
        read: false,
        type: 'new_booking',
        title: 'New Doorstep Booking',
        message: 'New doorstep service booked by Priya Nambiar in BTM Layout'
      },
      {
        id: 'alert-2',
        bookingId: 'ID-11079',
        customerName: 'Vikram Joshi',
        phone: '+91 99001 88344',
        location: 'Koramangala',
        vehicle: 'Royal Enfield Classic 350',
        service: 'General Service with Engine Oil - ₹1,349',
        amount: 1349,
        time: '14 mins ago',
        timestamp: Date.now() - 840000,
        read: false,
        type: 'mechanic_assigned',
        title: 'Mechanic Assigned',
        message: 'Mechanic Ramesh Kumar assigned to Royal Enfield Classic 350 (ID-11079)'
      },
      {
        id: 'alert-3',
        bookingId: 'ID-11081',
        customerName: 'Ananya Sharma',
        phone: '+91 97412 55990',
        location: 'Whitefield',
        vehicle: 'Yamaha FZ-S',
        service: 'General Service + Oil - ₹1,349',
        amount: 1349,
        time: '45 mins ago',
        timestamp: Date.now() - 2700000,
        read: true,
        type: 'service_completed',
        title: 'Doorstep Service Completed',
        message: 'Doorstep service completed in Whitefield. Invoice INV-2026-0891 paid.'
      }
    ];
  });

  const unreadAlertsCount = useMemo(() => alerts.filter((a) => !a.read).length, [alerts]);
  const [alertsDropdownFilter, setAlertsDropdownFilter] = useState<'all' | 'unread' | 'bookings'>('all');
  const [alertFilterType, setAlertFilterType] = useState<string>('all');
  const [alertSearchQuery, setAlertSearchQuery] = useState('');
  const [desktopPermission, setDesktopPermission] = useState<string>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  // Sync alerts to local storage
  useEffect(() => {
    try {
      localStorage.setItem('yesbike_admin_live_alerts', JSON.stringify(alerts));
    } catch {
      // ignore
    }
  }, [alerts]);

  const handleRequestDesktopPermission = async () => {
    const res = await soundService.requestNotificationPermission();
    setDesktopPermission(res);
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const handleClearAllAlerts = () => {
    setAlerts([]);
  };

  const handleToggleAlertRead = (alertId: string) => {
    setAlerts((prev) => prev.map((a) => a.id === alertId ? { ...a, read: !a.read } : a));
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  // Audio Notification Settings & State
  const [soundConfig, setSoundConfig] = useState<SoundConfig>(() => soundService.getConfig());
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [newBookingToast, setNewBookingToast] = useState<Booking | null>(null);

  // Track known bookings for detecting new arrivals
  const knownBookingIdsRef = useRef<Set<string>>(new Set(bookings.map((b) => b.id)));
  const isInitialLoadRef = useRef(true);

  // Auto-hide new booking alert banner after 12 seconds
  useEffect(() => {
    if (!newBookingToast) return;
    const timer = setTimeout(() => {
      setNewBookingToast(null);
    }, 12000);
    return () => clearTimeout(timer);
  }, [newBookingToast]);

  const handleUpdateSoundConfig = (updates: Partial<SoundConfig>) => {
    soundService.saveConfig(updates);
    setSoundConfig(soundService.getConfig());
  };

  const handleTestSound = (tone?: AlertSoundTone) => {
    soundService.playNewBookingSound(tone);
  };

  const createAlertForBooking = (b: Booking) => {
    const newAlert: LiveAlert = {
      id: `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      bookingId: b.id,
      customerName: b.customerName,
      phone: b.phone,
      location: b.location,
      vehicle: `${b.brand} ${b.model}`,
      service: b.serviceType,
      amount: b.amount,
      time: 'Just now',
      timestamp: Date.now(),
      read: false,
      type: 'new_booking',
      title: 'New Doorstep Booking',
      message: `${b.customerName} booked ${b.serviceType} for ${b.brand} ${b.model} in ${b.location}`
    };

    setAlerts((prev) => [newAlert, ...prev]);
    soundService.playNewBookingSound();
    soundService.triggerDesktopNotification(
      `🔔 YES BIKE: New Booking from ${b.customerName}`,
      `${b.brand} ${b.model} • ${b.serviceType} (${b.location})`
    );
    setNewBookingToast(b);
  };

  const handleSimulateNewBooking = () => {
    const randomId = `ID-${Math.floor(11100 + Math.random() * 800)}`;
    const mockCandidates = [
      { name: 'Arun Varma', phone: '+91 98452 11980', loc: 'Indiranagar', bike: 'Royal Enfield Classic 350', svc: 'Royal Enfield Precision Care - ₹1,499', amt: 1499 },
      { name: 'Sneha Rao', phone: '+91 97422 66311', loc: 'Koramangala', bike: 'Yamaha FZ-S', svc: 'General Service + Oil - ₹1,349', amt: 1349 },
      { name: 'Kiran Deep', phone: '+91 96118 44023', loc: 'Whitefield', bike: 'TVS Jupiter 125', svc: 'Basic General Service - ₹699', amt: 699 },
      { name: 'Vikram Seth', phone: '+91 98860 32145', loc: 'HSR Layout', bike: 'KTM Duke 250', svc: 'Breakdown & Inspection - ₹399', amt: 399 }
    ];
    const picked = mockCandidates[Math.floor(Math.random() * mockCandidates.length)];

    const simulatedBooking: Booking = {
      id: randomId,
      customerName: picked.name,
      phone: picked.phone,
      location: picked.loc,
      addressDetails: `${picked.loc}, Bengaluru`,
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(picked.loc + ' Bengaluru')}`,
      vehicleType: picked.bike.includes('Jupiter') ? 'Scooter' : 'Bike',
      brand: picked.bike.split(' ')[0],
      model: picked.bike.split(' ').slice(1).join(' '),
      serviceType: picked.svc,
      date: new Date().toISOString().split('T')[0],
      time: '11:00 AM',
      amount: picked.amt,
      advancePaid: 0,
      remainingBalance: picked.amt,
      paymentMethod: 'UPI / GPay',
      paymentStatus: 'Unpaid',
      status: 'pending',
      createdAt: new Date().toISOString(),
      isNew: true,
      history: [
        {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'pending',
          note: 'Customer submitted doorstep booking',
          updatedBy: 'Simulated Incoming Booking'
        }
      ]
    };

    setBookings((prev) => [simulatedBooking, ...prev]);
    knownBookingIdsRef.current.add(simulatedBooking.id);
    createAlertForBooking(simulatedBooking);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('yesbike_admin_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('yesbike_admin_mechanics', JSON.stringify(mechanics));
    } catch {
      // ignore
    }
  }, [mechanics]);

  useEffect(() => {
    try {
      localStorage.setItem('yesbike_admin_invoices', JSON.stringify(invoices));
    } catch {
      // ignore
    }
  }, [invoices]);

  useEffect(() => {
    try {
      localStorage.setItem('yesbike_admin_jobcards', JSON.stringify(jobCards));
    } catch {
      // ignore
    }
  }, [jobCards]);

  // Subscribe to real-time persistent Firestore database & seed if empty
  useEffect(() => {
    seedInitialDataIfEmpty().catch(() => {});

    const unsubBookings = subscribeToBookings((liveBookings) => {
      const isInitial = isInitialLoadRef.current;
      const currentKnown = knownBookingIdsRef.current;

      if (isInitial) {
        liveBookings.forEach((b) => currentKnown.add(b.id));
        isInitialLoadRef.current = false;
        setBookings(liveBookings);
      } else {
        const brandNewBookings = liveBookings.filter((b) => !currentKnown.has(b.id));
        liveBookings.forEach((b) => currentKnown.add(b.id));
        setBookings(liveBookings);

        if (brandNewBookings.length > 0) {
          const latest = brandNewBookings[0];
          createAlertForBooking(latest);
        }
      }
    });

    const handleCustomNewBooking = (e: any) => {
      const newBooking = e.detail;
      if (newBooking) {
        knownBookingIdsRef.current.add(newBooking.id);
        createAlertForBooking(newBooking);
      }
    };
    window.addEventListener('yesbike_new_booking', handleCustomNewBooking);

    const unsubMechanics = subscribeToMechanics((liveMechanics) => {
      setMechanics(liveMechanics);
    });

    const unsubInvoices = subscribeToInvoices((liveInvoices) => {
      setInvoices(liveInvoices);
    });

    const unsubJobCards = subscribeToJobCards((liveJobCards) => {
      setJobCards(liveJobCards);
    });

    return () => {
      window.removeEventListener('yesbike_new_booking', handleCustomNewBooking);
      unsubBookings();
      unsubMechanics();
      unsubInvoices();
      unsubJobCards();
    };
  }, []);

  // Compute stats
  const stats: DashboardStats = useMemo(() => {
    let newCount = 0;
    let pendingCount = 0;
    let acceptedCount = 0;
    let mechanicAssignedCount = 0;
    let onTheWayCount = 0;
    let serviceInProgressCount = 0;
    let completedCount = 0;
    let cancelledCount = 0;
    let revenue = 0;

    bookings.forEach((b) => {
      if (b.isNew) newCount++;
      if (b.status === 'pending') pendingCount++;
      else if (b.status === 'accepted') acceptedCount++;
      else if (b.status === 'mechanic_assigned') mechanicAssignedCount++;
      else if (b.status === 'on_the_way') onTheWayCount++;
      else if (b.status === 'mechanic_reached' || b.status === 'service_started') serviceInProgressCount++;
      else if (b.status === 'completed') completedCount++;
      else if (b.status === 'cancelled') cancelledCount++;

      if (b.status !== 'cancelled') {
        revenue += b.amount || 0;
      }
    });

    return {
      totalBookings: bookings.length,
      newBookings: newCount,
      pendingBookings: pendingCount,
      acceptedBookings: acceptedCount,
      mechanicAssigned: mechanicAssignedCount,
      onTheWay: onTheWayCount,
      serviceInProgress: serviceInProgressCount,
      completedBookings: completedCount,
      cancelledBookings: cancelledCount,
      totalRevenue: revenue
    };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (activeTab === 'new_bookings' && !b.isNew && b.status !== 'pending') {
        return false;
      }
      if (filterStatus !== 'all' && b.status !== filterStatus) {
        return false;
      }
      if (filterLocation !== 'all' && !b.location.toLowerCase().includes(filterLocation.toLowerCase())) {
        return false;
      }
      if (filterService !== 'all' && !b.serviceType.toLowerCase().includes(filterService.toLowerCase())) {
        return false;
      }
      if (filterDate && b.date !== filterDate) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = b.id.toLowerCase().includes(q);
        const matchesName = b.customerName.toLowerCase().includes(q);
        const matchesPhone = b.phone.toLowerCase().includes(q);
        const matchesVehicle = (b.model || '').toLowerCase().includes(q) || (b.brand || '').toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesPhone && !matchesVehicle) {
          return false;
        }
      }
      return true;
    });
  }, [bookings, activeTab, filterStatus, filterLocation, filterService, filterDate, searchQuery]);

  // Status Styling helper with strict amber/yellow tone discipline
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Pending
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Accepted
          </span>
        );
      case 'mechanic_assigned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Mechanic Assigned
          </span>
        );
      case 'on_the_way':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40">
            <Truck className="w-3 h-3 text-amber-400" />
            On The Way
          </span>
        );
      case 'mechanic_reached':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/40">
            <MapPin className="w-3 h-3 text-sky-400" />
            Mechanic Reached
          </span>
        );
      case 'service_started':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-400/15 text-yellow-300 border border-yellow-400/40">
            <Wrench className="w-3 h-3 text-yellow-400" />
            Service Started
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/40">
            <XCircle className="w-3 h-3 text-red-400" />
            Cancelled
          </span>
        );
    }
  };

  // Status Updater
  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus, note?: string) => {
    updateBookingStatusPermanently(bookingId, newStatus, note).catch((err) => {
      console.warn('Status persist notice:', err);
    });

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const newHistory = [
          ...(b.history || []),
          {
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            status: newStatus,
            note: note || `Status changed to ${newStatus.replace(/_/g, ' ')}`,
            updatedBy: 'Admin'
          }
        ];
        return {
          ...b,
          status: newStatus,
          isNew: false,
          history: newHistory
        };
      })
    );

    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              isNew: false,
              history: [
                ...(prev.history || []),
                {
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
                  status: newStatus,
                  note: note || `Status changed to ${newStatus.replace(/_/g, ' ')}`,
                  updatedBy: 'Admin'
                }
              ]
            }
          : null
      );
    }
  };

  // Assign Mechanic
  const handleAssignMechanic = (bookingId: string, mechanicId: string) => {
    const mech = mechanics.find((m) => m.id === mechanicId);
    if (!mech) return;

    assignMechanicPermanently(bookingId, mech).catch((err) => {
      console.warn('Assign persist notice:', err);
    });

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          mechanicId: mech.id,
          mechanicName: mech.name,
          status: 'mechanic_assigned' as BookingStatus,
          isNew: false,
          history: [
            ...(b.history || []),
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              status: 'mechanic_assigned',
              note: `Assigned to mechanic ${mech.name} (${mech.phone})`,
              updatedBy: 'Admin'
            }
          ]
        };
      })
    );

    setMechanics((prev) =>
      prev.map((m) => {
        if (m.id === mechanicId) {
          return { ...m, status: 'on_job', activeBookingId: bookingId };
        }
        return m;
      })
    );

    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) =>
        prev
          ? {
              ...prev,
              mechanicId: mech.id,
              mechanicName: mech.name,
              status: 'mechanic_assigned',
              isNew: false
            }
          : null
      );
    }

    setShowAssignModal(null);
  };

  // Add Mechanic
  const handleAddMechanicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMechanicName.trim() || !newMechanicPhone.trim()) return;

    const newMech: Mechanic = {
      id: `MEC-${100 + mechanics.length + 1}`,
      name: newMechanicName.trim(),
      phone: newMechanicPhone.trim().startsWith('+91') ? newMechanicPhone.trim() : `+91 ${newMechanicPhone.trim()}`,
      experience: newMechanicExp,
      rating: 5.0,
      status: 'available',
      completedJobs: 0,
      specialties: [newMechanicSpecialty],
      assignedArea: newMechanicArea
    };

    setMechanics((prev) => [newMech, ...prev]);
    saveMechanicPermanently(newMech).catch((err) => {
      console.warn('Mechanic persist notice:', err);
    });
    setNewMechanicName('');
    setNewMechanicPhone('');
    setShowAddMechanicModal(false);
  };

  // Generate Digital Invoice
  const handleGenerateInvoice = (booking: Booking) => {
    const existing = invoices.find((inv) => inv.bookingId === booking.id);
    if (existing) {
      setShowInvoiceModal(existing);
      return;
    }

    const newInvoice: Invoice = {
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingId: booking.id,
      date: booking.date || new Date().toISOString().split('T')[0],
      customerName: booking.customerName,
      phone: booking.phone,
      location: booking.location,
      vehicle: `${booking.vehicleType} - ${booking.brand} ${booking.model} (${booking.registrationNumber || 'In-House'})`,
      serviceName: booking.serviceType,
      items: [
        {
          description: `${booking.serviceType} (Doorstep Package)`,
          quantity: 1,
          unitPrice: booking.amount,
          total: booking.amount
        },
        {
          description: 'Doorstep Convenience & Inspection Fee',
          quantity: 1,
          unitPrice: 0,
          total: 0
        }
      ],
      subtotal: booking.amount,
      tax: 0,
      total: booking.amount,
      paymentMethod: booking.paymentMethod || 'UPI / GPay',
      paymentStatus: booking.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    saveInvoicePermanently(newInvoice).catch((err) => {
      console.warn('Invoice persist notice:', err);
    });
    setShowInvoiceModal(newInvoice);
  };

  // Generate Job Card
  const handleGenerateJobCard = (booking: Booking) => {
    const existing = jobCards.find((jc) => jc.bookingId === booking.id);
    if (existing) {
      setShowJobCardModal(existing);
      return;
    }

    const newJobCard: JobCard = {
      jobCardNumber: `JC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingId: booking.id,
      date: booking.date,
      mechanicName: booking.mechanicName || 'Unassigned',
      customerName: booking.customerName,
      phone: booking.phone,
      vehicle: `${booking.vehicleType} - ${booking.brand} ${booking.model}`,
      odometerReading: '18,500 km',
      fuelLevel: 'Above Reserve',
      checklist: [
        { item: 'Engine Oil Level & Quality Inspection', checked: true, condition: 'Good' },
        { item: 'Front & Rear Brake Pad / Cable Tension', checked: true, condition: 'Adjusted' },
        { item: 'Drive Chain Slackness & O-Ring Lubrication', checked: true, condition: 'Adjusted' },
        { item: 'Spark Plug Gap & Ignition Terminal', checked: true, condition: 'Good' },
        { item: 'Air Filter Cleaning & Housing Dust Removal', checked: true, condition: 'Good' },
        { item: 'Battery Voltage & Starter Relay Health', checked: true, condition: 'Good' },
        { item: 'Tyre Pressure Calibration (Cold PSI)', checked: true, condition: 'Adjusted' },
        { item: 'Carburetor / Throttle Body Idle Check', checked: true, condition: 'Good' },
        { item: 'Clutch Lever Free-play & Cable Smoothness', checked: true, condition: 'Adjusted' },
        { item: 'Indicator, Horn & High-Beam Testing', checked: true, condition: 'Good' },
        { item: 'Chassis Bolts, Axle Nuts & Stand Springs', checked: true, condition: 'Good' },
        { item: 'Road Test Drive & Final Handover Cleaning', checked: true, condition: 'Good' }
      ],
      mechanicNotes: booking.customerComplaint
        ? `Complaints addressed: ${booking.customerComplaint}. Vehicle running smooth and tested.`
        : 'General doorstep periodic maintenance completed as per standard OEM checklist.',
      customerSignOff: true
    };

    setJobCards((prev) => [newJobCard, ...prev]);
    saveJobCardPermanently(newJobCard).catch((err) => {
      console.warn('Job card persist notice:', err);
    });
    setShowJobCardModal(newJobCard);
  };

  // Export to Excel / CSV
  const handleExportCSV = () => {
    const headers = [
      'Booking ID',
      'Customer Name',
      'Phone Number',
      'Location',
      'Vehicle Type',
      'Brand',
      'Model',
      'Registration Number',
      'Service Type',
      'Booking Date',
      'Time Slot',
      'Assigned Mechanic',
      'Amount (INR)',
      'Advance Paid',
      'Remaining Balance',
      'Payment Method',
      'Payment Status',
      'Booking Status',
      'Customer Complaint'
    ];

    const rows = filteredBookings.map((b) => [
      `"${b.id}"`,
      `"${b.customerName}"`,
      `"${b.phone}"`,
      `"${b.location}"`,
      `"${b.vehicleType}"`,
      `"${b.brand}"`,
      `"${b.model}"`,
      `"${b.registrationNumber || ''}"`,
      `"${b.serviceType}"`,
      `"${b.date}"`,
      `"${b.time}"`,
      `"${b.mechanicName || 'Unassigned'}"`,
      b.amount,
      b.advancePaid,
      b.remainingBalance,
      `"${b.paymentMethod}"`,
      `"${b.paymentStatus}"`,
      `"${b.status}"`,
      `"${(b.customerComplaint || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `YES_BIKE_SERVICE_BOOKINGS_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp Customer helper
  const handleWhatsAppCustomer = (booking: Booking) => {
    const cleanPhone = booking.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `🏍️🛵 *YES BIKE SERVICE | BENGALURU*\n\nHello *${booking.customerName}*! 👋\nRegarding your Doorstep Service Booking *${booking.id}* for *${booking.brand} ${booking.model}*:\n\n🔧 *Service:* ${booking.serviceType}\n📅 *Date:* ${booking.date}\n⏰ *Time:* ${booking.time}\n📍 *Location:* ${booking.location}\n👷 *Mechanic:* ${booking.mechanicName || 'Assigned shortly'}\n\nOur verified technician is preparing your service kit. Feel free to reply here if you have any questions!\n\n⭐ *Quality Bike Care at Your Doorstep.*`;
    const url = `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp Mechanic helper ("WhatsApp mechanic send")
  const handleWhatsAppMechanic = (booking: Booking) => {
    const mech = mechanics.find(m => m.id === booking.mechanicId || m.name === booking.mechanicName);
    const targetPhone = mech?.phone || '917090400617';
    const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `🏍️🛵 *YES BIKE SERVICE — DOORSTEP MECHANIC DISPATCH*\n\nQuality Bike Care at Your Doorstep!\nSit back and relax. We've got your bike covered!\n\n📋 *JOB DISPATCH DETAILS:*\n🆔 *Booking ID:* #${booking.id}\n👤 *Customer:* ${booking.customerName}\n📞 *Customer Phone:* ${booking.phone}\n📍 *Location:* ${booking.location}\n🗺️ *Google Maps:* https://maps.google.com/?q=${encodeURIComponent(booking.location + ' Bengaluru')}\n🏍️ *Vehicle:* ${booking.brand} ${booking.model}\n🔧 *Package:* ${booking.serviceType}\n📅 *Date:* ${booking.date}\n⏰ *Time:* ${booking.time}\n💰 *Amount:* ₹${booking.amount} (${booking.paymentStatus})\n👷 *Assigned Mechanic:* ${booking.mechanicName || 'On Duty Technician'}\n\n*Action:* Please confirm job acceptance and proceed with standard tool kit and genuine consumables.`;
    const url = `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!adminUser) {
    return (
      <AdminLogin
        onLoginSuccess={(user) => setAdminUser(user)}
        onReturnToHome={onReturnToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans antialiased selection:bg-[#FFC107] selection:text-black">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-[#151515] border-b border-white/10 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-black font-black flex items-center justify-center text-lg shadow-md shadow-[#FFC107]/20">
            YB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-wide">YES BIKE SERVICE</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFC107]/15 text-[#FFC107] border border-[#FFC107]/30 uppercase tracking-wider">
                Admin Console
              </span>
            </div>
            <p className="text-[11px] text-[#B0B0B0]">Bengaluru Operations & Live Dispatch Control</p>
          </div>
        </div>

        {/* Global Search & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-72">
            <Search className="w-4 h-4 text-[#B0B0B0] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ID, phone, customer, bike..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#B0B0B0]/60 focus:outline-none focus:border-[#FFC107]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Audio Booking Sound Notification Button & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSoundMenu(!showSoundMenu)}
              className={`relative p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                soundConfig.enabled
                  ? 'bg-[#1A1A1A] border-[#FFC107]/40 text-[#FFC107] hover:bg-[#FFC107]/10'
                  : 'bg-[#1A1A1A] border-white/10 text-[#B0B0B0] hover:text-white'
              }`}
              title={soundConfig.enabled ? 'New Booking Sound: Enabled (Click to configure)' : 'New Booking Sound: Muted'}
            >
              {soundConfig.enabled ? (
                <Volume2 className="w-4 h-4 text-[#FFC107]" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-500" />
              )}
              <span className="hidden xl:inline text-[11px] font-bold">
                {soundConfig.enabled ? 'Sound: ON' : 'Sound: OFF'}
              </span>
            </button>

            {/* Sound Configuration Dropdown */}
            {showSoundMenu && (
              <div className="absolute right-0 mt-2 w-76 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-50 p-4 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#FFC107]" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">New Booking Sound</span>
                  </div>
                  <button
                    onClick={() => setShowSoundMenu(false)}
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Toggle Enable */}
                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="text-xs font-bold text-white block">Sound Alerts</span>
                    <span className="text-[10px] text-[#B0B0B0]">Play chime on new bookings</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpdateSoundConfig({ enabled: !soundConfig.enabled })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      soundConfig.enabled ? 'bg-[#FFC107]' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                        soundConfig.enabled ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-[#B0B0B0] mb-1.5">Alert Tone</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'doorstep', name: 'Doorstep Bell' },
                      { id: 'two_tone', name: 'Two-Tone Ping' },
                      { id: 'arpeggio', name: 'Arpeggio Chime' },
                      { id: 'dispatch', name: 'Express Alert' }
                    ].map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => {
                          handleUpdateSoundConfig({ tone: tone.id as AlertSoundTone });
                          handleTestSound(tone.id as AlertSoundTone);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left flex items-center justify-between border transition-all cursor-pointer ${
                          soundConfig.tone === tone.id
                            ? 'bg-[#FFC107]/15 border-[#FFC107] text-[#FFC107]'
                            : 'bg-[#151515] border-white/5 text-[#B0B0B0] hover:text-white'
                        }`}
                      >
                        <span className="truncate">{tone.name}</span>
                        {soundConfig.tone === tone.id && <Check className="w-3 h-3 shrink-0 text-[#FFC107]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume Slider */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#B0B0B0] mb-1">
                    <span>Volume</span>
                    <span className="text-white font-mono">{Math.round(soundConfig.volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={soundConfig.volume}
                    onChange={(e) => handleUpdateSoundConfig({ volume: parseFloat(e.target.value) })}
                    className="w-full accent-[#FFC107] cursor-pointer"
                  />
                </div>

                {/* Test Sound Button */}
                <button
                  type="button"
                  onClick={() => handleTestSound()}
                  className="w-full py-2 px-3 rounded-lg bg-[#FFC107] text-black font-black text-xs flex items-center justify-center gap-1.5 hover:bg-[#FFC107]/90 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Test New Booking Sound</span>
                </button>
              </div>
            )}
          </div>

          {/* Live Booking Alerts Notification Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationCenter(!showNotificationCenter)}
              className={`relative p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                unreadAlertsCount > 0
                  ? 'bg-[#1A1A1A] border-[#FFC107]/50 text-[#FFC107] shadow-sm'
                  : 'bg-[#1A1A1A] border-white/10 text-[#B0B0B0] hover:text-white'
              }`}
              title="Live Booking Alerts Center"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-[10px] font-black flex items-center justify-center text-white ring-2 ring-[#151515] animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Enhanced Live Booking Alerts Dropdown Panel */}
            {showNotificationCenter && (
              <div className="absolute right-0 mt-2 w-88 sm:w-96 bg-[#1A1A1A] border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="p-3.5 bg-[#151515] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">Live Booking Alerts</span>
                    {unreadAlertsCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFC107] text-black">
                        {unreadAlertsCount} New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <button
                      onClick={handleMarkAllAlertsRead}
                      className="text-[#FFC107] hover:underline font-bold cursor-pointer"
                    >
                      Mark all read
                    </button>
                    <span className="text-white/20">|</span>
                    <button
                      onClick={handleClearAllAlerts}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowNotificationCenter(false)}
                      className="text-gray-400 hover:text-white ml-1 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="px-3 py-2 bg-[#171717] border-b border-white/5 flex items-center gap-1.5 text-[10px]">
                  <button
                    onClick={() => setAlertsDropdownFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      alertsDropdownFilter === 'all'
                        ? 'bg-[#FFC107] text-black shadow-xs'
                        : 'text-[#B0B0B0] hover:text-white bg-[#1A1A1A]'
                    }`}
                  >
                    All ({alerts.length})
                  </button>
                  <button
                    onClick={() => setAlertsDropdownFilter('unread')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      alertsDropdownFilter === 'unread'
                        ? 'bg-[#FFC107] text-black shadow-xs'
                        : 'text-[#B0B0B0] hover:text-white bg-[#1A1A1A]'
                    }`}
                  >
                    Unread ({unreadAlertsCount})
                  </button>
                  <button
                    onClick={() => setAlertsDropdownFilter('bookings')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      alertsDropdownFilter === 'bookings'
                        ? 'bg-[#FFC107] text-black shadow-xs'
                        : 'text-[#B0B0B0] hover:text-white bg-[#1A1A1A]'
                    }`}
                  >
                    Bookings ({alerts.filter((a) => a.type === 'new_booking').length})
                  </button>
                </div>

                {/* Alert Cards Feed */}
                <div className="divide-y divide-white/5 max-h-80 overflow-y-auto p-1.5 space-y-1.5">
                  {alerts
                    .filter((a) => {
                      if (alertsDropdownFilter === 'unread') return !a.read;
                      if (alertsDropdownFilter === 'bookings') return a.type === 'new_booking';
                      return true;
                    })
                    .map((alert) => {
                      const relatedBooking = bookings.find((b) => b.id === alert.bookingId);
                      return (
                        <div
                          key={alert.id}
                          className={`p-3 rounded-xl transition-all border ${
                            alert.read
                              ? 'bg-[#151515]/60 border-white/5'
                              : 'bg-[#FFC107]/8 border-[#FFC107]/40 shadow-xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5">
                              {alert.type === 'new_booking' ? (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#FFC107] text-black">
                                  New Booking
                                </span>
                              ) : alert.type === 'mechanic_assigned' ? (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                  Assigned
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                                  Completed
                                </span>
                              )}
                              {alert.bookingId && (
                                <span className="font-mono text-[10px] text-gray-400 font-bold">
                                  {alert.bookingId}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#B0B0B0] whitespace-nowrap">{alert.time}</span>
                          </div>

                          <p className="text-xs font-bold text-white leading-snug">{alert.message}</p>

                          {alert.vehicle && (
                            <div className="mt-1 flex items-center gap-2 text-[10px] text-[#B0B0B0]">
                              <span>🏍️ {alert.vehicle}</span>
                              <span>•</span>
                              <span>📍 {alert.location}</span>
                              {alert.amount > 0 && (
                                <>
                                  <span>•</span>
                                  <span className="text-[#FFC107] font-bold">₹{alert.amount}</span>
                                </>
                              )}
                            </div>
                          )}

                          {/* Quick Interactive Actions */}
                          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  if (relatedBooking) {
                                    setSelectedBooking(relatedBooking);
                                  } else {
                                    handleSimulateNewBooking();
                                  }
                                  handleToggleAlertRead(alert.id);
                                  setShowNotificationCenter(false);
                                }}
                                className="px-2 py-1 rounded bg-[#FFC107] text-black text-[10px] font-black hover:bg-[#FFC107]/90 transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                <span>View</span>
                              </button>

                              {relatedBooking && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowAssignModal(relatedBooking);
                                    handleToggleAlertRead(alert.id);
                                    setShowNotificationCenter(false);
                                  }}
                                  className="px-2 py-1 rounded bg-[#1A1A1A] border border-white/10 hover:border-[#FFC107] text-white text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <UserCheck className="w-3 h-3 text-[#FFC107]" />
                                  <span>Assign</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  handleWhatsAppCustomer({
                                    id: alert.bookingId || 'ID-BOOKING',
                                    customerName: alert.customerName,
                                    phone: alert.phone,
                                    location: alert.location,
                                    brand: alert.vehicle.split(' ')[0] || 'Vehicle',
                                    model: alert.vehicle.split(' ').slice(1).join(' ') || 'Two Wheeler',
                                    serviceType: alert.service,
                                    date: 'Today',
                                    time: alert.time
                                  } as any);
                                }}
                                className="p-1 rounded bg-[#1A1A1A] border border-white/10 hover:border-[#22C55E] text-[#22C55E] transition-all cursor-pointer"
                                title="WhatsApp Customer"
                              >
                                <MessageCircle className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleTestSound()}
                                className="p-1 rounded text-[#B0B0B0] hover:text-[#FFC107] transition-colors cursor-pointer"
                                title="Replay Alert Chime"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAlert(alert.id)}
                                className="p-1 rounded text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                                title="Dismiss Alert"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {alerts.length === 0 && (
                    <div className="py-8 text-center text-xs text-[#B0B0B0]">
                      <BellRing className="w-8 h-8 text-gray-600 mx-auto mb-2 animate-pulse" />
                      <p className="font-bold text-white">No alerts at the moment</p>
                      <p className="text-[11px] mt-1 text-[#B0B0B0]">
                        The system is actively listening for live customer bookings across Bengaluru.
                      </p>
                    </div>
                  )}
                </div>

                {/* Dropdown Footer */}
                <div className="p-2.5 bg-[#151515] border-t border-white/10 text-center">
                  <button
                    onClick={() => {
                      setActiveTab('notifications');
                      setShowNotificationCenter(false);
                    }}
                    className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-[#FFC107] hover:text-black text-xs font-black text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Open Live Alerts Stream Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Return to Live Site */}
          <button
            onClick={onReturnToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-white/10 text-xs font-semibold text-[#B0B0B0] hover:text-white border border-white/10 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FFC107]" />
            <span className="hidden sm:inline">View Website</span>
          </button>

          {/* Admin User Profile Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-white/10">
            {adminUser.avatarUrl ? (
              <img
                src={adminUser.avatarUrl}
                alt="Admin"
                className="w-7 h-7 rounded-full border border-[#FFC107]"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#FFC107] text-black font-black text-xs flex items-center justify-center">
                {adminUser.email ? adminUser.email[0].toUpperCase() : 'A'}
              </div>
            )}
            <div className="text-left text-xs">
              <span className="font-bold text-white block max-w-[130px] truncate">{adminUser.email}</span>
              <span className="text-[10px] text-[#22C55E] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                {adminUser.role === 'super_admin' ? 'Master Admin' : 'Dispatcher'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#EF4444] hover:text-white text-xs font-semibold text-[#B0B0B0] border border-white/10 hover:border-[#EF4444] transition-all cursor-pointer"
            title="Log Out of Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Floating New Booking Audio & Visual Alert Banner with Direct Action Hotline */}
      {newBookingToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-full bg-[#1A1A1A] border-2 border-[#FFC107] rounded-2xl p-4 shadow-2xl shadow-[#FFC107]/25 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-black flex items-center justify-center shrink-0 font-black shadow-md shadow-[#FFC107]/30">
              <BellRing className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#FFC107] bg-[#FFC107]/15 px-2 py-0.5 rounded border border-[#FFC107]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                  New Doorstep Booking Alert
                </span>
                <button
                  onClick={() => setNewBookingToast(null)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-sm font-black text-white mt-1.5 truncate">
                {newBookingToast.customerName} • <span className="text-[#FFC107]">{newBookingToast.phone}</span>
              </h4>
              <p className="text-xs text-[#B0B0B0] mt-0.5 truncate">
                {newBookingToast.vehicleType}: {newBookingToast.brand} {newBookingToast.model} • {newBookingToast.serviceType}
              </p>
              <div className="mt-1 text-[11px] text-[#B0B0B0] flex items-center gap-2">
                <span>📍 {newBookingToast.location}</span>
                <span>•</span>
                <span className="text-[#FFC107] font-bold">₹{newBookingToast.amount}</span>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBooking(newBookingToast);
                    setNewBookingToast(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#FFC107] text-black text-xs font-black hover:bg-[#FFC107]/90 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignModal(newBookingToast);
                    setNewBookingToast(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Assign</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleWhatsAppCustomer(newBookingToast)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E] hover:text-black text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  title="WhatsApp Customer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <a
                  href={`tel:${newBookingToast.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-2 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-[#B0B0B0] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  title="Call Customer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleTestSound()}
                  className="px-2 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-[#B0B0B0] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  title="Replay Alert Sound"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#FFC107]" />
                </button>
              </div>

              {/* Progress dismiss bar */}
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-[#FFC107] w-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#151515] border-r border-white/10 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Quick Status Pill */}
            <div className="p-3 rounded-xl bg-[#1A1A1A] border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#B0B0B0]">Live Dispatch</span>
                <span className="flex items-center gap-1 text-[#22C55E] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
                  Active
                </span>
              </div>
              <div className="text-[11px] text-[#B0B0B0] flex justify-between">
                <span>Bengaluru Hubs:</span>
                <span className="text-white font-medium">8 Areas Covered</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('all_bookings');
                  setFilterStatus('all');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'all_bookings'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CalendarCheck className="w-4 h-4" />
                  <span>All Bookings</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeTab === 'all_bookings' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
                }`}>
                  {bookings.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('new_bookings');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'new_bookings'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span>New Bookings</span>
                </div>
                {stats.newBookings > 0 && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EF4444] text-white animate-pulse">
                    {stats.newBookings}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('mechanics')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'mechanics'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4" />
                  <span>Manage Mechanics</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeTab === 'mechanics' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
                }`}>
                  {mechanics.filter((m) => m.status === 'available').length} free
                </span>
              </button>

              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'customers'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Customers</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'services'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4" />
                  <span>Services & Pricing</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('invoices')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'invoices'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Receipt className="w-4 h-4" />
                  <span>Invoices & Payments</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('job_cards')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'job_cards'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Job Cards</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('qr_records')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'qr_records'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-4 h-4" />
                  <span>Service Records / QR</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'reports'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4" />
                  <span>Reports & Analytics</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4" />
                  <span>Live Booking Alerts</span>
                </div>
                {unreadAlertsCount > 0 ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EF4444] text-white animate-pulse">
                    {unreadAlertsCount}
                  </span>
                ) : (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    activeTab === 'notifications' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
                  }`}>
                    {alerts.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-[#B0B0B0] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 space-y-3">
            {/* Active User Card */}
            <div className="p-2.5 rounded-xl bg-[#1A1A1A] border border-white/5 space-y-1">
              <div className="text-[10px] uppercase font-bold text-[#B0B0B0] flex items-center justify-between">
                <span>Logged in as:</span>
                <span className="text-[#22C55E] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                  Active
                </span>
              </div>
              <div className="text-xs font-bold text-white truncate">{adminUser.email}</div>
              <div className="text-[10px] text-[#FFC107] font-semibold">
                {adminUser.role === 'super_admin' ? 'Master Admin' : 'Operations Dispatcher'}
              </div>
            </div>

            <div className="space-y-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
              <button
                onClick={onReturnToHome}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#B0B0B0] hover:text-white hover:bg-white/5 transition-colors font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Return to Website</span>
              </button>
            </div>

            <div className="text-[10px] text-[#B0B0B0]/60 text-center pt-0.5">
              YES BIKE SERVICE v2.4 • Bengaluru
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Mobile Tab Navigation */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-2 border-b border-white/10">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'all_bookings', label: 'All Bookings' },
              { id: 'new_bookings', label: 'New' },
              { id: 'mechanics', label: 'Mechanics' },
              { id: 'invoices', label: 'Invoices' },
              { id: 'job_cards', label: 'Job Cards' },
              { id: 'reports', label: 'Reports' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-[#FFC107] text-black' : 'bg-[#1A1A1A] text-[#B0B0B0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* VIEW: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
                    OPERATIONS DASHBOARD
                  </h1>
                  <p className="text-xs text-[#B0B0B0]">
                    Live real-time monitoring of doorstep mechanic dispatch across Bengaluru.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // refresh state
                      setBookings([...bookings]);
                    }}
                    className="p-2 rounded-lg bg-[#1A1A1A] border border-white/10 hover:border-[#FFC107] text-[#B0B0B0] hover:text-white transition-colors"
                    title="Refresh Live Data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFC107] text-black font-bold text-xs hover:bg-[#FFC107]/90 transition-all shadow-md shadow-[#FFC107]/10"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export to Excel</span>
                  </button>
                </div>
              </div>

              {/* 10 STATISTIC SUMMARY CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {/* Total Bookings */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('all');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-[#FFC107]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">Total Bookings</span>
                    <CalendarCheck className="w-4 h-4 text-[#FFC107] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-white">{stats.totalBookings}</div>
                  <div className="text-[10px] text-[#22C55E] mt-1 font-medium">All active & recorded</div>
                </div>

                {/* New Bookings */}
                <div
                  onClick={() => {
                    setActiveTab('new_bookings');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-[#FFC107]/50 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">New Bookings</span>
                    <Clock className="w-4 h-4 text-[#EF4444] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-white">{stats.newBookings}</div>
                  <div className="text-[10px] text-[#EF4444] mt-1 font-medium">Action required</div>
                </div>

                {/* Pending Bookings */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('pending');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">Pending</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  </div>
                  <div className="text-2xl font-black text-amber-300">{stats.pendingBookings}</div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1 font-medium">Awaiting admin review</div>
                </div>

                {/* Accepted Bookings */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('accepted');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">Accepted</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-blue-400">{stats.acceptedBookings}</div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1 font-medium">Ready for mechanic</div>
                </div>

                {/* Mechanic Assigned */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('mechanic_assigned');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">Assigned</span>
                    <UserCheck className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-purple-300">{stats.mechanicAssigned}</div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1 font-medium">Mechanic allocated</div>
                </div>

                {/* On The Way (Amber/Yellow Badge) */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('on_the_way');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">On The Way</span>
                    <Truck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400">{stats.onTheWay}</div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1 font-medium">En route to customer</div>
                </div>

                {/* Service In Progress */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('service_started');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">In Progress</span>
                    <Wrench className="w-4 h-4 text-[#FFC107]" />
                  </div>
                  <div className="text-2xl font-black text-yellow-300">{stats.serviceInProgress}</div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1 font-medium">Under active service</div>
                </div>

                {/* Completed Bookings */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('completed');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">Completed</span>
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div className="text-2xl font-black text-[#22C55E]">{stats.completedBookings}</div>
                  <div className="text-[10px] text-[#22C55E] mt-1 font-medium">Successfully closed</div>
                </div>

                {/* Cancelled Bookings */}
                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('cancelled');
                  }}
                  className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 hover:border-red-400/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B0B0B0] uppercase tracking-wider">Cancelled</span>
                    <XCircle className="w-4 h-4 text-[#EF4444]" />
                  </div>
                  <div className="text-2xl font-black text-[#EF4444]">{stats.cancelledBookings}</div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1 font-medium">Dropped / cancelled</div>
                </div>

                {/* Total Revenue */}
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#FFC107]/40 shadow-lg shadow-[#FFC107]/5 group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#FFC107] uppercase tracking-wider">Total Revenue</span>
                    <IndianRupee className="w-4 h-4 text-[#FFC107]" />
                  </div>
                  <div className="text-2xl font-black text-white">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-[#22C55E] mt-1 font-medium">+18% this month</div>
                </div>
              </div>

              {/* 10-STEP RECOMMENDED BOOKING WORKFLOW VISUALIZER */}
              <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]"></span>
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                      Standard 10-Step Doorstep Workflow
                    </h2>
                  </div>
                  <span className="text-[11px] text-[#B0B0B0]">End-to-End SLA: 90 Minutes</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center text-[10px]">
                  {[
                    { step: '1', title: 'Submit Booking', color: 'bg-white/5 border-white/10 text-white' },
                    { step: '2', title: 'New Booking', color: 'bg-amber-400/10 border-amber-400/30 text-amber-300' },
                    { step: '3', title: 'Admin Accepts', color: 'bg-blue-500/10 border-blue-500/30 text-blue-300' },
                    { step: '4', title: 'Assign Mechanic', color: 'bg-purple-500/10 border-purple-500/30 text-purple-300' },
                    { step: '5', title: 'On The Way', color: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
                    { step: '6', title: 'Mechanic Reached', color: 'bg-sky-500/10 border-sky-500/30 text-sky-300' },
                    { step: '7', title: 'Service Started', color: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-300' },
                    { step: '8', title: 'Service Completed', color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
                    { step: '9', title: 'Generate Invoice', color: 'bg-white/10 border-white/20 text-white' },
                    { step: '10', title: 'Booking Closed', color: 'bg-[#22C55E]/20 border-[#22C55E]/40 text-[#22C55E]' }
                  ].map((s) => (
                    <div key={s.step} className={`p-2 rounded-lg border flex flex-col justify-between ${s.color}`}>
                      <span className="font-extrabold opacity-60">Step {s.step}</span>
                      <span className="font-bold leading-tight mt-1">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT BOOKINGS & MECHANICS ON DUTY */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings List (2 cols) */}
                <div className="lg:col-span-2 bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FFC107]" />
                      Recent Bookings Dispatch Feed
                    </h2>
                    <button
                      onClick={() => setActiveTab('all_bookings')}
                      className="text-xs text-[#FFC107] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>View All ({bookings.length})</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-lg bg-[#151515] border border-white/5 hover:border-[#FFC107]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#FFC107] text-xs">{b.id}</span>
                            <span className="text-white text-xs font-bold">{b.customerName}</span>
                            {b.isNew && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#EF4444] text-white">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#B0B0B0] flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span>🏍️ {b.brand} {b.model}</span>
                            <span>📍 {b.location}</span>
                            <span>🔧 {b.serviceType.split('-')[0]}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {getStatusBadge(b.status)}
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FFC107] hover:text-black text-white text-xs transition-colors"
                            title="View Booking Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mechanics on Duty (1 col) */}
                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#FFC107]" />
                        Mechanics On Duty
                      </h2>
                      <button
                        onClick={() => setActiveTab('mechanics')}
                        className="text-xs text-[#FFC107] hover:underline font-semibold"
                      >
                        Manage
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {mechanics.slice(0, 4).map((m) => (
                        <div key={m.id} className="p-2.5 rounded-lg bg-[#151515] border border-white/5 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{m.name}</span>
                              <span className="text-[10px] text-[#FFC107] flex items-center">
                                <Star className="w-3 h-3 fill-[#FFC107]" /> {m.rating}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#B0B0B0]">{m.assignedArea}</p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              m.status === 'available'
                                ? 'bg-[#22C55E]/15 text-[#22C55E]'
                                : m.status === 'on_job'
                                ? 'bg-amber-400/15 text-amber-300'
                                : 'bg-white/10 text-[#B0B0B0]'
                            }`}
                          >
                            {m.status === 'available' ? 'Available' : m.status === 'on_job' ? 'On Job' : 'Off Duty'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAddMechanicModal(true)}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#151515] hover:bg-white/10 border border-white/10 text-xs text-white font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Add New Mechanic</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: ALL BOOKINGS & NEW BOOKINGS (BOOKING MANAGEMENT TABLE) */}
          {(activeTab === 'all_bookings' || activeTab === 'new_bookings') && (
            <div className="space-y-4">
              {/* Header & Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-white tracking-wide">
                    {activeTab === 'new_bookings' ? 'NEW BOOKINGS INBOX' : 'BOOKING MANAGEMENT'}
                  </h1>
                  <p className="text-xs text-[#B0B0B0]">
                    Total {filteredBookings.length} bookings matched filter criteria.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTestSound()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#FFC107]/15 border border-[#FFC107]/40 text-xs font-bold text-[#FFC107] transition-all cursor-pointer shadow-xs"
                    title="Play new booking sound test"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Test Sound</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateNewBooking}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFC107] hover:bg-[#FFC107]/90 text-black text-xs font-black transition-all cursor-pointer shadow-md shadow-[#FFC107]/10"
                    title="Simulate receiving a new booking to test alert sound and popup banner"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Simulate New Booking</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Multi-Filters Bar */}
              <div className="p-3 bg-[#1A1A1A] rounded-xl border border-white/10 flex flex-wrap items-center gap-2.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#B0B0B0]">
                  <Filter className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span className="font-bold">Filters:</span>
                </div>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#151515] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">🟡 Pending</option>
                  <option value="accepted">🔵 Accepted</option>
                  <option value="mechanic_assigned">🟣 Mechanic Assigned</option>
                  <option value="on_the_way">🟡 On The Way</option>
                  <option value="mechanic_reached">🟦 Mechanic Reached</option>
                  <option value="service_started">🟡 Service Started</option>
                  <option value="completed">🟢 Completed</option>
                  <option value="cancelled">🔴 Cancelled</option>
                </select>

                {/* Location Filter */}
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="bg-[#151515] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="all">All Bengaluru Locations</option>
                  <option value="Indiranagar">Indiranagar</option>
                  <option value="Koramangala">Koramangala</option>
                  <option value="HSR Layout">HSR Layout</option>
                  <option value="Whitefield">Whitefield</option>
                  <option value="BTM Layout">BTM Layout</option>
                  <option value="Jayanagar">Jayanagar</option>
                  <option value="Electronic City">Electronic City</option>
                </select>

                {/* Service Filter */}
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="bg-[#151515] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="all">All Service Types</option>
                  <option value="Basic">Basic General (₹699)</option>
                  <option value="Standard">Standard General (₹999)</option>
                  <option value="Comprehensive">Comprehensive (₹1499)</option>
                  <option value="Breakdown">Breakdown & Repair</option>
                </select>

                {/* Date Filter */}
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="bg-[#151515] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                />

                {(filterStatus !== 'all' || filterLocation !== 'all' || filterService !== 'all' || filterDate || searchQuery) && (
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterLocation('all');
                      setFilterService('all');
                      setFilterDate('');
                      setSearchQuery('');
                    }}
                    className="px-2 py-1 text-[11px] text-[#EF4444] hover:underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* TABLE CONTAINER */}
              <div className="bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#151515] text-[#B0B0B0] uppercase text-[10px] tracking-wider border-b border-white/10">
                        <th className="py-3 px-3">Booking ID</th>
                        <th className="py-3 px-3">Customer Name</th>
                        <th className="py-3 px-3">Phone Number</th>
                        <th className="py-3 px-3">Location</th>
                        <th className="py-3 px-3">Vehicle</th>
                        <th className="py-3 px-3">Service Type</th>
                        <th className="py-3 px-3">Booking Date</th>
                        <th className="py-3 px-3">Mechanic</th>
                        <th className="py-3 px-3">Payment</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="py-12 text-center text-[#B0B0B0]">
                            No bookings match the selected filters.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr
                            key={b.id}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            {/* Booking ID */}
                            <td className="py-3 px-3 font-mono font-bold text-[#FFC107] whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span>{b.id}</span>
                                {b.isNew && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping" title="New Booking"></span>
                                )}
                              </div>
                            </td>

                            {/* Customer Name */}
                            <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                              {b.customerName}
                            </td>

                            {/* Phone with Call / WhatsApp */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[#B0B0B0] font-mono">{b.phone}</span>
                                <a
                                  href={`tel:${b.phone}`}
                                  className="p-1 rounded bg-white/5 hover:bg-[#FFC107] hover:text-black text-white transition-colors"
                                  title="Call Customer"
                                >
                                  <Phone className="w-3 h-3" />
                                </a>
                                <button
                                  onClick={() => handleWhatsAppCustomer(b)}
                                  className="p-1 rounded bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-black transition-colors"
                                  title="WhatsApp Customer"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                </button>
                              </div>
                            </td>

                            {/* Location */}
                            <td className="py-3 px-3 text-[#B0B0B0] max-w-[140px] truncate" title={b.location}>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#FFC107] shrink-0" />
                                <span className="truncate">{b.location}</span>
                              </div>
                            </td>

                            {/* Vehicle */}
                            <td className="py-3 px-3 text-white whitespace-nowrap">
                              <div className="font-medium">
                                {b.brand} {b.model}
                              </div>
                              <span className="text-[10px] text-[#B0B0B0]">
                                {b.vehicleType} {b.registrationNumber ? `• ${b.registrationNumber}` : ''}
                              </span>
                            </td>

                            {/* Service Type */}
                            <td className="py-3 px-3 text-[#B0B0B0] whitespace-nowrap">
                              <div className="text-white font-medium">{b.serviceType.split('-')[0]}</div>
                              <span className="text-[10px] text-[#FFC107] font-bold">₹{b.amount}</span>
                            </td>

                            {/* Booking Date & Time */}
                            <td className="py-3 px-3 text-[#B0B0B0] whitespace-nowrap font-mono text-[11px]">
                              <div>{b.date}</div>
                              <div className="text-[10px] text-[#B0B0B0]/70">{b.time}</div>
                            </td>

                            {/* Assigned Mechanic */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              {b.mechanicName ? (
                                <div className="flex items-center gap-1 text-white font-medium">
                                  <UserCheck className="w-3 h-3 text-purple-400" />
                                  <span>{b.mechanicName}</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setShowAssignModal(b)}
                                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/40 hover:bg-[#FFC107] hover:text-black transition-all"
                                >
                                  + Assign
                                </button>
                              )}
                            </td>

                            {/* Payment */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  b.paymentStatus === 'Paid'
                                    ? 'bg-[#22C55E]/15 text-[#22C55E]'
                                    : b.paymentStatus === 'Partial'
                                    ? 'bg-amber-400/15 text-amber-300'
                                    : 'bg-white/10 text-[#B0B0B0]'
                                }`}
                              >
                                {b.paymentStatus}
                              </span>
                            </td>

                            {/* Status with Instant Dropdown */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <select
                                value={b.status}
                                onChange={(e) => handleUpdateStatus(b.id, e.target.value as BookingStatus)}
                                className="bg-[#151515] border border-white/10 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                              >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="mechanic_assigned">Mechanic Assigned</option>
                                <option value="on_the_way">On The Way</option>
                                <option value="mechanic_reached">Mechanic Reached</option>
                                <option value="service_started">Service Started</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedBooking(b)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FFC107] hover:text-black text-white transition-colors"
                                  title="View Full Booking Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleGenerateInvoice(b)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500 hover:text-black text-white transition-colors"
                                  title="Generate Digital Invoice"
                                >
                                  <Receipt className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleGenerateJobCard(b)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500 hover:text-black text-white transition-colors"
                                  title="Generate Digital Job Card"
                                >
                                  <FileCheck2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: MANAGE MECHANICS */}
          {activeTab === 'mechanics' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-white tracking-wide">MECHANIC FLEET MANAGEMENT</h1>
                  <p className="text-xs text-[#B0B0B0]">
                    Real-time field tracking, active job assignment, and performance monitoring.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddMechanicModal(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFC107] text-black font-bold text-xs hover:bg-[#FFC107]/90 transition-all shadow-md shadow-[#FFC107]/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Mechanic</span>
                </button>
              </div>

              {/* Mechanic Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mechanics.map((m) => (
                  <div key={m.id} className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-white text-base">{m.name}</h3>
                          <span className="font-mono text-[10px] text-[#B0B0B0]">{m.id}</span>
                        </div>
                        <p className="text-xs text-[#B0B0B0] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#FFC107]" /> {m.assignedArea}
                        </p>
                      </div>
                      {/* Availability Toggle */}
                      <select
                        value={m.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as 'available' | 'on_job' | 'off_duty';
                          setMechanics((prev) =>
                            prev.map((item) => (item.id === m.id ? { ...item, status: newStatus } : item))
                          );
                        }}
                        className={`text-[11px] font-bold rounded-lg px-2 py-1 border focus:outline-none ${
                          m.status === 'available'
                            ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                            : m.status === 'on_job'
                            ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                            : 'bg-white/10 text-[#B0B0B0] border-white/10'
                        }`}
                      >
                        <option value="available">🟢 Available</option>
                        <option value="on_job">🟡 On Active Job</option>
                        <option value="off_duty">⚪ Off Duty</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 text-center text-xs">
                      <div>
                        <div className="text-[10px] text-[#B0B0B0] uppercase">Jobs Done</div>
                        <div className="font-black text-white text-sm">{m.completedJobs}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#B0B0B0] uppercase">Rating</div>
                        <div className="font-black text-[#FFC107] text-sm flex items-center justify-center gap-0.5">
                          <Star className="w-3 h-3 fill-[#FFC107]" /> {m.rating}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#B0B0B0] uppercase">Experience</div>
                        <div className="font-black text-white text-sm">{m.experience}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-[#B0B0B0] uppercase mb-1.5">Specialties:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.specialties.map((spec, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-white border border-white/10"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                      <a
                        href={`tel:${m.phone}`}
                        className="flex items-center gap-1.5 text-[#B0B0B0] hover:text-[#FFC107] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
                        <span>{m.phone}</span>
                      </a>
                      {m.activeBookingId && (
                        <span className="text-[10px] font-mono text-amber-300">
                          Job: {m.activeBookingId}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">CUSTOMER DIRECTORY & HISTORY</h1>
                <p className="text-xs text-[#B0B0B0]">
                  Registered doorstep service customers across Bengaluru with lifetime value.
                </p>
              </div>

              <div className="bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151515] text-[#B0B0B0] text-[10px] uppercase border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Customer ID</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Primary Location</th>
                      <th className="py-3 px-4">Registered Vehicle</th>
                      <th className="py-3 px-4">Total Bookings</th>
                      <th className="py-3 px-4">Total Spent</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-mono text-[#FFC107]">{c.id}</td>
                        <td className="py-3 px-4 font-bold text-white">{c.name}</td>
                        <td className="py-3 px-4 text-[#B0B0B0] font-mono">{c.phone}</td>
                        <td className="py-3 px-4 text-[#B0B0B0]">{c.location}</td>
                        <td className="py-3 px-4 text-white">{c.vehicle}</td>
                        <td className="py-3 px-4 font-bold text-white">{c.totalBookings}</td>
                        <td className="py-3 px-4 font-bold text-[#22C55E]">₹{c.totalSpent}</td>
                        <td className="py-3 px-4 text-right">
                          <a
                            href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold text-[11px] transition-colors"
                          >
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: SERVICES & PRICING */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">SERVICES & TARIFF MASTER</h1>
                <p className="text-xs text-[#B0B0B0]">
                  Configured doorstep bike service packages and pricing schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Basic General Service',
                    price: '₹699',
                    time: '45 - 60 Mins',
                    items: ['12-Point Safety Inspection', 'Chain Cleaning & Lubrication', 'Brake Adjustment & Cable Tuning', 'Tyre Pressure Calibration', 'Spark Plug Cleaning']
                  },
                  {
                    name: 'Standard General Service',
                    price: '₹999',
                    time: '60 - 90 Mins',
                    badge: 'Popular',
                    items: ['Everything in Basic', 'Engine Oil Drain & Fill (Oil extra/supplied)', 'Carburetor / Throttle Body Tuning', 'Battery & Terminal Cleaning', 'Clutch Play Setting']
                  },
                  {
                    name: 'Comprehensive Full Service',
                    price: '₹1499',
                    time: '90 - 120 Mins',
                    items: ['Everything in Standard', 'Complete Waterless Eco Wash & Polish', 'Brake Caliper Deep Cleaning & Degreasing', 'Air Filter Cleaning / Replacement Labor', 'Cone Set & Fork Inspection']
                  }
                ].map((s, idx) => (
                  <div key={idx} className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-black text-white text-base">{s.name}</h3>
                        {s.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFC107] text-black">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-black text-[#FFC107] mb-1">{s.price}</div>
                      <div className="text-xs text-[#B0B0B0] mb-4">Duration: {s.time}</div>
                      <ul className="space-y-2 text-xs text-[#B0B0B0]">
                        {s.items.map((it, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-[#B0B0B0]">
                      Doorstep service in all 8 Bengaluru zones.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: INVOICES & PAYMENTS */}
          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-white tracking-wide">DIGITAL INVOICES & GST RECEIPTS</h1>
                  <p className="text-xs text-[#B0B0B0]">
                    Generated customer bills, payment verification, and tax records.
                  </p>
                </div>
              </div>

              <div className="bg-[#1A1A1A] rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151515] text-[#B0B0B0] text-[10px] uppercase border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {invoices.map((inv) => (
                      <tr key={inv.invoiceNumber} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-mono font-bold text-[#FFC107]">{inv.invoiceNumber}</td>
                        <td className="py-3 px-4 text-[#B0B0B0]">{inv.date}</td>
                        <td className="py-3 px-4 font-mono text-white">{inv.bookingId}</td>
                        <td className="py-3 px-4 font-semibold text-white">{inv.customerName}</td>
                        <td className="py-3 px-4 text-[#B0B0B0]">{inv.vehicle}</td>
                        <td className="py-3 px-4 font-bold text-white">₹{inv.total}</td>
                        <td className="py-3 px-4 text-[#B0B0B0]">{inv.paymentMethod}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/15 text-[#22C55E]">
                            {inv.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setShowInvoiceModal(inv)}
                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#FFC107] hover:text-black text-white text-xs font-semibold transition-colors flex items-center gap-1 ml-auto"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View / Print</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: JOB CARDS */}
          {activeTab === 'job_cards' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">DIGITAL JOB CARDS & INSPECTION CHECKLISTS</h1>
                <p className="text-xs text-[#B0B0B0]">
                  12-point mechanic quality checklist and customer sign-off certificates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobCards.map((jc) => (
                  <div key={jc.jobCardNumber} className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#FFC107]">{jc.jobCardNumber}</span>
                      <span className="text-xs text-[#B0B0B0]">{jc.date}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{jc.customerName}</h3>
                      <p className="text-xs text-[#B0B0B0]">{jc.vehicle} • Mechanic: {jc.mechanicName}</p>
                    </div>
                    <p className="text-xs text-[#B0B0B0] italic bg-[#151515] p-2.5 rounded-lg border border-white/5">
                      "{jc.mechanicNotes}"
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span className="text-[#22C55E] flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Customer Signed Off
                      </span>
                      <button
                        onClick={() => setShowJobCardModal(jc)}
                        className="px-3 py-1 rounded bg-[#FFC107] text-black font-bold text-xs hover:bg-[#FFC107]/90 transition-all"
                      >
                        Open Job Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: SERVICE RECORDS / QR */}
          {activeTab === 'qr_records' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">SERVICE RECORDS & QR SYSTEM</h1>
                <p className="text-xs text-[#B0B0B0]">
                  QR stickers placed on customer bikes allow instant history lookup and next-service alerts.
                </p>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-40 h-40 bg-white p-3 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="border-4 border-black p-2 rounded-xl text-center">
                    <QrCode className="w-24 h-24 text-black mx-auto" />
                    <span className="font-mono text-[9px] font-black text-black">YB-BENGALURU-QR</span>
                  </div>
                </div>

                <div className="space-y-3 flex-1 text-xs">
                  <h3 className="font-black text-white text-base">YES BIKE SERVICE SMART QR TAG</h3>
                  <p className="text-[#B0B0B0] leading-relaxed">
                    Every serviced motorcycle receives a weather-resistant QR code sticker on the chassis or under-seat area. When scanned by the customer or any YES BIKE technician, it displays complete service history, oil change timestamps, parts replaced, and recommends next maintenance due dates.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-[#FFC107]/15 text-[#FFC107] font-semibold border border-[#FFC107]/30">
                      ✓ Zero Paperwork
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] font-semibold border border-[#22C55E]/30">
                      ✓ 30-Day Doorstep Guarantee
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 font-semibold border border-blue-500/30">
                      ✓ Automated WhatsApp Reminders
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: REPORTS & ANALYTICS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">REPORTS & REVENUE ANALYTICS</h1>
                <p className="text-xs text-[#B0B0B0]">
                  Financial performance, popular service packages, and regional breakdown.
                </p>
              </div>

              {/* Revenue Period Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-[#B0B0B0] uppercase">Today's Revenue</div>
                  <div className="text-2xl font-black text-white mt-1">₹3,497</div>
                  <div className="text-[10px] text-[#22C55E] mt-1 font-medium">4 services booked</div>
                </div>
                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-[#B0B0B0] uppercase">This Week's Revenue</div>
                  <div className="text-2xl font-black text-[#FFC107] mt-1">₹24,850</div>
                  <div className="text-[10px] text-[#22C55E] mt-1 font-medium">28 services completed</div>
                </div>
                <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-[#B0B0B0] uppercase">Monthly Projected</div>
                  <div className="text-2xl font-black text-[#22C55E] mt-1">₹1,18,500</div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1 font-medium">Based on 145 target jobs</div>
                </div>
              </div>

              {/* Bengaluru Zone Performance */}
              <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/10 space-y-4">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Top Performing Bengaluru Hubs</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { area: 'Indiranagar & Domlur', pct: '34%', jobs: 48 },
                    { area: 'Koramangala & HSR Layout', pct: '28%', jobs: 39 },
                    { area: 'Whitefield & Marathahalli', pct: '20%', jobs: 28 },
                    { area: 'BTM Layout & Jayanagar', pct: '18%', jobs: 25 }
                  ].map((z, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[#B0B0B0]">
                        <span className="font-semibold text-white">{z.area}</span>
                        <span>{z.jobs} Jobs ({z.pct})</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-[#FFC107]"
                          style={{ width: z.pct }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: NOTIFICATIONS / LIVE BOOKING ALERTS STREAM */}
          {activeTab === 'notifications' && (
            <div className="space-y-5">
              {/* Header & Controls */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
                    <h1 className="text-xl font-black text-white tracking-wide">
                      LIVE BOOKING ALERTS & DISPATCH STREAM
                    </h1>
                  </div>
                  <p className="text-xs text-[#B0B0B0] mt-0.5">
                    Real-time incoming customer booking feed with instant mechanic dispatch, customer contacts, and audio monitoring.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTestSound()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#FFC107]/15 border border-[#FFC107]/40 text-xs font-bold text-[#FFC107] transition-all cursor-pointer shadow-xs"
                    title="Play alert chime test"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Test Sound</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateNewBooking}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFC107] hover:bg-[#FFC107]/90 text-black text-xs font-black transition-all cursor-pointer shadow-md shadow-[#FFC107]/10"
                    title="Simulate receiving a new booking to test alert sound and stream"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Simulate Live Booking</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMarkAllAlertsRead}
                    disabled={unreadAlertsCount === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>Mark All Read</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearAllAlerts}
                    disabled={alerts.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-red-500/10 border border-white/10 hover:border-red-500/40 text-xs font-semibold text-gray-400 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>

                  {desktopPermission !== 'granted' && (
                    <button
                      type="button"
                      onClick={handleRequestDesktopPermission}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#FFC107]/10 border border-[#FFC107]/30 text-xs font-bold text-[#FFC107] transition-colors cursor-pointer"
                    >
                      <BellRing className="w-3.5 h-3.5 text-[#FFC107]" />
                      <span>Enable Browser Alerts</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Status Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#B0B0B0]">
                    <span>Total Alerts Logged</span>
                    <Radio className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">{alerts.length}</div>
                  <div className="text-[10px] text-[#22C55E] mt-1 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                    Live Firestore Stream Connected
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#B0B0B0]">
                    <span>Unread Alerts</span>
                    <Bell className="w-4 h-4 text-[#EF4444]" />
                  </div>
                  <div className={`text-2xl font-black mt-1 ${unreadAlertsCount > 0 ? 'text-[#EF4444]' : 'text-white'}`}>
                    {unreadAlertsCount}
                  </div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1">
                    {unreadAlertsCount > 0 ? 'Needs dispatcher action' : 'All alerts caught up'}
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#B0B0B0]">
                    <span>New Bookings Ingested</span>
                    <Sparkles className="w-4 h-4 text-[#FFC107]" />
                  </div>
                  <div className="text-2xl font-black text-[#FFC107] mt-1">
                    {alerts.filter((a) => a.type === 'new_booking').length}
                  </div>
                  <div className="text-[10px] text-[#B0B0B0] mt-1">
                    Doorstep service requests
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#B0B0B0]">
                    <span>Audio Alert Chime</span>
                    <Volume2 className="w-4 h-4 text-[#FFC107]" />
                  </div>
                  <div className="text-base font-black text-white mt-1">
                    {soundConfig.enabled ? 'Chime Active' : 'Muted'}
                  </div>
                  <div className="text-[10px] text-[#FFC107] mt-1 font-medium truncate">
                    Tone: {soundConfig.tone} • Vol: {Math.round(soundConfig.volume * 100)}%
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-3.5 bg-[#1A1A1A] rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[#B0B0B0] mr-2">
                    <Filter className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span className="font-bold">Filter By:</span>
                  </div>

                  {[
                    { id: 'all', label: `All (${alerts.length})` },
                    { id: 'new_booking', label: `New Bookings (${alerts.filter((a) => a.type === 'new_booking').length})` },
                    { id: 'mechanic_assigned', label: `Assigned (${alerts.filter((a) => a.type === 'mechanic_assigned').length})` },
                    { id: 'service_completed', label: `Completed (${alerts.filter((a) => a.type === 'service_completed').length})` }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setAlertFilterType(f.id)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        alertFilterType === f.id
                          ? 'bg-[#FFC107] text-black shadow-xs'
                          : 'bg-[#151515] border border-white/5 text-[#B0B0B0] hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={alertSearchQuery}
                    onChange={(e) => setAlertSearchQuery(e.target.value)}
                    placeholder="Search alerts by customer, bike, area..."
                    className="w-full bg-[#151515] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107]"
                  />
                  {alertSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setAlertSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Alert Feed Cards Stream */}
              <div className="space-y-3">
                {alerts
                  .filter((a) => {
                    if (alertFilterType !== 'all' && a.type !== alertFilterType) return false;
                    if (alertSearchQuery) {
                      const q = alertSearchQuery.toLowerCase();
                      const matchText = `${a.customerName} ${a.phone} ${a.location} ${a.vehicle} ${a.service} ${a.bookingId || ''}`.toLowerCase();
                      return matchText.includes(q);
                    }
                    return true;
                  })
                  .map((alert) => {
                    const relatedBooking = bookings.find((b) => b.id === alert.bookingId);
                    return (
                      <div
                        key={alert.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          alert.read
                            ? 'bg-[#1A1A1A] border-white/10'
                            : 'bg-[#1A1A1A] border-[#FFC107]/60 shadow-lg shadow-[#FFC107]/5 ring-1 ring-[#FFC107]/20'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/5">
                          <div className="flex flex-wrap items-center gap-2">
                            {alert.type === 'new_booking' ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFC107] text-black shadow-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                                New Booking
                              </span>
                            ) : alert.type === 'mechanic_assigned' ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                                <UserCheck className="w-3 h-3" />
                                Mechanic Assigned
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Service Completed
                              </span>
                            )}

                            {alert.bookingId && (
                              <span className="font-mono text-xs font-bold text-[#FFC107] bg-white/5 px-2 py-0.5 rounded">
                                {alert.bookingId}
                              </span>
                            )}

                            <span className="text-xs text-[#B0B0B0] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#B0B0B0]" />
                              {alert.time}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleAlertRead(alert.id)}
                              className={`text-[11px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                alert.read
                                  ? 'text-[#B0B0B0] hover:text-white bg-white/5'
                                  : 'text-[#FFC107] bg-[#FFC107]/10'
                              }`}
                            >
                              {alert.read ? 'Mark Unread' : 'Mark Read'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteAlert(alert.id)}
                              className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                              title="Delete this alert"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Customer & Booking Details Card Content */}
                        <div className="py-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-[#B0B0B0] uppercase block">Customer Details</span>
                            <div className="text-sm font-black text-white mt-0.5">{alert.customerName}</div>
                            <div className="text-[#FFC107] font-mono mt-0.5 font-bold">{alert.phone}</div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-[#B0B0B0] uppercase block">Vehicle & Area</span>
                            <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
                              <Wrench className="w-3.5 h-3.5 text-[#FFC107]" />
                              <span>{alert.vehicle}</span>
                            </div>
                            <div className="text-[#B0B0B0] mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              <span>{alert.location}, Bengaluru</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-[#B0B0B0] uppercase block">Service Package & Bill</span>
                            <div className="text-xs font-bold text-white mt-0.5 truncate">{alert.service}</div>
                            {alert.amount > 0 && (
                              <div className="text-base font-black text-[#22C55E] mt-0.5">
                                ₹{alert.amount}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom Actions Row */}
                        <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (relatedBooking) {
                                  setSelectedBooking(relatedBooking);
                                } else {
                                  setSelectedBooking({
                                    id: alert.bookingId || `ID-${Date.now()}`,
                                    customerName: alert.customerName,
                                    phone: alert.phone,
                                    location: alert.location,
                                    addressDetails: `${alert.location}, Bengaluru`,
                                    googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(alert.location + ' Bengaluru')}`,
                                    vehicleType: alert.vehicle.toLowerCase().includes('scooter') ? 'Scooter' : 'Bike',
                                    brand: alert.vehicle.split(' ')[0] || 'Honda',
                                    model: alert.vehicle.split(' ').slice(1).join(' ') || 'Model',
                                    serviceType: alert.service,
                                    date: new Date().toISOString().split('T')[0],
                                    time: 'Today',
                                    amount: alert.amount,
                                    advancePaid: 0,
                                    remainingBalance: alert.amount,
                                    paymentMethod: 'UPI / GPay',
                                    paymentStatus: 'Unpaid',
                                    status: 'pending',
                                    createdAt: new Date(alert.timestamp).toISOString(),
                                    isNew: true
                                  });
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#FFC107] text-black text-xs font-black hover:bg-[#FFC107]/90 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Booking Details</span>
                            </button>

                            {relatedBooking && (
                              <button
                                type="button"
                                onClick={() => setShowAssignModal(relatedBooking)}
                                className="px-3 py-1.5 rounded-lg bg-[#151515] border border-white/10 hover:border-[#FFC107] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <UserCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                                <span>Assign Mechanic</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                handleWhatsAppCustomer({
                                  id: alert.bookingId || 'ID-BOOKING',
                                  customerName: alert.customerName,
                                  phone: alert.phone,
                                  location: alert.location,
                                  brand: alert.vehicle.split(' ')[0] || 'Vehicle',
                                  model: alert.vehicle.split(' ').slice(1).join(' ') || 'Two Wheeler',
                                  serviceType: alert.service,
                                  date: 'Today',
                                  time: alert.time
                                } as any);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] hover:bg-[#22C55E] hover:text-black text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>

                            <a
                              href={`tel:${alert.phone.replace(/[^0-9+]/g, '')}`}
                              className="px-3 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-white hover:text-[#FFC107] hover:border-[#FFC107] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5 text-amber-400" />
                              <span>Call Customer</span>
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleTestSound()}
                              className="px-2.5 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-[#B0B0B0] hover:text-[#FFC107] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Replay Alert Sound"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-[#FFC107]" />
                              <span>Replay Chime</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {alerts.length === 0 && (
                  <div className="py-16 text-center bg-[#1A1A1A] rounded-2xl border border-white/10 p-8 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#151515] border border-white/10 text-gray-500 flex items-center justify-center mx-auto">
                      <BellRing className="w-7 h-7 text-[#FFC107] animate-pulse" />
                    </div>
                    <h3 className="text-base font-black text-white">No Live Booking Alerts In Log</h3>
                    <p className="text-xs text-[#B0B0B0] max-w-md mx-auto">
                      The dispatch system is actively connected to the live database and monitoring for customer bookings across Bengaluru.
                    </p>
                    <button
                      type="button"
                      onClick={handleSimulateNewBooking}
                      className="px-4 py-2 rounded-lg bg-[#FFC107] text-black font-black text-xs hover:bg-[#FFC107]/90 transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-[#FFC107]/15"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Simulate A Test Booking</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">OPERATIONS SETTINGS</h1>
                <p className="text-xs text-[#B0B0B0]">
                  Configure company contact helpline, WhatsApp dispatch bot, and service hours.
                </p>
              </div>

              {/* Sound Notifications Settings Card */}
              <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 space-y-5 max-w-2xl text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#FFC107]/15 border border-[#FFC107]/30 text-[#FFC107] flex items-center justify-center">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">Audio Alerts & New Booking Sound</h3>
                      <p className="text-[11px] text-[#B0B0B0]">
                        Play an audible chime when customers submit a new doorstep service booking.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpdateSoundConfig({ enabled: !soundConfig.enabled })}
                    className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                      soundConfig.enabled ? 'bg-[#FFC107]' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`block w-4.5 h-4.5 rounded-full bg-black transition-transform absolute top-1 ${
                        soundConfig.enabled ? 'left-6.5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Tone Selection with Previews */}
                <div>
                  <label className="block text-white font-bold mb-2">Notification Alert Tone</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        id: 'doorstep',
                        name: 'Doorstep Bell (Ding-Dong)',
                        desc: 'Rich two-tone arrival bell chime'
                      },
                      {
                        id: 'two_tone',
                        name: 'Modern Two-Tone Ping',
                        desc: 'High clarity electronic alert'
                      },
                      {
                        id: 'arpeggio',
                        name: 'Harmonic Arpeggio',
                        desc: 'Ascending 4-note melodic chime'
                      },
                      {
                        id: 'dispatch',
                        name: 'Express Dispatch Alert',
                        desc: 'Sharp double-pulse notification'
                      }
                    ].map((tone) => (
                      <div
                        key={tone.id}
                        onClick={() => {
                          handleUpdateSoundConfig({ tone: tone.id as AlertSoundTone });
                          handleTestSound(tone.id as AlertSoundTone);
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                          soundConfig.tone === tone.id
                            ? 'bg-[#FFC107]/15 border-[#FFC107] text-white shadow-sm'
                            : 'bg-[#151515] border-white/5 text-[#B0B0B0] hover:text-white hover:border-white/20'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-xs flex items-center gap-1.5">
                            <span className={soundConfig.tone === tone.id ? 'text-[#FFC107]' : 'text-white'}>
                              {tone.name}
                            </span>
                            {soundConfig.tone === tone.id && (
                              <Check className="w-3.5 h-3.5 text-[#FFC107] shrink-0" />
                            )}
                          </div>
                          <span className="text-[10px] text-[#B0B0B0] block mt-0.5">{tone.desc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestSound(tone.id as AlertSoundTone);
                          }}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-[#FFC107] hover:text-black text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                          title="Preview tone"
                        >
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Volume Level */}
                <div>
                  <div className="flex items-center justify-between font-bold mb-1.5">
                    <span className="text-white">Alert Volume Level</span>
                    <span className="text-[#FFC107] font-mono">{Math.round(soundConfig.volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={soundConfig.volume}
                    onChange={(e) => handleUpdateSoundConfig({ volume: parseFloat(e.target.value) })}
                    className="w-full accent-[#FFC107] cursor-pointer"
                  />
                </div>

                {/* Test & Simulation Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleTestSound()}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#FFC107] text-black font-black text-xs flex items-center justify-center gap-1.5 hover:bg-[#FFC107]/90 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Play Sound Test</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateNewBooking}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#151515] border border-[#FFC107]/40 text-[#FFC107] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#FFC107]/10 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Simulate Incoming Booking</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 space-y-4 max-w-2xl text-xs">
                <div>
                  <label className="block text-[#B0B0B0] font-bold mb-1">Company Helpline Number</label>
                  <input
                    type="text"
                    defaultValue="+91 7090400617"
                    disabled
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white font-mono"
                  />
                  <span className="text-[10px] text-[#B0B0B0] mt-1 block">Verified YES BIKE SERVICE WhatsApp helpline</span>
                </div>

                <div>
                  <label className="block text-[#B0B0B0] font-bold mb-1">Operating Working Hours</label>
                  <input
                    type="text"
                    defaultValue="8:00 AM - 8:00 PM (Monday to Sunday)"
                    disabled
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#B0B0B0] font-bold mb-1">Doorstep Coverage Guarantee</label>
                  <input
                    type="text"
                    defaultValue="Doorstep anywhere in Bengaluru within 10-15 km radius of hubs"
                    disabled
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-xs">Active Admin Session: {adminUser.email}</div>
                    <div className="text-[10px] text-[#B0B0B0]">
                      Permission Level: {adminUser.role === 'super_admin' ? 'Master Administrator' : 'Dispatcher'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-3 py-1.5 rounded-lg bg-[#EF4444]/15 hover:bg-[#EF4444] text-[#EF4444] hover:text-white font-bold text-xs transition-colors"
                    >
                      Log Out
                    </button>
                    <button
                      type="button"
                      onClick={onReturnToHome}
                      className="px-4 py-1.5 rounded-lg bg-[#FFC107] text-black font-bold hover:bg-[#FFC107]/90 text-xs transition-all"
                    >
                      Save & Return
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: BOOKING DETAILS MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-white/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-white space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#FFC107] font-mono">{selectedBooking.id}</span>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <p className="text-xs text-[#B0B0B0] mt-1">
                  Booked on {selectedBooking.date} at {selectedBooking.time}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/20 text-[#B0B0B0] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Admin Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-[#1A1A1A] rounded-xl border border-white/10">
              <span className="text-xs font-bold text-[#FFC107] uppercase mr-2">Quick Actions:</span>
              <a
                href={`tel:${selectedBooking.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
                Call Customer
              </a>
              <button
                onClick={() => handleWhatsAppCustomer(selectedBooking)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-black text-xs text-emerald-400 font-semibold transition-colors"
                title="Message Customer via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Message
              </button>
              <button
                onClick={() => handleWhatsAppMechanic(selectedBooking)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22C55E]/20 hover:bg-[#22C55E] hover:text-black text-xs text-[#22C55E] font-semibold transition-colors"
                title="WhatsApp mechanic send"
              >
                <Wrench className="w-3.5 h-3.5" />
                WhatsApp mechanic send
              </button>
              {selectedBooking.googleMapsUrl && (
                <a
                  href={selectedBooking.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500 hover:text-white text-xs text-blue-400 font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  View Maps
                </a>
              )}
              <button
                onClick={() => handleGenerateInvoice(selectedBooking)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400 hover:text-black text-xs text-amber-300 font-semibold transition-colors"
              >
                <Receipt className="w-3.5 h-3.5" />
                Invoice
              </button>
              <button
                onClick={() => handleGenerateJobCard(selectedBooking)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500 hover:text-white text-xs text-purple-300 font-semibold transition-colors"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                Job Card
              </button>
            </div>

            {/* 4 Information Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Customer Info */}
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="text-[#FFC107] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Customer Information
                </div>
                <div className="text-sm font-black text-white">{selectedBooking.customerName}</div>
                <div className="text-[#B0B0B0] font-mono">{selectedBooking.phone}</div>
                <div className="text-[#B0B0B0] leading-relaxed pt-1">
                  <strong className="text-white">Address:</strong> {selectedBooking.addressDetails || selectedBooking.location}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="text-[#FFC107] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  Vehicle Information
                </div>
                <div className="text-sm font-black text-white">
                  {selectedBooking.brand} {selectedBooking.model}
                </div>
                <div className="text-[#B0B0B0]">
                  Type: <span className="text-white font-semibold">{selectedBooking.vehicleType}</span>
                </div>
                <div className="text-[#B0B0B0]">
                  Reg Number: <span className="font-mono text-[#FFC107]">{selectedBooking.registrationNumber || 'Not specified'}</span>
                </div>
              </div>

              {/* Service Info */}
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="text-[#FFC107] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  Service Information
                </div>
                <div className="text-sm font-black text-white">{selectedBooking.serviceType}</div>
                <div className="text-[#B0B0B0]">
                  Slot: <span className="text-white font-semibold">{selectedBooking.date} • {selectedBooking.time}</span>
                </div>
                {selectedBooking.customerComplaint && (
                  <div className="p-2 rounded bg-[#151515] border border-white/5 text-[#B0B0B0] mt-1">
                    <strong className="text-amber-300">Complaint:</strong> {selectedBooking.customerComplaint}
                  </div>
                )}
                {selectedBooking.customerNotes && (
                  <div className="text-[11px] text-[#B0B0B0]">
                    <strong className="text-white">Notes:</strong> {selectedBooking.customerNotes}
                  </div>
                )}
              </div>

              {/* Payment Info */}
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="text-[#FFC107] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5" />
                  Payment Information
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#B0B0B0]">Booking Amount:</span>
                  <span className="font-black text-white">₹{selectedBooking.amount}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#B0B0B0]">Advance Paid:</span>
                  <span className="font-bold text-[#22C55E]">₹{selectedBooking.advancePaid}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#B0B0B0]">Remaining Balance:</span>
                  <span className="font-bold text-[#EF4444]">₹{selectedBooking.remainingBalance}</span>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#B0B0B0]">Method: {selectedBooking.paymentMethod}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedBooking.paymentStatus === 'Paid'
                        ? 'bg-[#22C55E]/15 text-[#22C55E]'
                        : 'bg-[#EF4444]/15 text-[#EF4444]'
                    }`}
                  >
                    {selectedBooking.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Mechanic Assignment & Status Transition */}
            <div className="p-4 bg-[#1A1A1A] rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider">Update Booking Workflow Stage</span>
                <span className="text-[#B0B0B0]">Assigned: <strong className="text-[#FFC107]">{selectedBooking.mechanicName || 'None'}</strong></span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowAssignModal(selectedBooking)}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500 hover:text-white text-xs font-bold text-purple-300 border border-purple-500/30 transition-all"
                >
                  {selectedBooking.mechanicName ? 'Change Mechanic' : 'Assign Mechanic'}
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'accepted')}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500 hover:text-white text-xs font-bold text-blue-300 border border-blue-500/30 transition-all"
                >
                  Accept Booking
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'on_the_way')}
                  className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400 hover:text-black text-xs font-bold text-amber-300 border border-amber-400/30 transition-all"
                >
                  Mark On The Way
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'mechanic_reached')}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500 hover:text-black text-xs font-bold text-sky-300 border border-sky-500/30 transition-all"
                >
                  Mechanic Reached
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'service_started')}
                  className="px-3 py-1.5 rounded-lg bg-yellow-400/20 hover:bg-yellow-400 hover:text-black text-xs font-bold text-yellow-300 border border-yellow-400/30 transition-all"
                >
                  Service Started
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                  className="px-3 py-1.5 rounded-lg bg-[#22C55E]/20 hover:bg-[#22C55E] hover:text-black text-xs font-bold text-[#22C55E] border border-[#22C55E]/30 transition-all"
                >
                  Complete Service
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'cancelled', 'Cancelled by admin')}
                  className="px-3 py-1.5 rounded-lg bg-[#EF4444]/20 hover:bg-[#EF4444] hover:text-white text-xs font-bold text-[#EF4444] border border-[#EF4444]/30 transition-all ml-auto"
                >
                  Cancel Booking
                </button>
              </div>
            </div>

            {/* Audit History Timeline */}
            {selectedBooking.history && selectedBooking.history.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#B0B0B0] uppercase tracking-wider">
                  Audit History Timeline
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {selectedBooking.history.map((h, i) => (
                    <div key={i} className="text-[11px] p-2 rounded bg-[#1A1A1A] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#FFC107]">{h.timestamp}</span>
                        <span className="text-white font-medium">{h.note}</span>
                      </div>
                      <span className="text-[#B0B0B0] text-[10px]">by {h.updatedBy}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: ASSIGN MECHANIC MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-white/20 rounded-2xl w-full max-w-lg p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-black text-white text-base">Assign Mechanic to {showAssignModal.id}</h3>
                <p className="text-xs text-[#B0B0B0]">
                  {showAssignModal.brand} {showAssignModal.model} in {showAssignModal.location}
                </p>
              </div>
              <button
                onClick={() => setShowAssignModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#B0B0B0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {mechanics.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleAssignMechanic(showAssignModal.id, m.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    m.status === 'available'
                      ? 'bg-[#1A1A1A] border-white/10 hover:border-[#FFC107] hover:bg-white/5'
                      : 'bg-[#151515] border-white/5 opacity-60'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white text-xs flex items-center gap-2">
                      <span>{m.name}</span>
                      <span className="text-[10px] text-[#FFC107] font-mono">({m.id})</span>
                    </div>
                    <p className="text-[11px] text-[#B0B0B0]">{m.assignedArea}</p>
                    <p className="text-[10px] text-[#B0B0B0]/70">{m.specialties.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'available'
                          ? 'bg-[#22C55E]/15 text-[#22C55E]'
                          : 'bg-white/10 text-[#B0B0B0]'
                      }`}
                    >
                      {m.status === 'available' ? 'Available' : 'Busy'}
                    </span>
                    <div className="text-[10px] text-[#FFC107] font-bold mt-1">★ {m.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD MECHANIC MODAL */}
      {showAddMechanicModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddMechanicSubmit}
            className="bg-[#151515] border border-white/20 rounded-2xl w-full max-w-md p-6 text-white space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">Add New Field Mechanic</h3>
              <button
                type="button"
                onClick={() => setShowAddMechanicModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#B0B0B0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#B0B0B0] font-bold mb-1">Mechanic Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newMechanicName}
                  onChange={(e) => setNewMechanicName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="block text-[#B0B0B0] font-bold mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9845012345"
                  value={newMechanicPhone}
                  onChange={(e) => setNewMechanicPhone(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="block text-[#B0B0B0] font-bold mb-1">Assigned Bengaluru Area</label>
                <select
                  value={newMechanicArea}
                  onChange={(e) => setNewMechanicArea(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="Indiranagar">Indiranagar & Domlur</option>
                  <option value="Koramangala">Koramangala & HSR</option>
                  <option value="Whitefield">Whitefield & Marathahalli</option>
                  <option value="BTM Layout">BTM Layout & Jayanagar</option>
                  <option value="Electronic City">Electronic City Phase 1 & 2</option>
                </select>
              </div>

              <div>
                <label className="block text-[#B0B0B0] font-bold mb-1">Experience Level</label>
                <select
                  value={newMechanicExp}
                  onChange={(e) => setNewMechanicExp(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="2 Years">2 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="6 Years">6 Years</option>
                  <option value="8+ Years">8+ Years Senior Technician</option>
                </select>
              </div>

              <div>
                <label className="block text-[#B0B0B0] font-bold mb-1">Primary Specialty</label>
                <input
                  type="text"
                  value={newMechanicSpecialty}
                  onChange={(e) => setNewMechanicSpecialty(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddMechanicModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#B0B0B0]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#FFC107] text-black font-bold text-xs hover:bg-[#FFC107]/90 transition-all"
              >
                Add Mechanic
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: PRINTABLE DIGITAL INVOICE */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="text-xl font-black text-black tracking-wide">YES BIKE SERVICE</div>
                <p className="text-xs text-gray-500">Quality Bike Care at Your Doorstep • Bengaluru</p>
                <p className="text-xs text-gray-500">Helpline: +91 7090400617 | GSTIN: 29AABCY1234F1Z5</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded bg-black text-[#FFC107] font-black text-xs font-mono">
                  TAX INVOICE
                </span>
                <div className="font-mono text-xs font-bold text-gray-700 mt-1">{showInvoiceModal.invoiceNumber}</div>
                <div className="text-xs text-gray-500">Date: {showInvoiceModal.date}</div>
              </div>
            </div>

            {/* Bill To Info */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <span className="font-bold text-gray-500 uppercase tracking-wider block text-[10px]">Customer Details</span>
                <div className="font-black text-sm text-black">{showInvoiceModal.customerName}</div>
                <div className="text-gray-600 font-mono">{showInvoiceModal.phone}</div>
                <div className="text-gray-600 mt-1">{showInvoiceModal.location}</div>
              </div>
              <div>
                <span className="font-bold text-gray-500 uppercase tracking-wider block text-[10px]">Service & Vehicle</span>
                <div className="font-bold text-black">{showInvoiceModal.vehicle}</div>
                <div className="text-gray-600 font-mono text-[11px] mt-1">Booking Ref: {showInvoiceModal.bookingId}</div>
                <div className="text-emerald-600 font-bold mt-1">Payment Status: {showInvoiceModal.paymentStatus}</div>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black text-black uppercase text-[10px]">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {showInvoiceModal.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-medium">{it.description}</td>
                    <td className="py-2.5 text-center">{it.quantity}</td>
                    <td className="py-2.5 text-right font-mono">₹{it.unitPrice}</td>
                    <td className="py-2.5 text-right font-mono font-bold">₹{it.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-black font-black text-sm">
                  <td colSpan={3} className="py-3 text-right">Grand Total:</td>
                  <td className="py-3 text-right font-mono text-[#FFC107] bg-black px-2 rounded">
                    ₹{showInvoiceModal.total}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="text-[11px] text-gray-500 border-t pt-4 space-y-1">
              <p>• 30-Day Doorstep Service Guarantee included on all workmanship.</p>
              <p>• This is a computer generated invoice and requires no physical signature.</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-xs font-bold transition-all"
              >
                <Printer className="w-4 h-4 text-[#FFC107]" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setShowInvoiceModal(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs font-bold text-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: PRINTABLE JOB CARD */}
      {showJobCardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="text-xl font-black text-black">YES BIKE SERVICE — 12-POINT JOB CARD</div>
                <p className="text-xs text-gray-500">Doorstep Technical Checklist & Sign-Off Certificate</p>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="font-bold text-black">{showJobCardModal.jobCardNumber}</span>
                <div className="text-gray-500">{showJobCardModal.date}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <div className="font-bold text-black">{showJobCardModal.customerName}</div>
                <div className="text-gray-600 font-mono">{showJobCardModal.phone}</div>
                <div className="text-gray-600 mt-1">Vehicle: {showJobCardModal.vehicle}</div>
              </div>
              <div>
                <div>Mechanic: <strong className="text-black">{showJobCardModal.mechanicName}</strong></div>
                <div>Odometer: <strong className="text-black">{showJobCardModal.odometerReading}</strong></div>
                <div>Fuel Level: <strong className="text-black">{showJobCardModal.fuelLevel}</strong></div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-black text-black uppercase tracking-wider block">
                12-Point Multi-Point Doorstep Inspection:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {showJobCardModal.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200">
                    <span className="text-gray-800 font-medium">{item.item}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.condition === 'Good'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {item.condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="font-bold text-gray-700 block mb-1">Technician Remarks:</span>
              <p className="text-gray-600 italic">{showJobCardModal.mechanicNotes}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-xs font-bold transition-all"
              >
                <Printer className="w-4 h-4 text-[#FFC107]" />
                <span>Print Job Card</span>
              </button>
              <button
                onClick={() => setShowJobCardModal(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs font-bold text-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
