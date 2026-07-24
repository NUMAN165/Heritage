import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Landmark, User as UserIcon, LogOut, Ticket, Compass, ShieldCheck, Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import api from '../../api/axios';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      {/* Subtle Tiranga Flag Top Ribbon */}
      <div className="tiranga-line w-full"></div>

      <div className="px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-[#FF671F] via-white to-[#046A38] rounded-xl shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform p-[2px]">
            <div className="bg-[#080E1A] p-1.5 rounded-[10px]">
              <Landmark className="w-5 h-5 text-[#FF671F]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF671F] via-slate-100 to-[#046A38] tracking-wider font-serif">
                HERITAGE
              </h1>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#FF671F]/20 text-[#FF671F] border border-[#FF671F]/30 uppercase">
                INDIA
              </span>
            </div>
            <p className="text-[9px] text-slate-400 tracking-widest font-sans uppercase">ASI Official Monument Pass Portal</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className={`hover:text-[#FF671F] transition-colors flex items-center gap-1.5 ${
              location.pathname === '/' ? 'text-[#FF671F] font-semibold' : ''
            }`}
          >
            <Compass className="w-4 h-4" /> Home
          </Link>
          <Link
            to="/sites"
            className={`hover:text-[#FF671F] transition-colors flex items-center gap-1.5 ${
              location.pathname.startsWith('/sites') ? 'text-[#FF671F] font-semibold' : ''
            }`}
          >
            <Landmark className="w-4 h-4" /> Monuments & Sites
          </Link>
          {isAuthenticated && (
            <Link
              to="/bookings"
              className={`hover:text-[#FF671F] transition-colors flex items-center gap-1.5 ${
                location.pathname === '/bookings' ? 'text-[#FF671F] font-semibold' : ''
              }`}
            >
              <Ticket className="w-4 h-4 text-[#046A38]" /> My Tickets
            </Link>
          )}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl glass-panel border-[#FF671F]/30 hover:border-[#FF671F]/60 transition-all text-sm font-medium text-slate-200"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#FF671F] to-[#046A38] flex items-center justify-center text-slate-950 font-bold text-xs uppercase shadow-sm">
                  {user.firstName[0]}
                </div>
                <span>{user.firstName}</span>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl border border-slate-700 py-2 text-sm z-50"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="font-semibold text-slate-100">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    {user.role === 'admin' && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF671F]/20 text-[#FF671F] border border-[#FF671F]/30">
                        ADMINISTRATOR
                      </span>
                    )}
                  </div>

                  <Link
                    to="/bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[#FF671F]/10 text-slate-300 hover:text-[#FF671F] transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-[#046A38]" /> My Passes & Tickets
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#FF671F]/10 text-slate-300 hover:text-[#FF671F] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#FF671F]" /> Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 text-red-400 transition-colors border-t border-slate-800 mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-[#FF671F] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-bold rounded-xl bg-gradient-to-r from-[#FF671F] to-[#E65100] text-slate-950 hover:from-[#FF8534] hover:to-[#FF671F] transition-all shadow-md shadow-[#FF671F]/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-[#FF671F] p-1"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};
