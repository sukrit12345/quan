"use client";
import { memo } from 'react';

const CharacterPreview = memo(({ character }) => {
  if (!character) return null;

  const DEFAULT_SKIN = "#FFD1DC";
  const DEFAULT_SHIRT = "#DDA0DD";

  const skinTone = character.skinTone || DEFAULT_SKIN;
  const shirtColor = character.shirtColor || DEFAULT_SHIRT;
  const glasses = Boolean(character.glasses);
  const isFemale = character.sex === 'female';

  return (
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g transform="translate(50, 70)">
        {/* Body - centered at x=50 */}
        {isFemale ? (
  <g>
    {/* Female top (shirt) - Kurzgesagt style with clean lines */}
    <rect x="0" y="130" width="100" height="60" rx="15" ry="15" fill={shirtColor} />
    
    {/* Female collar detail */}
    <path d="M30 130 L50 145 L70 130" fill="none" stroke={`${shirtColor}99`} strokeWidth="4" />
    
    {/* Female skirt - improved design with Kurzgesagt geometry */}
    <path 
      d="M15 190 
         C15 185, 85 185, 85 190
         L85 240
         C75 270, 25 270, 15 240
         Z" 
      fill={shirtColor} 
    />
    
    {/* Skirt pleats - geometric details */}
    <path d="M25 200 L25 245" stroke={`${shirtColor}88`} strokeWidth="2" />
    <path d="M40 200 L40 250" stroke={`${shirtColor}88`} strokeWidth="2" />
    <path d="M60 200 L60 250" stroke={`${shirtColor}88`} strokeWidth="2" />
    <path d="M75 200 L75 245" stroke={`${shirtColor}88`} strokeWidth="2" />
    
    {/* Belt detail */}
    <rect x="10" y="187" width="80" height="8" fill={`${shirtColor}77`} rx="4" />
    
    {/* Buttons */}
    <circle cx="50" cy="150" r="3" fill="#ffffff" />
    <circle cx="50" cy="165" r="3" fill="#ffffff" />
  </g>
) : (
  <g>
    {/* Male shirt - Kurzgesagt style */}
    <rect x="0" y="130" width="100" height="150" rx="15" fill={shirtColor} />
    
    {/* Collar detail */}
    <path d="M35 130 L50 150 L65 130" fill="none" stroke={`${shirtColor}99`} strokeWidth="4" />
    
    {/* Button line */}
    <rect x="48" y="150" width="4" height="80" rx="2" fill={`${shirtColor}77`} />
    
    {/* Pocket */}
    <rect x="65" y="160" width="20" height="25" rx="5" fill={`${shirtColor}88`} />
    
    {/* Belt */}
    <rect x="0" y="220" width="100" height="10" fill={`${shirtColor}66`} />
    <rect x="40" y="220" width="20" height="10" fill={`${shirtColor}99`} />
    
    {/* Pants detail */}
    <path d="M20 230 L20 280" stroke={`${shirtColor}88`} strokeWidth="2" />
    <path d="M50 230 L50 280" stroke={`${shirtColor}88`} strokeWidth="2" />
    <path d="M80 230 L80 280" stroke={`${shirtColor}88`} strokeWidth="2" />
    
    {/* Buttons */}
    <circle cx="50" cy="170" r="3" fill="#ffffff" />
    <circle cx="50" cy="190" r="3" fill="#ffffff" />
    <circle cx="50" cy="210" r="3" fill="#ffffff" />
  </g>
)}
        {/* Neck - centered relative to body */}
        <rect x="35" y="110" width="30" height="20" fill={skinTone} />

        {/* Head - centered above neck */}
        <circle cx="50" cy="70" r="60" fill={skinTone} />

        {/* Eyes - positioned relative to head center */}
        <circle cx="30" cy="60" r="10" fill="white" />
        <circle cx="70" cy="60" r="10" fill="white" />
        <circle cx="30" cy="60" r="5" fill="black" />
        <circle cx="70" cy="60" r="5" fill="black" />

        {/* Smile - centered under eyes */}
        <path d="M30 90 Q50 110 70 90" fill="none" stroke="black" strokeWidth="3" />

        {/* Glasses - positioned relative to eyes */}
        {glasses && (
          <g>
            <circle cx="30" cy="60" r="15" fill="none" stroke="#666" strokeWidth="3" />
            <circle cx="70" cy="60" r="15" fill="none" stroke="#666" strokeWidth="3" />
            <line x1="45" y1="60" x2="55" y2="60" stroke="#666" strokeWidth="3" />
          </g>
        )}
      </g>
    </svg>
  );
});

CharacterPreview.displayName = 'CharacterPreview';

export default CharacterPreview;