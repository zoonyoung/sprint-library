import { FaCircle } from "react-icons/fa";

import styles from "./page.module.scss";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const UserManagePage = () => {
  const { data: session } = useSession();
  const isAdmin = true;

  const { data: userList, isLoading: adminDataLoading } = useQuery({
    queryKey: ["/users", { filter: "unregistered" }],
    queryFn: ({ queryKey }) => {
      const [endpoint, params] = queryKey;
      return getUser(endpoint, params, session?.accessToken || "");
    },
    enabled: isAdmin,
  });

  return (
    <div>
      <h2 className={styles.title}>
        <FaCircle className={styles.circle} />
        유저 승인
      </h2>
      <h2 className={styles.title}>
        <FaCircle className={styles.circle} />
        유저 관리
      </h2>
    </div>
  );
};

export default UserManagePage;
