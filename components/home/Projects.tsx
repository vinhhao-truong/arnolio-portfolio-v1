import Image from "next/image";
import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import Container from "../Container";
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
}
const projectList: ProjectItem[] = [
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
    slug: "artoo-blogs",
    demoUrl: "https://artoo-blogs.herokuapp.com/",
    description:
      "A social media where people can upload blogs in text/img format.",
    thumbnail: "https://dummyimage.com/600x400/fff/000",
  },
  {
    name: "Artoo Blogs",
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
      <Container className="grid grid-cols-12 gap-2 cursor-pointer">
        {projectList.map(
          (
            { name, slug, demoUrl, description, thumbnail }: ProjectItem,
            idx: number
          ) => {
            const isThree: boolean = idx < 3 || idx > 6;

            return (
              <div
                key={idx}
                className={`${isThree ? "col-span-4" : "col-span-3"} relative`}
              >
                {/* TITLE */}
                <div className="absolute w-full h-full bg-mask-bold z-[1]">
                  {name}
                </div>
                {/* THUMBNAIL */}
                <Image
                  layout="responsive"
                  alt={`project-${slug}`}
                  src={thumbnail ? thumbnail : ""}
                  width={900}
                  height={600}
                  objectFit="cover"
                />
              </div>
            );
          }
        )}
      </Container>
    </Section>
  );
};

export default Projects;
