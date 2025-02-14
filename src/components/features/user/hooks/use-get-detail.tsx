import { useQuery } from "@tanstack/react-query";
import { UserAPIQueryKey } from "../configs";
import { getDetailUser } from "../services";

export const useGetDetailUser = (id: string) => {
  return useQuery({
    queryKey: [UserAPIQueryKey.GET_USERS, id],
    queryFn: getDetailUser(id),
    enabled: !!id && id !== "create"
  });
};
