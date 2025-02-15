import React from 'react';

const GameOver = ({ score, roomsCleared, onRestart }) => {
  return (
    <div className="bg-red-50 rounded-lg shadow-md p-6 md:p-8 text-center max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-700">เกมโอเวอร์</h2>
      
      <div className="bg-white rounded-md p-4 md:p-6 mb-6 shadow-sm">
        <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">สรุปการผจญภัยของคุณ</h3>
        <p className="text-base md:text-lg mb-2">คะแนนสุดท้าย: <span className="font-bold text-purple-700">{score}</span></p>
        <p className="text-base md:text-lg">ห้องที่เคลียร์: <span className="font-bold text-blue-700">{roomsCleared}</span></p>
      </div>
      
      <div className="bg-white rounded-md p-4 md:p-6 mb-8 shadow-sm">
        <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">รางวัลที่ได้รับ</h3>
        {roomsCleared >= 10 && (
          <p className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-left text-yellow-700 mb-2 text-sm md:text-base">
            <span className="font-bold">นักสำรวจผู้กล้าหาญ</span> - เคลียร์ 10+ ห้อง
          </p>
        )}
        {score >= 1000 && (
          <p className="bg-green-50 border-l-4 border-green-400 p-3 text-left text-green-700 mb-2 text-sm md:text-base">
            <span className="font-bold">นักล่าสมบัติ</span> - ทำคะแนนได้ 1000+ คะแนน
          </p>
        )}
        {roomsCleared < 10 && score < 1000 && (
          <p className="text-gray-500 italic text-sm md:text-base">คุณไม่ได้รับรางวัลใด ๆ ในรอบนี้</p>
        )}
      </div>
      
      <button 
        className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition text-lg"
        onClick={onRestart}
      >
        เริ่มการผจญภัยใหม่
      </button>
    </div>
  );
};

export default GameOver;
