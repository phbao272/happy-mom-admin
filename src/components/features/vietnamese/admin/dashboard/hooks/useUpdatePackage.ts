import { request } from "@/libs/requests";
import { IPackage } from "@/libs/types/shipment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IPackage[]) => {
      const res = await request.patch(`/packages`, data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
};
