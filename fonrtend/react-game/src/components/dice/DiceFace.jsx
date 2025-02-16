import React from 'react';
import { diceGradients } from './diceStyles';

const DiceFace = ({ faceNumber = 1, size = 100 }) => {
  // Make sure faceNumber is always in the valid range 1-6
  const safeNumber = Math.max(1, Math.min(6, faceNumber || 1));
  
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size}
      className="dice-face"
    >
      <defs>
        {/* Shared Gradient */}
        <linearGradient id="diceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={diceGradients.primary[getShape(safeNumber)][0]} />
          <stop offset="100%" stopColor={diceGradients.primary[getShape(safeNumber)][1]} />
        </linearGradient>
        
        {/* Shared Shadow Filter */}
        <filter id="softShadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor={diceGradients.shadow} />
        </filter>
      </defs>

      {/* Semi-transparent Background */}
      <rect
        width="100"
        height="100"
        rx="20"
        ry="20"
        fill="rgba(255,255,255,0.9)"
        stroke="#2B2D42"
        strokeWidth="2"
      />

      {/* Face Content */}
      {renderFace(safeNumber)}
    </svg>
  );

  function getShape(num) {
    const shapes = ['circle', 'hexagon', 'triangle', 'square', 'star', 'diamond'];
    return shapes[Math.max(0, Math.min(5, num - 1))] || 'circle';
  }

  function renderFace(num) {
    switch(num) {
      case 1: return <circle cx="50" cy="50" r="30" fill="url(#diceGradient)" filter="url(#softShadow)" />;
      case 2: return (
        <path d="M50 20 L75 50 50 80 25 50 Z" 
          fill="url(#diceGradient)" 
          filter="url(#softShadow)"
        />
      );
      case 3: return (
        <path d="M50 20 L80 80 20 80 Z" 
          fill="url(#diceGradient)" 
          filter="url(#softShadow)"
        />
      );
      case 4: return (
        <rect x="30" y="30" width="40" height="40" 
          rx="8" 
          fill="url(#diceGradient)" 
          filter="url(#softShadow)"
        />
      );
      case 5: return (
        <path d="M50 5 L61 35 93 35 68 55 79 85 50 67 21 85 32 55 7 35 39 35 Z"
          fill="url(#diceGradient)"
          filter="url(#softShadow)"
        />
      );
      case 6: return (
        <path d="M50 15 L65 35 85 35 65 55 85 75 65 75 50 95 35 75 15 75 35 55 15 35 35 35 Z"
          fill="url(#diceGradient)"
          filter="url(#softShadow)"
        />
      );
      default: return <circle cx="50" cy="50" r="30" fill="url(#diceGradient)" filter="url(#softShadow)" />;
    }
  }
};

export default DiceFace;