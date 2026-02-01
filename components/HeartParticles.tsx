import React, { useMemo } from 'react';
import { HEART_COLORS } from '../constants';

interface HeartStyle {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  backgroundColor: string;
  size: number;
}

const HeartParticles: React.FC = () => {
  // Generate a fixed set of hearts to avoid re-calculation on every render
  const hearts = useMemo(() => {
    const items: HeartStyle[] = [];
    const count = 50; // Number of hearts
    
    for (let i = 0; i < count; i++) {
      const duration = Math.random() * 3 + 4; // 4-7s duration
      // Use negative delay to have some hearts appear mid-flight immediately
      const delay = Math.random() * 5 * -1; // -5s to 0s
      
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`, 
        animationDelay: `${delay}s`,
        backgroundColor: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        size: Math.random() * 20 + 10, // 10-30px
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 rounded-full animate-float opacity-70"
          style={{
            left: heart.left,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            backgroundColor: heart.backgroundColor,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            // Create a heart shape using clip-path or pseudos? 
            // For simplicity in DOM particles, we'll use a unicode heart or SVG.
            // Let's use an SVG shape for better visuals.
            background: 'transparent',
          }}
        >
          <svg
            viewBox="0 0 32 29.6"
            style={{ fill: heart.backgroundColor, width: '100%', height: '100%' }}
          >
            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-11.8,16-21.2C32,3.8,28.2,0,23.6,0z"/>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default HeartParticles;