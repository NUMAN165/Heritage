import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter, SlidersHorizontal, Landmark, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { HeritageSite } from '../types';

const CATEGORIES = ['All', 'Fort', 'Tomb', 'Palace', 'Cave', 'Temple', 'Ancient Monument', 'Museum'];
const STATES = ['All States', 'Delhi', 'Uttar Pradesh', 'Rajasthan', 'Maharashtra', 'Karnataka', 'Madhya Pradesh'];

export const SiteListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [state, setState] = useState(searchParams.get('state') || 'All States');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'All');
    setState(searchParams.get('state') || 'All States');
  }, [searchParams]);

  const { data: sites, isLoading } = useQuery<HeritageSite[]>({
    queryKey: ['sites', search, category, state],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category !== 'All') params.set('category', category);
      if (state !== 'All States') params.set('state', state);

      const res = await api.get(`/sites?${params.toString()}`);
      return res.data.data;
    },
  });

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category !== 'All') params.set('category', category);
    if (state !== 'All States') params.set('state', state);
    setSearchParams(params);
    setFilterDrawerOpen(false);
  };

  const handleReset = () => {
    setSearch('');
    setCategory('All');
    setState('All States');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col py-10 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-amber-400 font-serif">Monuments & Heritage Sites</h1>
          <p className="text-xs text-slate-400 mt-1">Book ticket passes for archaeological sites across India.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
              placeholder="Search by name, city, fort..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="md:hidden glass-panel px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-400 flex items-center gap-1.5 border border-amber-500/30"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block glass-panel p-6 rounded-2xl border border-amber-500/20 h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-serif font-bold text-slate-200 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" /> Filter Options
            </h3>
            <button onClick={handleReset} className="text-[11px] text-amber-400 hover:underline">
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Category</label>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    category === cat
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* State Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-500/20"
          >
            Apply Filters
          </button>
        </aside>

        {/* Sites Main Grid */}
        <main className="md:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-panel h-72 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : sites && sites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site) => (
                <div
                  key={site._id}
                  className="glass-panel rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={site.images[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg glass-panel text-amber-400 text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {site.rating?.avgRating || 4.9}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md glass-panel-gold text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      {site.category}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-100 line-clamp-1">{site.name}</h3>
                      <p className="text-slate-400 text-xs flex items-center gap-1 mt-1 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" /> {site.location.city}, {site.location.state}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Indian Adult</span>
                        <span className="text-sm font-bold text-amber-400">₹{site.ticketPricing.domesticPrice}</span>
                      </div>
                      <Link
                        to={`/sites/${site.slug}`}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/10"
                      >
                        Book Ticket
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel py-16 px-6 rounded-2xl text-center">
              <Landmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-slate-300">No Monument Sites Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No sites match your selected state or category filter. Try clearing filters to see all destinations.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold hover:bg-amber-500/20"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
