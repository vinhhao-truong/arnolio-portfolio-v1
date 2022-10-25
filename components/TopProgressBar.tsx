import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TopProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="hidden md:block md:fixed left-0 top-0 right-0 max-w-[100vw] z-20 h-1 bg-red-theme"
    />
  );
};

export default TopProgressBar;
