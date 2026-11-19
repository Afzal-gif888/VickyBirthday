import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotate: number;
}

const EMOJIS = ['💖', '✨', '🌸', '💕', '❤️', '🌟', '🕊️'];

export const TouchHeartSparkle: React.FC = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    let nextId = 0;

    const handleTouchOrClick = (clientX: number, clientY: number) => {
      const count = 3 + Math.floor(Math.random() * 2);
      const newItems: HeartParticle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 10 + Math.random() * 30;
        newItems.push({
          id: nextId++,
          x: clientX + Math.cos(angle) * dist,
          y: clientY + Math.sin(angle) * dist,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          size: 14 + Math.random() * 10,
          rotate: (Math.random() - 0.5) * 60,
        });
      }

      setParticles((prev) => [...prev.slice(-25), ...newItems]);

      // Remove these particles after animation completes
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)));
      }, 950);
    };

    const handlePointerDown = (e: PointerEvent) => {
      handleTouchOrClick(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x - 12, y: p.y - 12, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 1.35,
              y: p.y - 65 - Math.random() * 20,
              x: p.x + (Math.random() - 0.5) * 35,
              rotate: p.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            style={{ fontSize: `${p.size}px` }}
            className="absolute drop-shadow-md"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
