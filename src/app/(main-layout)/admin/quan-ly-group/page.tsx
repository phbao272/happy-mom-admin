import { ListGroup } from "@/components/features/group/components";
import { GroupAPIQueryKey } from "@/components/features/group/configs";
import { getListGroup } from "@/components/features/group/services";
import { getQueryClient } from "@/libs/query";
import React from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [GroupAPIQueryKey.GET_GROUPS],
    queryFn: getListGroup
  });

  return (
    <div>
      <ListGroup />
    </div>
  );
};

export default Page;
