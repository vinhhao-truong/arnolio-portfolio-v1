interface ProjectInterface {
  name?: string;
  slug?: string;
  demoUrl?: string;
  srcCodeUrl?: string;
  description?: string;
  logo?: string | React.ReactNode;
  thumbnail?: string;
  imgList?: string;
  color?: string;
  lastUpdate?: number;
  progress?: "In Progress" | "Done";
  status?: "Live" | "Down";
  owner?: "Personal" | string;
}

export default ProjectInterface;
