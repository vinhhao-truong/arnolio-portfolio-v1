import { useEffect, useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import Footer from "./Footer";
import Navigation from "./Navigation";
import ScrollTopBtn from "./ScrollTopBtn";

const Layout: React.FC<ReactProps> = ({ children }) => {
  const [isScrollDown, setIsScrolledDown] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  //Check and get scroll pos
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  //If scrolled down, set show, else hide
  useEffect(() => {
    if (scrollPosition > 0) {
      setIsScrolledDown(true);
      return;
    }

    setIsScrolledDown(false);
  }, [scrollPosition]);

  return (
    <div className="block mx-auto max-w-[100rem] w-full px-8 lg:px-32 xl:px-40">
      <Navigation
        className={`w-full sticky top-0 ${isScrollDown && "invisible"}`}
      />
      {children}
      <Footer />
      {isScrollDown && <ScrollTopBtn />}
    </div>
  );
};

export default Layout;
