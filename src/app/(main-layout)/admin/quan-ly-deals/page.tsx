import { ListPost } from "@/components/features/post/components";
import { PostAPIQueryKey } from "@/components/features/post/configs";
import { getListPost } from "@/components/features/post/services";
import { getQueryClient } from "@/libs/query";
import React from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PostAPIQueryKey.GET_POSTS],
    queryFn: getListPost
  });

  return (
    <div>
      <ListPost />
    </div>
  );
};

export default Page;
