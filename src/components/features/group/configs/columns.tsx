"use client";

import { IGroup } from "@/libs/types";
import { MRT_ColumnDef } from "mantine-react-table";

export const columns: MRT_ColumnDef<IGroup>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableEditing: false
  },
  {
    accessorKey: "name",
    header: "Tên nhóm",
    enableEditing: false
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    enableEditing: false
  }
];
