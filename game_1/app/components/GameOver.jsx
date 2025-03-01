import { motion, AnimatePresence } from "framer-motion";

export default function GameOver({ isOpen, onRestart }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over</h2>
            <p className="text-lg text-gray-200 mb-6">สุขภาพของคุณหมดลงแล้ว</p>
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-all duration-200"
            >
              เริ่มเกมใหม่
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}