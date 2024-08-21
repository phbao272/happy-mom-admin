import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatDatetime = (
  date: Date | string,
  formatting = "HH:mm:ss - dd/MM/yyyy"
): string => {
  return format(new Date(date), formatting);
};

export const formatDatetimeISO = (
  date: string,
  formatting = "HH:mm:ss - dd/MM/yyyy"
): string => {
  const dateParseISO = parseISO(date);
  const timeZone = "Asia/Ho_Chi_Minh";
  const localDate = toZonedTime(dateParseISO, timeZone);
  console.log(localDate);
  const formattedDate = format(localDate, formatting);
  console.log(formattedDate);

  return formattedDate;
};

export const formatDatetimeParseISO = (
  date: string,
  formatting = "HH:mm:ss - dd/MM/yyyy"
): string => {
  const dateParseISO = parseISO(date);
  const formattedDate = format(dateParseISO, formatting);

  return formattedDate;
};

export const formatDateTimeWithoutTZ = (
  date: string,
  formatting = "HH:mm:ss - dd/MM/yyyy"
) => {
  // Remove T and Z from ISO string
  const dateWithoutTZ = date.replace("T", " ").replace("Z", "");

  return format(new Date(dateWithoutTZ), formatting);
};
