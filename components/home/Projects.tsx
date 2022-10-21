import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import Container from "../Container";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

interface ProjectsProps extends ReactProps {}
const Projects: React.FC<ProjectsProps> = () => {
  return (
    <Section id="projects" className="relative">
      <SectionHeader title="Projects" />
    </Section>
  );
};

export default Projects;
