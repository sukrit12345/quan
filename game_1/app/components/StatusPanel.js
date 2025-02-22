"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusPanel({ isOpen, onClose, status }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-300 mb-3">📊 Life Status</h2>

            {Object.entries(status).map(([key, value]) => (
              <div key={key} className="mb-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="capitalize">{key}</span>
                  <span>{value}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${Math.min(value, 100)}%` }}
                    className={`h-full rounded-full ${getStatusColor(key, value)}`}
                  />
                </div>
              </div>
            ))}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-4 w-full p-2 bg-red-500 hover:bg-red-600 rounded-md"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Function to determine progress bar color
const getStatusColor = (key, value) => {
  if (key === "health") return value > 50 ? "bg-green-400" : "bg-red-500";
  if (key === "happiness") return value > 50 ? "bg-yellow-300" : "bg-gray-400";
  if (key === "money") return value > 500 ? "bg-green-500" : "bg-red-400";
  if (key === "lucky") return value > 50 ? "bg-blue-400" : "bg-gray-500";
  return "bg-blue-300";
};
