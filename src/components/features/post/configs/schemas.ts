import { fieldRequiredMessage, notEmptyMessage } from "@/libs/utils/messages";
import { z } from "zod";

export const createPostSchema = z
  .object({
    groupId: z.string().min(1, { message: "vui lòng chọn 1 nhóm" }),
    content: z.string().optional(),
    images: z.array(z.string()).optional()
  })
  .superRefine((data, ctx) => {
    if (!data.content && !data.images) {
      if (!data.content) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: fieldRequiredMessage(),
          path: ["content"]
        });
      }

      if (!data.images) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: fieldRequiredMessage(),
          path: ["images"]
        });
      }
    }
  });

export type CreatePostSchema = z.infer<typeof createPostSchema>;
