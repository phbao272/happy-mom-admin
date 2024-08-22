import { useQuery } from "@tanstack/react-query";
import { getGroupOption } from "../services";
import { IOption } from "@/libs/types";

export const useGetGroupOption = () => {
  return useQuery<IOption[]>({
    queryKey: ["OPTION_GROUP"],
    queryFn: getGroupOption
  });
};
