import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import { getClasses } from "../../utils/getProps";
import { motion } from "framer-motion";
import Link from "next/link";
import { TargetAndTransition } from "framer-motion";

const logoMotion: TargetAndTransition = {
  x: 30,
};

interface LogoProps extends ReactProps {
  imgSrc: string;
  tooltipText?: string;
}
// const Logo: React.FC<LogoProps> = () => {
//   return
// }

const SideNav: React.FC<ReactProps> = ({ className }) => {
  const MotionLink = motion(Link);

  return (
    <motion.div
      className={`${getClasses(className)} fixed top-4 left-4`}
      initial={{ x: -20 }}
      animate={{ x: 0 }}
    >
      <Link href="/">
        <motion.a
          className="h-full hover:cursor-pointer"
          whileHover={logoMotion}
        >
          <motion.img
            className="h-10"
            src="/circle-icon/android-chrome-512x512.png"
            alt="logo"
          />
        </motion.a>
      </Link>
    </motion.div>
  );
};

export default SideNav;
