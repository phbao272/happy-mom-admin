import { ArticleForm } from "@/components/features/article/components/ArticleForm";
import { ArticleAPIQueryKey } from "@/components/features/article/configs";
import { getDetailArticle } from "@/components/features/article/services";
import { PageWithPrefetchQuery } from "@/components/shared/layouts";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <PageWithPrefetchQuery
      queryFn={getDetailArticle(params.id)}
      queryKey={[ArticleAPIQueryKey.GET_ARTICLE, params.id]}
    >
      <ArticleForm />
    </PageWithPrefetchQuery>
  );
};

export default Page;
