import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeActiveNotify } from "../services";

export const useChangeActiveNotify = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { id: string }) => changeActiveNotify(body.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"]
      });
    }
  });
};
