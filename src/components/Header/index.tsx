"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import styles from "./index.module.scss";
import Avatar from "../Avatar";

interface Props {
  session: Session | null;
}

const Header = ({ session }: Props) => {
  const user = session?.user;
  return (
    <header className={styles.container}>
      <p className={styles.logo}>Sprint Library</p>
      {user ? (
        <Link href="/info">
          <Avatar image={user.image} name={user.name} /> <button onClick={() => signOut()}>out</button>
        </Link>
      ) : (
        <button onClick={() => signIn()}>in</button>
      )}
    </header>
  );
};

export default Header;
