"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginInputSchema, LoginInputType } from "./types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleSignIn } from "./authUtils";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<LoginInputType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(LoginInputSchema)
  });

  const onSubmit = handleSubmit(async (value: LoginInputType, event) => {
    try {
      event?.preventDefault();
      setLoading(true);

      const res = await handleSignIn({
        email: value.email,
        password: value.password
      });

      if (res.status === "error") {
        toast.error(
          "Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!"
        );
        localStorage.removeItem("isLogin");
      } else if (res.status === "success") {
        toast.success(res.message);
        localStorage.setItem("isLogin", "true");
        router.push("/redirect");
      }
    } catch (error: any) {
      console.log("error login form", error);
      toast.error(error.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  });

  return (
    <Paper
      withBorder
      style={{
        bowShadow: "0 .375rem .75rem rgba(140,152,164,.075)"
      }}
      p={30}
      radius="md"
    >
      <Flex mb={"20px"} gap={"8px"} justify={"center"} align={"center"}>
        <Title
          order={3}
          style={{
            fontSize: "24px",
            color: "#333"
          }}
        >
          Sign in
        </Title>
      </Flex>

      <form
        method="post"
        onSubmit={onSubmit}
        action="/api/auth/callback/credentials"
        className="account-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              withAsterisk
              label={"Tài khoản"}
              value={value}
              onChange={onChange}
              error={errors.email?.message as string}
              radius="md"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              withAsterisk
              label="Mật khẩu"
              value={value}
              onChange={onChange}
              error={errors.password?.message as string}
              radius="md"
            />
          )}
        />

        <Button fullWidth type="submit" mt="xl" loading={loading}>
          Đăng nhập
        </Button>
      </form>
    </Paper>
  );
};
