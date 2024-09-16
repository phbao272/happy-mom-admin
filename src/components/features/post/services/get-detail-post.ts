import { request } from "@/libs/requests";
import { IPost } from "@/libs/types";

export const getDetailPost = (id: string) => async () => {
  const res = await request<IPost>(`posts/${id}`);
  return res.data;
};
