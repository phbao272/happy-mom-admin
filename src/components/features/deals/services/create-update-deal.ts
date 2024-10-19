import { request } from "@/libs/requests";
import { CreateOrUpdateDealBody } from "@/libs/types/deals";

export const CreateOrUpdateDeal = async (
  body: CreateOrUpdateDealBody,
  id: string
) => {
  try {
    const endpointAPI = id === "create" ? "deals" : `deals/${id}`;
    const method = id === "create" ? "post" : "patch";
    const res = await request[method](endpointAPI, body);
    return res.data;
  } catch (err) {
    throw err;
  }
};
