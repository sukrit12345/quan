"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TopUpModal = ({ onClose, onTopUp }) => {
  const [selectedAmount, setSelectedAmount] = useState(50); // เริ่มต้นที่ 50
  const amountOptions = [50, 100, 300, 500, 750, 1000]; // ตัวเลือกจำนวนเงิน

  // ฟังก์ชันสำหรับการเติมเงิน
  const handleConfirmTopUp = () => {
    onTopUp(selectedAmount); // ส่งจำนวนเงินที่เลือกไปยังฟังก์ชันหลัก
    onClose(); // ปิด Modal
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-gray-900 text-white rounded-lg p-6 shadow-xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4">💎 เติมคริสตัล</h2>
        <p className="text-gray-300 text-center mb-4">
          อัตราแลกเปลี่ยน: <strong>10 บาท = 1 คริสตัล</strong>
        </p>

        {/* ตัวเลือกจำนวนเงิน */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {amountOptions.map((amount) => (
            <button
              key={amount}
              className={`p-4 rounded-lg ${
                selectedAmount === amount
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              } text-white font-bold transition-colors`}
              onClick={() => setSelectedAmount(amount)}
            >
              {amount} บาท
            </button>
          ))}
        </div>

        {/* ปุ่มยืนยันการเติมเงิน */}
        <button
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold"
          onClick={handleConfirmTopUp}
        >
          ยืนยันการเติมเงิน
        </button>

        {/* ปุ่มยกเลิก */}
        <button
          className="w-full mt-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-bold"
          onClick={onClose}
        >
          ยกเลิก
        </button>
      </motion.div>
    </motion.div>
  );
};

const Shop = ({ onPurchase }) => {
  const [crystals, setCrystals] = useState(0); // จำนวนคริสตัลปัจจุบัน
  const [showTopUpModal, setShowTopUpModal] = useState(false); // เปิด/ปิด Modal เติมเงิน

  // ราคาสินค้าในคริสตัล
  const items = [
    {
      id: 1,
      name: "🌟 บูสต์ขั้นสุดยอด",
      effect: { happiness: 100, iq: 50, lucky: 100, money: 9999 },
      price: 3, // ราคาในคริสตัล
      description: "เพิ่มความสุขสูงสุด, IQ +50, โชคสูงสุด, เงิน +9999",
    },
    {
      id: 2,
      name: "📚 หนังสือเพิ่ม IQ",
      effect: { iq: 20 },
      price: 1, // ราคาในคริสตัล
      description: "IQ +20",
    },
    {
      id: 3,
      name: "🍀 เครื่องรางนำโชค",
      effect: { lucky: 30 },
      price: 1, // ราคาในคริสตัล
      description: "โชค +30",
    },
  ];

  // ฟังก์ชันสำหรับการเติมเงิน
  const handleTopUp = (amount) => {
    const exchangeRate = 10; // 10 บาทต่อ 1 คริสตัล
    const addedCrystals = Math.floor(amount / exchangeRate); // คำนวณคริสตัลที่ได้
    setCrystals((prev) => prev + addedCrystals); // เพิ่มคริสตัล
  };

  // ฟังก์ชันสำหรับการซื้อสินค้า
  const handlePurchase = (item) => {
    if (crystals < item.price) {
      // ถ้าคริสตัลไม่พอ ให้แสดง Modal เติมเงิน
      setShowTopUpModal(true);
    } else {
      // ถ้าคริสตัลพอ ให้ดำเนินการซื้อ
      onPurchase(item);
      setCrystals((prev) => prev - item.price); // ลดจำนวนคริสตัล
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-gray-900 text-white rounded-lg p-6 shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-4">🛍️ ร้านค้า</h2>

        {/* แสดงจำนวนคริสตัลปัจจุบัน */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold">
            💎 คริสตัลของคุณ: <span className="text-yellow-300">{crystals}</span>
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold"
            onClick={() => setShowTopUpModal(true)}
          >
            เติมคริสตัล
          </button>
        </div>

        {/* รายการสินค้า */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 rounded-lg p-4 mb-4 shadow-md"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <span className="text-yellow-300 font-bold">💎{item.price}</span>
            </div>
            <div className="text-gray-300 text-sm mb-4">
              <p>ผลลัพธ์เมื่อซื้อ:</p>
              <ul className="list-disc list-inside">
                {item.description.split(", ").map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg shadow-lg text-white font-bold"
              onClick={() => handlePurchase(item)} // เรียก handlePurchase เมื่อคลิก
            >
              <span className="flex items-center justify-center gap-2">
                ซื้อ
              </span>
            </motion.button>
          </motion.div>
        ))}

        {/* ปุ่มปิดร้าน */}
        <button
          className="w-full mt-5 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-bold"
          onClick={() => onPurchase(null)}
        >
          ❌ ปิดร้าน
        </button>
      </motion.div>

      {/* Modal สำหรับเติมเงิน */}
      <AnimatePresence>
        {showTopUpModal && (
          <TopUpModal
            onClose={() => setShowTopUpModal(false)}
            onTopUp={handleTopUp}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;