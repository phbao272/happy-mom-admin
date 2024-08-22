import React from "react";
import {
  TextInput as TextInputMantine,
  TextInputProps as TextInputPropsMantine
} from "@mantine/core";
import { TextInputProps } from "./types";
import { FieldValues, useController } from "react-hook-form";

export const TextInput = <T extends FieldValues>({
  name,
  control,
  className,
  ...props
}: TextInputProps<T> & TextInputPropsMantine) => {
  const {
    field: { value, ...other },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <>
      <TextInputMantine
        value={value || ""}
        error={error?.message}
        {...other}
        {...props}
      />
    </>
  );
};
