'use client';

import Card from './Card';

export default function Cards({ books }) {
  return (
    <div className='grid grid-cols-3 gap-14'>
      {books.map((book) => (
        <Card key={book.title} book={book} />
      ))}
    </div>
  );
}
