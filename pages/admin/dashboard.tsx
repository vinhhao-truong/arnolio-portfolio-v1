import React, { useEffect, useState } from "react";
import { InferGetServerSidePropsType, NextPage } from "next";
import { firebaseAuth } from "../../store/firebase";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import ProjectInterface from "../../interfaces/ProjectInterface";
import { lowerCaseAddSeparator } from "../../utils/lowerCase";
import Container from "../../components/Container";
import { firebaseStorage } from "../../store/firebase";
import { ref, uploadBytes } from "firebase/storage";

export const getServerSideProps = async () => {
  const admin = firebaseAuth.currentUser;
  return {
    props: {
      isLoggedIn: admin ? true : false,
    },
  };
};

const Dashboard = ({
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const initialNewProject: ProjectInterface = {
    name: "",
    demoUrl: "",
    srcCodeUrl: "",
    thumbnail: "",
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState<ProjectInterface>({
    ...initialNewProject,
  });

  //Persist if being signed in
  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    router.push("/admin");
  }, []);

  const handleCreateProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (newProject) {
      try {
        const res = await axios.post("/api/project", {
          name: newProject.name,
          demoUrl: newProject.demoUrl,
          srcCodeUrl: newProject.srcCodeUrl,
          slug: newProject.name && lowerCaseAddSeparator(newProject.name, "-"),
        });

        const storageRef = ref(firebaseStorage, "projects");
        // await uploadBytes(storageRef, newProject.)

        alert(res.data.data);
        setNewProject({ ...initialNewProject });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleProjectChange =
    (
      field: "name" | "demoUrl" | "srcCodeUrl" | "thumbnail"
    ): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      if (field !== "thumbnail") {
        setNewProject((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
        return;
      }

      // setNewProject((prev) => ({
      //   ...prev,
      //   thumbnail: e.target.files[0],
      // }));
    };

  return (
    <Container className="w-full">
      <p>DashBoard</p>
      <form onSubmit={handleCreateProject} className="grid grid-cols-1 gap-3">
        <div className="text-3xl">Add Projects</div>
        <input
          className="arnolio-input w-1/3 min-w-[3rem]"
          value={newProject.name}
          type="text"
          onChange={handleProjectChange("name")}
          placeholder="Project Name"
          required
        />
        <input
          className="arnolio-input w-1/3 min-w-[3rem]"
          value={newProject.demoUrl}
          type="text"
          onChange={handleProjectChange("demoUrl")}
          placeholder="Project Demo Url"
        />
        <input
          className="arnolio-input w-1/3 min-w-[3rem]"
          value={newProject.srcCodeUrl}
          type="text"
          onChange={handleProjectChange("srcCodeUrl")}
          placeholder="Source Code Url"
        />
        <input
          type="file"
          onChange={handleProjectChange("thumbnail")}
          // value={newProject.thumbnail}
        />
        <button type="submit">Create</button>
      </form>

      <button
        onClick={async () => {
          dispatch(startLoading());
          await axios.post("/api/admin", {
            type: "signOut",
          });
          dispatch(stopLoading());
          alert("Sign out!");
          setTimeout(() => {
            router.push("/admin");
          }, 1000);
        }}
      >
        Sign Out
      </button>
    </Container>
  );
};

export default Dashboard;
