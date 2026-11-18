import React from 'react';
import {
  Volume2,
  Sparkles,
  CheckCheck,
  Trash2,
  BellRing,
  Radio,
  Bell,
  Search,
  Eye,
  UserCheck,
  MessageCircle,
  Phone,
  Wrench,
  CheckCircle2,
  X
} from 'lucide-react';
import { Booking, Mechanic } from '../../types/admin';
import { buildCustomerWhatsAppUrl, buildMechanicWhatsAppUrl } from './adminConstants';

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

interface AdminLiveAlertsViewProps {
  alerts: LiveAlert[];
  unreadCount: number;
  bookings: Booking[];
  mechanics: Mechanic[];
  fallbackWhatsApp: string;
  desktopPermission: string;
  soundEnabled: boolean;
  filterType: string;
  searchQuery: string;
  onChangeFilterType: (val: string) => void;
  onChangeSearchQuery: (val: string) => void;
  onTestSound: () => void;
  onSimulateBooking: () => void;
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onRequestDesktopPermission: () => void;
  onToggleAlertRead: (id: string) => void;
  onDeleteAlert: (id: string) => void;
  onOpenBooking: (booking: Booking) => void;
  onOpenAssign: (booking: Booking) => void;
}

export const AdminLiveAlertsView: React.FC<AdminLiveAlertsViewProps> = ({
  alerts,
  unreadCount,
  bookings,
  mechanics,
  fallbackWhatsApp,
  desktopPermission,
  soundEnabled,
  filterType,
  searchQuery,
  onChangeFilterType,
  onChangeSearchQuery,
  onTestSound,
  onSimulateBooking,
  onMarkAllRead,
  onClearAll,
  onRequestDesktopPermission,
  onToggleAlertRead,
  onDeleteAlert,
  onOpenBooking,
  onOpenAssign
}) => {
  const filteredAlerts = alerts.filter((a) => {
    if (filterType === 'unread' && a.read) return false;
    if (filterType !== 'all' && filterType !== 'unread' && a.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.customerName.toLowerCase().includes(q) ||
        a.message.toLowerCase().includes(q) ||
        (a.bookingId || '').toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.vehicle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <h1 className="text-xl font-black text-white tracking-tight">
              Live Booking Alerts & Dispatch Stream
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time incoming customer bookings with instant dispatch, mechanic WhatsApp forwarding, and chime monitoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onTestSound}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-[#FFC107]/15 border border-[#FFC107]/35 text-xs font-bold text-[#FFC107] transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Test Sound</span>
          </button>

          <button
            type="button"
            onClick={onSimulateBooking}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black text-xs font-black transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Live Booking</span>
          </button>

          <button
            type="button"
            onClick={onMarkAllRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer disabled:opacity-40"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mark All Read</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            disabled={alerts.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-red-500/15 border border-white/10 hover:border-red-500/40 text-xs font-semibold text-zinc-400 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          {desktopPermission !== 'granted' && (
            <button
              type="button"
              onClick={onRequestDesktopPermission}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141417] hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#FFC107] transition-colors cursor-pointer"
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>Enable Browser Alerts</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#141417] p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Total Logged</span>
            <Radio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1.5 font-mono tabular-nums">
            {alerts.length}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Firestore listener active</div>
        </div>

        <div className="bg-[#141417] p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Unread Alerts</span>
            <Bell className="w-4 h-4 text-red-400" />
          </div>
          <div
            className={`text-2xl font-black mt-1.5 font-mono tabular-nums ${
              unreadCount > 0 ? 'text-red-400' : 'text-white'
            }`}
          >
            {unreadCount}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">
            {unreadCount > 0 ? 'Pending dispatcher review' : 'All caught up'}
          </div>
        </div>

        <div className="bg-[#141417] p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>New Bookings</span>
            <Sparkles className="w-4 h-4 text-[#FFC107]" />
          </div>
          <div className="text-2xl font-black text-[#FFC107] mt-1.5 font-mono tabular-nums">
            {alerts.filter((a) => a.type === 'new_booking').length}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Incoming doorstep jobs</div>
        </div>

        <div className="bg-[#141417] p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Audio Monitor</span>
            <Volume2 className={`w-4 h-4 ${soundEnabled ? 'text-[#FFC107]' : 'text-zinc-500'}`} />
          </div>
          <div className="text-2xl font-black text-white mt-1.5">
            {soundEnabled ? 'Active' : 'Muted'}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Web Audio chime engine</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#141417] p-3 rounded-xl border border-white/10">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: `All (${alerts.length})` },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'new_booking', label: 'New Bookings' },
            { id: 'mechanic_assigned', label: 'Assigned' },
            { id: 'service_completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#FFC107] text-black'
                  : 'text-zinc-400 hover:text-white bg-[#0B0B0D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter alerts..."
            value={searchQuery}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onChangeSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-[#141417] rounded-xl border border-white/10 py-14 text-center space-y-2">
            <BellRing className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-sm font-bold text-white">No alerts match your current filter</p>
            <p className="text-xs text-zinc-400">
              Incoming customer bookings will trigger an instant chime and appear here automatically.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const relatedBooking = bookings.find((b) => b.id === alert.bookingId);
            const fallbackBooking = (relatedBooking || {
              id: alert.bookingId || 'ID-BOOKING',
              customerName: alert.customerName,
              phone: alert.phone,
              location: alert.location,
              vehicleType: 'Bike',
              brand: alert.vehicle.split(' ')[0] || 'Bike',
              model: alert.vehicle.split(' ').slice(1).join(' ') || '',
              serviceType: alert.service,
              date: new Date().toISOString().split('T')[0],
              time: alert.time,
              amount: alert.amount,
              advancePaid: 0,
              remainingBalance: alert.amount,
              paymentMethod: 'Pending',
              paymentStatus: 'Unpaid',
              status: 'pending',
              createdAt: new Date().toISOString()
            }) as Booking;

            return (
              <div
                key={alert.id}
                className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                  alert.read
                    ? 'bg-[#141417] border-white/10'
                    : 'bg-[#141417] border-[#FFC107]/45'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider ${
                          alert.type === 'new_booking'
                            ? 'bg-[#FFC107] text-black'
                            : alert.type === 'mechanic_assigned'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {alert.title}
                      </span>
                      {alert.bookingId && (
                        <span className="font-mono font-bold text-[#FFC107] tabular-nums">
                          {alert.bookingId}
                        </span>
                      )}
                      {!alert.read && (
                        <span className="text-[10px] font-bold text-red-400">· Unread</span>
                      )}
                      <span className="text-[11px] text-zinc-500">· {alert.time}</span>
                    </div>

                    <p className="text-sm font-bold text-white">{alert.message}</p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                      <span>{alert.vehicle}</span>
                      <span>·</span>
                      <span>{alert.location}</span>
                      <span>·</span>
                      <span className="font-mono text-zinc-300 tabular-nums">{alert.phone}</span>
                      {alert.amount > 0 && (
                        <>
                          <span>·</span>
                          <span className="font-mono font-bold text-[#FFC107] tabular-nums">
                            ₹{alert.amount.toLocaleString('en-IN')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {relatedBooking && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            onOpenBooking(relatedBooking);
                            if (!alert.read) onToggleAlertRead(alert.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black text-xs font-black cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onOpenAssign(relatedBooking);
                            if (!alert.read) onToggleAlertRead(alert.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0B0D] hover:bg-white/10 border border-white/10 text-xs font-bold text-white cursor-pointer"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                          <span>Assign</span>
                        </button>
                      </>
                    )}

                    <a
                      href={buildMechanicWhatsAppUrl(fallbackBooking, mechanics, fallbackWhatsApp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#22C55E]/15 hover:bg-[#22C55E] text-[#22C55E] hover:text-black border border-[#22C55E]/30 text-xs font-bold transition-colors"
                      title="WhatsApp mechanic send"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>WhatsApp mechanic send</span>
                    </a>

                    <a
                      href={buildCustomerWhatsAppUrl(fallbackBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#0B0B0D] hover:bg-emerald-500 text-emerald-400 hover:text-black border border-white/10 transition-colors"
                      title="WhatsApp Customer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`tel:${alert.phone.replace(/[^0-9+]/g, '')}`}
                      className="p-2 rounded-lg bg-[#0B0B0D] hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onToggleAlertRead(alert.id)}
                      className="p-2 rounded-lg bg-[#0B0B0D] hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 cursor-pointer"
                      title={alert.read ? 'Mark unread' : 'Mark read'}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteAlert(alert.id)}
                      className="p-2 rounded-lg bg-[#0B0B0D] hover:bg-red-500/15 text-zinc-500 hover:text-red-400 border border-white/10 cursor-pointer"
                      title="Delete alert"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
