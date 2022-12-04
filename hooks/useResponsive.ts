import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ResponsiveEnum from "../interfaces/ResponsiveEnum";

type Responsive = "sm" | "xs" | "md" | "lg" | "xl" | "2xl";

export default function useResponsive(): ResponsiveEnum {
  const is2xs: boolean = useMediaQuery({ query: "(max-width: 479px)" });
  const isXs: boolean = useMediaQuery({ query: "(max-width: 639px)" });
  const isSm: boolean = useMediaQuery({ query: "(max-width: 767px)" });
  const isMd: boolean = useMediaQuery({ query: "(max-width: 1023px)" });
  const isLg: boolean = useMediaQuery({ query: "(max-width: 1279px)" });
  const isXl: boolean = useMediaQuery({ query: "(max-width: 1535px)" });

  const [screen, setScreen] = useState<ResponsiveEnum>(ResponsiveEnum["2xl"]);

  useEffect(() => {
    if (is2xs) {
      setScreen(ResponsiveEnum["2xs"]);
      return;
    }

    if (isXs) {
      setScreen(ResponsiveEnum.Xs);
      return;
    }

    if (isSm) {
      setScreen(ResponsiveEnum.Sm);
      return;
    }

    if (isMd) {
      setScreen(ResponsiveEnum.Md);
      return;
    }

    if (isLg) {
      setScreen(ResponsiveEnum.Lg);
      return;
    }

    if (isXl) {
      setScreen(ResponsiveEnum.Xl);
      return;
    }
  }, [isXl, isSm, isLg, isMd, isXs, is2xs]);

  return screen;
}

export const useMobileTablet = (): boolean => {
  const responsive = useResponsive();

  return ["2xs", "xs", "sm", "md"].includes(responsive);
};

export const useDesktop = (): boolean => {
  const responsive = useResponsive();

  return ["lg", "xl", "2xl"].includes(responsive);
};
