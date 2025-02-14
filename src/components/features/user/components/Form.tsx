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
import {
  useCreateOrUpdateUser,
  useGetDetailUser
} from "../hooks";
import { Select } from "@/components/shared/inputs/Select";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/libs/requests";

const serviceOptions = [
  { value: "1", label: "Gói dịch vụ 1" },
  { value: "2", label: "Gói dịch vụ 2" },
  { value: "3", label: "Gói dịch vụ 3" }
];

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

  const { data: subscriptionOptions } = useQuery<{
    id: string;
    title: string;
  }[]>({
    queryKey: ['subscriptionOptions'],
    queryFn: async () => {
      const res = await request.get('/subscriptions');
      return res.data;
    }
  });

  useEffect(() => {
    if (userQuery.data) {
      formReturn.reset({
        ...userQuery.data,
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
          Tên người dùng
        </Input.Label>
        <TextInput
          name="name"
          placeholder="nhập tên người dùng"
          control={formReturn.control}
        />
      </Stack>
      <Stack>
        <Input.Label required fw={600}>
          Tên đăng nhập
        </Input.Label>
        <TextInput
          name="username"
          placeholder="nhập tên người dùng"
          control={formReturn.control}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Mật khẩu
        </Input.Label>
        <Controller
          control={formReturn.control}
          name="password"
          render={({ field }) => (
            <TextInput {...field} error={formReturn.formState.errors.password?.message} />
          )}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Gói dịch vụ
        </Input.Label>
        <Select
          placeholder="chọn gói dịch vụ"
          name="role"
          control={formReturn.control}
          data={serviceOptions}
        />
      </Stack>

      <Button onClick={onSubmit} loading={isPending}>
        {params.id !== "create" ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
