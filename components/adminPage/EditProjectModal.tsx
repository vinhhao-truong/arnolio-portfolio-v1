import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import ProjectInterface from "../../interfaces/ProjectInterface";
import { lowerCaseAddSeparator } from "../../utils/lowerCase";
import Container from "../Container";
import { firebaseStorage } from "../../store/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import {
  useEditProjectMutation,
  usePostNewProjectMutation,
} from "../../redux/apis/projectsSlice";
import Modal from "../common/Modal";
import { ModalProps } from "../../interfaces/ModalProps";
import Image from "next/image";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdClear, MdDone } from "react-icons/md";

interface EditProejctModalProps extends ModalProps {
  idToken: string | null | undefined;
  initialProject: ProjectInterface;
  id: string;
}

const EditProjectModal: React.FC<EditProejctModalProps> = ({
  idToken,
  isOpen,
  closeModal,
  initialProject,
  id,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [thisProject, setThisProject] = useState<ProjectInterface>({
    ...initialProject,
  });
  const [uploadedThumbnail, setUploadedThumbnail] = useState<FileList | null>(
    null
  );
  const [uploadedImg, setUploadedImg] = useState<FileList | null>(null);
  const [thisThumbnail, setThisThumbnail] = useState<string | undefined>(
    initialProject.thumbnail
  );
  const [thisImgList, setThisImgList] = useState<string[] | undefined>(
    initialProject.imgList
  );
  const [isDeletingImgList, setIsDeletingImgList] = useState<boolean>(false);

  const [
    editProject,
    { isLoading: editLoading, data: editData, isError: editError },
  ] = useEditProjectMutation({});

  const resetStates = () => {
    setThisProject({ ...initialProject });
    setUploadedImg(null);
    setUploadedThumbnail(null);
    setIsDeletingImgList(false);
  };

  useEffect(() => {
    setThisProject(initialProject);
    setThisThumbnail(initialProject.thumbnail);
    setThisImgList(initialProject.imgList);
  }, [initialProject]);

  useEffect(() => {
    if (editLoading) {
      dispatch(startLoading());
    } else {
      if (editData) {
        dispatch(stopLoading({ msg: `Updated!` }));
      }
    }
  }, [editLoading, editData]);

  useEffect(() => {
    if (editError) {
      alert("Error");
    }

    if (editData && !editError) {
      resetStates();
      closeModal();
    }
  }, [editData, editError]);

  const handleCreateProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (thisProject) {
      try {
        dispatch(startLoading());

        let thumbnailUrl: string = "";
        const uploadedImgList: string[] = [];

        const slug = thisProject.slug;

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
        const editedImgList = !!uploadedImg ? { imgList: uploadedImgList } : {};

        const editedThumbnail = !!uploadedThumbnail ? { thumbnail } : {};

        if (idToken) {
          editProject({
            projectData: {
              ...thisProject,
              ...editedImgList,
              ...editedThumbnail,
            },
            idToken,
            id,
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
      setThisProject((prev) => ({
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
      setThisProject((prev) => ({
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
        <div className="text-3xl">
          Editing{" "}
          <span className="text-3xl font-semibold text-blue-theme">
            {initialProject.name}
          </span>
        </div>
        <label className="flex items-center gap-2" htmlFor="checkbox-pin">
          <input
            type="checkbox"
            name="checkbox-pin"
            id="checkbox-pin"
            checked={thisProject.isPinned}
            onChange={() =>
              setThisProject((prev) => ({ ...prev, isPinned: !prev.isPinned }))
            }
          />
          Pinned?
        </label>
        <label htmlFor="input-owner">
          Owner
          <input
            className="w-full border rounded-md arnolio-input"
            value={thisProject.owner}
            type="text"
            onChange={handleNewProjectChange("owner")}
            placeholder="Owner *"
            id="input-owner"
            name="input-owner"
            required
          />
        </label>
        <label htmlFor="input-description">
          Description
          <input
            className="w-full border rounded-md arnolio-input"
            value={thisProject.description}
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
              value={thisProject.demoUrl}
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
              value={thisProject.srcCodeUrl}
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
              value={thisProject.status}
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
              value={thisProject.progress}
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
                uploadedThumbnail && uploadedThumbnail.length
                  ? URL.createObjectURL(uploadedThumbnail[0])
                  : thisThumbnail
                  ? thisThumbnail
                  : "https://dummyimage.com/600x400/0076b6/ffffff.jpg&text=upload"
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
          accept=".jpeg,.jpg,.webp,.png,.svg"
          name="upload-image-input"
          id="upload-image-input"
          className="hidden"
          // value={uploadedImg}
        />
        <label htmlFor="upload-image-input">Image List</label>
        {thisImgList && (
          <div className="flex items-center gap-1 -my-4 text-sm leading-snug text-red-600 w-max ">
            <RiDeleteBin5Fill />{" "}
            <span
              onClick={() => {
                setIsDeletingImgList((prev) => !prev);
              }}
              className="cursor-pointer hover:text-red-700"
            >
              {isDeletingImgList ? "Are you sure?" : "Clear Image List"}
            </span>
            {isDeletingImgList && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsDeletingImgList(false)}
                  className="p-1 text-xs rounded-full text-white-theme bg-blue-theme hover:brightness-90"
                >
                  <MdClear />
                </button>
                <button
                  onClick={async () => {
                    const storageRef = ref(
                      firebaseStorage,
                      `projects/${initialProject.slug}/`
                    );
                    try {
                      const thisFolder = await listAll(storageRef);
                      thisFolder.items.forEach(async (dir) => {
                        try {
                          await deleteObject(dir);
                        } catch (err) {
                          console.log(err);
                        }
                      });
                      await editProject({
                        id,
                        idToken,
                        projectData: {
                          imgList: [],
                        },
                      });
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  className="p-1 text-xs rounded-full text-white-theme bg-red-theme hover:brightness-90"
                >
                  <MdDone />
                </button>
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-4 gap-x-2">
          {!thisImgList &&
            (!uploadedImg ||
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
            uploadedImg.length &&
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
          {!uploadedImg &&
            thisImgList &&
            thisImgList.slice(0, 4).map((img, idx) => {
              const RenderedImage = () => {
                return (
                  <Image
                    src={img}
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
                      + {thisImgList.length - 4}
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
          Change
        </button>
      </form>
    </Modal>
  );
};

export default EditProjectModal;
