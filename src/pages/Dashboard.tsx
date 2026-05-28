import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  Flame, 
  Award, 
  Map, 
  ArrowRight,
  Code2,
  Mic,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, roadmap, skillsGap, testScores, xp, streak, level } = useApp();

  // Mock activity accuracy data for Recharts
  const accuracyData = [
    { day: 'Mon', accuracy: 65, coding: 40 },
    { day: 'Tue', accuracy: 68, coding: 55 },
    { day: 'Wed', accuracy: 72, coding: 60 },
    { day: 'Thu', accuracy: 70, coding: 70 },
    { day: 'Fri', accuracy: 78, coding: 80 },
    { day: 'Sat', accuracy: 82, coding: 85 },
    { day: 'Sun', accuracy: 85, coding: 90 },
  ];

  // Mock skills distribution data
  const skillBarData = [
    { skill: 'Python', value: 95 },
    { skill: 'SQL & DB', value: 88 },
    { skill: 'System Design', value: 50 },
    { skill: 'ML Core', value: 70 },
    { skill: 'Deep Learning', value: 30 },
    { skill: 'MLOps', value: 20 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-950 p-6 border border-purple-500/30 relative overflow-hidden">
        
        {/* Abstract background flow */}
        <div className="absolute right-0 top-0 w-96 h-full bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Student Telemetry Stream
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Welcome back, {user?.name || 'Alex'}! 👋
            </h1>
            
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Your overall placement readiness index is currently at <span className="text-emerald-400 font-bold">78%</span>. Completing your upcoming **Deep Learning** module will unlock guaranteed referrals.
            </p>
          </div>

          {/* Core Action */}
          <button
            onClick={() => onNavigate('roadmap')}
            className="shrink-0 flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-md glow-primary"
          >
            <Map className="h-4 w-4" />
            <span>Resume AI Roadmap</span>
          </button>
        </div>

        {/* Real-time Metric Strips */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Daily Streak</p>
            <p className="text-sm font-bold text-amber-400 flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 fill-amber-500" /> {streak} Days
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">XP Level</p>
            <p className="text-sm font-bold text-purple-300 flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-purple-400" /> Lvl {level} ({xp} XP)
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Target Role</p>
            <p className="text-sm font-bold text-cyan-400 truncate">
              {user?.targetRole || 'Data Scientist'}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Next Milestone</p>
            <p className="text-sm font-bold text-emerald-400 truncate">
              {roadmap?.steps.find(s => !s.completed)?.title || 'Final Interview'}
            </p>
          </div>
        </div>

      </div>

      {/* CHARTS & ANALYTICS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Main Performance Graphs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Accuracy Chart */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Weekly Upskill Trajectory
                </h3>
                <p className="text-[10px] text-slate-400">
                  Aptitude precision vs. Hands-on coding accuracy
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-medium">
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="h-2 w-2 rounded-full bg-purple-500 inline-block"></span> Aptitude
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block"></span> Coding
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }} 
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorApt)" />
                  <Area type="monotone" dataKey="coding" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorCode)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-2.5">
              <span>💡 AI insight: You improved Quant accuracy by 18% this week.</span>
              <button onClick={() => onNavigate('tests')} className="text-purple-400 hover:text-purple-300 font-semibold">
                View detailed matrix &rarr;
              </button>
            </div>
          </div>

          {/* Active Roadmap Completion Box */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Roadmap Progress Stream
                </h3>
                <p className="text-[10px] text-slate-400">
                  Target: {roadmap?.goal || 'Data Scientist'} · Timeline: {roadmap?.estimatedTimeline || '5 Months'}
                </p>
              </div>

              <span className="text-xs font-bold text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded">
                {roadmap?.progress || 35}% Complete
              </span>
            </div>

            {/* Horizontal steps display */}
            <div className="space-y-3">
              {roadmap?.steps.map((st, idx) => (
                <div 
                  key={st.id} 
                  onClick={() => onNavigate('roadmap')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    st.completed
                      ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                      : idx === roadmap?.steps.findIndex(s => !s.completed)
                      ? 'bg-purple-950/20 border-purple-500/40 text-white'
                      : 'bg-slate-950/20 border-slate-900 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                      st.completed
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : idx === roadmap?.steps.findIndex(s => !s.completed)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {st.completed ? '✓' : idx + 1}
                    </div>

                    <div>
                      <p className={`text-xs font-medium ${st.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {st.title}
                      </p>
                      <p className="text-[9px] text-slate-500">
                        {st.duration} · {st.skills.join(', ')}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-purple-400">
                    {st.completed ? 'Validated' : idx === roadmap?.steps.findIndex(s => !s.completed) ? 'In Progress' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Column 3: Skill Gap & Action Shortcuts */}
        <div className="space-y-6">
          
          {/* Readiness Gauge Widget */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 text-center">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Placement Readiness
            </h3>

            {/* Circular score simulation */}
            <div className="relative inline-flex items-center justify-center my-4">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-md" />
              
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#1e293b"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="url(#purpleEmeraldGrad)"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 - (326.7 * (skillsGap.readiness || 78)) / 100}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="purpleEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-white">
                  {skillsGap.readiness || 78}%
                </span>
                <span className="text-[8px] text-slate-400 uppercase tracking-widest">
                  Tier-1 Fit
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 px-2 leading-relaxed">
              Your resume keyword alignment paired with your algorithm execution output matches **8 top tier tech recruiters** active today.
            </p>

            <button
              onClick={() => onNavigate('jobs')}
              className="mt-4 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              View Pre-Matched Jobs
            </button>
          </div>

          {/* Skill Distribution Bar Chart */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Skill Calibration Profile
            </h3>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillBarData} layout="vertical" margin={{ top: 0, right: 10, left: 15, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="skill" type="category" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '6px', fontSize: '10px', color: '#fff' }} 
                  />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-1 text-center">
              <button 
                onClick={() => onNavigate('skills')}
                className="text-[10px] text-purple-400 hover:text-purple-300 font-medium"
              >
                Run comprehensive Gap Analysis &rarr;
              </button>
            </div>
          </div>

          {/* Quick Hub Launchers */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Action Launchpad
            </h3>

            <button
              onClick={() => onNavigate('coding')}
              className="flex w-full items-center justify-between rounded-xl bg-slate-950 p-2.5 text-left border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Coding Arena</p>
                  <p className="text-[9px] text-slate-400">Practice algorithms using Judge0</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onNavigate('interview')}
              className="flex w-full items-center justify-between rounded-xl bg-slate-950 p-2.5 text-left border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Voice Mock Interview</p>
                  <p className="text-[9px] text-slate-400">Interactive live AI interrogation</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => onNavigate('resume')}
              className="flex w-full items-center justify-between rounded-xl bg-slate-950 p-2.5 text-left border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-pink-500/10 text-pink-400 rounded-lg">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Resume Parsing</p>
                  <p className="text-[9px] text-slate-400">Inject ATS keywords directly</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
            </button>

          </div>

        </div>

      </div>

      {/* RECENT MOCK SCORES FEED */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Recent Assessment History
          </h3>
          
          <button 
            onClick={() => onNavigate('tests')} 
            className="text-[11px] text-purple-400 hover:text-purple-300 font-medium"
          >
            Full Engine &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testScores.map((score) => (
            <div key={score.id} className="rounded-xl bg-slate-950 p-3 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-semibold uppercase text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded">
                  {score.category}
                </span>
                <p className="text-xs font-medium text-white mt-1">{score.testName}</p>
                <p className="text-[9px] text-slate-500">{score.date} · {score.timeTaken}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-emerald-400">{score.score} / {score.total}</p>
                <p className="text-[9px] text-slate-400">{score.accuracy}% accuracy</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
