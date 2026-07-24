import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Ticket, Search, Filter, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';
import { Booking } from '../../types';

export const AdminBookings: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchRef, setSearchRef] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [refundBooking, setRefundBooking] = useState<Booking | null>(null);
  const [refundReason, setRefundReason] = useState('Customer Request');
  const [loading, setLoading] = useState(false);

  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ['adminBookingsList'],
    queryFn: async () => {
      const res = await api.get('/bookings/my-bookings'); // Or admin list endpoint
      return res.data.data;
    },
  });

  const filteredBookings = bookings?.filter((b) => {
    const matchesRef = !searchRef || b.bookingReference.toLowerCase().includes(searchRef.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || b.status === selectedStatus;
    return matchesRef && matchesStatus;
  }) || [];

  const handleExecuteRefund = async () => {
    if (!refundBooking) return;
    setLoading(true);

    try {
      await api.post('/admin/refund', {
        bookingId: refundBooking._id,
        refundReason,
      });

      queryClient.invalidateQueries({ queryKey: ['adminBookingsList'] });
      setRefundBooking(null);
      alert(`Refund processed successfully for booking ${refundBooking.bookingReference}`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to process refund');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">Bookings & Refund Engine</h1>
          <p className="text-xs text-slate-400 mt-1">View all user monument reservations and trigger Razorpay refunds.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="Search reference..."
              className="bg-slate-900 border border-slate-700 rounded-xl py-1.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl py-1.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      {isLoading ? (
        <div className="glass-panel h-64 rounded-2xl animate-pulse"></div>
      ) : (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Reference</th>
                  <th className="py-4 px-6">Monument</th>
                  <th className="py-4 px-6">Visit Date & Slot</th>
                  <th className="py-4 px-6">Visitors</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {filteredBookings.map((b: any) => (
                  <tr key={b._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-amber-400">{b.bookingReference}</td>
                    <td className="py-4 px-6 font-semibold">{b.site?.name || 'Monument'}</td>
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(b.visitDate).toLocaleDateString('en-IN')} <br />
                      <span className="text-[10px] text-slate-500">{b.timeSlot}</span>
                    </td>
                    <td className="py-4 px-6">{b.visitors?.length || 1} Person(s)</td>
                    <td className="py-4 px-6 font-bold text-slate-100">₹{b.totalAmount} INR</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          b.status === 'CONFIRMED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : b.status === 'CANCELLED'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {b.status === 'CONFIRMED' ? (
                        <button
                          onClick={() => setRefundBooking(b)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold text-[11px]"
                        >
                          Issue Refund
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Refund Trigger Modal */}
      {refundBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-red-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" /> Issue Razorpay Payment Refund
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to trigger Razorpay API refund for booking{' '}
              <span className="font-mono font-bold text-amber-300">{refundBooking.bookingReference}</span>?
            </p>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Reason for Refund</label>
              <input
                type="text"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-100"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 text-slate-300">
              <p><span className="text-slate-500">Refund Amount:</span> ₹{refundBooking.totalAmount} INR</p>
              <p><span className="text-slate-500">Gateway:</span> Razorpay Merchant API</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setRefundBooking(null)}
                className="px-4 py-2 glass-panel text-slate-400 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleExecuteRefund}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-red-500/20"
              >
                {loading ? 'Processing Refund...' : 'Confirm Razorpay Refund'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
