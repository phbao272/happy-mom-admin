import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAPIQueryKey } from "../configs";
import { toast } from "sonner";
import { createOrUpdateUser } from "../services/create";
import type { CreateUserSchema } from "../configs/schemas";
import { useRouter } from "next/navigation";

export const useCreateOrUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: CreateUserSchema) => createOrUpdateUser(body, id),
    onSuccess: () => {
      if (id !== "create") {
        queryClient.invalidateQueries({
          queryKey: [UserAPIQueryKey.GET_USERS, id]
        });
      }
      toast.success("thành công!");
      router.push("/admin/quan-ly-nguoi-dung");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [UserAPIQueryKey.GET_USERS]
      });
    }
  });
};
