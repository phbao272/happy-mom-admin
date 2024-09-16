"use client";

import { IPost } from "@/libs/types";
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
  }
];
