import { useQuery } from "@tanstack/react-query";
import { getSubCategoryOption } from "../services";
import { CategoryResponse } from "@/libs/types/category";

export type GetSubCategoryOptionsParamType = {
  categoryId?: string;
};

export const useGetSubCategoryOption = ({
  categoryId
}: GetSubCategoryOptionsParamType) => {
  const query = useQuery<CategoryResponse>({
    queryKey: ["OPTION_SUB_CATEGORY", categoryId],
    queryFn: () => getSubCategoryOption(categoryId as string),
    enabled: !!categoryId
  });

  const options =
    query?.data?.map((item) => {
      return { label: item.name, value: item.id };
    }) ?? [];

  return { ...query, data: options };
};
