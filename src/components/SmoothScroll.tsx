"use client";
import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, // Slightly faster, less laggy
        duration: 1.2,
        smoothTouch: false, // Prevents mobile lag
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}