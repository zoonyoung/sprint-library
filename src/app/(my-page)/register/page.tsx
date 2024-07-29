"use client";

import { useMemo } from "react";

import { useSession } from "next-auth/react";
import httpClient from "@/utils/httpClient";
import { useFetchData } from "@/hooks/useFetchData";
import { join } from "path";

const RegisterPage = () => {
  const session = useSession();
  const { data: unregistered } = useFetchData({
    endpoint: "/users",
    queryParams: { filter: "unregistered" },
  });
  const { data: registered } = useFetchData({ endpoint: "users", queryParams: { filter: "registered" } });
  return (
    <div>
      <article>{unregistered?.list?.map(item => item.email)}</article>
      <article>{registered?.list?.map(item => item.email)}</article>
    </div>
  );
};

export default RegisterPage;
