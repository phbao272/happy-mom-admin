import {
  requiredErr,
  selectErr,
  stringMaxErr,
  stringMinErr,
  urlError
} from "@/libs/utils/constants/errorMessage";
import { fieldRequiredMessage, notEmptyMessage } from "@/libs/utils/messages";
import { z } from "zod";

const stringSchema = z
  .string({
    required_error: requiredErr()
  })
  .min(1, {
    message: stringMinErr(1)
  })
  .max(5000, {
    message: stringMaxErr(5000)
  });

const selectSchema = z
  .string({
    required_error: requiredErr()
  })
  .min(1, {
    message: selectErr()
  });

const urlSchema = z.string().refine(
  (val) => {
    if (val === undefined || val === "") return true;
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: urlError()
  }
);

export const createArticleSchema = z
  .object({
    title: stringSchema,
    content: stringSchema,
    description: stringSchema,
    thumbnail: stringSchema,
    images: z.array(stringSchema).optional(),
    categoryId: selectSchema,
    subCategoryId: selectSchema
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

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

export const defaultValues = {
  title: "",
  content: "",
  description: "",
  thumbnail: "",
  categoryId: "",
  subCategoryId: "",
  images: []
};
