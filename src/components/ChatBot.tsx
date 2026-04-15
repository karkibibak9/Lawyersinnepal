'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Scale, Smartphone, Loader2, ChevronRight } from 'lucide-react';
import type { BookingState, BookingData } from '@/lib/chatEngine';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  { label: '⚖️ Services offered', value: 'What legal services do you offer?' },
  { label: '📅 Book appointment', value: 'I want to book a consultation' },
  { label: '🏢 Company registration', value: 'How do I register a company in Nepal?' },
  { label: '💔 Divorce procedure', value: 'How does divorce work in Nepal?' },
  { label: '📍 Office location', value: 'Where is your office located?' },
  { label: '💰 Legal fees', value: 'How much do your legal services cost?' },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! 🙏 I\'m the Lawyers In Nepal virtual assistant. I can answer your legal questions or help you book a free consultation.\n\nHow can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>('idle');
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showQuickQ, setShowQuickQ] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setShowQuickQ(false);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          bookingState,
          bookingData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBookingState(data.bookingState || 'idle');
        setBookingData(data.bookingData || {});
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.text || 'I\'m having trouble right now. Please call us at +977 9815861066.',
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection issue! Please try again or reach us directly:\n📞 +977 9815861066\n📱 WhatsApp available below.',
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, bookingState, bookingData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  // Format message: bold **text**, newlines
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-gold-400 font-bold">{part}</strong> : part
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat window */}
      {isOpen && (
        <div
          className="bg-[#0b1320] rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.7)]"
          style={{
            width: 'min(360px, calc(100vw - 2rem))',
            maxHeight: 'calc(100dvh - 8rem)',
            animation: 'slideUp 0.25s ease-out',
          }}>

          {/* Header */}
          <div className="bg-[#0a1628] px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center shadow-lg">
                  <Scale size={18} className="text-[#0a1628]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a1628] shadow-[0_0_6px_#4ade80]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Legal Assistant</p>
                <p className="text-green-400 text-[10px] font-medium tracking-wide">● Online — typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/40 hover:text-white transition-colors p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#0d1a2e]/80"
            style={{ scrollbarWidth: 'none' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animation: 'fadeUp 0.2s ease-out' }}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    <Scale size={13} className="text-[#0a1628]" />
                  </div>
                )}
                <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-yellow-600 text-[#0a1628] font-medium rounded-tr-sm'
                    : 'bg-[#162035] border border-white/8 text-slate-200 rounded-tl-sm'
                }`}>
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start" style={{ animation: 'fadeUp 0.2s ease-out' }}>
                <div className="w-7 h-7 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                  <Scale size={13} className="text-[#0a1628]" />
                </div>
                <div className="bg-[#162035] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-yellow-500/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-yellow-500/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-yellow-500/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Quick questions (shown at start) */}
            {showQuickQ && messages.length === 1 && !isTyping && (
              <div className="pt-1 space-y-1.5" style={{ animation: 'fadeUp 0.3s ease-out 0.2s both' }}>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold pl-9">Quick questions</p>
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q.value)}
                    className="w-full ml-9 text-left text-[12px] px-3 py-2 bg-[#1a2640] border border-white/8 text-slate-300 hover:border-yellow-600/50 hover:text-white hover:bg-[#1f2e4a] transition-all rounded-lg flex items-center justify-between group"
                    style={{ width: 'calc(100% - 2.25rem)' }}
                  >
                    <span>{q.label}</span>
                    <ChevronRight size={12} className="text-white/20 group-hover:text-yellow-600 transition-colors" />
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp strip */}
          <a
            href="https://wa.me/9779815861066"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 bg-green-600/10 border-t border-green-600/20 hover:bg-green-600/20 text-green-400 text-[11px] font-semibold tracking-wide transition-all"
          >
            <Smartphone size={13} />
            Chat directly on WhatsApp
          </a>

          {/* Input */}
          <div className="px-3 py-3 bg-[#0a1628] border-t border-white/5">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder={
                  bookingState === 'name' ? 'Enter your full name...' :
                  bookingState === 'phone' ? 'Enter your phone number...' :
                  bookingState === 'service' ? 'Enter service number or name...' :
                  bookingState === 'date' ? 'Enter preferred date & time...' :
                  bookingState === 'confirm' ? 'Type "confirm" or "cancel"...' :
                  'Ask a legal question...'
                }
                disabled={isTyping}
                className="flex-1 bg-[#162035] border border-white/10 text-white text-[13px] placeholder:text-white/25 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-yellow-600/50 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                aria-label="Send message"
                className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-[#0a1628] w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open legal assistant chat'}
        className="relative bg-gradient-to-br from-yellow-500 to-yellow-700 text-[#0a1628] p-4 rounded-full shadow-[0_8px_30px_rgba(202,138,4,0.4)] hover:shadow-[0_8px_40px_rgba(202,138,4,0.6)] hover:scale-110 transition-all active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white shadow-[0_0_8px_#4ade80] animate-pulse" />
        )}
      </button>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
