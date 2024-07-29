"use client";

import NavBar from "./_components/NavBar";
import styles from "./layout.module.scss";
import { auth } from "@/app/auth";

interface Props {
  children: React.ReactNode;
}
const MyPageLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <NavBar />
      <article className={styles.contentBox}>{children}</article>
    </div>
  );
};

export default MyPageLayout;
