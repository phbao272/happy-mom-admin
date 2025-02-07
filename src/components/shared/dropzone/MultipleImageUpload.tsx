'use client'

import { uploadMultipleImage } from '@/libs/service'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE } from '@/libs/utils/constants'
import {
  Box,
  Button,
  CloseButton,
  Group,
  LoadingOverlay,
  Text,
} from '@mantine/core'
import { Dropzone, type FileRejection } from '@mantine/dropzone'
import Image from 'next/image'
import { useState } from 'react'
import { useController } from 'react-hook-form'
import type { Control, Path } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'

interface ImageUploaderProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
}

interface PreviewImage {
  file: File
  preview: string
}

export function MultipleImageUpload<T extends FieldValues>({
  control,
  name,
}: ImageUploaderProps<T>) {
  const {
    field,
    fieldState: { error: errorTextField },
  } = useController({ name, control })

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDrop = (files: File[]) => {
    setError(null)
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setPreviewImages((prev) => [...prev, ...newPreviews])
  }

  const handleReject = (fileRejections: FileRejection[]) => {
    const errorMessages = fileRejections.map((rejection) => {
      if (rejection.errors[0].code === 'file-too-large') {
        return `File "${rejection.file.name}" vượt quá kích thước cho phép (10MB).`
      }
      if (rejection.errors[0].code === 'file-invalid-type') {
        return `File "${rejection.file.name}" không đúng định dạng. Chỉ chấp nhận các file ảnh.`
      }
      return `Lỗi khi tải lên file "${rejection.file.name}": ${rejection.errors[0].message}`
    })

    setError(errorMessages.join(' '))
  }

  const handleSave = async () => {
    if (previewImages.length === 0) return

    setIsLoading(true)
    setError(null)
    try {
      const files = previewImages.map((image) => image.file)
      const imageUrls = await uploadMultipleImage(files)
      const existingUrls = Array.isArray(field.value) ? field.value : []
      field.onChange([...existingUrls, ...imageUrls])
      setPreviewImages([])
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Không thể tải ảnh lên. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemovePreview = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    if (previewImages.length === 1) {
      setError(null)
    }
  }

  const handleRemoveUploaded = (index: number) => {
    const currentUrls = [...field.value]
    currentUrls.splice(index, 1)
    field.onChange(currentUrls)
  }

  console.log(field.value)

  return (
    <Box>
      <Box style={{ position: 'relative' }}>
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Dropzone
          onDrop={handleDrop}
          onReject={handleReject}
          accept={ACCEPTED_IMAGE_TYPES}
          multiple={true}
          maxSize={MAX_IMAGE_FILE_SIZE}
          mb="xs"
          styles={{
            root: {
              borderStyle: 'dashed',
              borderWidth: '2px',
              height: '60px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              cursor: 'pointer',
            },
          }}
        >
          <Text>Kéo thả hoặc nhấp để chọn ảnh</Text>
        </Dropzone>
      </Box>

      {(error || errorTextField?.message) && (
        <Text c="red" size="sm" mb="xs">
          {error || errorTextField?.message}
        </Text>
      )}

      {previewImages.length > 0 && (
        <Box style={{ position: 'relative', marginTop: '1rem' }}>
          <Group gap="md">
            {previewImages.map((image, index) => (
              <Box key={index} style={{ position: 'relative' }}>
                <Image
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
                <CloseButton
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    background: 'white',
                    borderRadius: '50%',
                  }}
                  onClick={() => handleRemovePreview(index)}
                />
              </Box>
            ))}
          </Group>
          <Group justify="flex-end" mt="md">
            <Button onClick={() => setPreviewImages([])} variant="outline">
              Hủy tất cả
            </Button>
            <Button onClick={handleSave} loading={isLoading}>
              {isLoading ? 'Đang tải lên...' : 'Lưu'}
            </Button>
          </Group>
        </Box>
      )}

      <Box mt={12}>
        {Array.isArray(field.value) && field.value.length > 0 && (
          <Group gap="md">
            {field.value.map((url: string, index: number) => (
              <Box key={index} style={{ position: 'relative' }}>
                <Image
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
                <CloseButton
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    background: 'white',
                    borderRadius: '50%',
                  }}
                  onClick={() => handleRemoveUploaded(index)}
                />
              </Box>
            ))}
          </Group>
        )}
      </Box>
    </Box>
  )
}
