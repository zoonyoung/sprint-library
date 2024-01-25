'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from './Avatar';
import { Button } from './Button';
import Link from 'next/link';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  useEffect(() => {
    setIsAdmin(user?.isAdmin);
  }, [user]);
  return (
    <header className='flex items-center justify-between p-5 w-full mb-20'>
      <div>Logo</div>
      <nav className='flex items-center gap-3'>
        {user && <Avatar user={user} />}{' '}
        {isAdmin && (
          <Link href='/admin' className='text-red-500'>
            admin
          </Link>
        )}
        {session && <Button onClick={() => signOut()}>로그아웃</Button>}
        {!session && <Button onClick={() => signIn()}>로그인</Button>}
      </nav>
    </header>
  );
}
