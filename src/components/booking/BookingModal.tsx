import React, { useState } from 'react';
import { X, Calendar, Clock, User, ShieldCheck, Ticket, CheckCircle2, ArrowRight, ArrowLeft, Download, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { HeritageSite, Slot, VisitorInput, Booking } from '../../types';

interface BookingModalProps {
  site: HeritageSite;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ site, isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State
  const [visitDate, setVisitDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Step 2 State
  const [visitors, setVisitors] = useState<VisitorInput[]>([
    {
      name: '',
      age: 25,
      gender: 'MALE',
      nationality: 'DOMESTIC',
      idProofType: 'AADHAAR',
      idProofNumber: '',
    },
  ]);

  // Step 3 / 4 State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Fetch Slots for Selected Date
  const { data: slots, isLoading: slotsLoading } = useQuery<Slot[]>({
    queryKey: ['availableSlots', site._id, visitDate],
    queryFn: async () => {
      const res = await api.get(`/sites/${site._id}/slots?date=${visitDate}`);
      return res.data.data;
    },
    enabled: isOpen && Boolean(visitDate),
  });

  if (!isOpen) return null;

  const handleAddVisitor = () => {
    setVisitors([
      ...visitors,
      {
        name: '',
        age: 25,
        gender: 'MALE',
        nationality: 'DOMESTIC',
        idProofType: 'AADHAAR',
        idProofNumber: '',
      },
    ]);
  };

  const handleRemoveVisitor = (index: number) => {
    if (visitors.length > 1) {
      setVisitors(visitors.filter((_, i) => i !== index));
    }
  };

  const handleVisitorChange = (index: number, field: keyof VisitorInput, value: any) => {
    const updated = [...visitors];
    updated[index] = { ...updated[index], [field]: value };
    setVisitors(updated);
  };

  // Calculate Order Total
  const calculateTotal = () => {
    return visitors.reduce((sum, v) => {
      if (v.age < 12) return sum + (site.ticketPricing.childPrice || 0);
      if (v.nationality === 'FOREIGNER') return sum + site.ticketPricing.foreignerPrice;
      if (v.nationality === 'SAARC') return sum + site.ticketPricing.saarcPrice;
      return sum + site.ticketPricing.domesticPrice;
    }, 0);
  };

  // Execute Booking Hold & Trigger Razorpay Verification
  const handleProceedToPayment = async () => {
    if (!selectedSlot) return;
    setError(null);
    setLoading(true);

    try {
      // 1. Create Booking Hold
      const holdRes = await api.post('/bookings/hold', {
        siteId: site._id,
        slotId: selectedSlot._id,
        visitDate,
        timeSlot: selectedSlot.timeSlot,
        visitors,
      });

      const { booking, razorpayOrder } = holdRes.data.data;

      // 2. Verify Payment (Mock / SDK Integration)
      const verifyRes = await api.post('/payments/verify', {
        razorpay_order_id: razorpayOrder.id,
        razorpay_payment_id: `pay_mock_${Date.now()}`,
        razorpay_signature: 'mock_valid_signature',
        bookingId: booking._id,
      });

      setConfirmedBooking(verifyRes.data.data.booking);
      setStep(4);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to complete booking hold or payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">ASI E-TICKET PASS</span>
            <h3 className="text-lg font-serif font-bold text-slate-100">{site.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-2.5 bg-slate-900/30 border-b border-slate-800 flex items-center justify-between text-xs font-semibold">
          <span className={step >= 1 ? 'text-amber-400' : 'text-slate-500'}>1. Slot Selection</span>
          <span className={step >= 2 ? 'text-amber-400' : 'text-slate-500'}>2. Visitor Details</span>
          <span className={step >= 3 ? 'text-amber-400' : 'text-slate-500'}>3. Summary & Pay</span>
          <span className={step === 4 ? 'text-amber-400' : 'text-slate-500'}>4. Confirmation</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Date & Time Slot */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Select Visit Date</label>
                <input
                  type="date"
                  value={visitDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    setVisitDate(e.target.value);
                    setSelectedSlot(null);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Available Time Slots</label>
                {slotsLoading ? (
                  <p className="text-xs text-amber-400 animate-pulse">Checking live slot availability...</p>
                ) : slots && slots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {slots.map((s) => {
                      const isAvailable = s.availableCount > 0;
                      return (
                        <button
                          key={s._id}
                          disabled={!isAvailable}
                          onClick={() => setSelectedSlot(s)}
                          className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                            selectedSlot?._id === s._id
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold shadow-lg shadow-amber-500/10'
                              : isAvailable
                              ? 'glass-panel border-slate-700 text-slate-300 hover:border-slate-500'
                              : 'opacity-40 bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold">
                              <Clock className="w-3.5 h-3.5 text-amber-400" /> {s.timeSlot}
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-1">
                              {isAvailable ? `${s.availableCount} passes remaining` : 'SOLD OUT'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
                    No generated slots for this date. Default slots will be auto-assigned.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Visitor Breakdown */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Visitor List ({visitors.length})</h4>
                <button
                  onClick={handleAddVisitor}
                  className="text-xs text-amber-400 font-semibold hover:underline"
                >
                  + Add Visitor
                </button>
              </div>

              {visitors.map((visitor, idx) => (
                <div key={idx} className="p-4 glass-panel rounded-2xl border border-slate-800 space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                    <span className="text-xs font-bold text-amber-400">Visitor #{idx + 1}</span>
                    {visitors.length > 1 && (
                      <button onClick={() => handleRemoveVisitor(idx)} className="text-[11px] text-red-400 hover:underline">
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={visitor.name}
                        onChange={(e) => handleVisitorChange(idx, 'name', e.target.value)}
                        placeholder="Rohan Sharma"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Age & Gender</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min={1}
                          max={120}
                          value={visitor.age}
                          onChange={(e) => handleVisitorChange(idx, 'age', parseInt(e.target.value))}
                          className="w-20 bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                        <select
                          value={visitor.gender}
                          onChange={(e) => handleVisitorChange(idx, 'gender', e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Nationality</label>
                      <select
                        value={visitor.nationality}
                        onChange={(e) => handleVisitorChange(idx, 'nationality', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      >
                        <option value="DOMESTIC">Indian Resident</option>
                        <option value="FOREIGNER">Foreign Tourist</option>
                        <option value="SAARC">SAARC / BIMSTEC</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">ID Proof Type</label>
                      <select
                        value={visitor.idProofType}
                        onChange={(e) => handleVisitorChange(idx, 'idProofType', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      >
                        <option value="AADHAAR">Aadhaar Card</option>
                        <option value="PASSPORT">Passport</option>
                        <option value="DRIVING_LICENSE">Driving License</option>
                        <option value="VOTER_ID">Voter ID</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">ID Number</label>
                      <input
                        type="text"
                        required
                        value={visitor.idProofNumber}
                        onChange={(e) => handleVisitorChange(idx, 'idProofNumber', e.target.value)}
                        placeholder="XXXX-XXXX-XXXX"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Order Summary & Pay */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="p-4 glass-panel rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pass Details Summary</h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <p><span className="text-slate-500">Monument:</span> {site.name}</p>
                  <p><span className="text-slate-500">Visit Date:</span> {visitDate}</p>
                  <p><span className="text-slate-500">Time Slot:</span> {selectedSlot?.timeSlot}</p>
                  <p><span className="text-slate-500">Total Visitors:</span> {visitors.length}</p>
                </div>
              </div>

              <div className="p-4 glass-panel rounded-2xl border border-amber-500/20 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Price Calculation</h4>
                {visitors.map((v, i) => (
                  <div key={i} className="flex items-center justify-between text-xs text-slate-400">
                    <span>Visitor #{i + 1}: {v.name || 'Guest'} ({v.nationality})</span>
                    <span className="font-semibold text-slate-200">
                      ₹{v.age < 12 ? site.ticketPricing.childPrice || 0 : v.nationality === 'FOREIGNER' ? site.ticketPricing.foreignerPrice : site.ticketPricing.domesticPrice}
                    </span>
                  </div>
                ))}
                <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-sm font-bold text-amber-400">
                  <span>Total Payable:</span>
                  <span className="text-lg">₹{calculateTotal()} INR</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-400">Booking Confirmed!</h3>
              <p className="text-xs text-slate-300">
                Your entry pass reference is <span className="font-bold text-amber-300">{confirmedBooking.bookingReference}</span>
              </p>

              {confirmedBooking.qrCodeUrl && (
                <div className="p-4 bg-white rounded-2xl inline-block shadow-2xl my-2">
                  <img src={confirmedBooking.qrCodeUrl} alt="Ticket QR" className="w-36 h-36 mx-auto" />
                  <span className="text-[10px] text-slate-700 font-bold block mt-1">Scan at Gate Turnstile</span>
                </div>
              )}

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 glass-panel text-slate-200 hover:text-amber-400 text-xs font-semibold rounded-xl"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-100 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step === 1 && (
              <button
                disabled={!selectedSlot}
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-40"
              >
                Continue to Visitors <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                onClick={() => {
                  if (visitors.some((v) => !v.name || !v.idProofNumber)) {
                    setError('Please fill in Name and ID Proof number for all visitors');
                    return;
                  }
                  setError(null);
                  setStep(3);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Review Summary <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                disabled={loading}
                onClick={handleProceedToPayment}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {loading ? 'Processing Payment...' : `Pay ₹${calculateTotal()} INR & Confirm`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
