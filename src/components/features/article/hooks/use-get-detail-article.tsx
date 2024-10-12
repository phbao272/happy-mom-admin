import { useQuery } from "@tanstack/react-query";
import { ArticleAPIQueryKey } from "../configs";
import { getDetailArticle } from "../services";

export const useGetDetailArticle = (id: string) => {
  return useQuery({
    queryKey: [ArticleAPIQueryKey.GET_ARTICLE, id],
    queryFn: getDetailArticle(id)
  });
};
