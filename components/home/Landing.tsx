import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import { getClasses } from "../../utils/getProps";
import Container from "../Container";
import Section from "../Section";

interface LandingProps extends ReactProps {}
const Landing: React.FC<LandingProps> = ({ className }) => {
  return (
    <Section id="landing" className={`${getClasses(className)}`}>
      Hello
    </Section>
  );
};

export default Landing;
