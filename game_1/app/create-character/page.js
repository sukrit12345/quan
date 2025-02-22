"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CharacterPreview from "../components/CharacterPreview";

export default function CreateCharacter() {
  const router = useRouter();
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

  const startGame = () => {
    if (!character.name.trim()) return alert("Enter a name!");
    router.push(
      `/game?name=${encodeURIComponent(character.name)}&sex=${character.sex}&skinTone=${encodeURIComponent(character.skinTone)}&shirtColor=${encodeURIComponent(character.shirtColor)}&glasses=${character.glasses}`
    );
  };

  return (
    <div className="h-[100dvh] flex items-center justify-center bg-gray-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg text-center p-4 sm:p-6"
      >
        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 gap-3">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-400">Create Your Character</h1>

          {/* Character Preview - Moved up for better visibility */}
          <motion.div
            animate={{ scale: [0.95, 1, 0.95] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center"
          >
            <div className="w-32 sm:w-40">
              <CharacterPreview character={character} />
            </div>
          </motion.div>

          {/* Name Input - Compact version */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={character.name}
              onChange={handleChange}
              className="w-full py-2 px-3 text-black rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            />
          </div>

          {/* Sex Selection - Compact buttons */}
          <div className="flex gap-2 justify-center">
            {["male", "female"].map((sex) => (
              <button
                key={sex}
                onClick={() => setCharacter({ ...character, sex })}
                className={`flex-1 py-2 font-semibold rounded-lg transition-all text-sm sm:text-base ${
                  character.sex === sex ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
                }`}
              >
                {sex.charAt(0).toUpperCase() + sex.slice(1)}
              </button>
            ))}
          </div>

          {/* Color Selection Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Skin Tone */}
            <div>
              <label className="block text-sm font-semibold mb-1">Skin Tone</label>
              <div className="flex justify-center gap-2">
                {["#FFD1DC", "#F5CBA7", "#E6B8A2", "#D2B48C"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setCharacter({ ...character, skinTone: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      character.skinTone === color ? "border-white scale-110" : "border-gray-600"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Shirt Color */}
            <div>
              <label className="block text-sm font-semibold mb-1">Shirt Color</label>
              <div className="flex justify-center gap-2">
                {["#FFB6C1", "#90EE90", "#87CEEB", "#DDA0DD"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setCharacter({ ...character, shirtColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      character.shirtColor === color ? "border-white scale-110" : "border-gray-600"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Glasses Toggle - Compact version */}
          <button
            onClick={toggleGlasses}
            className={`py-2 px-4 font-semibold rounded-lg transition-all text-sm ${
              character.glasses ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            {character.glasses ? "✅ Wearing Glasses" : "🕶️ Add Glasses"}
          </button>

          {/* Start Game Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-lg mt-2"
          >
            Start Life 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}