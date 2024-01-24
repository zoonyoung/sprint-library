'use client';

import useSWR from 'swr';

export default function Books() {
  const { data, isLoading } = useSWR('/api/book');
  console.log(data);
  return (
    <div>
      {!isLoading &&
        data.map((book) => (
          <li key={book.title}>
            <img src={book.image} alt={book.title} />
          </li>
        ))}
    </div>
  );
}
