// rout app/game/page
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import events from "../lib/events";
import StatusPanel from "../components/StatusPanel";
import CharacterPreview from "../components/CharacterPreview";
import CharacterCreation from "../components/CharacterCreation";
import ResultPopup from "../components/ResultPopup";

export default function GamePage() {
  const [character, setCharacter] = useState(null);
  const [ageIndex, setAgeIndex] = useState(0);
  const [status, setStatus] = useState({
    happiness: 50,
    relationship: 50,
    health: 100,
    money: 1000,
    knowledge: 10,
    lucky: 50,
  });
  const [deathReason, setDeathReason] = useState("");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState([]);

  // Add new state for result popup
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState({ text: "", achievement: "" });

  const currentAge = events[ageIndex]?.age || 100;
  const eventChoices = events[ageIndex]?.choices[character?.sex || "male"] || [];

  useEffect(() => {
    if (character) {
      const shuffledChoices = [...eventChoices].sort(() => Math.random() - 0.5);
      setSelectedChoices(shuffledChoices.slice(0, 2));
    }
  }, [ageIndex, character]);

  const handleChoice = (effects, choiceText) => {
    const newStatus = { ...status };
    Object.keys(effects).forEach((key) => {
      newStatus[key] = (newStatus[key] || 0) + effects[key];
    });

    // Set the result text and any achievements
    let resultText = effects.result || `You chose to ${choiceText.toLowerCase()}.`;
    let achievement = "";

    // Check for special achievements based on effects
    if (effects.happiness && effects.happiness > 10) {
      achievement = "Achievement: Extremely Happy! 🌟";
    } else if (effects.lucky && effects.lucky > 10) {
      achievement = "Achievement: Super Lucky! 🍀";
    }
    // Add more achievement conditions as needed

    // Show the result popup
    setCurrentResult({ text: resultText, achievement });
    setShowResult(true);

    // Update status after popup is closed
    if (newStatus.health <= 0) {
      setDeathReason(`Died from bad health after choosing "${choiceText}".`);
      return;
    }
    if (newStatus.money < -5000) {
      setDeathReason("Died in poverty with massive debt.");
      return;
    }
    if (newStatus.lucky <= 0) {
      setDeathReason("Died due to extreme bad luck.");
      return;
    }
    if (ageIndex >= events.length - 1) {
      setDeathReason("Died of old age.");
      return;
    }

    setStatus(newStatus);
  };

  const handleResultClose = () => {
    setShowResult(false);
    // Faster transition to next age
    setTimeout(() => {
      setAgeIndex(ageIndex + 1);
    }, 200);
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
                Age: {currentAge}
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
                    {events[ageIndex]?.question || deathReason}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Choices Section */}
            <AnimatePresence mode="wait">
              {!deathReason && (
                <motion.div
                  className="space-y-3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {selectedChoices.map((choice, index) => (
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

            {/* Status Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.03,
                y: -2,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsStatusOpen(true)}
              className="w-full mt-6 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg transition-all duration-200"
            >
              📊 Show Status
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Status Panel and Result Popup */}
      <StatusPanel
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        status={status}
      />
      <ResultPopup
        isOpen={showResult}
        onClose={handleResultClose}
        result={currentResult.text}
        achievement={currentResult.achievement}
      />
    </div>
  );
}