import { theme } from "@libs/theme";
import { createTss } from "tss-react";

function useContext() {
  const myTheme = {
    ...theme,
  };

  // You can return anything here, you decide what's the context.
  return { myTheme };
}

export const { tss } = createTss({ useContext });

export const useGlobalStyles = tss.create({
  colorRed: {
    color: "red",
  },
});
