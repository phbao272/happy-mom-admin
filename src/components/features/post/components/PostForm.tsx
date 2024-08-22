"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGetDetailPost } from "../hooks/use-get-detail-post";
import { Button, Select, Stack } from "@mantine/core";
import { Textarea } from "@/components/shared/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostSchema } from "../configs";
import { useGetGroupOption } from "../../group/hooks";

export const PostForm = () => {
  const formReturn = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      groupId: "123"
    }
  });

  const params = useParams<{ id: string }>();
  const postQuery = useGetDetailPost(params.id);

  console.log(formReturn.formState.errors);

  const groupOption = useGetGroupOption();

  // useEffect(() => {
  //   if (postQuery.data) {
  //     formReturn.reset(postQuery.data);
  //   }
  // }, [formReturn, postQuery.data]);

  console.log("groupOption", groupOption.data);

  const onSubmit = formReturn.handleSubmit((data) => {
    console.log("data", data);
  });

  return (
    <Stack
      style={{
        maxWidth: 600
      }}
    >
      <Textarea
        label="Nội dung bài viết"
        name="content"
        control={formReturn.control}
        rows={5}
      />

      <Select label="Nhóm" name="groupId" data={groupOption?.data || []} />

      <Button onClick={onSubmit}>{params.id ? "Cập nhật" : "Tạo mới"}</Button>
    </Stack>
  );
};
