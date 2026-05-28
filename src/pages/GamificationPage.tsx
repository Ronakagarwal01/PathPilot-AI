import React from 'react';
import { 
  Trophy, 
  Award, 
  Flame, 
  Star, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Users, 
  Compass,
  Code
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GamificationPage: React.FC = () => {
  const { user, xp, streak, level, badges, unlockBadge } = useApp();

  const allBadges = [
    { id: 'Aptitude Master', name: 'Aptitude Master', icon: Trophy, desc: 'Achieve 90%+ accuracy across 5 distinct Quantitative test modules.', xpRequired: 0, unlocked: true },
    { id: 'Early Adopter', name: 'Early Adopter', icon: Star, desc: 'Configured your custom institutional curriculum blueprint.', xpRequired: 0, unlocked: true },
    { id: 'AI Navigator', name: 'AI Navigator', icon: Compass, desc: 'Interrogated the AI Chatbot Mentor with 10+ custom advanced engineering queries.', xpRequired: 0, unlocked: true },
    { id: 'Code Samurai', name: 'Code Samurai', icon: Code, desc: 'Submitted an algorithm solution beating 90% runtime execution bounds.', xpRequired: 0, unlocked: true },
    { id: '7-Day Streak', name: '7-Day Streak', icon: Flame, desc: 'Maintained consecutive daily engagement telemetry.', xpRequired: 0, unlocked: true },
    
    // Unlockable via XP milestones
    { id: 'Interview Expert', name: 'Interview Expert', icon: Award, desc: 'Score above 90% in voice evaluation confidence metrics.', xpRequired: 4000, unlocked: false },
    { id: 'Coding Champion', name: 'Coding Champion', icon: Zap, desc: 'Solve all 5 capstone roadmap portfolio problems.', xpRequired: 4500, unlocked: false },
    { id: 'FAANG Ready', name: 'FAANG Ready', icon: Users, desc: 'Achieve 100% keyword sync across resume, test, and code outputs.', xpRequired: 5000, unlocked: false },
  ];

  const nextTierXp = level * 600;
  const currentTierProgress = Math.round(((xp - ((level - 1) * 600)) / 600) * 100);

  const globalLeaderboard = [
    { rank: 1, name: "Priya Sharma", role: "Data Scientist", xp: 5420, level: 9, streak: 28 },
    { rank: 2, name: "David Chen", role: "Systems Engineer", xp: 4890, level: 8, streak: 21 },
    { rank: 3, name: "Marcus Vance", role: "Full Stack Dev", xp: 4120, level: 7, streak: 16 },
    { rank: 4, name: `${user?.name || 'Alex Rivera'} (You)`, role: user?.targetRole || "Data Scientist", xp: xp, level: level, streak: streak },
    { rank: 5, name: "Sarah Jenkins", role: "AI Researcher", xp: 3100, level: 5, streak: 12 },
    { rank: 6, name: "Elena Rostova", role: "Cloud DevOps", xp: 2840, level: 4, streak: 9 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
          <Trophy className="h-4 w-4" />
          <span>Module 09 · XP Telemetry & Prestige Tiers</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Gamification & Lifelong Progress Stream
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Turn upskilling friction into highly rewarding interactive milestones. Unlock exclusive badges, track percentile placement ranks, and redeem rewards directly.
        </p>
      </div>

      {/* GAMIFICATION SUMMARY RACK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tier Card */}
        <div className="rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <span className="text-[10px] font-bold uppercase text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded">
              Current Tier
            </span>
            
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-4xl font-bold text-white">Level {level}</span>
              <span className="text-xs text-slate-400">({xp} XP)</span>
            </div>

            <p className="text-xs text-slate-300 mt-1">
              PathPilot Specialist
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800/80 space-y-1.5">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Next Level (Lvl {level + 1})</span>
              <span className="text-purple-300 font-semibold">{currentTierProgress}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400" style={{ width: `${currentTierProgress}%` }}></div>
            </div>
            <span className="text-[9px] text-slate-500 block text-right">{nextTierXp - xp} XP needed</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/30 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded">
              Engagement Reflex
            </span>

            <div className="flex items-center gap-3 mt-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Flame className="h-8 w-8 fill-amber-500" />
              </div>

              <div>
                <p className="text-3xl font-bold text-white">{streak} <span className="text-xs font-normal text-slate-400">Days</span></p>
                <p className="text-[11px] text-amber-400 font-medium">Active Multiplier: 1.5x XP</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800/80">
            <p className="text-[11px] text-slate-400">
              ⚡ Solve 1 Aptitude test or IDE algorithm every 24 hours to secure your streak cache.
            </p>
          </div>
        </div>

        {/* Unlocked badges counters */}
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
              Prestige Output
            </span>

            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-4xl font-bold text-white">{badges.length}</span>
              <span className="text-xs text-slate-400">/ {allBadges.length} Total</span>
            </div>

            <p className="text-xs text-slate-300 mt-1">
              Verified Technical Signals
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800/80">
            <div className="flex flex-wrap gap-1">
              {badges.slice(0, 5).map((b, idx) => (
                <span key={idx} className="text-[9px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                  🏆 {b}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* BADGES & ACHIEVEMENTS GRID */}
      <div className="space-y-4">
        
        <div>
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Ecosystem Badges & Unlocks
          </h3>
          <p className="text-[11px] text-slate-400">
            Click any locked item below to redeem your active XP storage for instant certification metadata updates!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allBadges.map((badge) => {
            const Icon = badge.icon;
            const isUnlocked = badges.includes(badge.id);
            const canUnlock = !isUnlocked && xp >= badge.xpRequired;

            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-5 border transition-all flex flex-col justify-between relative ${
                  isUnlocked
                    ? 'bg-slate-900/60 border-purple-500/40 shadow-sm'
                    : 'bg-slate-950/40 border-slate-850 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl ${
                      isUnlocked ? 'bg-purple-600/20 text-purple-400' : 'bg-slate-900 text-slate-600'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {isUnlocked ? (
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Secured
                      </span>
                    ) : (
                      <span className="text-[9px] bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Lock className="h-2.5 w-2.5" /> {badge.xpRequired} XP
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm font-semibold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                    {badge.name}
                  </h4>
                  
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60">
                  {isUnlocked ? (
                    <span className="text-[9px] text-purple-400 font-medium">
                      ✓ Synchronized with ATS parsing
                    </span>
                  ) : canUnlock ? (
                    <button
                      onClick={() => unlockBadge(badge.id)}
                      className="w-full py-1 rounded bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold transition-colors shadow-sm"
                    >
                      Redeem & Unlock
                    </button>
                  ) : (
                    <span className="text-[9px] text-slate-600">
                      Requires {badge.xpRequired - xp} more XP
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* GLOBAL LEADERBOARD */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-amber-400" />
              <span>Global Lifelong Learners Leaderboard</span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Ranked automatically by verified platform experience output.
            </p>
          </div>

          <span className="text-[10px] bg-slate-950 text-slate-400 px-2 py-1 rounded border border-slate-800">
            Top 100 Candidates Active
          </span>
        </div>

        {/* List table view */}
        <div className="space-y-2">
          {globalLeaderboard.map((lb) => {
            const isSelf = lb.name.includes('(You)');
            
            return (
              <div
                key={lb.rank}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isSelf
                    ? 'bg-purple-950/40 border-purple-500/50 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-center text-xs font-bold ${
                    lb.rank === 1 ? 'text-amber-400' : lb.rank === 2 ? 'text-slate-300' : lb.rank === 3 ? 'text-amber-600' : 'text-slate-500'
                  }`}>
                    #{lb.rank}
                  </span>

                  <div>
                    <p className="text-xs font-semibold flex items-center gap-1.5">
                      <span>{lb.name}</span>
                      {lb.rank === 1 && <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1 rounded">👑 Elite</span>}
                    </p>
                    <p className="text-[10px] text-slate-500">{lb.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <span className="text-[11px] text-amber-400 font-bold flex items-center gap-0.5">
                      <Flame className="h-3 w-3 fill-amber-500" /> {lb.streak}d
                    </span>
                    <span className="text-[9px] text-slate-500 block">Streak</span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-purple-300">Level {lb.level}</span>
                    <span className="text-[10px] text-slate-400 block">{lb.xp} XP</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center text-[10px] text-slate-500">
          ⚡ Maintaining top 10 status triggers direct introduction letters to our verified corporate tier partners!
        </div>

      </div>

    </div>
  );
};
