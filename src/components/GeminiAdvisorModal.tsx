import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, Sparkles, Bot, User, RefreshCw, Cpu, 
  ChevronRight, Building2, MapPin, AlertCircle, ArrowUpRight 
} from 'lucide-react';
import { Property } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  model?: string;
  timestamp: string;
}

interface GeminiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProperty?: Property | null;
  onNavigateToProperty?: (property: Property) => void;
}

const SUGGESTED_PROMPTS = [
  "What are the typical stamp duty (SDLT) costs for a £695k home in Chorlton?",
  "How does living in Didsbury compare with Altrincham for young families?",
  "Tell me about the architectural heritage of Grade II listed mills in Ancoats.",
  "Which Metrolink lines connect West Didsbury directly to Manchester Piccadilly?"
];

export const GeminiAdvisorModal: React.FC<GeminiAdvisorModalProps> = ({
  isOpen,
  onClose,
  activeProperty,
  onNavigateToProperty
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: activeProperty 
        ? `Good day. I am your Senior Property Advisor at Anthony & Co. I see you are inquiring about "${activeProperty.title}" in ${activeProperty.area}. How may I assist with specifications, architectural provenance, local school catchments, or arranging an appraisal?`
        : 'Good day. Welcome to Anthony & Co. I am your Senior Property Advisor for Greater Manchester prime residential estates. Whether you require guidance on market valuations, Victorian architectural provenance, Metrolink commutes, or grammar school catchments across Didsbury, Ancoats, or Altrincham, I am entirely at your service.',
      model: 'gemini-3.5-flash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setErrorNotice(null);
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Map messages for multi-turn Gemini API
      const apiMessages = newHistory.map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          model: selectedModel,
          propertyContext: activeProperty ? {
            title: activeProperty.title,
            address: activeProperty.address,
            area: activeProperty.area,
            price: activeProperty.price,
            listingType: activeProperty.listingType,
            bedrooms: activeProperty.bedrooms,
            propertyType: activeProperty.propertyType,
            tenure: activeProperty.tenure,
            epcRating: activeProperty.epcRating
          } : undefined
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const modelReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        role: 'model',
        text: data.text,
        model: data.model || selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelReply]);
    } catch (err: any) {
      console.error('Chat advisory error:', err);
      setErrorNotice(err.message || 'Unable to connect to the advisor service. Please verify server connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: 'Conversation reset. How may I assist your Manchester property journey today?',
        model: selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorNotice(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] border border-[#E6E3DC] w-full max-w-3xl h-[88vh] max-h-[820px] shadow-2xl flex flex-col overflow-hidden relative rounded-none">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E6E3DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1A1917] flex items-center justify-center text-white">
              <Bot className="w-5 h-5 text-[#C25E3B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg text-[#1A1917] font-medium leading-none">
                  Anthony & Co. AI Property Advisory
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F1DBD2] text-[#8C3A1E] uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-[#75716B] mt-0.5">
                Multi-turn residential consultation powered by Google Gemini
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetConversation}
              className="p-2 text-[#75716B] hover:text-[#1A1917] hover:bg-[#F3F1EC] transition-colors cursor-pointer rounded"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#75716B] hover:text-[#1A1917] hover:bg-[#F3F1EC] transition-colors cursor-pointer rounded"
              aria-label="Close advisor modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selector Bar */}
        <div className="px-4 py-2.5 bg-[#F3F1EC] border-b border-[#E6E3DC] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#57534E]">
            <Cpu className="w-3.5 h-3.5 text-[#C25E3B]" />
            <span className="font-medium">Model Engine:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedModel('gemini-3.5-flash')}
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer border ${
                selectedModel === 'gemini-3.5-flash'
                  ? 'bg-[#1A1917] text-white border-[#1A1917]'
                  : 'bg-white text-[#57534E] border-[#E6E3DC] hover:border-[#1A1917]'
              }`}
              title="General residential inquiries and property advice"
            >
              gemini-3.5-flash (General)
            </button>
            <button
              onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer border ${
                selectedModel === 'gemini-3.1-pro-preview'
                  ? 'bg-[#1A1917] text-white border-[#1A1917]'
                  : 'bg-white text-[#57534E] border-[#E6E3DC] hover:border-[#1A1917]'
              }`}
              title="Complex financial analysis, planning, & in-depth valuations"
            >
              gemini-3.1-pro-preview (Complex)
            </button>
            <button
              onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer border ${
                selectedModel === 'gemini-3.1-flash-lite'
                  ? 'bg-[#1A1917] text-white border-[#1A1917]'
                  : 'bg-white text-[#57534E] border-[#E6E3DC] hover:border-[#1A1917]'
              }`}
              title="High-velocity quick responses"
            >
              gemini-3.1-flash-lite (Fast)
            </button>
          </div>
        </div>

        {/* Optional Active Property Banner */}
        {activeProperty && (
          <div className="px-4 py-2 bg-[#EBE7DF] border-b border-[#E6E3DC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <Building2 className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
              <span className="font-medium text-[#1A1917] truncate">
                Context: {activeProperty.title} ({activeProperty.area})
              </span>
            </div>
            {onNavigateToProperty && (
              <button
                onClick={() => onNavigateToProperty(activeProperty)}
                className="text-[#C25E3B] hover:underline flex items-center gap-1 font-medium shrink-0 ml-2 cursor-pointer"
              >
                View Listing <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                    isUser ? 'bg-[#C25E3B] text-white' : 'bg-[#1A1917] text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#FAF9F5]" />}
                </div>

                <div className="space-y-1">
                  <div
                    className={`p-3.5 sm:p-4 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#1A1917] text-white shadow-sm'
                        : 'bg-white border border-[#E6E3DC] text-[#1A1917] shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>

                  <div className={`flex items-center gap-2 text-[10px] text-[#A8A29E] px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{m.timestamp}</span>
                    {m.model && !isUser && (
                      <span className="text-[#C25E3B] font-mono">[{m.model}]</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto items-center">
              <div className="w-7 h-7 rounded-full bg-[#1A1917] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#C25E3B] animate-pulse" />
              </div>
              <div className="bg-white border border-[#E6E3DC] p-3.5 text-xs text-[#75716B] flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C25E3B] animate-ping" />
                <span>Advisor reviewing Manchester registry and property archives via {selectedModel}...</span>
              </div>
            </div>
          )}

          {errorNotice && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorNotice}</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts Pills */}
        <div className="p-3 bg-[#FAF9F5] border-t border-[#E6E3DC] overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[11px] font-medium text-[#75716B] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C25E3B]" /> Suggestions:
            </span>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 text-xs bg-white hover:bg-[#F3F1EC] text-[#57534E] hover:text-[#1A1917] border border-[#E6E3DC] rounded-full transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E6E3DC]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask our Senior Manchester Property Advisor about prices, schools, heritage..."
              disabled={isLoading}
              className="flex-1 bg-[#FAF9F5] border border-[#E6E3DC] px-4 py-2.5 text-sm text-[#1A1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1A1917] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <span>Consult</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="mt-1.5 text-[10px] text-[#A8A29E] text-center">
            Multi-turn conversation history is maintained for this session. Model selections switch seamlessly.
          </div>
        </div>

      </div>
    </div>
  );
};
