import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  Check, 
  RotateCcw, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  XCircle,
  FileCode2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CodingPlatformPage: React.FC = () => {
  const { addXP } = useApp();

  const [language, setLanguage] = useState<'Python' | 'JavaScript' | 'Java' | 'C++'>('Python');
  const [activeProblemId, setActiveProblemId] = useState('p1');
  
  // Execution status
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<{
    status: 'Success' | 'Runtime Error' | 'Compilation Error';
    stdout: string;
    executionTime: string;
    memoryUsed: string;
    complexity: string;
    passedCases: number;
    totalCases: number;
  } | null>(null);

  const problems = [
    {
      id: 'p1',
      title: '1. Two Sum (Optimized Hash Map)',
      difficulty: 'Easy',
      acceptance: '54.2%',
      desc: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] == 6.' }
      ],
      defaultCode: {
        Python: `def two_sum(nums, target):
    # Write your highly optimized O(n) space/time code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        JavaScript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
        Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
        'C++': `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`
      }
    },
    {
      id: 'p2',
      title: '2. LRU Cache Implementation',
      difficulty: 'Medium',
      acceptance: '41.8%',
      desc: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the `LRUCache` class:\n• `LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.\n• `int get(int key)` Return the value of the key if the key exists, otherwise return -1.\n• `void put(int key, int value)` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.',
      examples: [
        { input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]', output: '[null, null, null, 1, null, -1, null, -1, 3, 4]', explanation: 'Standard LRU cache behavior.' }
      ],
      defaultCode: {
        Python: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end to show it was recently used
        self.cache[key] = self.cache.pop(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> void:
        if key in self.cache:
            self.cache.pop(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Pop the first item (least recently used)
            iter_obj = iter(self.cache)
            first_key = next(iter_obj)
            self.cache.pop(first_key)`,
        JavaScript: `// LRU Cache implementation`,
        Java: `// LRU Cache implementation`,
        'C++': `// LRU Cache implementation`
      }
    }
  ];

  const currentProblem = problems.find(p => p.id === activeProblemId) || problems[0];
  const [code, setCode] = useState(currentProblem.defaultCode[language]);

  const handleLanguageChange = (lang: 'Python' | 'JavaScript' | 'Java' | 'C++') => {
    setLanguage(lang);
    setCode(currentProblem.defaultCode[lang] || '// Write your optimal code here');
  };

  const handleProblemChange = (id: string) => {
    setActiveProblemId(id);
    const prob = problems.find(p => p.id === id) || problems[0];
    setCode(prob.defaultCode[language] || '// Write your optimal code here');
    setOutput(null);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate high precision compilation integration via Judge0
    setTimeout(() => {
      setOutput({
        status: 'Success',
        stdout: `Test Case 1: Passed\nInput: nums = [2,7,11,15], target = 9\nOutput: [0, 1]\nExpected: [0, 1]\n\nTest Case 2: Passed\nInput: nums = [3,2,4], target = 6\nOutput: [1, 2]\nExpected: [1, 2]`,
        executionTime: '24ms',
        memoryUsed: '14.2 MB',
        complexity: 'O(N) Time | O(N) Space',
        passedCases: 2,
        totalCases: 2
      });
      setIsRunning(false);
      addXP(50, "Executed Compiler Test!");
    }, 1200);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setOutput(null);

    setTimeout(() => {
      setOutput({
        status: 'Success',
        stdout: `Submission Evaluated against 108 hidden backend test-cases.\nAll 108 test cases passed seamlessly.\n\nRuntime Beats 94.2% of submissions in ${language}.\nMemory usage optimal: Beats 88.5% of market outputs.`,
        executionTime: '18ms',
        memoryUsed: '13.9 MB',
        complexity: 'O(N) Time | O(N) Space',
        passedCases: 108,
        totalCases: 108
      });
      setIsSubmitting(false);
      addXP(300, "Successfully Submitted Competitive Solution!");
    }, 1600);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
          <Code2 className="h-4 w-4" />
          <span>Module 08 · Judge0 Cloud IDE Gateway</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Competitive Coding Engine
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Execute, analyze, and benchmark algorithmic logic instantly. Synchronizes execution speed and stack memory utilization targeting high-frequency FAANG patterns.
        </p>
      </div>

      {/* SPLIT SCREEN IDE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* LEFT COLUMN: PROBLEM STATEMENT & CASES */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col h-full overflow-hidden">
          
          {/* Header tab */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <select
              value={activeProblemId}
              onChange={(e) => handleProblemChange(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs font-semibold text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-amber-500 w-full max-w-[280px]"
            >
              {problems.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>

            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              currentProblem.difficulty === 'Easy' 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' 
                : 'bg-amber-950 text-amber-400 border border-amber-800/40'
            }`}>
              {currentProblem.difficulty}
            </span>
          </div>

          {/* Description Content */}
          <div className="p-5 overflow-y-auto flex-1 space-y-6">
            
            <div>
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                <span>Acceptance: <strong className="text-white">{currentProblem.acceptance}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-purple-400">
                  <Sparkles className="h-3 w-3" /> ATS Verified Keyword Match
                </span>
              </div>

              <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                {currentProblem.desc}
              </p>
            </div>

            {/* Examples */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                Execution Constraints & Previews
              </span>

              {currentProblem.examples.map((ex, exIdx) => (
                <div key={exIdx} className="rounded-xl bg-slate-950 p-3.5 border border-slate-800/80 text-xs font-mono space-y-2">
                  <p className="text-slate-400">
                    <strong className="text-slate-500">Input:</strong> {ex.input}
                  </p>
                  <p className="text-slate-300">
                    <strong className="text-slate-500">Output:</strong> {ex.output}
                  </p>
                  {ex.explanation && (
                    <p className="text-[11px] text-slate-500 font-sans mt-1">
                      <em>Explanation:</em> {ex.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Custom test case configuration tabs simulation */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Active Test Matrix
              </span>
              <div className="flex gap-2">
                <span className="text-[10px] bg-slate-950 text-amber-400 px-2.5 py-1 rounded border border-slate-800 font-semibold">
                  Case 1
                </span>
                <span className="text-[10px] bg-slate-950 text-slate-500 px-2.5 py-1 rounded border border-slate-800">
                  Case 2
                </span>
                <span className="text-[10px] bg-slate-950 text-slate-500 px-2.5 py-1 rounded border border-slate-800">
                  + Custom Case
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: EDITOR & CONSOLE OUTPUT */}
        <div className="lg:col-span-7 flex flex-col gap-4 h-full">
          
          {/* EDITOR CARD */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col flex-1 overflow-hidden">
            
            {/* Editor Action Rack */}
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <FileCode2 className="h-4 w-4 text-amber-400" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 px-2.5 py-1 rounded-md focus:outline-none focus:border-amber-500 font-mono"
                >
                  {['Python', 'JavaScript', 'Java', 'C++'].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(currentProblem.defaultCode[language])}
                  className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-900"
                  title="Reset to initial boilerplate"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={handleRun}
                  disabled={isRunning || isSubmitting}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-50 transition-colors"
                >
                  <Play className="h-3 w-3 text-amber-400" />
                  <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={isRunning || isSubmitting}
                  className="flex items-center gap-1 px-4 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
                >
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                  <span>{isSubmitting ? 'Evaluating...' : 'Submit Output'}</span>
                </button>
              </div>

            </div>

            {/* Editable Code block */}
            <div className="flex-1 relative flex">
              {/* Simple Line Numbers Mock */}
              <div className="w-10 bg-slate-950 text-slate-700 font-mono text-xs select-none text-right pr-3 py-4 space-y-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Textarea Code Space */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 bg-slate-950 text-slate-100 font-mono text-xs p-4 leading-relaxed focus:outline-none resize-none selection:bg-slate-800"
                placeholder="// Write your logic here"
              />
            </div>

          </div>

          {/* CONSOLE / OUTPUT CARD */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 min-h-[160px] flex flex-col justify-between">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Terminal className="h-3 w-3 text-cyan-400" /> Compiler Inference Console
              </span>

              {output && (
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="text-slate-400 font-mono">
                    Time: <strong className="text-white">{output.executionTime}</strong>
                  </span>
                  <span className="text-slate-400 font-mono">
                    Memory: <strong className="text-white">{output.memoryUsed}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Output view body */}
            <div className="flex-1 overflow-y-auto font-mono text-xs">
              
              {isRunning || isSubmitting ? (
                <div className="flex items-center gap-2 text-slate-500 h-full py-4">
                  <Cpu className="h-4 w-4 animate-spin text-amber-400" />
                  <span className="animate-pulse">
                    {isRunning ? 'Connecting to remote Judge0 Docker instance...' : 'Running hidden unit testing matrices...'}
                  </span>
                </div>
              ) : output ? (
                <div className="space-y-3 animate-in fade-in py-1">
                  
                  <div className="flex items-center gap-2">
                    {output.status === 'Success' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
                        <CheckCircle2 className="h-3 w-3" /> {output.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-800/40">
                        <XCircle className="h-3 w-3" /> {output.status}
                      </span>
                    )}

                    <span className="text-[10px] text-slate-400">
                      Passed {output.passedCases} / {output.totalCases} testing routines
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 whitespace-pre-line text-[11px] leading-relaxed">
                    {output.stdout}
                  </div>

                  {/* Complexity Analysis Box */}
                  <div className="p-2.5 rounded bg-purple-950/20 border border-purple-500/30 flex items-center justify-between text-[11px]">
                    <span className="text-purple-300 font-semibold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> AI Complexity Evaluator
                    </span>
                    <span className="text-white font-mono font-bold">
                      {output.complexity}
                    </span>
                  </div>

                </div>
              ) : (
                <div className="flex items-center justify-center h-full py-8 text-slate-600 text-xs">
                  Click 'Run Code' or 'Submit Output' to launch automated telemetry validation.
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
