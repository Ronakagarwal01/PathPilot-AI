import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Key, 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenChat: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onNavigate, currentPage }) => {
  const { user, isAuthenticated, theme, setTheme, apiKey, setApiKey, logout, xp, streak, level } = useApp();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSaveKey = () => {
    setApiKey(keyInput);
    setShowKeyModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 p-0.5 glow-primary transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                PathPilot <span className="text-gradient">AI</span>
              </span>
              <span className="hidden text-[10px] font-medium tracking-widest text-purple-400 uppercase sm:block">
                Ecosystem
              </span>
            </div>
          </div>

          {/* Center navigation preview if authenticated */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  currentPage === 'dashboard' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('roadmap')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  currentPage === 'roadmap' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                AI Roadmap
              </button>
              <button
                onClick={() => onNavigate('interview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  currentPage === 'interview' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mock Interview
              </button>
              <button
                onClick={() => onNavigate('jobs')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  currentPage === 'jobs' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Jobs
              </button>
            </div>
          )}

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            
            {/* Gamification Quick Stats */}
            {isAuthenticated && user && (
              <div className="hidden sm:flex items-center gap-2 mr-1">
                <div 
                  onClick={() => onNavigate('gamification')}
                  className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full cursor-pointer hover:bg-amber-500/20 transition-colors"
                  title="Your Daily Learning Streak"
                >
                  <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-amber-400">{streak}</span>
                </div>

                <div 
                  onClick={() => onNavigate('gamification')}
                  className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full cursor-pointer hover:bg-purple-500/20 transition-colors"
                  title="Your Platform XP & Level"
                >
                  <Award className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs font-bold text-purple-300">Lvl {level}</span>
                  <span className="text-[10px] text-slate-400">({xp} XP)</span>
                </div>
              </div>
            )}

            {/* Configure Real/Mock API Button */}
            <button
              onClick={() => setShowKeyModal(true)}
              className="flex items-center gap-1 rounded-lg bg-slate-900 border border-slate-800 p-2 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
              title="Configure AI API Gateway"
            >
              <Key className="h-4 w-4" />
              {apiKey ? (
                <span className="hidden text-[10px] text-emerald-400 font-medium sm:inline">Active</span>
              ) : (
                <span className="hidden text-[10px] text-slate-500 sm:inline">Setup AI</span>
              )}
            </button>

            {/* AI Career Chatbot Mentor Trigger */}
            <button
              onClick={onOpenChat}
              className="relative flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:from-purple-500 hover:to-blue-500 transition-all glow-primary"
            >
              <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">AI Mentor</span>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </button>

            {/* Theme Control */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-slate-400 hover:text-slate-200 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Profile Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-900 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border border-purple-500/40"
                  />
                  <ChevronDown className="h-3 w-3 text-slate-400 hidden sm:block" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1 z-50">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <span className="mt-1 inline-block px-2 py-0.5 text-[10px] font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/40 rounded">
                        Role: {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { onNavigate('dashboard'); setShowUserMenu(false); }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                      >
                        <User className="h-3.5 w-3.5" />
                        Student Profile
                      </button>
                      <button
                        onClick={() => { onNavigate('gamification'); setShowUserMenu(false); }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                      >
                        <Award className="h-3.5 w-3.5" />
                        Achievements
                      </button>
                      <button
                        onClick={() => { onNavigate('admin'); setShowUserMenu(false); }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                      >
                        <Layers className="h-3.5 w-3.5" />
                        Admin Panel
                      </button>
                    </div>

                    <div className="border-t border-slate-800 py-1">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); onNavigate('landing'); }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-950/30"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Sign In
              </button>
            )}

          </div>

        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI Engine Configuration</h3>
                <p className="text-xs text-slate-400">Connect your custom API gateway for live output</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  OpenAI / Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  placeholder="sk-proj-..."
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Keys are stored locally in your browser session. If empty, the platform automatically activates our High-Fidelity Pre-trained Hackathon Engine.
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 mb-1">
                  <Sparkles className="h-3 w-3" />
                  Hackathon Mode Activated
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All interactive features (Mock Interviews, Resume Scans, Adaptive Tests, and Chatbots) work beautifully out-of-the-box using embedded context simulators for lightning-fast demo responses!
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveKey}
                  className="px-4 py-1.5 rounded-lg bg-purple-600 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-md"
                >
                  Save Gateway
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
