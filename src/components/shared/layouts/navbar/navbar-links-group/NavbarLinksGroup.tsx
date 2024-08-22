"use client";

import {
  Box,
  Collapse,
  Group,
  ThemeIcon,
  UnstyledButton,
  rem
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStyles } from "./navbar-links-group.style";

interface LinksGroupProps {
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
  icon?: React.FC<any>;
  closeNavbar: () => void;
}

export function LinksGroup({
  label,
  initiallyOpened,
  links,
  link,
  icon: Icon,
  closeNavbar
}: LinksGroupProps) {
  const { classes } = useStyles();

  const pathname = usePathname();
  const [active, setActive] = useState<string>(pathname);
  const router = useRouter();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={`${classes.link} ${
        active === link.link ? classes.link_child_active : ""
      }`}
      href={link.link}
      key={link.label}
      onClick={closeNavbar}
    >
      {/* <Box className={classes.dot} /> */}
      {link.label}
    </Link>
  ));

  const onClick = () => {
    if (link) {
      router.push(link);
      closeNavbar();
    }
  };

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={`${classes.control} ${
          active === link || links?.some((l) => l.link === active)
            ? classes.link_active
            : ""
        }`}
      >
        <Group
          style={{
            justifyContent: "space-between",
            gap: 0
          }}
        >
          <Box
            onClick={onClick}
            style={{
              display: "flex",
              alignItems: "center",

              ...(!hasLinks
                ? {
                    width: "100%",
                    height: "100%"
                  }
                : {
                    width: "calc(100% - 24px)",
                    height: "100%"
                  })
            }}
          >
            {Icon && (
              <ThemeIcon
                variant="transparent"
                className={classes.icon}
                size={24}
              >
                <Icon style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            )}

            <Box ml="md" className={classes.link_parent}>
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(14),
                height: rem(14),
                transform: opened ? "rotate(-90deg)" : "rotate(90deg)"
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
