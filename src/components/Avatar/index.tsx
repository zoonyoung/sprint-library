import Image from "next/image";
import Head from "next/head";
import styles from "./index.module.scss";

interface Props {
  name: string | undefined | null;
  image: string | undefined | null;
}

const Avatar = ({ name, image }: Props) => {
  return (
    <>
      <Head>
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
      </Head>
      <div className={styles.container}>
        <Image className={styles.image} src={image || ""} alt="avatar" width={60} height={60} priority={true} />
        <span>{name}</span>
      </div>
    </>
  );
};
export default Avatar;
