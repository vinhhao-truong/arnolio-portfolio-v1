import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactProps from "../../interfaces/ReactProps";
import Container from "../Container";
import ProjectThumbnail from "../ProjectThumbnail";
import Section from "../Section";
import SectionHeader from "../SectionHeader";
import ProjectInterface from "../../interfaces/ProjectInterface";
import { ref, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../../store/firebase";

interface ProjectsProps extends ReactProps {
  projectList?: ProjectInterface[];
}
const Projects: React.FC<ProjectsProps> = ({ projectList }) => {
  const projectCount = projectList?.slice(0, 10).length;

  const isTen = projectCount === 10;
  const isFive = projectCount === 5;
  const isSevenOrTen = projectCount === 7 || projectCount === 10;
  const isOne = projectCount === 1;
  const isTwoOrFour = projectCount === 2 || projectCount === 4;
  const isThreeSixNine =
    projectCount === 3 || projectCount === 6 || projectCount === 9;
  const isEight = projectCount === 8;

  const isOneRow = typeof projectCount === "number" && projectCount <= 3;
  const isTwoRows = typeof projectCount === "number" && projectCount <= 7;

  const [thumbnailClass, setThumbnailClass] = useState<string>("");

  useEffect(() => {
    //7 same as 10 (default), 5 different
    console.log(projectCount);

    if (isTwoOrFour || isOne) setThumbnailClass("md:col-span-6");
    if (isThreeSixNine) setThumbnailClass("md:col-span-4");
    if (isEight) setThumbnailClass("md:col-span-3");
  }, []);

  return (
    <Section
      id="projects"
      className="relative justify-center md:flex md:items-center"
    >
      <SectionHeader title="Projects" />
      {/* MAIN CONTENT */}
      <Container
        className={`md:grid md:grid-cols-12 ${
          isOneRow
            ? "h-[40vh] md:gap-2"
            : isTwoRows
            ? "h-[60vh] md:gap-3"
            : "h-[90vh] md:gap-2"
        }`}
      >
        {/* Only take 10 */}
        {projectList
          ?.slice(0, 10)
          .map(
            (
              { name, slug, demoUrl, srcCodeUrl, thumbnail }: ProjectInterface,
              idx: number
            ) => {
              //count and render three items in a row
              const threePerRow: boolean = idx < 3 || idx > 6;
              const twoPerRow: boolean = idx < 2;

              return (
                <ProjectThumbnail
                  key={idx}
                  className={
                    isSevenOrTen
                      ? `${threePerRow ? "md:col-span-4" : "md:col-span-3"}`
                      : isFive
                      ? `${twoPerRow ? "md:col-span-6" : "md:col-span-4"}`
                      : thumbnailClass
                  }
                  name={name}
                  thumbnail={thumbnail}
                  slug={slug}
                  demoUrl={demoUrl}
                  srcCodeUrl={srcCodeUrl}
                  width={900}
                  height={600}
                  size={isTen && !threePerRow ? "small" : "big"}
                />
              );
            }
          )}
      </Container>
    </Section>
  );
};

export default Projects;
