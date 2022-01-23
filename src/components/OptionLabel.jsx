import React from 'react';

const OptionLabel = ({ children, ...props }) => {
  return (
    <p
      className="text-lg dark:text-neutral-300 text-neutral-700 font-bold mb-2"
      {...props}
    >
      {children}
    </p>
  );
};

export default OptionLabel;
