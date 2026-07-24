import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Star, Ticket, ShieldCheck, Landmark, Compass, ArrowRight, Clock, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { HeritageSite } from '../types';

const CATEGORIES = ['All', 'Fort', 'Tomb', 'Palace', 'Cave', 'Temple', 'Ancient Monument', 'Museum'];

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const { data: sites, isLoading } = useQuery<HeritageSite[]>({
    queryKey: ['featuredSites'],
    queryFn: async () => {
      const res = await api.get('/sites?isFeatured=true');
      return res.data.data;
    },
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    navigate(`/sites?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-amber-500/30 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-amber-400" /> ASI Official Monument Pass Portal
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 tracking-tight font-serif mb-6 leading-tight">
          Explore India's Timeless Grandeur
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed font-sans">
          Seamlessly book entry passes for over 3,000 protected national monuments, UNESCO World Heritage sites, and ancient royal forts across all Indian states.
        </p>

        {/* Hero Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-3xl glass-panel p-2.5 rounded-2xl flex flex-col sm:flex-row items-center gap-3 border border-amber-500/30 shadow-2xl"
        >
          <div className="flex items-center gap-3 w-full px-3 py-1">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Taj Mahal, Red Fort, Qutub Minar, Hampi, Ajanta Caves..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 shrink-0 flex items-center justify-center gap-2"
          >
            Find Tickets <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-3xl">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                navigate(`/sites?category=${category === 'All' ? '' : category}`);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'glass-panel text-slate-300 hover:text-amber-400 border-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Value Badges */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/20">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-200 text-base mt-1">Instant QR E-Tickets</h3>
            <p className="text-xs text-slate-400">Scan digital QR passes directly at gate turnstiles without waiting in queue.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-200 text-base mt-1">Timed Entry Slots</h3>
            <p className="text-xs text-slate-400">Guaranteed timed entry slots preventing overcrowding and long wait lines.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-200 text-base mt-1">Official ASI Tariff</h3>
            <p className="text-xs text-slate-400">Verified government pricing with transparent breakdowns for domestic & international tourists.</p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="px-6 max-w-6xl mx-auto py-16 flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase font-sans">Curated Destinations</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 mt-1">Featured Heritage Sites</h2>
          </div>
          <Link
            to="/sites"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 glass-panel px-4 py-2 rounded-xl border border-amber-500/30"
          >
            Explore All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel h-80 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(sites && sites.length > 0
              ? sites
              : [
                  {
                    _id: '1',
                    name: 'Taj Mahal',
                    slug: 'taj-mahal',
                    description: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648.',
                    location: { city: 'Agra', state: 'Uttar Pradesh', address: 'Dharmapuri, Forest Colony, Tajganj' },
                    category: 'World Heritage Site',
                    images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'],
                    ticketPricing: { domesticPrice: 50, foreignerPrice: 1100, saarcPrice: 540, childPrice: 0 },
                    rating: { avgRating: 4.9, numReviews: 1240 },
                  },
                  {
                    _id: '2',
                    name: 'Qutub Minar',
                    slug: 'qutub-minar',
                    description: 'A 73-metre high tower of victory, built in 1193 by Qutab-ud-din Aibak.',
                    location: { city: 'New Delhi', state: 'Delhi', address: 'Mehrauli, New Delhi' },
                    category: 'Ancient Monument',
                    images: ['https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'],
                    ticketPricing: { domesticPrice: 40, foreignerPrice: 600, saarcPrice: 300, childPrice: 0 },
                    rating: { avgRating: 4.8, numReviews: 980 },
                  },
                  {
                    _id: '3',
                    name: 'Red Fort (Lal Qila)',
                    slug: 'red-fort',
                    description: 'Historic fort in Old Delhi that served as the main residence of the Mughal Emperors.',
                    location: { city: 'Old Delhi', state: 'Delhi', address: 'Netaji Subhash Marg, Chandni Chowk' },
                    category: 'Fort',
                    images: ['https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80'],
                    ticketPricing: { domesticPrice: 50, foreignerPrice: 600, saarcPrice: 300, childPrice: 0 },
                    rating: { avgRating: 4.7, numReviews: 850 },
                  },
                ]
            ).map((site: any) => (
              <div
                key={site._id}
                className="glass-panel rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={site.images[0]}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass-panel text-amber-400 text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {site.rating?.avgRating || 4.9}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg glass-panel-gold text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                    {site.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-100">{site.name}</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> {site.location.city}, {site.location.state}
                    </p>
                    <p className="text-slate-400 text-xs mt-3 line-clamp-2 leading-relaxed">
                      {site.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Indian Resident</span>
                      <span className="text-base font-bold text-amber-400">₹{site.ticketPricing.domesticPrice}</span>
                    </div>
                    <Link
                      to={`/sites/${site.slug}`}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/10"
                    >
                      Book Ticket
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
