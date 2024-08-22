"use client";

import { modals } from "@mantine/modals";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_RowData,
  MRT_RowSelectionState,
  MRT_TableInstance,
  MRT_TableOptions,
  MantineReactTable
} from "mantine-react-table";
import React, { useState } from "react";

import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  ModalProps,
  ScrollArea,
  Stack,
  TextInput,
  Tooltip,
  rem
} from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconReload,
  IconSearch,
  IconTrash
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DataPagination } from "@/libs/types/common";
import { useTableContext } from "./components/TableContext";
import { useTable } from "./hooks/useTable";
import { request } from "@/libs/requests";
import { toast } from "sonner";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { getQueryClient } from "@/libs/query";

interface IFetchedData<T> extends Record<string, any> {
  data: T[];
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

interface IModal {
  children: React.ReactNode;
  modalProps: Omit<ModalProps, "opened" | "onClose">;
}

interface Props<T extends MRT_RowData> extends MRT_TableOptions<T> {
  endpointAPI: string;
  name: string;
  columns: MRT_ColumnDef<T>[];
  seeDetail?: boolean;
  params?: Record<string, any>;
  hasCreate?: boolean;
  hasEdit?: boolean;
  hasDelete?: boolean;
  endpointResourceAPI: string;
  data: T[];
  isCheckMine?: boolean;

  customRightTopToolbar?: (
    table: MRT_TableInstance<T>,
    fetchedData?: IFetchedData<T>
  ) => React.ReactNode;

  customLeftTopToolbar?: (
    table: MRT_TableInstance<T>,
    fetchedData?: IFetchedData<T>
  ) => React.ReactNode;

  customRenderRowActions?: (row: MRT_Row<T>) => React.ReactNode;

  isSaving?: boolean;
  handleReload?: () => void;

  modal?: IModal;
}

export const ReactTable = <T extends Record<string, any>>({
  endpointAPI,
  columns,
  name,
  seeDetail,
  params,
  hasCreate,
  hasEdit,
  hasDelete = true,
  endpointResourceAPI,
  data,
  customRightTopToolbar,
  customLeftTopToolbar,
  customRenderRowActions,
  isSaving,
  handleReload,
  isCheckMine,
  modal,
  ...props
}: Props<T>) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const tableCtx = useTableContext();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [searchOne, setSearchOne] = useState("");
  const [debouncedSearchOne] = useDebouncedValue(searchOne, 500);

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 50
  });

  const {
    data: fetchedData = {
      data: [],
      meta: {
        currentPage: 0,
        perPage: pagination.pageSize,
        total: 0,
        totalPages: 0
      }
    },
    isError: isLoadingItemsError,
    isFetching: isFetchingItems,
    isLoading: isLoadingItems
  } = useQuery<DataPagination<T[]>>({
    queryKey: [name, pagination, params, tableCtx?.params, debouncedSearchOne],
    queryFn: async () => {
      const res = await request(`${endpointAPI}`, {
        params: {
          page: pagination.pageIndex + 1,
          perPage: pagination.pageSize,
          searchOne: debouncedSearchOne,
          ...params,
          ...tableCtx?.params
        }
      });

      return res.data;
    },
    refetchOnWindowFocus: false
  });

  const { mutateAsync: deleteItem, isPending: isDeletingItem } = useMutation({
    mutationFn: async (id: number) => {
      const res = await request(`${endpointResourceAPI}/${id}`, {
        method: "DELETE"
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Xóa thành công!");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [name] })
  });

  const openDeleteConfirmModal = (row: MRT_Row<T>) =>
    modals.openConfirmModal({
      title: "Bạn có chắc chắn xóa?",
      labels: { confirm: "Xóa", cancel: "Hủy" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteItem(row.original.id)
    });

  const table = useTable({
    columns,
    data: fetchedData ? fetchedData.data : [],
    positionActionsColumn: "last",
    getRowId: (row) => String(row.id),
    mantineToolbarAlertBannerProps: isLoadingItemsError
      ? {
          color: "red",
          children: "Không có dữ liệu!",
          style: { textAlign: "center" }
        }
      : undefined,
    mantineTableContainerProps: {
      style: {
        minHeight: "500px"
      }
    },

    manualPagination: true,
    onPaginationChange: setPagination,
    paginationDisplayMode: "pages",
    positionPagination: "bottom",
    pageCount: fetchedData?.meta?.totalPages || 0,
    rowCount: fetchedData?.meta?.total || 0,

    renderRowActions: ({ row }) => {
      if (
        (isCheckMine && row.original?.mine === false) ||
        row.original?.isDisableAction
      ) {
        return null;
      }

      return (
        <Flex gap="md">
          {seeDetail && (
            <Tooltip label="Xem">
              <ActionIcon onClick={() => router.push(`${row.original.id}`)}>
                <IconEye />
              </ActionIcon>
            </Tooltip>
          )}

          {hasEdit ? (
            <Tooltip label="Sửa">
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
          ) : null}

          {hasDelete ? (
            <Tooltip label="Xóa">
              <ActionIcon
                color="red"
                onClick={() => openDeleteConfirmModal(row)}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          ) : null}

          {customRenderRowActions ? customRenderRowActions(row) : null}
        </Flex>
      );
    },
    // initialState: {
    //   showGlobalFilter: true,
    // },
    // manualFiltering: true,
    state: {
      isLoading: isLoadingItems,
      isSaving: isDeletingItem || isSaving,
      showAlertBanner: isLoadingItemsError,
      showProgressBars: isFetchingItems,
      pagination: pagination,
      rowSelection: rowSelection
    },

    // ---------------------- Edit ----------------------
    enableEditing: true,
    editDisplayMode: "row",
    // onEditingRowCancel: () => setValidationErrors({}),
    // onEditingRowSave: onEditingRowSave,

    // ---------------------- Select Rows ----------------------
    enableRowSelection: true,
    onRowSelectionChange: (selectedRows) => {
      setRowSelection(selectedRows);
    },

    renderTopToolbar: ({ table }) => (
      <Flex
        style={{
          padding: "8px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Flex
          gap="md"
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <TextInput
            style={{
              width: "100%",
              maxWidth: "200px"
            }}
            placeholder="Tìm kiếm"
            value={searchOne}
            onChange={(e) => setSearchOne(e.currentTarget.value)}
            leftSectionPointerEvents="none"
            leftSection={
              <IconSearch style={{ width: rem(16), height: rem(16) }} />
            }
          />

          {customLeftTopToolbar
            ? customLeftTopToolbar(table, fetchedData)
            : null}

          <Button
            onClick={() => {
              setSearchOne("");
              queryClient.invalidateQueries({ queryKey: [name] });
              handleReload && handleReload();
              setRowSelection({});
            }}
            leftSection={<IconReload />}
          >
            Làm mới
          </Button>
        </Flex>

        <Flex gap="md">
          {customRightTopToolbar
            ? customRightTopToolbar(table, fetchedData)
            : null}
        </Flex>
      </Flex>
    ),

    positionToolbarAlertBanner: "bottom",

    ...props
  });

  return (
    <Stack>
      {modal && (
        <Modal opened={modalOpened} onClose={closeModal} {...modal.modalProps}>
          {modal.children}
        </Modal>
      )}

      <Flex gap="md">
        {hasCreate ? (
          <Button
            onClick={() => {
              modal ? openModal() : router.push(`./create`);
            }}
          >
            Tạo mới
          </Button>
        ) : null}
      </Flex>
      <ScrollArea.Autosize
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <MantineReactTable table={table} />
      </ScrollArea.Autosize>
    </Stack>
  );
};
