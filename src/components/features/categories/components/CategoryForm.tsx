"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button, Input, Stack } from "@mantine/core";
import { TextInput } from "@/components/shared/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArticleSchema,
  type CreateArticleSchema,
  defaultValues
} from "../configs/schemas";
import {
  useCreateOrUpdateArticle,
  useGetCategoryOption,
  useGetDetailArticle,
  useGetSubCategoryOption
} from "../hooks";
import { Select } from "@/components/shared/inputs/Select";

export const CategoryForm = () => {
  const formReturn = useForm<CreateArticleSchema>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: defaultValues
  });

  const params = useParams<{ id: string }>();
  const articleQuery = useGetDetailArticle(params.id);
  const categoryOption = useGetCategoryOption();
  const subCategoryOption = useGetSubCategoryOption({
    categoryId: formReturn.watch("categoryId")
  });
  const { mutate, isPending} = useCreateOrUpdateArticle(params.id);

  const onSubmit = formReturn.handleSubmit((data) => {
    mutate({ ...data });
  });

  useEffect(() => {
    if (articleQuery.data) {
      formReturn.reset({
        ...articleQuery.data,
        categoryId: articleQuery.data.subCategory.categoryId
      });
    }
  }, [formReturn, articleQuery.data]);

  return (
    <Stack
      style={{
        paddingLeft: 20,
        paddingRight: 20
      }}
    >
      <Stack>
        <Input.Label required fw={600}>
          Tiêu đề bài viết
        </Input.Label>
        <TextInput
          name="title"
          placeholder="nhập tiêu đề"
          control={formReturn.control}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Chủ đề
        </Input.Label>
        <Select
          placeholder="chọn chủ đề"
          name="categoryId"
          control={formReturn.control}
          data={categoryOption.data}
        />
      </Stack>

      <Button onClick={onSubmit} loading={isPending}>
        {params.id !== "create" ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
