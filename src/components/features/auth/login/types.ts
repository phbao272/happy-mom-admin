import { notEmptyMessage } from "@/libs/utils/messages";
import { z } from "zod";

export const LoginInputSchema = z.object({
  email: z.string().min(1, {
    message: notEmptyMessage("Tên tài khoản"),
  }),

  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  }),
});

export type LoginInputType = z.infer<typeof LoginInputSchema>;
