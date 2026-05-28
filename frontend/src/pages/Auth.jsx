import React, { useState } from 'react';
import { Shield, Mail, Lock, ArrowRight, CheckCircle2, User } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulated credential check for 'login' mode
    const correctEmail = 'admin@eco.com';
    const correctPassword = 'password123';

    setTimeout(() => {
      setLoading(false);
      
      if (mode === 'login') {
        if (email === correctEmail && password === correctPassword) {
          onLogin();
        } else {
          setError('Invalid work credentials. Please verify your email and security key.');
        }
      } else {
        // Sign up simulation always succeeds
        onLogin();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden font-inter text-slate-900">
      {/* Abstract Background Design */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[500px] bg-white rounded-[56px] shadow-2xl overflow-hidden relative z-10 p-12 md:p-14 transition-all duration-500">
        {/* Login/Signup Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-12 w-fit mx-auto">
          <button 
            onClick={() => { setMode('login'); setError(''); }}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Sign In
          </button>
          <button 
            onClick={() => { setMode('signup'); setError(''); }}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Register
          </button>
        </div>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/20 rotate-3 transition-transform hover:rotate-6">
            <Shield size={40} className="text-white -rotate-3" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Eco-Data-Validator</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Enterprise Sustainability Suite</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
               <Shield size={16} />
            </div>
            <p className="text-xs font-bold text-rose-600 leading-snug">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Auditor"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
              {mode === 'login' && <button type="button" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Forgot?</button>}
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group shadow-2xl active:scale-95 flex items-center justify-center gap-3 ${
              loading 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:shadow-emerald-500/20'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-3 border-slate-300 border-t-emerald-500 rounded-full animate-spin"></div>
            ) : (
              <>
                {mode === 'login' ? 'Access Dashboard' : 'Create Auditor Account'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
        Secure Enterprise Authentication Platform
      </div>
    </div>
  );
};

export default Auth;
