import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import MuiModal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { getClasses, getStyles } from "../../utils/getProps";
import { ModalProps } from "../../interfaces/ModalProps";

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  style,
  isOpen,
  closeModal,
}) => {
  return (
    <MuiModal open={isOpen} onClose={closeModal}>
      <motion.div
        initial={{ scale: 0 }}
        animate={isOpen ? { scale: 1 } : {}}
        className={`${getClasses(
          className
        )} max-w-[95vw] max-h-[95vh] rounded-lg p-4 bg-white fixed top-1/2 left-1/2 outline-none`}
        style={{ x: "-50%", y: "-50%", ...getStyles(style) }}
      >
        {children}
      </motion.div>
    </MuiModal>
  );
};

export default Modal;
