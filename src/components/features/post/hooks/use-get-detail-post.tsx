import { useQuery } from "@tanstack/react-query";
import { PostAPIQueryKey } from "../configs";
import { getDetailPost } from "../services/get-detail-post";

export const useGetDetailPost = (id: string) => {
  return useQuery({
    queryKey: [PostAPIQueryKey.GET_POST, id],
    queryFn: getDetailPost(id),
    enabled: !!id && id !== "create"
  });
};