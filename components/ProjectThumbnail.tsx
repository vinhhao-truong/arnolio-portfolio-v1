import React, { useEffect, useState } from "react";
import ReactProps from "../interfaces/ReactProps";
import Image from "next/image";
import { getClasses, getStyles } from "../utils/getProps";
import { HiLink } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectThumbnailProps extends ReactProps {
  name: string;
  slug: string;
  demoUrl?: string;
  description?: string;
  logo?: string | React.ReactNode;
  thumbnail?: string;
  imgList?: string;
  color?: string;
  width?: number;
  height?: number;
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
}) => {
  const [showOptions, setShowOptions] = useState<boolean | null>(null);

  return (
    <div
      className={`${getClasses(
        className
      )} relative overflow-hidden flex flex-col bg-white-theme rounded-lg`}
      style={getStyles(style)}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* THUMBNAIL */}
      <Image
        layout="responsive"
        alt={`project-${slug}`}
        src={thumbnail ? thumbnail : "https://dummyimage.com/600x400/fff/000"}
        width={width ? width : 900}
        height={height ? height : 600}
        objectFit="cover"
        className="h-3/4 rounded-t-lg"
      />
      {/* TITLE */}
      <div
        className={`w-ful z-[1] h-1/4 flex justify-center items-center ${
          showOptions ? "text-white-theme" : "text-navy-theme"
        }`}
      >
        {name}
      </div>
      {/* MASK */}
      {showOptions && (
        <div className="absolute w-full h-full bg-mask-bold"></div>
      )}
      {/* HOVERING MASK */}
      <motion.div
        className="absolute top-0 right-0 z-[1] w-1/3 h-full bg-red-theme flex flex-col justify-evenly items-center"
        initial={{ opacity: 0, x: "2rem" }}
        animate={
          showOptions === true
            ? { opacity: 1, x: 0 }
            : showOptions === false
            ? { opacity: 0, x: "2rem" }
            : {}
        }
      >
        {demoUrl && (
          <a href={demoUrl}>
            <HiLink /> Demo
          </a>
        )}
        {slug && (
          <Link href={`/project/${slug}`}>
            <a className="flex items-center hover:brightness-[80%]">
              <FaEye className="mr-1" />
              <p className="">Detail</p>
            </a>
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectThumbnail;
