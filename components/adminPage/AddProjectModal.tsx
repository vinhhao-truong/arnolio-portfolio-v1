import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import ProjectInterface from "../../interfaces/ProjectInterface";
import { lowerCaseAddSeparator } from "../../utils/lowerCase";
import Container from "../Container";
import { firebaseStorage } from "../../store/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { usePostNewProjectMutation } from "../../redux/apis/projectsSlice";
import Modal from "../common/Modal";
import { ModalProps } from "../../interfaces/ModalProps";
import Image from "next/image";

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
    description: "",
    demoUrl: "",
    srcCodeUrl: "",
    thumbnail: "",
    status: "Live",
    owner: "",
    progress: "In Progress",
    isPinned: false,
  };
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState<ProjectInterface>({
    ...initialNewProject,
  });
  const [uploadedThumbnail, setUploadedThumbnail] = useState<FileList | null>(
    null
  );
  const [uploadedImg, setUploadedImg] = useState<FileList | null>(null);

  const [addPost, { isLoading: addLoading, data: addData, isError: addError }] =
    usePostNewProjectMutation({});

  const resetStates = () => {
    setNewProject({ ...initialNewProject });
    setUploadedImg(null);
    setUploadedThumbnail(null);
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

        let thumbnailUrl: string = "";
        const uploadedImgList: string[] = [];

        const allSpecialRegex = /[^A-Za-z0-9\ ]/g;

        const slug = newProject.name
          ? lowerCaseAddSeparator(
              newProject.name.replaceAll(allSpecialRegex, " "),
              "-"
            )
          : "";

        if (uploadedThumbnail && Array.from(uploadedThumbnail).length > 0) {
          const storageRef = ref(firebaseStorage, `projects/${slug}-thumbnail`);
          const upload = await uploadBytes(storageRef, uploadedThumbnail[0]);
          const url: string = await getDownloadURL(upload.ref);
          thumbnailUrl = url;
        }

        if (uploadedImg && Array.from(uploadedImg).length > 0) {
          let idx = 0;

          for (const image of Array.from(uploadedImg)) {
            const storageRef = ref(
              firebaseStorage,
              `projects/${slug}/img_no${idx}`
            );
            const upload = await uploadBytes(storageRef, uploadedImg[idx]);
            const url: string = await getDownloadURL(upload.ref);
            uploadedImgList.push(url);
            idx += 1;
          }
        }

        const thumbnail = thumbnailUrl;

        if (idToken) {
          addPost({
            projectData: {
              ...newProject,
              slug,
              thumbnail,
              imgList: uploadedImgList,
            },
            idToken,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNewProjectChange =
    (
      field: keyof ProjectInterface
    ): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      setNewProject((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSelectChange =
    (
      field: keyof ProjectInterface
    ): React.ChangeEventHandler<HTMLSelectElement> =>
    (e) => {
      e.preventDefault();
      setNewProject((prev) => ({
        ...prev,
        [field]: e.target.value.trim(),
      }));
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
        <label className="flex items-center gap-2" htmlFor="checkbox-pin">
          <input
            type="checkbox"
            name="checkbox-pin"
            id="checkbox-pin"
            checked={newProject.isPinned}
            onChange={() =>
              setNewProject((prev) => ({ ...prev, isPinned: !prev.isPinned }))
            }
          />
          Pinned?
        </label>
        <label htmlFor="input-name">
          Name
          <input
            className="w-full border rounded-md arnolio-input"
            value={newProject.name}
            type="text"
            onChange={handleNewProjectChange("name")}
            placeholder="Project Name *"
            required
            autoFocus
            name="input-name"
            id="input-name"
          />
        </label>

        <label htmlFor="input-owner">
          Owner
          <input
            className="w-full border rounded-md arnolio-input"
            value={newProject.owner}
            type="text"
            onChange={handleNewProjectChange("owner")}
            placeholder="Owner *"
            required
            id="input-owner"
            name="input-owner"
          />
        </label>

        <label htmlFor="input-description">
          Description
          <input
            className="w-full border rounded-md arnolio-input"
            value={newProject.description}
            type="text"
            onChange={handleNewProjectChange("description")}
            placeholder="Description"
            id="input-description"
            name="input-description"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label htmlFor="input-demo-url">
            Demo Url
            <input
              className="w-full border rounded-md arnolio-input"
              value={newProject.demoUrl}
              type="text"
              onChange={handleNewProjectChange("demoUrl")}
              placeholder="Project Demo Url"
              id="input-demo-url"
              name="input-demo-url"
            />
          </label>

          <label htmlFor="input-src-code">
            Source Code Url
            <input
              className="w-full border rounded-md arnolio-input"
              value={newProject.srcCodeUrl}
              type="text"
              onChange={handleNewProjectChange("srcCodeUrl")}
              placeholder="Source Code Url"
              id="input-src-code"
              name="input-src-code"
            />
          </label>

          <label htmlFor="status-sel" className="flex flex-col">
            Status
            <select
              name="status-sel"
              id="status-sel"
              onChange={handleSelectChange("status")}
              value={newProject.status}
              className="p-0.5 rounded border"
            >
              {["Live", "Down"].map((s, idx) => {
                return (
                  <option value={s} key={`status-option-${s}`}>
                    {s}
                  </option>
                );
              })}
            </select>
          </label>

          <label htmlFor="progress-sel" className="flex flex-col">
            Progress
            <select
              name="progress-sel"
              id="progress-sel"
              onChange={handleSelectChange("progress")}
              value={newProject.progress}
              className="p-0.5 rounded border"
            >
              {["In Progress", "Done"].map((p, idx) => {
                return (
                  <option value={p} key={`progress-option-${p}`}>
                    {p}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        {/* UPLOAD THUMBNAIL */}
        <input
          type="file"
          onChange={(e) => {
            e.preventDefault();
            if (e.target.files?.length) {
              setUploadedThumbnail(e.target.files);
            }
          }}
          accept=".jpeg,.jpg,.webp,.png,.svg"
          name="upload-thumbnail-input"
          id="upload-thumbnail-input"
          className="hidden"
          // value={uploadedImg}
        />
        <label htmlFor="upload-thumbnail-input">Thumbnail</label>
        <div className="grid grid-cols-4 gap-x-2">
          <label htmlFor="upload-thumbnail-input" className="relative">
            <Image
              src={
                !uploadedThumbnail ||
                (uploadedThumbnail &&
                  Array.from(uploadedThumbnail).length === 0)
                  ? `https://dummyimage.com/600x400/0076b6/ffffff.jpg&text=upload`
                  : URL.createObjectURL(uploadedThumbnail[0])
              }
              alt=""
              layout="responsive"
              width="100%"
              height="60%"
              objectFit="contain"
              className="rounded cursor-pointer"
            />
          </label>
        </div>
        {/* UPLOAD IMAGE LIST */}
        <input
          type="file"
          onChange={(e) => {
            e.preventDefault();
            if (e.target.files?.length) {
              setUploadedImg(e.target.files);
            }
          }}
          multiple
          accept=".jpeg,.jpg,.webp,.png"
          name="upload-image-input"
          id="upload-image-input"
          className="hidden"
          // value={uploadedImg}
        />
        <label htmlFor="upload-image-input">Image List</label>
        <div className="grid grid-cols-4 gap-x-2">
          {(!uploadedImg ||
            (uploadedImg && Array.from(uploadedImg).length === 0)) && (
            <label htmlFor="upload-image-input" className="relative">
              <Image
                src={`https://dummyimage.com/600x400/0076b6/ffffff.jpg&text=upload`}
                alt=""
                layout="responsive"
                width="100%"
                height="60%"
                objectFit="contain"
                className="rounded cursor-pointer"
              />
            </label>
          )}
          {uploadedImg &&
            Array.from(uploadedImg)
              .slice(0, 4)
              .map((img, idx) => {
                const RenderedImage = () => {
                  return (
                    <Image
                      src={URL.createObjectURL(uploadedImg[idx])}
                      alt=""
                      layout="responsive"
                      width="100%"
                      height="60%"
                      objectFit="contain"
                      className="rounded cursor-pointer"
                    />
                  );
                };

                return (
                  <label
                    htmlFor="upload-image-input"
                    className="relative overflow-hidden"
                    key={`preview-img-${idx}`}
                  >
                    <RenderedImage />
                    {idx === 3 && (
                      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-lg text-white bg-black/60">
                        + {Array.from(uploadedImg).length - 4}
                      </div>
                    )}
                  </label>
                );
              })}
        </div>

        <button
          type="submit"
          className="block px-4 py-1 mx-auto rounded hover:text-white-theme/90 text-white-theme bg-blue-theme w-max"
        >
          Create
        </button>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
