import { forwardRef, RefObject } from "react";
import ReactProps from "../interfaces/ReactProps";
import { getClasses, getStyles } from "../utils/getProps";
import { MotionValue, useScroll, useTransform } from "framer-motion";

// eslint-disable-next-line react/display-name
const Section = forwardRef<HTMLDivElement, ReactProps>(
  ({ children, className, style, id }, ref) => {
    return (
      <div
        ref={ref}
        className={`${getClasses(
          className
        )} max-w-[120rem] w-full px-4 lg:mb-0 lg:px-[4.5rem] xl:px-40 block mx-auto`}
        id={getClasses(id)}
        style={{ ...getStyles(style) }}
      >
        {children}
      </div>
    );
  }
);

export default Section;
