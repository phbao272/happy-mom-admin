import { request } from "@/libs/requests";

export const getListArticle = async () => {
  const res = await request(`articles`, {
    params: {
      page: 1,
      perPage: 20
    }
  });

  return res.data;
};
