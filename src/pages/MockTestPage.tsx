import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Award, 
  AlertCircle, 
  Layers, 
  Trophy,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MockTestPage: React.FC = () => {
  const { testScores, saveTestResult } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Full' | 'Sectional'>('All');
  
  // Test UI State
  const [activeTest, setActiveTest] = useState<{
    name: string;
    category: 'Quant' | 'Logical' | 'Verbal' | 'Coding' | 'Full Mock';
    duration: number;
    questionsCount: number;
  } | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<{
    score: number;
    accuracy: number;
    weakTopics: string[];
  } | null>(null);

  const testsList = [
    { name: "TCS NQT National Qualifier Mock", category: "Full Mock" as const, duration: 90, questionsCount: 60, difficulty: "Adaptive" },
    { name: "Infosys Systems Engineer Blueprint", category: "Full Mock" as const, duration: 100, questionsCount: 65, difficulty: "Intermediate" },
    { name: "Quantitative Aptitude Advanced Sprint", category: "Quant" as const, duration: 30, questionsCount: 20, difficulty: "Advanced" },
    { name: "Logical Reasoning Matrix Assessment", category: "Logical" as const, duration: 25, questionsCount: 15, difficulty: "Intermediate" },
    { name: "Verbal Articulation Test", category: "Verbal" as const, duration: 20, questionsCount: 20, difficulty: "Beginner" },
    { name: "FAANG Competitive Coding Evaluation", category: "Coding" as const, duration: 60, questionsCount: 3, difficulty: "Advanced" },
  ];

  const filteredTests = activeTab === 'All' 
    ? testsList 
    : activeTab === 'Full' 
    ? testsList.filter(t => t.category === 'Full Mock')
    : testsList.filter(t => t.category !== 'Full Mock');

  useEffect(() => {
    let timer: any;
    if (activeTest && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeTest && !isSubmitting) {
      handleForceSubmit();
    }
    return () => clearInterval(timer);
  }, [activeTest, timeLeft]);

  const startTest = (test: typeof testsList[0]) => {
    setActiveTest({
      name: test.name,
      category: test.category,
      duration: test.duration,
      questionsCount: test.questionsCount
    });
    setTimeLeft(test.duration * 60);
    setLastResult(null);
  };

  const handleForceSubmit = () => {
    if (!activeTest) return;
    setIsSubmitting(true);
    
    // Simulate complex background evaluation
    setTimeout(() => {
      // Deterministic high performance results
      const scoreRatio = 0.82; 
      const computedScore = Math.round(activeTest.questionsCount * scoreRatio);
      
      const res = {
        testName: activeTest.name,
        category: activeTest.category,
        score: computedScore,
        total: activeTest.questionsCount,
        accuracy: 85,
        timeTaken: `${Math.round(activeTest.duration * 0.9)} mins`,
        weakTopics: activeTest.category === 'Quant' ? ['Time & Work'] : ['Advanced Recursion Complexity', 'Graph Traversal']
      };

      saveTestResult(res);
      setLastResult({
        score: res.score,
        accuracy: res.accuracy,
        weakTopics: res.weakTopics
      });
      setIsSubmitting(false);
      setActiveTest(null);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Static mock leaderboard
  const leaderboards = [
    { rank: 1, name: "Priya Sharma", score: "98.5%", test: "TCS NQT National" },
    { rank: 2, name: "Alex Rivera (You)", score: "85.0%", test: "TCS NQT National" },
    { rank: 3, name: "David Chen", score: "82.1%", test: "Infosys Systems" },
    { rank: 4, name: "Sarah Jenkins", score: "79.4%", test: "FAANG Competitive" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <CheckSquare className="h-4 w-4" />
          <span>Module 04 · Live Test Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Adaptive Mock Test System
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Simulate timed, high-stakes testing interfaces. The embedded assessment telemetry dynamically adjusts parameter difficulty and calculates absolute algorithmic readiness. You have validated <span className="text-white font-semibold">{testScores.length} secure mock attempts</span>.
        </p>
      </div>

      {/* ACTIVE TEST OVERLAY / SCREEN */}
      {activeTest ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6 animate-in fade-in">
          
          {/* Header strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] bg-purple-950 text-purple-400 px-2 py-0.5 rounded font-semibold uppercase">
                {activeTest.category}
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{activeTest.name}</h2>
              <p className="text-xs text-slate-400">Total: {activeTest.questionsCount} adaptive parameter items</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
                <Clock className="h-4 w-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-amber-400">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <button
                onClick={handleForceSubmit}
                disabled={isSubmitting}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold hover:opacity-90 transition-all shadow-md"
              >
                {isSubmitting ? 'Evaluating...' : 'Submit Evaluation'}
              </button>
            </div>
          </div>

          {/* Test UI Simulation body */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4">
            
            {/* Question matrix navigation panel */}
            <div className="md:col-span-1 space-y-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase">Question Grid</p>
              <div className="grid grid-cols-5 gap-1.5 max-h-60 overflow-y-auto pr-1">
                {[...Array(activeTest.questionsCount)].map((_, i) => (
                  <button
                    key={i}
                    className={`h-7 w-7 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                      i === 0 
                        ? 'bg-purple-600 text-white' 
                        : i < 5 
                        ? 'bg-slate-800 text-slate-300' 
                        : 'bg-slate-950 text-slate-600 border border-slate-800/60'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="pt-2 space-y-1 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded bg-purple-600"></span> Active
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded bg-slate-800"></span> Answered
                </div>
              </div>
            </div>

            {/* Simulated interactive question window */}
            <div className="md:col-span-3 rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">ID: SEC-A-01</span>
                <span className="text-[10px] text-purple-400 font-semibold">+3 Marks</span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white leading-relaxed">
                  Which of the following is an optimal strategy to prevent Race Conditions in a highly concurrent distributed database?
                </h3>
              </div>

              <div className="space-y-2">
                {[
                  "Using standard read-uncommitted isolation layers",
                  "Implementing Distributed Locks via Redis or ZooKeeper",
                  "Increasing simple server memory thread pools",
                  "Disabling atomic write transactions globally"
                ].map((opt, oIdx) => (
                  <label 
                    key={oIdx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs text-slate-300"
                  >
                    <input type="radio" name="mock-q" defaultChecked={oIdx === 1} className="text-purple-600 focus:ring-purple-500" />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800/80">
                <button className="px-3 py-1 rounded bg-slate-900 text-slate-400 text-[11px] hover:text-white">
                  &larr; Previous
                </button>
                <button className="px-4 py-1 rounded bg-purple-600 text-white text-[11px] font-semibold">
                  Save & Next &rarr;
                </button>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* MAIN LIST INTERFACE */
        <div className="space-y-6">
          
          {/* Tab switches */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex gap-2">
              {(['All', 'Full', 'Sectional'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab} Assessments
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Showing {filteredTests.length} Active Frameworks
            </span>
          </div>

          {/* Tests Card list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-slate-900/40 border border-slate-800 p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-bold uppercase text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">
                      {test.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {test.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white">{test.name}</h3>
                  
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-500" /> {test.duration} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3 text-slate-500" /> {test.questionsCount} items
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[9px] text-emerald-400 font-semibold">
                    Instant Evaluation
                  </span>

                  <button
                    onClick={() => startTest(test)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-sm"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Last Test Output Panel */}
          {lastResult && (
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 border border-purple-500/40 p-6 animate-in slide-in-from-bottom-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <Award className="h-4 w-4" />
                <span>Evaluation Telemetry Computed</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                <div>
                  <p className="text-xs text-slate-300">Your Calculated Assessment Output:</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {lastResult.score} <span className="text-xs font-normal text-slate-500">points</span>
                  </p>
                  <p className="text-[10px] text-cyan-400 mt-0.5">Estimated Percentile: **91.4%**</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Detected Weaknesses</p>
                  {lastResult.weakTopics.map((wt, wIdx) => (
                    <div key={wIdx} className="flex items-center gap-1.5 text-xs text-amber-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{wt}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Prescribed Action</p>
                  <p className="text-[11px] text-slate-300 leading-tight mb-2">
                    Review our dynamic video resources in the AI roadmap to stabilize recursion complexity accuracy.
                  </p>
                  <span className="text-[10px] text-purple-400 font-semibold flex items-center gap-1">
                    <span>Telemetry Synced Automatically</span>
                    <CheckSquare className="h-3 w-3" />
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* LEADERBOARD VIEW */}
          <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-5 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-amber-400" />
                <span>Global Placement Assessment Leaderboard</span>
              </h3>
              <span className="text-[10px] text-slate-500">Updated real-time</span>
            </div>

            <div className="space-y-2">
              {leaderboards.map((lb) => (
                <div 
                  key={lb.rank}
                  className={`flex items-center justify-between p-2.5 rounded-xl border ${
                    lb.name.includes('(You)') 
                      ? 'bg-purple-950/40 border-purple-500/40 text-white' 
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 text-center text-xs font-bold ${
                      lb.rank === 1 ? 'text-amber-400' : lb.rank === 2 ? 'text-slate-300' : 'text-amber-600'
                    }`}>
                      #{lb.rank}
                    </span>
                    <div>
                      <p className="text-xs font-semibold">{lb.name}</p>
                      <p className="text-[9px] text-slate-500">{lb.test}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">{lb.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
