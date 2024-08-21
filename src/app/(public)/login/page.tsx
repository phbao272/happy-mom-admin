import { Login } from "@/components/features/auth";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const sessions = await auth();

  if (sessions) {
    redirect("/redirect");
  }

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
