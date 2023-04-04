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
import ProjectInterface from "../../interfaces/ProjectInterface";
import { lowerCaseAddSeparator } from "../../utils/lowerCase";
import Container from "../../components/Container";
import { firebaseStorage } from "../../store/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  useGetAllProjectsQuery,
  usePostNewProjectMutation,
} from "../../redux/apis/projectsSlice";
import { v4 } from "uuid";
import AddProjectModal from "../../components/adminPage/AddProjectModal";
import Modal from "../../components/common/Modal";

export const getServerSideProps: GetServerSideProps = async () => {
  const admin = firebaseAuth.currentUser;
  const idToken = await admin?.getIdToken();

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
      isLoggedIn: admin ? true : false,
      idToken: admin ? idToken : null,
    },
  };
};

const Dashboard = ({
  idToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: projects } = useGetAllProjectsQuery({});

  const [isModalOpen, setIsModalOpen] = useState({
    addProject: false,
  });

  console.log(idToken);

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
        idToken={idToken}
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
        <div className="" onClick={openModal("addProject")}>
          Add
        </div>
        {projects?.map((p) => {
          return <div key={v4()}>{p.name}</div>;
        })}
      </Container>
    </>
  );
};

export default Dashboard;
