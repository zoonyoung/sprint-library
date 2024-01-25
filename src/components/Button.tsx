import React from 'react';

export const Button = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <div className='p-1 bg-purple-600 rounded-lg hover:shadow-xl hover:scale-95'>
      <button
        className='bg-purple-600 p-2 hover:bg-purple-500 rounded-lg text-white'
        onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
