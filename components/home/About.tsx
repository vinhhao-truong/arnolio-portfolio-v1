import React, { forwardRef } from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import Section from "../Section";

interface AboutProps extends ReactProps {}

const About: React.FC<AboutProps> = ({}) => {
  return (
    <Section id="about" className="relative">
      <SectionHeader title="About" />
    </Section>
  );
};

export default About;
