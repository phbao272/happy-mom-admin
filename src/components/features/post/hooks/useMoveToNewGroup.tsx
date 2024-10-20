import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostAPIQueryKey } from "../configs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { movePostToNewGroup } from "../services/move-post-to-new-group";
import { UpdatePostGroupBody } from "@/libs/types";

export const useMovePostToNewGroup = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: UpdatePostGroupBody) => movePostToNewGroup(body, id),
    onSuccess: () => {
      if (id !== "create") {
        queryClient.invalidateQueries({
          queryKey: [PostAPIQueryKey.GET_POST, id]
        });
      }
      toast.success("thành công!");
      router.push("/admin/quan-ly-bai-viet-group");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PostAPIQueryKey.GET_POSTS]
      });
    }
  });
};
