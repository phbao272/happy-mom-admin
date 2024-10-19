import { request } from "@/libs/requests";
import { IGroup } from "@/libs/types";

export const getDetailDeal = (id: string) => async () => {
  const res = await request<IGroup>(`deals/${id}`);
  return res.data;
};
