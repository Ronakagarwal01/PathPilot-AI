import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Target, 
  BookOpen, 
  CheckSquare, 
  Mic, 
  FileText, 
  Briefcase, 
  Code2, 
  Trophy, 
  Building2, 
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const { user } = useApp();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: '' },
    { id: 'roadmap', label: 'AI Roadmap', icon: Map, badge: 'Live' },
    { id: 'skills', label: 'Skill Gap Analysis', icon: Target, badge: '' },
    { id: 'crt', label: 'CRT & Aptitude Prep', icon: BookOpen, badge: '' },
    { id: 'tests', label: 'Mock Test System', icon: CheckSquare, badge: 'Adaptive' },
    { id: 'interview', label: 'AI Mock Interview', icon: Mic, badge: 'Voice' },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText, badge: 'ATS' },
    { id: 'jobs', label: 'Job & Internship', icon: Briefcase, badge: 'Match' },
    { id: 'coding', label: 'Coding Platform', icon: Code2, badge: 'Judge0' },
    { id: 'company', label: 'Company-Wise Prep', icon: Building2, badge: 'Tier-1' },
    { id: 'gamification', label: 'Gamification', icon: Trophy, badge: 'XP' },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-slate-800 bg-slate-950 min-h-[calc(100vh-4rem)] p-4">
      
      {/* Student Fast Card */}
      {user && (
        <div className="mb-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 p-3 border border-slate-800/80 shadow-inner">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-10 w-10 rounded-lg object-cover border border-purple-500/30"
              />
              <span className="absolute bottom-[-2px] right-[-2px] flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950"></span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-purple-400 font-medium truncate">{user.targetRole}</p>
              <p className="text-[9px] text-slate-500 truncate">{user.university}</p>
            </div>
          </div>
          
          {/* Quick Target Readiness Bar */}
          <div className="mt-3 pt-2 border-t border-slate-800/60">
            <div className="flex justify-between text-[10px] font-medium text-slate-400 mb-1">
              <span>Readiness Score</span>
              <span className="text-emerald-400 font-bold">78%</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Core Ecosystem
        </p>
        
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/20 to-transparent text-purple-300 border-l-2 border-purple-500 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                  item.badge === 'Live' || item.badge === 'Voice'
                    ? 'bg-purple-950 text-purple-400 border border-purple-800/50'
                    : item.badge === 'Adaptive'
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/50'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Admin Quick Switch */}
      <div className="mt-8 pt-4 border-t border-slate-800/80">
        <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Management
        </p>
        <button
          onClick={() => onNavigate('admin')}
          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
            currentPage === 'admin'
              ? 'bg-gradient-to-r from-purple-600/20 to-transparent text-purple-300 border-l-2 border-purple-500 font-semibold'
              : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          <span>Admin Panel</span>
        </button>
      </div>

      {/* Premium investor guarantee label */}
      <div className="mt-6 rounded-lg bg-slate-900/40 border border-slate-800 p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 mb-1">
          <span className="text-purple-400">⚡</span> Powered by PathPilot
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Enterprise fine-tuned models guaranteeing direct employment transitions.
        </p>
      </div>

    </aside>
  );
};
