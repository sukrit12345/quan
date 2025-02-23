"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  // ✅ แก้ปัญหา window is not defined
  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  // ✅ ฟังก์ชันแยกเพื่อเช็คว่าปุ่มกดได้
  const handleStartGame = () => {
    console.log("✅ ปุ่มถูกกดแล้ว! กำลังไปที่ /game"); // เช็คว่าฟังก์ชันทำงานไหม
    router.push("/game");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* พื้นหลังแบบไล่สี */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 opacity-40 blur-2xl"></div>

      {/* เอฟเฟกต์วงกลมที่ลอยไปมา */}
      <div className="absolute top-[-10%] left-[20%] w-36 h-36 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-40 h-40 bg-purple-500 rounded-full opacity-30 blur-3xl animate-bounce"></div>

      {/* ชื่อเกม */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-white drop-shadow-md"
      >
        ยินดีต้อนรับสู่  
        <span className="text-blue-400"> Start Life</span>
      </motion.h1>

      {/* คำอธิบายเกม */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg sm:text-xl text-gray-300 text-center mt-2"
      >
        เกมจำลองชีวิตสุดฮา ที่คุณจะได้เลือกเส้นทางของตัวเอง 🎭  
      </motion.p>

      {/* ปุ่มเริ่มเกม */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="z-50 mt-8 px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-lg transition-all hover:bg-blue-600 hover:shadow-blue-500/50"
        onClick={handleStartGame} // ✅ ใช้ฟังก์ชันแยก
      >
        🚀 เริ่มต้นชีวิตใหม่
      </motion.button>

      {/* เอฟเฟกต์ดวงดาวเล็ก ๆ ที่ลอยไปมา */}
      <div className="absolute inset-0 pointer-events-none">
        {screenSize.width > 0 &&
          [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-50"
              initial={{
                x: Math.random() * screenSize.width, // ✅ ใช้ค่าจาก useState
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
