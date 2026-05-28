import React from 'react';
import { Sparkles, Globe, Share2, MessageSquare, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      
      {/* Top Main Details */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Brand & Vision */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-slate-950">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display text-base font-bold text-white">
                PathPilot <span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Transforming raw academic knowledge into immediate employment. The intelligent combination of professional networking, adaptive upskilling, and elite preparation.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="rounded-lg bg-slate-900 p-2 text-slate-400 hover:text-white transition-colors" title="Community Forum">
                <MessageSquare className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-slate-900 p-2 text-slate-400 hover:text-white transition-colors" title="Global Site">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-slate-900 p-2 text-slate-400 hover:text-white transition-colors" title="Share Network">
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Core Modules 1 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Ecosystem Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('roadmap')} className="hover:text-white transition-colors">
                  AI Career Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skills')} className="hover:text-white transition-colors">
                  Skill Gap Analyzers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('crt')} className="hover:text-white transition-colors">
                  CRT & Aptitude Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tests')} className="hover:text-white transition-colors">
                  Adaptive Mock Tests
                </button>
              </li>
            </ul>
          </div>

          {/* Core Modules 2 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Advanced Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('interview')} className="hover:text-white transition-colors">
                  Voice AI Mock Interviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resume')} className="hover:text-white transition-colors">
                  ATS Resume Parsing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors">
                  Intelligent Matching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('coding')} className="hover:text-white transition-colors">
                  Judge0 IDE Cloud Integration
                </button>
              </li>
            </ul>
          </div>

          {/* Hackathon Focus & Investor Readout */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Hackathon Ready
            </h4>
            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3 space-y-2">
              <p className="text-[11px] text-slate-300 font-medium">
                🚀 Built for Rapid Scaling
              </p>
              <p className="text-[10px] text-slate-500 leading-normal">
                Designed to bridge fragmented education pipelines with scalable micro-architecture and real-time inference telemetry.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[10px] text-purple-400 font-semibold">
                <span>Investor Deck Ready</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-500">
            © {new Date().getFullYear()} PathPilot AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 inline" />
            <span>for global lifelong learners.</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
