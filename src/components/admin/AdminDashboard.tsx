import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  UserCheck,
  MapPin,
  Wrench,
  CheckCircle2,
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
  Bell,
  LogOut,
  Users,
  Tag,
  Receipt,
  FileCheck2,
  QrCode,
  BarChart3,
  Settings,
  Star,
  Check,
  X,
  Volume2,
  VolumeX,
  Play,
  BellRing,
  Sparkles,
  Radio,
  Trash2,
  Menu,
  Edit3,
  Save,
  SlidersHorizontal
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
  saveBookingPermanently,
  updateBookingPermanently,
  deleteBookingPermanently,
  updateBookingStatusPermanently,
  assignMechanicPermanently,
  saveMechanicPermanently,
  updateMechanicPermanently,
  deleteMechanicPermanently,
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
import {
  AdminBusinessSettings,
  BENGALURU_ZONES,
  BOOKING_STATUS_META,
  DEFAULT_BUSINESS_SETTINGS,
  DEFAULT_SERVICE_PACKAGES,
  ServicePackageItem,
  buildCustomerWhatsAppUrl,
  buildMechanicWhatsAppUrl,
  normalizePhone
} from './adminConstants';
import { NewBookingModal } from './NewBookingModal';
import { BookingDetailModal } from './BookingDetailModal';
import {
  AssignMechanicModal,
  MechanicFormModal,
  InvoiceModal,
  JobCardModal
} from './DocumentModals';
import {
  AdminReportsView,
  AdminServicesView,
  AdminQRRecordsView
} from './AdminAnalyticsViews';
import { AdminLiveAlertsView, LiveAlert } from './AdminLiveAlertsView';

export type { LiveAlert };

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

const TAB_TITLES: Record<AdminTab, string> = {
  dashboard: 'Operations Dashboard',
  all_bookings: 'Booking Management',
  new_bookings: 'New Bookings Inbox',
  mechanics: 'Mechanic Fleet',
  customers: 'Customer Directory',
  services: 'Services & Tariffs',
  invoices: 'Invoices & Payments',
  job_cards: 'Digital Job Cards',
  qr_records: 'QR Service Tags',
  reports: 'Reports & Analytics',
  notifications: 'Live Booking Alerts',
  settings: 'System Settings'
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToHome }) => {
  // Authentication Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_session');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
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

  // Persistent Datasets
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

  const [servicePackages, setServicePackages] = useState<ServicePackageItem[]>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_packages');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_SERVICE_PACKAGES;
  });

  const [businessSettings, setBusinessSettings] = useState<AdminBusinessSettings>(() => {
    try {
      const saved = localStorage.getItem('yesbike_admin_business_settings');
      if (saved) return { ...DEFAULT_BUSINESS_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return DEFAULT_BUSINESS_SETTINGS;
  });

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPayment, setFilterPayment] = useState<string>('all');
  const [filterDate, setFilterDate] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'amount_desc' | 'date_asc'>('newest');
  const [selectedBookingIds, setSelectedBookingIds] = useState<string[]>([]);
  const [mechanicZoneFilter, setMechanicZoneFilter] = useState('all');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<'all' | 'Paid' | 'Unpaid'>('all');
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [confirmDeleteMechId, setConfirmDeleteMechId] = useState<string | null>(null);

  // Modals
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [preselectedPkg, setPreselectedPkg] = useState<ServicePackageItem | null>(null);
  const [showAssignModal, setShowAssignModal] = useState<Booking | null>(null);
  const [showMechanicModal, setShowMechanicModal] = useState(false);
  const [editingMechanic, setEditingMechanic] = useState<Mechanic | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState<Invoice | null>(null);
  const [showJobCardModal, setShowJobCardModal] = useState<JobCard | null>(null);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
  };

  useEffect(() => {
    if (!actionToast) return;
    const t = setTimeout(() => setActionToast(null), 3200);
    return () => clearTimeout(t);
  }, [actionToast]);

  // Keyboard shortcuts: "/" focuses search, "Escape" closes popovers/drawer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.tagName !== 'SELECT'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setShowNotificationCenter(false);
        setShowSoundMenu(false);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
        phone: '+91 98440 55123',
        location: 'BTM Layout, Bengaluru',
        vehicle: 'TVS Jupiter 125',
        service: 'Basic General Service - ₹699',
        amount: 699,
        time: 'Just now',
        timestamp: Date.now() - 60000,
        read: false,
        type: 'new_booking',
        title: 'New Doorstep Booking',
        message: 'Priya Nambiar booked Basic General Service in BTM Layout'
      },
      {
        id: 'alert-2',
        bookingId: 'ID-11079',
        customerName: 'Rahul Mehta',
        phone: '+91 98451 98122',
        location: 'Indiranagar, Bengaluru',
        vehicle: 'Royal Enfield Classic 350',
        service: 'Standard General Service - ₹999',
        amount: 999,
        time: '14 mins ago',
        timestamp: Date.now() - 840000,
        read: false,
        type: 'mechanic_assigned',
        title: 'Mechanic Assigned',
        message: 'Ramesh Kumar assigned to Royal Enfield Classic 350 (ID-11079)'
      },
      {
        id: 'alert-3',
        bookingId: 'ID-11081',
        customerName: 'Vikram Sundaram',
        phone: '+91 99011 87654',
        location: 'Whitefield, Bengaluru',
        vehicle: 'Bajaj Pulsar NS200',
        service: 'Breakdown & Emergency Repair - ₹499',
        amount: 799,
        time: '45 mins ago',
        timestamp: Date.now() - 2700000,
        read: true,
        type: 'service_completed',
        title: 'Service Completed',
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

  // Sound state
  const [soundConfig, setSoundConfig] = useState<SoundConfig>(() => soundService.getConfig());
  const [newBookingToast, setNewBookingToast] = useState<Booking | null>(null);
  const knownBookingIdsRef = useRef<Set<string>>(new Set(bookings.map((b) => b.id)));
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    if (!newBookingToast) return;
    const timer = setTimeout(() => setNewBookingToast(null), 12000);
    return () => clearTimeout(timer);
  }, [newBookingToast]);

  // Persist local preferences
  useEffect(() => {
    try {
      localStorage.setItem('yesbike_admin_live_alerts', JSON.stringify(alerts));
    } catch {
      // ignore
    }
  }, [alerts]);

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

  useEffect(() => {
    try {
      localStorage.setItem('yesbike_admin_packages', JSON.stringify(servicePackages));
    } catch {
      // ignore
    }
  }, [servicePackages]);

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
      `YES BIKE: New Booking from ${b.customerName}`,
      `${b.brand} ${b.model} · ${b.serviceType} (${b.location})`
    );
    setNewBookingToast(b);
  };

  // Real-time Firestore Subscriptions
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
          createAlertForBooking(brandNewBookings[0]);
        }
      }
    });

    const handleCustomNewBooking = (e: Event) => {
      const customEvent = e as CustomEvent<Booking>;
      if (customEvent.detail) {
        knownBookingIdsRef.current.add(customEvent.detail.id);
        createAlertForBooking(customEvent.detail);
      }
    };
    window.addEventListener('yesbike_new_booking', handleCustomNewBooking);

    const unsubMechanics = subscribeToMechanics((liveMechanics) => setMechanics(liveMechanics));
    const unsubInvoices = subscribeToInvoices((liveInvoices) => setInvoices(liveInvoices));
    const unsubJobCards = subscribeToJobCards((liveJobCards) => setJobCards(liveJobCards));

    return () => {
      window.removeEventListener('yesbike_new_booking', handleCustomNewBooking);
      unsubBookings();
      unsubMechanics();
      unsubInvoices();
      unsubJobCards();
    };
  }, []);

  // Compute Stats & Live Financial Metrics
  const stats: DashboardStats & {
    collectedRevenue: number;
    pendingDues: number;
    availableMechanics: number;
  } = useMemo(() => {
    let newCount = 0;
    let pendingCount = 0;
    let acceptedCount = 0;
    let mechanicAssignedCount = 0;
    let onTheWayCount = 0;
    let serviceInProgressCount = 0;
    let completedCount = 0;
    let cancelledCount = 0;
    let revenue = 0;
    let collected = 0;

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
        collected += b.paymentStatus === 'Paid' ? b.amount || 0 : b.advancePaid || 0;
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
      totalRevenue: revenue,
      collectedRevenue: collected,
      pendingDues: Math.max(0, revenue - collected),
      availableMechanics: mechanics.filter((m) => m.status === 'available').length
    };
  }, [bookings, mechanics]);

  // Dynamic Customer Directory (merges INITIAL_CUSTOMERS + all live bookings by normalized phone)
  const dynamicCustomers: Customer[] = useMemo(() => {
    const map = new Map<string, Customer>();
    INITIAL_CUSTOMERS.forEach((c) => {
      map.set(normalizePhone(c.phone), { ...c });
    });

    bookings.forEach((b) => {
      const key = normalizePhone(b.phone);
      const existing = map.get(key);
      const vehicleLabel = `${b.brand} ${b.model}`.trim();
      if (existing) {
        // Count live bookings if not already accounted or compute max
        const liveMatches = bookings.filter((x) => normalizePhone(x.phone) === key && x.status !== 'cancelled');
        const liveSpent = liveMatches.reduce((s, x) => s + (x.amount || 0), 0);
        map.set(key, {
          ...existing,
          name: b.customerName || existing.name,
          location: b.location || existing.location,
          vehicle: vehicleLabel || existing.vehicle,
          totalBookings: Math.max(existing.totalBookings, liveMatches.length),
          totalSpent: Math.max(existing.totalSpent, liveSpent),
          lastBookingDate: b.date > existing.lastBookingDate ? b.date : existing.lastBookingDate
        });
      } else {
        map.set(key, {
          id: `CUST-${String(map.size + 1).padStart(3, '0')}`,
          name: b.customerName,
          phone: b.phone,
          location: b.location,
          totalBookings: 1,
          totalSpent: b.status === 'cancelled' ? 0 : b.amount || 0,
          lastBookingDate: b.date,
          vehicle: vehicleLabel
        });
      }
    });

    const list = Array.from(map.values());
    if (!searchQuery.trim() || activeTab !== 'customers') return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.vehicle.toLowerCase().includes(q)
    );
  }, [bookings, searchQuery, activeTab]);

  // Filtered & Sorted Bookings
  const filteredBookings = useMemo(() => {
    const list = bookings.filter((b) => {
      if (activeTab === 'new_bookings' && !b.isNew && b.status !== 'pending') return false;
      if (filterStatus !== 'all' && b.status !== filterStatus) return false;
      if (filterPayment !== 'all' && b.paymentStatus !== filterPayment) return false;
      if (filterLocation !== 'all' && !b.location.toLowerCase().includes(filterLocation.toLowerCase())) {
        return false;
      }
      if (filterService !== 'all' && !b.serviceType.toLowerCase().includes(filterService.toLowerCase())) {
        return false;
      }
      if (filterDate && b.date !== filterDate) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hit =
          b.id.toLowerCase().includes(q) ||
          b.customerName.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q) ||
          `${b.brand} ${b.model}`.toLowerCase().includes(q) ||
          (b.registrationNumber || '').toLowerCase().includes(q) ||
          (b.mechanicName || '').toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });

    if (sortBy === 'amount_desc') {
      return [...list].sort((a, b) => (b.amount || 0) - (a.amount || 0));
    }
    if (sortBy === 'date_asc') {
      return [...list].sort((a, b) => a.date.localeCompare(b.date));
    }
    return list;
  }, [
    bookings,
    activeTab,
    filterStatus,
    filterPayment,
    filterLocation,
    filterService,
    filterDate,
    searchQuery,
    sortBy
  ]);

  // CRUD Handlers
  const handleCreateManualBooking = (booking: Booking) => {
    knownBookingIdsRef.current.add(booking.id);
    setBookings((prev) => [booking, ...prev]);
    saveBookingPermanently(booking).catch(() => {});
    if (booking.mechanicId) {
      setMechanics((prev) =>
        prev.map((m) =>
          m.id === booking.mechanicId ? { ...m, status: 'on_job', activeBookingId: booking.id } : m
        )
      );
      updateMechanicPermanently(booking.mechanicId, {
        status: 'on_job',
        activeBookingId: booking.id
      }).catch(() => {});
    }
    triggerToast(`Booking ${booking.id} created and saved.`);
  };

  const handleUpdateBooking = (bookingId: string, updates: Partial<Booking>, auditNote?: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const nextHistory = auditNote
          ? [
              ...(b.history || []),
              {
                timestamp,
                status: updates.status || b.status,
                note: auditNote,
                updatedBy: adminUser?.name || 'Admin'
              }
            ]
          : b.history;
        const updated = { ...b, ...updates, history: nextHistory };
        updateBookingPermanently(bookingId, { ...updates, history: nextHistory }).catch(() => {});
        return updated;
      })
    );
    setSelectedBooking((prev) => {
      if (!prev || prev.id !== bookingId) return prev;
      const nextHistory = auditNote
        ? [
            ...(prev.history || []),
            {
              timestamp,
              status: updates.status || prev.status,
              note: auditNote,
              updatedBy: adminUser?.name || 'Admin'
            }
          ]
        : prev.history;
      return { ...prev, ...updates, history: nextHistory };
    });
    triggerToast(`Booking ${bookingId} updated.`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    setSelectedBookingIds((prev) => prev.filter((id) => id !== bookingId));
    deleteBookingPermanently(bookingId).catch(() => {});
    triggerToast(`Booking ${bookingId} deleted.`);
  };

  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus, note?: string) => {
    const actor = adminUser?.name || 'Admin';
    updateBookingStatusPermanently(bookingId, newStatus, note, actor).catch(() => {});

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const historyItem = {
      timestamp,
      status: newStatus,
      note: note || `Status changed to ${BOOKING_STATUS_META[newStatus].label}`,
      updatedBy: actor
    };

    const targetBooking = bookings.find((b) => b.id === bookingId);

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: newStatus, isNew: false, history: [...(b.history || []), historyItem] }
          : b
      )
    );

    if (selectedBooking?.id === bookingId) {
      setSelectedBooking((prev) =>
        prev
          ? { ...prev, status: newStatus, isNew: false, history: [...(prev.history || []), historyItem] }
          : null
      );
    }

    // If completed or cancelled, free assigned mechanic automatically
    if ((newStatus === 'completed' || newStatus === 'cancelled') && targetBooking?.mechanicId) {
      const mech = mechanics.find((m) => m.id === targetBooking.mechanicId);
      if (mech) {
        const nextCompleted = newStatus === 'completed' ? mech.completedJobs + 1 : mech.completedJobs;
        setMechanics((prev) =>
          prev.map((m) =>
            m.id === mech.id
              ? { ...m, status: 'available', activeBookingId: undefined, completedJobs: nextCompleted }
              : m
          )
        );
        updateMechanicPermanently(mech.id, {
          status: 'available',
          activeBookingId: '',
          completedJobs: nextCompleted
        }).catch(() => {});
      }
    }

    triggerToast(`${bookingId} marked as ${BOOKING_STATUS_META[newStatus].label}.`);
  };

  const handleBulkStatusUpdate = (newStatus: BookingStatus) => {
    selectedBookingIds.forEach((id) => handleUpdateStatus(id, newStatus, 'Bulk updated by Admin'));
    setSelectedBookingIds([]);
  };

  const handleAssignMechanic = (bookingId: string, mechanicId: string) => {
    const mech = mechanics.find((m) => m.id === mechanicId);
    if (!mech) return;

    assignMechanicPermanently(bookingId, mech).catch(() => {});
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const historyItem = {
      timestamp,
      status: 'mechanic_assigned' as BookingStatus,
      note: `Assigned to mechanic ${mech.name} (${mech.phone})`,
      updatedBy: adminUser?.name || 'Admin'
    };

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              mechanicId: mech.id,
              mechanicName: mech.name,
              status: 'mechanic_assigned',
              isNew: false,
              history: [...(b.history || []), historyItem]
            }
          : b
      )
    );

    setMechanics((prev) =>
      prev.map((m) => (m.id === mechanicId ? { ...m, status: 'on_job', activeBookingId: bookingId } : m))
    );

    if (selectedBooking?.id === bookingId) {
      setSelectedBooking((prev) =>
        prev
          ? {
              ...prev,
              mechanicId: mech.id,
              mechanicName: mech.name,
              status: 'mechanic_assigned',
              isNew: false,
              history: [...(prev.history || []), historyItem]
            }
          : null
      );
    }

    setShowAssignModal(null);
    triggerToast(`Assigned ${mech.name} to ${bookingId}.`);
  };

  const handleSaveMechanic = (mechanic: Mechanic, isEdit: boolean) => {
    if (isEdit) {
      setMechanics((prev) => prev.map((m) => (m.id === mechanic.id ? mechanic : m)));
      triggerToast(`Updated ${mechanic.name}.`);
    } else {
      setMechanics((prev) => [mechanic, ...prev]);
      triggerToast(`Added mechanic ${mechanic.name}.`);
    }
    saveMechanicPermanently(mechanic).catch(() => {});
  };

  const handleMechanicStatusChange = (mechanicId: string, status: Mechanic['status']) => {
    setMechanics((prev) => prev.map((m) => (m.id === mechanicId ? { ...m, status } : m)));
    updateMechanicPermanently(mechanicId, { status }).catch(() => {});
    triggerToast('Mechanic duty status saved.');
  };

  const handleDeleteMechanic = (mechanicId: string) => {
    setMechanics((prev) => prev.filter((m) => m.id !== mechanicId));
    deleteMechanicPermanently(mechanicId).catch(() => {});
    setConfirmDeleteMechId(null);
    triggerToast('Mechanic removed from fleet.');
  };

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
      vehicle: `${booking.vehicleType} - ${booking.brand} ${booking.model}${
        booking.registrationNumber ? ` (${booking.registrationNumber})` : ''
      }`,
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
    saveInvoicePermanently(newInvoice).catch(() => {});
    setShowInvoiceModal(newInvoice);
  };

  const handleToggleInvoicePaid = (invoice: Invoice) => {
    const nextStatus: Invoice['paymentStatus'] = invoice.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid';
    const updatedInvoice: Invoice = { ...invoice, paymentStatus: nextStatus };

    setInvoices((prev) =>
      prev.map((inv) => (inv.invoiceNumber === invoice.invoiceNumber ? updatedInvoice : inv))
    );
    setShowInvoiceModal((prev) =>
      prev?.invoiceNumber === invoice.invoiceNumber ? updatedInvoice : prev
    );
    saveInvoicePermanently(updatedInvoice).catch(() => {});

    // Keep linked booking payment status in sync
    const linked = bookings.find((b) => b.id === invoice.bookingId);
    if (linked) {
      handleUpdateBooking(
        linked.id,
        {
          paymentStatus: nextStatus,
          advancePaid: nextStatus === 'Paid' ? linked.amount : 0,
          remainingBalance: nextStatus === 'Paid' ? 0 : linked.amount
        },
        `Invoice ${invoice.invoiceNumber} marked ${nextStatus}`
      );
    }
  };

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
      fuelLevel: 'Half Tank',
      checklist: [
        { item: 'Engine Oil Level & Quality Inspection', checked: true, condition: 'Good' },
        { item: 'Front & Rear Brake Pad / Cable Tension', checked: true, condition: 'Adjusted' },
        { item: 'Drive Chain Slackness & Lubrication', checked: true, condition: 'Adjusted' },
        { item: 'Spark Plug Gap & Ignition Terminal', checked: true, condition: 'Good' },
        { item: 'Air Filter Cleaning & Dust Removal', checked: true, condition: 'Good' },
        { item: 'Battery Voltage & Starter Health', checked: true, condition: 'Good' },
        { item: 'Tyre Pressure Calibration (Cold PSI)', checked: true, condition: 'Adjusted' },
        { item: 'Carburetor / Throttle Body Idle Check', checked: true, condition: 'Good' },
        { item: 'Clutch Lever Free-play & Smoothness', checked: true, condition: 'Adjusted' },
        { item: 'Indicator, Horn & High-Beam Testing', checked: true, condition: 'Good' },
        { item: 'Chassis Bolts, Axle Nuts & Stands', checked: true, condition: 'Good' },
        { item: 'Road Test Drive & Final Cleaning', checked: true, condition: 'Good' }
      ],
      mechanicNotes: booking.customerComplaint
        ? `Complaints addressed: ${booking.customerComplaint}. Vehicle running smooth and tested.`
        : 'General doorstep periodic maintenance completed as per standard 12-point checklist.',
      customerSignOff: false
    };

    setJobCards((prev) => [newJobCard, ...prev]);
    saveJobCardPermanently(newJobCard).catch(() => {});
    setShowJobCardModal(newJobCard);
  };

  const handleSaveJobCard = (updated: JobCard) => {
    setJobCards((prev) =>
      prev.map((jc) => (jc.jobCardNumber === updated.jobCardNumber ? updated : jc))
    );
    setShowJobCardModal(updated);
    saveJobCardPermanently(updated).catch(() => {});
    triggerToast(`Job Card ${updated.jobCardNumber} saved.`);
  };

  const handleSimulateNewBooking = () => {
    const randomId = `ID-${Math.floor(11100 + Math.random() * 800)}`;
    const mockCandidates = [
      {
        name: 'Arun Varma',
        phone: '+91 98452 11980',
        loc: 'Indiranagar, Bengaluru',
        bike: 'Royal Enfield Classic 350',
        svc: 'Royal Enfield Precision Care - ₹1499',
        amt: 1499
      },
      {
        name: 'Sneha Rao',
        phone: '+91 97422 66311',
        loc: 'Koramangala, Bengaluru',
        bike: 'Yamaha FZ-S',
        svc: 'General Service with Engine Oil - ₹1349',
        amt: 1349
      },
      {
        name: 'Kiran Deep',
        phone: '+91 96118 44023',
        loc: 'Whitefield, Bengaluru',
        bike: 'TVS Jupiter 125',
        svc: 'Basic General Service - ₹699',
        amt: 699
      },
      {
        name: 'Vikram Seth',
        phone: '+91 98860 32145',
        loc: 'HSR Layout, Bengaluru',
        bike: 'KTM Duke 250',
        svc: 'Breakdown & Emergency Rescue - ₹499',
        amt: 499
      }
    ];
    const picked = mockCandidates[Math.floor(Math.random() * mockCandidates.length)];

    const simulatedBooking: Booking = {
      id: randomId,
      customerName: picked.name,
      phone: picked.phone,
      location: picked.loc,
      addressDetails: picked.loc,
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(picked.loc)}`,
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
          note: 'Simulated incoming doorstep booking',
          updatedBy: 'Alert Simulator'
        }
      ]
    };

    knownBookingIdsRef.current.add(simulatedBooking.id);
    setBookings((prev) => [simulatedBooking, ...prev]);
    createAlertForBooking(simulatedBooking);
  };

  // Exports
  const handleExportCSV = (subset?: Booking[]) => {
    const source = subset && subset.length > 0 ? subset : filteredBookings;
    const headers = [
      'Booking ID',
      'Customer Name',
      'Phone',
      'Location',
      'Vehicle Type',
      'Brand',
      'Model',
      'Reg Number',
      'Service Type',
      'Date',
      'Time',
      'Mechanic',
      'Amount (INR)',
      'Paid',
      'Balance',
      'Payment Method',
      'Payment Status',
      'Status',
      'Complaint'
    ];

    const rows = source.map((b) => [
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

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `YES_BIKE_BOOKINGS_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast(`Exported ${source.length} bookings to CSV.`);
  };

  const handleExportJSONBackup = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      businessSettings,
      bookings,
      mechanics,
      invoices,
      jobCards,
      servicePackages
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `YES_BIKE_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast('Full JSON backup downloaded.');
  };

  const handleSaveBusinessSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('yesbike_admin_business_settings', JSON.stringify(businessSettings));
    } catch {
      // ignore
    }
    triggerToast('Business configuration saved.');
  };

  const renderStatusBadge = (status: BookingStatus) => {
    const meta = BOOKING_STATUS_META[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border whitespace-nowrap ${meta.badgeClass}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
        {meta.label}
      </span>
    );
  };

  if (!adminUser) {
    return (
      <AdminLogin
        onLoginSuccess={(user) => setAdminUser(user)}
        onReturnToHome={onReturnToHome}
      />
    );
  }

  // Grouped Sidebar Navigation
  const navGroups: {
    label: string;
    items: { id: AdminTab; label: string; icon: React.ReactNode; count?: number; urgent?: boolean }[];
  }[] = [
    {
      label: 'Operations',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        {
          id: 'all_bookings',
          label: 'All Bookings',
          icon: <CalendarCheck className="w-4 h-4" />,
          count: bookings.length
        },
        {
          id: 'new_bookings',
          label: 'New Inbox',
          icon: <Clock className="w-4 h-4" />,
          count: stats.pendingBookings + stats.newBookings > 0 ? stats.newBookings || stats.pendingBookings : 0,
          urgent: stats.newBookings > 0
        },
        {
          id: 'notifications',
          label: 'Live Alerts',
          icon: <Bell className="w-4 h-4" />,
          count: unreadAlertsCount > 0 ? unreadAlertsCount : alerts.length,
          urgent: unreadAlertsCount > 0
        }
      ]
    },
    {
      label: 'Fleet & CRM',
      items: [
        {
          id: 'mechanics',
          label: 'Mechanics',
          icon: <UserCheck className="w-4 h-4" />,
          count: stats.availableMechanics
        },
        {
          id: 'customers',
          label: 'Customers',
          icon: <Users className="w-4 h-4" />,
          count: dynamicCustomers.length
        },
        { id: 'services', label: 'Services & Tariffs', icon: <Tag className="w-4 h-4" /> }
      ]
    },
    {
      label: 'Billing & Records',
      items: [
        {
          id: 'invoices',
          label: 'Invoices',
          icon: <Receipt className="w-4 h-4" />,
          count: invoices.length
        },
        {
          id: 'job_cards',
          label: 'Job Cards',
          icon: <FileCheck2 className="w-4 h-4" />,
          count: jobCards.length
        },
        { id: 'qr_records', label: 'QR Service Tags', icon: <QrCode className="w-4 h-4" /> },
        { id: 'reports', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
      ]
    },
    {
      label: 'System',
      items: [{ id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }]
    }
  ];

  const handleSelectNav = (tab: AdminTab) => {
    setActiveTab(tab);
    if (tab === 'all_bookings') setFilterStatus('all');
    setMobileNavOpen(false);
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="p-3.5 space-y-5 overflow-y-auto">
        {/* Brand Block (Sidebar Header) */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFC107] text-black font-black flex items-center justify-center text-sm shrink-0">
              YB
            </div>
            <div className="leading-tight">
              <div className="font-black text-white text-xs tracking-wide">YES BIKE SERVICE</div>
              <div className="text-[10px] text-zinc-400">Bengaluru Dispatch</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="space-y-4">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <div className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                {group.label}
              </div>
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNav(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#FFC107] text-black font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </span>
                    {typeof item.count === 'number' && item.count > 0 && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tabular-nums ${
                          item.urgent && !isActive
                            ? 'bg-red-500 text-white'
                            : isActive
                            ? 'bg-black/20 text-black'
                            : 'bg-white/8 text-zinc-300'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3.5 border-t border-white/10 space-y-2.5">
        <div className="flex items-center gap-2.5 px-2">
          {adminUser.avatarUrl ? (
            <img
              src={adminUser.avatarUrl}
              alt={adminUser.name}
              className="w-7 h-7 rounded-full border border-[#FFC107]/60 shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/40 text-[#FFC107] font-black text-xs flex items-center justify-center shrink-0">
              {adminUser.email ? adminUser.email[0].toUpperCase() : 'A'}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">{adminUser.email}</div>
            <div className="text-[10px] text-zinc-400">
              {adminUser.role === 'super_admin' ? 'Master Admin' : 'Dispatcher'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={onReturnToHome}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#0B0B0D] hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3 h-3 text-[#FFC107]" />
            <span>Website</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#0B0B0D] hover:bg-red-500/15 border border-white/10 hover:border-red-500/35 text-[11px] font-semibold text-zinc-300 hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Filtered Mechanics
  const visibleMechanics = mechanics.filter((m) => {
    if (mechanicZoneFilter !== 'all' && !m.assignedArea.toLowerCase().includes(mechanicZoneFilter.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim() && activeTab === 'mechanics') {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.assignedArea.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.specialties.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Filtered Invoices
  const visibleInvoices = invoices.filter((inv) => {
    if (invoiceStatusFilter !== 'all' && inv.paymentStatus !== invoiceStatusFilter) return false;
    if (searchQuery.trim() && activeTab === 'invoices') {
      const q = searchQuery.toLowerCase();
      return (
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.bookingId.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q) ||
        inv.vehicle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const bookingsWithoutInvoice = bookings.filter(
    (b) => b.status !== 'cancelled' && !invoices.some((i) => i.bookingId === b.id)
  );
  const bookingsWithoutJobCard = bookings.filter(
    (b) => b.status !== 'cancelled' && !jobCards.some((j) => j.bookingId === b.id)
  );

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white flex font-sans antialiased selection:bg-[#FFC107] selection:text-black">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 lg:w-64 bg-[#141417] border-r border-white/10 flex-col shrink-0 sticky top-0 h-screen">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative z-10 w-72 max-w-[82vw] bg-[#141417] border-r border-white/10 h-full">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Clean Contextual Top Bar */}
        <header className="h-16 bg-[#141417] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2 rounded-lg bg-[#0B0B0D] border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="hidden sm:inline">Admin</span>
                <span className="hidden sm:inline">/</span>
                <span className="text-sm font-black text-white truncate">
                  {TAB_TITLES[activeTab]}
                </span>
              </div>
            </div>
          </div>

          {/* Search + Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Global Search */}
            <div className="relative hidden lg:block w-64 xl:w-72">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search bookings, phones, bikes... (/)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg pl-8 pr-7 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sound Control */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowSoundMenu(!showSoundMenu);
                  setShowNotificationCenter(false);
                }}
                className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                  soundConfig.enabled
                    ? 'bg-[#0B0B0D] border-[#FFC107]/40 text-[#FFC107]'
                    : 'bg-[#0B0B0D] border-white/10 text-zinc-500 hover:text-white'
                }`}
                title="Booking Alert Sound Settings"
              >
                {soundConfig.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {showSoundMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-[#141417] border border-white/15 rounded-xl shadow-2xl z-50 p-4 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      New Booking Sound
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSoundMenu(false)}
                      className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Chime Alerts</span>
                      <span className="text-[10px] text-zinc-400">Audible ring on new jobs</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpdateSoundConfig({ enabled: !soundConfig.enabled })}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        soundConfig.enabled ? 'bg-[#FFC107]' : 'bg-zinc-700'
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                          soundConfig.enabled ? 'left-6' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'doorstep', name: 'Doorstep Bell' },
                      { id: 'two_tone', name: 'Two-Tone Ping' },
                      { id: 'arpeggio', name: 'Arpeggio' },
                      { id: 'dispatch', name: 'Express Alert' }
                    ].map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => {
                          handleUpdateSoundConfig({ tone: tone.id as AlertSoundTone });
                          handleTestSound(tone.id as AlertSoundTone);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-between border cursor-pointer ${
                          soundConfig.tone === tone.id
                            ? 'bg-[#FFC107]/15 border-[#FFC107] text-[#FFC107]'
                            : 'bg-[#0B0B0D] border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{tone.name}</span>
                        {soundConfig.tone === tone.id && <Check className="w-3 h-3 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Volume</span>
                      <span className="font-mono text-white tabular-nums">
                        {Math.round(soundConfig.volume * 100)}%
                      </span>
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

                  <button
                    type="button"
                    onClick={() => handleTestSound()}
                    className="w-full py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Test Booking Chime</span>
                  </button>
                </div>
              )}
            </div>

            {/* Live Alerts Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotificationCenter(!showNotificationCenter);
                  setShowSoundMenu(false);
                }}
                className={`relative p-2 rounded-lg border transition-colors cursor-pointer ${
                  unreadAlertsCount > 0
                    ? 'bg-[#0B0B0D] border-[#FFC107]/45 text-[#FFC107]'
                    : 'bg-[#0B0B0D] border-white/10 text-zinc-400 hover:text-white'
                }`}
                title="Live Booking Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-[10px] font-black flex items-center justify-center text-white ring-2 ring-[#141417] font-mono tabular-nums">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {showNotificationCenter && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#141417] border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-[#0B0B0D] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-black text-white uppercase tracking-wider">
                        Live Alerts
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))}
                        className="text-[#FFC107] hover:underline font-semibold cursor-pointer"
                      >
                        Read all
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNotificationCenter(false)}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="px-3 py-2 border-b border-white/10 flex items-center gap-1.5 text-[11px]">
                    {(
                      [
                        { id: 'all', label: `All (${alerts.length})` },
                        { id: 'unread', label: `Unread (${unreadAlertsCount})` },
                        { id: 'bookings', label: 'Bookings' }
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setAlertsDropdownFilter(f.id)}
                        className={`px-2.5 py-1 rounded-md font-bold cursor-pointer ${
                          alertsDropdownFilter === f.id
                            ? 'bg-[#FFC107] text-black'
                            : 'text-zinc-400 hover:text-white bg-[#0B0B0D]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="max-h-80 overflow-y-auto p-2 space-y-1.5">
                    {alerts
                      .filter((a) => {
                        if (alertsDropdownFilter === 'unread') return !a.read;
                        if (alertsDropdownFilter === 'bookings') return a.type === 'new_booking';
                        return true;
                      })
                      .map((alert) => {
                        const rel = bookings.find((b) => b.id === alert.bookingId);
                        return (
                          <div
                            key={alert.id}
                            className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                              alert.read
                                ? 'bg-[#0B0B0D]/70 border-white/5'
                                : 'bg-[#0B0B0D] border-[#FFC107]/40'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-[#FFC107] text-[11px]">
                                {alert.bookingId || alert.title}
                              </span>
                              <span className="text-[10px] text-zinc-500">{alert.time}</span>
                            </div>
                            <p className="font-semibold text-white leading-snug">{alert.message}</p>
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center gap-1.5">
                                {rel && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedBooking(rel);
                                        setAlerts((prev) =>
                                          prev.map((x) => (x.id === alert.id ? { ...x, read: true } : x))
                                        );
                                        setShowNotificationCenter(false);
                                      }}
                                      className="px-2 py-1 rounded bg-[#FFC107] text-black text-[10px] font-black cursor-pointer"
                                    >
                                      Inspect
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowAssignModal(rel);
                                        setAlerts((prev) =>
                                          prev.map((x) => (x.id === alert.id ? { ...x, read: true } : x))
                                        );
                                        setShowNotificationCenter(false);
                                      }}
                                      className="px-2 py-1 rounded bg-white/10 text-white text-[10px] font-bold cursor-pointer"
                                    >
                                      Assign
                                    </button>
                                  </>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => setAlerts((prev) => prev.filter((x) => x.id !== alert.id))}
                                className="text-zinc-500 hover:text-red-400 cursor-pointer"
                                title="Dismiss"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    {alerts.length === 0 && (
                      <div className="py-8 text-center text-xs text-zinc-500">No active alerts.</div>
                    )}
                  </div>

                  <div className="p-2.5 bg-[#0B0B0D] border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('notifications');
                        setShowNotificationCenter(false);
                      }}
                      className="w-full py-2 rounded-lg bg-white/5 hover:bg-[#FFC107] hover:text-black text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Open Live Alerts Hub</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Primary CTA: New Walk-in / Phone Booking */}
            <button
              type="button"
              onClick={() => {
                setPreselectedPkg(null);
                setShowNewBookingModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Booking</span>
            </button>
          </div>
        </header>

        {/* Action Feedback Toast */}
        {actionToast && (
          <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-[#141417] border border-[#FFC107]/50 text-xs font-bold text-white shadow-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FFC107] shrink-0" />
            <span>{actionToast}</span>
          </div>
        )}

        {/* Floating Live Incoming Booking Alert Banner */}
        {newBookingToast && (
          <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] bg-[#141417] border-2 border-[#FFC107] rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-black flex items-center justify-center shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC107]">
                    New Doorstep Booking
                  </span>
                  <button
                    type="button"
                    onClick={() => setNewBookingToast(null)}
                    className="text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-sm font-black text-white mt-1 truncate">
                  {newBookingToast.customerName} ·{' '}
                  <span className="font-mono text-[#FFC107]">{newBookingToast.phone}</span>
                </h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">
                  {newBookingToast.brand} {newBookingToast.model} · {newBookingToast.location} · ₹
                  {newBookingToast.amount}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBooking(newBookingToast);
                      setNewBookingToast(null);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#FFC107] text-black text-xs font-black cursor-pointer"
                  >
                    Inspect
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssignModal(newBookingToast);
                      setNewBookingToast(null);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#0B0B0D] border border-white/10 text-white text-xs font-bold cursor-pointer"
                  >
                    Assign
                  </button>
                  <a
                    href={buildMechanicWhatsAppUrl(
                      newBookingToast,
                      mechanics,
                      businessSettings.whatsappNumber
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/35 text-[#22C55E] text-xs font-bold"
                  >
                    WhatsApp mechanic send
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Scrollable Workspace */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Mobile Search Input (shown on mobile/tablet where top bar search hides) */}
          <div className="lg:hidden relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ID, customer, phone, bike..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141417] border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ============================================================== */}
          {/* VIEW 1: OPERATIONS DASHBOARD OVERVIEW                          */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Operations Overview
                  </h1>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Real-time doorstep dispatch, fleet readiness, and revenue tracking across Bengaluru.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateNewBooking}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Simulate Alert</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportCSV()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Primary 4 KPI Cards (Clean, High-Contrast, Tabular Numerals) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('reports')}
                  className="bg-[#141417] p-5 rounded-xl border border-white/10 hover:border-[#FFC107]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold">Total Revenue</span>
                    <IndianRupee className="w-4 h-4 text-[#FFC107]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono tabular-nums">
                    ₹{stats.totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono tabular-nums">
                    <span className="text-emerald-400">
                      ₹{stats.collectedRevenue.toLocaleString('en-IN')} collected
                    </span>
                    <span className="text-amber-300">
                      ₹{stats.pendingDues.toLocaleString('en-IN')} due
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('new_bookings')}
                  className="bg-[#141417] p-5 rounded-xl border border-white/10 hover:border-[#FFC107]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold">Pending & New Dispatch</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono tabular-nums">
                    {stats.pendingBookings + stats.acceptedBookings}
                  </div>
                  <div className="mt-2 text-[11px] text-zinc-400 tabular-nums">
                    {stats.newBookings} new · {stats.pendingBookings} pending review
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('all_bookings');
                    setFilterStatus('completed');
                  }}
                  className="bg-[#141417] p-5 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold">Active & Completed</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono tabular-nums">
                    {stats.completedBookings}
                    <span className="text-sm font-bold text-zinc-500"> / {stats.totalBookings}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-zinc-400 tabular-nums">
                    {stats.mechanicAssigned + stats.onTheWay + stats.serviceInProgress} jobs in field
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('mechanics')}
                  className="bg-[#141417] p-5 rounded-xl border border-white/10 hover:border-[#FFC107]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold">Available Mechanics</span>
                    <UserCheck className="w-4 h-4 text-[#FFC107]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono tabular-nums">
                    {stats.availableMechanics}
                    <span className="text-sm font-bold text-zinc-500"> / {mechanics.length}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-zinc-400 tabular-nums">
                    {mechanics.filter((m) => m.status === 'on_job').length} currently on doorstep jobs
                  </div>
                </div>
              </div>

              {/* Interactive Dispatch Stage Strip (Live Counts per Stage) */}
              <div className="bg-[#141417] p-4 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live Dispatch Pipeline
                  </span>
                  <span className="text-[11px] text-zinc-500">Click any stage to filter bookings</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {(
                    [
                      { id: 'pending', count: stats.pendingBookings },
                      { id: 'accepted', count: stats.acceptedBookings },
                      { id: 'mechanic_assigned', count: stats.mechanicAssigned },
                      { id: 'on_the_way', count: stats.onTheWay },
                      {
                        id: 'mechanic_reached',
                        count: bookings.filter((b) => b.status === 'mechanic_reached').length
                      },
                      {
                        id: 'service_started',
                        count: bookings.filter((b) => b.status === 'service_started').length
                      },
                      { id: 'completed', count: stats.completedBookings },
                      { id: 'cancelled', count: stats.cancelledBookings }
                    ] as { id: BookingStatus; count: number }[]
                  ).map((stage) => {
                    const meta = BOOKING_STATUS_META[stage.id];
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => {
                          setFilterStatus(stage.id);
                          setActiveTab('all_bookings');
                        }}
                        className="p-2.5 rounded-lg bg-[#0B0B0D] hover:bg-white/5 border border-white/8 hover:border-[#FFC107]/40 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400">
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                          <span className="truncate">{meta.shortLabel}</span>
                        </div>
                        <div className="text-lg font-black text-white font-mono tabular-nums mt-1">
                          {stage.count}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dispatch Queue + Fleet Readiness */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Active Dispatch Feed (2 cols) */}
                <div className="lg:col-span-2 bg-[#141417] rounded-xl border border-white/10 overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-[#FFC107]" />
                      <span>Active Dispatch Queue</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterStatus('all');
                        setActiveTab('all_bookings');
                      }}
                      className="text-xs text-[#FFC107] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View all ({bookings.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-white/5">
                    {bookings.slice(0, 6).map((b) => {
                      const nextMeta = BOOKING_STATUS_META[b.status];
                      return (
                        <div
                          key={b.id}
                          className="px-5 py-3.5 hover:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                        >
                          <div className="min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-mono font-bold text-[#FFC107] tabular-nums">
                                {b.id}
                              </span>
                              <span className="font-bold text-white">{b.customerName}</span>
                              {b.isNew && (
                                <span className="px-1.5 py-0.5 rounded bg-red-500 text-white text-[9px] font-black">
                                  NEW
                                </span>
                              )}
                              {renderStatusBadge(b.status)}
                            </div>
                            <div className="text-[11px] text-zinc-400 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <span>
                                {b.brand} {b.model}
                              </span>
                              <span>·</span>
                              <span>{b.location}</span>
                              <span>·</span>
                              <span className="font-mono text-zinc-300 tabular-nums">
                                ₹{b.amount.toLocaleString('en-IN')}
                              </span>
                              {b.mechanicName && (
                                <>
                                  <span>·</span>
                                  <span className="text-purple-300">{b.mechanicName}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {nextMeta.nextStatus && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (nextMeta.nextStatus === 'mechanic_assigned') {
                                    setShowAssignModal(b);
                                  } else {
                                    handleUpdateStatus(b.id, nextMeta.nextStatus!);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-[#FFC107]/15 hover:bg-[#FFC107] text-[#FFC107] hover:text-black text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                {nextMeta.nextLabel}
                              </button>
                            )}
                            <a
                              href={buildMechanicWhatsAppUrl(
                                b,
                                mechanics,
                                businessSettings.whatsappNumber
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="WhatsApp mechanic send"
                              className="p-1.5 rounded-lg bg-[#22C55E]/15 hover:bg-[#22C55E] text-[#22C55E] hover:text-black transition-colors"
                            >
                              <Wrench className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => setSelectedBooking(b)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Inspect booking"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mechanics On Duty (1 col) */}
                <div className="bg-[#141417] rounded-xl border border-white/10 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                      <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#FFC107]" />
                        <span>Mechanics On Duty</span>
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActiveTab('mechanics')}
                        className="text-xs text-[#FFC107] hover:underline font-semibold cursor-pointer"
                      >
                        Manage
                      </button>
                    </div>

                    <div className="divide-y divide-white/5">
                      {mechanics.slice(0, 5).map((m) => (
                        <div
                          key={m.id}
                          className="px-5 py-3 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span className="truncate">{m.name}</span>
                              <span className="text-[11px] font-mono text-[#FFC107] inline-flex items-center gap-0.5 shrink-0">
                                <Star className="w-3 h-3 fill-[#FFC107]" /> {m.rating}
                              </span>
                            </div>
                            <div className="text-[11px] text-zinc-400 truncate">{m.assignedArea}</div>
                          </div>

                          <select
                            value={m.status}
                            onChange={(e) =>
                              handleMechanicStatusChange(m.id, e.target.value as Mechanic['status'])
                            }
                            aria-label={`Status for ${m.name}`}
                            className={`text-[11px] font-bold rounded-md px-2 py-1 border bg-[#0B0B0D] focus:outline-none cursor-pointer ${
                              m.status === 'available'
                                ? 'text-emerald-400 border-emerald-500/30'
                                : m.status === 'on_job'
                                ? 'text-amber-300 border-amber-400/30'
                                : 'text-zinc-400 border-white/10'
                            }`}
                          >
                            <option value="available">Available</option>
                            <option value="on_job">On Job</option>
                            <option value="off_duty">Off Duty</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMechanic(null);
                        setShowMechanicModal(true);
                      }}
                      className="w-full py-2 rounded-lg bg-[#0B0B0D] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#FFC107]" />
                      <span>Add Field Mechanic</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: BOOKING MANAGEMENT & NEW BOOKINGS INBOX                */}
          {/* ============================================================== */}
          {(activeTab === 'all_bookings' || activeTab === 'new_bookings') && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">
                    {activeTab === 'new_bookings' ? 'New Bookings Inbox' : 'Booking Management'}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-0.5 tabular-nums">
                    Showing {filteredBookings.length} of {bookings.length} doorstep bookings.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTestSound()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#FFC107] cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Test Chime</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulateNewBooking}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Simulate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportCSV()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter & Sort Toolbar */}
              <div className="p-3 bg-[#141417] rounded-xl border border-white/10 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 text-zinc-400 font-semibold pr-1">
                  <Filter className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Filter:</span>
                </span>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#0B0B0D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="mechanic_assigned">Mechanic Assigned</option>
                  <option value="on_the_way">On The Way</option>
                  <option value="mechanic_reached">Mechanic Reached</option>
                  <option value="service_started">Service Started</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="bg-[#0B0B0D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="all">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Unpaid">Unpaid</option>
                </select>

                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="bg-[#0B0B0D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="all">All Bengaluru Zones</option>
                  {BENGALURU_ZONES.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>

                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="bg-[#0B0B0D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="all">All Packages</option>
                  <option value="Basic">Basic General</option>
                  <option value="Standard">Standard General</option>
                  <option value="Engine Oil">Service + Oil</option>
                  <option value="Comprehensive">Comprehensive</option>
                  <option value="Royal Enfield">Royal Enfield Care</option>
                  <option value="Breakdown">Breakdown & Rescue</option>
                </select>

                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="bg-[#0B0B0D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />

                <div className="flex items-center gap-1.5 ml-auto">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-[#0B0B0D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="amount_desc">Highest Amount</option>
                    <option value="date_asc">Earliest Date</option>
                  </select>
                </div>

                {(filterStatus !== 'all' ||
                  filterPayment !== 'all' ||
                  filterLocation !== 'all' ||
                  filterService !== 'all' ||
                  filterDate ||
                  searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterPayment('all');
                      setFilterLocation('all');
                      setFilterService('all');
                      setFilterDate('');
                      setSearchQuery('');
                    }}
                    className="px-2.5 py-1 text-xs text-red-400 hover:underline font-semibold cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Bulk Selection Action Bar */}
              {selectedBookingIds.length > 0 && (
                <div className="px-4 py-2.5 rounded-xl bg-[#FFC107]/10 border border-[#FFC107]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-[#FFC107] tabular-nums">
                    {selectedBookingIds.length} bookings selected
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleBulkStatusUpdate('accepted')}
                      className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 font-bold hover:bg-blue-500 hover:text-white cursor-pointer"
                    >
                      Mark Accepted
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBulkStatusUpdate('completed')}
                      className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold hover:bg-emerald-500 hover:text-black cursor-pointer"
                    >
                      Mark Completed
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleExportCSV(bookings.filter((b) => selectedBookingIds.includes(b.id)))
                      }
                      className="px-2.5 py-1 rounded-md bg-white/10 text-white font-bold hover:bg-white/20 cursor-pointer"
                    >
                      Export Selected
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedBookingIds([])}
                      className="text-zinc-400 hover:text-white px-2 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Desktop High-Density Table */}
              <div className="bg-[#141417] rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#0B0B0D] text-zinc-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                        <th className="py-3 px-3 w-8">
                          <input
                            type="checkbox"
                            aria-label="Select all visible bookings"
                            checked={
                              filteredBookings.length > 0 &&
                              filteredBookings.every((b) => selectedBookingIds.includes(b.id))
                            }
                            onChange={(e) =>
                              setSelectedBookingIds(
                                e.target.checked ? filteredBookings.map((b) => b.id) : []
                              )
                            }
                            className="accent-[#FFC107] cursor-pointer"
                          />
                        </th>
                        <th className="py-3 px-3">Booking</th>
                        <th className="py-3 px-3">Customer & Contact</th>
                        <th className="py-3 px-3">Location</th>
                        <th className="py-3 px-3">Vehicle & Service</th>
                        <th className="py-3 px-3">Schedule</th>
                        <th className="py-3 px-3">Mechanic</th>
                        <th className="py-3 px-3 text-right">Amount</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="py-12 text-center space-y-2">
                            <p className="text-sm font-bold text-white">No bookings found</p>
                            <p className="text-xs text-zinc-400">
                              Try adjusting your filters or create a new phone/walk-in booking.
                            </p>
                            <button
                              type="button"
                              onClick={() => setShowNewBookingModal(true)}
                              className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFC107] text-black font-black text-xs cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>New Booking</span>
                            </button>
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => {
                          const isChecked = selectedBookingIds.includes(b.id);
                          return (
                            <tr
                              key={b.id}
                              className={`hover:bg-white/[0.02] transition-colors ${
                                isChecked ? 'bg-[#FFC107]/[0.04]' : ''
                              }`}
                            >
                              <td className="py-3 px-3">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    setSelectedBookingIds((prev) =>
                                      prev.includes(b.id)
                                        ? prev.filter((id) => id !== b.id)
                                        : [...prev, b.id]
                                    )
                                  }
                                  className="accent-[#FFC107] cursor-pointer"
                                />
                              </td>

                              <td className="py-3 px-3 font-mono font-bold text-[#FFC107] whitespace-nowrap tabular-nums">
                                <button
                                  type="button"
                                  onClick={() => setSelectedBooking(b)}
                                  className="hover:underline flex items-center gap-1.5 cursor-pointer"
                                >
                                  <span>{b.id}</span>
                                  {b.isNew && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" title="New" />
                                  )}
                                </button>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                <div className="font-bold text-white">{b.customerName}</div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[11px] text-zinc-400 font-mono tabular-nums">
                                    {b.phone}
                                  </span>
                                  <a
                                    href={`tel:${b.phone.replace(/[^0-9+]/g, '')}`}
                                    className="text-zinc-400 hover:text-[#FFC107]"
                                    title="Call Customer"
                                  >
                                    <Phone className="w-3 h-3" />
                                  </a>
                                  <a
                                    href={buildCustomerWhatsAppUrl(b)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300"
                                    title="WhatsApp Customer"
                                  >
                                    <MessageCircle className="w-3 h-3" />
                                  </a>
                                </div>
                              </td>

                              <td
                                className="py-3 px-3 text-zinc-300 max-w-[150px] truncate"
                                title={b.location}
                              >
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-[#FFC107] shrink-0" />
                                  <span className="truncate">{b.location}</span>
                                </span>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                <div className="font-semibold text-white">
                                  {b.brand} {b.model}
                                </div>
                                <div className="text-[11px] text-zinc-400 max-w-[200px] truncate">
                                  {b.serviceType.split('-')[0]}
                                </div>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-zinc-300 tabular-nums">
                                <div>{b.date}</div>
                                <div className="text-zinc-500">{b.time}</div>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                {b.mechanicName ? (
                                  <button
                                    type="button"
                                    onClick={() => setShowAssignModal(b)}
                                    className="inline-flex items-center gap-1 text-white hover:text-[#FFC107] font-medium cursor-pointer"
                                    title="Change mechanic"
                                  >
                                    <UserCheck className="w-3 h-3 text-purple-400" />
                                    <span>{b.mechanicName}</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setShowAssignModal(b)}
                                    className="px-2 py-1 rounded text-[10px] font-bold bg-[#FFC107]/15 text-[#FFC107] border border-[#FFC107]/35 hover:bg-[#FFC107] hover:text-black transition-colors cursor-pointer"
                                  >
                                    + Assign
                                  </button>
                                )}
                              </td>

                              <td className="py-3 px-3 text-right whitespace-nowrap font-mono tabular-nums">
                                <div className="font-bold text-white">
                                  ₹{b.amount.toLocaleString('en-IN')}
                                </div>
                                <span
                                  className={`text-[10px] font-sans font-bold ${
                                    b.paymentStatus === 'Paid'
                                      ? 'text-emerald-400'
                                      : b.paymentStatus === 'Partial'
                                      ? 'text-amber-300'
                                      : 'text-zinc-500'
                                  }`}
                                >
                                  {b.paymentStatus}
                                </span>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                <select
                                  value={b.status}
                                  onChange={(e) =>
                                    handleUpdateStatus(b.id, e.target.value as BookingStatus)
                                  }
                                  className="bg-[#0B0B0D] border border-white/10 rounded-md px-2 py-1 text-[11px] font-semibold text-white focus:outline-none focus:border-[#FFC107] cursor-pointer"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="mechanic_assigned">Assigned</option>
                                  <option value="on_the_way">On The Way</option>
                                  <option value="mechanic_reached">Reached</option>
                                  <option value="service_started">Service Started</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>

                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1">
                                  <a
                                    href={buildMechanicWhatsAppUrl(
                                      b,
                                      mechanics,
                                      businessSettings.whatsappNumber
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-[#22C55E]/15 hover:bg-[#22C55E] text-[#22C55E] hover:text-black transition-colors"
                                    title="WhatsApp mechanic send"
                                  >
                                    <Wrench className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedBooking(b)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FFC107] hover:text-black text-white transition-colors cursor-pointer"
                                    title="Inspect & Edit Booking"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleGenerateInvoice(b)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500 hover:text-black text-white transition-colors cursor-pointer"
                                    title="Invoice"
                                  >
                                    <Receipt className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleGenerateJobCard(b)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500 hover:text-black text-white transition-colors cursor-pointer"
                                    title="Job Card"
                                  >
                                    <FileCheck2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 3: MECHANIC FLEET MANAGEMENT                              */}
          {/* ============================================================== */}
          {activeTab === 'mechanics' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">
                    Mechanic Fleet Management
                  </h1>
                  <p className="text-xs text-zinc-400 mt-0.5 tabular-nums">
                    {stats.availableMechanics} available ·{' '}
                    {mechanics.filter((m) => m.status === 'on_job').length} on doorstep jobs ·{' '}
                    {mechanics.filter((m) => m.status === 'off_duty').length} off duty
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={mechanicZoneFilter}
                    onChange={(e) => setMechanicZoneFilter(e.target.value)}
                    className="bg-[#141417] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                  >
                    <option value="all">All Bengaluru Zones</option>
                    {BENGALURU_ZONES.map((z) => (
                      <option key={z} value={z}>
                        {z}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMechanic(null);
                      setShowMechanicModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black text-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Mechanic</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visibleMechanics.map((m) => {
                  const activeJob = bookings.find((b) => b.id === m.activeBookingId);
                  return (
                    <div
                      key={m.id}
                      className="bg-[#141417] p-5 rounded-xl border border-white/10 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-black text-white text-base truncate">{m.name}</h3>
                              <span className="font-mono text-[10px] text-zinc-500">{m.id}</span>
                            </div>
                            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#FFC107] shrink-0" />
                              <span className="truncate">{m.assignedArea}</span>
                            </p>
                          </div>

                          <select
                            value={m.status}
                            onChange={(e) =>
                              handleMechanicStatusChange(m.id, e.target.value as Mechanic['status'])
                            }
                            className={`text-[11px] font-bold rounded-lg px-2 py-1 border bg-[#0B0B0D] focus:outline-none cursor-pointer ${
                              m.status === 'available'
                                ? 'text-emerald-400 border-emerald-500/35'
                                : m.status === 'on_job'
                                ? 'text-amber-300 border-amber-400/35'
                                : 'text-zinc-400 border-white/10'
                            }`}
                          >
                            <option value="available">Available</option>
                            <option value="on_job">On Job</option>
                            <option value="off_duty">Off Duty</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/8 text-center text-xs">
                          <div>
                            <div className="text-[10px] text-zinc-500 uppercase">Jobs Done</div>
                            <div className="font-black text-white text-sm font-mono tabular-nums mt-0.5">
                              {m.completedJobs}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-zinc-500 uppercase">Rating</div>
                            <div className="font-black text-[#FFC107] text-sm font-mono tabular-nums mt-0.5 inline-flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-[#FFC107]" /> {m.rating}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-zinc-500 uppercase">Experience</div>
                            <div className="font-black text-white text-sm mt-0.5">{m.experience}</div>
                          </div>
                        </div>

                        <div className="text-xs text-zinc-400 leading-relaxed">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                            Specialties
                          </span>
                          <span className="text-zinc-200">{m.specialties.join(' · ')}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${m.phone.replace(/[^0-9+]/g, '')}`}
                              className="inline-flex items-center gap-1 text-zinc-300 hover:text-[#FFC107] font-mono tabular-nums"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
                              <span>{m.phone}</span>
                            </a>
                            <a
                              href={`https://wa.me/${normalizePhone(m.phone)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                              title="WhatsApp Mechanic"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMechanic(m);
                                setShowMechanicModal(true);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white cursor-pointer"
                              title="Edit mechanic"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {confirmDeleteMechId === m.id ? (
                              <button
                                type="button"
                                onClick={() => handleDeleteMechanic(m.id)}
                                className="px-2 py-1 rounded bg-red-500 text-white text-[10px] font-bold cursor-pointer"
                              >
                                Confirm
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteMechId(m.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 cursor-pointer"
                                title="Remove mechanic"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {activeJob && (
                          <button
                            type="button"
                            onClick={() => setSelectedBooking(activeJob)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#0B0B0D] hover:bg-white/5 border border-amber-400/30 text-[11px] text-amber-300 font-semibold flex items-center justify-between cursor-pointer"
                          >
                            <span>Active Job: {activeJob.id}</span>
                            <span className="truncate ml-2 text-zinc-400">{activeJob.customerName}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 4: DYNAMIC CUSTOMER DIRECTORY (CRM)                       */}
          {/* ============================================================== */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">
                    Customer Directory & Lifetime Value
                  </h1>
                  <p className="text-xs text-zinc-400 mt-0.5 tabular-nums">
                    {dynamicCustomers.length} customers synced automatically from live bookings.
                  </p>
                </div>
              </div>

              <div className="bg-[#141417] rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B0B0D] text-zinc-400 text-[10px] uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Vehicle</th>
                        <th className="py-3 px-4 text-right">Bookings</th>
                        <th className="py-3 px-4 text-right">Lifetime Spend</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {dynamicCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-mono text-[#FFC107] tabular-nums">{c.id}</td>
                          <td className="py-3 px-4 font-bold text-white">{c.name}</td>
                          <td className="py-3 px-4 text-zinc-300 font-mono tabular-nums">{c.phone}</td>
                          <td className="py-3 px-4 text-zinc-400">{c.location}</td>
                          <td className="py-3 px-4 text-zinc-200">{c.vehicle}</td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                            {c.totalBookings}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 tabular-nums">
                            ₹{c.totalSpent.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery(c.phone);
                                  setFilterStatus('all');
                                  setActiveTab('all_bookings');
                                }}
                                className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#FFC107] hover:text-black text-zinc-200 font-semibold text-[11px] transition-colors cursor-pointer"
                              >
                                History
                              </button>
                              <a
                                href={`https://wa.me/${normalizePhone(c.phone)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold text-[11px] transition-colors"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 5: SERVICES & PRICING MASTER                              */}
          {/* ============================================================== */}
          {activeTab === 'services' && (
            <AdminServicesView
              packages={servicePackages}
              onUpdatePackage={(updated) => {
                setServicePackages((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                );
                triggerToast(`Updated tariff for ${updated.name}.`);
              }}
              onBookPackage={(pkg) => {
                setPreselectedPkg(pkg);
                setShowNewBookingModal(true);
              }}
            />
          )}

          {/* ============================================================== */}
          {/* VIEW 6: INVOICES & PAYMENTS                                    */}
          {/* ============================================================== */}
          {activeTab === 'invoices' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">
                    Digital Invoices & Billing
                  </h1>
                  <p className="text-xs text-zinc-400 mt-0.5 tabular-nums">
                    {invoices.length} invoices generated · ₹
                    {invoices
                      .filter((i) => i.paymentStatus === 'Paid')
                      .reduce((s, i) => s + i.total, 0)
                      .toLocaleString('en-IN')}{' '}
                    collected
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(['all', 'Paid', 'Unpaid'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setInvoiceStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        invoiceStatusFilter === st
                          ? 'bg-[#FFC107] text-black'
                          : 'bg-[#141417] text-zinc-400 border border-white/10 hover:text-white'
                      }`}
                    >
                      {st === 'all' ? 'All' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Generate Invoice Strip for unbilled bookings */}
              {bookingsWithoutInvoice.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-300">
                    <strong className="text-[#FFC107] font-mono tabular-nums">
                      {bookingsWithoutInvoice.length}
                    </strong>{' '}
                    active bookings do not have an invoice yet.
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {bookingsWithoutInvoice.slice(0, 3).map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleGenerateInvoice(b)}
                        className="px-2.5 py-1 rounded-lg bg-[#0B0B0D] hover:bg-[#FFC107] hover:text-black border border-white/10 text-zinc-200 font-semibold transition-colors cursor-pointer"
                      >
                        + Invoice {b.id}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#141417] rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B0B0D] text-zinc-400 text-[10px] uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Invoice #</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Booking Ref</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Vehicle</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {visibleInvoices.map((inv) => (
                        <tr key={inv.invoiceNumber} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-mono font-bold text-[#FFC107] tabular-nums">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-3 px-4 font-mono text-zinc-400 tabular-nums">
                            {inv.date}
                          </td>
                          <td className="py-3 px-4 font-mono text-white tabular-nums">
                            {inv.bookingId}
                          </td>
                          <td className="py-3 px-4 font-semibold text-white">{inv.customerName}</td>
                          <td className="py-3 px-4 text-zinc-400">{inv.vehicle}</td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                            ₹{inv.total.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleToggleInvoicePaid(inv)}
                              className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                                inv.paymentStatus === 'Paid'
                                  ? 'bg-emerald-500/15 text-emerald-400'
                                  : 'bg-amber-400/15 text-amber-300'
                              }`}
                              title="Click to toggle Paid / Unpaid"
                            >
                              {inv.paymentStatus}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setShowInvoiceModal(inv)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#FFC107] hover:text-black text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Open</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 7: DIGITAL JOB CARDS                                      */}
          {/* ============================================================== */}
          {activeTab === 'job_cards' && (
            <div className="space-y-5">
              <div>
                <h1 className="text-xl font-black text-white tracking-tight">
                  Digital 12-Point Job Cards
                </h1>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Interactive mechanic inspection checklists and customer sign-off certificates.
                </p>
              </div>

              {bookingsWithoutJobCard.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-zinc-300">
                    Create a 12-point inspection card for active bookings:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {bookingsWithoutJobCard.slice(0, 3).map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleGenerateJobCard(b)}
                        className="px-2.5 py-1 rounded-lg bg-[#0B0B0D] hover:bg-[#FFC107] hover:text-black border border-white/10 text-zinc-200 font-semibold transition-colors cursor-pointer"
                      >
                        + Job Card {b.id}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobCards.map((jc) => {
                  const doneCount = jc.checklist.filter((c) => c.checked).length;
                  return (
                    <div
                      key={jc.jobCardNumber}
                      className="bg-[#141417] p-5 rounded-xl border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#FFC107] tabular-nums">
                          {jc.jobCardNumber} · {jc.bookingId}
                        </span>
                        <span className="font-mono text-zinc-400 tabular-nums">{jc.date}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{jc.customerName}</h3>
                        <p className="text-xs text-zinc-400">
                          {jc.vehicle} · Mechanic: {jc.mechanicName}
                        </p>
                      </div>
                      <p className="text-xs text-zinc-300 bg-[#0B0B0D] p-3 rounded-lg border border-white/5">
                        {jc.mechanicNotes}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-zinc-300 tabular-nums">
                            {doneCount}/{jc.checklist.length} points
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-semibold ${
                              jc.customerSignOff ? 'text-emerald-400' : 'text-amber-300'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {jc.customerSignOff ? 'Signed Off' : 'Pending Sign-Off'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowJobCardModal(jc)}
                          className="px-3 py-1.5 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black text-xs cursor-pointer"
                        >
                          Edit / Print
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 8: QR SERVICE RECORDS                                     */}
          {/* ============================================================== */}
          {activeTab === 'qr_records' && (
            <AdminQRRecordsView
              bookings={bookings}
              onViewBooking={(b) => setSelectedBooking(b)}
            />
          )}

          {/* ============================================================== */}
          {/* VIEW 9: LIVE REPORTS & ANALYTICS                               */}
          {/* ============================================================== */}
          {activeTab === 'reports' && (
            <AdminReportsView
              bookings={bookings}
              mechanics={mechanics}
              invoices={invoices}
              onExportCSV={() => handleExportCSV()}
              onExportJSON={handleExportJSONBackup}
            />
          )}

          {/* ============================================================== */}
          {/* VIEW 10: LIVE BOOKING ALERTS STREAM                            */}
          {/* ============================================================== */}
          {activeTab === 'notifications' && (
            <AdminLiveAlertsView
              alerts={alerts}
              unreadCount={unreadAlertsCount}
              bookings={bookings}
              mechanics={mechanics}
              fallbackWhatsApp={businessSettings.whatsappNumber}
              desktopPermission={desktopPermission}
              soundEnabled={soundConfig.enabled}
              filterType={alertFilterType}
              searchQuery={alertSearchQuery}
              onChangeFilterType={setAlertFilterType}
              onChangeSearchQuery={setAlertSearchQuery}
              onTestSound={() => handleTestSound()}
              onSimulateBooking={handleSimulateNewBooking}
              onMarkAllRead={() => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))}
              onClearAll={() => setAlerts([])}
              onRequestDesktopPermission={async () => {
                const res = await soundService.requestNotificationPermission();
                setDesktopPermission(res);
              }}
              onToggleAlertRead={(id) =>
                setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a)))
              }
              onDeleteAlert={(id) => setAlerts((prev) => prev.filter((a) => a.id !== id))}
              onOpenBooking={(b) => setSelectedBooking(b)}
              onOpenAssign={(b) => setShowAssignModal(b)}
            />
          )}

          {/* ============================================================== */}
          {/* VIEW 11: SYSTEM SETTINGS                                       */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-xl font-black text-white tracking-tight">System Settings</h1>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Configure audio dispatch alerts, business contact details, and data exports.
                </p>
              </div>

              {/* Audio Notification Settings */}
              <div className="bg-[#141417] p-6 rounded-xl border border-white/10 space-y-5 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Audio Alerts & New Booking Sound
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Audible chime synthesized in-browser whenever a customer submits a new booking.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpdateSoundConfig({ enabled: !soundConfig.enabled })}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      soundConfig.enabled ? 'bg-[#FFC107]' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                        soundConfig.enabled ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'doorstep', name: 'Doorstep Bell', desc: 'Rich two-tone arrival chime' },
                    { id: 'two_tone', name: 'Two-Tone Ping', desc: 'High-clarity electronic ping' },
                    { id: 'arpeggio', name: 'Harmonic Arpeggio', desc: 'Ascending 4-note melody' },
                    { id: 'dispatch', name: 'Express Dispatch', desc: 'Crisp double-pulse alert' }
                  ].map((tone) => (
                    <div
                      key={tone.id}
                      onClick={() => {
                        handleUpdateSoundConfig({ tone: tone.id as AlertSoundTone });
                        handleTestSound(tone.id as AlertSoundTone);
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        soundConfig.tone === tone.id
                          ? 'bg-[#FFC107]/12 border-[#FFC107] text-white'
                          : 'bg-[#0B0B0D] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-white">{tone.name}</div>
                        <div className="text-[10px] text-zinc-400">{tone.desc}</div>
                      </div>
                      <Play className="w-3.5 h-3.5 text-[#FFC107] shrink-0" />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1.5">
                    <span className="text-white">Volume</span>
                    <span className="font-mono text-[#FFC107] tabular-nums">
                      {Math.round(soundConfig.volume * 100)}%
                    </span>
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

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleTestSound()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black text-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Play Test Chime</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulateNewBooking}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B0B0D] hover:bg-white/10 border border-white/10 text-white font-semibold text-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Simulate Incoming Booking</span>
                  </button>
                </div>
              </div>

              {/* Editable Business Configuration */}
              <form
                onSubmit={handleSaveBusinessSettings}
                className="bg-[#141417] p-6 rounded-xl border border-white/10 space-y-4 text-xs"
              >
                <h3 className="text-sm font-black text-white pb-2 border-b border-white/10">
                  Business & Invoice Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Helpline Number</label>
                    <input
                      type="text"
                      value={businessSettings.helpline}
                      onChange={(e) =>
                        setBusinessSettings({ ...businessSettings, helpline: e.target.value })
                      }
                      className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FFC107]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">
                      Default Dispatch WhatsApp
                    </label>
                    <input
                      type="text"
                      value={businessSettings.whatsappNumber}
                      onChange={(e) =>
                        setBusinessSettings({ ...businessSettings, whatsappNumber: e.target.value })
                      }
                      className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FFC107]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={businessSettings.workingHours}
                      onChange={(e) =>
                        setBusinessSettings({ ...businessSettings, workingHours: e.target.value })
                      }
                      className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Invoice GSTIN</label>
                    <input
                      type="text"
                      value={businessSettings.gstin}
                      onChange={(e) =>
                        setBusinessSettings({ ...businessSettings, gstin: e.target.value })
                      }
                      className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FFC107]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Coverage Area</label>
                  <input
                    type="text"
                    value={businessSettings.coverageArea}
                    onChange={(e) =>
                      setBusinessSettings({ ...businessSettings, coverageArea: e.target.value })
                    }
                    className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleExportJSONBackup}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B0B0D] hover:bg-white/10 border border-white/10 text-zinc-300 font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Download Full Backup (.json)</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Configuration</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ================================================================== */}
      {/* MODALS                                                             */}
      {/* ================================================================== */}
      <NewBookingModal
        isOpen={showNewBookingModal}
        onClose={() => {
          setShowNewBookingModal(false);
          setPreselectedPkg(null);
        }}
        onCreateBooking={handleCreateManualBooking}
        mechanics={mechanics}
        packages={servicePackages}
        preselectedPackage={preselectedPkg}
      />

      <BookingDetailModal
        booking={selectedBooking}
        mechanics={mechanics}
        fallbackWhatsApp={businessSettings.whatsappNumber}
        onClose={() => setSelectedBooking(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateBooking={handleUpdateBooking}
        onDeleteBooking={handleDeleteBooking}
        onOpenAssign={(b) => setShowAssignModal(b)}
        onGenerateInvoice={handleGenerateInvoice}
        onGenerateJobCard={handleGenerateJobCard}
      />

      <AssignMechanicModal
        booking={showAssignModal}
        mechanics={mechanics}
        fallbackWhatsApp={businessSettings.whatsappNumber}
        onClose={() => setShowAssignModal(null)}
        onAssign={handleAssignMechanic}
      />

      <MechanicFormModal
        isOpen={showMechanicModal}
        editingMechanic={editingMechanic}
        nextMechanicNumber={100 + mechanics.length + 1}
        onClose={() => {
          setShowMechanicModal(false);
          setEditingMechanic(null);
        }}
        onSave={handleSaveMechanic}
      />

      <InvoiceModal
        invoice={showInvoiceModal}
        businessSettings={businessSettings}
        onClose={() => setShowInvoiceModal(null)}
        onTogglePaid={handleToggleInvoicePaid}
      />

      <JobCardModal
        jobCard={showJobCardModal}
        onClose={() => setShowJobCardModal(null)}
        onSaveJobCard={handleSaveJobCard}
      />
    </div>
  );
};
