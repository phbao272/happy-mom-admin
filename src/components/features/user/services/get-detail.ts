import { request } from "@/libs/requests";
import type { IUser } from "@/libs/types";

export const getDetailUser = (id: string) => async () => {
  const res = await request<IUser>(`users/${id}`);
  return res.data;
};
