import React, { useEffect, useState } from "react";
import ReactProps from "../interfaces/ReactProps";
import Image from "next/image";
import { getClasses, getStyles } from "../utils/getProps";
import { HiLink } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectThumbnailProps extends ReactProps {
  name?: string;
  slug?: string;
  demoUrl?: string;
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
  size,
}) => {
  const [showOptions, setShowOptions] = useState<boolean | null>(null);

  return (
    <div
      className={`${getClasses(
        className
      )} relative overflow-hidden grid grid-rows-6 dark:bg-white-theme`}
      style={getStyles(style)}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* TITLE */}
      <div
        className={`w-full z-[1] row-span-1 absolute top-0 flex justify-center items-center text-center ${
          showOptions
            ? `text-white h-full ${size === "small" ? "text-xl" : "text-3xl"}`
            : `text-white bg-mask-bold truncate ${
                size === "small" ? "text-lg" : "text-2xl"
              }`
        }`}
      >
        {name}
      </div>
      {/* THUMBNAIL */}
      <div className="h-full row-span-5 overflow-hidden">
        <Image
          // layout="responsive"
          alt={`project-${slug}`}
          src={thumbnail ? thumbnail : "https://dummyimage.com/600x400/fff/000"}
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
        className="absolute bottom-0 right-0 z-[1] w-full h-[2rem] bg-red-theme flex justify-evenly items-center"
        initial={{ opacity: 0, y: "2rem" }}
        animate={
          showOptions === true
            ? { opacity: 1, y: 0 }
            : showOptions === false
            ? { opacity: 0, y: "2rem" }
            : {}
        }
      >
        {demoUrl && (
          <a
            className="flex items-center hover:underline"
            href={demoUrl.includes("https") ? demoUrl : `https://${demoUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <HiLink className={`mr-${size === "small" ? "2" : "3"}`} /> Demo
          </a>
        )}
        {slug && (
          <Link href={`/project/${slug}`} target="_blank">
            <a className="flex items-center hover:underline">
              <FaEye className="mr-3" />
              <p className="">Detail</p>
            </a>
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectThumbnail;
