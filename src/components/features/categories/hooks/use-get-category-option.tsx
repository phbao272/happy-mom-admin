import { useQuery } from "@tanstack/react-query";
import { getCategoryOption } from "../services";
import { CategoryResponse } from "@/libs/types/category";

export const useGetCategoryOption = () => {
  const query = useQuery<CategoryResponse>({
    queryKey: ["OPTION_CATEGORY"],
    queryFn: getCategoryOption
  });

  const options =
    query?.data?.map((item) => {
      return { label: item.name, value: item.id };
    }) ?? [];

  return { ...query, data: options };
};
