import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArticleAPIQueryKey } from "../configs";
import { toast } from "sonner";
import { createOrUpdateArticle } from "../services/create-article";
import { CreateOrUpdateArticleBody } from "@/libs/types";
import { useRouter } from "next/navigation";

export const useCreateOrUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: CreateOrUpdateArticleBody) =>
      createOrUpdateArticle(body, id),
    onSuccess: () => {
      if (id !== "create") {
        queryClient.invalidateQueries({
          queryKey: [ArticleAPIQueryKey.GET_ARTICLE, id]
        });
      }
      toast.success("thành công!");
      router.push("/admin/quan-ly-bai-viet");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ArticleAPIQueryKey.GET_ARTICLES]
      });
    }
  });
};
