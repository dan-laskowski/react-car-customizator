import React from 'react';

const ColorSwatch = ({ color, selected, ...props }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={` m-2 ${
        selected ? 'w-20 h-20' : 'w-14 h-14'
      } rounded-lg cursor-pointer drop-shadow-md`}
      {...props}
    />
  );
};

export default ColorSwatch;
