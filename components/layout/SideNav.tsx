import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import { getClasses } from "../../utils/getProps";
import Link from "next/link";
import { motion, TargetAndTransition } from "framer-motion";
import useResponsive from "../../hooks/useResponsive";
import ResponsiveEnum from "../../interfaces/ResponsiveEnum";

// const Logo: React.FC<LogoProps> = () => {
//   return
// }

const SideNav: React.FC<ReactProps> = ({ className }) => {
  const responsive: ResponsiveEnum = useResponsive();
  const isMobile = responsive === "xs";

  return (
    <motion.div
      className={`${getClasses(className)} fixed top-4 -left-6 `}
      whileInView={{ x: isMobile ? "1.75rem" : "2.5rem" }}
    >
      <Link href="/">
        <motion.img
          className="h-6 md:h-8 lg:h-12 cursor-pointer"
          src="/circle-icon/android-chrome-512x512.png"
          alt="logo"
          whileHover={{ scale: 1.2 }}
        />
      </Link>
    </motion.div>
  );
};

export default SideNav;
