import React, { useRef, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Seo from "../components/Seo";
//home components
import About from "../components/home/About";
import Contact from "../components/home/Contact";
import Landing from "../components/home/Landing";
import Projects from "../components/home/Projects";
//style
import styles from "../styles/HomePage.module.scss";
import { getClasses } from "../utils/getProps";
//motion
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ReactProps from "../interfaces/ReactProps";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router) {
    }
  }, [router]);

  return (
    <>
      <Seo title="Arnolio" />
      <motion.div
        className={`${getClasses(
          styles.container
        )} w-full flex flex-col items-center`}
      >
        <Landing className={`${getClasses(styles.landing)}`} />
        <About />
        <Projects />
        <Contact />
      </motion.div>
    </>
  );
};

export default HomePage;
