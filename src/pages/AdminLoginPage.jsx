import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials. Access Restricted.');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-borderlight bg-white shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-cream border border-borderlight flex items-center justify-center mx-auto text-gold-700 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal-800">Vedik CRM Portal</h1>
          <p className="text-xs text-slate-500 font-medium">Authorized Administrator Authentication</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-gold-600" /> Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vedikrealty@gmail.com"
              className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-gold-600" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4 shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            <span>Access Dashboard</span>
          </button>
        </form>

      </div>
    </div>
  );
}
