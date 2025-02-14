"use client";

import type { IUser } from "@/libs/types";
import type { MRT_ColumnDef } from "mantine-react-table";

export const columnsUser: MRT_ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "Tên người dùng",
    enableEditing: false
  },
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
    enableEditing: false
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    enableEditing: false
  }
];
