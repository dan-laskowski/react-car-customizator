import { JSX, HTMLAttributes } from 'react';

interface ColorSwatchProps extends HTMLAttributes<HTMLDivElement> {
  color: string;
  selected: boolean;
}

const ColorSwatch = ({
  color,
  selected,
  ...props
}: ColorSwatchProps): JSX.Element => {
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
