"use client";

import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";
import { TagShipmentStatus } from "@/components/shared/tags";
import { IUserShipment } from "@/libs/types/shipment";
import { SHIPMENT_STATUS_TEXT } from "@/libs/utils/constants/status";
import { formatDatetime, roundDecimal } from "@/libs/utils/format";
import { Stack } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";

interface Props {
  packageCode: string;
}

export const ShipmentIntoPackage = ({ packageCode }: Props) => {
  const columns = useMemo<MRT_ColumnDef<IUserShipment>[]>(
    () => [
      {
        accessorKey: "cn_tracking_number",
        header: "Mã Vận Đơn",
        enableEditing: false,
        enableColumnFilter: false
      },
      {
        accessorKey: "cn_warehouse_at",
        header: "Nhập Kho Trung Quốc",
        enableEditing: false,
        enableColumnFilter: false,

        Cell(props) {
          return props.cell.getValue() ? (
            <span>{formatDatetime(props.cell.getValue() as string)}</span>
          ) : (
            "-"
          );
        }
      },
      {
        accessorKey: "quantity",
        header: "Số Lượng",
        enableColumnFilter: false,
        mantineEditTextInputProps: {
          type: "number"
        }
      },
      {
        accessorKey: "weight",
        header: "Cân Nặng",
        enableEditing: false,
        enableColumnFilter: false,
        Cell({ cell }) {
          return (
            <span>
              {cell.getValue()
                ? `${roundDecimal(Number(cell.getValue()))} kg`
                : ""}
            </span>
          );
        }
      },
      {
        accessorKey: "status",
        header: "Trạng Thái",
        enableEditing: false,
        size: 300,
        Cell({ row: { original } }) {
          if (!original.status) {
            return "-";
          }

          return (
            <TagShipmentStatus
              status={original.status as keyof typeof SHIPMENT_STATUS_TEXT}
              dispatchAt={original.dispatched_at}
              inTransitVNAt={original.in_transit_vn_at}
            />
          );
        },
        enableColumnFilter: false
      },
      {
        accessorKey: "note",
        header: "Ghi chú",
        enableColumnFilter: false,
        Cell({ row }) {
          return row.original.note;
        }
      }
    ],
    []
  );

  return (
    <Stack>
      <TableContextProvider>
        <ReactTable
          endpointAPI={`/shipment/package/${packageCode}`}
          endpointResourceAPI={"/shipment"}
          name={"shipment-into-package"}
          columns={columns}
          data={[]}
          enableRowSelection={false}
          enableEditing={false}
          hasExportExcel={false}
          {...disableOptions}
        />
      </TableContextProvider>
    </Stack>
  );
};
