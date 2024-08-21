import { mq } from "@/libs/theme";
import { tss } from "@/libs/utils/tss-style";

export const useStyles = tss
  .withNestedSelectors<"dot" | "icon" | "link_parent">()
  .withName("navbar-links-group")
  .create(({ classes: { dot, icon, link_parent } }) => ({
    control: {
      fontWeight: 500,
      display: "block",
      width: "100%",
      padding: "12px 16px",
      color: "#132144",
      fontSize: "14px",
      transition: "all 0.3s ease-in-out",
      textTransform: "capitalize",

      "&:hover": {
        // backgroundColor: "rgba(0, 0, 0, 0.1)",
        // color: "#fff !important",

        [`.${icon}`]: {
          // color: "#fff",
          transition: "transform 0.3s ease"
        },

        [`.${link_parent}`]: {
          // color: "#fff"
        }
      }
    },

    link_parent: {
      color: "#132144",
      transition: "all 0.3s ease-in-out"
    },

    link: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      textDecoration: "none",
      padding: "12px 16px",
      marginLeft: 32,
      fontSize: 14,
      borderLeft: "2px solid rgba(231,234,243,.7)",
      position: "relative",
      textTransform: "capitalize",

      color: "#132144",
      backgroundColor: "unset",
      transition: "all 0.3s ease-in-out",

      "&:hover": {
        // color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out"

        // [`.${dot}`]: {
        //   border: "none",
        //   scale: "1.01",
        //   transition: "all 1s ease"
        // }
      },

      [`${mq.sm}`]: {
        marginLeft: 0
      }
    },

    link_active: {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      color: "#377dff",
      transition: "all 0.3s ease-in-out",

      "&:hover": {
        // backgroundColor: "rgba(0, 0, 0, 0.1)",
        // color: "white",
        transition: "all 0.3s ease-out"
      }
    },

    link_child_active: {
      // color: "#fff",
      backgroundColor: "rgba(189, 197, 209, .2)"
    },

    chevron: {
      transition: "transform 0.3s ease",
      color: "#132144"
    },

    dot: {
      position: "absolute",
      width: "0.4rem",
      height: "0.4rem",
      backgroundColor: "#132144",
      left: "0",
      top: "50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #333",
      borderRadius: "50%",
      zIndex: "1",
      transition: "all 1s ease"
    },

    icon: {
      color: "#132144",
      transition: "transform 0.3s ease",
      width: "14px",
      height: "14px"
    }
  }));
