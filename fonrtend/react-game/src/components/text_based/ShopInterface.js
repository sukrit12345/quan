import React from 'react';
import { motion } from 'motion/react';

const ShopInterface = ({ player, onPurchase, onExit, onBuyPremium }) => {
  const shopItems = [
    { id: 1, name: "โพชั่นฟื้นพลัง", cost: 20, effect: "ฟื้นฟูพลังชีวิต 30 หน่วย", type: "consumable" },
    { id: 2, name: "ดาบขั้นสูง", cost: 100, effect: "+5 พลังโจมตี", type: "weapon" },
    { id: 3, name: "โล่ป้องกัน", cost: 80, effect: "+3 พลังป้องกัน", type: "armor" },
    { id: 4, name: "เครื่องรางนำโชค", cost: 150, effect: "+5% โอกาสคริติคอล", type: "accessory" },
  ];

  const premiumPacks = [
    { id: "basic", name: "แพ็คพื้นฐาน", cost: 149, crystals: 50 },
    { id: "advanced", name: "แพ็คขั้นสูง", cost: 299, crystals: 120 },
    { id: "premium", name: "แพ็คพรีเมียม", cost: 699, crystals: 300 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="shop bg-gradient-to-b from-blue-100 to-pink-200 text-gray-900 rounded-lg shadow-lg p-8 max-h-[550px] overflow-y-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">🏪 ร้านค้าผจญภัย</h2>
      <p className="mb-6 font-medium text-center text-lg">💰 ทองของคุณ: <span className="text-yellow-600 font-bold">{player.gold}</span></p>
  
      {/* สินค้าทั่วไป */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-pink-600">🛒 สินค้า</h3>
        <ul className="space-y-4">
          {shopItems.map(item => (
            <motion.li 
              key={item.id} 
              whileHover={{ scale: 1.05 }} 
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-md"
            >
              <div>
                <span className="font-medium text-lg">{item.name}</span>
                <p className="text-sm text-gray-500">{item.effect}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-yellow-600 font-bold">{item.cost} ทอง</span>
                <button 
                  onClick={() => onPurchase(item)}
                  disabled={player.gold < item.cost}
                  className={`px-4 py-2 rounded-lg text-white font-bold transition-all ${
                    player.gold >= item.cost 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  ซื้อ
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
  
      {/* สกุลเงินพรีเมียม */}
      <div className="mb-10 bg-gradient-to-r from-purple-300 to-pink-400 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-white">💎 สกุลเงินพรีเมียม</h3>
        <ul className="space-y-4">
          {premiumPacks.map(pack => (
            <motion.li 
              key={pack.id} 
              whileHover={{ scale: 1.05 }} 
              className="flex justify-between items-center bg-white p-5 rounded-md shadow-md transition-all"
            >
              <div>
                <span className="font-medium text-lg text-gray-900">{pack.name}</span>
                <p className="text-sm text-indigo-600">{pack.crystals} คริสตัล</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-green-600 font-bold">฿{pack.cost}</span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 3 }} 
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -2, 2, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
                  onClick={() => onBuyPremium(pack.crystals)}
                  className="px-6 py-2 text-white font-bold rounded-lg transition-all bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                >
                  ซื้อเลย!
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
  
      {/* ปุ่มออก */}
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition"
        onClick={onExit}
      >
        🔙 กลับสู่ดันเจี้ยน
      </motion.button>
    </motion.div>
  );
  
  
}
export default ShopInterface;
