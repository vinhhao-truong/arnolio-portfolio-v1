// "use client";
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
import moment, { duration } from "moment";
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
import ExpSvg from "../svg/undraw_feeling_proud_qne1.svg";
import { Icon } from "@iconify/react";
import Iconify from "../common/Iconify";
import { v4 as uuid } from "uuid";
import { MdDoneAll } from "react-icons/md";
import MaqroLogo from "../svg/about_logo_414122832b.svg";
import Delayed from "../common/Delayed";

const colorList: string[] = ["bg-amber-300", "bg-red-300", "bg-indigo-300"];

const textColorList: string[] = [
  "text-amber-300",
  "text-red-300",
  "text-indigo-300",
];

interface TechIconProps {
  icon: string;
  color: string;
  title: string;
}
const ProgrammingTechIconList: TechIconProps[] = [
  { icon: "akar-icons:html-fill", color: "#e34c26", title: "HTML" },
  { icon: "akar-icons:css-fill", color: "#2965f1", title: "CSS" },
  { icon: "mdi:language-javascript", color: "#f0db4f", title: "JavaScript" },
  {
    icon: "mdi:language-typescript",
    color: "#007acc",
    title: "TypeScript",
  },
  { icon: "mdi:react", color: "#61DBFB", title: "ReactJS" },
  { icon: "ion:logo-nodejs", color: "#68a063", title: "NodeJS" },
  { icon: "teenyicons:nextjs-solid", color: "white", title: "NextJS" },
  { icon: "ion:logo-sass", color: "#cc6699", title: "SASS" },
  { icon: "mdi:bootstrap", color: "#563d7c", title: "Bootstrap" },
  { icon: "mdi:tailwind", color: "#38bdf8", title: "TailwindCSS" },
];
const OtherTechIconList: TechIconProps[] = [
  { icon: "simple-icons:postman", color: "#ef5b25", title: "Postman" },
  { icon: "logos:figma", color: "#a259ff", title: "Figma" },
];

interface ExpTimelineProps {
  date: string;
  logo?: React.ReactNode;
  action: string;
  detail?: string;
  isDone: boolean;
}
const expTimeline: ExpTimelineProps[] = [
  {
    date: `${moment().format("MMM' YYYY")}`,
    action: "Keep improving",
    isDone: false,
  },
  {
    date: "Sep' 2022 - Mar' 2023",
    action: "Maqro Software Developer",
    detail:
      "Worked as a front-end developer to build, test and, enhance Maqro Portal as well as Maqro Official",
    isDone: true,
    logo: (
      <div className="w-[12%] h-full mr-2">
        <MaqroLogo />
      </div>
    ),
  },
  {
    date: "May' 2022",
    action: "JDS Volunteering",
    detail: "Helped build automatic email system (SMTP) for New Relic One",
    isDone: true,
    logo: (
      <div className="mr-2 select-none">
        <Image
          src="https://www.jds.net.au/images/cropped-JDS_Logo_redLarge.png"
          alt="jds-logo"
          width="40%"
          height="40%"
          objectFit="contain"
        />
      </div>
    ),
  },
];

interface AboutProps extends ReactProps {}
const About: React.FC<AboutProps> = ({}) => {
  const responsive = useResponsive();
  const isBigScreen: boolean = ["xl", "2xl"].includes(responsive);
  const isDesktop: boolean = ["lg"].includes(responsive);
  const isTablet: boolean = ["sm", "md"].includes(responsive);
  const isMobileOrTablet: boolean = ["sm", "md", "xs", "2xs"].includes(
    responsive
  );

  const cardContainerRef = useRef(null);

  const [currentCard, setCurrentCard] = useState<number | null>(null);
  const [currentMobileCard, setCurrentMobileCard] = useState<number>(0);

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
    fullTitle: string;
    description?: string;
    className?: string;
    coord: number[];
    titlePlacement: "top" | "bottom" | "left" | "right";
    icon?: ReactNode;
  }
  const cardList: card[] = [
    {
      title: "me",
      fullTitle: "About me",
      coord: isBigScreen ? [-10, -20] : [-5, 10],
      titlePlacement: "left",
      icon: (
        <MeIcon
          className={`text-xl lg:text-base ${
            currentMobileCard === 0 ? "text-white-theme" : textColorList[0]
          } lg:text-white`}
        />
      ),
    },
    {
      title: "tech",
      fullTitle: "Technology",
      coord: isBigScreen ? [-10, 70] : [-5, 60],
      titlePlacement: "right",
      icon: (
        <TechIcon
          className={`text-xl lg:text-base ${
            currentMobileCard === 1 ? "text-white-theme" : textColorList[1]
          } lg:text-white`}
        />
      ),
    },
    {
      title: "exp",
      fullTitle: "Experience",
      coord: isBigScreen ? [60, 30] : [40, 30],
      titlePlacement: "bottom",
      icon: (
        <ExpIcon
          className={`text-xl lg:mr-2 lg:text-base ${
            currentMobileCard === 2 ? "text-white-theme" : textColorList[2]
          } lg:text-white`}
        />
      ),
    },
  ];

  //DESKTOP CARD
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
            zIndex: isOnTop ? 2001 : 1,
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

  //MOBILE CARD (CIRCLE)
  interface MobileCardProps extends ReactProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    isActive: boolean;
    title: string;
    icon?: React.ReactNode;
  }
  const MobileCard: React.FC<MobileCardProps> = ({
    onClick,
    isActive,
    title,
    icon,
    className,
  }) => {
    return (
      <div
        onClick={onClick}
        className={`${className} ${
          isActive ? "bg-white-theme/20" : ""
        } w-10 h-10 rounded-full flex justify-center items-center`}
      >
        {icon}
      </div>
    );
  };

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
      <Container className="lg:h-[80vh] lg:grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="flex items-center justify-center lg:h-full">
          <div
            className="flex items-center justify-evenly w-full lg:relative lg:w-4/5 lg:max-h-[40rem] lg:max-w-[30rem] lg:h-4/5"
            ref={cardContainerRef}
          >
            <Delayed waitBeforeShow={100}>
              {cardList.map(
                (
                  { className, title, coord, titlePlacement, icon, fullTitle },
                  idx
                ) => {
                  const isActive: boolean = currentMobileCard === idx;
                  const isOnTop: boolean = currentCard === idx;

                  return isMobileOrTablet ? (
                    <div
                      key={"card" + idx}
                      className="flex flex-col items-center justify-between"
                      onClick={() => setCurrentMobileCard(idx)}
                    >
                      <MobileCard
                        className={`${getClasses(className)}`}
                        title={title}
                        icon={icon}
                        isActive={isActive}
                      />
                      <div
                        className={`${
                          isActive ? `text-white-theme` : textColorList[idx]
                        } mt-2`}
                      >
                        {fullTitle}
                      </div>
                    </div>
                  ) : (
                    <Card
                      className={`${getClasses(className)} ${colorList[idx]}`}
                      key={"card" + idx}
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
                              alt="avatar"
                              src="https://firebasestorage.googleapis.com/v0/b/arnolio.appspot.com/o/arnolio-avatar.webp?alt=media&token=41ec6de0-4c2f-4c18-882f-51e7b3e1dc1a&_gl=1*1tpf7ar*_ga*MTM4MjQyNjc5Ni4xNjg2MjkwMjkz*_ga_CW55HF8NVT*MTY4NjI5MDI5Mi4xLjEuMTY4NjI5MTE5OS4wLjAuMA.."
                              height={156}
                              width={156}
                              objectFit="cover"
                              className={`rounded-full`}
                            />
                            <h2 className="my-4 text-lg text-center xl:text-xl">
                              <span className="text-2xl xl:text-3xl text-red-theme">
                                Arnold
                              </span>{" "}
                              Truong
                            </h2>
                          </div>
                        </div>
                      )}

                      {title === "tech" && (
                        <div className="flex flex-col h-full justify-evenly">
                          <div className="text-2xl xl:text-4xl">
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
                        <div className="flex flex-col items-center justify-between h-full">
                          <div className="mt-3 text-3xl text-center text-white theme">
                            What I have{" "}
                            <span className="text-red-theme">achieved</span>
                          </div>
                          <ExpSvg className="w-full h-full" />
                        </div>
                      )}
                    </Card>
                  );
                }
              )}
            </Delayed>
          </div>
        </div>
        {/* RIGHT */}
        {!isMobileOrTablet && (
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
                      color: [
                        "#fcd34d",
                        "#fca5a5",
                        "#a5b4fc",
                        "#a5b4fc",
                        "#fca5a5",
                        "#fcd34d",
                      ],
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
                  ? { ...appear, zIndex: 2001 }
                  : { ...disappear, zIndex: -1 }
              }
              className="absolute right-0 top-1/2 h-fit"
              style={{ transform: "translateY(-50%)" }}
            >
              <div className="my-5">
                <span className="mx-2 text-4xl font-semibold">
                  Who am I<span className="text-blue-300">?</span>
                </span>{" "}
                a developer, a gamer with a passion of web development.
              </div>
              <div className="my-5 ">
                <span className="mx-2 text-4xl font-semibold">
                  What I do<span className="text-blue-300">?</span>
                </span>{" "}
                mostly front-end, sometimes back-end and even UX design
              </div>
              <div className="my-5 ">
                <span className="mx-2 text-4xl font-semibold">
                  Why accompany me<span className="text-blue-300">?</span>
                </span>{" "}
                deliver high-quality website with the most modern tools (see
                tech card)
              </div>
              <div className="my-5 ">
                <span className="mx-2 text-4xl font-semibold">
                  How to contact me<span className="text-blue-300">?</span>
                </span>{" "}
                simple, just{" "}
                <Link scroll={false} href="#contact">
                  <a
                    onClick={() => {
                      if (isMasked) {
                        dispatch(offMasked());
                      }
                      setCurrentCard(null);
                    }}
                    className="text-blue-400 underline hover:text-blue-500"
                  >
                    click here
                  </a>
                </Link>
              </div>
            </motion.div>
            {/* Tech content */}
            <motion.div
              initial={{ opacity: 0, x: "-5vw" }}
              whileInView={
                currentCard === 1 ? { ...appear } : { ...disappear, zIndex: -1 }
              }
              className="absolute top-0 right-0 z-[2001] flex flex-col w-full h-full justify-evenly"
              onClick={() => {
                dispatch(offMasked());
                setCurrentCard(null);
              }}
            >
              <div className="h-max">
                <div className="mb-5 text-3xl">Programming:</div>
                <div className="flex flex-wrap pl-6">
                  {ProgrammingTechIconList.map(({ icon, color, title }) => {
                    return (
                      <div
                        key={uuid()}
                        className="flex flex-col items-center mb-5 mr-6"
                      >
                        <Iconify
                          icon={icon}
                          color={color}
                          className="block text-6xl "
                        />
                        <div
                          className={`px-2 mt-2 rounded-sm text-black`}
                          style={{ backgroundColor: color }}
                        >
                          {title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="h-max">
                <div className="mb-5 text-3xl">Other:</div>
                <div className="flex flex-wrap pl-6">
                  {OtherTechIconList.map(({ icon, color, title }) => {
                    return (
                      <div
                        key={uuid()}
                        className="flex flex-col items-center mb-5 mr-6"
                      >
                        <Iconify
                          icon={icon}
                          color={color}
                          className="block text-6xl "
                        />
                        <div
                          className={`px-2 mt-2 rounded-sm text-black`}
                          style={{ backgroundColor: color }}
                        >
                          {title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            {/* Exp content */}
            <motion.div
              initial={{ opacity: 0, x: "-5vw" }}
              whileInView={
                currentCard === 2 ? { ...appear } : { ...disappear, zIndex: -1 }
              }
              className="absolute top-0 right-0 z-[2001] flex flex-col justify-center w-full h-full"
              onClick={() => {
                dispatch(offMasked());
                setCurrentCard(null);
              }}
            >
              {expTimeline
                .slice(0, 5)
                .map(({ date, action, detail, isDone, logo }, idx: number) => {
                  const last: number =
                    expTimeline.length < 5 ? expTimeline.length - 1 : 4;
                  const isFirstItem = idx === 0;
                  const isLastItem = idx === last;

                  return (
                    <div key={uuid()} className="grid grid-cols-8 gap-4">
                      <div className="flex items-center justify-end col-span-3 text-lg">
                        {date}
                      </div>
                      <div className="relative flex items-center justify-center">
                        <div
                          className={`w-6 h-6 z-[1] rounded-full flex justify-center items-center ring-[0.5rem] ${
                            isDone
                              ? "bg-gray-300 ring-gray-300/40"
                              : "bg-indigo-300 ring-indigo-300/40"
                          }`}
                        >
                          {isDone && <MdDoneAll className="text-gray-700" />}
                        </div>
                        {/* line */}
                        <div
                          className={`absolute top-0 left-1/2 w-1 ${
                            isFirstItem ? "rounded-t" : ""
                          } ${isLastItem ? "h-1/2" : "h-full"} ${
                            isDone ? "bg-gray-300/20" : "bg-indigo-300/20"
                          }`}
                          style={{ transform: "translateX(-50%)" }}
                        ></div>
                      </div>
                      <div className="col-span-4">
                        <div
                          className={`mt-12 mb-2 text-2xl flex items-center ${
                            isDone ? "text-gray-400" : "text-indigo-400"
                          }`}
                        >
                          {logo}
                          {action}
                        </div>
                        <div className="mb-12">{detail}</div>
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          </div>
        )}
        {isMobileOrTablet && (
          <div className="my-5">
            {currentMobileCard === 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                className="block sm:mx-12"
              >
                <div className="flex flex-col items-center justify-center mb-4">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/arnolio.appspot.com/o/arnolio-avatar.webp?alt=media&token=41ec6de0-4c2f-4c18-882f-51e7b3e1dc1a&_gl=1*s7ji5t*_ga*MTM4MjQyNjc5Ni4xNjg2MjkwMjkz*_ga_CW55HF8NVT*MTY4NjI5NDM0OS4yLjEuMTY4NjI5NDM1OS4wLjAuMA.."
                    alt="avatar"
                    height={124}
                    width={124}
                    objectFit="cover"
                    className={`rounded-full block md:mx-auto`}
                  />
                  <div className="mt-2 text-lg text-blue-300">
                    Arnold Truong
                  </div>
                </div>

                <div className="md:mx-10">
                  <span className="text-2xl font-semibold">
                    Who am I<span className="text-blue-300">?</span>
                  </span>{" "}
                  a developer, a gamer with a passion of web development.
                </div>
                <div className="my-5 md:mx-10">
                  <span className="text-2xl font-semibold">
                    What I do<span className="text-blue-300">?</span>
                  </span>{" "}
                  mostly front-end, sometimes back-end and even UX design
                </div>
                <div className="my-5 md:mx-10">
                  <span className="text-2xl font-semibold">
                    Why accompany me<span className="text-blue-300">?</span>
                  </span>{" "}
                  deliver high-quality website with the most modern tools (see
                  tech card)
                </div>
                <div className="my-5 md:mx-10">
                  <span className="text-2xl font-semibold">
                    How to contact me<span className="text-blue-300">?</span>
                  </span>{" "}
                  simple, just{" "}
                  <Link scroll={false} href="#contact">
                    <a
                      onClick={() => {
                        if (isMasked) {
                          dispatch(offMasked());
                        }
                        setCurrentCard(null);
                      }}
                      className="text-blue-400 underline hover:text-blue-500"
                    >
                      click here
                    </a>
                  </Link>
                </div>
              </motion.div>
            )}
            {currentMobileCard === 1 && (
              <div className="flex justify-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                >
                  <div className="h-max md:px-10">
                    <div className="mb-2 text-2xl">Programming:</div>
                    <div className="flex flex-wrap pl-6">
                      {ProgrammingTechIconList.map(({ icon, color, title }) => {
                        return (
                          <div
                            key={uuid()}
                            className="flex flex-col items-center mb-2 mr-3"
                          >
                            <Iconify
                              icon={icon}
                              color={color}
                              className="text-4xl md:text-5xl"
                            />
                            <div
                              className={`px-2 mt-2 rounded-sm text-black`}
                              style={{ backgroundColor: color }}
                            >
                              {title}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="h-max md:px-10">
                    <div className="mb-2 text-2xl">Other:</div>
                    <div className="flex flex-wrap pl-6">
                      {OtherTechIconList.map(({ icon, color, title }) => {
                        return (
                          <div
                            key={uuid()}
                            className="flex flex-col items-center mb-2 mr-3"
                          >
                            <Iconify
                              icon={icon}
                              color={color}
                              className="text-4xl md:text-5xl"
                            />
                            <div
                              className={`px-2 mt-2 rounded-sm text-black`}
                              style={{ backgroundColor: color }}
                            >
                              {title}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            {currentMobileCard === 2 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
              >
                {expTimeline
                  .slice(0, 5)
                  .map(
                    ({ date, action, detail, isDone, logo }, idx: number) => {
                      const last: number =
                        expTimeline.length < 5 ? expTimeline.length - 1 : 4;
                      const isFirstItem = idx === 0;
                      const isLastItem = idx === last;

                      return (
                        <div key={uuid()} className="grid grid-cols-7 gap-4">
                          <div className="flex items-center justify-end col-span-2 text-lg">
                            {date}
                          </div>
                          <div className="relative flex items-center justify-center">
                            <div
                              className={`w-4 h-4 z-[1] rounded-full flex justify-center items-center ring-[0.5rem] ${
                                isDone
                                  ? "bg-gray-300 ring-gray-300/40"
                                  : "bg-indigo-300 ring-indigo-300/40"
                              }`}
                            >
                              {isDone && (
                                <MdDoneAll className="text-gray-700" />
                              )}
                            </div>
                            {/* line */}
                            <div
                              className={`absolute top-0 left-1/2 w-1 ${
                                isFirstItem ? "rounded-t" : ""
                              } ${isLastItem ? "h-1/2" : "h-full"} ${
                                isDone ? "bg-gray-300/20" : "bg-indigo-300/20"
                              }`}
                              style={{ transform: "translateX(-50%)" }}
                            ></div>
                          </div>
                          <div className="col-span-4">
                            <div
                              className={`mt-6 mb-2 text-lg sm:text-xl md:text-2xl flex items-center ${
                                isDone ? "text-gray-400" : "text-indigo-400"
                              }`}
                            >
                              {logo}
                              {action}
                            </div>
                            <div className={`${isLastItem ? "" : "mb-6"}`}>
                              {detail}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
              </motion.div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default About;
