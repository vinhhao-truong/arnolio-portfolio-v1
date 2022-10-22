import ReactProps from "../interfaces/ReactProps";
import { getClasses, getStyles } from "../utils/getProps";
import { motion } from "framer-motion";
import { fades } from "../utils/motion/variants";

const Container: React.FC<ReactProps> = ({
  className,
  children,
  style,
  id,
}) => {
  return (
    <motion.div
      id={getClasses(id)}
      className={`${getClasses(
        className
      )} w-full h-full lg:px-[4.5rem] xl:px-40 opacity-0`}
      style={getStyles(style)}
      initial={{ y: "3rem" }}
      animate={{ ...fades.fadeIn, y: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Container;
