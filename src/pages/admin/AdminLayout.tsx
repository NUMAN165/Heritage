import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Landmark, Calendar, Ticket, MessageSquare, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { label: 'Analytics', path: '/admin', icon: LayoutDashboard },
    { label: 'Monuments & Sites', path: '/admin/sites', icon: Landmark },
    { label: 'Slot Management', path: '/admin/slots', icon: Calendar },
    { label: 'Bookings & Refunds', path: '/admin/bookings', icon: Ticket },
    { label: 'Review Moderation', path: '/admin/reviews', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-slate-950">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-amber-400 text-base tracking-wide">ASI ADMIN</h2>
              <p className="text-[10px] text-slate-400 font-sans uppercase">Control Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'text-slate-400 hover:text-amber-400 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
