import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  useController
} from "react-hook-form";
import {
  Select as MantineSelect,
  SelectProps as MantineSelectProps
} from "@mantine/core";

interface SelectProps<T extends FieldValues> extends MantineSelectProps {
  name: Path<T>;
  control: Control<T>;
}

export const Select = <T extends FieldValues>({
  name,
  control,
  ...rest
}: SelectProps<T>) => {
  const {
    field: { value, ...other },
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineSelect
          {...field}
          {...rest}
          error={error?.message}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
};
