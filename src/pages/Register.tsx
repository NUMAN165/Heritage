import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Mail, Lock, User, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

export const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      const { user, accessToken } = response.data.data;
      setAuth(user, accessToken);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto space-y-8 glass-panel p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 mb-4">
            <Landmark className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-amber-400 font-serif">Create Account</h2>
          <p className="mt-2 text-xs text-slate-400 font-sans">
            Register to book ASI monument entry passes across India.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Rohan"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sharma"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2 px-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rohan@example.com"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">Mobile Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Creating Account...' : 'Register'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-amber-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};
