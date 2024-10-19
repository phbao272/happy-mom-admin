import { DateInput, DateInputProps } from "@mantine/dates";
import dayjs from "dayjs";
import Image from "next/image";
import DateIcon from "@/assets/svgs/date.svg";
import { useRef } from "react";
import {
  type FieldValues,
  useController,
  type UseControllerProps
} from "react-hook-form";

export type DateInputCustomProps<T extends FieldValues> =
  UseControllerProps<T> & Omit<DateInputProps, "value" | "defaultValue">;

export function DateInputCustom<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: DateInputCustomProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister
  });

  const dateInputRef = useRef<HTMLInputElement>(null);

  const onFocusDatePicker = () => {
    dateInputRef.current?.focus();
  };

  return (
    <DateInput
      error={fieldState.error?.message}
      value={value ? dayjs(value).toDate() : null}
      valueFormat="YYYY/MM/DD"
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      rightSection={
        <Image
          src={DateIcon}
          alt="date"
          width={24}
          height={24}
          onClick={onFocusDatePicker}
          style={{
            cursor: "pointer"
          }}
        />
      }
      {...field}
      {...props}
      ref={dateInputRef}
    />
  );
}
