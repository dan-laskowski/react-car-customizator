import { JSX } from 'react';

interface StatusScreenProps {
  variant: 'error' | 'loading';
  text: string;
}

const StatusScreen = ({ variant, text }: StatusScreenProps): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 font-outfit">
      {variant === 'error' ? (
        <p className="text-2xl font-bold text-red-500">Something went wrong</p>
      ) : (
        <div className="w-12 h-12 rounded-full border-4 border-neutral-300 dark:border-neutral-700 border-t-blue-600 animate-spin" />
      )}
      <p className="text-neutral-600 dark:text-neutral-400">{text}</p>
    </div>
  );
};

export default StatusScreen;
