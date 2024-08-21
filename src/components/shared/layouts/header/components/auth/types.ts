import { notEmptyMessage } from "@/libs/utils/messages";
import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    current_password: z
      .string()
      .trim()
      .min(1, {
        message: notEmptyMessage("Mật khẩu hiện tại"),
      }),
    new_password: z.string().trim().min(6, {
      message: "Mật khẩu ít nhất 6 ký tự",
    }),
    confirm_password: z.string().trim().min(6, {
      message: "Mật khẩu ít nhất 6 ký tự",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.confirm_password !== data.new_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirm_password"],
      });
    }
  });

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
