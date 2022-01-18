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
      {value.model && value.color.value && (
        <>
          <svg
            className="w-full h-60 mx-4 my-12"
            ref={carEl}
            style={{
              fill: value.color.value,
            }}
            data-src={`/assets/${value.model}.svg`}
          />
          <h1 className=" mb-8 text-6xl text-gray-800 font-outfit font-bold text-center">
            Your {value.model}
          </h1>
        </>
      )}
      <div className="mb-2 font-bold text-lg text-neutral-600 text-center flex justify-around">
        <div>
          <h2 className="text-xl">Engine </h2>
          <p className="font-medium">{value.engine.name}</p>
        </div>
        <div>
          <h2 className="text-xl">Gearbox </h2>
          <p className="font-medium">{value.gearbox.name}</p>
        </div>
        <div>
          <h2 className="text-xl">Color </h2>
          <p className="font-medium">{value.color.name}</p>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-neutral-600 text-center mt-20">
          TOTAL ${value.engine.price + value.gearbox.price + value.color.price}
        </h1>
      </div>
    </div>
  );
};

export default Summary;
