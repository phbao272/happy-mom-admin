import { ListArticle } from "@/components/features/article/components/ListArticle";
import { ArticleAPIQueryKey } from "@/components/features/article/configs";
import { getListArticle } from "@/components/features/article/services";
import { getQueryClient } from "@/libs/query";
import React from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ArticleAPIQueryKey.GET_ARTICLES],
    queryFn: getListArticle
  });

  return (
    <div>
      <ListArticle />
    </div>
  );
};

export default Page;
