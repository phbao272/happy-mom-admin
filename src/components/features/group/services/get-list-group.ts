import { request } from "@/libs/requests";

export const getListGroup = async () => {
  const res = await request(`groups`, {
    params: {
      page: 1,
      perPage: 20
    }
  });

  return res.data;
};
