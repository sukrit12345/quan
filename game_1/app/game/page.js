"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import events from "../lib/events";
import StatusPanel from "../components/StatusPanel";
import CharacterPreview from "../components/CharacterPreview";
import CharacterCreation from "../components/CharacterCreation";

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

    setStatus(newStatus);

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

    setAgeIndex(ageIndex + 1);
  };

  if (!character) {
    return <CharacterCreation onStartGame={setCharacter} />;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const choiceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-2xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {character.name}'s Life
            </h1>
            <motion.p
              animate={{ scale: [1, 1.1, 1], transition: { duration: 1, repeat: Infinity } }}
              className="text-2xl font-semibold text-yellow-300 mt-2"
            >
              Age: {currentAge}
            </motion.p>
          </div>

          {/* Character and Question Section */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 flex-shrink-0">
                <CharacterPreview character={character} />
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-200">
                  {events[ageIndex]?.question || deathReason}
                </p>
              </div>
            </div>
          </div>

          {/* Choices Section */}
          <AnimatePresence mode="wait">
            {!deathReason && (
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {selectedChoices.map((choice, index) => (
                  <motion.button
                    key={index}
                    variants={choiceVariants}
                    whileHover="hover"
                    className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg text-left transition-all duration-300 transform"
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsStatusOpen(true)}
            className="w-full mt-6 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg transition-colors duration-300"
          >
            📊 Show Status
          </motion.button>
        </motion.div>
      </div>

      {/* Status Panel */}
      <StatusPanel
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        status={status}
      />
    </div>
  );
}