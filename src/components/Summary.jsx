import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'external-svg-loader';
const Summary = () => {
  // initialize useRef hook to get reference to car model image (svg)
  const carEl = useRef(null);

  // initialize useSelector hook to get access to data from redux store
  const { value } = useSelector((state) => state.config);

  // create stylesheet and rule to dynamically change car's body color
  const sheet = document.createElement('style');
  sheet.innerHTML = `.body {fill: ${value.color.value}}`;
  document.body.appendChild(sheet);

  return (
    <div>
      <h1>SUMMARY: </h1>
      {value.model && value.color.value && (
        <svg
          ref={carEl}
          style={{
            fill: value.color.value,
          }}
          data-src={`/assets/${value.model}.svg`}
        />
      )}
      <p>MODEL: {value.model}</p>
      <p>ENGINE: {value.engine.name}</p>
      <p>GEARBOX: {value.gearbox.name}</p>
      <p>COLOR: {value.color.name} </p>
      <br />
      <p>
        PRICE: ${value.engine.price + value.gearbox.price + value.color.price}
      </p>
    </div>
  );
};

export default Summary;
