import React, { useEffect, useState } from "react";
import { InferGetServerSidePropsType, NextPage } from "next";
import { firebaseAuth } from "../../store/firebase";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import ProjectInterface from "../../interfaces/ProjectInterface";
import { lowerCaseAddSeparator } from "../../utils/lowerCase";

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
          ...newProject,
          slug: newProject.name && lowerCaseAddSeparator(newProject.name, "-"),
        });

        alert(res.data.data);
        setNewProject({ ...initialNewProject });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleProjectChange =
    (field: "name" | "demoUrl"): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      setNewProject((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <>
      <p>DashBoard</p>
      <form onSubmit={handleCreateProject} className="grid gap-3">
        <div className="text-3xl">Add Projects</div>
        <input
          className="arnolio-input"
          value={newProject.name}
          type="text"
          onChange={handleProjectChange("name")}
          placeholder="Project Name"
          required
        />
        <input
          className="arnolio-input"
          value={newProject.demoUrl}
          type="text"
          onChange={handleProjectChange("demoUrl")}
          placeholder="Project Demo Url"
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
    </>
  );
};

export default Dashboard;
