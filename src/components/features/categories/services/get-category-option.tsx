import { request } from "@/libs/requests";

export const getCategoryOption = async () => {
  const res = await request(`categories`);

  return res.data;
};
