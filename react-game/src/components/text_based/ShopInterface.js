import React from 'react';

const ShopInterface = ({ player, onPurchase, onExit, onBuyPremium }) => {
  const shopItems = [
    { id: 1, name: "โพชั่นฟื้นพลัง", cost: 20, effect: "ฟื้นฟูพลังชีวิต 30 หน่วย", type: "consumable" },
    { id: 2, name: "ดาบขั้นสูง", cost: 100, effect: "+5 พลังโจมตี", type: "weapon" },
    { id: 3, name: "โล่ป้องกัน", cost: 80, effect: "+3 พลังป้องกัน", type: "armor" },
    { id: 4, name: "เครื่องรางนำโชค", cost: 150, effect: "+5% โอกาสคริติคอล", type: "accessory" },
  ];

  const premiumPacks = [
    { id: "basic", name: "แพ็คพื้นฐาน", cost: 4.99, crystals: 50 },
    { id: "advanced", name: "แพ็คขั้นสูง", cost: 9.99, crystals: 120 },
    { id: "premium", name: "แพ็คพรีเมียม", cost: 19.99, crystals: 300 },
  ];

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">ร้านค้าผจญภัย</h2>
      <p className="mb-6 font-medium">ทองของคุณ: {player.gold}</p>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">สินค้า</h3>
        <ul className="space-y-3">
          {shopItems.map(item => (
            <li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
              <div>
                <span className="font-medium">{item.name}</span>
                <p className="text-sm text-gray-600">{item.effect}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-amber-600 font-bold">{item.cost} ทอง</span>
                <button 
                  onClick={() => onPurchase(item)}
                  disabled={player.gold < item.cost}
                  className={`px-4 py-2 rounded ${
                    player.gold >= item.cost 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  } transition`}
                >
                  ซื้อ
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 bg-indigo-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-indigo-800">สกุลเงินพรีเมียม</h3>
        <ul className="space-y-3">
          {premiumPacks.map(pack => (
            <li key={pack.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
              <div>
                <span className="font-medium">{pack.name}</span>
                <p className="text-sm text-indigo-600">{pack.crystals} คริสตัล</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-green-600 font-bold">${pack.cost}</span>
                <button 
                  onClick={() => onBuyPremium(pack.crystals)}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition"
                >
                  ซื้อ
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button 
        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition"
        onClick={onExit}
      >
        กลับสู่ดันเจี้ยน
      </button>
    </div>
  );
};

export default ShopInterface;
