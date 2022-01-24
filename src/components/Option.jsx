import React from 'react';

const Option = ({ selected, children, ...props }) => {
  return (
    <>
      <div
        role="option"
        className={` p-4 m-2 text-white ${
          selected
            ? 'dark:bg-blue-600 bg-neutral-600 font-medium'
            : 'dark:bg-blue-900 bg-neutral-400 font-light'
        } rounded-lg cursor-pointer drop-shadow-md`}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default Option;
