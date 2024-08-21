"use client";

import { Box, Container } from "@mantine/core";
import { LoginForm } from "./LoginForm";
import Style from "./Style.module.css";

export const Login = () => {
  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "url(/login.svg) no-repeat top center fixed",
          backgroundSize: "cover",
          zIndex: -1
        }}
      />
      <Container size={500} className={Style["login-container"]}>
        <LoginForm />
      </Container>
    </Box>
  );
};
