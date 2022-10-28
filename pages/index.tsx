import React, { useRef, useEffect } from "react";
import type { InferGetServerSidePropsType, NextPage } from "next";
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
//axios
import axios from "axios";
//redux
import { useDispatch } from "react-redux";
import { initiateMenu } from "../redux/globalStateSlice";
//firebase
import { firebaseDb } from "../store/firebase";
import { update, ref, onValue } from "firebase/database";
import ProjectInterface from "../interfaces/ProjectInterface";

export const getServerSideProps = async () => {
  const projects: any[] = [];

  const projectRef = ref(firebaseDb, "project");
  try {
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      projects.push(...Object.values(data));
    });
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

  useEffect(() => {
    dispatch(initiateMenu());
    console.log(projects);
  }, []);

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
        <Projects projectList={projects} />
        <Contact />
      </motion.div>
    </>
  );
};

export default HomePage;
