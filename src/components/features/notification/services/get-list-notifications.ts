import { request } from "@/libs/requests";

export const getListNotifications = async () => {
  const res = await request(`management-notifications`, {
    params: {
      page: 1,
      perPage: 20
    }
  });

  return res.data;
};
