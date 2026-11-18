import React, { useState, useEffect } from 'react';
import { X, Plus, CalendarCheck, Wrench, IndianRupee, MapPin } from 'lucide-react';
import { Booking, Mechanic } from '../../types/admin';
import { BENGALURU_ZONES, ServicePackageItem } from './adminConstants';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBooking: (booking: Booking) => void;
  mechanics: Mechanic[];
  packages: ServicePackageItem[];
  preselectedPackage?: ServicePackageItem | null;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onCreateBooking,
  mechanics,
  packages,
  preselectedPackage
}) => {
  const defaultPkg = preselectedPackage || packages[0];
  const todayStr = new Date().toISOString().split('T')[0];

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState('Indiranagar');
  const [addressDetails, setAddressDetails] = useState('');
  const [vehicleType, setVehicleType] = useState<'Bike' | 'Scooter'>('Bike');
  const [brand, setBrand] = useState('Honda');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const formatPackageLabel = (pkg: ServicePackageItem) =>
    `${pkg.name} (${pkg.priceLabel || `₹${pkg.price.toLocaleString('en-IN')}`})`;

  const [serviceName, setServiceName] = useState(
    defaultPkg ? formatPackageLabel(defaultPkg) : 'Basic General Service (₹699)'
  );
  const [amount, setAmount] = useState<number>(defaultPkg ? defaultPkg.price : 699);
  const [advancePaid, setAdvancePaid] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<Booking['paymentMethod']>('UPI / GPay');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('10:00 AM');
  const [mechanicId, setMechanicId] = useState('');
  const [complaint, setComplaint] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (preselectedPackage) {
      setServiceName(formatPackageLabel(preselectedPackage));
      setAmount(preselectedPackage.price);
    }
  }, [preselectedPackage]);

  if (!isOpen) return null;

  const handlePackageSelect = (val: string) => {
    setServiceName(val);
    const matched = packages.find((p) => formatPackageLabel(p) === val);
    if (matched) {
      setAmount(matched.price);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !model.trim()) return;

    const cleanPhone = phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`;
    const bookingId = `ID-${Math.floor(11200 + Math.random() * 8800)}`;
    const selectedMech = mechanics.find((m) => m.id === mechanicId);
    const safeAmount = Math.max(0, Number(amount) || 0);
    const safeAdvance = Math.min(safeAmount, Math.max(0, Number(advancePaid) || 0));
    const remaining = Math.max(0, safeAmount - safeAdvance);
    const payStatus: Booking['paymentStatus'] =
      remaining === 0 && safeAmount > 0 ? 'Paid' : safeAdvance > 0 ? 'Partial' : 'Unpaid';
    const locationStr = `${zone}, Bengaluru`;

    const nowTs = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const history: Booking['history'] = [
      {
        timestamp: nowTs,
        status: selectedMech ? 'mechanic_assigned' : 'accepted',
        note: selectedMech
          ? `Phone/Walk-in booking logged by Admin & assigned to ${selectedMech.name}`
          : 'Phone/Walk-in booking logged by Admin',
        updatedBy: 'Admin'
      }
    ];

    const newBooking: Booking = {
      id: bookingId,
      customerName: customerName.trim(),
      phone: cleanPhone,
      location: locationStr,
      addressDetails: addressDetails.trim() || locationStr,
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(
        (addressDetails.trim() || zone) + ' Bengaluru'
      )}`,
      vehicleType,
      brand: brand.trim(),
      model: model.trim(),
      registrationNumber: registrationNumber.trim().toUpperCase() || undefined,
      serviceType: serviceName,
      customerComplaint: complaint.trim() || undefined,
      customerNotes: notes.trim() || undefined,
      date,
      time,
      mechanicId: selectedMech?.id,
      mechanicName: selectedMech?.name,
      amount: safeAmount,
      advancePaid: safeAdvance,
      remainingBalance: remaining,
      paymentMethod,
      paymentStatus: payStatus,
      status: selectedMech ? 'mechanic_assigned' : 'accepted',
      createdAt: new Date().toISOString(),
      isNew: false,
      history
    };

    onCreateBooking(newBooking);
    // Reset form
    setCustomerName('');
    setPhone('');
    setAddressDetails('');
    setModel('');
    setRegistrationNumber('');
    setComplaint('');
    setNotes('');
    setAdvancePaid(0);
    setMechanicId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#141417] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto text-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#141417] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#FFC107]" />
              <span>Create Manual / Phone Booking</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Log incoming call or WhatsApp requests directly into live dispatch.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {/* Customer & Location */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFC107] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Customer & Doorstep Location</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karthik Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
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
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Bengaluru Zone *</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
                  {BENGALURU_ZONES.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Full Doorstep Address</label>
                <input
                  type="text"
                  placeholder="Flat, Street, Landmark..."
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFC107] flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Vehicle & Service Package</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Type</label>
                <div className="grid grid-cols-2 gap-1.5 bg-[#0B0B0D] p-1 rounded-lg border border-white/10">
                  {(['Bike', 'Scooter'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setVehicleType(t)}
                      className={`py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
                        vehicleType === t ? 'bg-[#FFC107] text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Brand *</label>
                <input
                  type="text"
                  required
                  placeholder="Honda / RE / TVS"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Model *</label>
                <input
                  type="text"
                  required
                  placeholder="Activa 6G / Classic 350"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Reg. Number</label>
                <input
                  type="text"
                  placeholder="KA-01-XX-1234"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono uppercase placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-zinc-400 font-semibold mb-1">Service Package</label>
                <select
                  value={serviceName}
                  onChange={(e) => handlePackageSelect(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
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
            </div>
          </div>

          {/* Schedule, Dispatch & Billing */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFC107] flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Schedule, Mechanic & Payment</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Service Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Time Slot</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
                  {[
                    '08:30 AM',
                    '09:30 AM',
                    '10:00 AM',
                    '11:00 AM',
                    '12:00 PM',
                    '02:00 PM',
                    '03:30 PM',
                    '05:00 PM',
                    '06:30 PM'
                  ].map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Assign Mechanic (Optional)</label>
                <select
                  value={mechanicId}
                  onChange={(e) => setMechanicId(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="">Assign later</option>
                  {mechanics.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.status === 'available' ? 'Available' : m.status === 'on_job' ? 'On Job' : 'Off Duty'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Total Amount (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Advance Received (₹)</label>
                <input
                  type="number"
                  min={0}
                  max={amount}
                  value={advancePaid}
                  onChange={(e) => setAdvancePaid(Number(e.target.value))}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white font-mono tabular-nums focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Payment Mode</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as Booking['paymentMethod'])}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC107]"
                >
                  <option value="UPI / GPay">UPI / GPay</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit/Debit Card">Credit/Debit Card</option>
                  <option value="Pending">Pay After Service</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Customer Complaint / Issues</label>
                <input
                  type="text"
                  placeholder="e.g. Brake noise, chain loose, oil change"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Internal Dispatch Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Carry 10W40 oil, call before arrival"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0B0B0D] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#141417] border-t border-white/10 px-6 py-4 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 tabular-nums">
            Balance Due: <strong className="text-white font-mono">₹{Math.max(0, amount - advancePaid).toLocaleString('en-IN')}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFC107] hover:bg-amber-300 text-black font-black text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Save Booking</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
