"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import Section from "../Section";
import { motion, TargetAndTransition } from "framer-motion";
import { getClasses, getStyles } from "../../utils/getProps";
import getRandomNum from "../../utils/getRandomNum";
import useResponsive from "../../hooks/useResponsive";
import { upperCaseFirst } from "../../utils/upperCase";
import Image from "next/image";

const colorList: string[] = [
  "bg-sky-300",
  "bg-indigo-300",
  "bg-rose-300",
  "bg-green-300",
  "bg-lime-300",
  "bg-red-300",
  "bg-violet-300",
  "bg-blue-300",
  "bg-yellow-300",
  "bg-orange-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-amber-300",
  "bg-emerald-300",
  "bg-teal-300",
  "bg-cyan-300",
];

interface AboutProps extends ReactProps {}
const About: React.FC<AboutProps> = ({}) => {
  const cardContainerRef = useRef(null);

  const [currentCard, setCurrentCard] = useState<number | null>(null);
  const responsive = useResponsive();
  const isBigScreen: boolean = ["xl", "2xl"].includes(responsive);
  const isDesktop: boolean = ["lg"].includes(responsive);
  const isTablet: boolean = ["sm", "md"].includes(responsive);

  interface card {
    title: string;
    description?: string;
    className?: string;
    coord: number[];
    titlePlacement: "top" | "bottom" | "left" | "right";
  }
  const cardList: card[] = [
    {
      title: "About me",
      coord: isBigScreen ? [-10, -20] : [-5, 20],
      titlePlacement: "left",
    },
    {
      title: "Tech stacks",
      coord: isBigScreen ? [-10, 70] : [-5, 50],
      titlePlacement: "right",
    },
    {
      title: "Experience",
      coord: isBigScreen ? [60, 30] : [50, -10],
      titlePlacement: "bottom",
    },
  ];

  interface CardProps extends ReactProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    isOnTop?: boolean;
    coord: number[];
    title: string;
    titlePlacement: "top" | "bottom" | "left" | "right";
  }
  const Card: React.FC<CardProps> = ({
    children,
    className,
    style,
    onClick,
    isOnTop,
    coord,
    title,
    titlePlacement,
  }) => {
    const random: number = getRandomNum(-15, 15);
    const animate: TargetAndTransition =
      isDesktop || isBigScreen
        ? {
            x: isOnTop ? "-50%" : 0,
            y: isOnTop ? "-50%" : 0,
            zIndex: isOnTop ? 1 : 0,
            top: isOnTop ? "50%" : `${coord[0]}%`,
            left: isOnTop ? "50%" : `${coord[1]}%`,
            scale:
              isOnTop && isBigScreen ? 1.8 : isOnTop && isDesktop ? 1.7 : 1,
            borderRadius: isOnTop ? 0 : 8,
            rotate: isOnTop ? 0 : random,
          }
        : {};

    const isTitleSide: boolean = ["left", "right"].includes(titlePlacement);
    const isLeft = titlePlacement === "left";
    const isRight = titlePlacement === "right";
    const isBottom = titlePlacement === "bottom";

    return (
      <motion.div
        className={`lg:absolute ${getClasses(
          className
        )} rounded-lg shadow-lg lg:w-[12rem] lg:h-[20rem] xl:w-[15rem] xl:h-[25rem] ${
          isOnTop ? "cursor-grab" : "cursor-pointer"
        } ${isOnTop ? "shadow-md" : ""}`}
        whileHover={isOnTop ? {} : { scale: 1.02 }}
        animate={animate}
        style={
          isDesktop || isBigScreen
            ? {
                ...getStyles(style),
                top: `${coord[0]}%`,
                left: `${coord[1]}%`,
              }
            : { ...getStyles(style) }
        }
        onClick={onClick}
        // drag={isOnTop}
        // dragConstraints={cardContainerRef}
        // onDragExit={() => {}}
      >
        <div
          className={`lg:absolute ${
            isTitleSide
              ? "lg:top-0 lg:h-full lg:w-11 items-center"
              : "lg:left-0 lg:w-full lg:h-8 items-end"
          } flex justify-center ${
            isLeft && !isOnTop
              ? "rounded-tl-lg rounded-bl-lg"
              : isRight && !isOnTop
              ? "rounded-tr-lg rounded-br-lg"
              : isBottom && !isOnTop
              ? "rounded-br-lg rounded-bl-lg"
              : ""
          }`}
          style={{
            [titlePlacement]: 0,
            textAlign:
              isTitleSide &&
              (titlePlacement === "left" || titlePlacement === "right")
                ? titlePlacement
                : "center", //@ts-ignore
          }}
        >
          <div
            className={`bg-red-theme ${
              isTitleSide ? "py-10 px-1" : "px-4 py-2"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={` text-white p-2 ${
            isTitleSide
              ? `lg:w-[calc(100%-2.75rem-0.25rem)] lg:h-full`
              : "lg:h-[calc(100%-2rem-0.25rem)] lg:w-full"
          } lg:absolute`}
          style={{
            [titlePlacement === "left"
              ? "right"
              : titlePlacement === "right"
              ? "left"
              : "top"]: "0.25rem",
            ["margin" + upperCaseFirst(titlePlacement)]: "1rem",
          }}
        >
          {children}
        </div>
      </motion.div>
    );
  };

  // useEffect(() => {
  //   console.log(getRandomNum(-30, 30));
  // }, []);

  return (
    <Section id="about" className="relative">
      <SectionHeader title="About" />
      <Container className="h-[80vh] lg:grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="relative flex items-center justify-center lg:h-full">
          <div
            className="lg:relative lg:w-4/5 max-h-[40rem] max-w-[30rem] lg:h-4/5"
            ref={cardContainerRef}
          >
            {cardList.map(
              ({ className, title, coord, titlePlacement }, idx) => {
                const isOnTop: boolean = currentCard === idx;

                return (
                  <Card
                    className={`${getClasses(className)} ${colorList[idx]}`}
                    key={idx}
                    coord={coord}
                    onClick={() => {
                      if (typeof currentCard === "number") {
                        setCurrentCard((prev) => null);
                      }
                      setCurrentCard((prev) => idx);
                    }}
                    isOnTop={isOnTop}
                    titlePlacement={titlePlacement}
                    title={title}
                  >
                    {title === "About me" && (
                      <div className={`h-full`}>
                        <div
                          className={`flex flex-col items-center h-full justify-center`}
                        >
                          <Image
                            src="https://firebasestorage.googleapis.com/v0/b/arnolio.appspot.com/o/arnolio-avatar.jpg?alt=media&token=22b035c9-64cc-4dd3-844f-ab4420f20339"
                            alt="avatar"
                            height={156}
                            width={156}
                            objectFit="cover"
                            className={`rounded-full`}
                          />
                          <h2 className="my-4 text-2xl text-center">
                            Arnold Truong
                          </h2>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              }
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex items-center justify-end">
          <div className="">Pick a card for more detail</div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
