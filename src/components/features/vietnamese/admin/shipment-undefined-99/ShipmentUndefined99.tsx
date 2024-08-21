"use client";

import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";
import { TagShipmentStatus } from "@/components/shared/tags";
import { request } from "@/libs/requests";
import { IUserShipment } from "@/libs/types/shipment";
import {
  SHIPMENT_FILTER_STATUS_OPTIONS,
  SHIPMENT_STATUS_OPTIONS,
  SHIPMENT_STATUS_TEXT,
  ShipmentStatusType
} from "@/libs/utils/constants/status";
import { formatDatetime, roundDecimal } from "@/libs/utils/format";
import { handleError } from "@/libs/utils/messages";
import { Button } from "@mantine/core";
import { rem } from "@mantine/core";
import { Flex, Select } from "@mantine/core";
import { Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MRT_TableInstance,
  MRT_TableOptions,
  MRT_Updater
} from "mantine-react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface IShipmentUndefined99Props {
  enableEditing: boolean;
}

export const ShipmentUndefined99 = ({
  enableEditing
}: IShipmentUndefined99Props) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ShipmentStatusType>();
  const [statusFilter, setStatusFilter] = useState<ShipmentStatusType>();

  const columns = useMemo<MRT_ColumnDef<IUserShipment>[]>(
    () => [
      {
        accessorKey: "receiver.email",
        header: "Mã KH",
        enableEditing: false,
        enableColumnFilter: false,
        Cell(props) {
          return props.cell.getValue() ? `${props.cell.getValue()}` : "-";
        }
      },
      {
        accessorKey: "package_code",
        header: "Mã Bao",
        enableEditing: false,
        enableColumnFilter: false,
        Cell(props) {
          const value = props.cell.getValue() as string;

          return value ? (
            <Link
              href={`/vietnamese/${
                enableEditing ? "admin" : "vn-warehouse"
              }/package-code/${encodeURIComponent(value)}`}
              target="_blank"
            >
              {value}
            </Link>
          ) : (
            "-"
          );
        }
      },
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
        enableEditing: true,
        enableColumnFilter: false,
        mantineEditTextInputProps: {
          type: "number",
          min: 0,
          step: 0.01
        },
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
        enableEditing: true,
        editVariant: "select",
        mantineEditSelectProps: () => {
          return {
            data: SHIPMENT_STATUS_OPTIONS
          };
        },
        size: 300,
        Cell({ row: { original } }) {
          return original.status ? (
            <TagShipmentStatus
              status={original.status as keyof typeof SHIPMENT_STATUS_TEXT}
              dispatchAt={original.dispatched_at}
              inTransitVNAt={original.in_transit_vn_at}
            />
          ) : (
            "-"
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
    [enableEditing]
  );

  const { mutateAsync: updateManyShipmentStatus, isPending: isUpdateStatus } =
    useMutation({
      mutationFn: async ({ ids }: { ids?: { id: number }[] }) => {
        if (!status && ids && ids?.length) {
          throw new Error("Vui lòng chọn trạng thái!");
        }

        const dataUpdate = ids && ids.map((item) => ({ ...item, status }));

        const res = await request.patch(`/shipment/many`, dataUpdate);
        return res.data;
      },

      onSuccess: () => {
        toast.success("Cập nhật trạng thái thành công");
        setStatus(undefined);

        queryClient.invalidateQueries({
          queryKey: ["shipment-undefined-99"]
        });
      },

      onError: (error: any) => {
        handleError(error);
      }
    });

  const { mutateAsync: updateShipment, isPending: isUpdateShipment } =
    useMutation({
      mutationFn: async ({
        tracking_number,
        data
      }: {
        tracking_number: string;
        data: Partial<IUserShipment>;
      }) => {
        const res = await request.patch(
          `/shipment/by-tracking-number/${tracking_number}/admin`,
          data
        );
        return res.data;
      },

      onSuccess: () => {
        toast.success("Cập nhật thông tin đơn hàng thành công");
        queryClient.invalidateQueries({
          queryKey: ["shipment-undefined-99"]
        });
      },

      onError: (error: any) => {
        handleError(error);
      }
    });

  // Update tại dòng
  const handleSaveShipment: MRT_TableOptions<IUserShipment>["onEditingRowSave"] =
    async ({ values, table }) => {
      await updateShipment({
        tracking_number: values.cn_tracking_number,
        data: {
          note: values.note,
          quantity: +values.quantity,
          status: values.status,
          weight: +values.weight
        }
      });

      table.setEditingRow(null);
    };

  const { mutateAsync: deleteItem, isPending: isDeletingItem } = useMutation({
    mutationFn: async (trackingNumbers: string[]) => {
      const res = await request(`/shipment`, {
        method: "DELETE",
        data: {
          trackingNumbers
        }
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Xóa thành công!");

      queryClient.invalidateQueries({
        queryKey: ["shipment-undefined-99"]
      });
    },
    onError: (error: any) => {
      handleError(error);
    }
  });

  const customRightTopToolbar = (table: MRT_TableInstance<IUserShipment>) => {
    return (
      <Flex
        style={{
          gap: "12px"
        }}
      >
        {table.getSelectedRowModel().rows.length > 0 && (
          <Flex
            style={{
              gap: rem(12)
            }}
          >
            <Button
              loading={isUpdateStatus}
              onClick={() => {
                setStatus(undefined);
                const selectedRows = table.getSelectedRowModel().rows; //or read entire rows

                modals.open({
                  title: "Chỉnh sửa nhiều",
                  children: (
                    <Stack
                      style={{
                        position: "relative"
                      }}
                    >
                      <Select
                        label="Chọn trạng thái"
                        placeholder="Chọn trạng thái"
                        data={SHIPMENT_STATUS_OPTIONS}
                        onChange={(value) => {
                          console.log(value);
                          setStatus(value as ShipmentStatusType);
                        }}
                      />

                      <Button
                        loading={isUpdateStatus}
                        variant="filled"
                        onClick={async () => {
                          const ids = selectedRows.map((row) => ({
                            id: row.original.id
                          }));
                          modals.closeAll();
                          await updateManyShipmentStatus({
                            ids
                          });
                          table.setRowSelection(
                            [] as unknown as MRT_Updater<MRT_RowSelectionState>
                          );
                          setStatus(undefined);
                        }}
                      >
                        Lưu
                      </Button>
                    </Stack>
                  )
                });
              }}
            >
              Chỉnh sửa
            </Button>

            <Button
              color="red"
              onClick={() => {
                const selectedRows = table.getSelectedRowModel().rows; //or read entire rows

                const trackingNumbers = selectedRows.map(
                  (row) => row.original.cn_tracking_number
                );

                modals.openConfirmModal({
                  title: "Bạn có chắc chắn xóa?",
                  labels: { confirm: "Xóa", cancel: "Hủy" },
                  confirmProps: { color: "red" },
                  onConfirm: () => {
                    console.log("confirm", trackingNumbers);
                    deleteItem(trackingNumbers);

                    table.setRowSelection(
                      [] as unknown as MRT_Updater<MRT_RowSelectionState>
                    );
                  }
                });
              }}
            >
              Xóa
            </Button>
          </Flex>
        )}

        <Select
          data={SHIPMENT_FILTER_STATUS_OPTIONS}
          placeholder="Chọn trạng thái"
          onChange={(value) => setStatusFilter(value as ShipmentStatusType)}
          value={statusFilter}
          clearable
        />
      </Flex>
    );
  };

  return (
    <Stack>
      <TableContextProvider>
        <ReactTable
          endpointAPI={`/shipment/undefined-99`}
          endpointResourceAPI={"/shipment"}
          name={"shipment-undefined-99"}
          columns={columns}
          data={[]}
          enableEditing={enableEditing}
          hasExportExcel={false}
          hasEdit
          params={{
            status: statusFilter
          }}
          onEditingRowSave={handleSaveShipment}
          isSaving={isUpdateShipment || isDeletingItem}
          customRightTopToolbar={customRightTopToolbar}
          enableRowSelection={
            enableEditing ? (row) => !row.original?.isDisableAction : false
          }
          {...disableOptions}
        />
      </TableContextProvider>
    </Stack>
  );
};
