import { Open_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import Header from "@/components/Header";
import "@/styles/_globals.scss";
import "@/styles/_reset.scss";
import QueryProvider from "@/utils/QueryProvider";

import { auth } from "./auth";
import styles from "./layout.module.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
}

const openSans = Open_Sans({ subsets: ["latin"] });

const RootLayout = async ({ children }: Props) => {
  const session = await auth();
  return (
    <html>
      <body className={openSans.className}>
        <SessionProvider session={session}>
          <QueryProvider>
            <Header session={session} />
            <main className={styles.main}>{children}</main>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
