import { NextPage } from "next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavItemInterface from "../../interfaces/NavItemInterface";
import { changeMenu } from "../../redux/globalStateSlice";

const projectDetailNavMenu: NavItemInterface[] = [
  {
    title: "Test",
    url: "/",
  },
];

const ProjectDetail: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeMenu(projectDetailNavMenu));
  }, []);

  return <div></div>;
};

export default ProjectDetail;
