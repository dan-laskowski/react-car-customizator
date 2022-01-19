import React from 'react';

const Option = ({ selected, children, ...props }) => {
  return (
    <>
      <div
        className={`border p-4 m-2 text-white ${
          selected ? 'bg-neutral-600 font-medium' : 'bg-neutral-400 font-light'
        } rounded-lg cursor-pointer drop-shadow-md`}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default Option;
