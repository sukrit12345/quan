import React, { useState, useEffect } from 'react';

// Game components
import CharacterCreation from './CharacterCreation';
import GameBoard from './GameBoard';
import ShopInterface from './ShopInterface';
import InventoryManager from './InventoryManager';
import GameOver from './GameOver';

// Game data
import monsters from '../../data/textbased/monsters';
import treasures from '../../data/textbased/treasures';
import events from '../../data/textbased/events';

// Sound Effect
import useSound from 'use-sound';
import diceSound from '../../assets/sfx/dice.mp3';

const AdventureDungeon = () => {
  // Game state and player state definitions
  const [gameState, setGameState] = useState('characterCreation'); // characterCreation, playing, shop, inventory, gameOver
  const [player, setPlayer] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [score, setScore] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [premiumCurrency, setPremiumCurrency] = useState(0);
  const [dialogueText, setDialogueText] = useState(""); // Dialogue text for events

// Add these new state variables in AdventureDungeon
const [currentEvent, setCurrentEvent] = useState(null);
const [diceResult, setDiceResult] = useState(null);
const [playerChoice, setPlayerChoice] = useState(null);


// SFX
const [playDiceSound] = useSound(diceSound);


  // Create a new player
  const createPlayer = (name, gender) => {
    const newPlayer = {
      name,
      gender,
      health: 100,
      maxHealth: 100,
      attack: gender === 'ชาย' ? 12 : 10, // Small difference between genders
      defense: gender === 'หญิง' ? 12 : 10,
      critChance: gender === 'ชาย' ? 0.1 : 0.15,
      dodgeChance: gender === 'หญิง' ? 0.1 : 0.05,
      level: 1,
      experience: 0,
      gold: 50,
    };
    setPlayer(newPlayer);
    setGameState('playing');
  };

  // Generate random events (monsters, treasures, encounters, etc.)
  const generateEvent = () => {
    const roll = Math.random();
    if (roll < 0.5) return getRandomMonster();
    if (roll < 0.75) return getRandomTreasure();
    if (roll < 0.9) return getRandomEncounter();
    return getRestArea();
  };

  const getRandomMonster = () => {
    const monster = monsters[Math.floor(Math.random() * monsters.length)];
    return { type: 'monster', ...monster };
  };

  const getRandomTreasure = () => {
    const treasure = treasures[Math.floor(Math.random() * treasures.length)];
    return { type: 'treasure', ...treasure };
  };

  const getRandomEncounter = () => {
    const encounter = events[Math.floor(Math.random() * events.length)];
    return { type: 'encounter', ...encounter };
  };

  const getRestArea = () => ({
    type: 'rest',
    name: 'จุดพัก',
    description: 'สถานที่ปลอดภัยสำหรับฟื้นฟูพลังงาน',
    healthRecovery: 20,
  });

  // Handle direction choices and events after selection
  const chooseDirection = (direction) => {
    setCurrentRoom(currentRoom + 1);
    const event = generateEvent();
    setCurrentEvent(event);
    setPlayerChoice(null);
    setDiceResult(null);
  };
  const handleEventChoice = (choice) => {
    setPlayerChoice(choice);
    if (choice === "fight" || choice === "escape") {
      const result = Math.floor(Math.random() * 6) + 1;
      playDiceSound();
      setDiceResult(result);
      resolveEvent(choice, result);
    }

    console.log("AdD choice: " + choice);
  };
  
  
  const resolveEvent = (choice, result) => {
    let message = "";
    
    if (currentEvent.type === 'monster') {
      const difficulty = currentEvent.difficult;
      if (choice === 'fight') {
        if (result > difficulty) {
          message = `ชนะ! ได้รับ ${currentEvent.gold} ทอง`;
          setPlayer(p => ({ ...p, gold: p.gold + currentEvent.gold }));
        } else {
          // Use player instead of p
          const damage = Math.max(1, currentEvent.attack - player.defense);
          message = `แพ้! เสีย HP ${damage}`;
          setPlayer(p => ({ ...p, health: p.health - damage }));
        }
      } else { // escape
        if (result > difficulty) {
          message = "หนีสำเร็จ!";
        } else {
          // Use player instead of p
          const loss = Math.floor(currentEvent.gold * 0.3);
          message = `หนีไม่สำเร็จ! เสียทอง ${loss}`;
          setPlayer(p => ({ ...p, gold: Math.max(0, p.gold - loss) }));
        }
      }
    }
    else if (currentEvent.type === 'encounter') {
      if (choice === 'trust') {
        if (result > 10) {
          const heal = 20;
          message = `ได้รับอาหาร! ฟื้น HP ${heal}`;
          setPlayer(p => ({ ...p, health: Math.min(p.maxHealth, p.health + heal) }));
        } else {
          // Use player instead of p
          const stolen = Math.floor(player.gold * 0.5);
          message = `ถูกขโมย! เสียทอง ${stolen}`;
          setPlayer(p => ({ ...p, gold: p.gold - stolen }));
        }
      } else { // distrust
        if (result > 15) {
          message = "ปลอดภัย แต่เสียโอกาส";
        } else {
          message = "หลบหนีสำเร็จ!";
        }
      }
    }
    
    if (player.health <= 0) {
      setGameState("gameOver");
    }
    setDialogueText(message);
  };

  // In-app purchase for premium currency
  const purchaseCurrency = (amount) => {
    setPremiumCurrency(premiumCurrency + amount);
  };

  // Purchase items from the shop
  const purchaseItem = (item) => {
    if (player.gold >= item.cost) {
      setPlayer({ ...player, gold: player.gold - item.cost });
      setPurchasedItems([...purchasedItems, item]);
    }
  };

  // Restart the game
  const restartGame = () => {
    setGameState('characterCreation');
    setCurrentRoom(0);
    setScore(0);
    setInventory([]);
    setPlayer(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans text-gray-800 relative">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-4 sm:mb-0 self-center">
          ผจญภัยในดันเจี้ยน
        </h1>
      </header>

      {gameState === 'characterCreation' && (
        <CharacterCreation onCreateCharacter={createPlayer} />
      )}

      {gameState === 'playing' && (
        <GameBoard
          currentRoom={currentRoom}
          dialogueText={dialogueText}
          premiumCurrency={premiumCurrency}
          player={player}
          event={currentEvent || {}} // Provide fallback empty object
          diceResult={diceResult} // Only diceResult remains
          onChooseDirection={chooseDirection}
          onOpenShop={() => setGameState('shop')}
          onOpenInventory={() => setGameState('inventory')}
          onChoice={handleEventChoice}
        />
      )}

      {gameState === 'shop' && (
        <ShopInterface
          player={player}
          onPurchase={purchaseItem}
          onExit={() => setGameState('playing')}
          onBuyPremium={purchaseCurrency}
        />
      )}

      {gameState === 'inventory' && (
        <InventoryManager
          inventory={inventory}
          purchasedItems={purchasedItems}
          onExit={() => setGameState('playing')}
        />
      )}

      {gameState === 'gameOver' && (
        <GameOver
          score={score}
          roomsCleared={currentRoom}
          onRestart={restartGame}
        />
      )}



    </div>
  );
};

export default AdventureDungeon;
