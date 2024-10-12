import { request } from "@/libs/requests";

export const getSubCategoryOption = async (categoryId: string) => {
  const res = await request(`categories/${categoryId}/sub-categories`);

  return res.data;
};
