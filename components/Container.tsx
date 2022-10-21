import ReactProps from "../interfaces/ReactProps";
import { getClasses, getStyles } from "../utils/getProps";

const Container: React.FC<ReactProps> = ({
  className,
  children,
  style,
  id,
}) => {
  return (
    <div
      id={getClasses(id)}
      className={`${getClasses(
        className
      )} w-full h-full lg:px-[4.5rem] xl:px-40`}
      style={getStyles(style)}
    >
      {children}
    </div>
  );
};

export default Container;
