import React, { useEffect } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { motion, useScroll } from "framer-motion";
import useResponsive from "../../hooks/useResponsive";
import { fades, scales } from "../../utils/motion/variants";
import Link from "next/link";

const ScrollTopBtn: React.FC = () => {
  const responsive = useResponsive();
  const isMobile: boolean = responsive === "xs";
  const isTablet: boolean = responsive === "sm";

  return (
    <Link href="/">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          y: isMobile || isTablet ? "-1rem" : "-2rem",
          ...fades.fadeIn,
          transition: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        whileHover={{ ...scales.scaleUp }}
        whileTap={{ ...scales.scaleDown }}
        className="fixed p-1 rounded-full cursor-pointer -bottom-2 right-2 md:-bottom-4 md:right-4 lg:p-2 bg-red-theme"
      >
        <IoMdArrowDropup className="text-lg md:text-2xl lg:text-3xl dark:text-white-theme-theme" />
      </motion.div>
    </Link>
  );
};

export default ScrollTopBtn;
