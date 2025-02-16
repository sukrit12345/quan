import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import BoyCat from '../character_sprites/BoyCat';
import GirlCat from '../character_sprites/GirlCat';
import DiceFace from '../dice/DiceFace';

// ==============================================
// MAIN GAMEBOARD COMPONENT
// ==============================================
const GameBoard = ({
  currentRoom,
  dialogueText,
  onChooseDirection,
  onOpenShop,
  onOpenInventory,
  player,
  premiumCurrency,
  event,
  diceResult,
  onChoice,
}) => {
  // State for managing button clicks and visibility
  const [showDirOpt, setShowDirOpt] = useState(false);
  const [showChoiceOpt, setShowChoiceOpt] = useState(false);

  // Handle direction button click
  const handleDirClick = useCallback((direction) => {
    onChooseDirection(direction);
    setShowDirOpt(false) // hide direction button
  }, [onChooseDirection]);

  // Show choices after room change
  useEffect(() => {
    const timer = setTimeout(() => setShowDirOpt(true), 1000);
    return () => clearTimeout(timer);
  }, [currentRoom]);

  // Handle when player have option touch 
  const handleOptionClick = useCallback((onChoice, choice)=> {
    console.log("GameBoard Choide: " + choice);
    onChoice(choice);
    setTimeout(() => {
      setShowDirOpt(true);
    }, 2000)
  }, [])

  // Memoized player info for performance optimization
  const playerInfo = useMemo(() => (
    player && (
      <div className="player-status gap-x-3 flex items-center p-3 bg-white bg-opacity-90 rounded-lg shadow">
        <div className="flex-shrink-0 mr-4">
          {player.gender === 'woman' ? (
            <GirlCat width="100" height="130" />
          ) : (
            <BoyCat width="100" height="130" />
          )}
        </div>
        <div className="flex-grow text-left">
          <p className="font-bold text-lg text-gray-900">{player.name} 
            <span className="text-sm text-gray-700">({player.gender === 'woman' ? 'หญิง' : 'ชาย'}) - เลเวล {player.level}</span>
          </p>
          <div className="grid grid-cols-1 gap-1 mt-1">
            <p className="flex items-center">
              <span className="text-red-500 mr-1">❤️</span>
              <span className="font-medium">HP: {player.health}/{player.maxHealth}</span>
            </p>
            <p className="flex items-center">
              <span className="text-amber-500 mr-1">💰</span>
              <span className="font-medium">ทอง: {player.gold}</span>
            </p>
            <p className="flex items-center">
              <span className="text-blue-500 mr-1">💎</span>
              <span className="font-medium">คริสตัล: {premiumCurrency}</span>
            </p>
          </div>
        </div>
      </div>
    )
  ), [player, premiumCurrency]);

  return (
    <div className="gameboard-container bg-gray-100 rounded-lg shadow-lg p-5 md:p-8 max-w-4xl mx-auto min-h-96">
      {/* Player Info */}
      {playerInfo}
      {/* Header with room info and buttons */}
      <Header currentRoom={currentRoom} onOpenInventory={onOpenInventory} onOpenShop={onOpenShop} />

      <EventBox 
    event={event}
    diceResult={diceResult}
    onChoice={onChoice}
    handleOptionClick = {handleOptionClick}
  />

      {/* Dialogue Box */}
      <DialogueBox dialogueText={dialogueText} />

      {/* I wan to make game scene here player need to pressed dice for dice a rolling dice use Polyhedral 20 dice face  will do animate with motion for 2 second rolling change dice image*/}

      {/* Direction Buttons */}
      {showDirOpt && (
        <DirectionButtons
          handleClick={handleDirClick}
        />
      )}
    </div>
  );
};

// ==============================================
// SUB-COMPONENTS
// ==============================================

const EventBox = ({ event, diceResult, onChoice, handleOptionClick}) => (
  <div className='event-box w-full mb-4'>
    {event && (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <p className="mb-4">{event.description}</p>

        {event.type === 'monster' && (
          <div className="flex gap-4 justify-center">
            <Button onClick={() => handleOptionClick(onChoice, 'fight')} color="yellow">
              ⚔️ <span className="font-semibold">สู้</span>
            </Button>

            <Button onClick={() => handleOptionClick(onChoice,'escape')} color="gray">
              🏃 <span className="font-semibold">หนี</span>
            </Button>

          </div>
        )}

        {event.type === 'encounter' && (
          <div className="flex gap-4 justify-center">
            <Button onClick={() => handleOptionClick(onChoice,'trust')} color="green">
              🤝 <span className="font-semibold">ไว้ใจ</span>
            </Button>

            <Button onClick={() => handleOptionClick(onChoice,'distrust')} color="red">
              👎 <span className="font-semibold">ไม่ไว้ใจ</span>
            </Button>
          </div>
        )}

        {diceResult && (
          <div className="mt-4 flex flex-col items-center">
            <DiceFace faceNumber={diceResult} />
            <p className="mt-2 font-bold text-lg">
              ผลลัพธ์: {diceResult}
            </p>
          </div>
        )}

      </div>
    )}
  </div>
);

// Header Component
const Header = ({ currentRoom, onOpenInventory, onOpenShop }) => (
<div className="header flex flex-col gap-2 md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
  <h2 className="text-2xl font-bold text-gray-700">🗺️ ห้องที่ {currentRoom}</h2>
  <div className="flex space-x-4">
    <Button onClick={onOpenInventory} color="blue">
      📦 คลังไอเท็ม
    </Button>
    <Button onClick={onOpenShop} color="purple">
      🛒 ร้านค้า
    </Button>
  </div>
</div>
);

// DialogueBox Component
const DialogueBox = ({ dialogueText }) => (
<div className="dialogue-box bg-gray-200 text-gray-900 p-5 rounded-md shadow mb-8">
  <p className="text-lg">{dialogueText || "ไปทางไหนดีนะ?"}</p>
</div>

);

// DirectionButtons Component
const DirectionButtons = ({ handleClick }) => (
  <div className="direction-buttons flex justify-center gap-8 mt-8">
    <>
      <AnimatedButton direction="left" onClick={() => handleClick('left')} color="amber" pivot="left center">
        ⬅️ ซ้าย
      </AnimatedButton>
      <AnimatedButton direction="right" onClick={() => handleClick('right')} color="blue" pivot="right center">
        ➡️ ขวา
      </AnimatedButton>
    </>
  </div>

);

// ==============================================
// REUSABLE COMPONENTS
// ==============================================

// Button Component (For Inventory and Shop)
const Button = ({ onClick, color, children }) => {
  const buttonColors = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    yellow: 'bg-yellow-400 hover:bg-yellow-500 text-black',  // Fight
    gray: 'bg-gray-500 hover:bg-gray-600',                  // Escape
    green: 'bg-green-500 hover:bg-green-600',              // Trust
    red: 'bg-red-500 hover:bg-red-600',                    // Distrust
  };  

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-white font-bold shadow-md transition-all transform hover:scale-105 ${buttonColors[color]}`}
    >
      {children}
    </button>
  );
};

// AnimatedButton Component (For Directions)
const AnimatedButton = ({ direction, onClick, color, pivot, children }) => (
<motion.button
  whileHover={{ scale: 1.15 }}
  whileTap={{
    scale: 0.85,
    rotate: direction === "left" ? -5 : 5,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  }}
  className={`flex-1 py-4 px-6 rounded-lg font-bold text-white shadow-lg transition-all 
    ${color === 'amber' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-500 hover:bg-blue-600'}`}
  onClick={onClick}
>
  {children}
</motion.button>

);

export default GameBoard;