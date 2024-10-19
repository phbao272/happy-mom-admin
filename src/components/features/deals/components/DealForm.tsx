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
import { useCreateOrUpdateDeal } from "../hooks/useCreateOrUpdateDeal";
import { useGetDetailDeal } from "../hooks";
import { createDealSchema, defaultValues, DealSchema } from "../configs";
import { Select } from "@/components/shared/inputs/Select";

export const DealForm = () => {
  const formReturn = useForm<DealSchema>({
    resolver: zodResolver(createDealSchema),
    defaultValues: defaultValues
  });

  const params = useParams<{ id: string }>();
  const dealQuery = useGetDetailDeal(params.id);
  const { mutate, isPending } = useCreateOrUpdateDeal(params.id);

  const onSubmit = formReturn.handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (dealQuery.data) {
      formReturn.reset({
        ...dealQuery.data
      });
    }
  }, [formReturn, dealQuery.data]);

  return (
    <Stack
      style={{
        paddingLeft: 20,
        paddingRight: 20
      }}
    >
      <Stack>
        <Input.Label required fw={600}>
          Ảnh ưu đãi
        </Input.Label>
        <SingleImageUploader name="imageUrl" control={formReturn.control} />
      </Stack>
      <Stack>
        <Input.Label required fw={600}>
          Tên ưu đãi
        </Input.Label>
        <TextInput
          name="name"
          placeholder="nhập tên deal"
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

      <Stack>
        <Input.Label required fw={600}>
          Loại ưu đãi
        </Input.Label>
        <Select
          name="type"
          control={formReturn.control}
          placeholder="Chọn loại ưu đãi"
          data={[
            { value: "FOOD", label: "Ẩm thực" },
            { value: "FASHION", label: "Thời trang" },
            { value: "TRAVEL", label: "Du lịch" },
            { value: "FINANCE", label: "Tài chính" }
          ]}
        />
      </Stack>

      <Button onClick={onSubmit}>
        {params.id !== "create" ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Stack>
  );
};
