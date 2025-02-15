import React, { useState } from 'react';
import BoyCat from '../character_sprites/BoyCat';
import GirlCat from '../character_sprites/GirlCat';

const CharacterCreation = ({ onCreateCharacter }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('man');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateCharacter(name, gender);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">สร้างตัวละคร</h2>

      <div className="flex flex-col sm:flex-row items-center mb-6">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0 flex justify-center">
          {gender === 'man' ? (
            <BoyCat width="100" height="130" className="character-display" />
          ) : (
            <GirlCat width="100" height="130" className="character-display" />
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full sm:w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ชื่อตัวละคร</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="ใส่ชื่อตัวละคร"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">เพศ</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={gender === 'man'}
                  onChange={() => setGender('man')}
                  className="mr-2"
                />
                ชาย
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={gender === 'woman'}
                  onChange={() => setGender('woman')}
                  className="mr-2"
                />
                หญิง
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            เริ่มการผจญภัย
          </button>
        </form>
      </div>
    </div>
  );
};

export default CharacterCreation;