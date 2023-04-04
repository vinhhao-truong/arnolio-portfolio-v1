import React, { useRef, useEffect, useState } from "react";
import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Seo from "../components/Seo";
import useResponsive from "../hooks/useResponsive";
//home components
import About from "../components/Home/About";
import Contact from "../components/Home/Contact";
import Landing from "../components/Home/Landing";
import Projects from "../components/Home/Projects";
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

  console.log("responsive", responsive);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const db = ref(database, "/project");

  //       onValue(db, async (snapshot) => {
  //         const data = await snapshot.val();

  //         console.log(data);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

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
          {projects && <Projects projectList={projects} />}
          <Contact />
        </motion.div>
      }
    </>
  );
};

export default HomePage;
