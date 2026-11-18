import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  CheckCircle2,
  Star,
  Wrench,
  MessageCircle,
  Save,
  Check,
  MapPin
} from 'lucide-react';
import { Booking, Invoice, JobCard, Mechanic } from '../../types/admin';
import {
  AdminBusinessSettings,
  BENGALURU_ZONES,
  buildMechanicWhatsAppUrl,
  normalizePhone
} from './adminConstants';

/* -------------------------------------------------------------------------- */
/* 1. ASSIGN MECHANIC MODAL (SMART ZONE & AVAILABILITY SORT)                  */
/* -------------------------------------------------------------------------- */
interface AssignMechanicModalProps {
  booking: Booking | null;
  mechanics: Mechanic[];
  fallbackWhatsApp: string;
  onClose: () => void;
  onAssign: (bookingId: string, mechanicId: string) => void;
}

export const AssignMechanicModal: React.FC<AssignMechanicModalProps> = ({
  booking,
  mechanics,
  fallbackWhatsApp,
  onClose,
  onAssign
}) => {
  if (!booking) return null;

  const sortedMechanics = [...mechanics].sort((a, b) => {
    const aAvail = a.status === 'available' ? 1 : 0;
    const bAvail = b.status === 'available' ? 1 : 0;
    if (aAvail !== bAvail) return bAvail - aAvail;
    const loc = booking.location.toLowerCase();
    const aZoneMatch = a.assignedArea.toLowerCase().split('&').some((z) => loc.includes(z.trim())) ? 1 : 0;
    const bZoneMatch = b.assignedArea.toLowerCase().split('&').some((z) => loc.includes(z.trim())) ? 1 : 0;
    if (aZoneMatch !== bZoneMatch) return bZoneMatch - aZoneMatch;
    return b.rating - a.rating;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#141417] border border-white/15 rounded-2xl w-full max-w-lg p-6 text-white space-y-4 shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="font-black text-white text-base">
              Assign Mechanic · <span className="text-[#FFC107] font-mono">{booking.id}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {booking.brand} {booking.model} · {booking.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {sortedMechanics.map((m) => {
            const isZoneMatch = m.assignedArea
              .toLowerCase()
              .split('&')
              .some((z) => booking.location.toLowerCase().includes(z.trim()));
            const isAssigned = booking.mechanicId === m.id;
            const waUrl = buildMechanicWhatsAppUrl(
              { ...booking, mechanicId: m.id, mechanicName: m.name },
              mechanics,
              fallbackWhatsApp
            );

            return (
              <div
                key={m.id}
                className={`p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 ${
                  isAssigned
                    ? 'bg-[#FFC107]/10 border-[#FFC107]/50'
                    : m.status === 'available'
                    ? 'bg-[#0B0B0D] border-white/10 hover:border-[#FFC107]/60'
                    : 'bg-[#0B0B0D]/60 border-white/5 opacity-75'
                }`}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-white">
                    <span>{m.name}</span>
                    <span className="text-[10px] font-mono text-zinc-400">{m.id}</span>
                    {isZoneMatch && (
                      <span className="text-[10px] font-bold text-[#FFC107]">· Zone Match</span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#FFC107] shrink-0" />
                    <span className="truncate">{m.assignedArea}</span>
                    <span>·</span>
                    <span className="text-[#FFC107] font-mono tabular-nums flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-[#FFC107]" /> {m.rating}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 truncate">{m.specialties.join(' · ')}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp mechanic send"
                    className="p-2 rounded-lg bg-[#22C55E]/15 hover:bg-[#22C55E] text-[#22C55E] hover:text-black border border-[#22C55E]/30 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onAssign(booking.id, m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isAssigned
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : m.status === 'available'
                        ? 'bg-[#FFC107] hover:bg-amber-300 text-black'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isAssigned ? 'Assigned' : 'Assign'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. ADD / EDIT MECHANIC MODAL                                               */
/* -------------------------------------------------------------------------- */
interface MechanicFormModalProps {
  isOpen: boolean;
  editingMechanic: Mechanic | null;
  nextMechanicNumber: number;
  onClose: () => void;
  onSave: (mechanic: Mechanic, isEdit: boolean) => void;
}

export const MechanicFormModal: React.FC<MechanicFormModalProps> = ({
  isOpen,
  editingMechanic,
  nextMechanicNumber,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Indiranagar');
  const [experience, setExperience] = useState('4 Years');
  const [specialtiesText, setSpecialtiesText] = useState('General Bike & Scooter Service');
  const [status, setStatus] = useState<Mechanic['status']>('available');

  useEffect(() => {
    if (editingMechanic) {
      setName(editingMechanic.name);
      setPhone(editingMechanic.phone);
      setArea(editingMechanic.assignedArea);
      setExperience(editingMechanic.experience);
      setSpecialtiesText(editingMechanic.specialties.join(', '));
      setStatus(editingMechanic.status);
    } else {
      setName('');
      setPhone('');
      setArea('Indiranagar');
      setExperience('4 Years');
      setSpecialtiesText('General Bike & Scooter Service');
      setStatus('available');
    }
  }, [editingMechanic, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const specs = specialtiesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const mech: Mechanic = {
      id: editingMechanic ? editingMechanic.id : `MEC-${nextMechanicNumber}`,
      name: name.trim(),
      phone: phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
      experience,
      rating: editingMechanic ? editingMechanic.rating : 5.0,
      status,
      activeBookingId: editingMechanic?.activeBookingId,
      completedJobs: editingMechanic ? editingMechanic.completedJobs : 0,
      specialties: specs.length > 0 ? specs : ['General Doorstep Service'],
      assignedArea: area
    };

    onSave(mech, Boolean(editingMechanic));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#141417] border border-white/15 rounded-2xl w-full max-w-md p-6 text-white space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-black text-white text-base flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#FFC107]" />
            <span>{editingMechanic ? `Edit ${editingMechanic.name}` : 'Add Field Mechanic'}</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Phone / WhatsApp *</label>
            <input
              type="tel"
              required
              placeholder="e.g. 9845012345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FFC107]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Assigned Zone</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
              >
                {BENGALURU_ZONES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
                {!BENGALURU_ZONES.includes(area) && <option value={area}>{area}</option>}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
              >
                <option value="2 Years">2 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="10+ Years">10+ Years Senior</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Duty Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Mechanic['status'])}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
            >
              <option value="available">Available</option>
              <option value="on_job">On Active Job</option>
              <option value="off_duty">Off Duty</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">
              Specialties (comma-separated)
            </label>
            <input
              type="text"
              value={specialtiesText}
              onChange={(e) => setSpecialtiesText(e.target.value)}
              className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
            />
          </div>
        </div>

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black text-xs transition-colors cursor-pointer"
          >
            {editingMechanic ? 'Save Changes' : 'Add Mechanic'}
          </button>
        </div>
      </form>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. INTERACTIVE DIGITAL INVOICE MODAL                                       */
/* -------------------------------------------------------------------------- */
interface InvoiceModalProps {
  invoice: Invoice | null;
  businessSettings: AdminBusinessSettings;
  onClose: () => void;
  onTogglePaid: (invoice: Invoice) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoice,
  businessSettings,
  onClose,
  onTogglePaid
}) => {
  if (!invoice) return null;

  const waReceiptUrl = `https://wa.me/${normalizePhone(invoice.phone)}?text=${encodeURIComponent(
    `🧾 *YES BIKE SERVICE — DIGITAL INVOICE*\n\nInvoice #: ${invoice.invoiceNumber}\nBooking Ref: ${invoice.bookingId}\nCustomer: ${invoice.customerName}\nVehicle: ${invoice.vehicle}\nService: ${invoice.serviceName}\nTotal Amount: ₹${invoice.total}\nStatus: *${invoice.paymentStatus}* (${invoice.paymentMethod})\n\nThank you for choosing YES BIKE SERVICE!\nQuality Bike Care at Your Doorstep!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-zinc-950 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
          <div>
            <div className="text-xl font-black text-zinc-950 tracking-tight">YES BIKE SERVICE</div>
            <p className="text-xs text-zinc-600 mt-0.5">
              Quality Bike Care at Your Doorstep · Bengaluru
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              {businessSettings.helpline} · GSTIN: {businessSettings.gstin}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded bg-zinc-950 text-[#FFC107] font-black text-xs font-mono">
              TAX INVOICE
            </span>
            <div className="font-mono text-xs font-bold text-zinc-800 mt-1.5 tabular-nums">
              {invoice.invoiceNumber}
            </div>
            <div className="text-xs text-zinc-500 font-mono tabular-nums">{invoice.date}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <div>
            <span className="font-bold text-zinc-500 uppercase tracking-wider block text-[10px]">
              Bill To
            </span>
            <div className="font-black text-sm text-zinc-950 mt-0.5">{invoice.customerName}</div>
            <div className="text-zinc-600 font-mono tabular-nums">{invoice.phone}</div>
            <div className="text-zinc-600 mt-1">{invoice.location}</div>
          </div>
          <div>
            <span className="font-bold text-zinc-500 uppercase tracking-wider block text-[10px]">
              Vehicle & Status
            </span>
            <div className="font-bold text-zinc-950 mt-0.5">{invoice.vehicle}</div>
            <div className="text-zinc-600 font-mono text-[11px] mt-1">Ref: {invoice.bookingId}</div>
            <div
              className={`font-bold mt-1 ${
                invoice.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {invoice.paymentStatus} · {invoice.paymentMethod}
            </div>
          </div>
        </div>

        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-zinc-900 text-zinc-900 uppercase text-[10px]">
              <th className="py-2">Description</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Unit Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {invoice.items.map((it, idx) => (
              <tr key={idx}>
                <td className="py-2.5 font-medium text-zinc-800">{it.description}</td>
                <td className="py-2.5 text-center font-mono tabular-nums">{it.quantity}</td>
                <td className="py-2.5 text-right font-mono tabular-nums">
                  ₹{it.unitPrice.toLocaleString('en-IN')}
                </td>
                <td className="py-2.5 text-right font-mono font-bold tabular-nums">
                  ₹{it.total.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-900 font-black text-sm">
              <td colSpan={3} className="py-3 text-right pr-3">
                Grand Total
              </td>
              <td className="py-3 text-right font-mono tabular-nums text-[#FFC107] bg-zinc-950 px-3 rounded">
                ₹{invoice.total.toLocaleString('en-IN')}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="text-[11px] text-zinc-500 border-t border-zinc-200 pt-3 space-y-1">
          <p>• 30-Day Doorstep Service Guarantee included on all workmanship.</p>
          <p>• Computer-generated digital tax invoice; no physical signature required.</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#FFC107]" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={() => onTogglePaid(invoice)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                invoice.paymentStatus === 'Paid'
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{invoice.paymentStatus === 'Paid' ? 'Mark Unpaid' : 'Mark as Paid'}</span>
            </button>
            <a
              href={waReceiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send on WhatsApp</span>
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-xs font-bold text-zinc-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. INTERACTIVE 12-POINT JOB CARD MODAL                                     */
/* -------------------------------------------------------------------------- */
interface JobCardModalProps {
  jobCard: JobCard | null;
  onClose: () => void;
  onSaveJobCard: (updated: JobCard) => void;
}

const CONDITION_CYCLE: JobCard['checklist'][number]['condition'][] = [
  'Good',
  'Adjusted',
  'Replaced',
  'Needs Attention'
];

export const JobCardModal: React.FC<JobCardModalProps> = ({
  jobCard,
  onClose,
  onSaveJobCard
}) => {
  const [draft, setDraft] = useState<JobCard | null>(jobCard);
  const [savedFlag, setSavedFlag] = useState(false);

  useEffect(() => {
    setDraft(jobCard ? { ...jobCard, checklist: jobCard.checklist.map((c) => ({ ...c })) } : null);
    setSavedFlag(false);
  }, [jobCard]);

  if (!draft) return null;

  const toggleItem = (idx: number) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const nextList = prev.checklist.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      );
      return { ...prev, checklist: nextList };
    });
    setSavedFlag(false);
  };

  const cycleCondition = (idx: number) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const nextList = prev.checklist.map((item, i) => {
        if (i !== idx) return item;
        const currIdx = CONDITION_CYCLE.indexOf(item.condition);
        const nextCond = CONDITION_CYCLE[(currIdx + 1) % CONDITION_CYCLE.length];
        return { ...item, condition: nextCond };
      });
      return { ...prev, checklist: nextList };
    });
    setSavedFlag(false);
  };

  const handleSave = () => {
    onSaveJobCard(draft);
    setSavedFlag(true);
  };

  const checkedCount = draft.checklist.filter((c) => c.checked).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white text-zinc-950 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
          <div>
            <div className="text-lg sm:text-xl font-black text-zinc-950">
              YES BIKE SERVICE — 12-POINT JOB CARD
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Click any item to toggle completion or click the status tag to cycle inspection condition.
            </p>
          </div>
          <div className="text-right font-mono text-xs tabular-nums">
            <span className="font-bold text-zinc-950">{draft.jobCardNumber}</span>
            <div className="text-zinc-500">{draft.date}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <div className="space-y-1">
            <div className="font-bold text-zinc-950 text-sm">{draft.customerName}</div>
            <div className="text-zinc-600 font-mono tabular-nums">{draft.phone}</div>
            <div className="text-zinc-700 font-medium">{draft.vehicle}</div>
            <div className="text-zinc-500">Mechanic: <strong className="text-zinc-900">{draft.mechanicName}</strong></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-zinc-500 w-20 shrink-0 font-semibold">Odometer:</label>
              <input
                type="text"
                value={draft.odometerReading || ''}
                onChange={(e) => {
                  setDraft({ ...draft, odometerReading: e.target.value });
                  setSavedFlag(false);
                }}
                className="flex-1 bg-white border border-zinc-300 rounded px-2 py-1 text-xs font-mono text-zinc-900"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-zinc-500 w-20 shrink-0 font-semibold">Fuel Level:</label>
              <input
                type="text"
                value={draft.fuelLevel || ''}
                onChange={(e) => {
                  setDraft({ ...draft, fuelLevel: e.target.value });
                  setSavedFlag(false);
                }}
                className="flex-1 bg-white border border-zinc-300 rounded px-2 py-1 text-xs text-zinc-900"
              />
            </div>
            <label className="inline-flex items-center gap-2 pt-1 cursor-pointer font-semibold text-zinc-800">
              <input
                type="checkbox"
                checked={draft.customerSignOff}
                onChange={(e) => {
                  setDraft({ ...draft, customerSignOff: e.target.checked });
                  setSavedFlag(false);
                }}
                className="accent-emerald-600 w-3.5 h-3.5"
              />
              <span>Customer Handover Sign-Off Confirmed</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-zinc-950 uppercase tracking-wider">
              Doorstep Inspection Checklist
            </span>
            <span className="font-mono font-bold text-emerald-700 tabular-nums">
              {checkedCount}/{draft.checklist.length} Checked
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {draft.checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-zinc-50 border border-zinc-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="flex items-center gap-2 text-left min-w-0 cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      item.checked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-zinc-300'
                    }`}
                  >
                    {item.checked && <Check className="w-3 h-3" />}
                  </span>
                  <span
                    className={`font-medium truncate ${
                      item.checked ? 'text-zinc-900' : 'text-zinc-400 line-through'
                    }`}
                  >
                    {item.item}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => cycleCondition(idx)}
                  title="Click to cycle condition"
                  className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 cursor-pointer ${
                    item.condition === 'Good'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.condition === 'Replaced'
                      ? 'bg-blue-100 text-blue-800'
                      : item.condition === 'Needs Attention'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {item.condition}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <label className="font-bold text-zinc-700 block">Technician Remarks</label>
          <textarea
            rows={2}
            value={draft.mechanicNotes}
            onChange={(e) => {
              setDraft({ ...draft, mechanicNotes: e.target.value });
              setSavedFlag(false);
            }}
            className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-xs text-zinc-800 focus:outline-none focus:border-zinc-900"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-400 text-black text-xs font-black transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedFlag ? 'Saved' : 'Save Changes'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#FFC107]" />
              <span>Print</span>
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-xs font-bold text-zinc-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
