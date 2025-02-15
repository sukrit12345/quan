import React, { useState, useEffect } from 'react';

// Import character sprites for the status panel
import BoyCat from '../character_sprites/BoyCat';
import GirlCat from '../character_sprites/GirlCat';

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

  const getRestArea = () => {
    return {
      type: 'rest',
      name: 'จุดพัก',
      description: 'สถานที่ปลอดภัยสำหรับฟื้นฟูพลังงาน',
      healthRecovery: 20,
    };
  };

  // Handle direction choices and events after selection
  const chooseDirection = (direction) => {
    setCurrentRoom(currentRoom + 1);
    const event = generateEvent();
    let message = "";

    if (event.type === 'monster') {
      if (Math.random() < 0.7) {
        setScore(score + 50);
        setPlayer({ ...player, gold: player.gold + event.gold });
        message = `คุณเผชิญหน้ากับ ${event.name}! คุณชนะและได้รับทอง ${event.gold} เหรียญ`;
      } else {
        setPlayer({ ...player, health: player.health - 20 });
        message = `คุณถูก ${event.name} โจมตี! คุณเสีย 20 HP`;
      }
    } else if (event.type === 'treasure') {
      setScore(score + 150);
      setInventory([...inventory, event]);
      message = `คุณพบสมบัติ: ${event.name}. ${event.description}`;
    } else if (event.type === 'encounter') {
      if (Math.random() < 0.5) {
        setPremiumCurrency(premiumCurrency + 1);
        message = `บุคคลลึกลับมอบคริสตัลพิเศษให้คุณ 1 เม็ด!`;
      } else {
        message = `คุณไม่พบเหตุการณ์สำคัญใดๆ และเดินหน้าต่อไป`;
      }
    } else if (event.type === 'rest') {
      setPlayer({
        ...player,
        health: Math.min(player.maxHealth, player.health + event.healthRecovery),
      });
      message = `คุณพบจุดพักและฟื้นฟูพลังชีวิต ${event.healthRecovery} HP`;
    }

    setDialogueText(message);

    if (player.health <= 0) {
      setGameState('gameOver');
      setDialogueText("คุณพ่ายแพ้ในการต่อสู้... เกมโอเวอร์!");
    }
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
          onChooseDirection={chooseDirection}
          onOpenShop={() => setGameState('shop')}
          onOpenInventory={() => setGameState('inventory')}
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

      {/* New Fixed Status Panel in Bottom Left */}
      {player && (
        <div className="fixed bottom-4 left-4 p-4 flex items-center space-x-4 bg-white bg-opacity-80 rounded shadow-lg">
          {player.gender === 'woman' ? (
            <GirlCat width="70" height="100" className="character-display" />
          ) : (
            <BoyCat width="70" height="100" className="character-display" />
          )}
          <div className="text-sm text-gray-900">
            <p>{player.name} ({player.gender === 'woman' ? 'หญิง' : 'ชาย'}) - เลเวล {player.level}</p>
            <p>HP: {player.health}/{player.maxHealth}</p>
            <p>ทอง: {player.gold}</p>
            <p>คริสตัล: {premiumCurrency}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdventureDungeon;
