import ReactProps from "../interfaces/ReactProps";
import { getClasses, getStyles } from "../utils/getProps";
import { motion, useScroll } from "framer-motion";
import { fades } from "../utils/motion/variants";
import { useEffect, useState } from "react";
import useResponsive from "../hooks/useResponsive";

interface ContainerProps extends ReactProps {
  isHiddenOnMobile?: boolean;
}
const Container: React.FC<ContainerProps> = ({
  className,
  children,
  style,
  id,
  isHiddenOnMobile,
}) => {
  const { scrollY, scrollYProgress } = useScroll();
  const [initialY, setInitialY] = useState<string>("0%");
  const responsive = useResponsive();
  const isDesktop: boolean = ["lg", "xl", "2xl"].includes(responsive);

  useEffect(() => {
    scrollY.onChange(() => {
      //check direction
      const goingDown = scrollY.getVelocity() > 0;
      if (goingDown) {
        setInitialY("2%");
        return;
      }
      setInitialY("-2%");
    });
  }, [scrollY]);

  return (
    <motion.div
      id={getClasses(id)}
      className={`${getClasses(
        className
      )} w-full lg:px-[4.5rem] xl:px-40 lg:opacity-0`}
      style={getStyles(style)}
      whileInView={
        isDesktop || !isHiddenOnMobile
          ? {
              ...fades.fadeIn,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeInOut",
              },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
};

export default Container;
