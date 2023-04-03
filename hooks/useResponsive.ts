import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

type Interface = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export default function useResponsive(): Interface {
  const is2xs: boolean = useMediaQuery("(min-width: 350px)");
  const isXs: boolean = useMediaQuery("(min-width: 480px)");
  const isSm: boolean = useMediaQuery("(min-width: 640px)");
  const isMd: boolean = useMediaQuery("(min-width: 768px)");
  const isLg: boolean = useMediaQuery("(min-width: 1024px)");
  const isXl: boolean = useMediaQuery("(min-width: 1280px)");
  const is2Xl: boolean = useMediaQuery("(min-width: 1536px)");

  if (is2Xl) return "2xl";
  if (isXl) return "xl";
  if (isLg) return "lg";
  if (isMd) return "md";
  if (isSm) return "sm";
  if (isXs) return "xs";
  if (is2xs) return "2xs";

  return "3xs";
}

export const useMobileTablet = (): boolean => {
  const responsive = useResponsive();

  return ["2xs", "xs", "sm", "md"].includes(responsive);
};

export const useDesktop = (): boolean => {
  const responsive = useResponsive();

  return ["lg", "xl", "2xl"].includes(responsive);
};
