import React from "react";
import ReactProps from "../../interfaces/ReactProps";

interface ProjectsProps extends ReactProps {}
const Projects: React.FC<ProjectsProps> = () => {
  return (
    <div id="projects" className="">
      Projects
    </div>
  );
};

export default Projects;
