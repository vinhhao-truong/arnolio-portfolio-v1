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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [uploadedImg, setUploadedImg] = useState<FileList | null>(null);

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
        let imgUrl: string = "";

        if (uploadedImg) {
          const storageRef = ref(firebaseStorage, "projects");
          const upload = await uploadBytes(storageRef, uploadedImg[0]);
          const url: string = await getDownloadURL(upload.ref);

          imgUrl = url;
        }

        await axios.post("/api/project", {
          name: newProject.name,
          demoUrl: newProject.demoUrl,
          slug: newProject.name && lowerCaseAddSeparator(newProject.name, "-"),
          thumbnail: imgUrl,
        });

        // await uploadBytes(storageRef, newProject.)

        alert("New blog created");
        setNewProject({ ...initialNewProject });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleProjectChange =
    (
      field: "name" | "demoUrl" | "srcCodeUrl"
    ): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      setNewProject((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      return;

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
        {/* UPLOAD */}
        <input
          type="file"
          onChange={(e) => {
            e.preventDefault();
            setUploadedImg(e.target.files);
          }}
          // value={uploadedImg}
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
