"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button, Input, Stack } from "@mantine/core";
import { TextInput } from "@/components/shared/inputs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  type CreateUserSchema,
  defaultValues
} from "../configs/schemas";
import { useCreateOrUpdateUser, useGetDetailUser } from "../hooks";
import { Select } from "@/components/shared/inputs/Select";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/requests";

export const UserForm = () => {
  const formReturn = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: defaultValues
  });

  const params = useParams<{ id: string }>();

  const userQuery = useGetDetailUser(params.id);
  const { mutate, isPending } = useCreateOrUpdateUser(params.id);

  const onSubmit = formReturn.handleSubmit((data) => {
    mutate({ ...data });
  });

  const { data: subscriptionOptions } = useQuery<
    {
      id: string;
      title: string;
    }[]
  >({
    queryKey: ["subscriptionOptions"],
    queryFn: async () => {
      const res = await request.get("/subscriptions/admin");
      return res.data;
    }
  });

  useEffect(() => {
    if (userQuery.data) {
      formReturn.reset({
        ...userQuery.data,
        subscriptionId: userQuery.data.currentSubscriptionPackage.id
      });
    }
  }, [formReturn, userQuery.data]);

  return (
    <Stack
      style={{
        paddingLeft: 20,
        paddingRight: 20
      }}
    >
      <Stack>
        <Input.Label required fw={600}>
          Tên đăng nhập
        </Input.Label>
        <TextInput
          name="username"
          placeholder="nhập tên người dùng"
          control={formReturn.control}
          disabled
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Gói dịch vụ
        </Input.Label>
        <Select
          placeholder="chọn gói dịch vụ"
          name="subscriptionId"
          control={formReturn.control}
          data={subscriptionOptions?.map((item) => ({
            value: item.id,
            label: item.title
          }))}
        />
      </Stack>

      <Button onClick={onSubmit} loading={isPending}>
        {params.id !== "create" ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
