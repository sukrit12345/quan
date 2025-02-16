import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import BoyCat from '../character_sprites/BoyCat';
import GirlCat from '../character_sprites/GirlCat';

const CharacterCreation = ({ onCreateCharacter }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('man');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateCharacter(name, gender);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <motion.div
        className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-[90vw] md:max-w-2xl mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-indigo-600">
          สร้างตัวละคร
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode='wait'>
              {gender === 'man' ? (
                <motion.div
                  key="male"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-32 md:w-48"
                >
                  <BoyCat className="w-full h-auto" />
                </motion.div>
              ) : (
                <motion.div
                  key="female"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-32 md:w-48"
                >
                  <GirlCat className="w-full h-auto" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-lg md:text-xl font-medium mb-2 text-gray-700">
                ชื่อตัวละคร
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-base border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="ใส่ชื่อตัวละคร"
                required
              />
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col items-center space-y-4">
                <span className="block text-lg md:text-xl font-medium text-gray-700 mb-2">
                  เพศ
                </span>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {['man', 'woman'].map((g) => (
                    <motion.label
                      key={g}
                      className={`cursor-pointer px-6 py-3 text-base rounded-lg border-2 transition-all ${
                        gender === g
                          ? g === 'man'
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-pink-500 bg-pink-50 scale-105'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="radio"
                        value={g}
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="hidden"
                      />
                      <span className="text-center block">
                        {g === 'man' ? 'ชาย' : 'หญิง'}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 text-base rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                เริ่มการผจญภัย
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterCreation;