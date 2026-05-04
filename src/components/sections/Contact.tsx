"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, SendHorizontal, ArrowUpRight, Mail, Copy, Check, MapPin, Loader2, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [loadingText, setLoadingText] = useState("Preparing message...");
  
  // Form States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("your.email@gmail.com"); // Replace with your email
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Friendly, welcoming loading sequence
    setTimeout(() => setLoadingText("Sending to Chayan..."), 800);
    setTimeout(() => setLoadingText("Almost there..."), 1600);

    const startTime = Date.now();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      // Ensure the smooth loading animation plays for at least 2.5 seconds
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 2500) {
        await new Promise(r => setTimeout(r, 2500 - elapsedTime));
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setLoadingText("Preparing message..."); // Reset text
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-[#030303] py-32 px-6 relative overflow-hidden font-sans border-t border-white/5">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 -z-10 m-auto h-[400px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none transform-gpu"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        
        {/* ==========================================
            LEFT SIDE: BENTO DASHBOARD
            ========================================== */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-8 w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting New Projects
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extralight text-white tracking-tighter leading-[1.1] mb-6"
          >
            Let's architect your <br/>
            <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">next big idea.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-gray-400 font-light text-base md:text-lg max-w-md leading-relaxed mb-12 tracking-wide"
          >
            I specialize in taking products from "Zero to One." Skip the agencies and work directly with a full-stack architect.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="group relative p-6 rounded-3xl bg-[#080808] border border-white/5 hover:border-green-500/30 transition-all overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <MessageCircle size={24} className="text-gray-600 group-hover:text-green-400 transition-colors mb-4" />
              <div>
                <h4 className="text-white font-space font-light tracking-wide mb-1">WhatsApp</h4>
                <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Direct Line</p>
              </div>
              <ArrowUpRight size={16} className="absolute top-6 right-6 text-gray-700 group-hover:text-green-400 transition-colors" />
            </a>

            <a href={`https://t.me/${telegram}`} target="_blank" rel="noreferrer" className="group relative p-6 rounded-3xl bg-[#080808] border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Send size={24} className="text-gray-600 group-hover:text-blue-400 transition-colors mb-4" />
              <div>
                <h4 className="text-white font-space font-light tracking-wide mb-1">Telegram</h4>
                <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Quick Chat</p>
              </div>
              <ArrowUpRight size={16} className="absolute top-6 right-6 text-gray-700 group-hover:text-blue-400 transition-colors" />
            </a>

            <div className="group relative p-6 rounded-3xl bg-[#080808] border border-white/5 hover:border-red-500/30 transition-all overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <MapPin size={24} className="text-gray-600 group-hover:text-red-400 transition-colors mb-4" />
              <div>
                <h4 className="text-white font-space font-light tracking-wide mb-1">Kolkata, IN</h4>
                <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Base of Ops</p>
              </div>
            </div>

            <button onClick={handleCopyEmail} className="group relative p-6 rounded-3xl bg-[#080808] border border-white/5 hover:border-purple-500/30 transition-all overflow-hidden text-left flex flex-col justify-between min-h-[140px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {copied ? <Check size={24} className="text-green-400 mb-4" /> : <Mail size={24} className="text-gray-600 group-hover:text-purple-400 transition-colors mb-4" />}
              <div>
                <h4 className="text-white font-space font-light tracking-wide mb-1">Email</h4>
                <p className={`font-mono text-[10px] tracking-widest uppercase ${copied ? "text-green-400" : "text-gray-500"}`}>
                  {copied ? "Copied!" : "Copy Address"}
                </p>
              </div>
              {!copied && <Copy size={16} className="absolute top-6 right-6 text-gray-700 group-hover:text-purple-400 transition-colors" />}
            </button>
          </motion.div>
        </div>

        {/* ==========================================
            RIGHT SIDE: INTERACTIVE FORM TERMINAL
            ========================================== */}
        <div className="lg:col-span-7 flex flex-col h-full mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-[1px] rounded-[3rem] bg-gradient-to-b from-white/15 via-white/5 to-transparent h-full flex flex-col"
          >
            {/* Added min-h-[500px] here so the box never collapses and clips content */}
            <div className="bg-[#050505] rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex-1 flex flex-col min-h-[550px]">
              
              <AnimatePresence mode="wait">
                
                {/* STATE 1: THE IDLE FORM */}
                {status === 'idle' || status === 'error' ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col w-full h-full"
                  >
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase">Start a Conversation</span>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between z-10 h-full">
                      <div className="space-y-4">
                        <div className="relative pt-6">
                          <input 
                            type="text" required id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="peer w-full bg-transparent border-b border-white/10 py-3 text-white font-light focus:outline-none focus:border-blue-500 transition-colors placeholder-transparent" 
                            placeholder="Name"
                          />
                          <label htmlFor="name" className="pointer-events-none absolute left-0 top-9 text-gray-500 font-light transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400 peer-valid:uppercase peer-valid:tracking-widest">
                            Your Name
                          </label>
                        </div>

                        <div className="relative pt-6">
                          <input 
                            type="email" required id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="peer w-full bg-transparent border-b border-white/10 py-3 text-white font-light focus:outline-none focus:border-blue-500 transition-colors placeholder-transparent" 
                            placeholder="Email"
                          />
                          <label htmlFor="email" className="pointer-events-none absolute left-0 top-9 text-gray-500 font-light transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400 peer-valid:uppercase peer-valid:tracking-widest">
                            Email Address
                          </label>
                        </div>

                        <div className="relative pt-8 pb-4 flex-1">
                          <textarea 
                            required rows={4} id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="peer w-full bg-transparent border-b border-white/10 py-3 text-white font-light focus:outline-none focus:border-blue-500 transition-colors placeholder-transparent resize-none custom-scrollbar"
                            placeholder="Message"
                          />
                          <label htmlFor="message" className="pointer-events-none absolute left-0 top-11 text-gray-500 font-light transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400 peer-focus:uppercase peer-focus:tracking-widest peer-valid:top-2 peer-valid:text-xs peer-valid:text-gray-400 peer-valid:uppercase peer-valid:tracking-widest">
                            Project Vision
                          </label>
                        </div>
                      </div>

                      {status === 'error' && (
                        <p className="text-red-400 text-xs font-mono tracking-widest mt-4">Oops! Something went wrong. Please try WhatsApp instead.</p>
                      )}

                      <button type="submit" className="w-full mt-6 flex items-center justify-center gap-3 py-5 rounded-2xl bg-white text-black font-space font-bold text-xs tracking-[0.3em] hover:bg-blue-50 hover:text-blue-600 transition-all">
                        SEND MESSAGE <SendHorizontal size={18} />
                      </button>
                    </form>
                  </motion.div>
                ) : null}

                {/* STATE 2: THE DISPATCHING (LOADING) SCREEN - Soft & Friendly */}
                {status === 'loading' && (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-20 w-full h-full"
                  >
                    {/* Smooth, friendly glowing pulse */}
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></motion.div>
                      <Loader2 size={32} className="text-blue-400 animate-spin relative z-10" />
                    </div>
                    
                    {/* Warm Loading Text */}
                    <div className="h-6 overflow-hidden">
                      <motion.p 
                        key={loadingText} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}
                        className="font-space text-sm text-gray-300 tracking-wide"
                      >
                        {loadingText}
                      </motion.p>
                    </div>
                  </motion.div>
                )}

                {/* STATE 3: THE SUCCESS CONFIRMATION SCREEN - Humble & Welcoming */}
                {status === 'success' && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-30 px-8 w-full h-full text-center"
                  >
                    <div className="absolute inset-0 bg-emerald-500/5 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]"></div>
                    
                    {/* Friendly Handshake / Success Icon */}
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15, delay: 0.1 }}
                        className="absolute inset-0 bg-emerald-500/10 rounded-full"
                      ></motion.div>
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.3 }}
                        className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30 z-10"
                      >
                        <HeartHandshake size={32} className="text-emerald-400" />
                      </motion.div>
                    </div>
                    
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                      className="text-3xl md:text-4xl font-space font-light text-white tracking-tight mb-4 z-10"
                    >
                      Message Sent!
                    </motion.h3>

                    <motion.p 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                      className="text-gray-400 font-light text-base leading-relaxed max-w-sm mb-10 z-10"
                    >
                      Thank you for reaching out. I'm genuinely excited to read about your ideas, and I will get back to you as soon as possible. Let's build something great.
                    </motion.p>
                    
                    <motion.button 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3 rounded-full border border-white/10 text-xs font-mono tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
                    >
                      SEND ANOTHER MESSAGE
                    </motion.button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}