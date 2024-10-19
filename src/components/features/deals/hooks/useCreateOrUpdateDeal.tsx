import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DealsAPIQueryKey } from "../configs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateOrUpdateDeal } from "../services/create-update-deal";
import { CreateOrUpdateDealBody } from "@/libs/types/deals";

export const useCreateOrUpdateDeal = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: CreateOrUpdateDealBody) => CreateOrUpdateDeal(body, id),
    onSuccess: () => {
      if (id !== "create") {
        queryClient.invalidateQueries({
          queryKey: [DealsAPIQueryKey.GET_DEAL, id]
        });
      }
      toast.success("thành công!");
      router.push("/admin/quan-ly-deals");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [DealsAPIQueryKey.GET_DEALS]
      });
    }
  });
};
