"use client";

import Test from "@/components/Test/Test";
import { SessionProvider, signIn, signOut } from "next-auth/react";
export default function Home() {
  // try {
  //   const response = await fetch('http://localhost:3000/api/users/me', {
  //     cache: 'no-store'
  //   }).then(res => res.json());
  //   console.log(response);
  // } catch (e) {
  //   console.log(e);
  // }
  //
  // try {
  //   const postResponse = await fetch('http://localhost:3000/api/auth/siginIn', {
  //     method: 'POST',
  //     cache: 'no-store',
  //     headers: {
  //       Authorization: 'asdfadsf'
  //     }
  //   }).then(res => res.json());
  // } catch (e) {
  //   console.log(e);
  // }
  //
  const handleTest = async () => {
    const response = await fetch("http://localhost:3000/api/auth/signIn").then((res) => res.json);
    console.log(response);
  };
  return (
    <SessionProvider>
      <div>
        <button type='button' onClick={() => signIn()}>
          signIn
        </button>
        <p></p>
        <button type='button' onClick={() => signOut()}>
          logOut
        </button>
        <button type='button' onClick={handleTest}>
          test
        </button>
        <Test />
      </div>
    </SessionProvider>
  );
}
