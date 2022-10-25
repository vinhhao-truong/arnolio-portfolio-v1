import Image from "next/image";
import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import Container from "../Container";
import ProjectThumbnail from "../ProjectThumbnail";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

interface ProjectItem {
  name: string;
  slug: string;
  demoUrl: string;
  description: string;
  logo?: string | React.ReactNode;
  thumbnail?: string;
  imgList?: string;
  color?: string;
}
const projectList: ProjectItem[] = [
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects aosidaiodmaiod amsdoaidm oiamdaidm aiosdmad omasd apoad",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Projects",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
];

interface ProjectsProps extends ReactProps {}
const Projects: React.FC<ProjectsProps> = () => {
  return (
    <Section
      id="projects"
      className="relative flex items-center justify-center"
    >
      <SectionHeader title="Projects" />
      {/* MAIN CONTENT */}
      <Container className="grid grid-cols-12 gap-1 h-[90vh]">
        {/* Only take 10 */}
        {projectList
          .slice(0, 10)
          .map(
            (
              { name, slug, demoUrl, description, thumbnail }: ProjectItem,
              idx: number
            ) => {
              const isThree: boolean = idx < 3 || idx > 6;

              return (
                <ProjectThumbnail
                  key={idx}
                  className={`${isThree ? "col-span-4" : "col-span-3"}`}
                  name={name}
                  thumbnail={thumbnail}
                  slug={slug}
                  demoUrl={demoUrl}
                  width={900}
                  height={600}
                  size={isThree ? "big" : "small"}
                />
              );
            }
          )}
      </Container>
    </Section>
  );
};

export default Projects;
