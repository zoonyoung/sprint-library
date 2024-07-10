import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import "@/styles/_globals.scss";
import "@/styles/_reset.scss";
import { auth } from "./auth";
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
        <Header session={session} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
