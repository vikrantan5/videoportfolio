'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function Magnetic({ 
  children, 
  strength = 0.35,
  className = 'inline-block' // Default class
}: { 
  children: ReactNode; 
  strength?: number;
  className?: string; // <-- Naya prop add kiya
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.3 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={reset} 
      style={{ x: sx, y: sy }} 
      className={className} // <-- Yahan apply kiya
    >
      {children}
    </motion.div>
  );
}