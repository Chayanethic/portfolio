"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi! I'm Chayan's personal AI assistant. Ask me anything about his tech stack, experience, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }), 
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Connection error. Please ensure the server is running and the API key is valid." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* STEALTHY, MINIMALIST FLOATING BUTTON */}
      <div className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999] transition-all duration-500 ${
        isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center p-4 rounded-full shadow-2xl backdrop-blur-xl
            bg-[#111111]/80 border border-white/10 text-gray-300 hover:text-white transition-colors group"
        >
          {/* Very subtle slow pulse inside the button */}
          <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MessageSquare size={24} strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[1000] w-[calc(100vw-3rem)] md:w-[400px] h-[550px] max-h-[80vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white font-space">Ask AI</h3>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Powered by Gemini 2.5</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gray-100 text-black rounded-tr-sm' 
                      : 'bg-[#1a1a1a] border border-white/5 text-gray-300 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-white/5 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center h-10">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/[0.02] border-t border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-[#111] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-white/5 text-white rounded-lg hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}