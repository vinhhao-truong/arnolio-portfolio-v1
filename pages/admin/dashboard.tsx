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

export const getServerSideProps: GetServerSideProps = async () => {
  // const admin = firebaseAuth.currentUser;
  // const idToken = await admin?.getIdToken();

  // if (!idToken) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/admin",
  //     },
  //   };
  // }

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

  const { data: projects } = useGetAllProjectsQuery({});

  const [isModalOpen, setIsModalOpen] = useState({
    addProject: false,
  });

  useEffect(() => {
    if (!Cookies.get("idToken")) {
      router.replace("/admin");
    } else {
      (async () => {
        const type: keyof typeof AuthEnum = "Get User Data";

        try {
          await axios.post("/api/admin/auth", {
            type,
            idToken: Cookies.get("idToken"),
          });
        } catch (err) {
          Cookies.remove("idToken");
          router.replace("/admin");
        }
      })();
    }
  }, []);

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
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="block p-3 mx-auto my-2 rounded-full bg-blue-theme"
          onClick={openModal("addProject")}
        >
          <IoMdAdd className="text-lg text-white cursor-pointer" />
        </motion.div>
        {projects?.map((p) => {
          return <div key={v4()}>{p.name}</div>;
        })}
      </Container>
    </>
  );
};

export default Dashboard;
