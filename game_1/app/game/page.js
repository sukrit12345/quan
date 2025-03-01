"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import events from "../lib/events";
import StatusPanel from "../components/StatusPanel";
import CharacterPreview from "../components/CharacterPreview";
import CharacterCreation from "../components/CharacterCreation";
import ResultPopup from "../components/ResultPopup";
import Shop from "../components/Shop";
import GameOver from "../components/GameOver"; // Import the GameOver component

export default function GamePage() {
  const [character, setCharacter] = useState(null);
  const [ageIndex, setAgeIndex] = useState(0);
  const [status, setStatus] = useState({
    health: 100, // Percent
    happiness: 50, // Percent
    money: 1000.0, // Currency
    iq: 150, // IQ
    lucky: 50, // Max 100
  });

  const [deathReason, setDeathReason] = useState("");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentChoices, setCurrentChoices] = useState([]);

  // for shop popup
  const [isShopOpen, setIsShopOpen] = useState(false);

  // Add new state for result popup
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState({ text: "", achievement: "" });

  // Get current age based on ageIndex
  const currentAge = ageIndex + 1;

  // Load appropriate event for current age and gender
  useEffect(() => {
    if (character) {
      // Filter events that match current age and gender
      const filteredEvents = events.filter(
        (event) => event.withAge === currentAge && event.gender === character.sex
      );

      // Select a random event from filtered events
      if (filteredEvents.length > 0) {
        const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
        setCurrentEvent(randomEvent);
        setCurrentChoices(randomEvent.choices);
      } else {
        console.log("No event found for age:", currentAge, "and gender:", character.sex);
        // If we've reached the end of available events
        if (currentAge > 5) {
          setDeathReason("ถึงวัยชราและจากโลกนี้ไปอย่างสงบ");
        }
      }
    }
  }, [ageIndex, character, currentAge]);

  const handleChoice = (effects, choiceText) => {
    const newStatus = { ...status };

    // Update all possible status attributes
    Object.keys(effects).forEach((key) => {
      if (newStatus[key] !== undefined) {
        newStatus[key] += effects[key];

        // Ensure values stay within reasonable bounds
        if (key === "happiness" || key === "lucky" || key === "money" || key === "iq") {
          newStatus[key] = Math.max(0, Math.min(100, newStatus[key]));
        }
      }
    });

    // Set the result text and any achievements
    let resultText = effects.result || `คุณเลือกที่จะ${choiceText}`;
    let achievement = "";

    // Check for special achievements based on effects
    if (effects.happiness && effects.happiness > 8) {
      achievement = "Achievement: ความสุขล้นเหลือ! 🌟";
    } else if (effects.lucky && effects.lucky > 8) {
      achievement = "Achievement: โชคดีสุดๆ! 🍀";
    } else if (effects.knowledge && effects.knowledge > 8) {
      achievement = "Achievement: ปราชญ์น้อย! 📚";
    } else if (effects.health && effects.health > 8) {
      achievement = "Achievement: สุขภาพแข็งแรง! 💪";
    } else if (effects.relationship && effects.relationship > 8) {
      achievement = "Achievement: นักสร้างมิตรภาพ! 👫";
    }

    // Show the result popup
    setCurrentResult({ text: resultText, achievement });
    setShowResult(true);

    // Check for death conditions
    if (newStatus.happiness <= 0) {
      setDeathReason(`เสียชีวิตเพราะความทุกข์ล้นพ้นหลังจากเลือกที่จะ "${choiceText}"`);
      return;
    }
    if (newStatus.health <= 0) {
      setDeathReason("เสียชีวิตเพราะสุขภาพย่ำแย่");
      return;
    }
    if (newStatus.lucky <= 0) {
      setDeathReason("เสียชีวิตเพราะโชคร้ายอย่างหนัก");
      return;
    }

    setStatus(newStatus);
  };

  const handlePurchase = (item) => {
    if (!item) {
      setIsShopOpen(false);
      return;
    }

    if (status.money >= item.price) {
      setStatus({
        happiness: 100,
        money: 9999,
        iq: 100,
        lucky: 100,
      });
    } else {
      alert("เงินไม่พอ! 😭");
    }
  };

  const handleResultClose = () => {
    setShowResult(false);
    // Faster transition to next age
    setTimeout(() => {
      setAgeIndex(ageIndex + 1);
    }, 200);
  };

  const handleRestart = () => {
    setCharacter(null);
    setAgeIndex(0);
    setStatus({
      health: 100,
      happiness: 50,
      money: 1000.0,
      iq: 150,
      lucky: 50,
    });
    setDeathReason("");
  };

  if (!character) {
    return <CharacterCreation onStartGame={setCharacter} />;
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const ageDisplayVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      textShadow: [
        "0 0 8px rgba(234, 179, 8, 0.3)",
        "0 0 16px rgba(234, 179, 8, 0.6)",
        "0 0 8px rgba(234, 179, 8, 0.3)"
      ],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const questionContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3
      }
    }
  };

  const choiceVariants = {
    hidden: { opacity: 0, x: -20, y: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        delay: i * 0.1
      }
    }),
    hover: {
      scale: 1.02,
      x: 5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.15 }
    }
  };

  // Check if health is less than or equal to 0
  const isGameOver = status.health <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={ageIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="container mx-auto px-4 py-8"
        >
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <motion.div
              variants={headerVariants}
              className="text-center mb-8"
            >
              <motion.h1
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {character.name}'s Life
              </motion.h1>
              <motion.p
                variants={ageDisplayVariants}
                animate="pulse"
                className="text-2xl font-semibold text-yellow-300 mt-2"
              >
                อายุ: {currentAge} ปี
              </motion.p>
            </motion.div>

            {/* Character and Question Section */}
            <motion.div
              variants={questionContainerVariants}
              className="bg-gray-800 rounded-xl p-6 shadow-2xl mb-8"
            >
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-48 h-48 flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CharacterPreview character={character} />
                </motion.div>
                <motion.div
                  className="flex-1 cursor-pointer touch-pan-y"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 1.05 }}
                  transition={{
                    duration: 0.2,
                    scale: {
                      type: "spring",
                      stiffness: 400,
                      damping: 17
                    }
                  }}
                >
                  <motion.p
                    className="text-lg text-gray-200 p-2 rounded-lg hover:bg-gray-700/50"
                    whileHover={{
                      backgroundColor: "rgba(55, 65, 81, 0.5)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {deathReason || (currentEvent && currentEvent.question) || "กำลังโหลด..."}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Choices Section */}
            <AnimatePresence mode="wait">
              {!deathReason && currentChoices.length > 0 && (
                <motion.div className="space-y-3">
                  {currentChoices.map((choice, index) => (
                    <motion.button
                      key={index}
                      custom={index}
                      variants={choiceVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg text-left transition-all duration-200 transform"
                      onClick={() => handleChoice(choice.effects, choice.text)}
                    >
                      <span className="text-lg font-medium">{choice.text}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status and Shop Buttons */}
            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsStatusOpen(true)}
                className="flex-1 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg transition-all duration-200"
              >
                📊 แสดงสถานะ
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsShopOpen(true)}
                className="flex-1 p-4 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg text-lg transition-all duration-200"
              >
                🛍️ เปิดร้าน
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {isShopOpen && <Shop onPurchase={handlePurchase} />}

      {/* Status Panel and Result Popup */}
      <StatusPanel
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        name={ character.name}
        sex={character.sex}
        status={{
          health: status.health,
          happiness: status.happiness,
          money: status.money,
          iq: status.iq,
          lucky: status.lucky,
        }}
      />

      <ResultPopup
        isOpen={showResult}
        onClose={handleResultClose}
        result={currentResult.text}
        achievement={currentResult.achievement}
      />

      {/* Render GameOver component if health is <= 0 */}
      {isGameOver && <GameOver isOpen={isGameOver} onRestart={handleRestart} />}
    </div>
  );
}