import Cookies from "js-cookie";
import moment from "moment";
import React, { useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "../../redux/apis/projectsSlice";
import systemColor from "../../utils/getSystemColor";
import Loader from "../common/Loader";
import EditProjectModal from "./EditProjectModal";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import DeleteProjectModal from "./DeleteProjectModal";

interface ProjectsTableProps extends ReactProps {}

const Id: React.FC<ReactProps> = ({ children }) => {
  return <div className="col-span-3">{children}</div>;
};

const Name: React.FC<ReactProps> = ({ children }) => {
  return <div className="col-span-4">{children}</div>;
};

const LastUpdate: React.FC<ReactProps> = ({ children }) => {
  return <div className="col-span-2">{children}</div>;
};

const Action: React.FC<ReactProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-end col-span-3">{children}</div>
  );
};

const ProjectsTable: React.FC<ProjectsTableProps> = () => {
  const { data: projects, isLoading, isFetching } = useGetAllProjectsQuery({});
  const [deleteProject, deleteResult] = useDeleteProjectMutation({});
  const isProjectsLoading: boolean = !projects && isLoading && isFetching;

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null
  );

  const projectsList =
    projects &&
    Object.entries(projects)
      .sort((a, b) => {
        //@ts-ignore
        const timeA = moment(a[1]?.lastUpdate);
        //@ts-ignore
        const timeB = moment(b[1]?.lastUpdate);
        return timeA.diff(timeB) > 0 ? -1 : timeA.diff(timeB) < 0 ? 1 : 0;
      })
      .map((p) => p[0]);

  const closeEditModal = () => setSelectedProjectId(null);
  const closeDeleteModal = () => setDeletingProjectId(null);

  return isProjectsLoading ? (
    <div className="mx-auto">
      <Loader
        type="Surrounded Dot"
        color={systemColor["red-theme"]}
        className="w-[50px]"
      />
    </div>
  ) : (
    <>
      <div className="overflow-hidden text-black rounded-md bg-white-theme">
        {/* HEAD */}
        <div className="grid grid-cols-12 px-2 py-3 bg-blue-theme text-white-theme ">
          <Id>ID</Id>
          <Name>Name</Name>
          <LastUpdate>Last Update</LastUpdate>
          <Action className="">Action</Action>
        </div>
        {/* BODY */}
        {projectsList?.map((id: string) => {
          const thisProject = projects[id];

          return (
            <div
              className="grid grid-cols-12 p-2 my-1 hover:bg-blue-theme/10"
              key={id}
            >
              <Id>{id}</Id>
              <Name>{thisProject.name}</Name>
              <LastUpdate>
                {moment(thisProject.lastUpdate).format("DD/MM/YY hh:mm A")}
              </LastUpdate>
              <Action className="flex items-center">
                <button
                  onClick={() => setSelectedProjectId(id)}
                  className="p-1 z-1 outline-none flex justify-center items-center w-[35px] h-[35px] bg-blue-600 rounded-full hover:bg-blue-700 mr-1.5 text-white-theme"
                >
                  <AiTwotoneEdit className="text-sm" />
                </button>
                <button
                  onClick={async () => {
                    setDeletingProjectId(id);
                  }}
                  className="p-1 z-1 outline-none flex justify-center items-center w-[35px] h-[35px] bg-red-600 rounded-full hover:bg-red-700 text-white-theme"
                >
                  {deletingProjectId === id ? (
                    <Loader type="Surrounded Dot" className="w-[50px]" />
                  ) : (
                    <RiDeleteBin5Fill className="text-sm" />
                  )}
                </button>
              </Action>
            </div>
          );
        })}
      </div>
      {selectedProjectId && (
        <EditProjectModal
          idToken={Cookies.get("idToken")}
          closeModal={closeEditModal}
          isOpen={!!selectedProjectId}
          initialProject={projects[selectedProjectId]}
          id={selectedProjectId}
        />
      )}
      {deletingProjectId && (
        <DeleteProjectModal
          closeModal={closeDeleteModal}
          isOpen={!!deletingProjectId}
          name={projects[deletingProjectId]?.name}
          id={deletingProjectId}
          slug={projects[deletingProjectId]?.slug}
        />
      )}
    </>
  );
};

export default ProjectsTable;
