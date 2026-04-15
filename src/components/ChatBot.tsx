'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Scale, Smartphone, Loader2 } from 'lucide-react';
import { submitAppointment } from '@/app/actions';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Namaste! I am the Lawyers In Nepal virtual assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    const userMessage = { role: 'user' as const, content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const result = await response.json();
      
      if (result.success && result.text) {
        let aiResponse = result.text;
        
        // Detect Booking Complete signal
        const bookingMatch = aiResponse.match(/\[\[BOOKING_COMPLETE: (.*?)\]\]/);
        if (bookingMatch) {
          try {
            const bookingData = JSON.parse(bookingMatch[1]);
            // Attempt to auto-book
            const bookingResult = await submitAppointment(bookingData);
            
            if (bookingResult.success) {
              aiResponse = aiResponse.replace(/\[\[BOOKING_COMPLETE: .*?\]\]/, "\n\n✅ **Success! I have automatically registered your appointment request.** Our team will contact you shortly.");
            } else {
              aiResponse = aiResponse.replace(/\[\[BOOKING_COMPLETE: .*?\]\]/, "\n\n⚠️ I encountered an issue while booking. Please use our Appointment page directly or call us.");
            }
          } catch (e) {
            console.error("Failed to parse booking data", e);
          }
        }

        setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: result.text || "I'm having trouble thinking right now. Please try again later." }]);
      }
    } catch (error: any) {
      console.error('AI Chat Error (Full Error):', error);
      setMessages([...newMessages, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please call us directly at +977 9815861066 for immediate assistance." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const faqs = [
    { q: 'What services do you offer?', a: 'We specialize in Civil, Criminal, Corporate, and Family Law in Nepal.' },
    { q: 'How can I book a consultant?', a: 'You can use our Appointment page or just tell me your details here!' },
    { q: 'Where is your office?', a: 'We are located in Thamel, Kathmandu, Nepal.' },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Legal Assistant Chat"
          className="bg-navy-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border border-gold-600/30 group"
        >
          <MessageSquare size={28} />
          <span className="absolute right-full mr-3 bg-navy-950 text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl border border-gold-600/30 pointer-events-none">
            Questions? Ask AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-navy-900 rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-navy-800 flex flex-col animate-in slide-in-from-bottom-5 duration-300 max-h-[600px] overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-navy-950 text-white flex justify-between items-center border-b border-gold-600/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gold-600 rounded-full flex items-center justify-center text-navy-900 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                <Scale size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Legal Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-[10px] text-gold-500 uppercase tracking-[0.2em] font-bold">Online Now</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              aria-label="Close Chat"
              className="hover:text-gold-600 transition-colors text-navy-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-navy-900/50 scrollbar-thin scrollbar-thumb-navy-700">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[85%] p-3.5 rounded-sm text-sm whitespace-pre-wrap leading-relaxed shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-gold-600 text-navy-950 rounded-br-none font-medium' 
                    : 'bg-navy-800 border border-navy-700 text-navy-100 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-navy-800 border border-navy-700 p-3 rounded-sm rounded-bl-none">
                  <Loader2 size={16} className="animate-spin text-gold-600" />
                </div>
              </div>
            ) }

            {/* FAQ Area - FIXED VISIBILITY */}
            {messages.length === 1 && (
              <div className="pt-4 space-y-3">
                <p className="text-[10px] text-gold-600/70 uppercase tracking-[0.2em] font-bold pl-1">Frequently Asked</p>
                <div className="flex flex-col gap-2">
                  {faqs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(faq.q)}
                      className="text-left text-xs px-4 py-3 bg-navy-800 border border-navy-700 text-navy-100 hover:border-gold-600 hover:text-white transition-all rounded-sm gold-glow"
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Fallback to WhatsApp */}
          <div className="px-4 py-3 bg-navy-950 border-t border-navy-800">
            <a 
              href="https://wa.me/+9779815861066"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600/10 border border-green-600/30 hover:bg-green-600 hover:text-white text-green-500 text-[10px] font-bold rounded-sm transition-all uppercase tracking-[0.2em]"
              onClick={() => setIsOpen(false)}
            >
              <Smartphone size={14} /> Direct Chat on WhatsApp
            </a>
          </div>

          {/* Input */}
          <div className="p-4 bg-navy-950 border-t border-navy-800">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your legal question..."
                className="flex-grow px-4 py-2.5 bg-navy-900 border border-navy-800 rounded-sm text-sm text-white focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-all placeholder:text-navy-500"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="px-4 bg-gold-600 text-navy-900 rounded-sm hover:bg-gold-500 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
