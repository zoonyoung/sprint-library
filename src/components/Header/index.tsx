"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Avatar from "../Avatar";
import styles from "./index.module.scss";

interface Props {
  session: Session | null;
}

const Header = ({ session }: Props) => {
  const user = session?.user;
  return (
    <header className={styles.container}>
      <p className={styles.logo}>Sprint Library</p>
      {user ? (
        <div className={styles.avatarBox}>
          <Avatar name={user.name} image={user.image} /> <button onClick={() => signOut()}>out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>in</button>
      )}
    </header>
  );
};

export default Header;
