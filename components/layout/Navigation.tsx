import Image from "next/image";
import Link from "next/link";
import NavItemInterface from "../../interfaces/NavItemInterface";
import ReactProps from "../../interfaces/ReactProps";
import { motion, useScroll } from "framer-motion";
import { getClasses } from "../../utils/getProps";
import { useEffect, useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { fades, scales } from "../../utils/motion/variants";
import Section from "../Section";
import { useSelector } from "react-redux";
import { selectGlobalState } from "../../redux/globalStateSlice";

interface NavigationProps extends ReactProps {
  menu?: NavItemInterface[];
}
const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const { navMenu } = useSelector(selectGlobalState);

  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const responsive = useResponsive();
  const isMobile: boolean = responsive === "xs" || responsive === "sm";

  const MotionSection = motion(Section);

  useEffect(() => {
    return scrollY.onChange((pos) => {
      if (pos > 0) {
        setIsHidden(true);
        return;
      }
      setIsHidden(false);
    });
  }, [scrollY]);

  return (
    <>
      {!isMobile && (
        <motion.div
          className={`${getClasses(
            className
          )} w-full flex justify-between h-20 items-center py-3`}
          initial={{ y: "-1rem", opacity: 0, display: "none" }}
          animate={
            !isHidden
              ? {
                  ...fades.fadeIn,
                  y: 0,
                  display: "flex",
                  transition: { duration: 0.3, ease: "easeIn", delay: 0.1 },
                }
              : {
                  ...fades.fadeOut,
                  y: "-1rem",
                  transition: { duration: 0.3, ease: "easeIn" },
                }
          }
        >
          {/* logo */}
          <Link href="/">
            <motion.img
              className="cursor-pointer h-4/5 rounded-full"
              src="/rounded-icon/android-chrome-512x512.png"
              whileHover={{ ...scales.scaleUp }}
              whileTap={{ ...scales.scaleDown }}
              alt="logo"
            />
          </Link>

          {/* main-nav */}
          <div className="flex">
            {navMenu?.map(({ title, url }: NavItemInterface, idx: number) => (
              <Link key={idx} href={url} scroll={false}>
                <motion.a
                  whileHover={{ ...scales.scaleUp }}
                  whileTap={{ ...scales.scaleDown }}
                  className="ml-12 text-lg font-semibold cursor-pointer"
                >
                  {title}
                </motion.a>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
