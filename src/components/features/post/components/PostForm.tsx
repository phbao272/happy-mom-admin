"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGetDetailPost } from "../hooks/use-get-detail-post";
import { Button, Stack, Text } from "@mantine/core";
import { Textarea } from "@/components/shared/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostSchema } from "../configs";
import { useGetGroupOption } from "../../group/hooks";
import { Select } from "@/components/shared/inputs/Select";
import { useMovePostToNewGroup } from "../hooks";

export const PostForm = () => {
  const formReturn = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      groupId: ""
    }
  });

  const params = useParams<{ id: string }>();
  const postQuery = useGetDetailPost(params.id);
  const { mutate, isPending } = useMovePostToNewGroup(params.id);

  console.log(formReturn.formState.errors);

  const groupOption = useGetGroupOption();

  useEffect(() => {
    if (postQuery.data) {
      formReturn.reset(postQuery.data);
    }
  }, [formReturn, postQuery.data]);

  const onSubmit = formReturn.handleSubmit((data) => {
    mutate({ groupId: data.groupId as string });
    console.log("data", data);
  });

  return (
    <Stack
      style={{
        maxWidth: 600
      }}
    >
      <Stack gap={0}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>tác giả</Text>
        <Text>{postQuery?.data?.author.username}</Text>
      </Stack>
      <Textarea
        disabled
        label="Nội dung bài viết"
        name="content"
        control={formReturn.control}
        rows={5}
      />

      <Select
        label="Nhóm"
        name="groupId"
        control={formReturn.control}
        data={groupOption?.data || []}
      />

      <Button onClick={onSubmit} disabled={!formReturn.formState.isDirty}>
        {params.id ? "Di chuyển đến group mới" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
