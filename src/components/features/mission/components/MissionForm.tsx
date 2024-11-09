"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button, Input, Stack } from "@mantine/core";
import {
  DateInputCustom,
  Textarea,
  TextInput
} from "@/components/shared/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleImageUploader } from "@/components/shared/ImageDropzone";
import { Select } from "@/components/shared/inputs/Select";
import {
  createDealSchema,
  DealSchema,
  defaultValues
} from "../configs/schemas";

export const MissionForm = () => {
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
          Tên nhiệm vụ
        </Input.Label>
        <TextInput
          name="name"
          placeholder="nhập tên nhiệm vụ"
          control={formReturn.control}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Mô tả nhiệm vụ
        </Input.Label>
        <Textarea
          name="description"
          placeholder="nhập mô tả"
          control={formReturn.control}
          rows={5}
        />
      </Stack>

      <Stack>
        <Input.Label required fw={600}>
          Ngày hết hạn
        </Input.Label>
        <DateInputCustom
          name="expiredAt"
          control={formReturn.control}
          placeholder="Chọn ngày hết hạn"
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
