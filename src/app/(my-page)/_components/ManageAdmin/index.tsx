import { FaCircle } from "react-icons/fa";

import styles from "./index.module.scss";
import { useState, useEffect } from "react";

const ManageAdmin = ({ adminList }) => {
  const [unregisteredAdminList, setUnregisteredAdminList] = useState();
  const [registeredAdminList, setRegisteredAdminList] = useState();

  useEffect(() => {
    if (adminList) {
      const registered = [];
      const unregistered = [];
      adminList.list.forEach(admin => {
        if (admin.isAdmin) {
          registered.push(admin);
        } else {
          unregistered.push(admin);
        }
      });
      setRegisteredAdminList(registered);
      setUnregisteredAdminList(unregistered);
    }
  }, [adminList]);

  return (
    <div className={styles.contentBox}>
      <div className={styles.content}>
        {/* course: admin, isAdmin:false */}
        <h2 className={styles.title}>
          <FaCircle className={styles.circle} />
          관리자 승인
        </h2>
        <div className={styles.adminBox}>
          <p>이름, 이메일, 가입일</p>
          {unregisteredAdminList?.map(user => (
            <div key={user.id}>
              {user.name} {user.email} {user.createdAt}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        {/* isAdmin:true */}
        <h2 className={styles.title}>
          <FaCircle className={styles.circle} />
          관리자 목록
        </h2>
        <div className={styles.adminBox}>
          {registeredAdminList?.map(user => (
            <div key={user.id}>
              {user.name} {user.email} {user.createdAt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
