import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import Section from "../Section";
import { motion } from "framer-motion";
import { getClasses } from "../../utils/getProps";
import getRandomNum from "../../utils/getRandomNum";

interface card {
  title: string;
  content: React.ReactNode;
  description?: string;
  className?: string;
}
const cardList: card[] = [
  {
    title: "Bio",
    content: <div className=""></div>,
  },
  {
    title: "Bio",
    content: <div className=""></div>,
  },
  {
    title: "Bio",
    content: <div className=""></div>,
  },
  {
    title: "Bio",
    content: <div className=""></div>,
  },
];

const colorList: string[] = [
  "bg-blue-300",
  "bg-indigo-300",
  "bg-rose-300",
  "bg-green-300",
  "bg-lime-300",
  "bg-red-300",
  "bg-violet-300",
  "bg-yellow-300",
  "bg-orange-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-amber-300",
  "bg-emerald-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-sky-300",
];

interface AboutProps extends ReactProps {}
const About: React.FC<AboutProps> = ({}) => {
  const cardContainerRef = useRef(null);

  const [currentCard, setCurrentCard] = useState<number>(cardList.length - 1);

  interface CardProps extends ReactProps {
    rotate: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }
  const Card: React.FC<CardProps> = ({
    children,
    className,
    rotate,
    onClick,
  }) => {
    return (
      <motion.div
        className={`absolute p-3 ${getClasses(
          className
        )} rounded-lg shadow-lg lg:w-full lg:h-full cursor-grab`}
        drag
        dragConstraints={cardContainerRef}
        whileDrag={{ cursor: "grabbing", rotate: 0, zIndex: 1 }}
        animate={{ rotate: rotate }}
        onClick={onClick}
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
      <Container className="h-[80vh] lg:grid lg:grid-cols-5">
        {/* LEFT */}
        <div
          className="relative flex items-center justify-center bg-blue-200 lg:col-span-2 lg:h-full"
          ref={cardContainerRef}
        >
          <div className="lg:relative lg:w-3/5 max-h-[40rem] max-w-[30rem] lg:h-4/6">
            {cardList.map(({ className, title }, idx) => {
              const deg: number = getRandomNum(-18, 18);
              const isCurrent: boolean = idx === currentCard;
              // (getRandomNum(0, cardList.length - 1) % 4);

              return (
                <Card
                  className={`${getClasses(className)} ${colorList[idx]} ${
                    isCurrent ? "z-[1]" : "z-0"
                  }`}
                  key={idx}
                  rotate={deg}
                  onClick={() => setCurrentCard(idx)}
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
