"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CharacterPreview from "./CharacterPreview";

export default function CharacterCreation({ onStartGame }) {
  const [character, setCharacter] = useState({
    name: "",
    sex: "male",
    skinTone: "#FFD1DC",
    shirtColor: "#FFB6C1",
    glasses: false,
  });

  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const toggleGlasses = () => {
    setCharacter({ ...character, glasses: !character.glasses });
  };

  const handleStartGame = () => {
    if (!character.name.trim()) return alert("Enter a name!");
    onStartGame(character);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl"
      >
        <div className="p-4 space-y-4">
          {/* Header */}
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
            Create Your Character
          </h1>

          {/* Character Preview */}
          <motion.div
            animate={{ scale: [0.98, 1.02, 0.98] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex justify-center py-2"
          >
            <div className="w-32">
              <CharacterPreview character={character} />
            </div>
          </motion.div>

          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={character.name}
              onChange={handleChange}
              className="w-full py-2 px-3 text-base text-black rounded-lg border-2 border-gray-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-center bg-white/90 placeholder-gray-500"
            />
          </div>

          {/* Gender Selection */}
          <div className="flex gap-2 justify-center">
            {["male", "female"].map((sex) => (
              <motion.button
                key={sex}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setCharacter({ ...character, sex })}
                className={`flex-1 py-2 px-4 text-base font-semibold rounded-lg transition-all ${
                  character.sex === sex 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {sex.charAt(0).toUpperCase() + sex.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Color Selection Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Skin Tone Selection */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-200">Skin Tone</label>
              <div className="flex justify-center gap-2">
                {["#FFD1DC", "#F5CBA7", "#E6B8A2", "#D2B48C"].map((color) => (
                  <motion.button
                    key={color}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setCharacter({ ...character, skinTone: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      character.skinTone === color 
                        ? "border-white shadow-lg scale-110" 
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Shirt Color Selection */}
            <div className="space-y-2">
              <label className="block text-base font-medium text-gray-200">Shirt Color</label>
              <div className="flex justify-center gap-2">
                {["#FFB6C1", "#90EE90", "#87CEEB", "#DDA0DD"].map((color) => (
                  <motion.button
                    key={color}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setCharacter({ ...character, shirtColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      character.shirtColor === color 
                        ? "border-white shadow-lg scale-110" 
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Glasses Toggle */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleGlasses}
            className={`w-full py-2 px-4 text-base font-semibold rounded-lg transition-all ${
              character.glasses 
                ? "bg-gradient-to-r from-green-500 to-green-600" 
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {character.glasses ? "✅ Wearing Glasses" : "🕶️ Add Glasses"}
          </motion.button>

          {/* Start Game Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleStartGame}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold text-lg shadow-lg transition-all"
          >
            Start Your Journey 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}