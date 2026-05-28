import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, HelpCircle, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose }) => {
  const { user, callAI } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${user?.name || 'there'}! I am **PathPilot AI**, your dedicated 24/7 hyper-personalized career mentor. I combine insights from LinkedIn, Coursera, and LeetCode to direct your transition to employment.\n\nHow can I accelerate your journey today?`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const query = customText || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const replyText = await callAI(query, 'chatbot');
      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now() + 2}`,
        sender: 'ai',
        text: "⚠️ I encountered a minor signal loss. However, my secondary cache advises you to continue with the **CRT & Aptitude** module for guaranteed interview preparation!",
        timestamp: 'Just now'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "🚀 Give me a standout custom project idea",
    "💡 How to optimize my resume for ATS?",
    "🎯 Top LeetCode patterns for Tech Interviews",
    "📊 Design a 7-day Aptitude test sprint"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-950 px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">PathPilot AI Mentor</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[9px] text-slate-400">Hyper-Personalized Guidance</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-950/40 to-slate-900/20">
        
        {/* Hackathon notification banner */}
        <div className="rounded-lg bg-purple-950/40 border border-purple-800/40 p-2 flex items-center gap-2 text-[10px] text-purple-300">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-purple-400" />
          <span>Tap any quick prompt below for real-time generative output!</span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-[10px] font-bold">
                AI
              </div>
            )}

            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/50'
            }`}>
              
              {/* Render formatting safely */}
              {msg.text.split('\n\n').map((paragraph, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                  {paragraph.startsWith('💡') || paragraph.startsWith('🎯') || paragraph.startsWith('🚀') ? (
                    <span className="font-semibold text-purple-300 block mb-1">{paragraph}</span>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}

              <span className={`block text-[8px] mt-1 text-right ${
                msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-300 text-[10px]">
                <User className="h-3 w-3" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-950 text-purple-400">
              <Loader2 className="h-3 w-3 animate-spin" />
            </div>
            <span className="animate-pulse">Synthesizing dynamic pathway...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Container */}
      <div className="px-3 py-2 bg-slate-950 border-t border-slate-800/80">
        <p className="text-[9px] font-medium text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <HelpCircle className="h-2.5 w-2.5" /> Suggested Queries
        </p>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              disabled={isLoading}
              className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2 py-1 rounded-md transition-colors text-left truncate max-w-[170px]"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex items-center gap-2 p-2 bg-slate-950 border-t border-slate-800"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Mentor anything..."
          className="flex-1 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50 transition-colors"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>

    </div>
  );
};
