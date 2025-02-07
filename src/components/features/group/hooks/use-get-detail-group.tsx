import { useQuery } from "@tanstack/react-query";
import { GroupAPIQueryKey } from "../configs";
import { getDetailGroup } from "../services";

export const useGetDetailGroup = (id: string) => {
  return useQuery({
    queryKey: [GroupAPIQueryKey.GET_GROUP, id],
    queryFn: getDetailGroup(id),
    enabled: !!id && id !== "create"
  });
};
