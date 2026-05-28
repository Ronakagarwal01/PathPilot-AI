import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  PlusCircle, 
  Building, 
  Activity, 
  BarChart3, 
  Check, 
  Trash2, 
  Cpu, 
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminPanelPage: React.FC = () => {
  const { user, addXP } = useApp();

  const [activeTab, setActiveTab] = useState<'Analytics' | 'Users' | 'Questions' | 'Companies' | 'Telemetry'>('Analytics');

  // New Question form
  const [newQText, setNewQText] = useState('');
  const [newQCategory, setNewQCategory] = useState('Quantitative Aptitude');
  const [newQTopic, setNewQTopic] = useState('Probability');
  const [successMsg, setSuccessMsg] = useState('');

  // New Company form
  const [newCompName, setNewCompName] = useState('');
  const [newCompTier, setNewCompTier] = useState('Tier-1 Partner');

  // Simulated static user database
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Alex Rivera', email: 'alex.rivera@stanford.edu', role: 'Student', status: 'Active', readyScore: 78 },
    { id: 'u2', name: 'Dr. Sarah Jenkins', email: 'sarah.j@pathpilot.ai', role: 'Mentor', status: 'Active', readyScore: 95 },
    { id: 'u3', name: 'Marcus Vance', email: 'marcus.recruiter@tech.com', role: 'Recruiter', status: 'Active', readyScore: 88 },
    { id: 'u4', name: 'Elena Rostova', email: 'elena.cloud@gmail.com', role: 'Student', status: 'Active', readyScore: 62 },
    { id: 'u5', name: 'David Chen', email: 'david.chen@scaleup.io', role: 'Student', status: 'Inactive', readyScore: 81 },
  ]);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim()) return;

    setSuccessMsg(`Successfully appended question to "${newQTopic}" database pool!`);
    setNewQText('');
    addXP(100, "Admin inserted test question!");
    
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    setSuccessMsg(`Successfully registered "${newCompName}" as a verified hiring partner!`);
    setNewCompName('');
    addXP(100, "Admin registered enterprise!");

    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  const handleDeleteUser = (id: string) => {
    setUsersList(usersList.filter(u => u.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
          <ShieldAlert className="h-4 w-4" />
          <span>Module 11 · Core Administrator Gateway</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Institutional Management & Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor real-time learner pathways, update dynamic screening questions, manage pre-partnered enterprises, and examine gateway infrastructure health. Managed by <span className="text-white font-semibold">{user?.name || 'Administrator'}</span>.
        </p>
      </div>

      {/* ADMIN TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {(['Analytics', 'Users', 'Questions', 'Companies', 'Telemetry'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-amber-600 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SUCCESS BANNER */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="h-4 w-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* CORE CONTENT SWITCH */}
      {activeTab === 'Analytics' ? (
        /* ANALYTICS & STATS */
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Total Registered</span>
              <p className="text-3xl font-bold text-white mt-1">12,420</p>
              <span className="text-[10px] text-emerald-400 font-semibold">+18.4% this month</span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Active Inferences</span>
              <p className="text-3xl font-bold text-purple-400 mt-1">1,482 / min</p>
              <span className="text-[10px] text-slate-500 font-mono">LLM Gateway Peak</span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Avg Readiness Index</span>
              <p className="text-3xl font-bold text-cyan-400 mt-1">74.2%</p>
              <span className="text-[10px] text-slate-500">Tier-1 Threshold: 70%</span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-medium uppercase">Offers Verified</span>
              <p className="text-3xl font-bold text-emerald-400 mt-1">3,842</p>
              <span className="text-[10px] text-emerald-400 font-semibold">Direct placement match</span>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-amber-400" />
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Placement Distribution by Target Category
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Data Scientist / ML roles</span>
                    <span className="text-purple-400 font-bold">42%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Full Stack Systems Engineering</span>
                    <span className="text-blue-400 font-bold">35%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Cloud Infrastructure & DevOps</span>
                    <span className="text-cyan-400 font-bold">15%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: '15%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Cybersecurity & Protocol Auditing</span>
                    <span className="text-amber-400 font-bold">8%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Infrastructure Latency Monitor
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  The unified platform architecture relies on highly efficient Redis streaming pipelines. Inference latency is maintained securely under 200ms.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">OpenAI API Gateway</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">142 ms</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Judge0 Compiler Node</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">84 ms</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                System Status: <strong className="text-emerald-400">100% Operational</strong>
              </div>
            </div>

          </div>

        </div>
      ) : activeTab === 'Users' ? (
        /* MANAGE USERS */
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-4 w-4 text-purple-400" />
              <span>Registered Users Control Table</span>
            </h3>
            <span className="text-[10px] text-slate-500">Showing top active testing profiles</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Assigned Role</th>
                  <th className="p-3">Readiness Index</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-850">
                    <td className="p-3 font-semibold text-white">{u.name}</td>
                    <td className="p-3 text-slate-400 font-mono">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'Student' ? 'bg-purple-950 text-purple-300' : u.role === 'Mentor' ? 'bg-cyan-950 text-cyan-300' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-400">{u.readyScore}%</span>
                    </td>
                    <td className="p-3">
                      <span className={`flex items-center gap-1 text-[10px] ${
                        u.status === 'Active' ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-950 transition-colors"
                        title="Remove User Account"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Questions' ? (
        /* ADD QUESTIONS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <PlusCircle className="h-4 w-4 text-amber-400" />
              <span>Insert Dynamic Assessment Questions</span>
            </h3>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Evaluation Framework
                  </label>
                  <select
                    value={newQCategory}
                    onChange={(e) => setNewQCategory(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white"
                  >
                    {['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Coding Preparation'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Topic Sub-Category
                  </label>
                  <input
                    type="text"
                    value={newQTopic}
                    onChange={(e) => setNewQTopic(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white"
                    placeholder="e.g. Probability, Time & Work"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Problem Core Statement
                </label>
                <textarea
                  rows={3}
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="Enter explicit multi-choice question stem..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Option A (Correct)</label>
                  <input type="text" defaultValue="1/9" className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Option B</label>
                  <input type="text" defaultValue="1/6" className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Option C</label>
                  <input type="text" defaultValue="1/12" className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Option D</label>
                  <input type="text" defaultValue="1/8" className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-white" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Detailed Explanation</label>
                <input type="text" defaultValue="Favorable outcomes computed natively via combinatorial sets." className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-white" />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors shadow-md"
              >
                Append directly to testing server buffer
              </button>

            </form>

          </div>

          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-4 text-xs text-slate-400">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
              ⚡ Real-Time Injection Safe
            </span>
            <p className="leading-relaxed">
              Questions inserted here automatically bypass secondary manual approval queues and feed straight into the active **CRT & Aptitude Engine** and **Adaptive Mock Tests** modules for all students immediately!
            </p>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-[11px]">
              <span className="text-white font-semibold block">Pool Statistics</span>
              <p>Total Quant Sets: <strong>1,420</strong></p>
              <p>Total Logical Sets: <strong>980</strong></p>
              <p>Total Coding Sets: <strong>450</strong></p>
            </div>
          </div>

        </div>
      ) : activeTab === 'Companies' ? (
        /* ADD COMPANIES */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 rounded-2xl bg-slate-90 border border-slate-800 p-6 space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building className="h-4 w-4 text-purple-400" />
              <span>Register Institutional Tier-1 Partners</span>
            </h3>

            <form onSubmit={handleAddCompany} className="space-y-4">
              
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Enterprise Name
                </label>
                <input
                  type="text"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  placeholder="e.g. Netflix Core Systems, Uber"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Partner Evaluation Tier
                  </label>
                  <select 
                    value={newCompTier}
                    onChange={(e) => setNewCompTier(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white"
                  >
                    {['Tier-1 Partner', 'Scaleup Studio', 'Institutional Associate'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Evaluation Bounds
                  </label>
                  <input type="text" defaultValue="Expert / Deep Systems" className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Technical Filters
                </label>
                <textarea
                  rows={2}
                  defaultValue="Distributed Locking, RPC optimization, Event-Driven streams"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-md"
              >
                Register Corporate Partner
              </button>

            </form>

          </div>

          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-3 text-xs text-slate-400">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              ✓ Automated ATS Sync
            </span>
            <p className="leading-relaxed">
              Registering new partners updates the active **Job Matching** database, pushing immediate dynamic recommendations to candidates covering matching keyword sets natively!
            </p>
          </div>

        </div>
      ) : (
        /* TELEMETRY & HEALTH */
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>Real-Time Inference Telemetry Telemetry</span>
            </h3>
            
            <span className="text-[10px] bg-slate-950 text-emerald-400 px-2 py-0.5 rounded border border-slate-800 font-mono">
              v2.8.4-production
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 block">AI INTERVIEW GATEWAY</span>
              <p className="text-white font-bold">Model: <span className="text-purple-400">gpt-4o-mini-ft</span></p>
              <p className="text-slate-400">Uptime: <span className="text-emerald-400">99.98%</span></p>
              <p className="text-slate-400">Token Cost: <span className="text-slate-300">$0.0014 / turn</span></p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 block">JUDGE0 COMPILER STACK</span>
              <p className="text-white font-bold">Status: <span className="text-cyan-400">Active</span></p>
              <p className="text-slate-400">Workers: <span className="text-white">16 Nodes</span></p>
              <p className="text-slate-400">Queue: <span className="text-emerald-400">0 pending</span></p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 block">DATABASE STREAMING</span>
              <p className="text-white font-bold">Engine: <span className="text-amber-400">MongoDB Atlas</span></p>
              <p className="text-slate-400">Latency: <span className="text-white">14ms</span></p>
              <p className="text-slate-400">Replica Sets: <span className="text-emerald-400">Synced</span></p>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>Hackathon Simulator Mode</span>
            </span>

            <span className="text-slate-500">
              Deterministic cached state responses pre-bundled for high-speed demo readouts.
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
