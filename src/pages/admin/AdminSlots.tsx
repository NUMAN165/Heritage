import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Plus, Clock, Check, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import { HeritageSite } from '../../types';

export const AdminSlots: React.FC = () => {
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => {
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return end.toISOString().split('T')[0];
  });
  const [capacity, setCapacity] = useState(500);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { data: sites } = useQuery<HeritageSite[]>({
    queryKey: ['adminSitesList'],
    queryFn: async () => {
      const res = await api.get('/sites');
      return res.data.data;
    },
  });

  const handleBulkGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSiteId) {
      alert('Please select a monument site first');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post(`/sites/${selectedSiteId}/slots/generate`, {
        startDate,
        endDate,
        capacity: Number(capacity),
      });

      setMessage(`✅ Successfully generated ${res.data.data.count} slots across date range!`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to generate slots');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">Slot Management & Bulk Generation</h1>
        <p className="text-xs text-slate-400 mt-1">Batch generate visitor entry slots for sites across custom date ranges.</p>
      </div>

      <div className="max-w-2xl glass-panel p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-100 text-base">Bulk Generate Timed Slots</h3>
            <p className="text-xs text-slate-400">Creates 4 standard daily time slots for entry pass reservations.</p>
          </div>
        </div>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleBulkGenerate} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Select Monument Site</label>
            <select
              required
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
            >
              <option value="">-- Choose Monument Site --</option>
              {sites?.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name} ({site.location.city}, {site.location.state})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1">Start Date</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1">End Date</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Slot Capacity Limit</label>
            <input
              type="number"
              required
              min={10}
              max={5000}
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
            />
            <span className="text-[10px] text-slate-500 block mt-1">Maximum visitors permitted per 3-hour time slot.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
          >
            {loading ? 'Generating Slots...' : 'Execute Bulk Slot Generation'}
          </button>
        </form>
      </div>
    </div>
  );
};
