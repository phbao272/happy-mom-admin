'use client'

import { uploadImage } from '@/libs/service'
import { Stack, Text } from '@mantine/core'
import { Editor, type IAllProps } from '@tinymce/tinymce-react'
import type React from 'react'
import { toast } from 'sonner'

type Props = {
  onChange: (value: string) => void
  value: string
  error?: string
  label?: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  innerRef?: any
} & IAllProps

export const MyEditor: React.FC<Props> = ({
  onChange,
  value,
  error,
  label,
  init,
  innerRef,
  ...props
}) => {
  const TINY_API_KEY = process.env.NEXT_PUBLIC_TINY_API_KEY

  const handleEditorChange = (content: string) => {
    onChange(content)
  }

  return (
    <Stack
      style={{
        width: '100%',
        gap: '6px',

        '& .toxTinymce': {
          borderRadius: '8px !important',
          overflow: 'hidden !important',
          border: '1px solid',
          borderColor: error ? '#fa5252' : '#ced4da',
        },
      }}
    >
      {label && (
        <Text
          style={{
            color: '#292929',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 600,
          }}
        >
          {label}
        </Text>
      )}
      {/* @ts-ignore */}
      <Editor
        apiKey={TINY_API_KEY}
        value={value}
        onInit={(e, editor) => {
          if (!editor) return

          if (innerRef) {
            innerRef(editor)
          }
        }}
        onEditorChange={handleEditorChange}
        init={{
          content_css_cors: true,
          width: '100%',
          height: 550,
          statusbar: false,
          menubar: false,
          powerpaste_allow_local_images: true,
          block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'insertdatetime',
            'media',
            'image',
            'table',
          ],

          toolbar:
            // 'undo redo | fontfamily fontsize blocks | forecolor backcolor bold italic underline | blockquote link bullist numlist customGallery alignleft aligncenter alignright alignjustify outdent indent',
            'undo redo | fontfamily fontsize blocks | forecolor backcolor bold italic underline | blockquote link bullist numlist image | alignleft aligncenter alignright alignjustify lineheight',
          // media table
          // quickbars_selection_toolbar:
          //   'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          file_picker_types: 'file image media',
          paste_data_images: false,
          font_size_input_default_unit: 'px',
          entity_encoding: 'raw',

          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap'); body { font-family: Roboto; font-size: 14px }",

          font_family_formats:
            'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Inter=inter; Oswald=oswald; Roboto=roboto; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',

          font_size_formats:
            '8px 9px 10px 11px 12px 14px 16px 18px 24px 32px 36px',

          file_picker_callback: (cb, _value, meta) => {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')

            if (meta.filetype === 'image') {
              input.setAttribute('accept', 'image/jpg,image/jpeg,image/png')
            } else if (meta.filetype === 'media') {
              input.setAttribute('accept', 'video/mp4')
            }

            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            input.addEventListener('change', async (e: any) => {
              const file = e?.target?.files[0]

              toast.promise(
                (async () => {
                  try {
                    const src = await uploadImage(file);
                    cb(src, { title: file.name })
                  } catch (error) {
                    console.log('error', error)

                    throw error instanceof Error
                      ? error.message
                      : 'Có lỗi xảy ra khi upload file'
                  }
                })(),
                {
                  loading: `Uploading ${file.name}...`,
                  success: `File ${file.name} uploaded successfully!`,
                  error: (error) => `Failed to upload ${file.name}: ${error}`,
                },
              )
            })
            input.click()
          },

          ...init,
        }}
        {...props}
      />
      {error && typeof error === 'string' && (
        <Text
          style={{
            color: '#fa5252',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 400,
          }}
        >
          {error}
        </Text>
      )}
    </Stack>
  )
}
