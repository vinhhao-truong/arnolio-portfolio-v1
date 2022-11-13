import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import Section from "../Section";
import { motion } from "framer-motion";
import { getClasses, getStyles } from "../../utils/getProps";
import getRandomNum from "../../utils/getRandomNum";

interface card {
  title: string;
  content: React.ReactNode;
  description?: string;
  className?: string;
  coord: number[];
}
const cardList: card[] = [
  {
    title: "About me",
    content: <div className=""></div>,
    coord: [-10, 30],
  },
  {
    title: "Tech stacks",
    content: <div className=""></div>,
    coord: [50, 0],
  },
  {
    title: "Experience",
    content: <div className=""></div>,
    coord: [50, 50],
  },
];

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

  const [currentCard, setCurrentCard] = useState<number>(0);

  interface CardProps extends ReactProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    isOnTop: boolean;
    coord: number[];
  }
  const Card: React.FC<CardProps> = ({
    children,
    className,
    style,
    onClick,
    isOnTop,
    coord,
  }) => {
    const rotate: number = getRandomNum(-15, 15);

    return (
      <motion.div
        className={`absolute p-3 ${getClasses(
          className
        )} rounded-lg shadow-lg lg:w-[15rem] lg:h-[25rem] cursor-grab`}
        // exit={{ zIndex: 1 }}
        whileHover={{ scale: 1.02 }}
        animate={{
          rotate: isOnTop ? 0 : rotate,
          top: isOnTop ? "50%" : `${coord[0]}%`,
          left: isOnTop ? "50%" : `${coord[1]}%`,
          x: isOnTop ? "-50%" : 0,
          y: isOnTop ? "-50%" : 0,
        }}
        style={{ ...getStyles(style) }}
        onClick={onClick}
        // onDragExit={() => {}}
      >
        <div className="block mx-auto my-3 bg-transparent rounded-full lg:w-4 lg:h-4"></div>
        {children}
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
        <div
          className="relative flex items-center justify-center bg-blue-400 lg:h-full"
          ref={cardContainerRef}
        >
          <div className="lg:relative lg:w-4/5 max-h-[40rem] max-w-[30rem] lg:h-4/5 bg-green-300">
            {cardList.map(({ className, title, coord }, idx) => {
              const isOnTop: boolean = currentCard === idx;

              return (
                <Card
                  className={`${getClasses(className)} ${colorList[idx]}`}
                  key={idx}
                  coord={coord}
                  onClick={() => setCurrentCard(idx)}
                  isOnTop={isOnTop}
                >
                  {title}
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
