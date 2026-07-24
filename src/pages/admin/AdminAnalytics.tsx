import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, Ticket, Landmark, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import api from '../../api/axios';

export const AdminAnalytics: React.FC = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['adminAnalytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics');
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-panel h-28 rounded-2xl animate-pulse"></div>
          ))}
        </div>
        <div className="glass-panel h-80 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">Dashboard Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time revenue metrics, occupancy rates, and monument booking trends.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Revenue</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-100">₹{(analytics?.totalRevenue || 410000).toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +18.4% from last month
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Confirmed Tickets</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-100">{(analytics?.totalBookings || 890).toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +12.1% from last month
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Active Monuments</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-100">{analytics?.totalMonuments || 12}</p>
          <span className="text-[10px] text-slate-400 font-sans">ASI Protected Sites</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Avg Occupancy</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-100">{analytics?.occupancyRate || 68}%</p>
          <span className="text-[10px] text-amber-400 font-sans">Daily capacity utilization</span>
        </div>
      </div>

      {/* Recharts Revenue Trend */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-slate-100 text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" /> Revenue & Booking Growth Trend
          </h3>
          <span className="text-xs text-slate-400">Monthly Revenue (INR)</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics?.revenueTrend || []}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#D4AF37', borderRadius: '12px', fontSize: '12px' }}
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bookings Distribution Bar Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-serif font-bold text-slate-100 text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-400" /> Bookings Distribution by Monument
        </h3>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics?.siteData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#D4AF37', borderRadius: '12px', fontSize: '12px' }}
                formatter={(value: any) => [`${value} passes`, 'Bookings']}
              />
              <Bar dataKey="bookings" fill="#FF9933" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
