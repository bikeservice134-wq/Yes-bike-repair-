import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  Wrench,
  MapPin,
  Receipt,
  FileCheck2,
  UserCheck,
  CalendarCheck,
  IndianRupee,
  Edit3,
  Check,
  Trash2,
  Clock
} from 'lucide-react';
import { Booking, BookingStatus, Mechanic } from '../../types/admin';
import {
  BOOKING_STATUS_META,
  ServicePackageItem,
  buildCustomerWhatsAppUrl,
  buildMechanicWhatsAppUrl
} from './adminConstants';

interface BookingDetailModalProps {
  booking: Booking | null;
  mechanics: Mechanic[];
  packages: ServicePackageItem[];
  fallbackWhatsApp: string;
  onClose: () => void;
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus, note?: string) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>, auditNote?: string) => void;
  onDeleteBooking: (bookingId: string) => void;
  onOpenAssign: (booking: Booking) => void;
  onGenerateInvoice: (booking: Booking) => void;
  onGenerateJobCard: (booking: Booking) => void;
}

const WORKFLOW_STAGES: BookingStatus[] = [
  'pending',
  'accepted',
  'mechanic_assigned',
  'on_the_way',
  'mechanic_reached',
  'service_started',
  'completed'
];

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  mechanics,
  packages,
  fallbackWhatsApp,
  onClose,
  onUpdateStatus,
  onUpdateBooking,
  onDeleteBooking,
  onOpenAssign,
  onGenerateInvoice,
  onGenerateJobCard
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [customNote, setCustomNote] = useState('');

  // Editable fields
  const [editServiceType, setEditServiceType] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editAmount, setEditAmount] = useState(0);
  const [editAdvance, setEditAdvance] = useState(0);
  const [editMethod, setEditMethod] = useState<Booking['paymentMethod']>('UPI / GPay');
  const [editComplaint, setEditComplaint] = useState('');
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => {
    if (!booking) return;
    setEditServiceType(booking.serviceType);
    setEditDate(booking.date);
    setEditTime(booking.time);
    setEditAmount(booking.amount);
    setEditAdvance(booking.advancePaid);
    setEditMethod(booking.paymentMethod);
    setEditComplaint(booking.customerComplaint || '');
    setEditNotes(booking.customerNotes || '');
    setIsEditing(false);
    setConfirmDelete(false);
    setCustomNote('');
  }, [booking?.id]);

  if (!booking) return null;

  const statusMeta = BOOKING_STATUS_META[booking.status];
  const customerWaUrl = buildCustomerWhatsAppUrl(booking);
  const mechanicWaUrl = buildMechanicWhatsAppUrl(booking, mechanics, fallbackWhatsApp);

  const formatPackageLabel = (pkg: ServicePackageItem) =>
    `${pkg.name} (${pkg.priceLabel || `₹${pkg.price.toLocaleString('en-IN')}`})`;

  const handleSaveEdits = () => {
    const safeAmount = Math.max(0, Number(editAmount) || 0);
    const safeAdvance = Math.min(safeAmount, Math.max(0, Number(editAdvance) || 0));
    const remaining = Math.max(0, safeAmount - safeAdvance);
    const paymentStatus: Booking['paymentStatus'] =
      remaining === 0 && safeAmount > 0 ? 'Paid' : safeAdvance > 0 ? 'Partial' : 'Unpaid';

    onUpdateBooking(
      booking.id,
      {
        serviceType: editServiceType || booking.serviceType,
        date: editDate,
        time: editTime,
        amount: safeAmount,
        advancePaid: safeAdvance,
        remainingBalance: remaining,
        paymentMethod: editMethod,
        paymentStatus,
        customerComplaint: editComplaint.trim() || undefined,
        customerNotes: editNotes.trim() || undefined
      },
      `Updated package/schedule/billing (₹${safeAmount}, ${paymentStatus})`
    );
    setIsEditing(false);
  };

  const handleQuickMarkPaid = (method: Booking['paymentMethod']) => {
    onUpdateBooking(
      booking.id,
      {
        advancePaid: booking.amount,
        remainingBalance: 0,
        paymentMethod: method,
        paymentStatus: 'Paid'
      },
      `Full payment ₹${booking.amount} collected via ${method}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#141417] border border-white/15 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl text-white">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-[#141417] border-b border-white/10 px-5 sm:px-6 py-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-lg sm:text-xl font-black text-[#FFC107] font-mono tabular-nums">
                {booking.id}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border ${statusMeta.badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dotClass}`} />
                {statusMeta.label}
              </span>
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                  booking.paymentStatus === 'Paid'
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : booking.paymentStatus === 'Partial'
                    ? 'bg-amber-400/15 text-amber-300'
                    : 'bg-white/10 text-zinc-300'
                }`}
              >
                {booking.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono tabular-nums">
              {booking.date} · {booking.time} · {booking.location}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isEditing
                  ? 'bg-[#FFC107] text-black border-[#FFC107]'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEditing ? 'Editing' : 'Edit'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking details"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Quick Dispatch Actions Bar */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-white/10">
            <a
              href={`tel:${booking.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B0B0D] hover:bg-white/10 border border-white/10 text-xs text-white font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Call Customer</span>
            </a>

            <a
              href={customerWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 hover:text-black border border-emerald-500/30 text-xs text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Customer</span>
            </a>

            <a
              href={mechanicWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#22C55E]/15 hover:bg-[#22C55E] hover:text-black border border-[#22C55E]/35 text-xs text-[#22C55E] font-bold transition-colors"
              title="WhatsApp mechanic send"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>WhatsApp mechanic send</span>
            </a>

            {booking.googleMapsUrl && (
              <a
                href={booking.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/15 hover:bg-blue-500 hover:text-white border border-blue-500/30 text-xs text-blue-300 font-semibold transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Maps</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => onGenerateInvoice(booking)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-400/15 hover:bg-[#FFC107] hover:text-black border border-amber-400/30 text-xs text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Invoice</span>
            </button>

            <button
              type="button"
              onClick={() => onGenerateJobCard(booking)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-500/15 hover:bg-purple-500 hover:text-white border border-purple-500/30 text-xs text-purple-300 font-semibold transition-colors cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Job Card</span>
            </button>
          </div>

          {/* Inline Edit Mode */}
          {isEditing ? (
            <div className="p-4 rounded-xl bg-[#0B0B0D] border border-[#FFC107]/40 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#FFC107] uppercase tracking-wider text-[11px]">
                  Edit Schedule, Billing & Notes
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Service Package</label>
                <select
                  value={editServiceType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditServiceType(val);
                    const matched = packages.find((p) => formatPackageLabel(p) === val);
                    if (matched) setEditAmount(matched.price);
                  }}
                  className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
                  {!packages.some((p) => formatPackageLabel(p) === editServiceType) && editServiceType && (
                    <option value={editServiceType}>{editServiceType}</option>
                  )}
                  {packages.map((p) => {
                    const label = formatPackageLabel(p);
                    return (
                      <option key={p.id} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Payment Method</label>
                  <select
                    value={editMethod}
                    onChange={(e) => setEditMethod(e.target.value as Booking['paymentMethod'])}
                    className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  >
                    <option value="UPI / GPay">UPI / GPay</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Total Amount (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={editAmount}
                    onChange={(e) => setEditAmount(Number(e.target.value))}
                    className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Paid Amount (₹)</label>
                  <input
                    type="number"
                    min={0}
                    max={editAmount}
                    value={editAdvance}
                    onChange={(e) => setEditAdvance(Number(e.target.value))}
                    className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white font-mono tabular-nums"
                  />
                </div>
                <div className="flex items-end">
                  <div className="w-full px-3 py-2 rounded-lg bg-[#141417] border border-white/10 text-zinc-400 tabular-nums">
                    Due: <strong className="text-white font-mono">₹{Math.max(0, editAmount - editAdvance)}</strong>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Customer Complaint</label>
                  <input
                    type="text"
                    value={editComplaint}
                    onChange={(e) => setEditComplaint(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Admin / Service Notes</label>
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full bg-[#141417] border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveEdits}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFC107] text-black font-black text-xs hover:bg-amber-300 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          ) : (
            /* Structured 2x2 Summary Grid (Single Elevation, Clean Dividers) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#0B0B0D] p-4 rounded-xl border border-white/10 space-y-1.5">
                <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Customer</span>
                </div>
                <div className="text-sm font-black text-white">{booking.customerName}</div>
                <div className="text-zinc-300 font-mono tabular-nums">{booking.phone}</div>
                <p className="text-zinc-400 leading-relaxed pt-1">
                  {booking.addressDetails || booking.location}
                </p>
              </div>

              <div className="bg-[#0B0B0D] p-4 rounded-xl border border-white/10 space-y-1.5">
                <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Vehicle & Package</span>
                </div>
                <div className="text-sm font-black text-white">
                  {booking.brand} {booking.model}
                </div>
                <div className="text-zinc-400">
                  {booking.vehicleType} ·{' '}
                  <span className="font-mono text-[#FFC107]">
                    {booking.registrationNumber || 'Reg. not provided'}
                  </span>
                </div>
                <div className="text-white font-semibold pt-1">{booking.serviceType}</div>
              </div>

              <div className="bg-[#0B0B0D] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Notes & Complaint</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  {booking.customerComplaint || 'Standard periodic maintenance requested.'}
                </p>
                {booking.customerNotes && (
                  <p className="text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                    Note: {booking.customerNotes}
                  </p>
                )}
              </div>

              <div className="bg-[#0B0B0D] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-[#FFC107]" />
                    <span>Billing</span>
                  </span>
                  <span className="text-[11px] text-zinc-400">{booking.paymentMethod}</span>
                </div>
                <div className="flex justify-between tabular-nums">
                  <span className="text-zinc-400">Total Amount</span>
                  <span className="font-black text-white font-mono">
                    ₹{booking.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between tabular-nums">
                  <span className="text-zinc-400">Paid</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    ₹{booking.advancePaid.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between tabular-nums">
                  <span className="text-zinc-400">Balance Due</span>
                  <span className="font-bold text-amber-300 font-mono">
                    ₹{booking.remainingBalance.toLocaleString('en-IN')}
                  </span>
                </div>

                {booking.paymentStatus !== 'Paid' && (
                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickMarkPaid('UPI / GPay')}
                      className="px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-300 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Mark Paid (UPI)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickMarkPaid('Cash')}
                      className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-zinc-300 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Mark Paid (Cash)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Workflow Stage Progression */}
          <div className="p-4 rounded-xl bg-[#0B0B0D] border border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Dispatch Workflow Stage
              </span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">
                  Mechanic:{' '}
                  <strong className="text-[#FFC107]">{booking.mechanicName || 'Unassigned'}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onOpenAssign(booking)}
                  className="px-2.5 py-1 rounded-md bg-[#FFC107]/15 hover:bg-[#FFC107] text-[#FFC107] hover:text-black font-bold text-[11px] transition-colors cursor-pointer"
                >
                  {booking.mechanicName ? 'Reassign' : 'Assign Mechanic'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
              {WORKFLOW_STAGES.map((stage) => {
                const meta = BOOKING_STATUS_META[stage];
                const isCurrent = booking.status === stage;
                const isPast =
                  booking.status !== 'cancelled' &&
                  BOOKING_STATUS_META[booking.status].stepNumber > meta.stepNumber;
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => onUpdateStatus(booking.id, stage, customNote.trim() || undefined)}
                    className={`px-2 py-2 rounded-lg text-[11px] font-bold border text-center transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#FFC107] text-black border-[#FFC107]'
                        : isPast
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-[#141417] text-zinc-400 border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {meta.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Optional note for next status change..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="flex-1 bg-[#141417] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107]"
              />
              <button
                type="button"
                onClick={() =>
                  onUpdateStatus(booking.id, 'cancelled', customNote.trim() || 'Cancelled by admin')
                }
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel Booking
              </button>
            </div>
          </div>

          {/* Audit Timeline & Danger Action */}
          <div className="space-y-3">
            {booking.history && booking.history.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Audit History ({booking.history.length})</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {[...booking.history].reverse().map((h, i) => (
                    <div
                      key={i}
                      className="text-xs px-3 py-2 rounded-lg bg-[#0B0B0D] border border-white/5 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono text-[11px] text-[#FFC107] tabular-nums shrink-0">
                          {h.timestamp}
                        </span>
                        <span className="text-zinc-200 truncate">{h.note}</span>
                      </div>
                      <span className="text-zinc-500 text-[11px] shrink-0">{h.updatedBy}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inline Delete Confirmation */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              {confirmDelete ? (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-red-400 font-semibold">Permanently delete {booking.id}?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteBooking(booking.id);
                      onClose();
                    }}
                    className="px-3 py-1 rounded-md bg-red-500 text-white font-bold cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="px-3 py-1 rounded-md bg-white/10 text-zinc-300 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
