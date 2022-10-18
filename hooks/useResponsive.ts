import { useMediaQuery } from "react-responsive";
import ResponsiveEnum from "../interfaces/ResponsiveEnum";

export default function useResponsive(): ResponsiveEnum {
  const isXs: boolean = useMediaQuery({ query: "(max-width: 639px)" });
  const isSm: boolean = useMediaQuery({ query: "(max-width: 767px)" });
  const isMd: boolean = useMediaQuery({ query: "(max-width: 1023px)" });
  const isLg: boolean = useMediaQuery({ query: "(max-width: 1279px)" });
  const isXl: boolean = useMediaQuery({ query: "(max-width: 1535px)" });

  if (isXs) {
    return ResponsiveEnum.Xs;
  }

  if (isSm) {
    return ResponsiveEnum.Sm;
  }

  if (isMd) {
    return ResponsiveEnum.Md;
  }

  if (isLg) {
    return ResponsiveEnum.Lg;
  }

  if (isXl) {
    return ResponsiveEnum.Xl;
  }

  return ResponsiveEnum["2xl"];
}
