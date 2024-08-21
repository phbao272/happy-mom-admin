import { LayoutWithNavbar } from "@/components/shared/layouts";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/libs/query";
import { getMe } from "@/libs/service";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const sessions = await auth();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["me"],
    queryFn: getMe
  });

  if (!sessions) {
    redirect("/login");
  }

  console.log("sessions", sessions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutWithNavbar role={sessions?.user?.role}>
        {children}
      </LayoutWithNavbar>
    </HydrationBoundary>
  );
};

export default MainLayout;
