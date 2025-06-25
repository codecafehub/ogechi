// src/Rainfall.js

import React, { useMemo } from 'react';

const Rainfall = ({ numberOfDrops = 50 }) => {
  const raindrops = useMemo(() => 
    Array.from({ length: numberOfDrops }).map((_, i) => {
      // ... (no changes inside this map function)
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${0.5 + Math.random() * 0.5}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      return <div key={i} className="absolute h-16 w-px bg-gradient-to-b from-purple-500/0 to-purple-500/60 animate-fall" style={style} />;
    })
  , [numberOfDrops]);

  return (
    // --- THIS IS THE ONLY CHANGE IN THIS FILE ---
    // Changed "fixed" to "absolute"
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {raindrops}
    </div>
  );
};

export default Rainfall;