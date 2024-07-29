"use client";

import Image from "next/image";

import { DEFAULT_PROFILE_ICON } from "@/constants";

import styles from "./index.module.scss";

interface Props {
  name: string | undefined | null;
  image: string | undefined | null;
}

const Avatar = ({ name, image }: Props) => {
  return (
    <div className={styles.container}>
      <Image
        alt="avatar"
        className={styles.image}
        height={60}
        priority={true}
        src={image || DEFAULT_PROFILE_ICON}
        width={60}
      />
      <span>{name}</span>
    </div>
  );
};
export default Avatar;
