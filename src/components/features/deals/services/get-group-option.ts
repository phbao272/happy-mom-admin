import { request } from "@/libs/requests";

export const getGroupOption = async () => {
  const res = await request(`groups/options`);

  return res.data;
};
