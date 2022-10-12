import React, { useEffect } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { motion, useScroll } from "framer-motion";

const ScrollTopBtn = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      className="fixed bottom-4 right-4 lg:bottom-[5vh] lg:right-[5vw] cursor-pointer p-1 lg:p-2 bg-red-theme rounded-full"
      onClick={() => {
        if (window) {
          if (scrollYProgress.get() > 0) window.scrollTo(0, 0);
        }
      }}
    >
      <IoMdArrowDropup className="text-2xl lg:text-3xl text-white-theme" />
    </motion.div>
  );
};

export default ScrollTopBtn;
