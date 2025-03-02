"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CharacterPreview from "./CharacterPreview";
import thainames from "../lib/thainames";

export default function CharacterCreation({ onStartGame }) {
  const [character, setCharacter] = useState({
    name: "",
    sex: "male",
    skinTone: "#F5CBA7",
    shirtColor: "#FFB6C1",
    glasses: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only accept letters
    if (name === "name" && !/^[a-zA-Zก-๙\s]*$/.test(value)) return;
    // Update state only if value is not empty
    if (name === "name" && value.trim() === "") {
      alert("กรุณาตั้งชื่อตัวละคร!");
      return;
    }
    setCharacter({ ...character, [name]: value });
  };

  const toggleGlasses = () => {
    setCharacter({ ...character, glasses: !character.glasses });
  };

  const handleStartGame = () => {
    if (!character.name.trim()) return alert("กรุณาตั้งชื่อตัวละคร!");
    onStartGame(character);
  };

  const randomizeName = () => {
    const names = thainames[character.sex];
    const randomName = names[Math.floor(Math.random() * names.length)];
    setCharacter({ ...character, name: randomName });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const genderButtonVariants = {
    initial: { y: 0 },
    hover: { y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
    tap: { y: 1, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", scale: 0.98 },
  };

  const skinTones = ["#FFD1DC", "#F5CBA7", "#E6B8A2", "#D2B48C"];
  const shirtColors = ["#FFB6C1", "#90EE90", "#87CEEB", "#DDA0DD"];

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="w-full h-full max-w-md mx-auto bg-gray-800 flex flex-col"
      >
        <div className="bg-indigo-900 py-4">
          <h1 className="text-2xl font-bold text-blue-300 text-center">
            สร้างตัวละครของคุณ
          </h1>
        </div>

        <div className="flex-1 flex flex-col px-4 py-2">
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-32"
            >
              <CharacterPreview character={character} />
            </motion.div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="name"
                placeholder="กรุณาตั้งชื่อตัวละคร!"
                value={character.name}
                onChange={handleChange}
                className="flex-1 py-3 px-4 text-lg text-gray-800 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none text-center bg-gray-100"
              />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={randomizeName}
                className="bg-gray-700 text-white p-3 rounded-lg flex items-center justify-center"
              >
                <motion.span 
                  role="img" 
                  aria-label="Random"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5, repeat: 0, repeatDelay: 2 }}
                >
                  🎲
                </motion.span>
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                variants={genderButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => setCharacter({ ...character, sex: "male" })}
                className={`py-3 text-base font-semibold rounded-lg transition-all ${
                  character.sex === "male"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <span role="img" aria-label="Male">👨</span> ชาย
              </motion.button>
              <motion.button
                variants={genderButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => setCharacter({ ...character, sex: "female" })}
                className={`py-3 text-base font-semibold rounded-lg transition-all ${
                  character.sex === "female"
                    ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <span role="img" aria-label="Female">👩</span> หญิง
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-3">
              <div>
                <label className="flex items-center gap-1 mb-1 text-purple-300">
                  <span role="img" aria-label="Skin">👤</span> สีผิว
                </label>
                <div className="flex justify-start gap-2">
                  {skinTones.map((color) => (
                    <motion.button
                      key={color}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setCharacter({ ...character, skinTone: color })}
                      className={`w-8 h-8 rounded-full transition-all ${
                        character.skinTone === color
                          ? "ring-2 ring-white scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Skin tone ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 mb-1 text-green-400">
                  <span role="img" aria-label="Shirt">👕</span> สีเสื้อ
                </label>
                <div className="flex justify-start gap-2">
                  {shirtColors.map((color) => (
                    <motion.button
                      key={color}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setCharacter({ ...character, shirtColor: color })}
                      className={`w-8 h-8 rounded-full transition-all ${
                        character.shirtColor === color
                          ? "ring-2 ring-white scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Shirt color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              variants={genderButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={toggleGlasses}
              className={`w-full py-3 rounded-lg font-medium text-base ${
                character.glasses 
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-200"
              }`}
            >
              <motion.span
                animate={character.glasses ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {character.glasses ? "👓 ใส่แว่นแล้ว" : "🕶️ เพิ่มแว่นตา"}
              </motion.span>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ 
                scale: 0.97,
                boxShadow: "0 0 5px rgba(99, 102, 241, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={handleStartGame}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold text-lg text-white shadow-lg"
            >
              <motion.span 
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                เริ่มต้นการเดินทาง 🚀
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}