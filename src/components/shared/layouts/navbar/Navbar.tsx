"use client";

import { Burger, Skeleton, Transition } from "@mantine/core";
import { LinksGroup } from "./navbar-links-group/NavbarLinksGroup";
import { Suspense, useMemo } from "react";
import {
  IconBell,
  IconBook,
  IconDiscount,
  IconStar,
  IconTools,
  IconTrophy,
  IconUsers,
} from "@tabler/icons-react";
import { useStyles } from "./navbar.style";
import { ROLES } from "@/libs/utils/constants/roles";
import { Auth } from "../header/components";

export interface INavbar {
  label: string;
  icon: React.FC<any>;
  link?: string;
  links?: {
    label: string;
    link: string;
  }[];
}

const adminVietnameseSideBar = [
  {
    label: "Cẩm nang",
    icon: IconBook,
    links: [
      {
        label: "Quản lý bài viết",
        link: "/admin/quan-ly-bai-viet"
      }
    ]
  },
  {
    label: "Cộng đồng",
    icon: IconUsers,
    links: [
      {
        label: "Quản lý group",
        link: "/admin/quan-ly-group"
      }
    ]
  },
  {
    label: "Deals",
    icon: IconDiscount,
    links: [
      {
        label: "Quản lý deals",
        link: "/admin/quan-ly-deals"
      }
    ]
  },
  {
    label: "Tính điểm (Point) & Nhiệm vụ, đổi quà",
    icon: IconStar,
    links: [
      {
        label: "Tính điểm",
        link: "/admin/tinh-diem"
      },
      {
        label: "Nhiệm vụ",
        link: "/admin/nhiem-vu"
      },
      {
        label: "Đổi quà",
        link: "/admin/doi-qua"
      }
    ]
  },
  {
    label: "Công cụ",
    link: "/admin/cong-cu",
    icon: IconTools
  },
  {
    label: "Cuộc thi/Sự kiện",
    icon: IconTrophy,
    links: [
      {
        label: "Quản lý cuộc thi, sự kiện",
        link: "/admin/quan-ly-cuoc-thi-su-kien"
      }
    ]
  },
  {
    label: "Thông Báo",
    icon: IconBell,
    links: [
      {
        label: "Thông báo theo kịch bản",
        link: "/admin/thong-bao/kich-ban"
      },
      {
        label: "Thông báo của hệ thống",
        link: "/admin/thong-bao/he-thong"
      }
    ]
  }
];

const SideBarByRole = {
  [ROLES.ADMIN]: adminVietnameseSideBar
};

interface Props {
  toggle?: () => void;
  closeNavbar: () => void;
  opened?: boolean;
  role: string;
}

export const Navbar = ({ opened, role, toggle, closeNavbar }: Props) => {
  const { classes } = useStyles();

  const links = useMemo(() => {
    const sideBar = SideBarByRole[role as keyof typeof SideBarByRole];

    return sideBar?.map((item) => (
      <LinksGroup {...item} key={item.label} closeNavbar={closeNavbar} />
    ));
  }, [role, closeNavbar]);

  return (
    <>
      <nav className={classes.navbar_desktop}>
        <div className={classes.links_inner}>{links}</div>
      </nav>

      <Transition
        transition="pop-top-left"
        duration={200}
        mounted={!!opened}
        keepMounted={true}
      >
        {(styles) => (
          <nav style={styles} className={classes.navbar_mobile}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              p={8}
              style={{
                margin: "12px 12px 0px 12px"
              }}
            />
            <Suspense fallback={<Skeleton height={24} circle />}>
              <Auth />
            </Suspense>
            <div className={classes.links_inner}>{links}</div>
          </nav>
        )}
      </Transition>
    </>
  );
};
