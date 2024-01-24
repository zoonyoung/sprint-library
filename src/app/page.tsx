'use client';
import Books from '@/components/Books';
import useSWR from 'swr';

export default function Home() {
  return (
    <div>
      <Books />
    </div>
  );
}
