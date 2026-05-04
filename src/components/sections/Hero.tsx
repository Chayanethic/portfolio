"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center relative px-4 overflow-hidden">
      
      {/* --- ADDED ADVANCED HEADER --- */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 w-full max-w-7xl mx-auto"
      >
        {/* Aesthetic Monogram Logo */}
        <div className="font-space text-xl md:text-2xl font-bold tracking-tighter text-white">
          CN<span className="text-blue-500">.</span>
        </div>

        {/* Floating Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-300 tracking-wide uppercase font-space">
            Available for Work
          </span>
        </div>

        {/* Let's Talk Button linked to Contact Us */}
        <Link 
          href="/#contact" 
          className="group flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          Let's Talk 
          <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white transition-colors" />
        </Link>
      </motion.header>
      {/* ----------------------------- */}

     <div className="absolute top-1/2 left-1/2 ... blur-[150px] pointer-events-none transform-gpu"></div>
      {/* Massive Highlighted Photo with Parallax */}
      <motion.div style={{ y: yImage }} className="relative z-10 flex flex-col items-center mt-12 md:mt-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glowing ring around the massive photo */}
          <div className="absolute inset-0 rounded-full border border-blue-500/30 shadow-[0_0_80px_rgba(37,99,235,0.2)] animate-pulse"></div>
          <img
            src="https://res.cloudinary.com/dnpudf84r/image/upload/v1777898962/ChatGPT_Image_May_4_2026_12_36_41_AM_y9uhrb.png" 
            alt="Chayan Neogi"
            className="w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-2 border-white/10 shadow-2xl mb-8 md:mb-12 object-cover relative z-20"
          />
        </motion.div>
        
        {/* Aesthetic Premium Font Styling */}
        <motion.h1 
          style={{ opacity: opacityText }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-space text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-4 tracking-tighter text-center leading-none"
        >
          Chayan Neogi.
        </motion.h1>
        
        <motion.p 
          style={{ opacity: opacityText }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl text-center font-light leading-relaxed px-4"
        >
          Architecting the future at the intersection of <span className="text-white font-medium">Silicon</span> and <span className="text-white font-medium">Software</span>.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 text-gray-600 animate-bounce"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
}