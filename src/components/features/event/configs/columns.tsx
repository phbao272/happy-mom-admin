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
    header: "Tên sự kiện",
    enableEditing: false,
    Cell: ({ row }) => <Text>sự kiện {row.index}</Text>
  },
  {
    accessorKey: "type",
    header: "Nội dung",
    enableEditing: false,
    Cell: ({ row }) => <Text>nội dung sự kiện {row.index}</Text>
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    enableEditing: false,
    Cell: ({ row }) => {
      if (row.index % 2 === 0) {
        return <Text>Đã kích hoạt</Text>;
      }
      return <Text>Chưa kích hoạt</Text>;
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ngày kết thúc",
    enableEditing: false,
    Cell: ({ cell }) => <Text>12-12-2024</Text>
  }
];
