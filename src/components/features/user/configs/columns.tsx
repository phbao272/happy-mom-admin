"use client";

import type { IUser } from "@/libs/types";
import type { MRT_ColumnDef } from "mantine-react-table";

export const columnsUser: MRT_ColumnDef<IUser>[] = [
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
    enableEditing: false
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    enableEditing: false
  },
  {
    accessorKey: "currentSubscriptionPackage.title",
    header: "Gói dịch vụ",
    enableEditing: false,
    Cell: ({ row }) => {
      return (
        <p>{row.original.currentSubscriptionPackage?.title || "Miễn phí"}</p>
      );
    }
  }
];
