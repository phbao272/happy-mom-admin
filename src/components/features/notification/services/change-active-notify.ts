import { request } from "@/libs/requests";

export const changeActiveNotify = async (id: string) => {
  try {
    const res = await request.patch(
      `management-notifications/${id}/toggle-status`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
