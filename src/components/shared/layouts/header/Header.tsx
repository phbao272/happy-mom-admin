"use client";

import { Burger, Flex, Group, Image, Skeleton, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tss } from "@libs/utils/tss-style";
import { Auth } from "./components";
import { MainContainer } from "@shared/layouts";
import { isMobile } from "react-device-detect";
import { Suspense } from "react";
import LogoSvg from "@/assets/svgs/logo.svg";

interface Props {
  toggle?: () => void;
  opened?: boolean;
  role: string;
}

const HEADER = [
  {
    title: "",
    href: "/"
  }
];

export function Header({ opened, toggle, role }: Props) {
  const pathname = usePathname();
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <MainContainer>
        <Group
          h="100%"
          px="md"
          style={{
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Image
            src={LogoSvg.src}
            alt="logo"
            style={{
              height: 60
            }}
          />

          <Flex
            style={{
              gap: 40,
              alignItems: "center"
            }}
          >
            {HEADER.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`${classes.header_nav_link} ${
                  pathname === item.href ? "active" : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </Flex>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {!isMobile && (
            <Flex
              style={{
                gap: 12,
                alignItems: "center"
              }}
            >
              <Suspense fallback={<Skeleton height={24} circle />}>
                <Auth />
              </Suspense>
            </Flex>
          )}
        </Group>
      </MainContainer>
    </header>
  );
}

const useStyles = tss.create(() => ({
  header: {
    padding: "8px 0px",
    zIndex: 1000,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
  },

  header_nav_link: {
    color: "#616161",
    fontSize: "18px",
    fontWeight: 700,
    textDecoration: "none",

    "&.active": {
      color: "#fe9744"
    },

    "&:hover": {
      color: "#fe9744"
    }
  }
}));
