import {
  requiredErr,
  stringMaxErr,
  stringMinErr
} from "@/libs/utils/constants/errorMessage";
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

export const createDealSchema = z.object({
  name: stringSchema,
  description: stringSchema,
  imageUrl: stringSchema,
  expiredAt: stringSchema,
  type: stringSchema
});

export type DealSchema = z.infer<typeof createDealSchema>;

export const defaultValues = {
  name: "",
  description: "",
  imageUrl: "",
  expiredAt: "",
  type: ""
};
