import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Card({ book }) {
  const { title, quantity, rent, image } = book;
  return (
    <div className=''>
      <Image
        className='h-64 w-48 shadow-lg p-[0.5rem] border-2 hover:border-purple-800 rounded-xl hover:opacity-60'
        src={book.image}
        alt={book.title}
        height={200}
        width={200}
      />
      <h2>{book.title}</h2>
    </div>
  );
}
