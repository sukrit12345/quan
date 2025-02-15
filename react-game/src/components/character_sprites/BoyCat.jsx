import React from 'react';
import MaleCat from '../../assets/characters/cat_male.svg';

const BoyCat = ({ width = "100", height = "130", className = '' }) => {
  return (
    <div className={`boy-cat-sprite ${className}`}>
      <img src={MaleCat} alt="Male Cat" width={width} height={height} />
    </div>
  );
};

export default BoyCat;
