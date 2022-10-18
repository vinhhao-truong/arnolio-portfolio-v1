import React, { useEffect } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { motion, useScroll } from "framer-motion";
import useResponsive from "../../hooks/useResponsive";

const ScrollTopBtn: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const responsive = useResponsive();
  const isMobile: boolean = responsive === "xs";
  const isTablet: boolean = responsive === "sm";

  return (
    <motion.div
      animate={{ y: isMobile || isTablet ? "-1rem" : "-2rem" }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      className="fixed -bottom-2 right-2 md:-bottom-4 md:right-4 cursor-pointer p-1 lg:p-2 bg-red-theme rounded-full"
      onClick={() => {
        if (window) {
          if (scrollYProgress.get() > 0) window.scrollTo(0, 0);
        }
      }}
    >
      <IoMdArrowDropup className="text-lg md:text-2xl lg:text-3xl text-white-theme" />
    </motion.div>
  );
};

export default ScrollTopBtn;
