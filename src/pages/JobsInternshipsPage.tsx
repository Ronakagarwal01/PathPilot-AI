import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Bookmark, 
  CheckCircle2, 
  ExternalLink, 
  MapPin, 
  DollarSign, 
  Building2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JobsInternshipsPage: React.FC = () => {
  const { user, skillsGap, savedJobs, appliedJobs, toggleBookmarkJob, applyForJob } = useApp();

  const [activeCategory, setActiveCategory] = useState<'All' | 'Internship' | 'Job' | 'Freelance'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRemote, setFilterRemote] = useState(false);

  const jobsList = [
    {
      id: 'job-1',
      title: 'Junior Data Scientist',
      company: 'Microsoft Enterprise Systems',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80',
      type: 'Job',
      location: 'Redmond, WA (Hybrid)',
      salary: '$120k - $145k',
      match: 94,
      skills: ['Python', 'SQL', 'PyTorch', 'System Design'],
      posted: '2 hours ago',
      isVerifiedPartner: true
    },
    {
      id: 'job-2',
      title: 'Machine Learning Research Intern',
      company: 'Google DeepMind Core',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      type: 'Internship',
      location: 'Mountain View, CA',
      salary: '$8,500 / month',
      match: 88,
      skills: ['Python', 'Transformers', 'Deep Learning'],
      posted: '1 day ago',
      isVerifiedPartner: true
    },
    {
      id: 'job-3',
      title: 'Full Stack Systems Engineer',
      company: 'Stripe FinTech Core',
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      type: 'Job',
      location: 'Remote (US/Canada)',
      salary: '$135k - $160k',
      match: 82,
      skills: ['React', 'TypeScript', 'Node.js', 'Distributed Caching'],
      posted: '3 days ago',
      isVerifiedPartner: false
    },
    {
      id: 'job-4',
      title: 'Cloud DevOps Integration Intern',
      company: 'Amazon Web Services',
      logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80',
      type: 'Internship',
      location: 'Seattle, WA',
      salary: '$7,800 / month',
      match: 76,
      skills: ['AWS', 'Docker', 'CI/CD', 'Linux Internals'],
      posted: '5 days ago',
      isVerifiedPartner: true
    },
    {
      id: 'job-5',
      title: 'Smart Contract / Blockchain Developer',
      company: 'ConsenSys Protocol Studio',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      type: 'Freelance',
      location: 'Remote (Global)',
      salary: '$90 - $140 / hr',
      match: 65,
      skills: ['Solidity', 'Ethereum', 'Web3.js'],
      posted: '1 week ago',
      isVerifiedPartner: false
    }
  ];

  const filteredJobs = jobsList.filter(job => {
    const matchesCat = activeCategory === 'All' || job.type === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRemote = !filterRemote || job.location.toLowerCase().includes('remote');
    return matchesCat && matchesSearch && matchesRemote;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
          <Briefcase className="h-4 w-4" />
          <span>Module 07 · Intelligent Recommendation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Job & Internship Recommendation System
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          These openings are matched continuously against your verified competitive programming assessments, curriculum status, and ATS resume keyword injection state targeting the <span className="text-white font-semibold">{user?.targetRole || 'Software'}</span> domain.
        </p>
      </div>

      {/* FILTER / SEARCH STRIP */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Main search box */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, target skill, or Tier-1 enterprise..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Quick Category Tab Switches */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {(['All', 'Internship', 'Job', 'Freelance'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}s
              </button>
            ))}
          </div>

        </div>

        {/* Secondary checks */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input 
                type="checkbox" 
                checked={filterRemote} 
                onChange={(e) => setFilterRemote(e.target.checked)} 
                className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-purple-500" 
              />
              <span>Remote Locations Only</span>
            </label>

            <span className="hidden text-slate-500 sm:inline">•</span>

            <span className="hidden text-slate-400 sm:inline flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>Sorted by validated skill matching weight</span>
            </span>
          </div>

          <span className="text-slate-500">
            {filteredJobs.length} matches discovered
          </span>
        </div>

      </div>

      {/* JOBS / INTERNSHIPS FEED */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isBookmarked = savedJobs.includes(job.id);
          const isApplied = appliedJobs.includes(job.id);

          return (
            <div 
              key={job.id} 
              className={`rounded-2xl p-5 border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                isApplied
                  ? 'bg-slate-950/40 border-slate-800/40 opacity-80'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              
              {/* Left Identity Container */}
              <div className="flex items-start gap-4 flex-1">
                <img 
                  src={job.logo} 
                  alt={job.company} 
                  className="h-12 w-12 rounded-xl object-cover border border-slate-800 shrink-0 mt-1" 
                />

                <div className="space-y-1">
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                      job.type === 'Internship' 
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' 
                        : job.type === 'Job' 
                        ? 'bg-purple-950 text-purple-300 border border-purple-800/40' 
                        : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                    }`}>
                      {job.type}
                    </span>

                    {job.isVerifiedPartner && (
                      <span className="text-[9px] bg-slate-950 text-emerald-400 px-2 py-0.5 rounded border border-slate-800 font-semibold flex items-center gap-1">
                        <span>★ Tier-1 Partner</span>
                      </span>
                    )}

                    <span className="text-[10px] text-slate-500">{job.posted}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white">{job.title}</h3>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Building2 className="h-3 w-3 text-slate-500" />
                    <span className="font-medium text-slate-300">{job.company}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-500" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-emerald-400" /> <span className="text-slate-300 font-medium">{job.salary}</span>
                    </span>
                  </div>

                  {/* Skills stream */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {job.skills.map((s, i) => {
                      const isMatched = skillsGap.existing.some(ex => ex.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ex.toLowerCase()));
                      return (
                        <span 
                          key={i} 
                          className={`text-[10px] px-2 py-0.5 rounded border ${
                            isMatched
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {s} {isMatched && '✓'}
                        </span>
                      );
                    })}
                  </div>

                </div>

              </div>

              {/* Right Action Matrix */}
              <div className="flex flex-col items-start md:items-end justify-between gap-4 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                
                {/* Score Match element */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs font-bold text-white">{job.match}%</span>
                    <span className="text-[9px] text-slate-500 block uppercase font-semibold">Match Index</span>
                  </div>
                  
                  {/* Miniature graph */}
                  <div className="h-8 w-8 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-xs font-bold text-cyan-400">
                    ★
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmarkJob(job.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isBookmarked
                        ? 'bg-purple-950 text-purple-400 border-purple-800/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title={isBookmarked ? "Remove Bookmark" : "Bookmark this opening"}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-purple-400 text-purple-400' : ''}`} />
                  </button>

                  {/* Apply Button */}
                  <button
                    onClick={() => applyForJob(job.id)}
                    disabled={isApplied}
                    className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                      isApplied
                        ? 'bg-slate-950 text-slate-500 border border-slate-900 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Application Synced</span>
                      </>
                    ) : (
                      <>
                        <span>Fast-Track Apply</span>
                        <ExternalLink className="h-3 w-3" />
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Briefcase className="h-8 w-8 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-400">No matching jobs fit those specific parameters.</p>
            <p className="text-xs text-slate-600 mt-1">Try toggling the remote location switch or expanding your text query.</p>
          </div>
        )}
      </div>

    </div>
  );
};
