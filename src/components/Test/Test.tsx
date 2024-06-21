'use client';

import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Test() {
  const session = useSession();
  console.log(session);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:3000/api/test');
      console.log(result);
    };
    fetchData();
  }, []);
  return <div>Test</div>;
}
