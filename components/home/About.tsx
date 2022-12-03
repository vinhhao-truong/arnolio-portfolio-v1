"use client";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { duration } from "moment";
import { BsFillInfoCircleFill as MeIcon } from "react-icons/bs";
import {
  IoLogoCodepen as TechIcon,
  IoMdClose as CloseIcon,
} from "react-icons/io";
import { SiBuildkite as ExpIcon } from "react-icons/si";
import { FaHandSparkles as HandIcon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  onMasked,
  offMasked,
  selectGlobalState,
} from "../../redux/globalStateSlice";
import Link from "next/link";
import { GiWorld } from "react-icons/gi";
import ExpSvg from "../svg/undraw_developer_activity_re_39tg.svg";

const colorList: string[] = [
  "bg-amber-300",
  "bg-red-300",
  "bg-indigo-300",
  "bg-teal-300",
  "bg-violet-300",
  "bg-rose-300",
  "bg-sky-300",
  "bg-green-300",
  "bg-lime-300",
  "bg-blue-300",
  "bg-yellow-300",
  "bg-orange-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-emerald-300",
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

  const dispatch = useDispatch();
  const { isMasked } = useSelector(selectGlobalState);

  const appear: TargetAndTransition = {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  };

  const disappear: TargetAndTransition = {
    opacity: 0,
    userSelect: "none",
    x: "-5vw",
    transition: { duration: 0.8, ease: "easeInOut" },
  };

  interface card {
    title: string;
    description?: string;
    className?: string;
    coord: number[];
    titlePlacement: "top" | "bottom" | "left" | "right";
    icon?: ReactNode;
  }
  const cardList: card[] = [
    {
      title: "me",
      coord: isBigScreen ? [-10, -20] : [-5, 20],
      titlePlacement: "left",
      icon: <MeIcon className="" />,
    },
    {
      title: "tech",
      coord: isBigScreen ? [-10, 70] : [-5, 50],
      titlePlacement: "right",
      icon: <TechIcon className="" />,
    },
    {
      title: "exp",
      coord: isBigScreen ? [60, 30] : [50, -10],
      titlePlacement: "bottom",
      icon: <ExpIcon className="mr-2" />,
    },
  ];

  interface CardProps extends ReactProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    isOnTop?: boolean;
    coord: number[];
    title: string;
    titlePlacement: "top" | "bottom" | "left" | "right";
    icon?: React.ReactNode;
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
    icon,
  }) => {
    const random: number = getRandomNum(-15, 15);
    const animate: TargetAndTransition =
      isDesktop || isBigScreen
        ? {
            x: isOnTop ? "-50%" : 0,
            y: isOnTop ? "-50%" : 0,
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
          isOnTop || currentCard === null ? "shadow-md cursor-pointer" : ""
        }`}
        whileHover={isOnTop || currentCard !== null ? {} : { scale: 1.02 }}
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
        {isOnTop && (
          <CloseIcon className="absolute hidden text-white lg:block top-3 right-3" />
        )}
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
              isTitleSide && (isLeft || isRight) ? titlePlacement : "center",
            transform: `translateX(${
              isLeft ? "-1rem" : isRight ? "1rem" : "0"
            }) translateY(${isBottom ? "0.5rem" : "0"})`,
          }}
        >
          <div
            className={`bg-red-theme flex items-center ${
              isTitleSide ? "flex-col" : ""
            } ${isTitleSide ? "py-10 px-1" : "px-4 py-2"}`}
          >
            {icon}
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

  useEffect(() => {
    if (!isMasked && typeof currentCard === "number") {
      setCurrentCard(null);
    }
  }, [currentCard, isMasked]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && typeof currentCard === "number") {
        setCurrentCard(null);
        dispatch(offMasked());
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [currentCard]);

  return (
    <Section id="about" className="relative">
      <SectionHeader title="About" />
      <Container className="h-[80vh] lg:grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="flex items-center justify-center lg:h-full">
          <div
            className="lg:relative lg:w-4/5 max-h-[40rem] max-w-[30rem] lg:h-4/5"
            ref={cardContainerRef}
          >
            {cardList.map(
              ({ className, title, coord, titlePlacement, icon }, idx) => {
                const isOnTop: boolean = currentCard === idx;

                return (
                  <Card
                    className={`${getClasses(className)} ${colorList[idx]} ${
                      isOnTop ? "z-30" : ""
                    }`}
                    key={idx}
                    coord={coord}
                    onClick={() => {
                      if (isOnTop) {
                        setCurrentCard(null);
                        dispatch(offMasked());
                        return;
                      }
                      if (currentCard === null) {
                        dispatch(onMasked(true));
                        setCurrentCard(idx);
                        return;
                      }
                    }}
                    isOnTop={isOnTop}
                    titlePlacement={titlePlacement}
                    title={title}
                    icon={icon}
                  >
                    {title === "me" && (
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
                          <h2 className="my-4 text-3xl text-center">
                            Arnold Truong
                          </h2>
                        </div>
                      </div>
                    )}

                    {title === "tech" && (
                      <div className="flex flex-col h-full justify-evenly">
                        <div className="text-4xl">
                          Modern web development and more
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="">
                            <div className="text-sky-500">#frontend</div>
                            <div className="text-sky-500">#backend</div>
                          </div>
                          <GiWorld className="text-3xl text-sky-400" />
                        </div>
                      </div>
                    )}

                    {title === "exp" && (
                      <div>
                        <ExpSvg className="w-full h-full" />
                      </div>
                    )}
                  </Card>
                );
              }
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="relative flex items-center justify-end xl:ml-6">
          {/* No Card Chosen */}
          <motion.div
            initial={{ opacity: 0, x: "-5vw" }}
            whileInView={currentCard === null ? appear : disappear}
            animate={
              currentCard === null
                ? {
                    transition: {
                      delay: 0.8,
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      bounce: 0.5,
                    },
                    y: ["0.5vh", "-1vh", "0.5vh"],
                  }
                : { transition: { delay: 0.8 }, zIndex: -1 }
            }
            style={{ transform: "translateY(-50%)" }}
            className="flex flex-col items-center justify-center select-none text-7xl 2xl:text-[7rem] absolute right-0 top-1/2"
          >
            pick a card <HandIcon />
          </motion.div>
          {/* About content */}
          <motion.div
            initial={{ opacity: 0, x: "-5vw" }}
            whileInView={
              currentCard === 0
                ? { ...appear, zIndex: 30 }
                : { ...disappear, zIndex: -1 }
            }
            className="absolute right-0 top-1/2 h-fit"
            style={{ transform: "translateY(-50%)" }}
          >
            <div className="my-5">
              <span className="mx-2 text-4xl font-semibold">Who am I?</span> a
              developer, a gamer with a passion of web development.
            </div>
            <div className="my-5 ">
              <span className="mx-2 text-4xl font-semibold">What I do?</span>
              mostly front-end, sometimes back-end and even UX design
            </div>
            <div className="my-5 ">
              <span className="mx-2 text-4xl font-semibold">
                Why accompany me?
              </span>
              deliver high-quality website with the most modern tools (see tech
              card)
            </div>
            <div className="my-5 ">
              <span className="mx-2 text-4xl font-semibold">
                How to contact me?
              </span>
              simple, just{" "}
              <Link scroll={false} href="#contact">
                <a
                  onClick={() => {
                    if (isMasked) {
                      dispatch(offMasked());
                    }
                    setCurrentCard(null);
                  }}
                  className="text-blue-300 hover:underline"
                >
                  click here
                </a>
              </Link>
            </div>
          </motion.div>
          {/* About content */}
          <motion.div
            initial={{ opacity: 0, x: "-5vw" }}
            whileInView={
              currentCard === 2 ? { ...appear } : { ...disappear, zIndex: -1 }
            }
            className="absolute right-0 z-30 top-1/2 h-fit"
            style={{ transform: "translateY(-50%)" }}
          >
            content
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
