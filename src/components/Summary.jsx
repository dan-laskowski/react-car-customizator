import React from 'react';
import { useSelector } from 'react-redux';

const Summary = () => {
  const { value } = useSelector((state) => state.config);

  return (
    <div>
      <h1>SUMMARY: </h1>
      <p>MODEL: {value.model}</p>
      <p>ENGINE: {value.engine}</p>
      <p>GEARBOX: {value.gearbox}</p>
    </div>
  );
};

export default Summary;
