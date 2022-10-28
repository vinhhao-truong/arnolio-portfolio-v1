import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactProps from "../../interfaces/ReactProps";
import Container from "../Container";
import ProjectThumbnail from "../ProjectThumbnail";
import Section from "../Section";
import SectionHeader from "../SectionHeader";
import ProjectInterface from "../../interfaces/ProjectInterface";

interface ProjectsProps extends ReactProps {
  projectList?: ProjectInterface[];
}
const Projects: React.FC<ProjectsProps> = ({ projectList }) => {
  const projectCount = projectList?.slice(0, 10).length;
  const isFive = projectCount === 5;
  const isTen = projectCount === 10;
  const isOne = projectCount === 1;
  const isTwoOrFour = projectCount === 2 || projectCount === 4;
  const isThreeSixNine =
    projectCount === 3 || projectCount === 6 || projectCount === 9;
  const isEight = projectCount === 8;

  const [thumbnailClass, setThumbnailClass] = useState<string>("");

  useEffect(() => {
    //7 same as 10 (default), 5 different
    console.log(projectCount);

    if (isOne) setThumbnailClass("col-span-12");
    if (isTwoOrFour) setThumbnailClass("col-span-6");
    if (isThreeSixNine) setThumbnailClass("col-span-4");
    if (isEight) setThumbnailClass("col-span-3");
  }, []);

  return (
    <Section
      id="projects"
      className="relative flex items-center justify-center"
    >
      <SectionHeader title="Projects" />
      {/* MAIN CONTENT */}
      <Container className="grid grid-cols-12 gap-2 min-h-[90vh]">
        {/* Only take 10 */}
        {projectList
          ?.slice(0, 10)
          .map(
            (
              { name, slug, demoUrl, thumbnail }: ProjectInterface,
              idx: number
            ) => {
              //count and render three items in a row
              const threePerRow: boolean = idx < 3 || idx > 6;
              const twoPerRow: boolean = idx < 2;

              return (
                <ProjectThumbnail
                  key={idx}
                  className={
                    isTen
                      ? `${threePerRow ? "col-span-4" : "col-span-3"}`
                      : isFive
                      ? `${twoPerRow ? "col-span-6" : "col-span-4"}`
                      : thumbnailClass
                  }
                  name={name}
                  thumbnail={thumbnail}
                  slug={slug}
                  demoUrl={demoUrl}
                  width={900}
                  height={600}
                  size={threePerRow ? "big" : "small"}
                />
              );
            }
          )}
      </Container>
    </Section>
  );
};

export default Projects;
