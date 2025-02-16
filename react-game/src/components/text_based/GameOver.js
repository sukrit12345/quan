import React, { useState } from 'react';
import Modal from './Modal';
import { motion } from 'framer-motion';

const GameOver = ({ score, roomsCleared, onRestart }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleRetryClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-2xl p-8 text-center max-w-md md:max-w-lg lg:max-w-xl mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
    >
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-white opacity-75 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ['0%', '-150%'],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
        🎉 เกมโอเวอร์ 🎉
      </h2>

      {/* Adventure Summary */}
      <motion.div
        className="bg-white bg-opacity-90 rounded-xl p-5 mb-6 shadow-md border-2 border-yellow-300"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
          📜 สรุปการผจญภัยของคุณ
        </h3>
        <p className="text-base md:text-lg mb-2">
          คะแนนสุดท้าย: <span className="font-bold text-purple-700">{score}</span>
        </p>
        <p className="text-base md:text-lg">
          ห้องที่เคลียร์: <span className="font-bold text-blue-700">{roomsCleared}</span>
        </p>
      </motion.div>

      {/* Rewards Section */}
      <motion.div
        className="bg-white bg-opacity-95 rounded-lg p-5 mb-8 shadow-lg border border-pink-300"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
          🏆 รางวัลที่ได้รับ
        </h3>
        {roomsCleared >= 10 && (
          <p className="bg-yellow-100 border-l-4 border-yellow-400 p-2 text-left text-yellow-800 font-medium mb-2">
            🥇 <strong>นักสำรวจผู้กล้าหาญ:</strong> เคลียร์ 10+ ห้อง
          </p>
        )}
        {score >= 1000 && (
          <p className="bg-green-100 border-l-4 border-green-400 p-2 text-left text-green-800 font-medium mb-2">
            💰 <strong>นักล่าสมบัติ:</strong> คะแนน 1000+
          </p>
        )}
        {roomsCleared < 10 && score < 1000 && (
          <p className="text-gray-500 italic text-sm md:text-base">
            😢 คุณไม่ได้รับรางวัลในรอบนี้
          </p>
        )}
      </motion.div>

      {/* Buttons Container */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
        {/* Restart Button with Motion */}
        <motion.button
          className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-lg shadow-lg"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          🚀 เริ่มใหม่
        </motion.button>

        {/* Retry Button with Gradient and Glow Animation */}
        <motion.button
          className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 font-bold text-white rounded-lg text-lg relative overflow-hidden"
          onClick={handleRetryClick}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            background: 'linear-gradient(135deg, #ff9966, #ff5e62)',
            boxShadow: '0px 4px 20px rgba(255, 100, 100, 0.5)',
            position: 'relative',
          }}
        >
          💎 ลองอีกครั้ง
          {/* Shiny Swipe Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20"
            initial={{ x: '-100%' }}
            animate={{ x: '150%' }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            style={{
              background: 'linear-gradient(120deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
              width: '150%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-25deg)',
            }}
          />
        </motion.button>
      </div>

      {/* Show Modal */}
      <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
    </motion.div>
  );
};

export default GameOver;