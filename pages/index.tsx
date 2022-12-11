import React, { useRef, useEffect, useState } from "react";
import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Seo from "../components/Seo";
import useResponsive from "../hooks/useResponsive";
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
import {
  initiateMenu,
  startLoading,
  stopLoading,
} from "../redux/globalStateSlice";
//firebase
import { firebaseDb } from "../store/firebase";
import { update, ref, onValue } from "firebase/database";
import ProjectInterface from "../interfaces/ProjectInterface";
import AboutMobile from "../components/home/AboutMobile";

// export const getServerSideProps = async () => {
//   const projects: any[] = [];

//   const projectRef = ref(firebaseDb, "project");
//   try {
//     onValue(projectRef, (snapshot) => {
//       const data = snapshot.val();
//       projects.push(...Object.values(data));
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   return {
//     props: {
//       projects: projects,
//     },
//   };
// };

const HomePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const responsive = useResponsive();
  const isDesktop: boolean = ["lg", "xl", "2xl"].includes(responsive);

  const [projectList, setProjectList] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    // console.log(projects);

    dispatch(startLoading());
    (async () => {
      try {
        // @ts-ignore
        const res = await axios.get(process.env.PROJECT_API);

        setProjectList(Object.values(res.data).reverse());
      } catch (err) {
        console.log(err);
      }
    })();
    dispatch(stopLoading());
  }, []);

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
          {projectList && <Projects projectList={projectList} />}
          <Contact />
        </motion.div>
      }
    </>
  );
};

export default HomePage;
