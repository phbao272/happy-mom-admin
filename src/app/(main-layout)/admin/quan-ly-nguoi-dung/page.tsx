import { ListUser } from "@/components/features/user/components/ListUser";
import { UserAPIQueryKey } from "@/components/features/user/configs";
import { getListUser } from "@/components/features/user/services";
import { getQueryClient } from "@/libs/query";
import React from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [UserAPIQueryKey.GET_USERS],
    queryFn: getListUser
  });

  return (
    <div>
      <ListUser />
    </div>
  );
};

export default Page;
