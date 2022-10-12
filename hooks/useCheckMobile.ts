import { useMediaQuery } from "react-responsive";

export default function useCheckMobile(): boolean {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return isMobile;
}
