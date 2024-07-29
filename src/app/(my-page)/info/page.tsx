"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";

import ManageAdmin from "@/app/(my-page)/_components/ManageAdmin";
import httpClient from "@/utils/httpClient";

import styles from "./page.module.scss";

const getUser = (endpoint, params, accessToken) => {
  return httpClient.get(endpoint, params, { headers: { Authorization: `Bearer ${accessToken}` } });
};

const InfoPage = () => {
  const { data: session } = useSession();
  // const isAdmin = !!session?.user.isAdmin;
  const isAdmin = true;

  const { data: user, isLoading: userDataLoading } = useQuery({
    queryKey: ["/user/me"],
    queryFn: () => getUser("/users/me", {}, session?.accessToken || ""),
  });

  const { data: adminList, isLoading: adminDataLoading } = useQuery({
    queryKey: ["/users", { filter: "admins" }],
    queryFn: ({ queryKey }) => {
      const [endpoint, params] = queryKey;
      return getUser(endpoint, params, session?.accessToken || "");
    },
    enabled: isAdmin,
  });

  if (userDataLoading) return null;
  return (
    <div className={styles.container}>
      <div className={styles.avatarBox}>
        <Image className={styles.avatarImage} src={user.image} alt="user" width={100} height={100} />
        <div className={styles.avatarDescription}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
      {isAdmin && <ManageAdmin adminList={adminList} />}
    </div>
  );
};

export default InfoPage;
