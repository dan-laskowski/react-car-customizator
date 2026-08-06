import { JSX, HTMLAttributes, ReactNode } from 'react';

interface OptionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const OptionLabel = ({ children, ...props }: OptionLabelProps): JSX.Element => {
  return (
    <p
      role="heading"
      className="text-lg dark:text-neutral-300 text-neutral-700 font-bold mb-2"
      {...props}
    >
      {children}
    </p>
  );
};

export default OptionLabel;
