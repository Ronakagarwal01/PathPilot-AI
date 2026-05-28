import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Layers, 
  Code, 
  Award, 
  Briefcase, 
  CheckCircle, 
  Zap, 
  TrendingUp, 
  Users 
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  
  const features = [
    {
      title: "AI Career Roadmaps",
      desc: "Stop guessing your curriculum. Our AI synthesizes dynamic, live-updated step-by-step pathways based on your dream role and background.",
      icon: Layers,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Real-Time Skill Gap Scanners",
      desc: "Upload your existing skills and immediately visualize exact missing proficiencies required by top-tier ATS screening tools.",
      icon: Zap,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Voice AI Mock Interviews",
      desc: "Practice behavioral and complex technical questions with a responsive vocal AI interviewer. Receive granular articulation metrics.",
      icon: Bot,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Judge0 Cloud Ide Integration",
      desc: "Practice core Data Structures & Algorithms directly inside your browser. Includes space/time complexity evaluation instantly.",
      icon: Code,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Intelligent ATS Resume Parsing",
      desc: "Instantly score your resume against active Tier-1 job descriptions. Inject critical industry keywords seamlessly.",
      icon: Award,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Hyper-Targeted Job Matches",
      desc: "Direct recommendations matching your validated mock assessment accuracy. Seamless one-click platform bookmarking.",
      icon: Briefcase,
      color: "from-blue-500 to-purple-500"
    }
  ];

  const stats = [
    { value: "94.2%", label: "Placement Success Rate" },
    { value: "450K+", label: "Aptitude Problems Solved" },
    { value: "12,000+", label: "AI Interviews Conducted" },
    { value: "3.2x", label: "Faster Skill Acquisition" }
  ];

  const testimonials = [
    {
      quote: "PathPilot AI completely demystified the transition from university to a top data role. The AI Mock Interviewer caught my weak dynamic programming explanations before Google did!",
      author: "Priya Sharma",
      role: "Data Scientist at Microsoft",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "As a recruiter, the candidates coming from the PathPilot ecosystem are noticeably more articulate and already possess verified Git contributions. It's the standard we look for.",
      author: "David Chen",
      role: "Lead Talent Acquisition, FinTech Scaleup",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "The personalized roadmaps saved me thousands of dollars on generic bootcamps. It told me exactly which statistics concepts were missing for my target role.",
      author: "Marcus Vance",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Background Grid patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Top ambient blurred lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Hackathon Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-medium mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Next-Gen Education-to-Employment Ecosystem</span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Transform Your Education Into <span className="text-gradient">Employment With AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            The ultimate convergence of LinkedIn, Coursera, LeetCode, and a 24/7 AI Mentor. Discover hyper-personalized paths, crush interactive aptitude mock interviews, and land verified roles instantly.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigate('roadmap')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition-all glow-primary"
            >
              <span>Explore Your AI Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('auth')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-8 py-4 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              <span>Sign In / Demo Hub</span>
            </button>
          </motion.div>

          {/* Investor readiness statement */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-xs text-slate-500"
          >
            ⚡ No credit card required. Instantly load pre-configured hackathon datasets.
          </motion.p>

        </div>

        {/* Stunning Interactive Dashboard Previews */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-2 border border-slate-800 shadow-2xl relative">
            
            {/* Top IDE / UI Header simulation */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 bg-slate-950 px-3 py-0.5 rounded border border-slate-800">
                pathpilot-ai-core-production.ts
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Live Inference
              </div>
            </div>

            {/* Inner App Mockup */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Roadmap status mockup */}
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-purple-400 uppercase">Target Engine</span>
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded">Active</span>
                </div>
                <p className="text-xs font-bold text-white">Data Scientist</p>
                <p className="text-[10px] text-slate-400 mb-3">Estimated 5 Months · 3 Projects</p>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Milestone 3 of 5</span>
                    <span className="text-cyan-400 font-semibold">60%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/40 text-[10px] text-slate-500">
                  Next: <span className="text-slate-300 font-medium">Deep Learning CNNs</span>
                </div>
              </div>

              {/* Voice Mock Interview Mockup */}
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">AI Interviewer</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded animate-pulse">Listening</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Could you explain the optimal space complexity for finding the shortest path in an unweighted graph?"
                  </p>
                </div>

                <div className="mt-4 bg-slate-900 rounded-lg p-2.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Bot className="h-3 w-3 text-purple-400" />
                    <span className="text-[9px] font-semibold text-slate-300">Live Voice Feedback</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Confidence: <span className="text-emerald-400 font-bold">91%</span> · Clear articulation detected.
                  </p>
                </div>
              </div>

              {/* Aptitude Matrix Mockup */}
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Skill Gap Matrix</span>
                  <span className="text-[10px] text-slate-400">Readiness</span>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-slate-300">Python Core</span>
                      <span className="text-emerald-400">Validated</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-slate-300">System Design</span>
                      <span className="text-amber-400">Needs Practice</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-slate-300">ATS Resume Fit</span>
                      <span className="text-cyan-400">Excellent</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigate('crt')}
                  className="w-full mt-3 py-1 bg-slate-900 hover:bg-slate-800 rounded text-[10px] text-purple-300 font-medium transition-colors"
                >
                  Launch Daily Quiz
                </button>
              </div>

            </div>

          </div>

          {/* Decorative Float elements */}
          <div className="absolute -left-6 -bottom-6 hidden lg:block bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Aptitude Score</p>
                <p className="text-xs font-bold text-white">+18% This Week</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-6 -top-6 hidden lg:block bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Active Recruiters</p>
                <p className="text-xs font-bold text-white">1,420+ Hiring Now</p>
              </div>
            </div>
          </div>
        </motion.div>

      </section>

      {/* STATS STRIP */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((st, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {st.value}
                </p>
                <p className="mt-1 text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM & ECOSYSTEM SOLUTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
            The Industry Paradigm Shift
          </h2>
          <h3 className="mt-2 text-2xl sm:text-4xl font-bold text-white">
            Why Traditional Education Fails The Job Market
          </h3>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Students learn passive theory on video sites, practice isolated algorithms, and then apply to random portals with static resumes. The result? **Severe friction and low application response rates.**
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-lg mb-4">
                ✕
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Fragmented Experience</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Juggling separate accounts for learning, coding compilers, interview guides, and resume builders leaves no synchronized insight into your overall placement readiness.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 text-[11px] text-slate-500">
              Old Way: 4+ Subscriptions
            </div>
          </div>

          {/* Column 2 */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                ⚠️
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Static Resumes</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generic CVs fail automated ATS keyword parsing. Without active keyword synchronization targeting exact job IDs, qualified learners are ignored.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 text-[11px] text-slate-500">
              Old Way: 2% Response Rate
            </div>
          </div>

          {/* Column 3 */}
          <div className="rounded-2xl bg-gradient-to-b from-purple-900/20 to-slate-900 border-2 border-purple-500/40 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase">
              The Solution
            </div>
            <div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">PathPilot Unified Brain</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                One continuous telemetry stream. Your coding accuracy instantly feeds your resume keyword suggestions, opening unlocked interviews from pre-partnered Tier-1 tech enterprises.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-purple-800/40 text-[11px] text-purple-300 font-semibold flex items-center gap-1">
              <span>Explore Ecosystem</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>

        </div>

      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-20 bg-slate-900/20 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              Premium Startup Capabilities
            </h2>
            <h3 className="mt-2 text-2xl sm:text-4xl font-bold text-white">
              An Entire Enterprise Stack in One Platform
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              Explore our highly customized features designed to guarantee real-world technical competency and ultimate placement confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${feat.color} p-0.5 mb-5`}>
                      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <h4 className="text-base font-semibold text-white mb-2">{feat.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60">
                    <button
                      onClick={() => {
                        if (feat.title.includes('Roadmap')) onNavigate('roadmap');
                        else if (feat.title.includes('Skill')) onNavigate('skills');
                        else if (feat.title.includes('Interview')) onNavigate('interview');
                        else if (feat.title.includes('Resume')) onNotification('resume');
                        else if (feat.title.includes('Judge0')) onNavigate('coding');
                        else onNavigate('jobs');
                      }}
                      className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Launch Interactive Module</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
            Verified Success Stories
          </h2>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            Trusted by Learners Landing Tier-1 Roles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
                <img 
                  src={test.avatar} 
                  alt={test.author} 
                  className="h-10 w-10 rounded-full object-cover border border-purple-500/40"
                />
                <div>
                  <p className="text-xs font-semibold text-white">{test.author}</p>
                  <p className="text-[10px] text-slate-500">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* OPTIONAL PRICING / PLAN TIERS */}
      <section className="py-20 bg-slate-900/20 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
              Investor Ready Tiers
            </h2>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Transparent Access For Every Lifelong Learner
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Tier 1 */}
            <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Community Starter</p>
                <p className="mt-2 text-3xl font-bold text-white">$0 <span className="text-xs font-normal text-slate-500">/ forever</span></p>
                <p className="mt-2 text-xs text-slate-400">Perfect for exploring fundamental curriculum models.</p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Basic AI Career Roadmap</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Topic-wise Aptitude Practice</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>1 Resume Scan / Month</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('auth')}
                className="mt-8 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Start Free
              </button>
            </div>

            {/* Tier 2 - Pro */}
            <div className="rounded-2xl bg-gradient-to-b from-purple-900/30 to-slate-900 border-2 border-purple-500 p-6 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>

              <div>
                <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">PathPilot Pro</p>
                <p className="mt-2 text-3xl font-bold text-white">$29 <span className="text-xs font-normal text-slate-400">/ month</span></p>
                <p className="mt-2 text-xs text-slate-300">Unlock absolute preparedness for competitive campus placements.</p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span>Unlimited Custom Live Roadmaps</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span>Full Adaptive Test Suite & Leaderboard</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span>Voice AI Mock Interviews</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span>Advanced ATS Resumes & Key Injection</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('auth')}
                className="mt-8 w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors shadow-lg glow-primary"
              >
                Claim Pro Access
              </button>
            </div>

            {/* Tier 3 - Enterprise */}
            <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">University / Enterprise</p>
                <p className="mt-2 text-3xl font-bold text-white">Custom</p>
                <p className="mt-2 text-xs text-slate-400">Deploy institutional placement tracking across entire university batches.</p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>Dedicated Admin Analytics Suite</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>White-labeled Student Dashboards</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>Direct Company Placement API</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('admin')}
                className="mt-8 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Contact Sales / Admin
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
            Got Questions?
          </h2>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-6">
          
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <h4 className="text-sm font-semibold text-white">How does the AI Career Roadmap differ from regular online courses?</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Standard courses force every student through the exact same syllabus. PathPilot analyzes your previous familiarity and automatically skips validated modules, injecting real hands-on distributed systems projects specifically relevant to current job openings.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <h4 className="text-sm font-semibold text-white">Can I actually use the Voice AI Mock Interview feature?</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Yes! Utilizing the browser's native Web Speech API and our embedded LLM gateway, you can practice speaking your answers out loud. The engine computes real-time confidence metrics and gives technical follow-up questions.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5">
            <h4 className="text-sm font-semibold text-white">Is this project setup for hackathon evaluation?</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Absolutely. We provide embedded mock simulator workflows so judges can evaluate the entire premium UI/UX, instantly check ATS evaluation outcomes, test code compilation views, and explore simulated leaderboards instantly without manual configuration!
            </p>
          </div>

        </div>

      </section>

      {/* BOTTOM GIGANTIC CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 border border-purple-500/30 p-10 sm:p-16 relative overflow-hidden">
          
          {/* ambient background glow */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Ready To Pilot Your Future?
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Join over 12,000 ambitious students and professionals who accelerated their career transition from fragmented online courses to permanent technical roles.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('roadmap')}
                className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-xs font-bold text-slate-950 hover:bg-slate-100 transition-colors shadow-lg"
              >
                Launch App Immediately
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto rounded-xl bg-purple-600 px-8 py-3.5 text-xs font-bold text-white hover:bg-purple-500 transition-colors shadow-lg"
              >
                View Live Student Dashboard
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

// Simple notification mock fallback inside component
function onNotification(item: string) {
  console.log(`[Notification Trigger]: Navigating or alerting for ${item}`);
}
