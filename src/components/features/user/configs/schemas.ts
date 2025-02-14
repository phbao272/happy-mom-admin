import {
  requiredErr,
  selectErr,
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

const selectSchema = z
  .string({
    required_error: requiredErr()
  })
  .min(1, {
    message: selectErr()
  });

export const createUserSchema = z
  .object({
    name: stringSchema,
    username: stringSchema,
    password: stringSchema,
    role: selectSchema
  })

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const defaultValues = {
  name: "",
  username: "",
  password: "",
  role: ""
};
