import { ListDeals } from "@/components/features/deals/components";
import { DealsAPIQueryKey } from "@/components/features/deals/configs";
import { getListDeals } from "@/components/features/deals/services";
import { PostAPIQueryKey } from "@/components/features/post/configs";
import { getListPost } from "@/components/features/post/services";
import { getQueryClient } from "@/libs/query";
import React from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [DealsAPIQueryKey.GET_DEALS],
    queryFn: getListDeals
  });

  return (
    <div>
      <ListDeals />
    </div>
  );
};

export default Page;
