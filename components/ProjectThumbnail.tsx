import React, { useEffect, useState } from "react";
import ReactProps from "../interfaces/ReactProps";
import Image from "next/image";
import { getClasses, getStyles } from "../utils/getProps";
import { HiLink } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

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
  width,
  height,
  demoUrl,
  srcCodeUrl,
  size,
}) => {
  const [showOptions, setShowOptions] = useState<boolean | null>(null);
  const router = useRouter();

  return (
    <motion.div
      className={`${getClasses(
        className
      )} relative overflow-hidden grid grid-rows-6 dark:bg-white-theme cursor-pointer`}
      style={getStyles(style)}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      whileHover={{
        scale: 1.3,
        zIndex: 10,
        borderRadius: 5,
        transition: { duration: 0.2 },
      }}
      // whileTap={{ scale: 1.1 }}
    >
      {/* TITLE */}
      <div
        onClick={() => router.push(`/project/${slug}`)}
        className={`w-full z-[1] row-span-1 flex justify-center items-center text-center select-none ${
          showOptions
            ? `text-white h-full absolute top-0 ${
                size === "small" ? "text-xl" : "text-3xl"
              }`
            : `text-navy-theme bg-red-theme dark:text-white-theme truncate ${
                size === "small" ? "text-lg" : "text-2xl"
              }`
        }`}
      >
        {name}
      </div>
      {/* THUMBNAIL */}
      <div className="relative w-full h-full row-span-5 overflow-hidden">
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
      {showOptions && (
        <div className="absolute w-full h-full bg-mask-bold"></div>
      )}
      {/* HOVERING MASK */}
      <motion.div
        className={`absolute bottom-0 right-0 z-[1] w-full h-1/6 bg-red-theme dark:text-white-theme text-navy-theme grid ${
          demoUrl ? "grid-cols-2" : "grid-cols-1"
        }
        } ${size === "small" ? "text-sm" : "text-lg"}`}
        initial={{ opacity: 0, y: "2rem" }}
        animate={
          showOptions === true
            ? { opacity: 1, y: 0, transition: { delay: 0.1 } }
            : showOptions === false
            ? { opacity: 0, y: "20%" }
            : {}
        }
        transition={{ duration: 0.3, ease: "anticipate" }}
      >
        {demoUrl && (
          <a
            className="flex items-center justify-center col-span-1 dark:hover:bg-white-theme dark:hover:text-red-theme"
            href={demoUrl.includes("https") ? demoUrl : `https://${demoUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <HiLink className={`mr-${size === "small" ? "2" : "3"}`} /> Demo
          </a>
        )}
        {srcCodeUrl && (
          <a
            className="flex items-center justify-center col-span-1 dark:hover:bg-white-theme dark:hover:text-red-theme"
            href={
              srcCodeUrl.includes("https")
                ? srcCodeUrl
                : `https://${srcCodeUrl}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <HiLink className={`mr-${size === "small" ? "2" : "3"}`} /> Demo
          </a>
        )}
        {/* {slug && (
          <Link href={`/project/${slug}`} target="_blank">
            <a className="flex items-center justify-center col-span-1 dark:hover:bg-white-theme dark:hover:text-red-theme">
              <FaEye className="mr-3" />
              <p className="">Detail</p>
            </a>
          </Link>
        )} */}
      </motion.div>
    </motion.div>
  );
};

export default ProjectThumbnail;
