import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupAPIQueryKey } from "../configs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateOrUpdateGroupBody } from "@/libs/types/group";
import { CreateOrUpdateGroup } from "../services/create-update-group";

export const useCreateOrUpdateGroup = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: CreateOrUpdateGroupBody) =>
      CreateOrUpdateGroup(body, id),
    onSuccess: () => {
      if (id !== "create") {
        queryClient.invalidateQueries({
          queryKey: [GroupAPIQueryKey.GET_GROUP, id]
        });
      }
      toast.success("thành công!");
      router.push("/admin/quan-ly-group");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GroupAPIQueryKey.GET_GROUPS]
      });
    }
  });
};
