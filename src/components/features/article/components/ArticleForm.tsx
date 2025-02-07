"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button, Input, Stack } from "@mantine/core";
import { MyEditor, Textarea, TextInput } from "@/components/shared/inputs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArticleSchema,
  CreateArticleSchema,
  defaultValues
} from "../configs/schemas";
import {
  useCreateOrUpdateArticle,
  useGetCategoryOption,
  useGetDetailArticle,
  useGetSubCategoryOption
} from "../hooks";
import { Select } from "@/components/shared/inputs/Select";
import {
  MultipleImageUpload,
  SingleImageUploader
} from "@/components/shared/dropzone";

export const ArticleForm = () => {
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
          Thumbnail
        </Input.Label>
        <SingleImageUploader name="thumbnail" control={formReturn.control} />
      </Stack>
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
          Nội dung bài viết
        </Input.Label>
        <Controller
          control={formReturn.control}
          name="content"
          render={({ field }) => (
            <MyEditor {...field} error={formReturn.formState.errors.content?.message} />
          )}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Mô tả bài viết
        </Input.Label>
        <Textarea
          name="description"
          placeholder="nhập mô tả"
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

      <Stack>
        <Input.Label required fw={600}>
          Chi tiết chủ đề
        </Input.Label>
        <Select
          placeholder="chọn chi tiết chủ đề"
          name="subCategoryId"
          disabled={!formReturn.watch("categoryId")}
          control={formReturn.control}
          data={subCategoryOption.data}
        />
      </Stack>

      <MultipleImageUpload control={formReturn.control} name="images" />

      <Button onClick={onSubmit} loading={isPending}>
        {params.id !== "create" ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
