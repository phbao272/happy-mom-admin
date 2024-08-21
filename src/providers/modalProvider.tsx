"use client";

import React from "react";
import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";
import { ModalConfirmPay } from "@shared/modals";

interface Props {
  children: React.ReactNode;
}

const ModalsProvider = ({ children }: Props) => {
  return (
    <MantineModalsProvider modals={{ confirmPay: ModalConfirmPay }}>
      {children}
    </MantineModalsProvider>
  );
};

export default ModalsProvider;
