import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Award,
  Flame,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const CrtAptitudePage: React.FC = () => {
  const { addXP, incrementStreak } = useApp();

  const [activeCategory, setActiveCategory] = useState<'Quant' | 'Logical' | 'Verbal' | 'Coding'>('Quant');
  const [selectedTopic, setSelectedTopic] = useState('Probability');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  
  // Active quiz state
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Curated highly intellectual questions
  const quizBank: Record<string, Question[]> = {
    'Probability': [
      {
        id: 'q1',
        question: 'Two dice are thrown simultaneously. What is the probability of getting a sum of 9?',
        options: ['1/9', '1/12', '1/6', '1/8'],
        correct: 0,
        explanation: 'Favorable outcomes are (3,6), (4,5), (5,4), and (6,3). Total outcomes = 36. Probability = 4/36 = 1/9.'
      },
      {
        id: 'q2',
        question: 'A bag contains 6 white and 4 black balls. Two balls are drawn at random. What is the probability that they are of the same color?',
        options: ['7/15', '8/15', '1/2', '3/7'],
        correct: 0,
        explanation: 'Probability = (6C2 + 4C2) / 10C2 = (15 + 6) / 45 = 21/45 = 7/15.'
      },
      {
        id: 'q3',
        question: 'What is the probability that a leap year selected at random will contain 53 Sundays?',
        options: ['1/7', '2/7', '3/7', '5/7'],
        correct: 1,
        explanation: 'A leap year has 366 days, meaning 52 complete weeks and 2 extra days. The possible combinations for these 2 days are 7. Out of these, 2 combinations contain Sunday. Probability = 2/7.'
      }
    ],
    'Time & Work': [
      {
        id: 'tw1',
        question: 'A can do a piece of work in 10 days and B can do the same work in 15 days. How long will they take to finish it together?',
        options: ['5 days', '6 days', '8 days', '9 days'],
        correct: 1,
        explanation: 'Combined 1 day work = 1/10 + 1/15 = 5/30 = 1/6. Therefore, they will complete the work in 6 days.'
      }
    ]
  };

  const categories = [
    { id: 'Quant', label: 'Quantitative Aptitude', topics: ['Percentage', 'Probability', 'Time & Work', 'Profit & Loss'] },
    { id: 'Logical', label: 'Logical Reasoning', topics: ['Seating Arrangement', 'Puzzles', 'Blood Relations', 'Syllogism'] },
    { id: 'Verbal', label: 'Verbal Ability', topics: ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Sentence Correction'] },
    { id: 'Coding', label: 'Coding Preparation', topics: ['Arrays & Strings', 'Dynamic Programming', 'Graph Algorithms', 'Bit Manipulation'] },
  ];

  const activeTopics = categories.find(c => c.id === activeCategory)?.topics || [];
  const currentQuestions = quizBank[selectedTopic] || quizBank['Probability'];

  const startQuiz = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setIsQuizActive(true);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === currentQuestions[currentQIndex].correct) {
      setScore(prev => prev + 1);
      addXP(40, "Correct Quiz Answer!");
    }
  };

  const handleNext = () => {
    if (currentQIndex + 1 < currentQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      incrementStreak();
      addXP(100, "Completed Daily Aptitude Sprint!");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <BookOpen className="h-4 w-4" />
          <span>Module 03 · Campus Recruitment Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          CRT & Aptitude Preparation
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Master the exact assessment frameworks used by TCS, Infosys, Wipro, and Tier-1 product firms. Answer daily interactive problems to build permanent neural reflex.
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id as any);
              setSelectedTopic(cat.topics[0]);
              setIsQuizActive(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-90 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* TOPICS / CONTROL RACK */}
      {!isQuizActive ? (
        <div className="space-y-6">
          
          {/* Difficulty selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Calibrated Difficulty:</span>
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                  difficulty === diff
                    ? 'bg-slate-800 text-purple-300 border border-purple-500/40'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Topics Display Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeTopics.map((topic, tIdx) => {
              const hasBank = quizBank[topic] !== undefined;
              
              return (
                <div
                  key={tIdx}
                  className="rounded-2xl bg-slate-900/40 border border-slate-800 p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {activeCategory}
                      </span>
                      {hasBank ? (
                        <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded font-semibold">
                          Live Bank
                        </span>
                      ) : (
                        <span className="text-[9px] bg-slate-950 text-slate-500 px-1.5 py-0.5 rounded">
                          AI Synthesized
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-white">{topic}</h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {hasBank ? '3 curated institutional tier problems' : 'Adaptive dynamic parameter set'}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-800/60">
                    <button
                      onClick={() => startQuiz(topic)}
                      className="w-full py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-semibold transition-all border border-purple-500/30"
                    >
                      Launch Timed Quiz
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily Challenge Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
                <Flame className="h-6 w-6 fill-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Daily Placement Challenge</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded font-semibold">
                    +150 XP
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Solve today's high-frequency dynamic programming matrix problem.
                </p>
              </div>
            </div>

            <button
              onClick={() => startQuiz('Probability')}
              className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-lg"
            >
              Accept Challenge
            </button>
          </div>

        </div>
      ) : (
        /* ACTIVE QUIZ ENGINE */
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Quiz Stats Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Topic</span>
              <p className="text-xs font-bold text-white">{selectedTopic} · {difficulty}</p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-slate-300">
                <Clock className="h-3.5 w-3.5 text-purple-400" />
                <span>Question {currentQIndex + 1} of {currentQuestions.length}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <Award className="h-3.5 w-3.5" />
                <span>Score: {score}</span>
              </div>
            </div>
          </div>

          {!quizFinished ? (
            /* Question Box */
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
              
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  Problem Statement
                </span>
                <h3 className="text-base font-semibold text-white leading-relaxed">
                  {currentQuestions[currentQIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestions[currentQIndex].options.map((opt, idx) => {
                  const isCorrect = idx === currentQuestions[currentQIndex].correct;
                  const isSelected = selectedAnswer === idx;
                  
                  let optionStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                  
                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                    } else if (isSelected) {
                      optionStyle = "bg-red-950/60 border-red-500 text-red-200";
                    } else {
                      optionStyle = "bg-slate-950 border-slate-900 text-slate-600 opacity-50";
                    }
                  } else if (isSelected) {
                    optionStyle = "bg-purple-950/60 border-purple-500 text-white";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={isAnswered}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs transition-all text-left ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                          isAnswered && isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && isCorrect && (
                        <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation display */}
              {isAnswered && (
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/80 animate-in fade-in">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">
                    <HelpCircle className="h-3 w-3" />
                    <span>Detailed Solution</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQuestions[currentQIndex].explanation}
                  </p>
                </div>
              )}

              {/* Action Button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-md"
                  >
                    <span>{currentQIndex + 1 < currentQuestions.length ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Results Screen */
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6 animate-in zoom-in-95">
              
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <Award className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Quiz Module Completed!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  You successfully verified your aptitude capabilities for **{selectedTopic}**.
                </p>
              </div>

              {/* Final Matrix */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-medium">Total Questions</p>
                  <p className="text-lg font-bold text-white">{currentQuestions.length}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-medium">Correct</p>
                  <p className="text-lg font-bold text-emerald-400">{score}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-medium">Accuracy</p>
                  <p className="text-lg font-bold text-cyan-400">
                    {Math.round((score / currentQuestions.length) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => startQuiz(selectedTopic)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retry Topic</span>
                </button>
                <button
                  onClick={() => setIsQuizActive(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-md"
                >
                  Return to Module Hub
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
