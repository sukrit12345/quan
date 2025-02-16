import React from 'react';

const InventoryManager = ({ inventory, purchasedItems, onExit }) => {
  const allItems = [...inventory, ...purchasedItems];
  
  return (
<div className="inventory bg-gray-100 rounded-lg shadow-md p-6 max-h-[500px] overflow-y-auto">
  <h2 className="text-2xl font-bold mb-4 text-blue-700">คลังไอเท็มของคุณ</h2>

  {allItems.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {allItems.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-sm">
          <h3 className="font-medium mb-1">{item.name}</h3>
          {item.effect && <p className="text-sm text-gray-600 mb-2">{item.effect}</p>}
          {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}
          {item.type && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              item.type === 'weapon' ? 'bg-red-100 text-red-700' :
              item.type === 'armor' ? 'bg-blue-100 text-blue-700' :
              item.type === 'accessory' ? 'bg-purple-100 text-purple-700' :
              'bg-green-100 text-green-700'
            }`}>
              {item.type === 'weapon' ? 'อาวุธ' :
              item.type === 'armor' ? 'เกราะ' :
              item.type === 'accessory' ? 'เครื่องประดับ' :
              'ไอเท็มพิเศษ'}
            </span>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 italic mb-6">คลังไอเท็มของคุณว่างเปล่า</p>
  )}

  <button 
    className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-md transition"
    onClick={onExit}
  >
    กลับสู่ดันเจี้ยน
  </button>
</div>

  );
};

export default InventoryManager;
