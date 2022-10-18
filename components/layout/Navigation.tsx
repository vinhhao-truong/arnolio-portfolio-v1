import Image from "next/image";
import Link from "next/link";
import LinkInterface from "../../interfaces/LinkInterface";
import ReactProps from "../../interfaces/ReactProps";
import { motion, TargetAndTransition, useScroll } from "framer-motion";
import { getClasses } from "../../utils/getProps";
import { useEffect } from "react";
import useResponsive from "../../hooks/useResponsive";

const menu: LinkInterface[] = [
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

const linkMotion: TargetAndTransition = {
  scale: 1.2,
  // x: -2,
  // y: -2,
  cursor: "pointer",
};

const logoMotion: TargetAndTransition = {
  scale: 1.5,
};

const MotionLink = motion(Link);

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
              whileHover={logoMotion}
              className="h-4/5 cursor-pointer"
              src="/circle-icon/android-chrome-512x512.png"
              alt="logo"
            />
          </Link>

          {/* main-nav */}
          <div className="flex">
            {menu.map(({ title, url }: LinkInterface, idx: number) => (
              <Link key={idx} href={url} scroll={false}>
                <motion.a
                  whileHover={linkMotion}
                  className="ml-12 text-lg font-semibold"
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
