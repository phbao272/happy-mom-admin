import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { HOME_PATH } from "@/libs/utils/constants/roles";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect(HOME_PATH?.[session.user.role] || "login");
  } else {
    redirect("/login");
  }
}
