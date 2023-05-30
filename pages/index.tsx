import React, { useRef, useEffect, useState } from "react";
import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Seo from "../components/Seo";
import useResponsive from "../hooks/useResponsive";
//home components
import About from "../components/homePage/About";
import Contact from "../components/homePage/Contact";
import Landing from "../components/homePage/Landing";
import Projects from "../components/homePage/Projects";
import OldProjects from "../components/homePage/OldProjects";
//style
import styles from "../styles/HomePage.module.scss";
import { getClasses } from "../utils/getProps";
//motion
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ReactProps from "../interfaces/ReactProps";
import { useRouter } from "next/router";
//axios
import axios from "axios";
//redux
import { useDispatch } from "react-redux";

export const getServerSideProps = async () => {
  const projects: any[] = [];

  try {
    // @ts-ignore
    const res = await axios.get(process.env.PROJECT_API);

    projects.push(...Object.values(res.data).reverse());
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      projects: projects,
    },
  };
};

const HomePage = ({
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const responsive = useResponsive();

  return (
    <>
      <Seo
        title="Arnolio"
        description="Arnold Truong's portfolio to showcase his development projects."
        og={{
          title: "Arnolio - Arnold Truong's portfolio",
          url: "arnolio.vercel.app",
          description:
            "Arnold Truong's portfolio to showcase his development projects.",
        }}
      />
      {
        <motion.div
          className={`${getClasses(
            styles.container
          )} w-full flex flex-col items-center`}
        >
          <Landing className={`${getClasses(styles.landing)}`} />
          <About />
          {/* {projects && <Projects projectList={projects} />} */}
          {/* <Projects projects={projects} /> */}
          <OldProjects projectList={projects} />
          <Contact />
        </motion.div>
      }
    </>
  );
};

export default HomePage;
