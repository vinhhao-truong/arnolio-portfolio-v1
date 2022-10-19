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
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll();

  //Check and get scroll pos
  useEffect(() => {
    scrollYProgress.onChange((pos) => {
      if (pos > 0) {
        setIsScrolledDown(true);
        return;
      }
      setIsScrolledDown(false);
    });
  }, [scrollYProgress]);

  //If scrolled down, set show, else hide
  // useEffect(() => {
  //   if (scrollPosition > 0) {
  //     setIsScrolledDown(true);
  //     return;
  //   }

  //   setIsScrolledDown(false);
  // }, [scrollPosition]);

  return (
    <div className="block mx-auto max-w-[120rem] w-full px-8 md:px-[4.5rem]  xl:px-20">
      <Navigation
        className={`w-full sticky top-0 ${isScrollDown && "invisible"} z-10`}
      />
      {isScrollDown && <SideNav />}
      {children}
      <Footer />
      {isScrollDown && <ScrollTopBtn />}
      <Mask />
    </div>
  );
};

export default Layout;
