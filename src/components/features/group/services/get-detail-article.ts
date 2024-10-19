import { request } from "@/libs/requests";
import { IGroup } from "@/libs/types";

export const getDetailGroup = (id: string) => async () => {
  const res = await request<IGroup>(`groups/${id}`);
  return res.data;
};
