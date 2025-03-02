import { motion } from 'framer-motion';

const Tomb = () => {
  return (
    <motion.div
      className="w-48 h-48 flex-shrink-0 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g transform="translate(50, 70)">
          {/* Tombstone Base */}
          <rect x="0" y="150" width="100" height="150" rx="10" fill="#666" />
          
          {/* Tombstone Top */}
          <path d="M0 150 Q50 130 100 150" fill="#555" />
          
          {/* Tombstone Cross */}
          <rect x="45" y="100" width="10" height="50" fill="#444" />
          <rect x="30" y="120" width="40" height="10" fill="#444" />
          
          {/* RIP Text */}
          <text x="50" y="200" fontFamily="Arial" fontSize="20" fill="white" textAnchor="middle">
            RIP
          </text>
        </g>
      </svg>
    </motion.div>
  );
};

export default Tomb;