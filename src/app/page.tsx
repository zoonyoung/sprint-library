'use client';
import Cards from '@/components/Cards';
import Image from 'next/image';
import useSWR from 'swr';

export default function Home() {
  const { data, isLoading } = useSWR('/api/book');
  return <div>{!isLoading && <Cards books={data} />}</div>;
}
