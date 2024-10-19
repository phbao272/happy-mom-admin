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

export const createGroupSchema = z.object({
  name: stringSchema,
  background: stringSchema,
  description: stringSchema
});

export type GroupSchema = z.infer<typeof createGroupSchema>;

export const defaultValues = {
  name: "",
  background: "",
  description: ""
};
