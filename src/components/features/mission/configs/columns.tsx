"use client";

import { NotificationTypeWithEnum } from "@/libs/types";
import { MRT_ColumnDef } from "mantine-react-table";
import NotificationSwitch from "../../notification/configs/NotificationSwitch";
import { Text } from "@mantine/core";
// import NotificationSwitch from "./NotificationSwitch";

export const columns: MRT_ColumnDef<NotificationTypeWithEnum>[] = [
  //   {
  //     accessorKey: "id",
  //     header: "Tên nhiệm vụ",
  //     enableEditing: false,
  //     Cell: ({ row }) => <Text>nhiệm vụ {row.index}</Text>
  //   },
  {
    accessorKey: "name",
    header: "Tên nhiệm vụ",
    enableEditing: false,
    Cell: ({ row }) => <Text>nhiệm vụ {row.index}</Text>
  },
  {
    accessorKey: "type",
    header: "Nội dung",
    enableEditing: false,
    Cell: ({ row }) => <Text>nội dung nhiệm vụ {row.index}</Text>
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    enableEditing: false,
    Cell: ({ row }) => <NotificationSwitch row={row} />
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
