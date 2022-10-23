import ReactProps from "../interfaces/ReactProps";
import { getClasses, getStyles } from "../utils/getProps";

const Section: React.FC<ReactProps> = ({ children, className, style, id }) => {
  return (
    <div
      className={`${getClasses(
        className
      )} max-w-[120rem] w-full px-2 lg:px-[4.5rem] xl:px-40 block mx-auto`}
      id={getClasses(id)}
      style={getStyles(style)}
    >
      {children}
    </div>
  );
};

export default Section;
