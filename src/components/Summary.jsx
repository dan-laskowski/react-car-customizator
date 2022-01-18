import React from 'react';
import { useSelector } from 'react-redux';
import 'external-svg-loader';

const Summary = () => {
  // initialize useSelector hook to get access to data from redux store
  const { value } = useSelector((state) => state.config);

  // create stylesheet and rule to dynamically change car's body color
  const sheet = document.createElement('style');
  sheet.innerHTML = `.body {fill: ${value.color.value}}`;
  document.body.appendChild(sheet);

  return (
    <div className="m-auto w-5/6 sm:w-4/6 md:w-4/5">
      {value.model && value.color.value && (
        <>
          <svg
            className=" w-3/4 m-auto sm:w-full h-1/2 my-12 md:h-24 lg:h-40 2xl:h-60"
            data-src={`/assets/${value.model}.svg`}
          />
          <h1 className="text-3xl lg:text-6xl text-gray-800 font-outfit font-bold text-center">
            Your {value.model}
          </h1>
        </>
      )}
      <div className="mt-8 md:mb-0 mb-2 font-bold text-lg text-neutral-600 text-center flex justify-around">
        <div>
          <h2 className="text-xs md:text-sm text-xl">Engine </h2>
          <p className="text-base md:text-lg font-medium">
            {value.engine.name}
          </p>
        </div>
        <div>
          <h2 className="text-xs md:text-sm text-xl">Gearbox </h2>
          <p className="text-base md:text-lg font-medium">
            {value.gearbox.name}
          </p>
        </div>
        <div>
          <h2 className="text-xs md:text-sm text-xl">Color </h2>
          <p className="text-base md:text-lg font-medium">{value.color.name}</p>
        </div>
      </div>
      <div>
        <h1 className="text-xl mb-4 md:text-2xl lg:text-4xl font-bold text-neutral-600 text-center md:mt-20">
          TOTAL ${value.engine.price + value.gearbox.price + value.color.price}
        </h1>
      </div>
    </div>
  );
};

export default Summary;
