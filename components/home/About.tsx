import React, { forwardRef } from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";

interface AboutProps extends ReactProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <div id="about" className="relative">
      <SectionHeader title="About" />
    </div>
  );
};

export default About;
