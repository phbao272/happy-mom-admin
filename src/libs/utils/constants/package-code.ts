export const PACKAGE_CODE_FILTER = {
  UNDEFINED_CODE: "UNDEFINED_CODE",
  "99_PERCENT": "99_PERCENT",
};

export const PACKAGE_CODE_FILTER_TEXT = {
  UNDEFINED_CODE: "Mã KXĐ",
  "99_PERCENT": "Mã 99%",
};

export const PACKAGE_CODE_FILTER_OPTIONS = Object.entries(
  PACKAGE_CODE_FILTER_TEXT
).map(([key, value]) => ({
  value: key,
  label: value,
}));
