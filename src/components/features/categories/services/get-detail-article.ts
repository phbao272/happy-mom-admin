import { request } from "@/libs/requests";
import { IArticle, IPost } from "@/libs/types";

export const getDetailArticle = (id: string) => async () => {
  const res = await request<IArticle>(`articles/${id}`);
  return res.data;
};
