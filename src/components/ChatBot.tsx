'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, User, Scale, Smartphone } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Namaste! I am the Lawyers In Nepal virtual assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const faqs = [
    { q: 'What services do you offer?', a: 'We specialize in Civil, Criminal, Corporate, and Family Law in Nepal.' },
    { q: 'How can I book a consultant?', a: 'You can use our Appointment page or click the WhatsApp button for direct chat.' },
    { q: 'Where is your office?', a: 'We are located in Thamel, Kathmandu, Nepal.' },
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInputValue('');

    // Simulated AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant', 
        text: "I've noted your inquiry. For detailed legal advice, would you like to speak directly with a lawyer on WhatsApp?" 
      }]);
    }, 1000);
  };

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
          <span className="absolute right-full mr-3 bg-white text-navy-900 px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-navy-100 italic">
            Questions? Ask AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-navy-100 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-navy-900 text-white flex justify-between items-center border-b border-gold-600/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-navy-900">
                <Scale size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Legal Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-navy-200">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              aria-label="Close Chat"
              className="hover:text-gold-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow h-80 overflow-y-auto p-4 space-y-4 bg-navy-50/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-sm text-sm ${
                  msg.role === 'user' 
                    ? 'bg-navy-700 text-white rounded-br-none' 
                    : 'bg-white border border-navy-100 text-navy-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <p className="text-[10px] text-navy-400 uppercase tracking-widest font-bold">Frequently Asked</p>
                <div className="flex flex-wrap gap-2">
                  {faqs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(faq.q)}
                      className="text-xs px-3 py-2 bg-white border border-navy-200 hover:border-gold-600 hover:text-gold-700 transition-all rounded-full"
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fallback to WhatsApp */}
          {messages.length > 2 && (
            <div className="px-4 pb-2">
              <a 
                href="https://wa.me/+9779815861066"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-sm transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Smartphone size={14} /> Chat on WhatsApp
              </a>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-navy-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow px-3 py-2 bg-navy-50 border border-navy-100 rounded-sm text-sm focus:outline-none focus:border-gold-600"
              />
              <button 
                type="submit"
                className="p-2 bg-navy-900 text-gold-600 rounded-sm hover:bg-navy-800 transition-colors"
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
