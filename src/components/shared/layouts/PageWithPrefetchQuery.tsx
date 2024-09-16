import { getQueryClient } from "@/libs/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface Props {
  queryKey: string[];
  queryFn: () => Promise<any>;
}

export const PageWithPrefetchQuery = async ({
  queryKey,
  queryFn,
  children
}: React.PropsWithChildren<Props>) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
