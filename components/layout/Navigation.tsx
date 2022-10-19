import Image from "next/image";
import Link from "next/link";
import NavItemInterface from "../../interfaces/NavItemInterface";
import ReactProps from "../../interfaces/ReactProps";
import { motion, useScroll } from "framer-motion";
import { getClasses } from "../../utils/getProps";
import { useEffect } from "react";
import useResponsive from "../../hooks/useResponsive";
import { scales } from "../motion/variants";

const menu: NavItemInterface[] = [
  {
    title: "About",
    url: "#about",
  },
  {
    title: "Projects",
    url: "#projects",
  },
  {
    title: "Contact",
    url: "#contact",
  },
];

const Navigation: React.FC<ReactProps> = ({ className }) => {
  const { scrollY } = useScroll();
  const responsive = useResponsive();
  const isMobile: boolean = responsive === "xs";

  useEffect(() => {
    return scrollY.onChange((pos) => {});
  }, []);

  return (
    <>
      {!isMobile && (
        <motion.div
          className={`${getClasses(
            className
          )} w-full flex justify-between h-20 items-center py-3`}
        >
          {/* logo */}
          <Link href="/">
            <motion.img
              className="cursor-pointer h-4/5"
              src="/circle-icon/android-chrome-512x512.png"
              whileHover={{ ...scales.scaleUp }}
              whileTap={{ ...scales.scaleDown }}
              alt="logo"
            />
          </Link>

          {/* main-nav */}
          <div className="flex">
            {menu.map(({ title, url }: NavItemInterface, idx: number) => (
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
