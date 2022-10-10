import React from "react";
import ReactProps from "../../interfaces/ReactProps";

interface AboutProps extends ReactProps {}
const About: React.FC<AboutProps> = () => {
  return (
    <div id="about" className="">
      About
    </div>
  );
};

export default About;
