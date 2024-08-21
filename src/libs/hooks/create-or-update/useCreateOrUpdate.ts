import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { request } from "@libs/requests";
import { handleError } from "@/libs/utils/messages";

interface Props {
  queryKey: string;
  endpointAPI: string;
  id?: number;
}

export const useCreateOrUpdate = ({ endpointAPI, queryKey, id }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: any) => {
      const isEdit = !!id;

      if (!isEdit) {
        const res = await request(`${endpointAPI}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: item,
        });
        return res.data;
      }

      const res = await request(`${endpointAPI}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        data: item,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thành công");

      router.back();
    },
    onError: (error: any) => {
      handleError(error);
      throw new Error(error.response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};
