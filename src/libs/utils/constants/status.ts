export const PACKAGE_STATUS = {
  IN_TRANSIT_VN: "IN_TRANSIT_VN", // Đang vận chuyển VN
  WAITING_DELIVERY: "WAITING_DELIVERY", // Chờ giao hàng
  VN_WAREHOUSE: "VN_WAREHOUSE" // Đã ở Kho VN
};

export const PACKAGE_STATUS_TEXT = {
  IN_TRANSIT_VN: "Đang về VN", //
  WAITING_DELIVERY: "Chờ giao", // Chờ giao hàng
  VN_WAREHOUSE: "Đã nhập kho VN" // Đã ở Kho VN
};

export type PackageStatusType = keyof typeof PACKAGE_STATUS;

export const PACKAGE_STATUS_OPTIONS = Object.entries(PACKAGE_STATUS_TEXT).map(
  ([key, value]) => ({
    value: key,
    label: value
  })
);

export const SHIPMENT_STATUS = {
  PENDING: "PENDING",
  CN_WAREHOUSE: "CN_WAREHOUSE",
  IN_TRANSIT_VN: "IN_TRANSIT_VN",
  VN_WAREHOUSE: "VN_WAREHOUSE",
  DISPATCHED: "DISPATCHED",
  UNDEFINED: "UNDEFINED",
  REJECTED: "REJECTED"
};

export type ShipmentStatusType = keyof typeof SHIPMENT_STATUS;

export const SHIPMENT_STATUS_TEXT = {
  PENDING: "Chờ ký nhận",
  CN_WAREHOUSE: "Đã nhập kho TQ",
  IN_TRANSIT_VN: "Đang chuyển về VN",
  VN_WAREHOUSE: "Đã nhập kho VN",
  DISPATCHED: "Đã xuất",
  REJECTED: "Đã từ chối",
  UNDEFINED: "Không xác định"
};

export const SHIPMENT_STATUS_OPTIONS = Object.entries(SHIPMENT_STATUS_TEXT).map(
  ([key, value]) => ({
    value: key,
    label: value
  })
);

export const SHIPMENT_FILTER_STATUS_OPTIONS = [
  {
    value: SHIPMENT_STATUS.CN_WAREHOUSE,
    label: SHIPMENT_STATUS_TEXT.CN_WAREHOUSE
  },
  {
    value: SHIPMENT_STATUS.IN_TRANSIT_VN,
    label: SHIPMENT_STATUS_TEXT.IN_TRANSIT_VN
  },
  {
    value: SHIPMENT_STATUS.UNDEFINED,
    label: SHIPMENT_STATUS_TEXT.UNDEFINED
  },
  {
    value: SHIPMENT_STATUS.REJECTED,
    label: SHIPMENT_STATUS_TEXT.REJECTED
  }
];

export const BLOCKED_SHIPMENT_STATUS = {
  BLOCK: "BLOCK",
  UNBLOCK: "UNBLOCK"
};

export type BlockedShipmentStatusType = keyof typeof BLOCKED_SHIPMENT_STATUS;

export const BLOCKED_SHIPMENT_STATUS_TEXT = {
  BLOCKED: "拒绝接收货物",
  UNBLOCKED: "Đã bỏ chặn"
};
