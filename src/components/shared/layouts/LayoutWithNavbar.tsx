"use client";

import { AppShell, AppShellMain, Burger } from "@mantine/core";
import classes from "@/components/shared/layouts/Layout.module.css";
import { MainPaper } from "@/components/shared/layouts/main-paper";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "./navbar";
import { Header } from "./header";
import { isMobile } from "react-device-detect";

interface LayoutProps {
  children: React.ReactNode;
  role?: string;
}

const LayoutWithNavbar = ({ children, role }: LayoutProps) => {
  const [opened, { toggle, close: closeNavbar }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: isMobile ? 150 : 76 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      }}
      padding="md"
      layout="alt" // layout="alt" is used to make the navbar sticky
    >
      <AppShell.Header>
        <Header toggle={toggle} opened={opened} role={role as string} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar
          toggle={toggle}
          opened={opened}
          role={role as string}
          closeNavbar={closeNavbar}
        />
      </AppShell.Navbar>

      <AppShellMain className={classes.layout}>
        <MainPaper>{children}</MainPaper>
      </AppShellMain>
    </AppShell>
  );
};

export { LayoutWithNavbar };
