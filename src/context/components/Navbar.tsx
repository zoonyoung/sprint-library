'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      Navbar<button onClick={() => signIn()}> signIn</button>
    </div>
  );
}
