"use client";

import { IArticle } from "@/libs/types";
import { MRT_ColumnDef } from "mantine-react-table";

export const columns: MRT_ColumnDef<IArticle>[] = [
  {
    accessorKey: "title",
    header: "Tiêu đề",
    enableEditing: false
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    enableEditing: false
  },
  {
    accessorKey: "content",
    header: "Nội dung",
    enableEditing: false
  },
  {
    accessorKey: "subCategory.category.name",
    header: "Chủ đề",
    enableEditing: false
  },
  {
    accessorKey: "subCategory.name",
    header: "Chi tiết chủ đề",
    enableEditing: false
  }
];
