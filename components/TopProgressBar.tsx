import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useResponsive from "../hooks/useResponsive";

const TopProgressBar: React.FC = () => {
  const responsive = useResponsive();
  const isMobileTablet: boolean = ["sm", "xs", "2xs", "md", "3xs"].includes(
    responsive
  );

  const { scrollYProgress } = useScroll();
  const [percentage, setWidth] = useState(0);

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      setWidth(v);
    });
  }, [scrollYProgress]);

  return (
    <motion.div
      // style={{ scaleX: scrollYProgress }}
      style={{ width: `${percentage * 100}vw`, height: 4 }}
      className={`fixed ${
        isMobileTablet ? "bottom-0" : "top-0"
      } left-0 z-20 bg-red-theme`}
    />
  );
};

export default TopProgressBar;
