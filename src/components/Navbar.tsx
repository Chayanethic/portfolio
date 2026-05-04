"use client";

export default function Navbar() {
  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Work', path: '#projects' },
    { name: 'Communicate', path: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    e.preventDefault();
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-4xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-full z-50 px-6 py-4 flex justify-between items-center shadow-2xl">
      <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="font-space font-bold text-xl md:text-2xl tracking-tighter text-white">CN.</a>
      <div className="hidden md:flex gap-8 text-[10px] md:text-xs tracking-[0.2em] font-mono uppercase">
        {navLinks.map((link) => (
          <a 
            key={link.path} 
            href={link.path} 
            onClick={(e) => handleScroll(e, link.path)}
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}