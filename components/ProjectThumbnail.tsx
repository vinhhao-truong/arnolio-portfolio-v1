import React, { useEffect, useState } from "react";
import ReactProps from "../interfaces/ReactProps";
import Image from "next/image";
import { getClasses, getStyles } from "../utils/getProps";
import { HiLink, HiOutlineCode } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { selectGlobalState } from "../redux/globalStateSlice";
import { useSelector } from "react-redux";
import useResponsive from "../hooks/useResponsive";

interface ProjectThumbnailProps extends ReactProps {
  name?: string;
  slug?: string;
  demoUrl?: string;
  srcCodeUrl?: string;
  description?: string;
  logo?: string | React.ReactNode;
  thumbnail?: string;
  imgList?: string;
  color?: string;
  width?: number;
  height?: number;
  size?: "small" | "big";
}

const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({
  className,
  style,
  name,
  slug,
  thumbnail,
  demoUrl,
  srcCodeUrl,
  size,
}) => {
  const [showOptions, setShowOptions] = useState<boolean | null>(null);
  const router = useRouter();

  const { colors } = useSelector(selectGlobalState);
  const responsive = useResponsive();

  const isMobileTablet: boolean = ["2xs", "xs", "sm", "md"].includes(
    responsive
  );

  return (
    <motion.div
      className={`${getClasses(
        className
      )} relative overflow-hidden dark:bg-white-theme rounded-md lg:rounded-lg cursor-pointer lg:cursor-default`}
      style={getStyles(style)}
      onMouseEnter={() => {
        if (!isMobileTablet) setShowOptions(true);
      }}
      onMouseLeave={() => {
        if (!isMobileTablet) setShowOptions(false);
      }}
      whileHover={{
        // scale: 1.3,
        zIndex: 10,
        transition: { duration: 0.2 },
      }}
      // whileTap={{ scale: 1.1 }}
      onClick={() => {
        isMobileTablet &&
          window.open(
            demoUrl?.includes("https") ? demoUrl : `https://${demoUrl}`,
            "_blank"
          );
      }}
    >
      {/* TITLE */}
      <motion.div
        // onClick={() => router.push(`/project/${slug}`)}
        className={`rounded-md lg:rounded-lg w-full z-[1] sm:text-lg md:text-2xl bg-black/70 lg:bg-mask-bold text-white-theme absolute top-0 flex justify-center items-center text-center ${
          showOptions && !isMobileTablet
            ? `${size === "small" ? "text-xl" : "text-3xl"} p-3`
            : `lg:truncate ${
                size === "small" ? "lg:text-lg" : "lg:text-2xl"
              } h-full`
        }`}
        animate={
          showOptions || isMobileTablet ? { height: "100%" } : { height: "15%" }
        }
        transition={isMobileTablet ? {} : { duration: 0.2 }}
      >
        {name}
      </motion.div>
      {/* THUMBNAIL */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          // layout="responsive"
          alt={`project-${slug}`}
          src={
            thumbnail
              ? thumbnail
              : "https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          className="w-full h-full"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* MASK */}
      {/* {showOptions && (
        <div className="absolute top-0 left-0 w-full h-full bg-mask-bold z-[1]"></div>
      )} */}
      {/* HOVERING MASK */}
      <motion.div
        className={`absolute bottom-[10%] right-0 z-[1] w-full h-1/6 max-h-[3.5rem] flex justify-evenly
        ${size === "small" ? "text-sm" : "text-lg"}`}
        initial={{ opacity: 0, y: "2rem" }}
        animate={
          showOptions === true
            ? { opacity: 1, y: 0, transition: { delay: 0.2 } }
            : showOptions === false
            ? { opacity: 0, y: "20%" }
            : {}
        }
        transition={{ duration: 0.3, ease: "anticipate" }}
      >
        {demoUrl && !isMobileTablet && (
          <motion.a
            className="flex items-center justify-center text-white-theme"
            href={demoUrl.includes("https") ? demoUrl : `https://${demoUrl}`}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.2,
              color: colors["blue-theme"],
            }}
            whileTap={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <HiLink className={size === "small" ? "mr-2" : "mr-3"} /> Demo
          </motion.a>
        )}
        {srcCodeUrl && !isMobileTablet && (
          <motion.a
            className="flex items-center justify-center text-white-theme"
            href={
              srcCodeUrl.includes("https")
                ? srcCodeUrl
                : `https://${srcCodeUrl}`
            }
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.2,
              color: colors["blue-theme"],
            }}
            whileTap={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <HiOutlineCode className={size === "small" ? "mr-2" : "mr-3"} />{" "}
            Source Code
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectThumbnail;
