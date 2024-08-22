import { PostForm } from "@/components/features/post/components/PostForm";
import { PostAPIQueryKey } from "@/components/features/post/configs";
import { getDetailPost } from "@/components/features/post/services/get-detail-post";
import { PageWithPrefetchQuery } from "@/components/shared/layouts";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <PageWithPrefetchQuery
      queryFn={getDetailPost(params.id)}
      queryKey={[PostAPIQueryKey.GET_POST, params.id]}
    >
      <PostForm />
    </PageWithPrefetchQuery>
  );
};

export default Page;
