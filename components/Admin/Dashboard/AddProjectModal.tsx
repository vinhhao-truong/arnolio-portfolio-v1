import React, { useEffect, useState } from "react";
import { InferGetServerSidePropsType, NextPage } from "next";
import { firebaseAuth } from "../../../store/firebase";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/globalStateSlice";
import ProjectInterface from "../../../interfaces/ProjectInterface";
import { lowerCaseAddSeparator } from "../../../utils/lowerCase";
import Container from "../../Container";
import { firebaseStorage } from "../../../store/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  useGetAllProjectsQuery,
  usePostNewProjectMutation,
} from "../../../redux/apis/projectsSlice";
import { v4 } from "uuid";
import ReactProps from "../../../interfaces/ReactProps";
import Modal from "../../common/Modal";
import { ModalProps } from "../../../interfaces/ModalProps";

interface AddProejctModalProps extends ModalProps {
  idToken: string | null | undefined;
}

const AddProjectModal: React.FC<AddProejctModalProps> = ({
  idToken,
  isOpen,
  closeModal,
}) => {
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

  const [addPost, { isLoading: addLoading, data: addData, isError: addError }] =
    usePostNewProjectMutation({});

  const resetStates = () => {
    setNewProject({ ...initialNewProject });
    setUploadedImg(null);
  };

  useEffect(() => {
    if (addLoading) {
      dispatch(startLoading());
    } else {
      if (addData) {
        dispatch(stopLoading({ msg: "Project added!" }));
      }
    }
  }, [addLoading, addData]);

  useEffect(() => {
    if (addError) {
      alert("Error");
    }

    if (addData && !addError) {
      resetStates();
      closeModal();
    }
  }, [addData, addError]);

  const handleCreateProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (newProject) {
      try {
        dispatch(startLoading());

        let imgUrl: string = "";
        const slug = newProject.name
          ? lowerCaseAddSeparator(newProject.name, "-")
          : "";

        if (uploadedImg) {
          const storageRef = ref(firebaseStorage, `projects/${slug}`);
          const upload = await uploadBytes(storageRef, uploadedImg[0]);
          const url: string = await getDownloadURL(upload.ref);
          imgUrl = url;
        }

        const name = newProject.name;
        const demoUrl = newProject.demoUrl;
        const thumbnail = imgUrl ? imgUrl : "";
        const srcCodeUrl = newProject.srcCodeUrl;

        if (idToken) {
          addPost({ name, demoUrl, slug, thumbnail, srcCodeUrl, idToken });
        }
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
    <Modal
      closeModal={() => {
        resetStates();
        closeModal();
      }}
      isOpen={isOpen}
      className="w-[660px]"
    >
      <form
        onSubmit={handleCreateProject}
        className="grid grid-cols-1 gap-4 text-black"
      >
        <div className="text-3xl">Add Projects</div>
        <input
          className="w-full border rounded-md arnolio-input"
          value={newProject.name}
          type="text"
          onChange={handleProjectChange("name")}
          placeholder="Project Name"
          required
          autoFocus
        />
        <input
          className="w-full border rounded-md arnolio-input"
          value={newProject.demoUrl}
          type="text"
          onChange={handleProjectChange("demoUrl")}
          placeholder="Project Demo Url"
        />
        <input
          className="w-full border rounded-md arnolio-input"
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
    </Modal>
  );
};

export default AddProjectModal;
