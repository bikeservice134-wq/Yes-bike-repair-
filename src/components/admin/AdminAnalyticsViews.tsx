import React, { useMemo, useState } from 'react';
import {
  IndianRupee,
  Download,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Star,
  Plus,
  Edit3,
  Check,
  QrCode,
  Printer,
  Search,
  CalendarCheck,
  Clock
} from 'lucide-react';
import { Booking, Invoice, Mechanic } from '../../types/admin';
import { ServicePackageItem } from './adminConstants';

/* -------------------------------------------------------------------------- */
/* 1. LIVE DATA-DRIVEN REPORTS & ANALYTICS VIEW                               */
/* -------------------------------------------------------------------------- */
interface ReportsViewProps {
  bookings: Booking[];
  mechanics: Mechanic[];
  invoices: Invoice[];
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export const AdminReportsView: React.FC<ReportsViewProps> = ({
  bookings,
  mechanics,
  invoices,
  onExportCSV,
  onExportJSON
}) => {
  const analytics = useMemo(() => {
    const activeBookings = bookings.filter((b) => b.status !== 'cancelled');
    const completedBookings = bookings.filter((b) => b.status === 'completed');
    const totalRevenue = activeBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const collectedRevenue = activeBookings.reduce((sum, b) => {
      if (b.paymentStatus === 'Paid') return sum + (b.amount || 0);
      return sum + (b.advancePaid || 0);
    }, 0);
    const pendingDues = Math.max(0, totalRevenue - collectedRevenue);
    const avgTicket = activeBookings.length > 0 ? Math.round(totalRevenue / activeBookings.length) : 0;
    const completionRate =
      bookings.length > 0 ? Math.round((completedBookings.length / bookings.length) * 100) : 0;

    // Zone breakdown
    const zoneMap = new Map<string, { jobs: number; revenue: number }>();
    activeBookings.forEach((b) => {
      const zoneName = (b.location || 'Bengaluru').split(',')[0].trim();
      const prev = zoneMap.get(zoneName) || { jobs: 0, revenue: 0 };
      zoneMap.set(zoneName, { jobs: prev.jobs + 1, revenue: prev.revenue + (b.amount || 0) });
    });
    const zones = Array.from(zoneMap.entries())
      .map(([zone, data]) => ({
        zone,
        jobs: data.jobs,
        revenue: data.revenue,
        pct: activeBookings.length > 0 ? Math.round((data.jobs / activeBookings.length) * 100) : 0
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Service breakdown
    const svcMap = new Map<string, { count: number; revenue: number }>();
    activeBookings.forEach((b) => {
      const svcName = b.serviceType.split('-')[0].trim();
      const prev = svcMap.get(svcName) || { count: 0, revenue: 0 };
      svcMap.set(svcName, { count: prev.count + 1, revenue: prev.revenue + (b.amount || 0) });
    });
    const services = Array.from(svcMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue);

    // Payment method split
    const payMap = new Map<string, number>();
    activeBookings.forEach((b) => {
      const key = b.paymentMethod || 'Pending';
      payMap.set(key, (payMap.get(key) || 0) + (b.amount || 0));
    });
    const payments = Array.from(payMap.entries()).map(([method, amount]) => ({
      method,
      amount,
      pct: totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0
    }));

    return {
      totalRevenue,
      collectedRevenue,
      pendingDues,
      avgTicket,
      completionRate,
      activeCount: activeBookings.length,
      completedCount: completedBookings.length,
      zones,
      services,
      payments
    };
  }, [bookings]);

  const maxSvcRev = Math.max(1, ...analytics.services.map((s) => s.revenue));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Reports & Revenue Analytics</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Live metrics computed directly from {bookings.length} recorded bookings and {invoices.length} invoices.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>JSON Backup</span>
          </button>
          <button
            type="button"
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black text-xs font-black cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#141417] p-4 sm:p-5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Booked Revenue</span>
            <IndianRupee className="w-4 h-4 text-[#FFC107]" />
          </div>
          <div className="text-2xl font-black text-white mt-2 font-mono tabular-nums">
            ₹{analytics.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1 tabular-nums">
            {analytics.activeCount} active & completed jobs
          </div>
        </div>

        <div className="bg-[#141417] p-4 sm:p-5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Collected Revenue</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2 font-mono tabular-nums">
            ₹{analytics.collectedRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-300 mt-1 font-mono tabular-nums">
            ₹{analytics.pendingDues.toLocaleString('en-IN')} pending dues
          </div>
        </div>

        <div className="bg-[#141417] p-4 sm:p-5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Average Ticket</span>
            <TrendingUp className="w-4 h-4 text-[#FFC107]" />
          </div>
          <div className="text-2xl font-black text-[#FFC107] mt-2 font-mono tabular-nums">
            ₹{analytics.avgTicket.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Per doorstep booking</div>
        </div>

        <div className="bg-[#141417] p-4 sm:p-5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2 font-mono tabular-nums">
            {analytics.completionRate}%
          </div>
          <div className="text-[11px] text-zinc-400 mt-1 tabular-nums">
            {analytics.completedCount} of {bookings.length} closed
          </div>
        </div>
      </div>

      {/* Charts & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Zone Performance */}
        <div className="bg-[#141417] p-5 rounded-xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFC107]" />
              <span>Bengaluru Zone Performance</span>
            </h3>
            <span className="text-[11px] text-zinc-500">By live bookings</span>
          </div>
          <div className="space-y-3 text-xs">
            {analytics.zones.map((z) => (
              <div key={z.zone} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{z.zone}</span>
                  <span className="font-mono tabular-nums text-zinc-300">
                    {z.jobs} {z.jobs === 1 ? 'job' : 'jobs'} · ₹{z.revenue.toLocaleString('en-IN')} ({z.pct}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-[#FFC107] rounded-full transition-all"
                    style={{ width: `${Math.max(4, z.pct)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Package Revenue */}
        <div className="bg-[#141417] p-5 rounded-xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Revenue by Service Package</h3>
            <span className="text-[11px] text-zinc-500">Non-cancelled</span>
          </div>
          <div className="space-y-3 text-xs">
            {analytics.services.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white truncate">{s.name}</span>
                  <span className="font-mono tabular-nums text-zinc-300 shrink-0">
                    {s.count}× · ₹{s.revenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all"
                    style={{ width: `${Math.max(6, Math.round((s.revenue / maxSvcRev) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mechanic Leaderboard & Payment Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-[#141417] p-5 rounded-xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-sm">Mechanic Fleet Leaderboard</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 text-[10px] uppercase">
                  <th className="py-2 pr-3">Technician</th>
                  <th className="py-2 px-3">Hub Zone</th>
                  <th className="py-2 px-3 text-right">Jobs Done</th>
                  <th className="py-2 px-3 text-right">Rating</th>
                  <th className="py-2 pl-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...mechanics]
                  .sort((a, b) => b.completedJobs - a.completedJobs)
                  .map((m) => (
                    <tr key={m.id}>
                      <td className="py-2.5 pr-3 font-bold text-white">{m.name}</td>
                      <td className="py-2.5 px-3 text-zinc-400">{m.assignedArea}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-white font-bold">
                        {m.completedJobs}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#FFC107] font-bold">
                        <span className="inline-flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-[#FFC107]" /> {m.rating}
                        </span>
                      </td>
                      <td className="py-2.5 pl-3 text-right text-[11px]">
                        <span
                          className={
                            m.status === 'available'
                              ? 'text-emerald-400 font-semibold'
                              : m.status === 'on_job'
                              ? 'text-amber-300 font-semibold'
                              : 'text-zinc-500'
                          }
                        >
                          {m.status === 'available'
                            ? 'Available'
                            : m.status === 'on_job'
                            ? 'On Job'
                            : 'Off Duty'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#141417] p-5 rounded-xl border border-white/10 space-y-4">
          <h3 className="font-bold text-white text-sm">Payment Mode Breakdown</h3>
          <div className="space-y-3 text-xs">
            {analytics.payments.map((p) => (
              <div key={p.method} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-300 font-medium">{p.method}</span>
                  <span className="font-mono tabular-nums text-white font-bold">
                    ₹{p.amount.toLocaleString('en-IN')} ({p.pct}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: `${Math.max(4, p.pct)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. EDITABLE SERVICES & TARIFF MASTER VIEW                                  */
/* -------------------------------------------------------------------------- */
interface ServicesViewProps {
  packages: ServicePackageItem[];
  onUpdatePackage: (updated: ServicePackageItem) => void;
  onBookPackage: (pkg: ServicePackageItem) => void;
}

export const AdminServicesView: React.FC<ServicesViewProps> = ({
  packages,
  onUpdatePackage,
  onBookPackage
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDuration, setEditDuration] = useState<string>('');

  const startEdit = (pkg: ServicePackageItem) => {
    setEditingId(pkg.id);
    setEditPrice(pkg.price);
    setEditDuration(pkg.duration);
  };

  const saveEdit = (pkg: ServicePackageItem) => {
    const nextPrice = Math.max(0, Number(editPrice) || pkg.price);
    const isStarting = pkg.priceLabel?.toLowerCase().startsWith('starting');
    onUpdatePackage({
      ...pkg,
      price: nextPrice,
      priceLabel: isStarting
        ? `Starting at ₹${nextPrice.toLocaleString('en-IN')}`
        : `₹${nextPrice.toLocaleString('en-IN')}`,
      duration: editDuration.trim() || pkg.duration
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Services & Tariff Master</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Manage doorstep service packages, update live tariff rates, or launch a manual booking from any package.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => {
          const isEditing = editingId === pkg.id;
          return (
            <div
              key={pkg.id}
              className="bg-[#141417] p-5 rounded-xl border border-white/10 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {pkg.category}
                      {pkg.popular ? ' · Popular' : ''}
                    </div>
                    <h3 className="font-black text-white text-base mt-0.5">{pkg.name}</h3>
                  </div>
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={() => saveEdit(pkg)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFC107] text-black text-xs font-black cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(pkg)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
                      title="Edit price & duration"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full bg-[#0B0B0D] border border-[#FFC107]/50 rounded-lg px-2.5 py-1.5 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">Duration</label>
                      <input
                        type="text"
                        value={editDuration}
                        onChange={(e) => setEditDuration(e.target.value)}
                        className="w-full bg-[#0B0B0D] border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-2xl font-black text-[#FFC107] font-mono tabular-nums">
                      {pkg.priceLabel || `₹${pkg.price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="text-xs text-zinc-400 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {pkg.duration}
                    </span>
                  </div>
                )}

                <ul className="space-y-1.5 text-xs text-zinc-300 pt-1">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">All Bengaluru hubs</span>
                <button
                  type="button"
                  onClick={() => onBookPackage(pkg)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#FFC107] text-white hover:text-black text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book Package</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. INTERACTIVE QR SERVICE TAG & VEHICLE HISTORY LOOKUP                     */
/* -------------------------------------------------------------------------- */
interface QRRecordsViewProps {
  bookings: Booking[];
  onViewBooking: (booking: Booking) => void;
}

export const AdminQRRecordsView: React.FC<QRRecordsViewProps> = ({ bookings, onViewBooking }) => {
  const [lookup, setLookup] = useState('');
  const [selectedId, setSelectedId] = useState<string>(bookings[0]?.id || '');

  const matchingBookings = useMemo(() => {
    if (!lookup.trim()) return bookings;
    const q = lookup.toLowerCase();
    return bookings.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        (b.registrationNumber || '').toLowerCase().includes(q) ||
        `${b.brand} ${b.model}`.toLowerCase().includes(q)
    );
  }, [bookings, lookup]);

  const activeBooking = bookings.find((b) => b.id === selectedId) || matchingBookings[0] || null;

  const getNextDueDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return 'In 90 Days';
    d.setDate(d.getDate() + 90);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Service Records & Smart QR Tag</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Search any vehicle registration or booking ID to generate a printable doorstep service sticker and next-due reminder.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Lookup List */}
        <div className="lg:col-span-2 bg-[#141417] p-4 rounded-xl border border-white/10 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reg. number, ID, or bike..."
              value={lookup}
              onChange={(e) => setLookup(e.target.value)}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107]"
            />
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {matchingBookings.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedId(b.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                  activeBooking?.id === b.id
                    ? 'bg-[#FFC107]/10 border-[#FFC107]/50'
                    : 'bg-[#0B0B0D] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#FFC107]">{b.id}</span>
                  <span className="font-mono text-[11px] text-zinc-400">
                    {b.registrationNumber || 'No Reg'}
                  </span>
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {b.brand} {b.model} · {b.customerName}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{b.date} · {b.location}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Printable Tag Preview */}
        <div className="lg:col-span-3 bg-[#141417] p-6 rounded-xl border border-white/10 flex flex-col justify-between gap-5">
          {activeBooking ? (
            <>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-44 h-44 bg-white p-3.5 rounded-2xl flex flex-col items-center justify-center shrink-0">
                  <QrCode className="w-28 h-28 text-zinc-950" />
                  <span className="font-mono text-[10px] font-black text-zinc-950 mt-1">
                    YB-{activeBooking.id}
                  </span>
                </div>

                <div className="flex-1 space-y-2.5 text-xs w-full">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFC107]">
                    Smart Vehicle Service Tag
                  </div>
                  <h3 className="text-lg font-black text-white">
                    {activeBooking.brand} {activeBooking.model}
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Reg. Number</span>
                      <span className="font-mono font-bold text-white">
                        {activeBooking.registrationNumber || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Customer</span>
                      <span className="font-semibold text-white">{activeBooking.customerName}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Last Service</span>
                      <span className="font-mono tabular-nums text-zinc-300">{activeBooking.date}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Next Due (+90d)</span>
                      <span className="font-mono tabular-nums font-bold text-emerald-400">
                        {getNextDueDate(activeBooking.date)}
                      </span>
                    </div>
                  </div>
                  <p className="text-zinc-400 pt-1">
                    Service: <strong className="text-zinc-200">{activeBooking.serviceType}</strong> · Mechanic:{' '}
                    <strong className="text-zinc-200">{activeBooking.mechanicName || 'Assigned'}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-400">
                  30-Day Doorstep Guarantee · Weather-resistant under-seat QR tag
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onViewBooking(activeBooking)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white cursor-pointer"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Open Booking</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black text-xs font-black cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print QR Sticker</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-zinc-500">
              No vehicle records found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
