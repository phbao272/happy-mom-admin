import { request } from "@/libs/requests";
import { CreateOrUpdateGroupBody } from "@/libs/types/group";

export const CreateOrUpdateGroup = async (
  body: CreateOrUpdateGroupBody,
  id: string
) => {
  try {
    const endpointAPI = id === "create" ? "groups" : `groups/${id}`;
    const method = id === "create" ? "post" : "patch";
    const res = await request[method](endpointAPI, body);
    return res.data;
  } catch (err) {
    throw err;
  }
};
