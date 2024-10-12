"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { ActionIcon, Button, Group, Input, Stack } from "@mantine/core";
import { Textarea, TextInput } from "@/components/shared/inputs";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArticleSchema,
  CreateArticleSchema,
  defaultValues
} from "../configs/schemas";
import MinusIcon from "@/assets/svgs/minus.svg";
import {
  useCreateOrUpdateArticle,
  useGetCategoryOption,
  useGetDetailArticle,
  useGetSubCategoryOption
} from "../hooks";
import { Select } from "@/components/shared/inputs/Select";
import Image from "next/image";
import {
  ImageDropzone,
  ImageUploader,
  SingleImageUploader
} from "@/components/shared/ImageDropzone";

export const ArticleForm = () => {
  const formReturn = useForm<CreateArticleSchema>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control: formReturn.control,
    name: "images"
  });

  const params = useParams<{ id: string }>();
  const articleQuery = useGetDetailArticle(params.id);
  const categoryOption = useGetCategoryOption();
  const subCategoryOption = useGetSubCategoryOption({
    categoryId: formReturn.watch("categoryId")
  });
  const { mutate, isPending } = useCreateOrUpdateArticle(params.id);

  const onSubmit = formReturn.handleSubmit((data) => {
    const images = data.images?.map((item) => item.url) ?? [];
    mutate({ ...data, images });
  });

  useEffect(() => {
    if (articleQuery.data) {
      formReturn.reset({
        ...articleQuery.data,
        images: articleQuery.data.images.map((url) => ({ url })),
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
        {/* <TextInput
          name="thumbnail"
          placeholder="nhập đường dẫn ảnh"
          control={formReturn.control}
        /> */}
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
        <Textarea
          name="content"
          placeholder="nhập nội dung"
          control={formReturn.control}
          rows={5}
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

      {/* <Group justify="space-between">
        <Input.Label fw={600}>Hình ảnh</Input.Label>
        <Button variant="transparent" onClick={() => append({ url: "" })}>
          Thêm
        </Button>
      </Group> */}
      <ImageUploader control={formReturn.control} name="images" />

      {/* {fields.map((field, index) => (
        <Stack key={field.id} gap={2}>
          <TextInput
            placeholder="nhập đường dẫn ảnh"
            name={`images.${index}.url`}
            control={formReturn.control}
            rightSection={
              fields.length > 1 && (
                <ActionIcon
                  opacity={0.5}
                  variant="transparent"
                  onClick={() => remove(index)}
                >
                  <Image src={MinusIcon} alt="medal" width={24} height={24} />
                </ActionIcon>
              )
            }
          />
        </Stack>
      ))} */}

      <Button onClick={onSubmit}>
        {params.id !== "create" ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
