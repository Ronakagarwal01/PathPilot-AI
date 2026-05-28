import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  Layers 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SkillGapPageProps {
  onNavigate: (page: string) => void;
}

export const SkillGapPage: React.FC<SkillGapPageProps> = ({ onNavigate }) => {
  const { user, skillsGap } = useApp();
  
  // Local active role comparison state
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Data Scientist');
  
  // Dynamic simulated requirements based on selection
  const targetRequirements: Record<string, { required: string[]; readiness: number }> = {
    "Data Scientist": {
      required: ["Python Core", "Advanced SQL", "Machine Learning", "Deep Learning", "PyTorch", "MLOps", "Big Data (Spark)"],
      readiness: 68
    },
    "Full Stack Developer": {
      required: ["React / TypeScript", "Node.js / Express", "Database Architecture", "System Design", "Docker & CI/CD", "GraphQL", "Web Security"],
      readiness: 45
    },
    "AI & ML Engineer": {
      required: ["Python", "Transformers", "LangChain", "Vector Databases", "FastAPI", "Model Deployment", "Kubernetes"],
      readiness: 52
    }
  };

  const currentReqs = targetRequirements[targetRole] || targetRequirements["Data Scientist"];

  // Helper to test if a required skill is present in user's state
  const existingSkills = skillsGap.existing;
  
  // Calculate which ones are matched
  const matchedSkills = currentReqs.required.filter(req => 
    existingSkills.some(existing => req.toLowerCase().includes(existing.toLowerCase()) || existing.toLowerCase().includes(req.toLowerCase()))
  );
  
  const missingSkills = currentReqs.required.filter(req => 
    !matchedSkills.includes(req)
  );

  const calculatedReadiness = Math.round((matchedSkills.length / currentReqs.required.length) * 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Target className="h-4 w-4" />
          <span>Module 02 · Gap Matrix Profiler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Real-Time Skill Gap Analysis
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Compare your active capabilities directly against automated ATS recruitment parsers. Discover precise missing proficiencies and immediately add suggested preparation modules.
        </p>
      </div>

      {/* MATRIX CONTROLLER */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Calibrate Profile Against Target Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full sm:w-80 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          >
            {Object.keys(targetRequirements).map((r, i) => (
              <option key={i} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div>
            <p className="text-[10px] text-slate-400">Total Validated</p>
            <p className="text-sm font-bold text-white">{matchedSkills.length} of {currentReqs.required.length}</p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-400">Readiness Percentage</p>
            <p className="text-sm font-bold text-emerald-400">{calculatedReadiness}% Fit</p>
          </div>
        </div>
      </div>

      {/* READINESS METER BAR */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Overall Industry Readiness
          </span>
          <span className="text-xs font-bold text-cyan-400">
            {calculatedReadiness}% Match
          </span>
        </div>

        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${calculatedReadiness}%` }}
            transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full"
          />
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 gap-1">
          <p>
            ⚡ Your current portfolio matches <span className="text-white font-semibold">{matchedSkills.length} core keywords</span>. Adding <span className="text-amber-400 font-semibold">{missingSkills.length} more</span> bridges the gap entirely.
          </p>
          <button
            onClick={() => onNavigate('roadmap')}
            className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
          >
            <span>Update Learning Path</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* CORE COMPARISON COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Column 1: Existing Matched Skills */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4" />
              <span>Validated Proficiencies</span>
            </h3>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-semibold">
              {matchedSkills.length} Present
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            These technical items have been verified through your background setups and custom active coding accuracy feeds.
          </p>

          <div className="space-y-2">
            {matchedSkills.map((sk, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-medium text-white">{sk}</span>
                </div>
                <span className="text-[9px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/30">
                  ATS Verified
                </span>
              </div>
            ))}

            {matchedSkills.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-950 rounded-xl">
                No automatic string matching detected. Please add more specific skill tags in the AI Roadmap setup!
              </div>
            )}
          </div>

        </div>

        {/* Column 2: Missing Core Requirements */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Missing Core Capabilities</span>
            </h3>
            <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-semibold">
              {missingSkills.length} Required
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Without these core keywords directly in your active application, automated parsing scripts will downgrade your profile ranking.
          </p>

          <div className="space-y-2">
            {missingSkills.map((sk, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 group">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">{sk}</span>
                </div>

                <button
                  onClick={() => onNavigate('crt')}
                  className="flex items-center gap-1 text-[9px] text-purple-400 hover:text-white bg-purple-950/40 hover:bg-purple-600 px-2 py-1 rounded transition-all"
                  title="Inject into Curriculum"
                >
                  <Plus className="h-2.5 w-2.5" />
                  <span>Practice Now</span>
                </button>
              </div>
            ))}

            {missingSkills.length === 0 && (
              <div className="p-4 text-center text-xs text-emerald-400 bg-slate-950 rounded-xl font-medium">
                🎉 Flawless Alignment! You cover 100% of standard job requirements!
              </div>
            )}
          </div>

        </div>

      </div>

      {/* CURATED RECOMMENDED ROADMAP EXPANSION */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-5">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-cyan-400" />
          <span>Recommended Learning Acceleration</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase text-purple-400 bg-purple-950/60 px-1.5 py-0.5 rounded">
                High Priority
              </span>
              <h4 className="text-xs font-semibold text-white mt-2">CRT Technical Upskill</h4>
              <p className="text-[10px] text-slate-400 mt-1">
                Dedicate 20 minutes to our automated **Coding Preparation** section to directly validate your problem-solving metrics.
              </p>
            </div>
            <button
              onClick={() => onNavigate('crt')}
              className="mt-4 text-[10px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <span>Launch Quiz Engine</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </button>
          </div>

          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded">
                Medium Priority
              </span>
              <h4 className="text-xs font-semibold text-white mt-2">ATS Resume Optimization</h4>
              <p className="text-[10px] text-slate-400 mt-1">
                Upload your latest static document. PathPilot will directly append your validated missing keywords to pass target parsers.
              </p>
            </div>
            <button
              onClick={() => onNavigate('resume')}
              className="mt-4 text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Scan Resume Document</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </button>
          </div>

          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                Low Friction
              </span>
              <h4 className="text-xs font-semibold text-white mt-2">Voice Mock Interview</h4>
              <p className="text-[10px] text-slate-400 mt-1">
                Practice articulating complex systems trade-offs with our real-time audio AI interviewer to polish your confidence.
              </p>
            </div>
            <button
              onClick={() => onNavigate('interview')}
              className="mt-4 text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>Start Live Voice Interrogation</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
