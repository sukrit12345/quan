"use client";
import { motion, AnimatePresence } from "framer-motion";

const ResultPopup = ({ isOpen, onClose, result, achievement }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.5 }}
          className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-8 max-w-md w-full shadow-2xl border border-gray-700/50"
        >
          {/* Result Content */}
          <div className="text-center mb-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-200 mb-4"
            >
              {result}
            </motion.p>
            {achievement && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 mt-6 border border-yellow-500/30"
              >
                <div className="text-yellow-400 text-xl mb-2">🏆 New Achievement!</div>
                <p className="text-yellow-300">{achievement}</p>
              </motion.div>
            )}
          </div>

          {/* Continue Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }} // Blue-600 to Blue-700
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
          >
            ไปต่อ
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultPopup;