"use client";

import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserAccount } from "./UserAccount";
import { IUser } from "@/libs/types/user";
import { getMe } from "@/libs/service";

export const Auth = () => {
  const { data } = useSuspenseQuery<IUser>({
    queryKey: ["me"],
    queryFn: getMe
    // enabled: JSON.parse(localStorage.getItem("isLogin") || "false"),
  });

  const isLogin = !!data?.username;

  return !isLogin ? <>None</> : <UserAccount user={data} />;
};
