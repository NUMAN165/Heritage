import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Star, Trash2, ShieldCheck } from 'lucide-react';
import api from '../../api/axios';

export const AdminReviews: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['adminReviewsList'],
    queryFn: async () => {
      const res = await api.get('/reviews');
      return res.data.data;
    },
  });

  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user review?')) {
      try {
        await api.delete(`/reviews/${id}`);
        queryClient.invalidateQueries({ queryKey: ['adminReviewsList'] });
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">Review Moderation</h1>
        <p className="text-xs text-slate-400 mt-1">Inspect and moderate user reviews and ratings across monument sites.</p>
      </div>

      {/* Reviews Table */}
      {isLoading ? (
        <div className="glass-panel h-64 rounded-2xl animate-pulse"></div>
      ) : reviews && reviews.length > 0 ? (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Monument</th>
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Comment</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {reviews.map((r: any) => (
                  <tr key={r._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-6 font-semibold">{r.site?.name || 'Monument'}</td>
                    <td className="py-4 px-6 font-medium">
                      {r.user?.firstName} {r.user?.lastName}
                    </td>
                    <td className="py-4 px-6 font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {r.rating} / 5
                    </td>
                    <td className="py-4 px-6 text-slate-300 max-w-xs truncate">{r.comment}</td>
                    <td className="py-4 px-6 text-slate-400">{new Date(r.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteReview(r._id)}
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
      ) : (
        <div className="glass-panel py-16 px-6 rounded-3xl text-center">
          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-slate-300">No Reviews Posted Yet</h3>
        </div>
      )}
    </div>
  );
};
