import { mq } from "@/libs/theme";
import { tss } from "@/libs/utils/tss-style";

export const useStyles = tss.create(() => ({
  navbar_desktop: {
    height: "100%",
    backgroundColor: "white",
    overflowY: "auto",

    [`${mq.sm}`]: {
      display: "none"
    }
  },

  navbar_mobile: {
    display: "none",

    [`${mq.sm}`]: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      height: "100%",
      backgroundColor: "white",
      overflowY: "auto"
    }
  },

  links: {
    flex: 1,
    marginLeft: "calc(16px * -1)",
    marginRight: "calc(16px * -1)",

    [`${mq.sm}`]: {
      marginLeft: 0,
      marginRight: 0
    }
  },

  links_inner: {
    // Add padding for the links
    // padding: "16px",
  }
}));
