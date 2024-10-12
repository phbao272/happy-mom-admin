import React, { useState } from "react";
import {
  Button,
  Group,
  Text,
  Box,
  ActionIcon,
  Input,
  Stack,
  SimpleGrid,
  CloseButton,
  LoadingOverlay
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useFieldArray, Control } from "react-hook-form";
import { request } from "@/libs/requests";
import { TextInput } from "../inputs";
import MinusIcon from "@assets/svgs/minus.svg";
import Image from "next/image";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_FILE_SIZE
} from "@/libs/utils/files/image";

interface ImageUploaderProps {
  control: Control<any>;
  name: string;
}

interface PreviewImage {
  file: File;
  preview: string;
}

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await request.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export function ImageUploader({ control, name }: ImageUploaderProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (files: File[]) => {
    setError(null);
    const newPreviewImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
  };

  const handleReject = (fileRejections: any[]) => {
    const errorMessages = fileRejections.map((rejection) => {
      if (rejection.errors[0].code === "file-too-large") {
        return `File "${rejection.file.name}" vượt quá kích thước cho phép (10MB).`;
      } else if (rejection.errors[0].code === "file-invalid-type") {
        return `File "${rejection.file.name}" không đúng định dạng. Chỉ chấp nhận các file ảnh.`;
      }
      return `Lỗi khi tải lên file "${rejection.file.name}": ${rejection.errors[0].message}`;
    });

    setError(errorMessages.join(" "));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      for (const previewImage of previewImages) {
        const imageUrl = await uploadImage(previewImage.file);
        append({ url: imageUrl });
      }
      setPreviewImages([]);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Không thể tải ảnh lên. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePreview = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setPreviewImages([]);
    setError(null);
  };

  return (
    <Box>
      <Input.Label fw={600} mb={8}>
        Hình ảnh
      </Input.Label>

      <Box style={{ position: "relative" }}>
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Dropzone
          onDrop={handleDrop}
          onReject={handleReject}
          accept={ACCEPTED_IMAGE_TYPES}
          multiple
          maxSize={MAX_IMAGE_FILE_SIZE}
          mb="xs"
          styles={{
            root: {
              borderStyle: "dashed",
              borderWidth: "2px",
              height: "60px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              cursor: "pointer"
            }
          }}
        >
          <Text>Kéo thả hoặc nhấp để chọn ảnh</Text>
        </Dropzone>
      </Box>

      {error && (
        <Text c="red" size="sm" mb="xs">
          {error}
        </Text>
      )}

      {previewImages.length > 0 && (
        <>
          <SimpleGrid cols={3} spacing="md" mb="md">
            {previewImages.map((image, index) => (
              <Box key={index} style={{ position: "relative" }}>
                <Image
                  src={image.preview}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
                <CloseButton
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "white",
                    borderRadius: "50%"
                  }}
                  onClick={() => handleRemovePreview(index)}
                />
              </Box>
            ))}
          </SimpleGrid>

          <Group justify="flex-end" mb="md">
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button onClick={handleSave} loading={isLoading}>
              {isLoading ? "Đang tải lên..." : "Lưu"}
            </Button>
          </Group>
        </>
      )}

      <Stack gap={12} mt={12}>
        {fields.map((field, index) => (
          <Stack key={field.id} gap={2}>
            <TextInput
              readOnly
              name={`images.${index}.url`}
              control={control}
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
        ))}
      </Stack>
    </Box>
  );
}
