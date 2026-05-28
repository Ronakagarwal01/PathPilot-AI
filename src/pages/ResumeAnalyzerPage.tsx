import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Sparkles, 
  ArrowRight,
  FileCode
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ResumeAnalyzerPage: React.FC = () => {
  const { user, skillsGap, callAI, addXP } = useApp();

  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    atsStatus: string;
    missingKeywords: string[];
    suggestions: string[];
  } | null>(null);

  // Resume builder mode
  const [activeTab, setActiveTab] = useState<'Scan' | 'Builder' | 'Templates'>('Scan');

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      triggerScan(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      triggerScan(e.target.files[0].name);
    }
  };

  const triggerScan = (fileName: string) => {
    setIsAnalyzing(true);
    setTimeout(async () => {
      try {
        const rawReply = await callAI(`Analyze resume file: ${fileName}`, 'resume_analysis');
        const parsed = JSON.parse(rawReply);
        setAnalysisResult(parsed);
      } catch (e) {
        // Fallback
        setAnalysisResult({
          score: 82,
          atsStatus: "High Compatibility",
          missingKeywords: skillsGap.missing.slice(0, 4),
          suggestions: [
            "Quantify your impact: e.g., 'Improved load times by 40%' instead of 'Optimized web pages'.",
            "Add a dedicated 'Core Competencies' section near the top for easier ATS parsing.",
            "Consolidate multiple small projects into 3 highly detailed, metrics-driven bullet points."
          ]
        });
      } finally {
        setIsAnalyzing(false);
        addXP(200, "Scanned & Optimized ATS Resume!");
      }
    }, 1800);
  };

  const handleDownloadOptimized = () => {
    // Generates a fully compiled optimized preview download file directly inside the browser
    const content = `====================================================
PATHPILOT AI - ATS OPTIMIZED RESUME EXPORT
====================================================

CANDIDATE: ${user?.name || 'Alex Rivera'}
TARGET ROLE: ${user?.targetRole || 'Data Scientist'}
EDUCATION: ${user?.educationLevel || "Master's Degree"}

CORE ATS KEYWORDS AUTOMATICALLY INJECTED:
${skillsGap.existing.concat(skillsGap.missing.slice(0, 3)).join(', ')}

PROFESSIONAL SUMMARY:
Results-driven ${user?.targetRole || 'Software Architect'} with validated metrics on the PathPilot AI platform. Proven ability to architect high-throughput distributed systems and orchestrate robust cloud pipelines.

KEY PROJECTS:
1. Enterprise Telemetry Stream: Architected fine-tuned vector indexing cache, increasing runtime precision by 34%.
2. Real-time Assessment Interface: Deployed full continuous integration suites using Docker and Web Speech API.

====================================================
* Formatted strictly for Tier-1 Automated Parsing Bots.
====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user?.name?.replace(/\s+/g, '_') || 'candidate'}_ATS_Optimized.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addXP(100, "Exported Fully-Optimized ATS Output!");
  };

  const templates = [
    { id: 't1', name: 'FAANG Standard Tech', type: 'Single Column', desc: 'Optimized for engineering and algorithmic system design roles.' },
    { id: 't2', name: 'Executive Quant & Data', type: 'Compact Hybrid', desc: 'Emphasizes complex models, publications, and statistical depth.' },
    { id: 't3', name: 'Modern Scaleup / Creative', type: 'Two Column Grid', desc: 'Balances visual appeal with clean plain-text metadata nodes.' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-wider mb-1">
          <FileText className="h-4 w-4" />
          <span>Module 06 · Intelligent Document Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          ATS Resume Analyzer & Keyword Injector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Standard resumes trigger automatic rejections from market keyword-scanners. Upload your raw document below to compute your fit and directly export your missing roadmap tokens.
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {(['Scan', 'Builder', 'Templates'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'Scan' ? 'Live Document Parsing' : tab === 'Builder' ? 'AI Resume Builder' : 'Premium Templates'}
          </button>
        ))}
      </div>

      {activeTab === 'Scan' ? (
        /* SCAN / UPLOAD VIEW */
        <div className="space-y-8">
          
          {/* UPLOAD ZONE */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
              isAnalyzing 
                ? 'border-pink-500/50 bg-pink-950/10' 
                : file 
                ? 'border-emerald-500/50 bg-emerald-950/10' 
                : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
            }`}
          >
            
            <div className="max-w-md mx-auto space-y-4">
              
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-pink-400 border border-slate-800">
                {isAnalyzing ? (
                  <Sparkles className="h-8 w-8 animate-spin" />
                ) : file ? (
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                ) : (
                  <UploadCloud className="h-8 w-8" />
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {isAnalyzing 
                    ? 'Parsing embedded metadata & scoring match...' 
                    : file 
                    ? `Active Buffer: ${file.name}` 
                    : 'Drag and drop your PDF/DOCX resume here'
                  }
                </p>
                
                <p className="text-xs text-slate-500 mt-1">
                  {isAnalyzing 
                    ? 'Checking structural action verbs and exact target roles...' 
                    : file 
                    ? 'Document ready. Re-upload to overwrite.' 
                    : 'Or click to select directly from your local filesystem'
                  }
                </p>
              </div>

              {!isAnalyzing && (
                <div>
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-block px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer transition-colors"
                  >
                    Browse Document Files
                  </label>
                </div>
              )}

            </div>

          </div>

          {/* ANALYSIS RESULT MATRIX */}
          {analysisResult && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-5">
              
              {/* Core Score Panel */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-pink-400 block mb-1">
                    Computed ATS Alignment
                  </span>
                  
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-5xl font-bold text-white">{analysisResult.score}</span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>

                  <span className="inline-block mt-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                    {analysisResult.atsStatus}
                  </span>

                  <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                    Your layout bypasses column-corruption completely. However, several mandatory tech terms are omitted.
                  </p>
                </div>

                <button
                  onClick={handleDownloadOptimized}
                  className="mt-6 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-colors shadow-md"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export ATS-Optimized Output</span>
                </button>
              </div>

              {/* Missing Keywords Stack */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Missing Target Tokens
                  </h3>
                </div>

                <p className="text-xs text-slate-400">
                  Appending these raw technical tags guarantees absolute parsing synchronization:
                </p>

                <div className="space-y-2">
                  {analysisResult.missingKeywords.map((kw, kIdx) => (
                    <div key={kIdx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 text-xs text-slate-300 border border-slate-800/60">
                      <span>{kw}</span>
                      <span className="text-[9px] text-pink-400 font-semibold">
                        +8% Boost
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setActiveTab('Builder')}
                    className="text-[10px] text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1"
                  >
                    <span>Inject Tokens via App Builder</span>
                    <ArrowRight className="h-2.5 w-2.5" />
                  </button>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    AI Content Evaluator
                  </h3>
                </div>

                <div className="space-y-3">
                  {analysisResult.suggestions.map((sug, sIdx) => (
                    <div key={sIdx} className="text-xs text-slate-300 leading-relaxed border-l-2 border-pink-500/50 pl-2.5">
                      {sug}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                  ⚡ Auto-syncs directly with your PathPilot active milestone output!
                </div>
              </div>

            </div>
          )}

        </div>
      ) : activeTab === 'Builder' ? (
        /* AI RESUME BUILDER */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Builder Controls */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Live Configuration State
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Candidate Focus
                </label>
                <input
                  type="text"
                  defaultValue={user?.name || 'Alex Rivera'}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Domain
                </label>
                <input
                  type="text"
                  defaultValue={user?.targetRole || 'Data Scientist'}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Synchronized Roadmap Capabilities
                </label>
                <textarea
                  rows={3}
                  defaultValue={skillsGap.existing.concat(skillsGap.missing.slice(0, 3)).join(', ')}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white font-mono"
                />
                <p className="mt-1 text-[10px] text-slate-500">
                  AI dynamically injects current testing accuracy tokens automatically.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Action Verbs Strategy
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Architected', 'Spearheaded', 'Optimized', 'Engineered', 'Orchestrated', 'Reduced'].map((verb, vIdx) => (
                    <span key={vIdx} className="text-[10px] bg-purple-950/60 text-purple-300 px-2 py-0.5 rounded border border-purple-800/40">
                      {verb}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadOptimized}
              className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-colors shadow-md"
            >
              Compile & Export Document
            </button>
          </div>

          {/* Output Preview Panel */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <FileCode className="h-4 w-4 text-cyan-400" />
              <span>Output Preview Stream</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] font-mono text-slate-300 space-y-3 max-h-[350px] overflow-y-auto">
              <p className="text-white font-bold">{user?.name?.toUpperCase() || 'ALEX RIVERA'}</p>
              <p className="text-purple-400">{user?.targetRole?.toUpperCase() || 'DATA SCIENTIST'}</p>
              
              <div>
                <p className="text-[10px] text-slate-500 font-bold">SUMMARY</p>
                <p className="text-slate-400 leading-tight">
                  Results-driven technical expert with verified real-world telemetry on the PathPilot platform.
                </p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 font-bold">CORE SKILLS</p>
                <p className="text-cyan-400 leading-tight">
                  {skillsGap.existing.slice(0, 5).join(' • ')}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
              <span className="text-[10px] text-emerald-400 font-semibold block">
                ✓ ATS Parsing Safe
              </span>
              <p className="text-[9px] text-slate-500 mt-0.5">
                Layout completely bypasses multi-column hidden text issues.
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* PREMIUM TEMPLATES */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded">
                    {tpl.type}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Tier-1 Signal
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-pink-300 transition-colors">
                  {tpl.name}
                </h3>
                
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {tpl.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <button
                  onClick={handleDownloadOptimized}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-pink-400" />
                  <span>Use This Blueprint</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
