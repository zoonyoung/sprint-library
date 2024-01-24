'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from './Avatar';
import { Button } from './Button';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  useEffect(() => {
    setIsAdmin(user?.isAdmin);
  }, [user]);
  return (
    <header className='flex items-center justify-between p-5 w-full'>
      <div>Logo</div>
      <nav className='flex items-center gap-3'>
        {user && <Avatar user={user} />}
        {isAdmin && <p className='text-red-500'>admin</p>}
        {session && <Button onClick={() => signOut()}>LogOut</Button>}
        {!session && <Button onClick={() => signIn()}>LogIn</Button>}
      </nav>
    </header>
  );
}
