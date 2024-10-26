"use client";

import { NotificationTypeWithEnum } from "@/libs/types";
import { MRT_ColumnDef } from "mantine-react-table";
import NotificationSwitch from "./NotificationSwitch";

export const columns: MRT_ColumnDef<NotificationTypeWithEnum>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableEditing: false
  },
  {
    accessorKey: "name",
    header: "Tên thông báo",
    enableEditing: false
  },
  // {
  //   accessorKey: "type",
  //   header: "Loại thông báo",
  //   enableEditing: false
  // },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    enableEditing: false,
    Cell: ({ cell, row }) => <NotificationSwitch row={row} />
  }
  // {
  //   accessorKey: "createdAt",
  //   header: "Ngày tạo",
  //   enableEditing: false,
  //   Cell: ({ cell }) => {
  //     const date = cell.getValue<string>();
  //     return format(new Date(date), "dd/MM/yyyy");
  //   }
  // }
];
