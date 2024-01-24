import React from 'react';

export const Button = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <div className='p-1 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400'>
      <button className='bg-white p-2 hover:opacity-80' onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
