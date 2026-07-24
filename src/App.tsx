import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { Home } from './pages/Home';
import { SiteListing } from './pages/SiteListing';
import { SiteDetail } from './pages/SiteDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { OAuthSuccess } from './pages/OAuthSuccess';
import { MyBookings } from './pages/MyBookings';

import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSites } from './pages/admin/AdminSites';
import { AdminSlots } from './pages/admin/AdminSlots';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminReviews } from './pages/admin/AdminReviews';

import { useAuthStore } from './store/authStore';
import api from './api/axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const { setAuth, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    // Attempt silent session restore on initial app load
    api
      .get('/auth/me')
      .then((res) => {
        const user = res.data.data.user;
        setAuth(user, '');
      })
      .catch(() => {
        clearAuth();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setAuth, setLoading, clearAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/sites" element={<SiteListing />} />
              <Route path="/sites/:slug" element={<SiteDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />

              {/* Protected User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/bookings" element={<MyBookings />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminAnalytics />} />
                  <Route path="sites" element={<AdminSites />} />
                  <Route path="slots" element={<AdminSlots />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="reviews" element={<AdminReviews />} />
                </Route>
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}
