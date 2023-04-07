import React from "react";
import ProjectInterface from "../../interfaces/ProjectInterface";
import ReactProps from "../../interfaces/ReactProps";
import Container from "../Container";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

interface ProjectProps extends ReactProps {
  projects: ProjectInterface[];
}
const Project: React.FC<ProjectProps> = () => {
  return (
    <Section className="relative justify-center lg:flex lg:items-center">
      <SectionHeader title="Projects" />
      <Container>Project</Container>
    </Section>
  );
};

export default Project;
