import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setAccessToken } from '../api/axios';

import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

export const OAuthSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setAccessToken(token);
      api
        .get('/auth/me')
        .then((res) => {
          const user = res.data.data.user;
          setAuth(user, token);
          navigate('/');
        })
        .catch(() => {
          navigate('/login?error=oauth_fetch_failed');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
      <p className="text-amber-400 font-serif text-sm">Completing Google Authentication...</p>
    </div>
  );
};
