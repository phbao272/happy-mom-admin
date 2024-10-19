"use client";

import { IDeal } from "@/libs/types/deals";
import { format } from "date-fns";
import { MRT_ColumnDef } from "mantine-react-table";

export const columns: MRT_ColumnDef<IDeal>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   enableEditing: false
  // },
  {
    accessorKey: "name",
    header: "Tên ưu đãi",
    enableEditing: false
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    enableEditing: false
  },
  {
    accessorKey: "type",
    header: "Loại ưu đãi",
    enableEditing: false
  },
  {
    accessorKey: "expiredAt",
    header: "Ngày hết hạn",
    enableEditing: false,
    Cell: ({ cell }) => {
      const date = cell.getValue<string>();
      return format(new Date(date), "dd/MM/yyyy");
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    enableEditing: false,
    Cell: ({ cell }) => {
      const date = cell.getValue<string>();
      return format(new Date(date), "dd/MM/yyyy");
    }
  }
];
