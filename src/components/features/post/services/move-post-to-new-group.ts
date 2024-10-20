import { request } from "@/libs/requests";
import { UpdatePostGroupBody } from "@/libs/types";

export const movePostToNewGroup = async (
  body: UpdatePostGroupBody,
  id: string
) => {
  try {
    const res = await request.post(`posts/${id}/move-group`, body);
    return res.data;
  } catch (err) {
    throw err;
  }
};
