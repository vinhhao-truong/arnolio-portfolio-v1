import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";

interface ProjectsProps extends ReactProps {}
const Projects: React.FC<ProjectsProps> = () => {
  return (
    <div id="projects" className="relative">
      <SectionHeader title="Projects" />
    </div>
  );
};

export default Projects;
