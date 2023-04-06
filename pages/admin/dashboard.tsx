import React, { useEffect, useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { firebaseAuth } from "../../store/firebase";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import Container from "../../components/Container";
import { firebaseStorage } from "../../store/firebase";
import { useGetAllProjectsQuery } from "../../redux/apis/projectsSlice";
import { v4 } from "uuid";
import AddProjectModal from "../../components/adminPage/AddProjectModal";
import { AuthEnum } from "../../interfaces/Firebase";
import Cookies from "js-cookie";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
import { getFirebaseAuthApi } from "../../store/firebaseAuth";
import ProjectsTable from "../../components/adminPage/ProjectsTable";
import moment from "moment";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const idToken = ctx.req.cookies.idToken;

  const type: keyof typeof AuthEnum = "Get User Data";

  try {
    await axios.post(getFirebaseAuthApi(type), {
      idToken,
    });
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }

  if (!idToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }

  return {
    props: {
      // isLoggedIn: admin ? true : false,
      // idToken: admin ? idToken : null,
    },
  };
};

const Dashboard = ({}: // idToken,
InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState({
    addProject: false,
  });

  const closeModal = (modalType: string) => () => {
    setIsModalOpen((prev) => ({ ...prev, [modalType]: false }));
  };
  const openModal = (modalType: string) => () => {
    setIsModalOpen((prev) => ({ ...prev, [modalType]: true }));
  };

  return (
    <>
      <AddProjectModal
        isOpen={isModalOpen.addProject}
        closeModal={closeModal("addProject")}
        idToken={Cookies.get("idToken")}
      />
      <button
        onClick={async () => {
          dispatch(startLoading());
          await axios.post("/api/admin", {
            type: "signOut",
          });
          dispatch(stopLoading());
          alert("Sign out!");
          setTimeout(() => {
            router.replace("/admin");
          }, 1000);
        }}
      >
        Sign Out
      </button>
      <Container className="flex flex-col gap-4">
        <div className="flex justify-start">
          <motion.div
            whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
            className="p-3 my-2 rounded-full cursor-pointer bg-blue-theme"
            onClick={openModal("addProject")}
          >
            <IoMdAdd className="text-lg text-white" />
          </motion.div>
        </div>

        <ProjectsTable />
      </Container>
    </>
  );
};

export default Dashboard;
