import { request } from "@/libs/requests";

export const getListUser = async () => {
  const res = await request("users", {
    params: {
      page: 1,
      perPage: 20
    }
  });

  return res.data;
};
