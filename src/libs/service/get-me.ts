import { request } from "../requests";

export const getMe = async () => {
    const res = await request.get("auth/me");
    return res.data;
}