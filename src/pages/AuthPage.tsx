import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  UserCheck, 
  ArrowRight, 
  User, 
  ShieldCheck, 
  Briefcase 
} from 'lucide-react';
import { useApp, UserRole } from '../context/AppContext';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const { login } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('Student');

  const roles: { id: UserRole; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { id: 'Student', label: 'Student / Learner', icon: User, desc: 'Upskill, take AI mock interviews, and land top-tier placement offers.' },
    { id: 'Mentor', label: 'AI Mentor / Expert', icon: UserCheck, desc: 'Contribute learning frameworks and assess coding implementations.' },
    { id: 'Recruiter', label: 'Recruiter / HR', icon: Briefcase, desc: 'Source verified talent matching exact ATS keyword queries.' },
    { id: 'Admin', label: 'Platform Admin', icon: ShieldCheck, desc: 'Monitor system inference latency, add companies, and view reports.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = email || (role === 'Student' ? 'alex.rivera@stanford.edu' : `demo.${role.toLowerCase()}@pathpilot.ai`);
    const finalName = name || undefined;
    
    login(finalEmail, role, finalName);
    
    // Redirect contextually
    if (role === 'Admin') {
      onNavigate('admin');
    } else {
      onNavigate('dashboard');
    }
  };

  const handleGoogleAuth = () => {
    login('google.scholar@pathpilot.ai', role, 'Google Auth Scholar');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 relative">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10 backdrop-blur-md animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 p-0.5 glow-primary mb-3">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
              <Sparkles className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {isSignUp ? 'Create Your Pilot Account' : 'Welcome Back to PathPilot'}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            {isSignUp 
              ? 'Join the unified education-to-employment ecosystem' 
              : 'Sign in to sync your active roadmap and application state'
            }
          </p>
        </div>

        {/* Role Selectors */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
            Select Your Access Role
          </label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = role === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                  <span className="text-xs text-center">{r.label.split(' / ')[0]}</span>
                </button>
              );
            })}
          </div>
          
          <p className="mt-2 text-[10px] text-slate-500 text-center italic">
            {roles.find(r => r.id === role)?.desc}
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required={isSignUp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'Student' ? "alex.rivera@stanford.edu" : `demo.${role.toLowerCase()}@pathpilot.ai`}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>
            <p className="mt-1 text-[9px] text-slate-500">
              Leave empty to automatically populate pre-configured hackathon persona credentials.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-md glow-primary"
          >
            <span>{isSignUp ? 'Launch Platform Access' : 'Sign In Contextually'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

        </form>

        {/* Google simulated trigger */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-slate-950 border border-slate-800 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google Enterprise</span>
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-purple-400 hover:text-purple-300 font-medium"
          >
            {isSignUp 
              ? 'Already have a session? Sign in' 
              : "Don't have an account? Sign up instantly"
            }
          </button>
        </div>

      </div>

    </div>
  );
};
