import React, { useEffect } from "react";
import ReactProps from "../../interfaces/ReactProps";
import { getClasses } from "../../utils/getProps";
import Link from "next/link";
import { motion, TargetAndTransition, useScroll } from "framer-motion";
import useResponsive from "../../hooks/useResponsive";
import ResponsiveEnum from "../../interfaces/ResponsiveEnum";
import { scales } from "../motion/variants";
import NavItemInterface from "../../interfaces/NavItemInterface";
import { SiAboutdotme } from "react-icons/si";
import { GoRocket } from "react-icons/go";
import { SiMinutemailer } from "react-icons/si";
import { useDispatch } from "react-redux";
import { onMasked, offMasked } from "../../redux/globalStateSlice";
import ReactTooltip from "react-tooltip";

const menu: NavItemInterface[] = [
  {
    title: "About",
    url: "#about",
    icon: <SiAboutdotme className="w-2/3 h-2/3" />,
  },
  {
    title: "Projects",
    url: "#projects",
    icon: <GoRocket className="w-2/3 h-2/3" />,
  },
  {
    title: "Contact",
    url: "#contact",
    icon: <SiMinutemailer className="w-2/3 h-2/3" />,
  },
];

const SideNav: React.FC<ReactProps> = ({ className }) => {
  const responsive: ResponsiveEnum = useResponsive();
  const isMobile = responsive === "xs";
  const isTablet = responsive === "lg";

  const dispatch = useDispatch();

  return (
    <motion.div
      className={`${getClasses(className)} fixed top-4 -left-6 z-10`}
      animate={{ x: isMobile ? "1.75rem" : "2.5rem" }}
    >
      <Link href="/">
        <motion.img
          className="h-6 mb-8 cursor-pointer md:h-8 lg:h-12"
          src="/circle-icon/android-chrome-512x512.png"
          alt="logo"
          whileHover={{ ...scales.scaleUp }}
          whileTap={{ ...scales.scaleDown }}
        />
      </Link>
      {menu.map((nav: NavItemInterface, idx: number) => (
        <div key={idx}>
          <Link key={idx} href={nav.url} scroll={false}>
            <motion.div
              data-tip
              data-for={`side-nav-${idx}`}
              whileHover={{
                width: isMobile ? "2rem" : isTablet ? "3rem" : "4rem",
                height: isMobile ? "2rem" : isTablet ? "3rem" : "4rem",
              }}
              whileTap={{ ...scales.scaleDown }}
              className="flex items-center justify-center w-6 h-6 mt-4 rounded-lg cursor-pointer text-red-them md:h-6 lg:h-10 md:w-6 lg:w-10 bg-red-theme"
            >
              {nav.icon}
            </motion.div>
          </Link>
          <ReactTooltip
            effect="float"
            type="light"
            place="right"
            id={`side-nav-${idx}`}
          >
            {nav.title}
          </ReactTooltip>
        </div>
      ))}
    </motion.div>
  );
};

export default SideNav;
