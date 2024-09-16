import React from "react";
import {
  Textarea as TextareaMantine,
  TextareaProps as TextareaPropsMantine
} from "@mantine/core";
import { TextareaProps } from "./types";
import { FieldValues, useController } from "react-hook-form";

export const Textarea = <T extends FieldValues>({
  name,
  control,
  className,
  ...props
}: TextareaProps<T> & TextareaPropsMantine) => {
  const {
    field: { value, ...other },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <>
      <TextareaMantine
        value={value || ""}
        error={error?.message}
        {...other}
        {...props}
      />
    </>
  );
};
