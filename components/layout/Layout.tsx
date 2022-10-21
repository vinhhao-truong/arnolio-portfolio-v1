import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import Mask from "../Mask";
import Footer from "./Footer";
import Navigation from "./Navigation";
import ScrollTopBtn from "./ScrollTopBtn";
import SideNav from "./SideNav";

const Layout: React.FC<ReactProps> = ({ children }) => {
  const [isScrollDown, setIsScrolledDown] = useState<boolean>(false);
  const { scrollY } = useScroll();

  //Check and get scroll pos
  useEffect(() => {
    scrollY.onChange((pos) => {
      if (pos > 0) {
        setIsScrolledDown(true);
        // console.log(pos);
        return;
      }
      setIsScrolledDown(false);
    });
  }, [scrollY, isScrollDown]);

  return (
    <div className="flex-col items-center">
      <Navigation
        className={`w-full sticky top-0 z-10 max-w-[120rem] px-8 md:px-[9rem] xl:px-40`}
      />
      <SideNav />
      {children}
      <Footer />
      {isScrollDown && <ScrollTopBtn />}
      <Mask />
    </div>
  );
};

export default Layout;
