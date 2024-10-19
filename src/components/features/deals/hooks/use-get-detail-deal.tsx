import { useQuery } from "@tanstack/react-query";
import { DealsAPIQueryKey } from "../configs";
import { getDetailDeal } from "../services";

export const useGetDetailDeal = (id: string) => {
  return useQuery({
    queryKey: [DealsAPIQueryKey.GET_DEAL, id],
    queryFn: getDetailDeal(id)
  });
};
