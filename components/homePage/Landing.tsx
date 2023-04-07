import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import { getClasses } from "../../utils/getProps";
import Container from "../Container";
import Section from "../Section";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import useResponsive from "../../hooks/useResponsive";
import Delayed from "../common/Delayed";

interface LandingProps extends ReactProps {}
const Landing: React.FC<LandingProps> = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const [scrollIsHidden, setScrollIsHidden] = useState(false);
  const [content, setContent] = useState("BIO");

  const responsive = useResponsive();
  const isDesktop = ["lg"].includes(responsive);
  const isBigScreen = ["xl", "2xl"].includes(responsive);
  const isTablet = ["md"].includes(responsive);
  const isMobile = ["2xs", "xs", "sm"].includes(responsive);

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      if (v < 0.2) {
        setScrollIsHidden(false);
        return;
      }
      setScrollIsHidden(true);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const changeContent = setInterval(() => {
      setContent((prev) => {
        if (prev === "BIO") return "PROJECTS";
        if (prev === "PROJECTS") return "CONTACT";
        return "BIO";
      });
    }, 1500);

    return () => clearInterval(changeContent);
  }, []);

  return (
    <Section
      id="landing"
      className={`${getClasses(
        className
      )} flex flex-col justify-around items-center`}
    >
      <div className="flex flex-col items-center justify-end h-3/5">
        <Delayed waitBeforeShow={50}>
          <Link href="/#about" scroll={false}>
            <a className="">
              <motion.img
                src="/rounded-icon/android-chrome-512x512.png"
                alt="logo"
                width={
                  isBigScreen
                    ? 256
                    : isDesktop
                    ? 192
                    : isTablet
                    ? 164
                    : isMobile
                    ? 132
                    : 100
                }
                height={
                  isBigScreen
                    ? 256
                    : isDesktop
                    ? 192
                    : isTablet
                    ? 164
                    : isMobile
                    ? 132
                    : 100
                }
                className="cursor-pointer"
                animate={{
                  borderRadius: ["50%", "0%", "50%"],
                  transition: {
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "anticipate",
                  },
                }}
              />
            </a>
          </Link>
        </Delayed>

        <div className="mt-10 text-3xl text-center md:text-4xl lg:text-5xl">
          How&rsquo;re you doing? Welcome to{" "}
          <span className="text-red-theme">Arnold</span>&rsquo;s showcase space.
        </div>
        <div className="flex mt-6 text-xl xs:text-2xl md:text-3xl lg:text-4xl">
          You will see my{" "}
          <div className="flex items-center justify-center w-40 ml-2 rounded bg-blue-theme">
            <motion.div
              animate={{
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "backOut",
                },
                // opacity: [0, 1, 0],
                y: [
                  "-0.5rem",
                  "0rem",
                  "0rem",
                  "0rem",
                  "0rem",
                  "0rem",
                  "0rem",
                  "0.5rem",
                ],
                opacity: [1, 1, 1, 1, 1, 1, 1, 0],
              }}
              className="text-3xl text-white-theme"
            >
              {content}
            </motion.div>
          </div>
        </div>
      </div>

      <Link href="/#about" scroll={false}>
        <motion.a
          animate={
            scrollIsHidden
              ? { opacity: 0, y: -10, userSelect: "none" }
              : { opacity: 1 }
          }
          className="flex flex-col items-center justify-around text-blue-200 cursor-pointer h-1/5"
        >
          <div className="text-lg xs:text-xl md:text-2xl lg:text-3xl">
            Scroll down
          </div>
          <motion.div
            animate={{
              y: [8, 0, 8],
              transition: { repeat: Infinity, duration: 1 },
            }}
          >
            <Icon
              className="text-xl xs:text-2xl md:text-3xl lg:text-4xl"
              icon="material-symbols:keyboard-double-arrow-down-rounded"
            />
          </motion.div>
        </motion.a>
      </Link>
    </Section>
  );
};

export default Landing;
