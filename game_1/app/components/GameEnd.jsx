import { motion, AnimatePresence } from "framer-motion";

export default function GameEnd({ isOpen, onRestart, deathReason }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div>

        </div>
      )}
    </AnimatePresence>
  );
}