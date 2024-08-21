"use client";

import { CardOverview } from "@/components/shared/cards";
import { ReactTable } from "@/components/shared/tables";
import { TableContextProvider } from "@/components/shared/tables/components/TableContext";
import { Button, Flex, Grid, Select, Stack, Text, rem } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MRT_TableInstance,
  MRT_TableOptions,
  MRT_Updater
} from "mantine-react-table";
import React, { useMemo, useState } from "react";
import { modals } from "@mantine/modals";
import {
  PACKAGE_STATUS_OPTIONS,
  PACKAGE_STATUS_TEXT,
  PackageStatusType
} from "@/libs/utils/constants/status";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/libs/requests";
import { disableOptions } from "@/components/shared/tables/hooks/useTable";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { IPackage } from "@/libs/types/shipment";
import { formatDateTimeWithoutTZ, roundDecimal } from "@/libs/utils/format";
import { subDays } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import { handleError } from "@/libs/utils/messages";

interface IOverviews {
  packages: string;
  trackingNumbers: string;
  totalWeight: string;
}

const DATA_OVERVIEW = [
  {
    _key: "packages",
    label: "Bao Hàng",
    icon: () => (
      <span
        style={{
          fontSize: 50
        }}
      >
        👥
      </span>
    ),
    bgColor: "#a38cc6"
  },
  {
    _key: "trackingNumbers",
    label: "Mã Vận Đơn",
    icon: () => (
      <span
        style={{
          fontSize: 50
        }}
      >
        📦
      </span>
    ),
    bgColor: "#fcca5c"
  },
  {
    _key: "totalWeight",
    label: "Cân Nặng",
    symbol: "kg",
    icon: () => (
      <span
        style={{
          fontSize: 50
        }}
      >
        🛒
      </span>
    ),
    bgColor: "#4de5d5"
  }
];

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<PackageStatusType>();
  const [statusFilter, setStatusFilter] = useState<PackageStatusType>();

  const [value, setValue] = useState<[Date | null, Date | null]>(() => {
    // Add +7 hours to current date
    const currentDate = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
    currentDate.setUTCHours(0, 0, 0, 0);
    let formattedDate = currentDate.toISOString();

    return [subDays(new Date(formattedDate), 7), new Date(formattedDate)];
  });

  const { data } = useQuery<IOverviews>({
    queryKey: ["overview-admin"],
    queryFn: async () => {
      const res = await request.get("/overviews/admin");

      return res.data;
    }
  });

  const { mutateAsync: updatePackage, isPending: isUpdateStatus } = useMutation(
    {
      mutationFn: async ({
        data,
        ids
      }: {
        data?: IPackage[];
        ids?: { id: string }[];
      }) => {
        if (!status && ids && ids?.length) {
          throw new Error("Vui lòng chọn trạng thái!");
        }

        const dataUpdate =
          ids && ids.length ? ids.map((item) => ({ ...item, status })) : data;

        const res = await request.patch(`/packages`, dataUpdate);
        return res.data;
      },

      onSuccess: () => {
        toast.success("Cập nhật trạng thái thành công");
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
        setStatus(undefined);
      },

      onError: (error: any) => {
        handleError(error);
      }
    }
  );

  const columns = useMemo<MRT_ColumnDef<IPackage>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Mã bao",
        enableEditing: false,
        Cell(props) {
          const value = props.cell.getValue() as string;

          return (
            <Link
              href={`/vietnamese/admin/package-code/${encodeURIComponent(
                value
              )}`}
              target="_blank"
            >
              {value}
            </Link>
          );
        }
      },

      {
        accessorKey: "created_at",
        header: "Thời gian tạo",
        enableEditing: false,
        enableColumnFilter: false,

        Cell({ cell }) {
          return (
            <span>{formatDateTimeWithoutTZ(cell.getValue() as string)}</span>
          );
        }
      },

      {
        accessorKey: "package_number",
        header: "Số kiện trong bao",
        enableEditing: false,
        enableColumnFilter: false
      },
      {
        accessorKey: "actual_weight",
        header: "Cân Nặng thực tế",
        enableColumnFilter: false,
        mantineEditTextInputProps: {
          type: "number",
          min: 0,
          step: 0.01
        },
        Cell({ cell }) {
          return <span>{roundDecimal(Number(cell.getValue()))} kg</span>;
        }
      },
      {
        accessorKey: "customer",
        header: "Mã nhân viên",
        enableEditing: false,
        enableColumnFilter: false,
        Cell({ cell }) {
          const value = cell.getValue() as string;

          const startIdx = value.indexOf("(");
          const endIdx = value.indexOf(")");
          const result = value.slice(startIdx + 1, endIdx);

          return <span>{result}</span>;
        }
      },
      {
        accessorKey: "status",
        header: "Trạng Thái",
        editVariant: "select",
        enableColumnFilter: false,

        Cell({ row: { original } }) {
          return PACKAGE_STATUS_TEXT[
            original.status as keyof typeof PACKAGE_STATUS_TEXT
          ];
        },

        mantineEditSelectProps: () => {
          return {
            data: PACKAGE_STATUS_OPTIONS
          };
        }
      }
    ],
    []
  );

  const handleSearch = (_value: DatesRangeValue) => {
    setValue(_value);
  };

  const customRightTopToolbar = (table: MRT_TableInstance<IPackage>) => {
    return (
      <Flex
        style={{
          display: "flex",
          alignItems: "center",
          gap: rem(12)
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
                        data={PACKAGE_STATUS_OPTIONS}
                        onChange={(value) => {
                          console.log(value);
                          setStatus(value as PackageStatusType);
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
                          await updatePackage({
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
              loading={isDeletingItem}
              onClick={() => {
                const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
                const ids = selectedRows.map((row) => row.original.id);
                modals.openConfirmModal({
                  title: "Bạn có chắc chắn xóa?",
                  labels: { confirm: "Xóa", cancel: "Hủy" },
                  confirmProps: { color: "red" },
                  onConfirm: () => {
                    console.log("confirm", ids);
                    deleteItem(ids);
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
          data={PACKAGE_STATUS_OPTIONS}
          placeholder="Chọn trạng thái"
          onChange={(value) => setStatusFilter(value as PackageStatusType)}
          value={statusFilter}
          clearable
        />
      </Flex>
    );
  };

  const customLeftTopToolbar = (
    table: MRT_TableInstance<IPackage>,
    fetchedData: any
  ) => {
    return (
      <Flex
        style={{
          display: "flex",
          alignItems: "center",
          gap: rem(12)
        }}
      >
        <DatePickerInput
          type="range"
          allowSingleDateInRange
          leftSection={
            <IconCalendar
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          leftSectionPointerEvents="none"
          style={{
            minWidth: rem(200)
          }}
          maxDate={new Date()}
          clearable
          value={value}
          onChange={handleSearch}
        />

        <Text>Tổng kg: {fetchedData?.totalWeight || "0"} kg</Text>
      </Flex>
    );
  };

  const { mutateAsync: deleteItem, isPending: isDeletingItem } = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await request(`/packages`, {
        method: "DELETE",
        data: {
          ids
        }
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Xóa thành công!");

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard"]
      });
      queryClient.invalidateQueries({ queryKey: ["overview-admin"] });
    },
    onError: (error: any) => {
      handleError(error);
    }
  });

  const handleSavePackage: MRT_TableOptions<IPackage>["onEditingRowSave"] =
    async ({ values, table }) => {
      await updatePackage({
        data: [
          {
            id: values.id,
            status: values.status,
            actual_weight: +values.actual_weight
          }
        ] as IPackage[]
      });
      table.setEditingRow(null);
    };

  return (
    <Stack>
      <Grid>
        {data &&
          DATA_OVERVIEW.map((item, index) => (
            <Grid.Col
              key={index}
              span={{
                xs: 12,
                sm: 6,
                md: 6,
                lg: 3
              }}
            >
              <CardOverview
                {...item}
                value={data[item._key as keyof IOverviews] || "0"}
              />
            </Grid.Col>
          ))}
      </Grid>

      <TableContextProvider>
        <ReactTable
          endpointAPI={"/packages"}
          endpointResourceAPI={"/packages"}
          name={"admin-dashboard"}
          columns={columns}
          data={[]}
          hasEdit
          customRightTopToolbar={customRightTopToolbar}
          customLeftTopToolbar={customLeftTopToolbar}
          params={{
            startAt: value?.[0] ? value?.[0] : undefined,
            endAt: value?.[1] ? value?.[1] : undefined,
            status: statusFilter
          }}
          isSaving={isUpdateStatus || isDeletingItem}
          onEditingRowSave={handleSavePackage}
          handleReload={() => {
            queryClient.invalidateQueries({ queryKey: ["overview-admin"] });
          }}
          {...disableOptions}
        />
      </TableContextProvider>
    </Stack>
  );
};
