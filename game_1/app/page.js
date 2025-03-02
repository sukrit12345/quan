"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleStartGame = () => {
    console.log("✅ ปุ่มถูกกดแล้ว! กำลังไปที่ /game");
    router.push("/game");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden px-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 opacity-40 blur-2xl"></div>

      {/* Floating Effects */}
      <div className="absolute top-[-10%] left-[20%] w-24 md:w-36 h-24 md:h-36 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-28 md:w-40 h-28 md:h-40 bg-purple-500 rounded-full opacity-30 blur-3xl animate-bounce"></div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Game Title */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="block">ยินดีต้อนรับสู่</span>
          <span className="block text-blue-400 mt-2">Start Life</span>
        </motion.h1>

        {/* Game Description */}
        <motion.p
          className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          เกมจำลองชีวิตสุดฮา ที่คุณจะได้เลือกเส้นทางของตัวเอง 🎭
        </motion.p>

        {/* Start Button */}
        <motion.button
          className="px-6 py-3 text-base md:text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-blue-500/50 w-full md:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartGame}
        >
          🚀 เริ่มต้นชีวิตใหม่
        </motion.button>
      </motion.div>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {screenSize.width > 0 &&
          [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-50"
              initial={{
                x: Math.random() * screenSize.width,
                y: Math.random() * screenSize.height,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                y: ["0%", "100%"],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>
    </div>
  );
}