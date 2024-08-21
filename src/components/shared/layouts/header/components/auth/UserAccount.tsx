import cx from "clsx";
import { useState } from "react";
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  Modal,
  Stack,
  PasswordInput,
  Button
} from "@mantine/core";
import { IconLogout, IconChevronDown, IconUser } from "@tabler/icons-react";
import classes from "./Style.module.css";
import { redirect, useRouter } from "next/navigation";
import { handleSignOut } from "@/components/features/auth/login/authUtils";
import { IUser } from "@/libs/types/user";
import { signOut } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { ChangePasswordSchema, ChangePasswordType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/libs/utils/messages";
import { request } from "@/libs/requests";

interface Props {
  user?: IUser;
}

export function UserAccount({ user }: Props) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const {
    control: controlChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword },
    reset: resetChangePassword
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: ""
    }
  });

  const [
    openedChangePassword,
    { open: openChangePassword, close: closeChangePassword }
  ] = useDisclosure(false);

  const { mutateAsync: changePassword, isPending: isChangePassword } =
    useMutation({
      mutationFn: async (data: ChangePasswordType) => {
        const res = await request.patch(`/auth/change-password`, {
          new_password: data.new_password,
          current_password: data.current_password
        });
        return res.data;
      },
      onSuccess: () => {
        toast.success("Cập nhật mật khẩu thành công");

        closeChangePassword();
      },
      onError: (error: any) => {
        console.log(error);

        handleError(error);
      }
    });

  const onSubmitChangePassword = (data: ChangePasswordType) => {
    changePassword(data);
  };

  return (
    <>
      <Modal
        opened={openedChangePassword}
        onClose={() => {
          closeChangePassword();
          resetChangePassword();
        }}
        title="Đổi mật khẩu"
        centered
      >
        <Stack>
          <Controller
            control={controlChangePassword}
            name="current_password"
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu"
                error={errorsChangePassword.current_password?.message}
              />
            )}
          />

          <Controller
            control={controlChangePassword}
            name="new_password"
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu"
                error={errorsChangePassword.new_password?.message}
              />
            )}
          />

          <Controller
            control={controlChangePassword}
            name="confirm_password"
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                error={errorsChangePassword.confirm_password?.message}
              />
            )}
          />

          <Button
            loading={isChangePassword}
            onClick={handleSubmitChangePassword(onSubmitChangePassword)}
          >
            Đổi mật khẩu
          </Button>
        </Stack>
      </Modal>

      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened
            })}
          >
            <Group gap={7}>
              <Avatar
                src={
                  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
                }
                alt={"avatar"}
                radius="xl"
                size={20}
              />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user?.username}
              </Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconUser
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={() => openChangePassword()}
          >
            Đổi mật khẩu
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconLogout
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={async () => {
              await signOut({
                callbackUrl: "/login"
              });
              localStorage.removeItem("isLogin");
            }}
          >
            Đăng xuất
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
