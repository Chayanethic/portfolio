"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";// Ensure this is imported
// import Contact from "@/components/sections/Contact";
import { motion, useScroll } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-[#050505] selection:bg-blue-600 selection:text-white">
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-400 origin-left z-[100]"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />

      <Hero />
      <About />
      <Projects /> {/* Added to the render pipeline */}
      <Contact />
      
    </main>
  );
}