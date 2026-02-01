import React, { useMemo } from 'react';
import { CONFETTI_CONFIG } from '../constants';

interface ConfettiStyle {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  backgroundColor: string;
  width: string;
  height: string;
  borderRadius: string;
}

const ConfettiParticles: React.FC = () => {
  const particles = useMemo(() => {
    const items: ConfettiStyle[] = [];
    const { count, colors } = CONFETTI_CONFIG;
    
    for (let i = 0; i < count; i++) {
      // Randomize shape between circle (50%) and rectangle
      const isCircle = Math.random() > 0.5;
      
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`, // 2-5s fall duration
        animationDelay: `${Math.random() * 4}s`, // Stagger start
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        width: `${Math.random() * 10 + 5}px`, // 5-15px
        height: `${Math.random() * 10 + 5}px`, // 5-15px
        borderRadius: isCircle ? '50%' : '2px',
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-fall opacity-80"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            backgroundColor: p.backgroundColor,
            borderRadius: p.borderRadius,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            marginTop: '-20px', // Start slightly above viewport
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiParticles;