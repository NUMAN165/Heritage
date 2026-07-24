import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Star, Ticket, Clock, ShieldCheck, AlertCircle, Calendar, MessageSquare, ChevronRight, Check } from 'lucide-react';
import api from '../api/axios';
import { HeritageSite } from '../types';
import { BookingModal } from '../components/booking/BookingModal';

export const SiteDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: site, isLoading, isError } = useQuery<HeritageSite>({
    queryKey: ['site', slug],
    queryFn: async () => {
      const res = await api.get(`/sites/${slug}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-amber-400 font-serif text-sm">Loading Monument Details...</p>
        </div>
      </div>
    );
  }

  if (isError || !site) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
        <h2 className="text-2xl font-serif font-bold text-slate-100">Heritage Site Not Found</h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">The monument URL you requested does not exist or has been updated.</p>
        <Link to="/sites" className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs">
          Browse All Sites
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/sites" className="hover:text-amber-400">Sites</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-amber-400 font-semibold">{site.name}</span>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass-panel-gold text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            {site.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-amber-400 font-serif">{site.name}</h1>
          <p className="text-slate-400 text-xs sm:text-sm flex items-center gap-2 mt-2 font-sans">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            {site.location.address}, {site.location.city}, {site.location.state}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-2 border border-amber-500/20">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <div>
              <span className="text-base font-bold text-slate-100">{site.rating?.avgRating || 4.9}</span>
              <span className="text-[10px] text-slate-400 block font-sans">
                {site.rating?.numReviews || 120} Reviews
              </span>
            </div>
          </div>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
          >
            <Ticket className="w-5 h-5" /> Book Entry Pass
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="space-y-3">
        <div className="h-[420px] rounded-3xl overflow-hidden glass-panel border border-amber-500/20 relative shadow-2xl">
          <img
            src={
              site.images[selectedImage] ||
              'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
            }
            alt={site.name}
            className="w-full h-full object-cover"
          />
        </div>

        {site.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {site.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImage === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Description & Context */}
        <div className="md:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-xl font-serif font-bold text-amber-400">About the Monument</h2>
            <p className="text-slate-300 text-sm leading-relaxed font-sans">{site.description}</p>
            {site.historicalContext && (
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <h3 className="text-sm font-serif font-bold text-slate-200 mb-2">Historical Significance</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{site.historicalContext}</p>
              </div>
            )}
          </div>

          {/* Rules & Guidelines */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-xl font-serif font-bold text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" /> Visitor Rules & Guidelines
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              {(site.rules && site.rules.length > 0
                ? site.rules
                : [
                    'Valid Government Photo ID mandatory',
                    'Tickets valid strictly for designated time slot',
                    'Free entry for children under 15 years',
                    'No plastic bags or inflammable items inside',
                  ]
              ).map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Location Embed */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-xl font-serif font-bold text-amber-400 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" /> Monument Location
            </h2>
            <div className="h-64 rounded-2xl overflow-hidden glass-panel border border-slate-700 relative">
              <iframe
                title="Monument Location"
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${site.name}, ${site.location.city}, ${site.location.state}`
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Timings */}
        <div className="space-y-6">
          {/* Ticket Matrix */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4">
            <h3 className="text-lg font-serif font-bold text-amber-400">Official Ticket Tariff</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200 block">Indian Resident (Adult)</span>
                  <span className="text-[10px] text-slate-400">Aadhaar / Voter ID / DL</span>
                </div>
                <span className="text-base font-bold text-amber-400">₹{site.ticketPricing.domesticPrice}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200 block">Foreign Tourist</span>
                  <span className="text-[10px] text-slate-400">Valid Passport & Visa</span>
                </div>
                <span className="text-base font-bold text-amber-400">₹{site.ticketPricing.foreignerPrice}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200 block">SAARC / BIMSTEC</span>
                  <span className="text-[10px] text-slate-400">SAARC Member Country ID</span>
                </div>
                <span className="text-base font-bold text-amber-400">₹{site.ticketPricing.saarcPrice}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div>
                  <span className="font-bold text-emerald-300 block">Child (Under 15 Yrs)</span>
                  <span className="text-[10px] text-emerald-400">Age verification at gate</span>
                </div>
                <span className="text-base font-bold text-emerald-400">
                  {site.ticketPricing.childPrice === 0 ? 'FREE' : `₹${site.ticketPricing.childPrice}`}
                </span>
              </div>
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              Book Entry Pass Now
            </button>
          </div>

          {/* Timings Box */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-serif font-bold text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Operating Hours
            </h3>
            <div className="text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Opening Time:</span>
                <span className="font-semibold text-slate-200">{site.operatingHours?.openTime || '06:00 AM'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Closing Time:</span>
                <span className="font-semibold text-slate-200">{site.operatingHours?.closeTime || '06:00 PM'}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 text-red-400">
                <span>Closed Days:</span>
                <span className="font-bold">
                  {site.operatingHours?.closedDays?.length
                    ? site.operatingHours.closedDays.join(', ')
                    : 'None (Open 7 Days)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal site={site} isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
};
