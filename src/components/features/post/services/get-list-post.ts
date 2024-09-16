import { request } from "@/libs/requests";

export const getListPost = async () => {
  const res = await request(`posts`, {
    params: {
      page: 1,
      perPage: 20
    }
  });

  return res.data;
};
