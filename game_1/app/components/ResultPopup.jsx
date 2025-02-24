"use client";
import { motion, AnimatePresence } from "framer-motion";

const ResultPopup = ({ isOpen, onClose, result, achievement }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 max-w-md w-full shadow-2xl"
      >
        {/* Result Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Result</h2>
          <p className="text-lg text-gray-200 mb-4">{result}</p>
          
          {/* Achievement Section (if exists) */}
          {achievement && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 mt-4"
            >
              <div className="text-yellow-400 text-xl mb-2">🏆 New Achievement!</div>
              <p className="text-yellow-300">{achievement}</p>
            </motion.div>
          )}
        </div>

        {/* Continue Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultPopup;