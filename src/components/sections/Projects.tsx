"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useAnimation } from 'framer-motion';
import { ExternalLink, Rocket, Handshake, Sparkles, ArrowUpRight, Cpu, Activity, FileText, X, LayoutTemplate, AlertTriangle, ShieldCheck, Users } from 'lucide-react';

interface RoleBenefit {
  role: string;
  benefit: string;
}

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  themeColor: string;
  imageSrc: string;
  link: string;
  techStack: string[];
  telemetry: string;
  problem: string;
  solution: string;
  security: string;
  roleBenefits: RoleBenefit[];
  disclaimer?: string;
}

export default function Projects() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeArchitecture, setActiveArchitecture] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: "ozone",
      title: "Ozone Studio",
      tagline: "Monetizing Educational Data.",
      themeColor: "from-purple-400 to-indigo-300",
      imageSrc: "/ozone-art.png",
      link: "https://ozoone.vercel.app/",
      techStack: ["Next.js", "Gemini AI", "Tailwind CSS", "Firebase", "Clerk"],
      telemetry: "API Latency: < 120ms | Data Sync: Realtime",
      problem: "I saw that educational platforms were generating tons of data, but it was completely unstructured. It was hard to figure out how students were actually doing, and even harder for creators to monetize it properly.",
      solution: "I connected a Next.js frontend to Firebase and used Gemini AI to automatically organize the data. This turned raw student inputs into a clean dashboard that makes sense instantly without manual sorting.",
      security: "Secured with Clerk authentication. It's unique because the AI integration categorizes data on the fly, creating a highly personalized loop between learning and earning.",
      roleBenefits: [
        { role: "For Students", benefit: "Provides a personalized, distraction-free learning environment where progress is visibly tracked." },
        { role: "For Educators", benefit: "Delivers automated insights into student progress and provides seamless tools to monetize their content." }
      ]
    },
    {
      id: "dining",
      title: "DigitalDining",
      tagline: "Eradicating operational chaos.",
      themeColor: "from-orange-400 to-red-400",
      imageSrc: "/dining-art.png",
      link: "https://rstaurent-frontend.vercel.app/",
      techStack: ["Golang (Gin)", "React", "PostgreSQL", "Redis", "Socket.io"],
      telemetry: "WebSocket Uptime: 99.9% | Cache Hit: 94%",
      problem: "I noticed a huge gap in how restaurants handle orders. Customers were waiting too long to order, and the kitchen was always out of sync with the billing desk, especially when calculating custom taxes.",
      solution: "I built a fast Golang and Redis backend to digitize the entire restaurant. Now, when a customer scans a QR code, the order and exact tax calculations go straight to the Kitchen Display System in milliseconds.",
      security: "Uses encrypted WebSocket connections verified at the proxy level to prevent order tampering. The custom GST/Tax logic calculates locally at the kiosk to ensure 100% billing accuracy.",
      roleBenefits: [
        { role: "For Managers", benefit: "Full admin control to track every table, monitor kitchen speed, and analyze daily revenue in real-time." },
        { role: "For Customers", benefit: "Scan a QR code, browse a digital menu, and order instantly without needing to wait for a waiter." }
      ]
    },
    {
      id: "gate",
      title: "GateTracker ECE",
      tagline: "Weaponizing study data for success.",
      themeColor: "from-cyan-300 to-blue-400",
      imageSrc: "/gate-art.png",
      link: "https://targetgate.vercel.app/",
      techStack: ["Next.js (TS)", "Tailwind CSS", "Supabase DB", "Supabase Auth"],
      telemetry: "DB Query Time: ~45ms | RLS: Active",
      problem: "When preparing for exams like GATE, I realized students had no good way to track exactly which micro-topics they had covered or where they were losing marks in mock tests.",
      solution: "I created a highly specific tracking tool using Supabase. It breaks down the entire syllabus and gives you a visual graph of your progress so you always know exactly what to study next.",
      security: "Built strictly on Supabase Row Level Security (RLS) policies, ensuring absolutely no one can query or access another student's private study data.",
      roleBenefits: [
        { role: "For Students", benefit: "Pinpoint exactly which subjects are dragging their score down and track completion dynamically across the whole year." }
      ]
    },
    {
      id: "betting",
      title: "Arena Market",
      tagline: "Dynamic toss & match simulation.",
      themeColor: "from-emerald-400 to-teal-400",
      imageSrc: "/betting-art.png",
      link: "https://arenamarket.vercel.app/",
      techStack: ["Next.js", "WebSockets", "Telegram API", "State Machine"],
      telemetry: "Bot Latency: 200ms | Real-time Market",
      problem: "I wanted to build a live market simulator where payout odds change instantly. The challenge was making a slider bar dynamically update the market pool for everyone without crashing the server.",
      solution: "I used WebSockets for the live market shifts. To handle money smoothly, I integrated a custom Telegram Bot that fully automates the deposit and withdrawal logic seamlessly.",
      security: "Extremely high security using state-machine locks to prevent double-spending or race conditions during the final seconds of a match freeze.",
      roleBenefits: [
        { role: "For Admins", benefit: "Full admin control panel to manage matches, freeze markets, adjust odds, and oversee all Telegram wallet transactions." },
        { role: "For Players", benefit: "Experience a lag-free, live-shifting market using a simple slider bar to predict the toss and match winners." }
      ],
      disclaimer: "EDUCATIONAL PURPOSE ONLY: This is a technical market simulation and is strictly NOT a real gambling (satta) platform. For educational safety and compliance, the admin has permanently stopped uploading daily live matches."
    }
  ];

  // --- BOOT SEQUENCE ---
  useEffect(() => {
    const sequence = async () => {
      setBootText("POWER ON...");
      await new Promise(r => setTimeout(r, 600));
      setBootText("INITIALIZING NEURAL NET...");
      await new Promise(r => setTimeout(r, 800));
      setBootText("LOADING ARCHITECT_PROFILE.EXE...");
      await new Promise(r => setTimeout(r, 800));
      setBootText("ACCESS GRANTED.");
      await new Promise(r => setTimeout(r, 600));
      setIsBooting(false);
    };
    sequence();
  }, []);

  // --- NEW: MODAL SCROLL LOCK EFFECT ---
  // This physically locks the background from scrolling when the modal is open
  useEffect(() => {
    if (activeArchitecture) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeArchitecture]);

  // --- NAVIGATION CONTROLS ---
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // --- PHYSICS ENGINE ---
  const xDrag = useMotionValue(0);
  const controls = useAnimation();

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50; 
    const velocityThreshold = 400;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
    
    controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 25, mass: 1 } });
  };

  // --- AUTOPLAY ENGINE ---
  useEffect(() => {
    if (!isHovering && !isBooting && !activeArchitecture) {
      const timer = setInterval(() => handleNext(), 6000);
      return () => clearInterval(timer);
    }
  }, [isHovering, isBooting, activeArchitecture, handleNext]);

  return (
    <main className="bg-[#030303] min-h-screen font-sans selection:bg-blue-600 selection:text-white pb-32 overflow-hidden relative">
      
      {/* --- 0. SMARTPHONE BOOT ANIMATION --- */}
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }} transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ width: 0, height: "1px", opacity: 0 }}
              animate={{ width: ["0%", "50%", "100%"], height: ["1px", "1px", "100vh"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: "anticipate" }}
              className="absolute bg-white/20 shadow-[0_0_50px_rgba(255,255,255,0.8)]"
            />
            <motion.p key={bootText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 font-mono text-sm md:text-base text-gray-300 tracking-[0.3em] uppercase">
              {bootText}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ADVANCED ARCHITECTURE MODAL --- */}
      <AnimatePresence>
        {activeArchitecture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setActiveArchitecture(null)}
            data-lenis-prevent="true" // Tells Lenis to ignore background scrolling here
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()} 
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${activeArchitecture.themeColor} opacity-10 rounded-full blur-[80px]`}></div>

              <button
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full z-10"
                onClick={() => setActiveArchitecture(null)}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${activeArchitecture.themeColor} bg-opacity-20`}>
                  <LayoutTemplate size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-space text-2xl text-white tracking-tight">{activeArchitecture.title}</h3>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">System Architecture</p>
                </div>
              </div>

              {/* Added data-lenis-prevent here to allow normal scrolling inside the box */}
              <div className="overflow-y-auto pr-2 custom-scrollbar space-y-6 relative z-10" data-lenis-prevent="true">
                
                {/* Problem & Solution Block */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-space font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> The Problem I Saw
                    </h4>
                    <p className="text-gray-300 leading-relaxed font-light text-sm bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      "{activeArchitecture.problem}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-space font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> How I Solved It
                    </h4>
                    <p className="text-gray-300 leading-relaxed font-light text-sm bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      "{activeArchitecture.solution}"
                    </p>
                  </div>
                </div>

                {/* Security & Uniqueness */}
                <div>
                  <h4 className="text-xs font-space font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} /> Security & Architecture
                  </h4>
                  <p className="text-gray-400 leading-relaxed font-light text-sm border-l-2 border-blue-500/50 pl-4 py-1">
                    {activeArchitecture.security}
                  </p>
                </div>

                {/* Value by Role */}
                <div>
                  <h4 className="text-xs font-space font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Users size={14} /> Value Created
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {activeArchitecture.roleBenefits.map((item, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <span className="block text-xs font-bold text-white mb-1">{item.role}</span>
                        <span className="text-sm text-gray-400 font-light">{item.benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditional Highlighted Disclaimer */}
                {activeArchitecture.disclaimer && (
                  <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                    <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
                    <p className="text-red-200 text-sm font-medium leading-relaxed">
                      {activeArchitecture.disclaimer}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 1. THE PARTNERSHIP HOOK --- */}
      <div className="pt-32 pb-10 max-w-5xl mx-auto px-6 text-center relative z-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={!isBooting ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} 
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-gray-300 font-mono text-xs uppercase tracking-[0.3em] mb-12 shadow-[0_0_30px_rgba(255,255,255,0.02)]"
        >
          <Sparkles size={14} className="text-blue-400" /> AI-Empowered Architect
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} animate={!isBooting ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
          className="font-space text-4xl md:text-6xl lg:text-7xl font-extralight text-gray-200 tracking-tight leading-[1.1] mb-8"
        >
          I don't just write code.<br/>
          <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">I partner with you.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={!isBooting ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 font-light text-base md:text-lg max-w-3xl mx-auto leading-relaxed tracking-wide"
        >
          Many developers fear AI; I embrace it to build systems faster and smarter. I engineer products that are ready for the market. Whether it's complex backend logic or a seamless frontend, I build it as if it were my own startup.
        </motion.p>
      </div>

      {/* --- 2. ADVANCED FANNED STACK GALLERY --- */}
      <div 
        className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center mt-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              let normalizedOffset = offset;
              if (offset === projects.length - 1) normalizedOffset = -1;
              if (offset === -(projects.length - 1)) normalizedOffset = 1;

              let xPos = "0%";
              let yPos = "0%";
              let scale = 1;
              let opacity = 1;
              let rotateZ = 0; 
              let zIndex = 10;
              let isInteractive = false;

              if (normalizedOffset === 0) {
                xPos = "0%"; yPos = "0%"; scale = 1; opacity = 1; zIndex = 30; rotateZ = 0; isInteractive = true;
              } else if (normalizedOffset === 1 || normalizedOffset === -3) {
                xPos = "30%"; yPos = "4%"; scale = 0.92; opacity = 0.6; zIndex = 20; rotateZ = 8;
              } else if (normalizedOffset === -1 || normalizedOffset === 3) {
                xPos = "-30%"; yPos = "4%"; scale = 0.92; opacity = 0.6; zIndex = 20; rotateZ = -8;
              } else {
                opacity = 0; scale = 0.8; yPos = "10%"; zIndex = 10; rotateZ = 0;
              }

              if (isBooting) opacity = 0;

              return (
                <motion.div 
                  key={project.id}
                  layout
                  initial={false}
                  animate={isInteractive ? controls : undefined}
                  style={isInteractive ? { x: xDrag } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 25, mass: 1 }}
                  {...(!isInteractive && { animate: { x: xPos, y: yPos, scale, opacity, zIndex, rotate: rotateZ } })}
                  {...(isInteractive && { animate: { scale, opacity, zIndex, rotate: rotateZ } })}
                  
                  drag={isInteractive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={isInteractive ? handleDragEnd : undefined}
                  onClick={() => {
                    if (normalizedOffset === 1) handleNext();
                    if (normalizedOffset === -1) handlePrev();
                  }}
                  className={`absolute w-[85vw] md:w-[45vw] lg:w-[35vw] h-[65vh] md:h-[75vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#080808] ${isInteractive ? 'cursor-grab active:cursor-grabbing shadow-[0_0_80px_rgba(0,0,0,0.8)]' : 'cursor-pointer'} transition-shadow duration-300 flex flex-col`}
                >
                  {/* Top Image Section */}
                  <div className="absolute inset-0 pointer-events-none">
                    <img src={project.imageSrc} alt={project.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isInteractive ? 'opacity-40 scale-100' : 'opacity-20 scale-110 grayscale'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.themeColor} opacity-20 mix-blend-overlay`}></div>
                  </div>

                  {/* Card Content Overlay */}
                  <div className={`relative flex-1 p-6 md:p-10 flex flex-col justify-end z-10 transition-opacity duration-500 ${isInteractive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    
                    <div className="mb-auto self-end mt-2 pointer-events-none">
                       <span className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-gray-300 font-mono text-[10px] tracking-widest shadow-lg">
                         <Activity size={12} className="text-emerald-400" /> {project.telemetry}
                       </span>
                    </div>

                    <div className="flex items-center gap-4 mb-4 pointer-events-none">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.themeColor} flex items-center justify-center border border-white/10 shadow-lg shrink-0`}>
                        <FileText size={24} className="text-black" />
                      </div>
                      <h3 className="font-space text-3xl md:text-5xl lg:text-6xl font-light text-gray-100 tracking-tighter drop-shadow-xl">{project.title}</h3>
                    </div>
                    
                    <p className="font-space text-base md:text-xl font-extralight text-gray-400 tracking-wide mb-6 pointer-events-none">
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 pointer-events-none">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-lg text-gray-400 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2">
                          <Cpu size={10} className="text-gray-600 hidden md:block" /> {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 pointer-events-auto flex flex-col gap-3">
                      {project.link !== "#" ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()} 
                          className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${project.themeColor} text-sm font-space font-bold text-white tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
                        >
                          LAUNCH LIVE PREVIEW <ArrowUpRight size={18} />
                        </a>
                      ) : (
                        <div className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-sm font-space font-light text-gray-500 tracking-widest">
                          DEPLOYMENT PENDING
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveArchitecture(project);
                        }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-transparent border border-white/20 text-sm font-space font-medium text-gray-300 tracking-widest hover:bg-white/10 hover:text-white hover:border-white/40 transition-all"
                      >
                        <LayoutTemplate size={16} /> VIEW ARCHITECTURE
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* --- 3. THE CONTACT BRIDGE --- */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="max-w-4xl mx-auto mt-20 px-6 text-center bg-gradient-to-b from-white/[0.01] to-transparent border-t border-white/5 pt-24 pb-12 rounded-[3rem] relative z-10"
      >
        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
          <Handshake className="text-gray-300" size={32} />
        </div>
        <h2 className="font-space text-3xl md:text-5xl font-light text-gray-200 tracking-tighter mb-6">Have an idea? Let's take it to the market.</h2>
        <p className="text-gray-400 font-extralight text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 tracking-wide">
          I am not a web developer who builds a site and disappears. I am an architect who helps you scale. From database logic to UI/UX, <strong className="text-gray-200 font-light">I will help you build your startup until you are successfully in the market.</strong> Let's solve your problem together.
        </p>
        <a href="#contact" className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gray-200 text-black font-space font-normal text-sm md:text-base tracking-[0.2em] hover:scale-105 hover:bg-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Rocket size={18} /> CONTACT ME NOW
        </a>
      </motion.div>

    </main>
  );
}