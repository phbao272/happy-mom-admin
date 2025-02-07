"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button, Input, Stack } from "@mantine/core";
import { Textarea, TextInput } from "@/components/shared/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleImageUploader } from "@/components/shared/dropzone";
import { useCreateOrUpdateGroup } from "../hooks/useCreateOrUpdateGroup";
import { useGetDetailGroup } from "../hooks";
import { createGroupSchema, defaultValues, GroupSchema } from "../configs";

export const GroupForm = () => {
  const formReturn = useForm<GroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: defaultValues
  });

  const params = useParams<{ id: string }>();
  const groupQuery = useGetDetailGroup(params.id);
  const { mutate, isPending } = useCreateOrUpdateGroup(params.id);

  const onSubmit = formReturn.handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (groupQuery.data) {
      formReturn.reset({
        ...groupQuery.data
      });
    }
  }, [formReturn, groupQuery.data]);

  return (
    <Stack
      style={{
        paddingLeft: 20,
        paddingRight: 20
      }}
    >
      <Stack>
        <Input.Label required fw={600}>
          Ảnh nền
        </Input.Label>
        <SingleImageUploader name="background" control={formReturn.control} />
      </Stack>
      <Stack>
        <Input.Label required fw={600}>
          Tên group
        </Input.Label>
        <TextInput
          name="name"
          placeholder="nhập tên group"
          control={formReturn.control}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Mô tả
        </Input.Label>
        <Textarea
          name="description"
          placeholder="nhập mô tả"
          control={formReturn.control}
          rows={5}
        />
      </Stack>

      <Button onClick={onSubmit}>
        {params.id !== "create" ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
