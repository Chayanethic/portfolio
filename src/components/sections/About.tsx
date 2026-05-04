"use client";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-24 md:py-32 px-6 border-t border-white/5 bg-[#050505]">
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.95, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto w-full"
      >
        <h2 className="font-space text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-blue-500 uppercase mb-12 flex items-center gap-4">
          <span className="w-8 md:w-16 h-[1px] bg-blue-500/50"></span> 01. Background
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-gray-400 font-light text-lg md:text-2xl leading-relaxed md:leading-loose">
          <p>
            Currently in my 3rd year studying Electronics and Communication Engineering (ECE) at Narula Institute of Technology. I approach software through the lens of a hardware engineer—building systems that are logical, efficient, and infinitely scalable.
          </p>
          <p>
            My technical foundation spans the entire stack. From configuring microcontrollers to engineering robust, high-traffic digital platforms, I focus on building unexpected, premium experiences that solve complex architectural problems.
          </p>
        </div>
      </motion.div>
    </section>
  );
}