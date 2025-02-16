import React from 'react';
import FemaleCat from '../../assets/characters/cat_female.svg';

const GirlCat = ({ width = "100", height = "130", className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img src={FemaleCat} alt="Female Cat" width={width} height={height} />
    </div>
  );
};

export default GirlCat;
