import { useEffect } from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { clearMenu } from "../../redux/globalStateSlice";

const Project: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMenu());
  }, []);

  return <></>;
};

export default Project;
