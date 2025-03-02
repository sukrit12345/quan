"use client";
import { motion, AnimatePresence } from "framer-motion";

const getStatusColor = (key, value) => {
  switch (key) {
    case "health":
      return value > 75 ? "bg-gradient-to-r from-green-500 to-green-400" :
        value > 50 ? "bg-gradient-to-r from-green-400 to-green-300" :
          value > 25 ? "bg-gradient-to-r from-yellow-400 to-green-300" :
            "bg-gradient-to-r from-red-500 to-red-400";
    case "happiness":
      return value > 75 ? "bg-gradient-to-r from-yellow-300 to-yellow-400" :
        value > 50 ? "bg-gradient-to-r from-yellow-200 to-yellow-300" :
          value > 25 ? "bg-gradient-to-r from-gray-400 to-yellow-200" :
            "bg-gradient-to-r from-gray-500 to-gray-400";
    case "iq":
      return value > 140 ? "bg-gradient-to-r from-purple-500 to-indigo-500" :
        value >= 120 ? "bg-gradient-to-r from-purple-400 to-indigo-400" :
          value >= 110 ? "bg-gradient-to-r from-purple-300 to-indigo-300" :
            value >= 90 ? "bg-gradient-to-r from-gray-400 to-purple-200" :
              value >= 80 ? "bg-gradient-to-r from-yellow-400 to-orange-300" :
                "bg-gradient-to-r from-red-500 to-red-400";
    case "lucky":
      return value > 75 ? "bg-gradient-to-r from-blue-500 to-cyan-400" :
        value > 50 ? "bg-gradient-to-r from-blue-400 to-cyan-300" :
          value > 25 ? "bg-gradient-to-r from-gray-400 to-blue-300" :
            "bg-gradient-to-r from-gray-500 to-gray-400";
    case "wealth":
      return value > 80 ? "bg-gradient-to-r from-green-500 to-emerald-400" :
        value > 25 ? "bg-gradient-to-r from-green-400 to-emerald-300" :
            "bg-gradient-to-r from-red-400 to-red-300";
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-300";
  }
};

const formatValue = (key, value) => {
  if (key === "health") return `${value}%`;
  if (key === "happiness") return `${value}%`;
  if (key === "wealth") return `${value}%`;
  if (key === "iq") return `${value}`;
  if (key === "lucky") return `${value}%`;
  return value;
};

// Thai translations for labels
const thaiLabels = {
  health: "สุขภาพ",
  happiness: "ความสุข",
  wealth: "ความมั่งคั่ง",
  iq: "ไอคิว",
  lucky: "โชค"
};

// Icons for each status
const getStatusIcon = (key) => {
  switch (key) {
    case "health":
      return "❤️";
    case "happiness":
      return "😊";
    case "iq":
      return "🧠";
    case "lucky":
      return "🍀";
    case "wealth":
      return "💰";
    default:
      return "📊";
  }
};

// Status Panel Component
export default function StatusPanel({ isOpen, onClose, status, name, sex }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const barVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (custom) => {
      const { value, key } = custom; // Destructure value and key from custom
      let maxValue;

      // Set max value based on the key
      switch (key) {
        case "health":
        case "happiness":
        case "lucky":
        case "wealth":
          maxValue = 100; 
          break;
        case "iq":
          maxValue = 200; 
          break;
        default:
          maxValue = 100; // Default max value
      }

      // Calculate width percentage
      const widthPercentage = (value / maxValue) * 100;
      return {
        width: `${Math.min(widthPercentage, 100)}%`, // Ensure width doesn't exceed 100%
        opacity: 1,
        transition: {
          delay: 0.2,
          duration: 0.6,
          type: "spring",
          stiffness: 200
        }
      };
    }
  };

  // Convert status object to an array of key-value pairs
  const regularStats = Object.entries(status);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-50"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xl font-bold text-white flex items-center gap-2 mb-6"
            >
              <motion.span
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: "easeInOut"
                }}
              >
                📊
              </motion.span>
              <div>
                <div>{name}</div>
                <div className="text-sm text-gray-400">เพศ: {sex === "male" ? "ชาย" : "หญิง"}</div>
              </div>
            </motion.div>

            {/* Regular Status Bars */}
            {regularStats.map(([key, value], index) => (
              <motion.div
                key={key}
                className="mb-5"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <div className="flex items-center">
                    <motion.span
                      className="mr-2 text-xl"
                      whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {getStatusIcon(key)}
                    </motion.span>
                    <span className="capitalize font-medium">{thaiLabels[key] || key}</span>
                  </div>
                  <span className="font-semibold">{formatValue(key, value)}</span>
                </div>
                <div className="w-full h-5 bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-700 relative">
                  <motion.div
                    custom={{ value, key }}
                    variants={barVariants}
                    initial="hidden"
                    animate="visible"
                    className={`h-full rounded-full ${getStatusColor(key, value)}`}
                  />
                </div>
              </motion.div>
            ))}

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-6 w-full py-3 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-lg transition text-white"
            >
              ปิด
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}