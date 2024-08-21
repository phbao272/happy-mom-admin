import React from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { auth } from "@/auth";

interface Props {
  children: React.ReactNode;
}

const SessionProvider = async ({ children }: Props) => {
  const session = await auth();

  return (
    <NextAuthSessionProvider basePath="/api/auth" session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
