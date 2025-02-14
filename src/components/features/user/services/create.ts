import { request } from "@/libs/requests";
import type { CreateUserSchema } from "../configs/schemas";

export const createOrUpdateUser = async (
  body: CreateUserSchema,
  id: string
) => {
  const endpointAPI = id === "create" ? "users" : `users/${id}`;
  const method = id === "create" ? "post" : "patch";
  const res = await request[method](endpointAPI, body);
  return res.data;
};
