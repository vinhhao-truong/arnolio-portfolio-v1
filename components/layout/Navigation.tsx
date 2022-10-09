import Image from "next/image";
import Link from "next/link";
import LinkInterface from "../../interfaces/LinkInterface";
import ReactProps from "../../interfaces/ReactProps";
import { motion, MotionStyle, TargetAndTransition } from "framer-motion";

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
  scale: 1.5,
  // x: -2,
  // y: -2,
  cursor: "pointer",
};

const logoMotion: TargetAndTransition = {
  scale: 1.5,
};

const MotionLink = motion(Link);

const Navigation: React.FC<ReactProps> = () => {
  return (
    <div
      className={`w-full flex justify-between h-14 items-center py-3 overflow-hidden`}
    >
      {/* logo */}
      <motion.picture
        className="h-full hover:cursor-pointer"
        whileHover={logoMotion}
      >
        <motion.img
          className="h-full"
          src="/circle-icon/android-chrome-512x512.png"
          alt="logo"
        />
      </motion.picture>
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
    </div>
  );
};

export default Navigation;
