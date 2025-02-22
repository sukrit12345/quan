"use client";
import { memo } from 'react';

const CharacterPreview = memo(({ character }) => {
  if (!character) return null;

  const DEFAULT_SKIN = "#FFD1DC";
  const DEFAULT_SHIRT = "#DDA0DD";

  const skinTone = character.skinTone || DEFAULT_SKIN;
  const shirtColor = character.shirtColor || DEFAULT_SHIRT;
  const glasses = Boolean(character.glasses);

  return (
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g transform="translate(50, 70)">
        {/* Body - centered at x=50 */}
        <rect x="0" y="130" width="100" height="150" rx="20" fill={shirtColor} />

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