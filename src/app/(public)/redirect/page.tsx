import { auth } from "@/auth";
import { HOME_PATH } from "@/libs/utils/constants/roles";
import { redirect } from "next/navigation";

const RedirectPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect(HOME_PATH[session.user.role]);
  }

  return (
    <>
      <h1>Redirecting...</h1>
    </>
  );
};

export default RedirectPage;
