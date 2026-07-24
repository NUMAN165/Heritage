import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Landmark, MapPin, X, Check, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import { HeritageSite } from '../../types';

export const AdminSites: React.FC = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<HeritageSite | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<any>('Fort');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [domesticPrice, setDomesticPrice] = useState(50);
  const [foreignerPrice, setForeignerPrice] = useState(600);
  const [saarcPrice, setSaarcPrice] = useState(300);
  const [childPrice, setChildPrice] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(500);
  const [imageUrl, setImageUrl] = useState('');

  const { data: sites, isLoading } = useQuery<HeritageSite[]>({
    queryKey: ['adminSites'],
    queryFn: async () => {
      const res = await api.get('/sites');
      return res.data.data;
    },
  });

  const openCreateModal = () => {
    setEditingSite(null);
    setName('');
    setSlug('');
    setCategory('Fort');
    setDescription('');
    setState('');
    setCity('');
    setAddress('');
    setDomesticPrice(50);
    setForeignerPrice(600);
    setSaarcPrice(300);
    setChildPrice(0);
    setMaxCapacity(500);
    setImageUrl('');
    setModalOpen(true);
  };

  const openEditModal = (site: HeritageSite) => {
    setEditingSite(site);
    setName(site.name);
    setSlug(site.slug);
    setCategory(site.category);
    setDescription(site.description);
    setState(site.location.state);
    setCity(site.location.city);
    setAddress(site.location.address);
    setDomesticPrice(site.ticketPricing.domesticPrice);
    setForeignerPrice(site.ticketPricing.foreignerPrice);
    setSaarcPrice(site.ticketPricing.saarcPrice);
    setChildPrice(site.ticketPricing.childPrice);
    setMaxCapacity(site.maxCapacityPerSlot);
    setImageUrl(site.images[0] || '');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      description,
      location: { state, city, address },
      images: [imageUrl || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'],
      ticketPricing: {
        domesticPrice: Number(domesticPrice),
        foreignerPrice: Number(foreignerPrice),
        saarcPrice: Number(saarcPrice),
        childPrice: Number(childPrice),
      },
      maxCapacityPerSlot: Number(maxCapacity),
    };

    try {
      if (editingSite) {
        await api.put(`/sites/${editingSite._id}`, payload);
      } else {
        await api.post('/sites', payload);
      }
      queryClient.invalidateQueries({ queryKey: ['adminSites'] });
      setModalOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save monument site');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this monument site?')) {
      try {
        await api.delete(`/sites/${id}`);
        queryClient.invalidateQueries({ queryKey: ['adminSites'] });
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete monument site');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">Monument Sites Management</h1>
          <p className="text-xs text-slate-400 mt-1">Add, update, or remove ASI protected heritage destinations.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> Add New Monument
        </button>
      </div>

      {/* Sites Table */}
      {isLoading ? (
        <div className="glass-panel h-64 rounded-2xl animate-pulse"></div>
      ) : (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Monument</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Domestic Price</th>
                  <th className="py-4 px-6">Foreigner Price</th>
                  <th className="py-4 px-6">Slot Capacity</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {sites?.map((site) => (
                  <tr key={site._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-semibold flex items-center gap-3">
                      <img
                        src={site.images[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=100&q=80'}
                        alt={site.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span>{site.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md glass-panel-gold text-amber-300 text-[10px] font-bold uppercase">
                        {site.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {site.location.city}, {site.location.state}
                    </td>
                    <td className="py-4 px-6 font-bold text-amber-400">₹{site.ticketPricing.domesticPrice}</td>
                    <td className="py-4 px-6 font-bold text-slate-300">₹{site.ticketPricing.foreignerPrice}</td>
                    <td className="py-4 px-6">{site.maxCapacityPerSlot} / slot</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(site)}
                        className="p-1.5 glass-panel hover:bg-slate-800 text-amber-400 rounded-lg border border-amber-500/30"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(site._id)}
                        className="p-1.5 glass-panel hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 border border-amber-500/30 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-serif font-bold text-amber-400">
                {editingSite ? 'Edit Monument Site' : 'Create New Monument Site'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Monument Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Taj Mahal"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    {['Fort', 'Tomb', 'Palace', 'Cave', 'Temple', 'Ancient Monument', 'Museum'].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of the monument history and features..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Uttar Pradesh"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Agra"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Dharmapuri, Tajganj"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Pricing Matrix */}
              <div className="p-4 glass-panel rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider">Ticket Pricing Matrix (INR)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Domestic Adult</label>
                    <input
                      type="number"
                      value={domesticPrice}
                      onChange={(e) => setDomesticPrice(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Foreign Tourist</label>
                    <input
                      type="number"
                      value={foreignerPrice}
                      onChange={(e) => setForeignerPrice(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">SAARC Member</label>
                    <input
                      type="number"
                      value={saarcPrice}
                      onChange={(e) => setSaarcPrice(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Child (&lt;15 Yrs)</label>
                    <input
                      type="number"
                      value={childPrice}
                      onChange={(e) => setChildPrice(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-2 text-slate-100"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Max Capacity / Slot</label>
                  <input
                    type="number"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Image URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 glass-panel text-slate-400 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Save Monument
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
