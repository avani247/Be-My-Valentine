import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CONTENT, ASSETS } from './constants';
import HeartParticles from './components/HeartParticles';
import ConfettiParticles from './components/ConfettiParticles';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  // Track position and rotation for erratic movement
  const [noBtnState, setNoBtnState] = useState<{ x: number, y: number, rotation: number } | null>(null);
  // Track the scale of the button (1.0 down to a minimum size)
  const [noBtnScale, setNoBtnScale] = useState(1);
  const minNoBtnScale = 0.2;
  
  // Ref for the No button to measure dimensions
  const noBtnRef = useRef<HTMLButtonElement>(null);
  
  // Handler for "No" button hover/interaction
  const handleNoInteraction = useCallback(() => {
    if (accepted) return;

    const btn = noBtnRef.current;
    if (!btn) return;

    // Get current button metrics
    const { width, height, x: currentX, y: currentY } = btn.getBoundingClientRect();
    
    // Viewport dimensions with safety padding to keep inside screen
    const padding = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate max safe coordinates
    // Ensure we don't go negative if the viewport is very small
    const maxX = Math.max(padding, viewportWidth - width - padding);
    const maxY = Math.max(padding, viewportHeight - height - padding);
    
    let newX, newY;
    let attempts = 0;
    // Minimum distance to jump to ensure it feels like a dodge
    const minJumpDistance = 150; 

    // Try to find a new position that is far enough away
    do {
      // Random position within safe bounds
      newX = Math.random() * (maxX - padding) + padding;
      newY = Math.random() * (maxY - padding) + padding;
      
      // Calculate distance from current position
      const dx = newX - currentX;
      const dy = newY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > minJumpDistance) {
        break; // Found a good spot
      }
      attempts++;
    } while (attempts < 10); // Prevent infinite loop if constraints are tight

    // Add erratic rotation (-45 to 45 degrees) for more chaos
    const newRotation = (Math.random() * 90) - 45;
    
    setNoBtnState({ x: newX, y: newY, rotation: newRotation });
  }, [accepted]);

  const handleNoClick = (e: React.MouseEvent) => {
    // Prevent default click behavior just in case
    e.preventDefault();
    // Reduce size by 20% on each click, but never disappear
    setNoBtnScale(prev => Math.max(minNoBtnScale, prev * 0.8));
    // Still dodge after the click
    handleNoInteraction(); 
  };

  const handleReset = () => {
    setAccepted(false);
    setNoBtnState(null);
    setNoBtnScale(1); // Reset scale
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-pink-100 to-red-50">
      
      {/* Background Animations */}
      {accepted && (
        <>
          <HeartParticles />
          <ConfettiParticles />
        </>
      )}

      {/* Main Card Container 
          NOTE: Removed 'transform' and 'scale' effects here because they break 'position: fixed' 
          on children elements (the No button would vanish relative to the card). 
      */}
      <div className="z-10 w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border-4 border-pink-200 text-center transition-all duration-500 ease-in-out">
        
        {/* Main Content Area */}
        <div className="mb-8">
          {accepted ? (
            <div className="animate-fade-in-up">
              <div className="w-full rounded-2xl border-4 border-pink-200 bg-white/70 p-3 shadow-md mb-4">
                <img 
                  src={ASSETS.MEME_URL} 
                  alt="Celebration Meme" 
                  className="w-full h-56 object-contain rounded-xl animate-pop-in"
                />
              </div>
              <h1 className="text-3xl font-bold text-pink-600 mb-2">
                {CONTENT.SUCCESS_TEXT}
              </h1>
            </div>
          ) : (
            <div>
              <div className="relative inline-block">
                <img 
                  src={ASSETS.STICKER_URL} 
                  alt="Cute Sticker" 
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-pink-300 shadow-lg animate-bounce-slow"
                />
                <div className="absolute -bottom-2 -right-2 text-4xl animate-pulse">
                  🧸
                </div>
              </div>
              <h1 className="text-3xl font-handwriting text-gray-800 mb-2">
                {CONTENT.PARTNER_NAME},
              </h1>
              <h2 className="text-2xl font-bold text-pink-600">
                {CONTENT.PROPOSAL_TEXT}
              </h2>
            </div>
          )}
        </div>

        {/* Buttons Area */}
        {!accepted ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[80px]">
            {/* YES Button */}
            <button
              onClick={() => setAccepted(true)}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-xl shadow-lg transform transition hover:scale-110 active:scale-95 z-20"
            >
              {CONTENT.YES_BTN}
            </button>

            <button
              ref={noBtnRef}
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction} // Mobile support
              onClick={handleNoClick}
              style={{
                position: noBtnState ? 'fixed' : 'static',
                left: noBtnState ? noBtnState.x : 'auto',
                top: noBtnState ? noBtnState.y : 'auto',
                // Faster transition for snappier dodging (0.15s)
                transition: 'top 0.15s ease-out, left 0.15s ease-out, transform 0.15s ease-out',
                // Rotate erratically and scale based on clicks
                transform: `rotate(${noBtnState ? noBtnState.rotation : 0}deg) scale(${noBtnScale})`,
                zIndex: 50, // Ensure it stays above everything
              }}
              className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-full text-xl shadow-inner cursor-default"
            >
              {CONTENT.NO_BTN}
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <button 
              onClick={handleReset}
              className="text-sm text-pink-400 hover:text-pink-600 underline decoration-dotted"
            >
              Replay this moment
            </button>
          </div>
        )}
      </div>

      {/* Decorative footer */}
      <div className="fixed bottom-4 text-xs text-pink-300 font-handwriting">
        Made with ❤️ for you
      </div>
    </div>
  );
}
