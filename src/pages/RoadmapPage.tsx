import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Map, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Play, 
  ExternalLink, 
  Plus, 
  X,
  Target,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RoadmapPage: React.FC = () => {
  const { roadmap, updateRoadmapStep, generateRoadmap } = useApp();
  
  // Custom generation form state
  const [goal, setGoal] = useState('Full Stack Developer');
  const [education, setEducation] = useState("Bachelor's in Computer Science");
  const [currentSkillInput, setCurrentSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(['JavaScript', 'React', 'HTML/CSS']);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentSkillInput.trim()) {
      e.preventDefault();
      if (!skillsList.includes(currentSkillInput.trim())) {
        setSkillsList([...skillsList, currentSkillInput.trim()]);
      }
      setCurrentSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter(s => s !== skill));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateRoadmap(goal, skillsList, education);
      setIsGenerating(false);
    }, 1200);
  };

  const goals = [
    "Data Scientist",
    "Full Stack Developer",
    "AI & ML Engineer",
    "Cloud DevOps Architect",
    "Cybersecurity Analyst",
    "Blockchain Developer"
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <Map className="h-4 w-4" />
          <span>Module 01 · Intelligent Mapping Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          AI Career Roadmap Generator
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Stop wondering what to learn next. Configure your background below and let PathPilot synthesize an absolute, interview-ready sequential curriculum.
        </p>
      </div>

      {/* GENERATION / CONFIGURATION CARD */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 sm:p-6">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-purple-400" />
          <span>Curriculum Configurator</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Target Career Role
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              {goals.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
            <p className="mt-1 text-[10px] text-slate-500">
              Select one of our fine-tuned institutional pathways.
            </p>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Current Education Level
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. Master's in IT"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              Helps calibrate basic academic assumptions.
            </p>
          </div>

          {/* Current Skills Tags */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Existing Proficiencies (Press Enter)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Plus className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={currentSkillInput}
                onChange={(e) => setCurrentSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type skill & press Enter..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Tags flow */}
            <div className="flex flex-wrap gap-1 mt-2">
              {skillsList.map((sk, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800/40 text-[10px]"
                >
                  <span>{sk}</span>
                  <button onClick={() => handleRemoveSkill(sk)} className="hover:text-white">
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Generate Action */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400">
            ⚡ AI will automatically map <span className="text-white font-semibold">{skillsList.length} initial items</span> into validated steps to save redundant learning!
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-all shadow-md glow-primary"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>Synthesizing Micro-Nodes...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate Smart Roadmap</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* ROADMAP VISUALIZATION TIMELINE */}
      {roadmap && (
        <div className="space-y-6">
          
          {/* Header Summary Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <p className="text-xs text-slate-400">Active Blueprint Track</p>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{roadmap.goal}</span>
                <span className="text-[10px] font-normal bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                  {roadmap.estimatedTimeline}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div>
                <p className="text-[10px] text-slate-400">Curriculum Fit</p>
                <p className="text-xs font-bold text-purple-400">100% Industry Aligned</p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-slate-400">Milestone Score</p>
                <p className="text-xs font-bold text-emerald-400">{roadmap.progress}% Completed</p>
              </div>
            </div>
          </div>

          {/* Graphical timeline flow */}
          <div className="relative pl-4 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
            
            {roadmap.steps.map((step, index) => {
              const isNext = !step.completed && roadmap.steps.findIndex(s => !s.completed) === index;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative group"
                >
                  
                  {/* Step Connector Dot */}
                  <div className="absolute -left-4 sm:-left-8 top-1.5 flex items-center justify-center">
                    {step.completed ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-md ring-4 ring-slate-950">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    ) : isNext ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white shadow-md ring-4 ring-slate-950 animate-pulse">
                        <span className="text-[10px] font-bold">{index + 1}</span>
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-slate-600 ring-4 ring-slate-950 border border-slate-800">
                        <Circle className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Step Content Card */}
                  <div className={`rounded-2xl p-5 transition-all border ${
                    step.completed 
                      ? 'bg-slate-950/40 border-slate-800/40 opacity-75' 
                      : isNext 
                      ? 'bg-gradient-to-b from-purple-950/20 to-slate-900 border-purple-500/50 shadow-xl' 
                      : 'bg-slate-900/40 border-slate-800/80'
                  }`}>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          step.completed 
                            ? 'bg-emerald-950 text-emerald-400' 
                            : isNext 
                            ? 'bg-purple-950 text-purple-300 border border-purple-800/50' 
                            : 'bg-slate-950 text-slate-500'
                        }`}>
                          Step {index + 1} · {step.duration}
                        </span>

                        {isNext && (
                          <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold animate-pulse">
                            <Sparkles className="h-2.5 w-2.5" /> Current Sprint
                          </span>
                        )}
                      </div>

                      {/* Completion check Trigger */}
                      <button
                        onClick={() => updateRoadmapStep(step.id, !step.completed)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          step.completed
                            ? 'bg-slate-950 text-slate-400 hover:text-white'
                            : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white border border-purple-500/30'
                        }`}
                      >
                        {step.completed ? 'Undo Status' : 'Mark Milestone Complete'}
                      </button>
                    </div>

                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.description}</p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {step.skills.map((s, i) => (
                        <span key={i} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Highly Targeted AI Curated Resources */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> Recommended Curricula
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.resources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800/60 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-2 truncate">
                              {res.type === 'video' ? (
                                <Play className="h-3 w-3 text-cyan-400 shrink-0" />
                              ) : (
                                <BookOpen className="h-3 w-3 text-purple-400 shrink-0" />
                              )}
                              <span className="text-xs text-slate-300 group-hover:text-white truncate">
                                {res.title}
                              </span>
                            </div>
                            <ExternalLink className="h-2.5 w-2.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}

          </div>

          {/* Suggested Projects Section */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-5 mt-8">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Capstone Portfolio Projects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roadmap.suggestedProjects.map((proj, pIdx) => (
                <div key={pIdx} className="rounded-xl bg-slate-950 p-4 border border-slate-800/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold uppercase text-purple-400 bg-purple-950/60 px-1.5 py-0.5 rounded">
                        {proj.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-500">Tier-1 Signal</span>
                    </div>

                    <h4 className="text-xs font-semibold text-white">{proj.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800/60">
                    <span className="text-[9px] text-emerald-400 font-medium">
                      ✓ Synchronizes ATS Resumes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Certifications */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-white">Recommended Industry Certifications</p>
              <p className="text-[10px] text-slate-400">Completing your roadmap prepares you natively for these examinations.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {roadmap.certifications.map((cert, cIdx) => (
                <span key={cIdx} className="text-[10px] bg-slate-900 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800">
                  🏆 {cert}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
