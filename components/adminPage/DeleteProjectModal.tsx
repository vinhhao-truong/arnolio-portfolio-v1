import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import ProjectInterface from "../../interfaces/ProjectInterface";
import { lowerCaseAddSeparator } from "../../utils/lowerCase";
import Container from "../Container";
import { firebaseStorage } from "../../store/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  useDeleteProjectMutation,
  usePostNewProjectMutation,
} from "../../redux/apis/projectsSlice";
import Modal from "../common/Modal";
import { ModalProps } from "../../interfaces/ModalProps";
import Image from "next/image";
import Cookies from "js-cookie";

interface AddProejctModalProps extends ModalProps {
  name: string;
  id: string;
}

const DeleteProjectModal: React.FC<AddProejctModalProps> = ({
  name,
  id,
  isOpen,
  closeModal,
}) => {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation({});

  const handleDeleteProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await deleteProject({ id, idToken: Cookies.get("idToken") });
      closeModal();
    } catch (err) {
      console.log(err);
    }
    e.preventDefault();
  };

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} className="w-[400px]">
      <form
        onSubmit={handleDeleteProject}
        className="grid grid-cols-1 gap-6 text-black"
      >
        <h1 className="text-2xl text-center">
          Are you sure you want to delete{" "}
          <span className="text-4xl font-semibold text-red-theme">{name}</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="px-4 py-1 text-gray-500 bg-gray-300 rounded hover:text-gray-600 w-max"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-1 bg-red-600 rounded disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed hover:text-white-theme/90 text-white-theme w-max"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteProjectModal;
