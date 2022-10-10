import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import { getClasses } from "../../utils/getProps";

interface LandingProps extends ReactProps {}
const Landing: React.FC<LandingProps> = ({ className }) => {
  return (
    <div id="landing" className={`${getClasses(className)}`}>
      Landing
    </div>
  );
};

export default Landing;
