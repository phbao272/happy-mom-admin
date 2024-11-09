import { ListNotifications } from "@/components/features/notification/components";
import { getListNotifications } from "@/components/features/notification/services/get-list-notifications";
import { getQueryClient } from "@/libs/query";
import React from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notifications"],
    queryFn: getListNotifications
  });

  return (
    <div>
      <ListNotifications />
    </div>
  );
};

export default Page;
