import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CornerDownRight, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AdvisoryChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am your AI Farm Advisor. I am trained in professional animal husbandry, poultry health logbooks, feed formulation (Pearson Square ratios), and agribusiness profitability strategies.\n\nType your farm challenge below, or select any of the common consulting templates to begin!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new questions
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const commonQuestions = [
    { label: "Brooding Temperature Logs", value: "Give me a step-by-step ventilation and brooding temperature log for broiler flocks from day-1 to day-14." },
    { label: "Increase poultry egg sizes", value: "How can I naturally improve layers diet feeding structure to achieve maximum shell strength and egg size?" },
    { label: "Biosecurity Checklist", value: "What are the top 7 biometric and sanitation biosecurity rules to prevent Newcastle and Infectious Bursal Disease (Gumboro) outbreaks on poultry farms?" },
    { label: "Reduce Feed Cost", value: "Explain how to replace expensive commercial concentrate meal with cheap alternative local grains without sacrificing animal protein value." }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorStatus(null);
    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('Our communication systems are currently receiving high traffic. Please retry.');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Safe markdown converter for bold elements, code blocks, lists, and headings
  const parseMarkdownCustom = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h4 key={lineIdx} className="text-sm font-bold text-slate-900 mt-3 mb-1 font-sans">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={lineIdx} className="text-base font-bold text-slate-900 mt-4 mb-2 border-b border-slate-100 pb-1 font-sans">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={lineIdx} className="text-lg font-bold text-emerald-800 mt-5 mb-2 font-sans">{line.replace('# ', '')}</h2>;
      }
      
      // Bullets
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanContent = line.replace(/^\s*[\*\-]\s+/, '');
        return (
          <div key={lineIdx} className="flex items-start gap-1 pb-1 text-slate-700 text-sm pl-1 font-sans leading-relaxed">
            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
            <span>{parseBoldSyntax(cleanContent)}</span>
          </div>
        );
      }

      // Numbered lists
      const isNumList = /^\d+\.\s+/.test(line.trim());
      if (isNumList) {
        const cleanContent = line.trim().replace(/^\d+\.\s+/, '');
        const match = line.match(/^\d+/);
        const number = match ? match[0] : "1";
        return (
          <div key={lineIdx} className="flex items-start gap-2 pb-1.5 text-slate-700 text-sm pl-0.5 font-sans leading-relaxed">
            <span className="font-bold text-emerald-600 shrink-0 mt-0.5 font-mono text-xs">{number}.</span>
            <span>{parseBoldSyntax(cleanContent)}</span>
          </div>
        );
      }

      // Standard text line
      return line.trim() === '' ? (
        <div key={lineIdx} className="h-2"></div>
      ) : (
        <p key={lineIdx} className="text-slate-700 text-sm pb-1 leading-relaxed font-sans">
          {parseBoldSyntax(line)}
        </p>
      );
    });
  };

  const parseBoldSyntax = (lineText: string) => {
    const parts = lineText.split('**');
    if (parts.length <= 1) return lineText;
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-slate-900">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div id="ai-advisor-panel" className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[650px] overflow-hidden">
      {/* Panel Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl relative">
            <Bot className="h-5 w-5" />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-slate-950 animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white tracking-tight">ACE SMART FARM ADVISOR</h3>
              <span className="px-1.5 py-0.5 text-[9px] font-black text-emerald-400 bg-emerald-950 rounded border border-emerald-900">GEMINI POWERED</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none">Instant livestock & poultry consultancy</p>
          </div>
        </div>
        <button 
          id="btn-clear-chat"
          onClick={() => setMessages([
            {
              role: 'assistant',
              content: "Chat log updated. How can I help you optimize feed formulation ratios, layout brooding runs, or counter livestock outbreaks today?",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ])}
          className="p-1 px-2.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-3 w-3" />
          Clean Chat
        </button>
      </div>

      {/* Suggestion Chips */}
      <div id="ai-suggestion-section" className="bg-slate-950/45 px-3 py-2 border-b border-slate-800 overflow-x-auto whitespace-nowrap flex gap-2">
        {commonQuestions.map((q, idx) => (
          <button
            key={idx}
            id={`chip-btn-${idx}`}
            onClick={() => handleSend(q.value)}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800 hover:bg-emerald-900 hover:text-white text-slate-300 text-xs font-semibold cursor-pointer border border-slate-700/50 hover:border-emerald-700/50 transition-all duration-150 shrink-0 text-left disabled:opacity-50"
          >
            <Sparkles className="h-3 w-3 text-emerald-400 mr-1 shrink-0" />
            {q.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={containerRef}
        id="chat-messages-container"
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-950/20"
      >
        {messages.map((msg, index) => {
          const isAI = msg.role === 'assistant';
          return (
            <div 
              key={index}
              className={`flex items-start ${isAI ? 'justify-start' : 'justify-end'} space-x-3 max-w-full`}
            >
              {isAI && (
                <div className="p-2 bg-emerald-900 border border-emerald-800 text-emerald-300 rounded-lg shrink-0 mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              
              <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isAI ? 'items-start' : 'items-end'}`}>
                <div 
                  className={`p-3.5 rounded-2xl shadow-sm text-sm ${
                    isAI 
                      ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-750' 
                      : 'bg-emerald-600 text-white rounded-tr-none'
                  }`}
                >
                  {isAI ? (
                    <div className="space-y-1.5">{parseMarkdownCustom(msg.content)}</div>
                  ) : (
                    <p className="whitespace-pre-line font-medium leading-relaxed">{msg.content}</p>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1 px-1">{msg.timestamp}</span>
              </div>

              {!isAI && (
                <div className="p-2 bg-slate-700 text-slate-300 rounded-lg shrink-0 mt-0.5">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start space-x-3 justify-start max-w-full">
            <div className="p-2 bg-emerald-900 text-emerald-300 rounded-lg shrink-0">
              <Bot className="h-4 w-4 animate-bounce" />
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3.5 border border-slate-750 flex items-center space-x-2">
                <span className="block h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="block h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="block h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-1 font-bold">Consultant drafting guidance...</span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="p-3.5 bg-red-950/40 border border-red-900 rounded-xl text-red-400 flex items-start gap-2.5 max-w-md mx-auto text-xs">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Advisor service interrupted</p>
              <p className="opacity-90">{errorStatus}</p>
              <button 
                onClick={() => {
                  if (messages.length > 1) {
                    const lastUser = [...messages].reverse().find(m => m.role === 'user');
                    if (lastUser) handleSend(lastUser.content);
                  }
                }}
                className="mt-2 text-indigo-400 hover:text-indigo-300 font-mono text-[10px] uppercase font-bold underline cursor-pointer"
              >
                Retry last prompt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input form */}
      <form 
        id="ai-chatbot-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputValue);
        }}
        className="bg-slate-950 p-4 border-t border-slate-800 flex items-center space-x-3"
      >
        <div className="relative flex-1">
          <input
            type="text"
            id="chat-input-text-field"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            placeholder="Describe your feed or bio-security issues..."
            className="w-full pl-4 pr-10 py-3 bg-slate-900 border border-slate-750 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-100 placeholder-slate-500 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          id="chat-submit-btn"
          disabled={!inputValue.trim() || loading}
          className={`p-3 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            inputValue.trim() && !loading
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
