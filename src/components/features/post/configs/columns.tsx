"use client";

import { IPost } from "@/libs/types";
import { Text } from "@mantine/core";
import { format } from "date-fns";
import { MRT_ColumnDef } from "mantine-react-table";

export const columns: MRT_ColumnDef<IPost>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableEditing: false
  },
  {
    accessorKey: "content",
    header: "Nội dung",
    enableEditing: false
  },
  {
    accessorKey: "author.username",
    header: "Tác giả",
    enableEditing: false
  },
  {
    accessorKey: "group.name",
    header: "Nhóm",
    enableEditing: false,
    Cell: ({ cell }) => {
      const value = cell?.getValue<string>();
      return <Text>{value ? value : ""}</Text>;
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
