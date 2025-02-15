import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import BoyCat from '../character_sprites/BoyCat';
import GirlCat from '../character_sprites/GirlCat';

const GameBoard = ({ 
  currentRoom, 
  dialogueText, 
  onChooseDirection, 
  onOpenShop, 
  onOpenInventory,
  player,
  premiumCurrency
}) => {
  const [clickedButton, setClickedButton] = useState(null);
  const [showChoices, setShowChoices] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);

  const handleClick = (direction) => {
    setClickedButton(direction);
    setHideButtons(true);
    setTimeout(() => {
      setClickedButton(null);
      setHideButtons(false);
    }, 3000); // Hide buttons for 3 seconds
    onChooseDirection(direction);
  };

  useEffect(() => {
    // Simulate event reveal animation
    setTimeout(() => {
      setShowChoices(true);
    }, 1000);
  }, [currentRoom]);

  return (
    <div className="relative bg-gray-100 rounded-lg shadow-md p-4 md:p-6 min-h-96 max-w-4xl mx-auto">
      {/* Status Panel moved from AdventureDungeon.js */}
      {player && (
        <div className="w-full max-w-md mx-auto p-4 bg-white bg-opacity-80 rounded-lg shadow-lg mt-4 mb-4 sm:mt-6 sm:mb-0 sm:w-full sm:flex sm:items-center sm:space-x-4">
          {/* Character Sprite */}
          {player.gender === 'woman' ? (
            <GirlCat width="70" height="100" className="character-display" />
          ) : (
            <BoyCat width="70" height="100" className="character-display" />
          )}

          {/* Player Info */}
          <div className="text-sm text-gray-900 sm:text-base">
            <p className="font-bold">{player.name} ({player.gender === 'woman' ? 'หญิง' : 'ชาย'}) - เลเวล {player.level}</p>
            <p>HP: {player.health}/{player.maxHealth}</p>
            <p>ทอง: {player.gold}</p>
            <p>คริสตัล: {premiumCurrency}</p>
          </div>
        </div>
      )}

      <Header
        currentRoom={currentRoom}
        onOpenInventory={onOpenInventory}
        onOpenShop={onOpenShop}
      />
      <DialogueBox dialogueText={dialogueText} />
      {showChoices && (
        <DirectionButtons
          hideButtons={hideButtons}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

// Header Component
const Header = ({ currentRoom, onOpenInventory, onOpenShop }) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
    <h2 className="text-xl font-bold text-gray-700 mb-4 md:mb-0">Room {currentRoom}</h2>
    <div className="flex space-x-2">
      <Button onClick={onOpenInventory} color="blue">
        Inventory
      </Button>
      <Button onClick={onOpenShop} color="purple">
        Shop
      </Button>
    </div>
  </div>
);

// DialogueBox Component
const DialogueBox = ({ dialogueText }) => (
  <div className="bg-gray-200 text-gray-900 p-4 rounded-md shadow-md mb-6">
    <p className="text-sm md:text-base">
      {dialogueText ? dialogueText : "ไปทางไหนดีนะ?"}
    </p>
  </div>
);

// DirectionButtons Component
const DirectionButtons = ({ hideButtons, handleClick }) => (
  <div className="flex justify-between mt-8 space-x-4">
    {!hideButtons && (
      <>
        <AnimatedButton
          direction="left"
          onClick={() => handleClick('left')}
          color="amber"
          pivot="left center"
        >
          ไปทางซ้าย
        </AnimatedButton>
        <AnimatedButton
          direction="right"
          onClick={() => handleClick('right')}
          color="blue"
          pivot="right center"
        >
          ไปทางขวา
        </AnimatedButton>
      </>
    )}
  </div>
);

// Button Component (Reusable)
const Button = ({ onClick, color, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-${color}-500 text-white rounded hover:bg-${color}-600 transition transform hover:scale-105`}
  >
    {children}
  </button>
);

// AnimatedButton Component (Reusable)
const AnimatedButton = ({ direction, onClick, color, pivot, children }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{
      scale: 0.9,
      transformOrigin: pivot,
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    className={`flex-1 py-4 bg-${color}-500 text-white font-bold rounded-md relative`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

export default GameBoard;