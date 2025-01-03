"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button, Input, Stack } from "@mantine/core";
import {
  DateInputCustom,
  MyEditor,
  Textarea,
  TextInput
} from "@/components/shared/inputs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createDealSchema,
  DealSchema,
  defaultValues
} from "../configs/schemas";

export const EventForm = () => {
  const formReturn = useForm<DealSchema>({
    resolver: zodResolver(createDealSchema),
    defaultValues: defaultValues
  });

  return (
    <Stack
      style={{
        paddingLeft: 20,
        paddingRight: 20
      }}
    >
      {/* <Stack>
        <Textarea
          name="imageUrl"
          placeholder="nhập mô tả"
          control={formReturn.control}
          rows={5}
        />
      </Stack> */}
      <Stack>
        <Input.Label required fw={600}>
          Tên sự kiện
        </Input.Label>
        <TextInput
          name="name"
          placeholder="nhập tên nhiệm vụ"
          control={formReturn.control}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Mô tả sự kiện
        </Input.Label>
        <Controller
          control={formReturn.control}
          name="description"
          render={({ field }) => (
            <MyEditor {...field} error={formReturn.formState.errors.description?.message} />
          )}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Ngày kết thúc
        </Input.Label>
        <DateInputCustom
          name="expiredAt"
          control={formReturn.control}
          placeholder="Chọn ngày kết thúc"
          valueFormat="DD/MM/YYYY"
          onChange={(date) =>
            formReturn.setValue("expiredAt", date?.toISOString() || "")
          }
        />
      </Stack>

      <Button>Tạo mới</Button>
    </Stack>
  );
};
