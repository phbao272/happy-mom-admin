'use client'

import { uploadImage } from '@/libs/service'
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

export function SingleImageUploader<T extends FieldValues>({
  control,
  name,
}: ImageUploaderProps<T>) {
  const {
    field,
    fieldState: { error: errorTextField },
  } = useController({ name, control })

  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDrop = (files: File[]) => {
    setError(null)
    if (files.length > 0) {
      const file = files[0]
      setPreviewImage({
        file,
        preview: URL.createObjectURL(file),
      })
    }
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
    if (!previewImage) return

    setIsLoading(true)
    setError(null)
    try {
      const imageUrl = await uploadImage(previewImage.file)
      field.onChange(imageUrl)
      setPreviewImage(null)
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Không thể tải ảnh lên. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemovePreview = () => {
    setPreviewImage(null)
    setError(null)
  }

  const handleRemoveUploaded = () => {
    field.onChange('')
  }

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
          multiple={false}
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

      {previewImage && (
        <Box style={{ position: 'relative', marginTop: '1rem' }}>
          <Image
            src={previewImage.preview}
            alt="Preview"
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
            onClick={handleRemovePreview}
          />
          <Group justify="flex-end" mt="md">
            <Button onClick={handleRemovePreview} variant="outline">
              Hủy
            </Button>
            <Button variant='filled' onClick={handleSave} loading={isLoading}>
              {isLoading ? 'Đang tải lên...' : 'Lưu'}
            </Button>
          </Group>
        </Box>
      )}

      <Box mt={12}>
        {field.value && (
          <Box mt={12} style={{ position: 'relative' }}>
            <Image
              src={field.value}
              alt="Uploaded image"
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
              onClick={handleRemoveUploaded}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
