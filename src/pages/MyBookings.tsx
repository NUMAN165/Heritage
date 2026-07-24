import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Ticket, Calendar, Clock, MapPin, Download, QrCode, AlertCircle, CheckCircle2, XCircle, RefreshCw, AlertTriangle, X } from 'lucide-react';
import api from '../api/axios';
import { Booking } from '../types';

export const MyBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');
  const [selectedQrBooking, setSelectedQrBooking] = useState<Booking | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);

  const { data: bookings, isLoading, refetch } = useQuery<Booking[]>({
    queryKey: ['myBookings'],
    queryFn: async () => {
      const res = await api.get('/bookings/my-bookings');
      return res.data.data;
    },
  });

  const now = new Date();

  const upcomingBookings = bookings?.filter((b) => {
    const visitDate = new Date(b.visitDate);
    return visitDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate()) && b.status !== 'CANCELLED';
  }) || [];

  const pastBookings = bookings?.filter((b) => {
    const visitDate = new Date(b.visitDate);
    return visitDate < new Date(now.getFullYear(), now.getMonth(), now.getDate()) || b.status === 'CANCELLED';
  }) || [];

  const currentList = activeTab === 'UPCOMING' ? upcomingBookings : pastBookings;

  // Calculate Refund Eligibility
  const getRefundPolicy = (visitDateStr: string) => {
    const visitDate = new Date(visitDateStr);
    const diffHours = (visitDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours > 48) {
      return { percentage: 100, text: 'Full Refund (100%) eligible as visit date is >48 hours away.' };
    } else if (diffHours >= 24) {
      return { percentage: 50, text: 'Partial Refund (50%) eligible as visit date is between 24-48 hours away.' };
    }
    return { percentage: 0, text: 'No refund eligible as visit date is less than 24 hours away.' };
  };

  const handleCancelBooking = async () => {
    if (!cancelModalBooking) return;
    try {
      // In production calls cancellation endpoint
      setCancelModalBooking(null);
      refetch();
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-amber-400 font-serif flex items-center gap-3">
            <Ticket className="w-8 h-8 text-amber-500" /> My Monument Passes
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage your active e-tickets, download PDFs, and view booking history.</p>
        </div>

        {/* Tab Selector */}
        <div className="glass-panel p-1 rounded-xl flex items-center gap-1 border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'UPCOMING'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Upcoming Passes ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('PAST')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'PAST'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Past & Cancelled ({pastBookings.length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-panel h-48 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : currentList.length > 0 ? (
        <div className="space-y-4">
          {currentList.map((booking: any) => {
            const site = booking.site || {};
            const isConfirmed = booking.status === 'CONFIRMED';
            const isCancelled = booking.status === 'CANCELLED';

            return (
              <div
                key={booking._id}
                className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl"
              >
                {/* Left Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isConfirmed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isCancelled
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {booking.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300">
                      REF: {booking.bookingReference}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-100">{site.name || 'Heritage Monument'}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-sans pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{new Date(booking.visitDate).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{booking.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-amber-400" />
                      <span>{booking.visitors?.length || 1} Visitor(s)</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                  {isConfirmed && (
                    <>
                      <button
                        onClick={() => setSelectedQrBooking(booking)}
                        className="px-4 py-2 glass-panel hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5"
                      >
                        <QrCode className="w-4 h-4" /> View QR
                      </button>

                      {booking.ticketPdfUrl ? (
                        <a
                          href={booking.ticketPdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/10"
                        >
                          <Download className="w-4 h-4" /> Download PDF
                        </a>
                      ) : null}

                      {activeTab === 'UPCOMING' && (
                        <button
                          onClick={() => setCancelModalBooking(booking)}
                          className="px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl"
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel py-16 px-6 rounded-3xl text-center">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-slate-300">No {activeTab.toLowerCase()} passes found</h3>
          <p className="text-xs text-slate-500 mt-1">Book entry tickets to Taj Mahal, Red Fort, and other monuments.</p>
        </div>
      )}

      {/* QR Code Viewer Modal */}
      {selectedQrBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-sm rounded-3xl p-6 border border-amber-500/30 shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-400">ENTRY QR PASS</span>
              <button onClick={() => setSelectedQrBooking(null)} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedQrBooking.qrCodeUrl && (
              <div className="p-4 bg-white rounded-2xl inline-block shadow-2xl">
                <img src={selectedQrBooking.qrCodeUrl} alt="Ticket QR" className="w-44 h-44 mx-auto" />
              </div>
            )}

            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-serif font-bold text-amber-300">{selectedQrBooking.bookingReference}</p>
              <p className="text-slate-400 text-[11px]">{selectedQrBooking.timeSlot}</p>
              <p className="text-[10px] text-slate-500 mt-2">Present this QR code to entry gate turnstiles.</p>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation & Refund Policy Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-red-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" /> Cancel Monument Booking
            </div>

            <p className="text-xs text-slate-300">
              Are you sure you want to cancel pass <span className="font-bold text-amber-300">{cancelModalBooking.bookingReference}</span>?
            </p>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <span className="font-bold block mb-1">Refund Eligibility Policy:</span>
              <p>{getRefundPolicy(cancelModalBooking.visitDate as any).text}</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2 glass-panel text-slate-300 text-xs font-semibold rounded-xl"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-red-500/20"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
