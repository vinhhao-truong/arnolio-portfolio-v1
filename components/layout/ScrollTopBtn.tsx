import React, { useEffect } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { motion } from "framer-motion";

const ScrollTopBtn = () => {
  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="fixed bottom-[5vh] right-[5vw] cursor-pointer p-2 bg-red-theme rounded-full"
    >
      <IoMdArrowDropup className="text-3xl text-white-theme" />
    </motion.div>
  );
};

export default ScrollTopBtn;
