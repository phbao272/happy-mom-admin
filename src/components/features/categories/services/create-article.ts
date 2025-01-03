import { request } from "@/libs/requests";
import { CreateOrUpdateArticleBody } from "@/libs/types";

export const createOrUpdateArticle = async (
  body: CreateOrUpdateArticleBody,
  id: string
) => {
  try {
    const endpointAPI = id === "create" ? "articles" : `articles/${id}`;
    const method = id === "create" ? "post" : "patch";
    const res = await request[method](endpointAPI, body);
    return res.data;
  } catch (err) {
    throw err;
  }
};
