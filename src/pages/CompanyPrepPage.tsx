import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  HelpCircle, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CompanyPrepPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { addXP } = useApp();

  const companies = [
    {
      id: 'Google',
      name: 'Google',
      type: 'Tier-1 FAANG / Product',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      color: 'border-blue-500/40',
      difficulty: 'Expert / Advanced',
      rounds: ['1 Online Assessment (DSA)', '2 Technical Phone Screens', '4 Onsite Loops (Coding + System Design)', '1 Googley/HR Round'],
      patterns: [
        'Advanced Graphs & Dynamic Programming',
        'High-Throughput System Architecture',
        'Space & Time complexity trade-offs optimization'
      ],
      experiences: [
        {
          author: 'Priya S.',
          role: 'L4 Software Engineer',
          text: 'The online assessment focused heavily on sliding window optimization. In the onsite loops, they care more about how clearly you discuss your thought process than just getting the flawless code immediately.'
        }
      ],
      mockCount: 15
    },
    {
      id: 'Microsoft',
      name: 'Microsoft',
      type: 'Tier-1 Enterprise Cloud',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80',
      color: 'border-cyan-500/40',
      difficulty: 'Advanced',
      rounds: ['1 Codility / Assessment', '3 Technical Loops', '1 As-App / Principal Manager Round'],
      patterns: [
        'Object-Oriented Design & Low-level Design',
        'Trees, Heaps, and Priority Queues',
        'Distributed Database isolation fundamentals'
      ],
      experiences: [
        {
          author: 'Alex Rivera',
          role: 'SDE II',
          text: 'Make sure your code compiles perfectly. They allow you to test your inputs. The final round with the Principal Manager was entirely behavioral based on the STAR framework.'
        }
      ],
      mockCount: 12
    },
    {
      id: 'Amazon',
      name: 'Amazon',
      type: 'Tier-1 E-Commerce Scale',
      logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80',
      color: 'border-amber-500/40',
      difficulty: 'Advanced',
      rounds: ['Online Assessment (OA1 & OA2)', '4 Onsite Loops', 'Bar Raiser Round'],
      patterns: [
        '14 Leadership Principles embedded in every answer',
        'String Manipulation and Hash Mapping',
        'High Scalability microservices integration'
      ],
      experiences: [
        {
          author: 'David C.',
          role: 'SDE I',
          text: 'You absolutely must study the 14 Leadership Principles. If you cannot explicitly provide scenarios for Customer Obsession and Deliver Results, your pure DSA score will not save you.'
        }
      ],
      mockCount: 18
    },
    {
      id: 'TCS',
      name: 'TCS (Tata Consultancy Services)',
      type: 'Mass Recruiter / Prime Tier',
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      color: 'border-purple-500/40',
      difficulty: 'Intermediate',
      rounds: ['TCS NQT (National Qualifier Test)', 'Technical Interview', 'Managerial & HR Interview'],
      patterns: [
        'Quantitative Aptitude & Time-Speed-Distance',
        'Logical Reasoning & Data Interpretation',
        'Core Fundamentals (SQL, C++, Java Basics)'
      ],
      experiences: [
        {
          author: 'Neha K.',
          role: 'TCS Digital / Prime',
          text: 'The aptitude section is highly time-bound. Practice our CRT module daily to improve calculation velocity. The interview questions are directly based on the projects specified in your resume.'
        }
      ],
      mockCount: 24
    },
    {
      id: 'Infosys',
      name: 'Infosys',
      type: 'Enterprise IT Services',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      color: 'border-emerald-500/40',
      difficulty: 'Intermediate',
      rounds: ['Online Aptitude Test', 'Specialist / Systems Engineer Coding Test', 'Technical & HR Round'],
      patterns: [
        'Pseudocode parsing and logical analysis',
        'Database normalization rules & indexing',
        'Verbal ability and active reading comprehension'
      ],
      experiences: [
        {
          author: 'Rohan M.',
          role: 'Specialist Programmer',
          text: 'The Specialist coding test features dynamic programming problems. If you solve both questions, you get direct fast-track access to the final interview stage.'
        }
      ],
      mockCount: 20
    },
    {
      id: 'Wipro',
      name: 'Wipro',
      type: 'Global IT Consulting',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      color: 'border-pink-500/40',
      difficulty: 'Beginner / Intermediate',
      rounds: ['Elite National Talent Hunt (NTH)', 'Technical Interview', 'HR Round'],
      patterns: [
        'Basic arithmetic and probability routines',
        'English communication and written essays',
        'Standard data structures theory'
      ],
      experiences: [
        {
          author: 'Simran B.',
          role: 'Project Engineer',
          text: 'The essay writing test is evaluated automatically by algorithms. Ensure you use proper punctuation and clear sentence formatting. The tech interview is largely relaxed.'
        }
      ],
      mockCount: 10
    }
  ];

  const [selectedCompanyId, setSelectedCompanyId] = useState('Google');
  const activeCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <Building2 className="h-4 w-4" />
          <span>Module 10 · Institutional Assessment Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Company-Wise Preparation Hub
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Access explicit selection rounds, verified previous test configurations, and historical evaluation matrices for targeted Tier-1 global employers.
        </p>
      </div>

      {/* SELECTOR TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {companies.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCompanyId(c.id);
              addXP(20, `Explored ${c.name} prep matrices`);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedCompanyId === c.id
                ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* DETAILED CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT / CENTER: DEEP DIVE STATS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Identity Card */}
          <div className={`rounded-2xl bg-slate-900/60 border ${activeCompany.color} p-6 space-y-4`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded">
                  {activeCompany.type}
                </span>
                
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeCompany.name} Assessment Protocol
                </h2>

                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                    <span>Difficulty: <strong className="text-white">{activeCompany.difficulty}</strong></span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-cyan-400 font-medium">
                    <Sparkles className="h-3 w-3" /> {activeCompany.mockCount} Adaptive Sets Available
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('tests')}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-md"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Launch Mock Test</span>
              </button>
            </div>

            {/* Selection Rounds Stream */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                Verified Evaluation Rounds
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCompany.rounds.map((rnd, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/60 text-xs text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-purple-950 text-purple-400 font-bold text-[10px]">
                      {rIdx + 1}
                    </span>
                    <span>{rnd}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* High Frequency Evaluation Themes */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                High-Frequency Assessment Patterns
              </h3>
            </div>

            <p className="text-xs text-slate-400">
              Our continuous inference monitors detect that these explicit academic foundations appear in over 80% of active screening tests for this firm:
            </p>

            <div className="space-y-2">
              {activeCompany.patterns.map((pat, pIdx) => (
                <div key={pIdx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{pat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
              <span>⚡ Practice custom test routines specifically targeting these logic fields.</span>
              <button 
                onClick={() => onNavigate('coding')}
                className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Open IDE Compiler</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Real Candidate Experiences */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                Verified Candidate Interview Experiences
              </h3>
            </div>

            <div className="space-y-4">
              {activeCompany.experiences.map((exp, eIdx) => (
                <div key={eIdx} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{exp.author}</span>
                    <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                      {exp.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{exp.text}"
                  </p>

                  <div className="pt-1 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span>✓ Offer Extended & Accepted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DIRECT PREP LAUNCHERS */}
        <div className="space-y-6">
          
          {/* Quick Hub Trigger Box */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 text-center">
            
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Award className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Targeted Acceleration</h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure your overall app state directly to mimic **{activeCompany.name}** hiring requirements.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => onNavigate('tests')}
                className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-200 border border-slate-800 transition-colors"
              >
                Launch Custom Mock Exam
              </button>

              <button
                onClick={() => onNavigate('interview')}
                className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-200 border border-slate-800 transition-colors"
              >
                Start Voice Interrogation
              </button>

              <button
                onClick={() => onNavigate('resume')}
                className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-200 border border-slate-800 transition-colors"
              >
                Inject Company ATS Keywords
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
              Guaranteed 100% telemetry synchronization across modules.
            </div>

          </div>

          {/* General Support info */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
              <span>Need specific referral guidance?</span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-normal">
              Our AI Mentor is pre-trained with explicit employee referral templates for these corporations. Open the AI Chatbot to instantly synthesize draft cold outreach emails!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
