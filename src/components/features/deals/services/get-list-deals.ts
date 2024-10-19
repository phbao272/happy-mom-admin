import { request } from "@/libs/requests";

export const getListDeals = async () => {
  const res = await request(`deals`, {
    params: {
      page: 1,
      perPage: 20
    }
  });

  return res.data;
};
