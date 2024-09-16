import {
  InputBaseProps,
  TextInputProps as TextInputPropsMantine,
  TextareaProps as TextareaPropsMantine
} from "@mantine/core";
import {
  Control,
  FieldValues,
  Path,
  UseFormReturn,
  UseFormSetError
} from "react-hook-form";

export interface HTMLInputProps<T extends FieldValues> extends InputBaseProps {
  name: Path<T>;
  control?: Control<T>;
  setError?: UseFormSetError<T>;
  formReturn?: UseFormReturn<T>;
}

export interface FieldInputProps<T extends FieldValues>
  extends HTMLInputProps<T> {
  helpText?: string;
  resetInput?: boolean;
}

export interface TextInputProps<T extends FieldValues>
  extends FieldInputProps<T> {}

export interface TextareaProps<T extends FieldValues>
  extends FieldInputProps<T> {
  rows?: number;
  cols?: number;
}

export interface SelectProps<T extends FieldValues>
  extends FieldInputProps<T> {}
