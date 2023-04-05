import React, { useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import { useGetAllProjectsQuery } from "../../redux/apis/projectsSlice";
import systemColor from "../../utils/getSystemColor";
import Loader from "../common/Loader";

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
  const isProjectsLoading: boolean = !projects && isLoading && isFetching;

  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const closeEditModal = () => setSelectedProject(null);

  return isProjectsLoading ? (
    <div className="mx-auto">
      <Loader
        type="Surrounded Dot"
        color={systemColor["red-theme"]}
        className="w-[50px]"
      />
    </div>
  ) : (
    <div className="overflow-hidden text-black rounded-md bg-white-theme">
      {/* HEAD */}
      <div className="grid grid-cols-12 px-2 py-3 bg-blue-theme text-white-theme ">
        <Id>ID</Id>
        <Name>Name</Name>
        <LastUpdate>Last Update</LastUpdate>
        <Action className="">Action</Action>
      </div>
      {/* BODY */}
      {projects &&
        Object.keys(projects).map((id) => {
          const thisProject = projects[id];

          return (
            <div
              onClick={() => setSelectedProject(id)}
              className="grid grid-cols-12 p-2 my-1 cursor-pointer hover:bg-blue-theme/10"
              key={id}
            >
              <Id>{id}</Id>
              <Name>{thisProject.name}</Name>
              <LastUpdate>{thisProject.lastUpdate}</LastUpdate>
              <Action className="">Action</Action>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectsTable;
