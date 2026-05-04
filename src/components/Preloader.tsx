"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = 'hidden';

    // Lightning fast preloader - strictly 1.5 seconds max
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto'; // Unlock scrolling
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // Cinematic split-screen exit
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Animated Silicon Traces */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-1/4 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
          />
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            className="absolute right-1/4 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Minimalist Tech Monogram */}
            <div className="overflow-hidden mb-4">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="font-space text-5xl md:text-7xl font-black text-white tracking-tighter"
              >
                CN<span className="text-blue-500">.</span>
              </motion.h1>
            </div>

            {/* Unique "System Boot" text cascade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs text-gray-500 font-mono tracking-widest uppercase"
            >
              <motion.span 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5 }}
              >
                Initializing Architecture...
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.7 }}
                className="text-blue-400"
              >
                Silicon && Software
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.9 }}
              >
                System Ready.
              </motion.span>
            </motion.div>
          </div>

          {/* Quick expanding scanline */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute w-full h-[2px] bg-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}