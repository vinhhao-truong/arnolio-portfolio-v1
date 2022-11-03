interface ProjectInterface {
  name?: string;
  slug?: string;
  demoUrl?: string;
  description?: string;
  logo?: string | React.ReactNode;
  thumbnail?: string | File;
  imgList?: string;
  color?: string;
}

export default ProjectInterface;
