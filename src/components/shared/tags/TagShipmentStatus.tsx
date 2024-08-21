import {
  SHIPMENT_STATUS_TEXT,
  ShipmentStatusType
} from "@/libs/utils/constants/status";
import { formatDateTimeWithoutTZ } from "@/libs/utils/format";
import { Badge, Flex } from "@mantine/core";
import React from "react";
import { ProgressCar } from "../progress";

interface TagShipmentStatusProps {
  status: ShipmentStatusType;
  inTransitVNAt?: string;
  dispatchAt?: string;
}

const COLOR = {
  PENDING: {
    background: "#0d6efd",
    text: "#FFF"
  },
  CN_WAREHOUSE: {
    background: "#0dcaf0",
    text: "#FFF"
  },
  IN_TRANSIT_VN: {
    background: "#6c757d",
    text: "#FFF"
  },
  VN_WAREHOUSE: {
    background: "#198754",
    text: "#FFF"
  },
  DISPATCHED: {
    background: "#ffc107",
    text: "#000"
  },
  REJECTED: {
    background: "#dc3545",
    text: "#FFF"
  },
  UNDEFINED: {
    background: "#dc3545",
    text: "#FFF"
  }
};

export const TagShipmentStatus = ({
  status,
  dispatchAt,
  inTransitVNAt
}: TagShipmentStatusProps) => {
  if (status === "IN_TRANSIT_VN" && inTransitVNAt) {
    return <ProgressCar inTransitVNAt={inTransitVNAt} />;
  }

  return (
    <Flex
      style={{
        gap: "10px"
      }}
    >
      <Badge
        style={{
          backgroundColor: COLOR[status].background,
          color: COLOR[status].text,
          textTransform: "capitalize",
          fontWeight: "400"
        }}
        size="lg"
      >
        {SHIPMENT_STATUS_TEXT[status]}
      </Badge>

      {status === "DISPATCHED" && dispatchAt ? (
        <span>{formatDateTimeWithoutTZ(dispatchAt)}</span>
      ) : null}
    </Flex>
  );
};
