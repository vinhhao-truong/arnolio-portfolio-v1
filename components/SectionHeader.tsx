import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { fades, translates } from "./motion/variants";
import useScrollCheck from "../hooks/useScrollCheck";
import useResponsive from "../hooks/useResponsive";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  const responsive = useResponsive();
  const { scrollY } = useScroll();

  // useEffect(() => {
  //   console.log(responsive);
  // }, [responsive]);

  return responsive !== "sm" && responsive !== "xs" ? (
    <motion.div
      initial={{ x: "-3rem", rotate: -90 }}
      whileInView={{
        ...fades.fadeIn,
        ...translates.x(0),
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`font-semibold text-center opacity-0 select-none absolute -left-16 bottom-1/4 text-6xl`}
    >
      {title}
    </motion.div>
  ) : (
    <div className="text-xl font-semibold text-center text-white">{title}</div>
  );
};

export default SectionHeader;
