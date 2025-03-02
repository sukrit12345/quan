"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import events from "../lib/events";
import StatusPanel from "../components/StatusPanel";
import CharacterPreview from "../components/CharacterPreview";
import CharacterCreation from "../components/CharacterCreation";
import ResultPopup from "../components/ResultPopup";
import Shop from "../components/Shop";
import Tomb from "../components/Tomb";

export default function GamePage() {
  const [character, setCharacter] = useState(null);
  const [ageIndex, setAgeIndex] = useState(0);
  const [status, setStatus] = useState({
    health: 100, // max is 100
    happiness: 50, // max is 100
    wealth: 100.0, // max is 100
    iq: 150, // max is 200
    lucky: 50, // max is 100
  });

  const [deathReason, setDeathReason] = useState("");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState({ text: "", achievement: "" });
  const [isGameOver, setIsGameOver] = useState(false);

  const currentAge = ageIndex;

  useEffect(() => {
    if (character) {
      const eventGroup = character.sex === "male" ? events.male : events.female;
      const filteredEvents = eventGroup.filter((event) => event.withAge === currentAge);

      if (filteredEvents.length > 0) {
        const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
        setCurrentEvent(randomEvent);
        setCurrentChoices(randomEvent.choices);
      } else {
        console.log("No event found for age:", currentAge, "and sex:", character.sex);
        setDeathReason("ถึงวัยชราและจากโลกนี้ไปอย่างสงบ");
        setIsGameOver(true); // Set game over state
      }
    }
  }, [ageIndex, character, currentAge]);

  const handleChoice = (effects, resText) => {
    const newStatus = { ...status };

    Object.keys(effects).forEach((key) => {
      if (newStatus[key] !== undefined) {
        newStatus[key] += effects[key];

        // Ensure status values stay within their bounds
        if (key === "health" || key === "happiness" || key === "lucky" || key === "wealth") {
          newStatus[key] = Math.max(0, Math.min(100, newStatus[key])); // Max 100 for health, happiness, lucky, wealth
        } else if (key === "iq") {
          newStatus[key] = Math.max(0, Math.min(200, newStatus[key])); // Max 200 for IQ
        }
      }
    });

    let respondText = `${resText}`;
    // future features
    let achievement = "";

    if (newStatus.happiness >= 80) {
      achievement = "ความสำเร็จ: ความสุขล้นเหลือ! 🌟";
    }

    // if (newStatus && effects.happiness > 5) {
    //   achievement = "ความสำเร็จ: ความสุขล้นเหลือ! 🌟";
    // } else if (effects.lucky && effects.lucky > 80) {
    //   achievement = "ความสำเร็จ: โชคดีสุดๆ! 🍀";
    // } else if (effects.iq && effects.iq > 120) {
    //   achievement = "ความสำเร็จ: ปราชญ์น้อย! 📚";
    // } else if (effects.iq && effects.iq > 120) {
    //   achievement = "ความสำเร็จ: อัจฉริยะ! 🧠";
    // } else if (effects.health && effects.health > 8) {
    //   achievement = "ความสำเร็จ: สุขภาพแข็งแรง! 💪";
    // }

    setCurrentResult({ text: respondText, achievement: achievement });
    setShowResult(true);

    setStatus(newStatus);

    if (newStatus.health <= 0) {
      setDeathReason(`เสียชีวิตเพราะสุขภาพย่ำแย่`);
      setIsGameOver(true); // Set game over state
      return;
    }
    if (newStatus.happiness <= 0) {
      setDeathReason(`คุณฆ่าตัวตายเพราะความเศร้า`);
      setIsGameOver(true); // Set game over state
      return;
    }
  };

  const handlePurchase = (item) => {
    if (!item) {
      setIsShopOpen(false);
      return;
    }
  };

  const handleResultClose = () => {
    setShowResult(false);
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
      wealth: 1000.0,
      iq: 150,
      lucky: 50,
    });
    setDeathReason("");
    setIsGameOver(false); // Reset game over state
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
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const ageDisplayVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      textShadow: [
        "0 0 8px rgba(234, 179, 8, 0.3)",
        "0 0 16px rgba(234, 179, 8, 0.6)",
        "0 0 8px rgba(234, 179, 8, 0.3)",
      ],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
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
        duration: 0.3,
      },
    },
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
        delay: i * 0.1,
      },
    }),
    hover: {
      scale: 1.02,
      x: 5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.15 },
    },
  };

  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    ripple.className = "absolute bg-white rounded-full animate-ripple";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
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
            <motion.div variants={headerVariants} className="text-center mb-8">
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
                {currentAge === 0 ? "กำลังจะเกิด" : `อายุ ${currentAge} ปี`}
              </motion.p>
            </motion.div>

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
                  {isGameOver ? <Tomb /> : <CharacterPreview character={character} />}
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
                      damping: 17,
                    },
                  }}
                >
                  <motion.p
                    className="text-lg text-gray-200 p-2 rounded-lg hover:bg-gray-700/50"
                    whileHover={{
                      backgroundColor: "rgba(55, 65, 81, 0.5)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {deathReason || (currentEvent && currentEvent.question) || "กำลังโหลด..."}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>

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
                      className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg transition-all duration-200 transform relative overflow-hidden flex items-center justify-center" // เพิ่ม flex, items-center, และ justify-center
                      onClick={(e) => {
                        handleChoice(choice.effects, choice.resText);
                        createRipple(e);
                      }}
                    >
                      <span className="text-lg font-medium relative z-10 text-center">{choice.text}</span> {/* เพิ่ม text-center เพื่อความชัดเจน */}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {!isGameOver ? (
                <>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      transition: { type: "spring", stiffness: 300, damping: 10 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      y: 2,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: { type: "spring", stiffness: 500, damping: 20 },
                    }}
                    onClick={(e) => {
                      setIsStatusOpen(true);
                      createRipple(e);
                    }}
                    className="flex-1 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg transition-all duration-200"
                  >
                    📊 แสดงสถานะ
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      transition: { type: "spring", stiffness: 300, damping: 10 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      y: 2,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: { type: "spring", stiffness: 500, damping: 20 },
                    }}
                    onClick={(e) => {
                      setIsShopOpen(true);
                      createRipple(e);
                    }}
                    className="flex-1 p-4 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg text-lg transition-all duration-200"
                  >
                    🛍️ เปิดร้าน
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: { type: "spring", stiffness: 300, damping: 10 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    y: 2,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: { type: "spring", stiffness: 500, damping: 20 },
                  }}
                  onClick={handleRestart}
                  className="flex-1 p-4 bg-red-600 hover:bg-red-700 rounded-lg shadow-lg text-lg transition-all duration-200"
                >
                  🎮 สร้างตัวละครใหม่
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {isShopOpen && <Shop onPurchase={handlePurchase} />}

      <StatusPanel
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        name={character.name}
        sex={character.sex}
        status={{
          health: status.health,
          happiness: status.happiness,
          wealth: status.wealth,
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
    </div>
  );
}