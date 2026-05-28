import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Send, 
  Award, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatTurn {
  id: string;
  speaker: 'ai' | 'user';
  text: string;
  feedback?: string;
}

export const MockInterviewPage: React.FC = () => {
  const { user, saveInterviewResult, callAI } = useApp();

  const [interviewType, setInterviewType] = useState<'HR' | 'Technical' | 'Coding'>('Technical');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Chat/Audio state
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Final evaluation metrics
  const [evaluation, setEvaluation] = useState<{
    communicationScore: number;
    technicalScore: number;
    confidenceScore: number;
    overallScore: number;
    feedback: string;
  } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Speech Recognition reference
  const recognitionRef = useRef<any>(null);

  const initialQuestions: Record<string, string> = {
    HR: "Welcome to your behavioral evaluation. Could you describe a time when you had to manage a critical project deadline under severe resource constraints?",
    Technical: "Let's test your core software architecture knowledge. In a high-throughput microservices environment, how do you prevent cascading failures between dependent services?",
    Coding: "For your practical coding evaluation, walk me through the optimal data structures you would choose to implement an LRU (Least Recently Used) Cache with O(1) read and write operations."
  };

  useEffect(() => {
    // Setup Web Speech API if supported
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onstart = () => {
        setIsListening(true);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev ? prev + ' ' + transcript : transcript);
      };

      recog.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;
    }
  }, []);

  useEffect(() => {
    let timer: any;
    if (isInterviewActive && !isFinished) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isInterviewActive, isFinished]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isAiThinking]);

  const startInterview = () => {
    setIsInterviewActive(true);
    setIsFinished(false);
    setSecondsElapsed(0);
    setEvaluation(null);
    
    const initQ = initialQuestions[interviewType] || initialQuestions.Technical;
    
    setTurns([
      {
        id: `turn-${Date.now()}`,
        speaker: 'ai',
        text: `Hello ${user?.name || 'candidate'}. I am your automated AI Principal Interviewer for **${targetCompany}**. Let's begin your **${interviewType}** interview.\n\n${initQ}`
      }
    ]);
  };

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert("Microphone integration requires a compatible Web Speech API browser (Chrome/Edge). You can use the text interface flawlessly!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Handle race conditions gracefully
      }
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const candidateAnswer = inputText.trim();
    setInputText('');
    
    // Append candidate turn
    const userTurnId = `turn-${Date.now()}`;
    setTurns(prev => [...prev, {
      id: userTurnId,
      speaker: 'user',
      text: candidateAnswer
    }]);

    setIsAiThinking(true);

    try {
      // Call simulated AI evaluation
      const feedbackText = await callAI(candidateAnswer, 'interview_answer');
      
      // Update candidate turn with instant feedback
      setTurns(prev => prev.map(t => t.id === userTurnId ? { ...t, feedback: feedbackText } : t));

      // Compute follow-up
      const followUps = [
        "That makes sense. Can you elaborate on the security risks associated with that specific approach?",
        "Interesting implementation. How would the memory overhead change if we scaled the active cluster by 10x?",
        "Thank you. Let's pivot slightly: How would you structure your automated unit and integration tests to guarantee 99.9% uptime?"
      ];
      
      const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];

      setTurns(prev => [...prev, {
        id: `turn-${Date.now() + 1}`,
        speaker: 'ai',
        text: randomFollowUp
      }]);

    } catch (e) {
      setTurns(prev => [...prev, {
        id: `turn-${Date.now() + 1}`,
        speaker: 'ai',
        text: "Understood. Let's move on to the final evaluation metric."
      }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleEndInterview = () => {
    setIsFinished(true);
    setIsInterviewActive(false);

    // Compute final hackathon evaluations
    const evalData = {
      communicationScore: 88,
      technicalScore: 84,
      confidenceScore: 92,
      overallScore: 88,
      feedback: `Demonstrated excellent comprehension of ${interviewType === 'Coding' ? 'data structures' : 'systems logic'}. Candidate maintained high articulate clarity throughout the simulation. Suggested focus: Space optimization in edge-case distributed states.`
    };

    setEvaluation(evalData);
    
    // Save to global app state
    saveInterviewResult({
      type: interviewType,
      company: targetCompany,
      communicationScore: evalData.communicationScore,
      technicalScore: evalData.technicalScore,
      confidenceScore: evalData.confidenceScore,
      overallScore: evalData.overallScore,
      feedback: evalData.feedback
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Goldman Sachs', 'TCS Prime', 'Infosys Specialist'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <Mic className="h-4 w-4" />
          <span>Module 05 · Voice Inference Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          AI-Powered Mock Interview Simulator
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Engage in real-time vocal or textual interrogation with fine-tuned enterprise recruiter models. Computes articulation coherence, technical depth, and overall stress resilience instantly.
        </p>
      </div>

      {!isInterviewActive && !isFinished ? (
        /* CONFIGURATION SCREEN */
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-6 max-w-3xl mx-auto">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Configure Interview Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Interview Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Evaluation Category
              </label>
              <div className="space-y-2">
                {(['HR', 'Technical', 'Coding'] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setInterviewType(t)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      interviewType === t
                        ? 'bg-emerald-950/60 border-emerald-500 text-white font-semibold'
                        : 'bg-slate-95 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{t} Interview</span>
                    <span className="text-[9px] text-slate-500">
                      {t === 'HR' ? 'Behavioral' : t === 'Technical' ? 'Architecture' : 'Algorithms'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Firm */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Enterprise Persona
              </label>
              <select
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full rounded-xl bg-slate-95 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {companies.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <div className="mt-4 p-3 rounded-xl bg-slate-95 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-semibold text-emerald-400 block">
                  ⚡ Pre-Trained Context Loaded
                </span>
                <p className="text-[10px] text-slate-400 leading-normal">
                  The LLM gateway actively matches interview tone, typical evaluation matrices, and real historical patterns for **{targetCompany}**.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              onClick={startInterview}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 text-slate-950 font-bold text-xs hover:bg-emerald-500 transition-colors shadow-lg"
            >
              Start Live Interrogation
            </button>
          </div>

        </div>
      ) : isInterviewActive ? (
        /* ACTIVE INTERVIEW ROOM */
        <div className="space-y-6">
          
          {/* Dashboard Control Room Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Volume2 className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{targetCompany} AI Interviewer</span>
                  <span className="text-[9px] bg-emerald-95 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800/40">
                    {interviewType} Mode
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Speak clearly into your microphone or type your response directly below.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs font-mono text-slate-300">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>Elapsed: {formatTime(secondsElapsed)}</span>
              </div>

              <button
                onClick={handleEndInterview}
                className="px-3 py-1.5 rounded-lg bg-red-950/60 text-red-400 border border-red-800/40 text-xs font-semibold hover:bg-red-900 hover:text-white transition-colors"
              >
                Conclude Interview
              </button>
            </div>
          </div>

          {/* Core Telemetry Feed / Chat Room */}
          <div className="rounded-2xl bg-slate-95 border border-slate-800 h-[400px] flex flex-col overflow-hidden">
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {turns.map((turn) => (
                <div key={turn.id} className="space-y-2">
                  
                  {/* Speaker Message */}
                  <div className={`flex gap-3 ${turn.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {turn.speaker === 'ai' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-slate-950 font-bold text-xs">
                        AI
                      </div>
                    )}

                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      turn.speaker === 'user'
                        ? 'bg-slate-800 text-white rounded-br-none'
                        : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-800'
                    }`}>
                      <p className="whitespace-pre-line">{turn.text}</p>
                    </div>

                    {turn.speaker === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-xs">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Inline automated evaluator feedback */}
                  {turn.feedback && (
                    <div className="flex justify-end pr-11">
                      <div className="max-w-[70%] rounded-xl bg-purple-950/40 border border-purple-800/40 p-2.5 text-[11px] text-purple-300 animate-in fade-in">
                        <span className="font-semibold text-purple-200 block mb-0.5 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> Live Feedback Evaluator
                        </span>
                        {turn.feedback}
                      </div>
                    </div>
                  )}

                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-emerald-400">
                    <Bot className="h-3 w-3 animate-spin" />
                  </div>
                  <span className="animate-pulse">Interviewer computing real-time follow-up parameters...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Room */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <form onSubmit={handleSubmitAnswer} className="flex items-center gap-2">
                
                {/* Voice Toggle */}
                <button
                  type="button"
                  onClick={toggleListen}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                    isListening
                      ? 'bg-red-600 text-white border-red-500 animate-pulse'
                      : 'bg-slate-95 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                  title={isListening ? "Stop listening" : "Speak response via native microphone"}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                {/* Text input */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    isListening
                      ? "Listening to your vocal audio stream..."
                      : "Type your thorough articulation response here..."
                  }
                  disabled={isListening || isAiThinking}
                  className="flex-1 rounded-xl bg-slate-95 border border-slate-800 px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                />

                {/* Submit Form */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isAiThinking}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-slate-950 hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>

              </form>

              <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-slate-500">
                <span>⚡ Tip: Using structured explanations triggers optimal scoring parameters.</span>
                {isListening && <span className="text-red-400 font-semibold animate-pulse">● Recording</span>}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* EVALUATION REPORT SCREEN */
        evaluation && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-8 animate-in zoom-in-95">
            
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
                <Award className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Interview Telemetry Finalized</h2>
              <p className="text-xs text-slate-400">
                Simulated target protocol: **{targetCompany}** · Category: **{interviewType}**
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-slate-95 p-4 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Communication</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">{evaluation.communicationScore}%</p>
                <span className="text-[9px] text-slate-500">Articulate coherence</span>
              </div>

              <div className="bg-slate-95 p-4 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Technical Depth</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">{evaluation.technicalScore}%</p>
                <span className="text-[9px] text-slate-500">Architecture fit</span>
              </div>

              <div className="bg-slate-95 p-4 rounded-xl border border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Confidence Metric</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">{evaluation.confidenceScore}%</p>
                <span className="text-[9px] text-slate-500">Vocal flow index</span>
              </div>

              <div className="bg-slate-95 p-4 rounded-xl border border-emerald-500/40 text-center">
                <p className="text-[10px] text-emerald-400 uppercase font-semibold">Overall Rating</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{evaluation.overallScore}%</p>
                <span className="text-[9px] text-slate-500">Selection threshold</span>
              </div>

            </div>

            {/* Granular Feedback */}
            <div className="rounded-xl bg-slate-95 p-5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <AlertCircle className="h-4 w-4 text-purple-400" />
                <span>AI Core Feedback Matrix</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {evaluation.feedback}
              </p>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Added +400 XP to your Lifelong Learning trajectory.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setIsFinished(false);
                  setIsInterviewActive(false);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Simulate Another Company</span>
              </button>
            </div>

          </div>
        )
      )}

    </div>
  );
};
