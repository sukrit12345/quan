// Modal.js
import React from 'react';
import { motion } from 'motion/react';

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-lg p-6 shadow-lg text-center"
      >
        <h2 className="text-xl font-bold mb-4">ใช้ 100 คริสตัล</h2>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          ตกลง
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
